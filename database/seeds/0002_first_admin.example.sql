-- Run ONCE after creating your first user in Supabase Auth (Authentication -> Users -> Add user).
-- Replace the id and email with that user's values. Never commit real credentials.
insert into app_users (id, email, display_name)
values ('00000000-0000-0000-0000-000000000000', 'admin@example.org', 'Chaplaincy Admin');

insert into user_roles (user_id, role_id)
select '00000000-0000-0000-0000-000000000000', id from roles where key = 'super_admin';
