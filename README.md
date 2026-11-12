# Our Mother of Perpetual Help Catholic Chaplaincy, AE-FUTHA

Official web platform for **Our Mother of Perpetual Help Catholic Chaplaincy**, Alex Ekwueme Federal University Teaching Hospital, Abakaliki (AE-FUTHA), Catholic Diocese of Abakaliki, Ebonyi State, Nigeria.

Built as a TypeScript monorepo (`pnpm` workspaces) with **Next.js 15 (App Router)** in `apps/web` and portable **PostgreSQL / Supabase** migrations and seeds in `database/`.

---

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment variables (optional — runs out-of-the-box on built-in seed data)
cp .env.example apps/web/.env.local

# 3. Start development server (http://localhost:3000)
pnpm dev

# 4. Run tests, typecheck, and production build
pnpm test
pnpm typecheck
pnpm build
```

---

## Core Features

### 1. Liturgical Life, Scripture Translation & Automatic Daily Readings (`/daily-readings`)
- **Approved Bible & Missal Edition:** Follows *The Daily Missal* (Paulines Publications Africa, ISBN 9966-08-579-3) containing the *New English Translation of The Roman Missal 2010* granted *recognitio* for Nigeria (Prot. N. 1021/10/L) by the Holy See, *Revised Standard Version Catholic Edition (RSV-CE)* for Sacred Scripture, *The Revised Grail Psalms (2010)*, and Imprimatur by Most Rev. Felix Alaba Job (President, Catholic Bishops' Conference of Nigeria - CBCN).
- **Liturgical Calendar (`romcal`):** Automatically computes the liturgical season, Sunday/weekday cycle, vestment colour swatch, liturgical rank, and feast days in the `Africa/Lagos` timezone.
- **Multi-Provider Live Lectionary Sync (`apps/web/lib/liturgy/auto-readings.ts`):**
  1. **Staff Overrides:** Custom readings published via `/admin` take top priority.
  2. **Universalis Liturgical Feed (`Africa.Nigeria`):** Automatically pulls daily First Reading, Responsorial Psalm, Second Reading, and Gospel for the Nigerian calendar.
  3. **Evangelizo Catholic Feed API v2:** Secondary live scripture provider.
  4. **USCCB Daily Lectionary:** Tertiary live parser + client-side browser hydration (`LiveReadingsSection.tsx`).
- **Saint of the Day:** Displays verified biographies, feast ranks, and Latin titles for the day's liturgical celebration.

### 2. Order of Mass (Ordo Missae) in English, Igbo & Latin (`/order-of-mass`)
- **Trilingual Ordo Missae:** Complete liturgical texts covering the Introductory Rites, Penitential Act / Confiteor, Kyrie, Gloria, Liturgy of the Word, Nicene and Apostles' Creed, Offertory & *Orate Fratres*, Preface dialogues, Sanctus, Consecration / Institution Narrative, Memorial Acclamation, Great Amen, The Lord's Prayer (*Our Father / Pater Noster / Nna Anyị Nọ N'eligwe*), Sign of Peace, Agnus Dei (*Lamb of God / Nwa Atụrụ nke Chineke*), and Dismissal.
- **Interactive Language Modes:** Switch seamlessly between English + Igbo, English + Latin, Trilingual, English only, Igbo only, and Latin only.

### 3. Mass Hymns & Choir Master Broadcast Portal (`/hymns`)
- **Complete Hymn Catalog:** Categorized collection of Catholic hymns across English, Igbo, and Latin covering Entrance, Kyrie, Gloria, Credo, Offertory, Sanctus, Memorial Acclamation, Agnus Dei, Communion, Thanksgiving, and Dismissal/Marian anthems (including the chaplaincy's patronal hymn *Great Mother of Perpetual Help* and popular Igbo liturgical chants such as *Otuto Diri Chineke*, *K'Anyị Nyenụ Ya Ekele*, *Chineke Nna Nara Aja Anyị*, and *Di Nsọ*).
- **Choir Master Daily Planner:** Dedicated space where the Choir Master can assign and curate hymns for every part of the Mass for each day. Parishioners can follow the lyrics live on their mobile phones.

### 4. Church Projector Mode (`/projector`)
- **Dedicated Sanctuary Display:** Edge-to-edge, distraction-free display for church projectors with zero website headers or navigation bars.
- **High-Contrast Themes:** Optimized for church projector optics — *Sanctuary Dark* (`#000000` with gold headings and crisp white text to prevent glare), *Daylight Crisp* (white with black text), and *Liturgical Amber*.
- **Variable Font Scaler (`A-` / `A+`):** Responsive typography up to `60px` for crystal-clear readability from any pew in the church.
- **Hardware Remote / Clicker Navigation:** Supports wireless presentation clickers and keyboard shortcuts:
  - `Space` / `→` / `PageDown`: Next slide / prayer / notice / event / hymn verse
  - `←` / `PageUp`: Previous slide / prayer / notice / event / hymn verse
  - `1`: Today's Mass Readings (RSV-CE / Grail Psalms)
  - `2`: Order of Mass (English / Igbo / Latin)
  - `3`: Mass Hymns & Choir Lyrics
  - `4`: Today's Mass Intentions
  - `5`: Sunday Announcements & Notices (Full slide-by-slide view)
  - `6`: Upcoming Chaplaincy Events & Calendar
  - `F`: Toggle Fullscreen

