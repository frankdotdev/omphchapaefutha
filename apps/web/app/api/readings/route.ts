import { NextResponse } from "next/server";
import { resolveReadings } from "@/lib/liturgy/readings";
import { getDataClient } from "@/lib/data";
import { lagosDateString } from "@/lib/time/lagos";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || lagosDateString();

  try {
    const client = getDataClient();
    const staff = await client.getDailyReadings(date).catch(() => null);
    const result = await resolveReadings(date, staff, { allowCuratedFallback: true });

    if (result.kind !== "link" && result.readings) {
      return NextResponse.json({
        ok: true,
        date,
        source: result.kind,
        readings: result.readings,
      });
    }

    return NextResponse.json({
      ok: false,
      date,
      source: "none",
      readings: null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, date, error: err?.message || "Failed to resolve readings" },
      { status: 500 },
    );
  }
}
