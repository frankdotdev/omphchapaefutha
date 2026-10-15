-- 0003_admin_cms.sql
-- Admin CMS support: hero slides, media dimensions, permission lookup, tamper-proof audit triggers,
-- and the Supabase Storage bucket for uploaded images (the only Supabase-specific part; see README).

-- ---------------------------------------------------------------- media dimensions
alter table media_assets add column if not exists width int;
alter table media_assets add column if not exists height int;

-- ---------------------------------------------------------------- hero slides (admin-managed)
create table if not exists hero_slides (
  id uuid primary key default gen_random_uuid(),
  latin text not null check (char_length(latin) between 2 and 120),
  english text not null check (char_length(english) between 2 and 200),
  source text,
  image_id uuid references media_assets(id) on delete set null,
  background_id uuid references media_assets(id) on delete set null,
  cta_href text check (cta_href is null or cta_href ~ '^/[A-Za-z0-9/_\-?=&#.]*$'),
  cta_label text,
  display_order smallint not null default 0,
  status publication_status not null default 'draft',
  created_at timestamptz not null default now(),
  check ((cta_href is null) = (cta_label is null))
);
alter table hero_slides enable row level security;
drop policy if exists pub_read_hero on hero_slides;
create policy pub_read_hero on hero_slides for select using (status = 'published');
drop policy if exists staff_all_hero on hero_slides;
create policy staff_all_hero on hero_slides for all
  using (has_permission('media.manage')) with check (has_permission('media.manage'));

-- ---------------------------------------------------------------- permission lookup for the admin UI
-- The UI uses this only to decide which menus to show. Row Level Security is what actually enforces access.
create or replace function my_permissions() returns text[]
language sql stable security definer set search_path = public as $$
  select coalesce(array_agg(distinct p.key), '{}')
  from user_roles ur
  join app_users u on u.id = ur.user_id and u.is_active
  join role_permissions rp on rp.role_id = ur.role_id
  join permissions p on p.id = rp.permission_id
  where ur.user_id = current_user_id()
$$;
revoke all on function my_permissions() from public;
grant execute on function my_permissions() to authenticated;

-- ---------------------------------------------------------------- audit trail (written by the database, not the client)
-- Records who changed what and which columns changed, never the private content itself.
create or replace function audit_row_change() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  changed jsonb;
  rid text;
begin
  if tg_op = 'DELETE' then
    rid := (to_jsonb(old)->>'id');
    insert into audit_logs(actor_id, action, entity, entity_id, detail)
      values (current_user_id(), 'DELETE', tg_table_name, rid, null);
    return old;
  end if;
  rid := (to_jsonb(new)->>'id');
  if tg_op = 'UPDATE' then
    select coalesce(jsonb_agg(n.key), '[]'::jsonb) into changed
      from jsonb_each(to_jsonb(new)) n
     where (to_jsonb(old)->n.key) is distinct from n.value;
    insert into audit_logs(actor_id, action, entity, entity_id, detail)
      values (current_user_id(), 'UPDATE', tg_table_name, rid, jsonb_build_object('changed_columns', changed));
  else
    insert into audit_logs(actor_id, action, entity, entity_id, detail)
      values (current_user_id(), 'INSERT', tg_table_name, rid, null);
  end if;
  return new;
end $$;

do $$
declare t text;
begin
  for t in select unnest(array[
    'mass_intentions','prayer_intentions','announcements','events','societies','schedule_exceptions',
    'recurring_schedules','people','leadership_appointments','ecclesiastical_appointments','hero_slides','media_assets'])
  loop
    execute format('drop trigger if exists audit_%I on %I', t, t);
    execute format('create trigger audit_%I after insert or update or delete on %I for each row execute function audit_row_change()', t, t);
  end loop;
end $$;

-- ---------------------------------------------------------------- Supabase Storage (uploaded images)
-- Runs only where the Supabase storage schema exists. On plain PostgreSQL (Neon etc.) it is skipped and the
-- API layer stores files in S3-compatible storage instead; media_assets still records them.
do $$
begin
  if to_regclass('storage.buckets') is not null and to_regclass('storage.objects') is not null then
    execute $q$insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
      values ('media', 'media', true, 5242880, array['image/jpeg','image/png','image/webp'])
      on conflict (id) do nothing$q$;
    execute $q$drop policy if exists "media public read" on storage.objects$q$;
    execute $q$create policy "media public read" on storage.objects for select using (bucket_id = 'media')$q$;
    execute $q$drop policy if exists "media staff insert" on storage.objects$q$;
    execute $q$create policy "media staff insert" on storage.objects for insert
      with check (bucket_id = 'media' and has_permission('media.manage'))$q$;
    execute $q$drop policy if exists "media staff update" on storage.objects$q$;
    execute $q$create policy "media staff update" on storage.objects for update
      using (bucket_id = 'media' and has_permission('media.manage'))$q$;
    execute $q$drop policy if exists "media staff delete" on storage.objects$q$;
    execute $q$create policy "media staff delete" on storage.objects for delete
      using (bucket_id = 'media' and has_permission('media.manage'))$q$;
  end if;
end $$;