### 5. Catechist Single-Box Announcements Tool (`/announcements/bulk`)
- **Single-Box Typing:** Rather than entering announcements one-by-one into separate forms, the Catechist types or pastes all notices for Sunday Mass into a single text area (e.g., numbered `1. TITLE`, `2. TITLE`, or separated by blank lines).
- **Intelligent Parser (`apps/web/lib/announcements/parser.ts`):** Automatically extracts the title, detects issuing body (CWO, CMO, CYON, FECAMDS, Catechetical Commission, etc.), urgency flags, dates, and paragraph breaks.
- **Dual Destination Publishing:**
  - Formats cleanly as individual presentation slides for the **Church Projector** (`/projector?tab=announcements`).
  - Publishes to the public website **Announcements Page** (`/announcements`).
  - Generates a 1-click formatted bulletin for **WhatsApp Broadcasts**.

### 2. Mass Schedule & Exceptions (`/mass-schedule`)
- Full weekly and Sunday timetable for Masses, Eucharistic Adoration, Benediction, Confessions, Catechism, and Infant Baptism (every 3rd Saturday).
- Supports one-day liturgical exceptions (cancellations, reschedules, special feast Masses) without altering the recurring schedule.

### 3. Mass Intentions & Online Booking (`/mass-intentions`, `/mass-intentions/offer`)
- **Multi-Day Booking Modes:** Single day, consecutive days (Novena / Gregorian), or multiple custom dates.
- **Automatic Stipend Calculation:** Calculates `₦300` per Mass / day and generates a unique tracking code (`OMPH-YYYY-XXXX`).
- **Direct WhatsApp Receipt Verification:** One-click pre-filled WhatsApp confirmation to the Catechist (`08063314891`) or Chaplain (`09044469505`), plus online status tracking at `/mass-intentions/status` and printable altar sheets.

### 4. Vatican News Video & Papal Updates Widget (`/`, `/ecclesiastical-communion`)
- Embeds the official **Dicastery for Communication Vatican News Video Widget** (`https://www.vaticannews.va/widget/embed.html`) in response to **Pope Leo XIV's** invitation to dioceses and parishes worldwide.
- Includes interactive toggles for Horizontal view, Vertical view, and the Vatican Media Live Channel, paired with auto-synced headlines from `vaticannews.va/en.rss.xml`.

### 5. Chaplaincy Support & Official Bank Accounts (`/support`)
 All account displays explicitly list the **Bank Name**, **Account Number**, and **Account Name** with one-click copy and WhatsApp receipt links:

| Purpose / Account Title | Bank | Account Number | Account Name | Receipt / Contact |
| :--- | :--- | :--- | :--- | :--- |
| **Mass Intentions, Tithes & Offerings** | **First Bank** | `3035331262` | `JOHN CHIDI OBASI` | `08063314891` / `09044469505` |
| **General Chaplaincy & Pastoral Projects** | **First Bank** | `3056076559` | `ST. PADRE PIO CATHOLIC CHAPLAINCY` | `08063314891` / `09044469505` |
| **Harvest & Bazaar Committee** | **FCMB** | `8552777011` | `ST PADRE PIO CATHOLIC CHAPLAINCY BAZAAR COMMITTEE` | `08132932726` |
| **Catholic Men Organization (CMO)** | **UBA** | `1024371925` | `CMO PADRE PIO` | `08063314891` |
| **Catholic Women Organisation (CWO)** | **FCMB** | `7666084017` | `Catholic Women Organisation St Padre Pio Chaplaincy Abakaliki` | `08036736319` |

