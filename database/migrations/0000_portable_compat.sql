-- 0000_portable_compat.sql
-- Portable Compatibility Shim for plain PostgreSQL (Neon, Render, Railway, AWS RDS, VPS, Docker).
-- On Supabase, this file automatically detects that auth objects and roles already exist and safely skips them.

DO $$
BEGIN
  -- 1. Create 'anon' role if it does not exist (plain Postgres)
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    BEGIN
      CREATE ROLE anon NOLOGIN;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Role anon creation skipped: %', SQLERRM;
    END;
  END IF;

  -- 2. Create 'authenticated' role if it does not exist (plain Postgres)
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    BEGIN
      CREATE ROLE authenticated NOLOGIN;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Role authenticated creation skipped: %', SQLERRM;
    END;
  END IF;

  -- 3. Only create 'auth' schema and 'auth.uid()' if 'auth' schema does NOT exist (i.e. on non-Supabase plain Postgres)
  -- Supabase already provides a protected auth schema and auth.uid(), so we must not attempt to create or modify them there.
  IF NOT EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'auth') THEN
    BEGIN
      EXECUTE 'CREATE SCHEMA auth';
      EXECUTE $func$
        CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid
        LANGUAGE sql STABLE AS $body$
          SELECT NULLIF(current_setting('app.user_id', true), '')::uuid
        $body$;
      $func$;
      EXECUTE 'GRANT USAGE ON SCHEMA auth TO anon, authenticated';
      EXECUTE 'GRANT EXECUTE ON FUNCTION auth.uid() TO anon, authenticated';
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Auth schema setup skipped: %', SQLERRM;
    END;
  END IF;

  -- 4. Public schema permissions (safe on both Supabase and plain Postgres)
  BEGIN
    EXECUTE 'GRANT USAGE ON SCHEMA public TO anon, authenticated';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Public schema grant skipped: %', SQLERRM;
  END;

  BEGIN
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO anon, authenticated;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Default privileges adjustment skipped: %', SQLERRM;
  END;
END $$;
