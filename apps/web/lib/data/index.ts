import type { DataClient } from "./client";
import { SeedDataClient } from "./seed-client";
import { SupabaseDataClient } from "./supabase-client";
import { ApiDataClient } from "./api-client";

let cached: DataClient | null = null;

/**
 * Selects the backend from NEXT_PUBLIC_DATA_BACKEND ("seed" | "supabase" | "api").
 * If "supabase" or "api" is requested but not configured with required environment variables,
 * or if connecting to an external database fails, it falls back to SeedDataClient rather than crashing,
 * ensuring the frontend runs smoothly in any environment (with or without Supabase/backend).
 */
export function getDataClient(): DataClient {
  if (cached) return cached;
  const mode = process.env.NEXT_PUBLIC_DATA_BACKEND ?? "seed";
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (mode === "supabase" && url && key) {
    cached = new SupabaseDataClient(url, key);
  } else if (mode === "api" && apiUrl) {
    cached = new ApiDataClient(apiUrl);
  } else {
    cached = new SeedDataClient();
  }
  return cached;
}


export type { DataClient };