### 6. Catholic Communities & Pious Societies (`/societies`)
- Directory of 19 chaplaincy associations, organizations (CMO, CWO, CYON, NFCS, FECAMDS, KSJ), and devotional societies (Legion of Mary, OMPH Devotional Society, Rosa Mystica, Block Rosary, Sacred Heart, CCRN, etc.) with emblems, patron saints, feast days, major activities, leadership contacts, and society support cards.

### 7. Catholic Doctrine Library & "Ask a Padre" (`/doctrine`, `/ask`)
- Searchable, citation-backed Catholic Doctrine Library organized across 10 catechetical categories referencing the *Catechism of the Catholic Church (CCC)*, Sacred Scripture, and conciliar documents.
- **Ask a Padre:** Safety triage for pastoral/medical emergencies, weighted local doctrine search, and optional Magisterium AI fallback (`MAGISTERIUM_API_KEY`).

### 8. Admin CMS, Multilingual UI & Offline PWA (`/admin`)
- **Role-Based Admin Portal (`/admin`):** Manage announcements, events, schedule exceptions, Mass intentions, prayer requests, hero slides, daily readings, saint profiles, media uploads, and site settings.
- **Multilingual Interface Labels:** English, Igbo, Hausa, Yoruba, and Latin (`apps/web/lib/i18n.ts`).
- **Progressive Web App (PWA):** Installable web manifest (`app/manifest.ts`), offline service worker (`public/sw.js`), and `/offline` fallback page.

---

## Repository Structure

```text
├── apps/
│   └── web/                        # Next.js 15 App Router application
│       ├── app/                    # Public routes ((site)), Admin CMS (/admin), and API endpoints
│       ├── components/             # UI, liturgy, forms, giving, home, and layout components
│       ├── data/doctrine/          # Structured JSON Catholic doctrine library
│       ├── lib/                    # Data client seam, liturgy engine, Vatican feed, validation
│       ├── public/                 # Emblems, sacred art, society badges, service worker
│       └── tests/                  # Vitest unit & integration test suites
├── database/
│   ├── migrations/                 # Numbered PostgreSQL schema, RLS policies, and audit triggers
│   ├── seeds/                      # Schedule, society details, and RBAC SQL seeds
│   └── README.md                   # Database setup & portability guide (Supabase / Neon / VPS)
└── docs/                           # Operational and architectural documentation
```

---

## Documentation

| Document | Description |
| :--- | :--- |
| [`database/README.md`](database/README.md) | PostgreSQL & Supabase migration order and automated setup scripts |
| [`docs/admin-manual.md`](docs/admin-manual.md) | Everyday guide for chaplaincy staff using the `/admin` portal |
| [`docs/deployment.md`](docs/deployment.md) | Production deployment instructions for Vercel, Supabase, and PostgreSQL |
| [`docs/content-sources.md`](docs/content-sources.md) | Lectionary, calendar (`romcal`), and saint biography source notes |
| [`docs/doctrine-handoff.md`](docs/doctrine-handoff.md) | Authoring schema and review workflow for the Catholic Doctrine Library |
| [`docs/nestjs-migration.md`](docs/nestjs-migration.md) | Guide for swapping the `DataClient` adapter to a dedicated NestJS backend |

---

## Quality & Verification Commands

| Command | Purpose |
| :--- | :--- |
| `pnpm --filter web dev` | Run Next.js development server on port `3000` |
| `pnpm --filter web typecheck` | Run full TypeScript compiler validation (`tsc --noEmit`) |
| `pnpm --filter web test` | Run Vitest unit and schedule/doctrine validation suites |
| `pnpm --filter web build` | Create an optimized production build |
| `pnpm --filter web e2e` | Run Playwright + axe-core smoke and accessibility checks |
