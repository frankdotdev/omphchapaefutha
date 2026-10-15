# Deployment

## Public site (Next.js)

Any Node host or Vercel. Build: `pnpm install && pnpm --filter web build`; start: `pnpm --filter web start`.

Environment (see `.env.example`):
- `NEXT_PUBLIC_SITE_URL` the real domain.
- `NEXT_PUBLIC_DATA_BACKEND=supabase` once the project exists, with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `MAGISTERIUM_API_KEY` (server only, optional). Without it Ask a Padre answers from the doctrine library only.

## Supabase (when created)

1. Create the project, run `database/migrations/0001` to `0005` in order (not 0000), then the seed.
2. Create the public `media` storage bucket (5 MB limit, JPEG/PNG/WebP).
3. Create the first staff user, then give them the super-admin role (see `docs/admin-manual.md`).
4. Set the site env vars above and redeploy.

## Before going live

- Confirm image rights for every item marked "to-confirm" in `lib/media.ts`.
- Chaplaincy supplies contact details, history, offering information and society details.
- Native-speaker review of the Igbo, Hausa and Yoruba interface labels.
- Chaplain reviews doctrine entries before they are marked reviewed.
- Email Catholic Gallery about widget terms; Evangelizo and Universalis about any readings use.
- Put a real rate limiter in front of `/api/ask` and the submission endpoints.
- Back up the database regularly (`pg_dump`) and test a restore.

## Neon or other plain PostgreSQL

The SQL is portable (see `database/README.md`). Run `0000` to `0005` and the seed. Because Neon has no Supabase API layer, the site
needs the NestJS API in `api` mode to use it (`docs/nestjs-migration.md`). The simplest path is: launch on Supabase now, and move the same
SQL to Neon when the NestJS API is ready; the data moves with `pg_dump` and `pg_restore`.
