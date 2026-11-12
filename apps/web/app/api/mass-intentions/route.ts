import { NextResponse } from "next/server";
import { getLiveMassIntentions, saveBookedMassIntention } from "@/lib/data/server-store";
import { lagosDateString } from "@/lib/time/lagos";
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
    const reference = generateRef();

    saveBookedMassIntention({
      reference,
      text: body.text,
      displayName: body.anonymous ? "Anonymous Parishioner" : body.displayName || "Anonymous Parishioner",
      scheduledDate: body.preferredDate || lagosDateString(),
      endDate: body.endDate || null,
      numberOfDays: body.numberOfDays || 1,
      dates: body.dates || (body.preferredDate ? [body.preferredDate] : [lagosDateString()]),
      activityName: body.activityName || "Holy Mass",
      contact: body.privateContact,
    });

    // Supabase optional sync
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (sbUrl && sbKey) {
      try {
        const sb = createClient(sbUrl, sbKey, { auth: { persistSession: false } });
        await sb.from("mass_intentions").insert({
          reference,
          intention_text: body.text,
          display_name: body.displayName,
          is_anonymous: Boolean(body.anonymous),
          private_contact: body.privateContact,
          preferred_date: body.preferredDate,
          status: "pending_payment",
        });
      } catch (err) {
        console.warn("Supabase mass intention sync note:", err);
      }
    }

    return NextResponse.json({ ok: true, reference });
  } catch (err: any) {
    console.error("Mass intention submission failed:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to submit mass intention" },
      { status: 500 },
    );
  }
}
