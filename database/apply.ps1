# database/apply.ps1
# Applies all migrations and seeds to any PostgreSQL database (Neon, Railway, Render, VPS, or Supabase).
# Usage:
#   $env:DATABASE_URL = "postgres://user:password@host:5432/dbname"
#   .\database\apply.ps1
# Or for Supabase:
#   $env:IS_SUPABASE = "true"
#   .\database\apply.ps1

$ErrorActionPreference = "Stop"

if (-not $env:DATABASE_URL) {
    Write-Error "DATABASE_URL environment variable is required. Example: `$env:DATABASE_URL = 'postgresql://postgres:password@localhost:5432/omph'"
    exit 1
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "=== Our Mother of Perpetual Help Chaplaincy Database Setup ===" -ForegroundColor Cyan
Write-Host "Connecting to PostgreSQL database..." -ForegroundColor Yellow

if ($env:IS_SUPABASE -ne "true") {
    Write-Host "Applying 0000_portable_compat.sql (Plain PostgreSQL / Neon / Railway / VPS compatibility)..."
    psql $env:DATABASE_URL -f "$ScriptDir\migrations\0000_portable_compat.sql"
} else {
    Write-Host "Skipping 0000_portable_compat.sql (Supabase instance detected)."
}

Write-Host "Applying 0001_core.sql..."
psql $env:DATABASE_URL -f "$ScriptDir\migrations\0001_core.sql"

Write-Host "Applying 0002_rpc_and_seed_rbac.sql..."
psql $env:DATABASE_URL -f "$ScriptDir\migrations\0002_rpc_and_seed_rbac.sql"

Write-Host "Applying 0003_admin_cms.sql..."
psql $env:DATABASE_URL -f "$ScriptDir\migrations\0003_admin_cms.sql"

Write-Host "Applying 0004_readings_and_saints.sql..."
psql $env:DATABASE_URL -f "$ScriptDir\migrations\0004_readings_and_saints.sql"

Write-Host "Applying 0005_liturgical_overrides.sql..."
psql $env:DATABASE_URL -f "$ScriptDir\migrations\0005_liturgical_overrides.sql"

Write-Host "Applying seeds/0001_schedule_and_societies.sql..."
psql $env:DATABASE_URL -f "$ScriptDir\seeds\0001_schedule_and_societies.sql"

Write-Host "Applying seeds/0003_society_details.sql..."
psql $env:DATABASE_URL -f "$ScriptDir\seeds\0003_society_details.sql"

Write-Host "=== All migrations and seeds applied successfully! ===" -ForegroundColor Green
