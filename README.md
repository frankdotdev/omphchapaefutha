# Our Mother of Perpetual Help Chaplaincy, AE-FUTHA

Monorepo. `apps/web` is Next.js 15 (TypeScript). `database/` holds migrations and seeds.

```
pnpm install
cp .env.example apps/web/.env.local
pnpm dev        # http://localhost:3000, runs on built-in seed data, no backend needed
pnpm test && pnpm typecheck && pnpm build
```

## Phase 1 status
Done: design system with Latin inscriptions and ornamental backgrounds, hero slideshow (pausable), header/footer, home, Mass schedule (Africa/Lagos, date exceptions), Mass and prayer intention forms, about, societies,
leadership, communion, announcements, events, contact, full DB schema with RLS, tested schedule logic.

Not yet built: Mass/prayer intention forms, admin CMS, daily readings and saints, doctrine library,
Ask a Padre, i18n, PWA, NestJS API. The data layer (`apps/web/lib/data/client.ts`) is the seam for the NestJS swap.

## Awaiting your input
Address/phone/email, Infant Baptism time, chaplaincy history, verified ecclesiastical appointments,
society histories/patrons/executives, approved emblem and photos, bank details and offering amount.

## Added: admin CMS, full-background hero, liturgical day
- `/admin` (needs Supabase): content editors, Mass-intention and prayer queues, media, settings. See `docs/admin-manual.md`.
- `/daily-readings`: computed liturgical day (romcal) + staff-entered readings or a link out. See `docs/content-sources.md`. Run `database/migrations/0004_readings_and_saints.sql`.

## Ask a Padre, languages, offline, checks

- `/ask`: safety triage, then our own doctrine library, then Magisterium (only if `MAGISTERIUM_API_KEY` is set), then an honest "not yet". See `apps/web/lib/ask`.
- Language switcher: English, Igbo, Hausa, Yoruba, Latin for interface labels only (`apps/web/lib/i18n.ts`); drafts awaiting native-speaker review.
- PWA: `app/manifest.ts`, `public/sw.js` (public pages only), `/offline`.
- Readings widget (Catholic Gallery) loads only when a visitor clicks, in a sandboxed frame.
- Doctrine content is unfinished: see `docs/doctrine-handoff.md`.
- Other docs: `docs/nestjs-migration.md`, `docs/deployment.md`, `docs/admin-manual.md`, `docs/content-sources.md`.
- Checks: `pnpm --filter web typecheck`, `test`, and (with the site running on port 3111) `e2e` for a smoke and axe accessibility pass over every public page.
