import { NextResponse } from "next/server";
import { getLivePrayerIntentions, saveSubmittedPrayer } from "@/lib/data/server-store";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit")) || 30;
  const prayers = getLivePrayerIntentions(limit);
  return NextResponse.json({ prayers });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    saveSubmittedPrayer({
      body: body.body,
      category: body.category || "General Prayer",
      displayName: body.anonymous ? "Anonymous Parishioner" : body.displayName || "Anonymous Parishioner",
    });

    // Supabase sync if present
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (sbUrl && sbKey) {
      try {
        const sb = createClient(sbUrl, sbKey, { auth: { persistSession: false } });
        await sb.from("prayer_intentions").insert({
          body: body.body,
          category: body.category,
          display_name: body.displayName,
          is_anonymous: Boolean(body.anonymous),
          status: "published",
        });
      } catch (err) {
        console.warn("Supabase prayer sync note:", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to submit prayer intention" },
      { status: 500 },
    );
  }
}
