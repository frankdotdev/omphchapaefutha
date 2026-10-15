-- 0001_core.sql
-- Standard PostgreSQL. Only the RLS helper functions reference Supabase's auth.uid(); see
-- database/README.md for the one-line swap when moving to plain Postgres + NestJS.

create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- ---------------------------------------------------------------- enums
do $$ begin
  if not exists (select 1 from pg_type where typname = 'publication_status') then
    create type publication_status as enum ('draft', 'review', 'published', 'archived');
  end if;
  if not exists (select 1 from pg_type where typname = 'review_status') then
    create type review_status as enum ('unverified', 'in_review', 'verified');
  end if;
  if not exists (select 1 from pg_type where typname = 'weekday') then
    create type weekday as enum ('sun','mon','tue','wed','thu','fri','sat');
  end if;
end $$;

-- ---------------------------------------------------------------- auth / RBAC
-- Admin identities. id matches the auth provider's user id (Supabase Auth now, NestJS later).
create table if not exists app_users (
  id uuid primary key,
  email text not null unique,
  display_name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  description text
);

create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  description text
);

create table if not exists role_permissions (
  role_id uuid not null references roles(id) on delete cascade,
  permission_id uuid not null references permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table if not exists user_roles (
  user_id uuid not null references app_users(id) on delete cascade,
  role_id uuid not null references roles(id) on delete cascade,
  primary key (user_id, role_id)
);

-- RLS helpers. SECURITY DEFINER so policies can read RBAC tables without exposing them.
create or replace function current_user_id() returns uuid
language sql stable as $$ select auth.uid() $$;

create or replace function has_permission(perm text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from user_roles ur
    join app_users u on u.id = ur.user_id and u.is_active
    join role_permissions rp on rp.role_id = ur.role_id
    join permissions p on p.id = rp.permission_id
    where ur.user_id = current_user_id()
      and (p.key = perm or p.key = '*')
  )
$$;

-- ---------------------------------------------------------------- settings
create table if not exists chaplaincy_settings (
  key text primary key,
  value jsonb not null,
  is_public boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references app_users(id)
);

-- ---------------------------------------------------------------- media
create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_provider text not null default 'supabase',
  object_key text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  alt_text text,
  credit text,
  rights_note text,
  is_public boolean not null default true,
  uploaded_by uuid references app_users(id),
  created_at timestamptz not null default now(),
  unique (storage_provider, object_key)
);

-- ---------------------------------------------------------------- schedule
create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  kind text not null check (kind in ('mass','devotion','sacrament','formation','other')),
  location text,
  description text,
  is_active boolean not null default true
);

-- Recurring local-time schedule. Times are wall-clock in `timezone`, never UTC.
create table if not exists recurring_schedules (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references activities(id) on delete cascade,
  label text not null,
  weekday weekday not null,
  -- null when no clock time has been supplied (e.g. Adoration "follows" the Mass). Never invent a time.
  start_time time,
  -- null = every week; 1..5 = nth occurrence of that weekday in the month
  nth_of_month smallint check (nth_of_month between 1 and 5),
  timezone text not null default 'Africa/Lagos',
  note text,
  sort_order smallint not null default 0,
  status publication_status not null default 'published',
  valid_from date,
  valid_to date
);
create index if not exists recurring_schedules_weekday_idx on recurring_schedules (weekday, sort_order);

-- A date-specific exception replaces the recurring rows it targets for that one date only.
create table if not exists schedule_exceptions (
  id uuid primary key default gen_random_uuid(),
  on_date date not null,
  kind text not null check (kind in ('cancel','replace','add')),
  recurring_schedule_id uuid references recurring_schedules(id) on delete cascade,
  activity_id uuid references activities(id),
  label text,
  start_time time,
  location text,
  note text,
  status publication_status not null default 'draft',
  created_by uuid references app_users(id),
  created_at timestamptz not null default now(),
  check (kind = 'add' or recurring_schedule_id is not null),
  check (kind = 'cancel' or start_time is not null)
);
create index if not exists schedule_exceptions_date_idx on schedule_exceptions (on_date);

