# Moving from Supabase to NestJS

The web app never talks to Supabase directly from pages. It goes through three interfaces, so the backend can change without touching screens.

| Interface | File | Used by |
|---|---|---|
| `DataClient` (public reads) | `apps/web/lib/data/client.ts` | public pages |
| `SubmissionClient` (intentions, prayers, contact) | `apps/web/lib/data/` | public forms |
| `AdminClient` | `apps/web/lib/admin/client.ts` | admin screens |
| `AnswerProvider` | `apps/web/lib/ask/provider.ts` | Ask a Padre |

Selected by `NEXT_PUBLIC_DATA_BACKEND=seed | supabase | api`.

## Steps

1. Create the NestJS service (REST, OpenAPI). Mirror the tables in `database/migrations/*.sql` (PostgreSQL stays; Supabase can be dropped or kept as plain Postgres).
2. Reproduce the rules that RLS enforces today as guards: role to permission mapping (`has_permission`), the Mass-intention state machine, the payment-verification rule, audit logging.
3. Implement `ApiDataClient` and `ApiAdminClient` against the new endpoints; add them in `getDataClient()` / `getAdminClient()` for the `api` mode. Keep the same method signatures.
4. Move auth: staff sign-in becomes the API's (JWT or session cookie, HttpOnly). Replace `persistSession` storage with cookies.
5. Move files: the `media` bucket to S3-compatible storage; keep the `media_assets` table, change only the URL builder.
6. Move secrets (`MAGISTERIUM_API_KEY`, payment keys) to the API's environment.
7. Run both backends side by side on staging, compare, cut over, then remove the Supabase code.

## Data export

`pg_dump` the database and download the `media` bucket. The seed data in `apps/web/lib/data/seed-client.ts` remains useful for tests.

## Row-level security without Supabase

The policies call `auth.uid()`. On plain PostgreSQL, `0000_portable_compat.sql` defines it to read `app.user_id`. The API must, per request and inside one transaction, run `select set_config('app.user_id', '<verified user uuid>', true)` and connect as a role that is subject to RLS. Alternatively, enforce the same permission checks in the API and use a privileged connection; then RLS is a second line of defence rather than the first.
