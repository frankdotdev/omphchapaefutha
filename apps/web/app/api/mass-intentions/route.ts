import { NextResponse } from "next/server";
import { getLiveMassIntentions, saveBookedMassIntention } from "@/lib/data/server-store";
import { lagosDateString, addDays } from "@/lib/time/lagos";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function generateRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = new Date().getFullYear();
  return `OMPH-${year}-${code}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || lagosDateString();
  const intentions = getLiveMassIntentions(date);
  return NextResponse.json({ date, intentions });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const reference = body.reference || generateRef();
    const startDate = body.scheduledDate || body.preferredDate || lagosDateString();
    const numDays = Math.max(1, Number(body.numberOfDays) || (body.dates ? body.dates.length : 1));

    let datesList: string[] = Array.isArray(body.dates) && body.dates.length > 0 ? body.dates : [];
    if (datesList.length === 0) {
      datesList = Array.from({ length: numDays }, (_, i) => addDays(startDate, i));
    }
    const endDate = body.endDate || (datesList.length > 0 ? [...datesList].sort().pop()! : addDays(startDate, numDays - 1));

    saveBookedMassIntention({
      reference,
      text: body.text || body.intention_text || "",
      displayName: body.anonymous ? "Anonymous Parishioner" : body.displayName || body.display_name || "Parishioner",
      scheduledDate: startDate,
      endDate,
      numberOfDays: numDays,
      dates: datesList,
      activityName: body.activityName || body.scheduled_activity_name || "Holy Mass",
      contact: body.privateContact || body.private_contact,
    });

    // Supabase optional sync
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (sbUrl && sbKey) {
      try {
        const sb = createClient(sbUrl, sbKey, { auth: { persistSession: false } });
        await sb.from("mass_intentions").upsert({
          reference,
          intention_text: body.text || body.intention_text,
          display_name: body.displayName || body.display_name,
          is_anonymous: Boolean(body.anonymous),
          private_contact: body.privateContact || body.private_contact,
          preferred_date: startDate,
          status: body.status || "pending_payment",
        }, { onConflict: "reference" });
      } catch (err) {
        console.warn("Supabase mass intention sync note:", err);
      }
    }

    return NextResponse.json({ ok: true, reference, scheduledDate: startDate, endDate, numberOfDays: numDays, dates: datesList });
  } catch (err: any) {
    console.error("Mass intention submission failed:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to submit mass intention" },
      { status: 500 },
    );
  }
}