-- ---------------------------------------------------------------- people / leadership
create table if not exists people (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  display_name text not null,
  biography text,
  portrait_id uuid references media_assets(id),
  public_email text,
  public_phone text,
  contact_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists leadership_positions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  display_order smallint not null default 0
);

create table if not exists leadership_appointments (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id),
  position_id uuid not null references leadership_positions(id),
  term_start date,
  term_end date,
  is_current boolean not null default true,
  status publication_status not null default 'draft',
  verification_note text,
  created_at timestamptz not null default now()
);

create table if not exists ecclesiastical_offices (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  level text not null check (level in ('universal','nunciature','province','diocese','chaplaincy')),
  description text,
  display_order smallint not null default 0
);

create table if not exists ecclesiastical_appointments (
  id uuid primary key default gen_random_uuid(),
  office_id uuid not null references ecclesiastical_offices(id),
  person_id uuid references people(id),
  -- 'occupied' | 'vacant' | 'administered' (e.g. apostolic administrator, sede vacante)
  occupancy text not null default 'occupied' check (occupancy in ('occupied','vacant','administered')),
  designation text,
  source_url text,
  verified_at date,
  review review_status not null default 'unverified',
  is_current boolean not null default true,
  show_on_home boolean not null default false,
  status publication_status not null default 'draft'
);

-- ---------------------------------------------------------------- societies
create table if not exists society_categories (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  description text,
  display_order smallint not null default 0
);

create table if not exists societies (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references society_categories(id),
  slug text not null unique,
  name text not null,
  short_name text,
  summary text,
  mission text,
  spirituality text,
  movement_history text,
  local_history text,
  patron text,
  patron_source text,
  feast_day text,
  activities text,
  meeting_schedule text,
  meeting_venue text,
  membership_info text,
  logo_id uuid references media_assets(id),
  is_featured boolean not null default false,
  review review_status not null default 'unverified',
  source_notes text,
  status publication_status not null default 'draft',
  display_order smallint not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists society_leaders (
  id uuid primary key default gen_random_uuid(),
  society_id uuid not null references societies(id) on delete cascade,
  person_id uuid not null references people(id),
  office_title text not null,
  term_start date,
  term_end date,
  is_current boolean not null default true,
  status publication_status not null default 'draft'
);

-- ---------------------------------------------------------------- announcements / events
create table if not exists announcement_categories (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null
);

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null,
  category_id uuid references announcement_categories(id),
  issued_by text,
  image_id uuid references media_assets(id),
  priority smallint not null default 0,
  is_featured boolean not null default false,
  is_urgent boolean not null default false,
  publish_at timestamptz,
  expires_at timestamptz,
  status publication_status not null default 'draft',
  created_by uuid references app_users(id),
  created_at timestamptz not null default now()
);
create index if not exists announcements_pub_idx on announcements (status, publish_at desc);

