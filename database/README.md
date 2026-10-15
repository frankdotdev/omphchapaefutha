# Database Architecture & Migration Guide

The database is built on standard, production-ready PostgreSQL 15/16. It is designed to be **100% portable across any PostgreSQL provider or hosting environment**, including:
- **Supabase** (interim managed backend with PostgREST, Auth, and Storage)
- **Neon** (serverless PostgreSQL)
- **Railway / Render** (managed PostgreSQL containers)
- **Self-Hosted VPS** (Docker, Ubuntu, Debian, or bare-metal PostgreSQL)
- **AWS RDS / Google Cloud SQL / Azure Database for PostgreSQL**

---

## 1. Migration Order

When setting up a new database, apply the SQL files in this exact order:

| Step | File | Purpose | Supabase | Plain Postgres / Neon / Railway / VPS |
|---|---|---|---|---|
| **0** | `migrations/0000_portable_compat.sql` | Emulates `auth.uid()`, `auth.jwt()`, and default roles | **SKIP** | **REQUIRED (Run First)** |
| **1** | `migrations/0001_core.sql` | Core schema, state-machine triggers, RLS policies | Run | Run |
| **2** | `migrations/0002_rpc_and_seed_rbac.sql` | Visitor submission RPCs, role-based access control (RBAC) | Run | Run |
| **3** | `migrations/0003_admin_cms.sql` | Admin helpers, media metadata catalog | Run | Run |
| **4** | `migrations/0004_readings_and_saints.sql` | Liturgical readings, saint profiles catalog | Run | Run |
| **5** | `migrations/0005_liturgical_overrides.sql` | Feast day calendar overrides | Run | Run |
| **6** | `seeds/0001_schedule_and_societies.sql` | Chaplaincy Mass schedules, society roster, offices | Run | Run |
| **7** | `seeds/0003_society_details.sql` | Detailed movement histories, spiritualities, patrons, feasts | Run | Run |

*(Optional)* `seeds/0002_first_admin.example.sql`: Example for creating your first super-admin user in `app_users` and `user_roles`.

---

## 2. Automated Migration Scripts

We provide automated migration scripts that apply the full suite of migrations and seeds in order.

### On Linux, macOS, VPS, Docker, or CI/CD:
```bash
# For Plain PostgreSQL (Neon, Railway, Render, VPS):
export DATABASE_URL="postgresql://user:password@host:5432/dbname"
chmod +x database/apply.sh
./database/apply.sh

# For Supabase (skips 0000_portable_compat.sql):
export IS_SUPABASE=true
export DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
./database/apply.sh
```

### On Windows PowerShell:
```powershell
# For Plain PostgreSQL (Neon, Railway, Render, VPS):
$env:DATABASE_URL = "postgresql://user:password@host:5432/dbname"
.\database\apply.ps1

# For Supabase:
$env:IS_SUPABASE = "true"
$env:DATABASE_URL = "postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
.\database\apply.ps1
```

---

## 3. Provider-Specific Setup Instructions

### A. Supabase
1. In the Supabase Dashboard, open the **SQL Editor**.
2. Run migrations `0001_core.sql` through `0005_liturgical_overrides.sql` in order.
3. Run seeds `0001_schedule_and_societies.sql` and `0003_society_details.sql`.
4. Create a public storage bucket named `media` (5 MB file size limit; JPEG, PNG, WebP).
5. In **Authentication > Users**, invite or create your first staff administrator.
6. Grant the user super-admin privileges:
   ```sql
   insert into app_users (id, email) values ('<USER-UUID>', 'admin@example.com') on conflict do nothing;
   insert into user_roles (user_id, role) values ('<USER-UUID>', 'super_admin');
   ```
7. In the frontend environment (`apps/web/.env.local`):
   ```env
   NEXT_PUBLIC_DATA_BACKEND=supabase
   NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT-REF>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<ANON-KEY>
   ```

### B. Neon / Railway / Render / VPS (Plain PostgreSQL)
Because plain PostgreSQL lacks Supabase's proprietary PostgREST and Auth layer, running on plain PostgreSQL works in two modes:
1. **Frontend-Only / Offline / Seed Mode:**
   The frontend runs without any database connection (`NEXT_PUBLIC_DATA_BACKEND=seed`). All public schedules, verified doctrine library (80 articles), researched society profiles, and chaplaincy history are served directly from built-in seed structures.
2. **REST API Mode (`NEXT_PUBLIC_DATA_BACKEND=api`):**
   Connect a standalone backend (NestJS, Express, FastAPI, or Go service) to your PostgreSQL database.
   - Run migrations `0000` to `0005` and seeds `0001` and `0003` using `./database/apply.sh`.
   - The backend service sets `app.user_id` inside the database transaction per request:
     ```sql
     select set_config('app.user_id', '<USER_UUID>', true);
     ```
   - Set in `apps/web/.env.local`:
     ```env
     NEXT_PUBLIC_DATA_BACKEND=api
     NEXT_PUBLIC_API_URL=https://api.yourdomain.com
     ```
   - If the API service is ever temporarily unreachable, the frontend automatically falls back to seed data without throwing 500 errors.

---

## 4. Backups and Migration

To export and migrate the database at any time between Supabase, Neon, Railway, or a VPS:
```bash
# Export
pg_dump --clean --if-exists --no-owner --no-privileges -d "$SOURCE_DATABASE_URL" > omph_backup.sql

# Restore
psql -d "$TARGET_DATABASE_URL" -f omph_backup.sql
```
