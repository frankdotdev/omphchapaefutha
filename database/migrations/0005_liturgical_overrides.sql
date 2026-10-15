-- 0005_liturgical_overrides.sql
-- Local and national celebrations (for Nigeria, the Diocese of Abakaliki or the chaplaincy itself) that the
-- universal calendar does not contain. Staff enter them from the admin; the site merges them into the day.
-- Readings for such a day are entered in daily_readings (0004) as usual.

create table if not exists liturgical_overrides (
  id uuid primary key default gen_random_uuid(),
  on_date date not null,
  repeats_yearly boolean not null default false,   -- true: applies on this month and day every year
  name text not null,
  latin_name text,
  rank text not null default 'FEAST' check (rank in ('SOLEMNITY','FEAST','MEMORIAL','OPTIONAL_MEMORIAL','LOCAL')),
  colour text check (colour in ('WHITE','RED','GREEN','PURPLE','ROSE','GOLD','BLACK')),
  mode text not null default 'add' check (mode in ('add','replace')),  -- replace: becomes the day's main celebration
  note text,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (char_length(trim(name)) > 1)
);
create index if not exists liturgical_overrides_date_idx on liturgical_overrides (on_date);
alter table liturgical_overrides enable row level security;
drop policy if exists pub_read_overrides on liturgical_overrides;
create policy pub_read_overrides on liturgical_overrides for select using (status = 'published');
drop policy if exists staff_all_overrides on liturgical_overrides;
create policy staff_all_overrides on liturgical_overrides for all
  using (has_permission('readings.manage')) with check (has_permission('readings.manage'));

do $$
begin
  execute 'drop trigger if exists audit_liturgical_overrides on liturgical_overrides';
  execute 'create trigger audit_liturgical_overrides after insert or update or delete on liturgical_overrides for each row execute function audit_row_change()';
end $$;