-- Visitor-proposed announcements always land here, never directly in `announcements`.
create table if not exists announcement_submissions (
  id uuid primary key default gen_random_uuid(),
  submitter_name text not null,
  submitter_contact text,
  title text not null,
  body text not null,
  source text,
  state text not null default 'pending' check (state in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  category text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  timezone text not null default 'Africa/Lagos',
  venue text,
  organizer text,
  poster_id uuid references media_assets(id),
  registration_url text,
  is_featured boolean not null default false,
  countdown_enabled boolean not null default false,
  is_cancelled boolean not null default false,
  society_id uuid references societies(id),
  status publication_status not null default 'draft',
  check (ends_at is null or ends_at >= starts_at)
);
create index if not exists events_start_idx on events (status, starts_at);

-- ---------------------------------------------------------------- Mass intentions
create sequence if not exists mass_intention_ref_seq start 1000;

-- Private administrative record. Never exposed to the public role.
create table if not exists mass_intentions (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique
    default ('MI-' || to_char(now() at time zone 'Africa/Lagos','YYMM') || '-' || nextval('mass_intention_ref_seq')),
  idempotency_key text unique,
  intention_text text not null check (char_length(intention_text) between 3 and 1000),
  display_name text,
  anonymous boolean not null default false,
  private_contact text,
  preferred_date date,
  preferred_activity_id uuid references activities(id),
  scheduled_date date,
  scheduled_activity_id uuid references activities(id),
  list_order smallint not null default 0,
  state text not null default 'pending_payment' check (state in (
    'draft','pending_payment','payment_review','pending_approval','approved','completed','archived','rejected','cancelled')),
  payment_declared boolean not null default false,
  payment_declared_reference text,
  payment_verified boolean not null default false,
  payment_verified_by uuid references app_users(id),
  payment_verified_at timestamptz,
  manual_entry_reason text,
  internal_notes text,
  created_by uuid references app_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists mass_intentions_public_idx on mass_intentions (scheduled_date, state);

-- Public projection: only approved/completed rows, only display-safe columns.
create or replace view public_mass_intentions with (security_invoker = false) as
  select m.id, m.scheduled_date, m.scheduled_activity_id, a.name as activity_name, m.list_order,
         m.intention_text,
         case when m.anonymous or m.display_name is null then null else m.display_name end as display_name
  from mass_intentions m
  left join activities a on a.id = m.scheduled_activity_id
  where m.state in ('approved','completed') and m.scheduled_date is not null;

-- Valid state transitions are enforced in the database so every backend (Supabase or NestJS) obeys them.
create or replace function enforce_mass_intention_transition() returns trigger
language plpgsql as $$
declare
  ok boolean;
begin
  if new.state = old.state then return new; end if;
  ok := case old.state
    when 'draft'            then new.state in ('pending_payment','cancelled')
    when 'pending_payment'  then new.state in ('payment_review','pending_approval','cancelled','rejected')
    when 'payment_review'   then new.state in ('pending_approval','pending_payment','rejected','cancelled')
    when 'pending_approval' then new.state in ('approved','rejected','payment_review','cancelled')
    when 'approved'         then new.state in ('completed','archived','cancelled')
    when 'completed'        then new.state in ('archived')
    else false end;
  if not ok then
    raise exception 'Invalid Mass intention transition % -> %', old.state, new.state;
  end if;
  -- Approval requires verified payment unless a manual-entry reason was recorded.
  if new.state = 'approved' and not (new.payment_verified or new.manual_entry_reason is not null) then
    raise exception 'Cannot approve intention without verified payment or recorded manual-entry reason';
  end if;
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists mass_intention_transition on mass_intentions;
create trigger mass_intention_transition before update on mass_intentions
  for each row execute function enforce_mass_intention_transition();

-- ---------------------------------------------------------------- Prayer intentions
create table if not exists prayer_intentions (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text unique,
  body text not null check (char_length(body) between 3 and 800),
  category text,
  display_name text,
  anonymous boolean not null default true,
  private_contact text,
  consent_to_publish boolean not null default false,
  state text not null default 'moderation_pending'
    check (state in ('submitted','moderation_pending','approved','published','archived','rejected','removed')),
  moderated_by uuid references app_users(id),
  moderated_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace view public_prayer_intentions with (security_invoker = false) as
  select id, body, category,
         case when anonymous then null else display_name end as display_name,
         created_at
  from prayer_intentions
  where state = 'published' and consent_to_publish;

-- ---------------------------------------------------------------- audit
create table if not exists audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references app_users(id),
  action text not null,
  entity text not null,
  entity_id text,
  detail jsonb,
  created_at timestamptz not null default now()
);

-- ================================================================ ROW LEVEL SECURITY
-- Principle: anon/authenticated visitors read only published, public-safe rows.
-- Writes by visitors are limited to submission tables with state forced by CHECK-style policies.
-- Staff access is granted by permission keys via has_permission().
do $$
declare t text;
begin
  for t in select unnest(array[
    'app_users','roles','permissions','role_permissions','user_roles','chaplaincy_settings','media_assets',
    'activities','recurring_schedules','schedule_exceptions','people','leadership_positions',
    'leadership_appointments','ecclesiastical_offices','ecclesiastical_appointments','society_categories',
    'societies','society_leaders','announcement_categories','announcements','announcement_submissions',
    'events','mass_intentions','prayer_intentions','audit_logs'])
  loop
    execute format('alter table %I enable row level security', t);
  end loop;
end $$;

-- Public reads (published content only)
drop policy if exists pub_read_activities on activities;
create policy pub_read_activities on activities for select using (is_active);

drop policy if exists pub_read_schedules on recurring_schedules;
create policy pub_read_schedules on recurring_schedules for select using (status = 'published');

drop policy if exists pub_read_exceptions on schedule_exceptions;
create policy pub_read_exceptions on schedule_exceptions for select using (status = 'published');

drop policy if exists pub_read_settings on chaplaincy_settings;
create policy pub_read_settings on chaplaincy_settings for select using (is_public);

drop policy if exists pub_read_media on media_assets;
create policy pub_read_media on media_assets for select using (is_public);

drop policy if exists pub_read_positions on leadership_positions;
create policy pub_read_positions on leadership_positions for select using (true);

drop policy if exists pub_read_offices on ecclesiastical_offices;
create policy pub_read_offices on ecclesiastical_offices for select using (true);

drop policy if exists pub_read_society_categories on society_categories;
create policy pub_read_society_categories on society_categories for select using (true);

drop policy if exists pub_read_ann_categories on announcement_categories;
create policy pub_read_ann_categories on announcement_categories for select using (true);

drop policy if exists pub_read_people on people;
create policy pub_read_people on people for select using (
  exists (select 1 from leadership_appointments a where a.person_id = people.id and a.status = 'published')
  or exists (select 1 from ecclesiastical_appointments e where e.person_id = people.id and e.status = 'published')
  or exists (select 1 from society_leaders s where s.person_id = people.id and s.status = 'published'));

drop policy if exists pub_read_leadership on leadership_appointments;
create policy pub_read_leadership on leadership_appointments for select using (status = 'published');

drop policy if exists pub_read_eccl on ecclesiastical_appointments;
create policy pub_read_eccl on ecclesiastical_appointments for select using (status = 'published');

drop policy if exists pub_read_societies on societies;
create policy pub_read_societies on societies for select using (status = 'published');

drop policy if exists pub_read_society_leaders on society_leaders;
create policy pub_read_society_leaders on society_leaders for select using (status = 'published');

drop policy if exists pub_read_announcements on announcements;
create policy pub_read_announcements on announcements for select using (
  status = 'published'
  and (publish_at is null or publish_at <= now())
  and (expires_at is null or expires_at > now()));

drop policy if exists pub_read_events on events;
create policy pub_read_events on events for select using (status = 'published');

-- Visitor submissions: insert-only, no read-back, state forced to the safe initial value.
drop policy if exists anon_submit_mass_intention on mass_intentions;
create policy anon_submit_mass_intention on mass_intentions for insert to anon, authenticated
  with check (
    state = 'pending_payment' and payment_verified = false and payment_verified_by is null
    and manual_entry_reason is null and internal_notes is null and scheduled_date is null);

drop policy if exists anon_submit_prayer on prayer_intentions;
create policy anon_submit_prayer on prayer_intentions for insert to anon, authenticated
  with check (state = 'moderation_pending' and moderated_by is null);

drop policy if exists anon_submit_announcement on announcement_submissions;
create policy anon_submit_announcement on announcement_submissions for insert to anon, authenticated
  with check (state = 'pending');

-- Staff policies (permission-keyed)
drop policy if exists staff_all_schedules on recurring_schedules;
create policy staff_all_schedules on recurring_schedules for all using (has_permission('schedule.manage')) with check (has_permission('schedule.manage'));

drop policy if exists staff_all_exceptions on schedule_exceptions;
create policy staff_all_exceptions on schedule_exceptions for all using (has_permission('schedule.manage')) with check (has_permission('schedule.manage'));

drop policy if exists staff_all_activities on activities;
create policy staff_all_activities on activities for all using (has_permission('schedule.manage')) with check (has_permission('schedule.manage'));

drop policy if exists staff_all_societies on societies;
create policy staff_all_societies on societies for all using (has_permission('societies.manage')) with check (has_permission('societies.manage'));

drop policy if exists staff_all_soc_leaders on society_leaders;
create policy staff_all_soc_leaders on society_leaders for all using (has_permission('societies.manage')) with check (has_permission('societies.manage'));

drop policy if exists staff_all_announcements on announcements;
create policy staff_all_announcements on announcements for all using (has_permission('announcements.manage')) with check (has_permission('announcements.manage'));

drop policy if exists staff_all_ann_subs on announcement_submissions;
create policy staff_all_ann_subs on announcement_submissions for all using (has_permission('announcements.manage')) with check (has_permission('announcements.manage'));

drop policy if exists staff_all_events on events;
create policy staff_all_events on events for all using (has_permission('events.manage')) with check (has_permission('events.manage'));

drop policy if exists staff_all_people on people;
create policy staff_all_people on people for all using (has_permission('leadership.manage')) with check (has_permission('leadership.manage'));

drop policy if exists staff_all_leadership on leadership_appointments;
create policy staff_all_leadership on leadership_appointments for all using (has_permission('leadership.manage')) with check (has_permission('leadership.manage'));

drop policy if exists staff_all_eccl on ecclesiastical_appointments;
create policy staff_all_eccl on ecclesiastical_appointments for all using (has_permission('leadership.manage')) with check (has_permission('leadership.manage'));

drop policy if exists staff_all_media on media_assets;
create policy staff_all_media on media_assets for all using (has_permission('media.manage')) with check (has_permission('media.manage'));

drop policy if exists staff_all_settings on chaplaincy_settings;
create policy staff_all_settings on chaplaincy_settings for all using (has_permission('settings.manage')) with check (has_permission('settings.manage'));

drop policy if exists staff_all_mass on mass_intentions;
create policy staff_all_mass on mass_intentions for all using (has_permission('intentions.manage')) with check (has_permission('intentions.manage'));

drop policy if exists staff_all_prayer on prayer_intentions;
create policy staff_all_prayer on prayer_intentions for all using (has_permission('prayer.moderate')) with check (has_permission('prayer.moderate'));

drop policy if exists staff_read_audit on audit_logs;
create policy staff_read_audit on audit_logs for select using (has_permission('audit.read'));

drop policy if exists staff_read_users on app_users;
create policy staff_read_users on app_users for select using (has_permission('users.manage') or id = current_user_id());

drop policy if exists staff_manage_users on app_users;
create policy staff_manage_users on app_users for all using (has_permission('users.manage')) with check (has_permission('users.manage'));

drop policy if exists staff_read_roles on roles;
create policy staff_read_roles on roles for select using (has_permission('users.manage'));

drop policy if exists staff_read_perms on permissions;
create policy staff_read_perms on permissions for select using (has_permission('users.manage'));

drop policy if exists staff_read_role_perms on role_permissions;
create policy staff_read_role_perms on role_permissions for select using (has_permission('users.manage'));

drop policy if exists staff_manage_user_roles on user_roles;
create policy staff_manage_user_roles on user_roles for all using (has_permission('users.manage')) with check (has_permission('users.manage'));

-- The sanitized public views are readable by visitors; underlying tables stay locked.
grant select on public_mass_intentions, public_prayer_intentions to anon, authenticated;
revoke all on mass_intentions, prayer_intentions from anon;
-- Mass and prayer submissions go through the SECURITY DEFINER RPCs in 0002 (they must return the
-- reference number, which would otherwise require granting visitors read access to private rows).
-- Announcement proposals have no read-back need, so a direct insert is fine.
grant insert on announcement_submissions to anon;
