#!/usr/bin/env bash
# database/apply.sh
# Applies all migrations and seeds to any PostgreSQL database (Neon, Railway, Render, VPS, or Supabase).
# Usage:
#   DATABASE_URL="postgres://user:password@host:5432/dbname" ./database/apply.sh
#   Or with IS_SUPABASE=true if targeting a Supabase instance (to skip 0000_portable_compat.sql):
#   IS_SUPABASE=true DATABASE_URL="..." ./database/apply.sh

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is required."
  echo "Example: export DATABASE_URL=\"postgresql://postgres:password@localhost:5432/omph\""
  exit 1
fi

echo "=== Our Mother of Perpetual Help Chaplaincy Database Setup ==="
echo "Targeting PostgreSQL database..."

if [ "$IS_SUPABASE" != "true" ]; then
  echo "Applying 0000_portable_compat.sql (Plain PostgreSQL / Neon / Railway / VPS compatibility)..."
  psql "$DATABASE_URL" -f "$DIR/migrations/0000_portable_compat.sql"
else
  echo "Skipping 0000_portable_compat.sql (Supabase instance detected)."
fi

echo "Applying 0001_core.sql..."
psql "$DATABASE_URL" -f "$DIR/migrations/0001_core.sql"

echo "Applying 0002_rpc_and_seed_rbac.sql..."
psql "$DATABASE_URL" -f "$DIR/migrations/0002_rpc_and_seed_rbac.sql"

echo "Applying 0003_admin_cms.sql..."
psql "$DATABASE_URL" -f "$DIR/migrations/0003_admin_cms.sql"

echo "Applying 0004_readings_and_saints.sql..."
psql "$DATABASE_URL" -f "$DIR/migrations/0004_readings_and_saints.sql"

echo "Applying 0005_liturgical_overrides.sql..."
psql "$DATABASE_URL" -f "$DIR/migrations/0005_liturgical_overrides.sql"

echo "Applying seeds/0001_schedule_and_societies.sql..."
psql "$DATABASE_URL" -f "$DIR/seeds/0001_schedule_and_societies.sql"

echo "Applying seeds/0003_society_details.sql..."
psql "$DATABASE_URL" -f "$DIR/seeds/0003_society_details.sql"

echo "=== All migrations and seeds applied successfully! ==="
