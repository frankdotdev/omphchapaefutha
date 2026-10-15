-- 0004_readings_and_saints.sql
-- The liturgical calendar (date, season, colour, saint names) is COMPUTED by the app (romcal, MIT).
-- Scripture TEXT is copyrighted by the lectionary publishers, so the database holds only what the chaplaincy
-- itself enters: references, and optional text with a recorded source/permission note.

insert into permissions (key, description) values
  ('readings.manage', 'Manage daily readings and saint profiles')
on conflict (key) do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id from roles r join permissions p on p.key = 'readings.manage'
where r.key in ('chaplain', 'catechist', 'content_editor')
on conflict do nothing;

create table if not exists daily_readings (
  id uuid primary key default gen_random_uuid(),
  on_date date not null unique,
  first_reading_ref text,
  first_reading_text text,
  psalm_ref text,
  psalm_text text,
  second_reading_ref text,
  second_reading_text text,
  gospel_ref text,
  gospel_text text,
  translation text,              -- e.g. the lectionary translation in use at the chaplaincy
  source_note text not null,     -- where the entry came from and the permission to publish it (required)
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- text must never be published without a stated source
  check (char_length(trim(source_note)) > 3)
);
alter table daily_readings enable row level security;
drop policy if exists pub_read_readings on daily_readings;
create policy pub_read_readings on daily_readings for select using (status = 'published');
drop policy if exists staff_all_readings on daily_readings;
create policy staff_all_readings on daily_readings for all
  using (has_permission('readings.manage')) with check (has_permission('readings.manage'));

-- Short, source-attributed saint biographies keyed by the romcal celebration id (e.g. teresa_of_jesus_of_avila_virgin).
create table if not exists saint_profiles (
  id uuid primary key default gen_random_uuid(),
  celebration_id text not null unique,
  name text not null,
  summary text not null,
  source_name text not null,     -- e.g. "Catholic Encyclopedia (1913), public domain"
  source_url text,
  review text not null default 'unverified' check (review in ('unverified','in_review','verified')),
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table saint_profiles enable row level security;
drop policy if exists pub_read_saints on saint_profiles;
create policy pub_read_saints on saint_profiles for select using (status = 'published' and review = 'verified');
drop policy if exists staff_all_saints on saint_profiles;
create policy staff_all_saints on saint_profiles for all
  using (has_permission('readings.manage')) with check (has_permission('readings.manage'));

do $$
declare t text;
begin
  foreach t in array array['daily_readings','saint_profiles'] loop
    execute format('drop trigger if exists audit_%I on %I', t, t);
    execute format('create trigger audit_%I after insert or update or delete on %I for each row execute function audit_row_change()', t, t);
  end loop;
end $$;
