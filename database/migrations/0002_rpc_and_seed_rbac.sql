-- 0002_rpc_and_seed_rbac.sql

-- ---------------------------------------------------------------- visitor submission RPCs
-- Idempotent: a repeated idempotency_key returns the original reference instead of creating a duplicate.
create or replace function submit_mass_intention(
  p_idempotency_key text,
  p_intention_text text,
  p_display_name text,
  p_anonymous boolean,
  p_private_contact text,
  p_preferred_date date,
  p_preferred_activity_id uuid
) returns text
language plpgsql security definer set search_path = public as $$
declare
  ref text;
begin
  if p_idempotency_key is null or char_length(p_idempotency_key) < 8 then
    raise exception 'idempotency key required';
  end if;
  select reference into ref from mass_intentions where idempotency_key = p_idempotency_key;
  if found then return ref; end if;

  insert into mass_intentions
    (idempotency_key, intention_text, display_name, anonymous, private_contact,
     preferred_date, preferred_activity_id, state)
  values
    (p_idempotency_key, trim(p_intention_text), nullif(trim(p_display_name), ''), coalesce(p_anonymous, false),
     nullif(trim(p_private_contact), ''), p_preferred_date, p_preferred_activity_id, 'pending_payment')
  returning reference into ref;
  return ref;
end $$;

-- The submitter may declare payment; this only moves the record to review. It is NOT verification.
create or replace function declare_mass_intention_payment(p_reference text, p_transaction_ref text)
returns void language plpgsql security definer set search_path = public as $$
begin
  update mass_intentions
     set payment_declared = true,
         payment_declared_reference = nullif(trim(p_transaction_ref), ''),
         state = 'payment_review'
   where reference = p_reference and state = 'pending_payment';
  if not found then raise exception 'No intention awaiting payment for that reference'; end if;
end $$;

create or replace function submit_prayer_intention(
  p_idempotency_key text, p_body text, p_category text, p_display_name text,
  p_anonymous boolean, p_private_contact text, p_consent boolean
) returns uuid
language plpgsql security definer set search_path = public as $$
declare
  new_id uuid;
begin
  if p_idempotency_key is null or char_length(p_idempotency_key) < 8 then
    raise exception 'idempotency key required';
  end if;
  select id into new_id from prayer_intentions where idempotency_key = p_idempotency_key;
  if found then return new_id; end if;
  insert into prayer_intentions
    (idempotency_key, body, category, display_name, anonymous, private_contact, consent_to_publish, state)
  values
    (p_idempotency_key, trim(p_body), p_category, nullif(trim(p_display_name), ''),
     coalesce(p_anonymous, true), nullif(trim(p_private_contact), ''), coalesce(p_consent, false), 'moderation_pending')
  returning id into new_id;
  return new_id;
end $$;

-- Status lookup by reference only: reveals state, nothing else.
create or replace function mass_intention_status(p_reference text)
returns text language sql stable security definer set search_path = public as $$
  select state from mass_intentions where reference = p_reference
$$;

revoke all on function submit_mass_intention, declare_mass_intention_payment,
  submit_prayer_intention, mass_intention_status from public;
grant execute on function submit_mass_intention, declare_mass_intention_payment,
  submit_prayer_intention, mass_intention_status to anon, authenticated;

-- ---------------------------------------------------------------- RBAC seed (roles/permissions only; no users)
insert into permissions (key, description) values
  ('*', 'All permissions'),
  ('schedule.manage', 'Manage Mass schedule and exceptions'),
  ('intentions.manage', 'Verify payments, approve and publish Mass intentions'),
  ('prayer.moderate', 'Moderate prayer intentions'),
  ('announcements.manage', 'Manage announcements and moderate proposals'),
  ('events.manage', 'Manage events'),
  ('societies.manage', 'Manage societies and executives'),
  ('leadership.manage', 'Manage leadership and ecclesiastical directory'),
  ('media.manage', 'Manage media library'),
  ('settings.manage', 'Manage general settings'),
  ('users.manage', 'Manage admin users and roles'),
  ('audit.read', 'Read audit log'),
  ('ops.view', 'View operational health')
on conflict (key) do nothing;

insert into roles (key, name, description) values
  ('super_admin', 'Super Admin', 'Full access'),
  ('chaplain', 'Chaplain', 'Pastoral and content oversight'),
  ('catechist', 'Catechist', 'Mass intentions, prayer requests, pastoral announcements'),
  ('content_editor', 'Content Editor', 'Pages, events, announcements, media, society content'),
  ('it_admin', 'IT Administrator', 'Operational settings; no pastoral data by default')
on conflict (key) do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id from roles r join permissions p on
  (r.key = 'super_admin' and p.key = '*')
  or (r.key = 'chaplain' and p.key in ('schedule.manage','intentions.manage','prayer.moderate','announcements.manage','events.manage','societies.manage','leadership.manage','media.manage','audit.read'))
  or (r.key = 'catechist' and p.key in ('intentions.manage','prayer.moderate','announcements.manage','schedule.manage'))
  or (r.key = 'content_editor' and p.key in ('announcements.manage','events.manage','societies.manage','media.manage'))
  or (r.key = 'it_admin' and p.key in ('settings.manage','ops.view','audit.read'))
on conflict (role_id, permission_id) do nothing;
