import { NextResponse } from "next/server";
import { getDatabaseRetentionStats, purgeOldRecordsNow } from "@/lib/data/server-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = getDatabaseRetentionStats();
  return NextResponse.json({ stats });
}

export async function POST() {
  try {
    const { purgedCount } = purgeOldRecordsNow();
    const updatedStats = getDatabaseRetentionStats();
    return NextResponse.json({
      ok: true,
      purgedCount,
      stats: updatedStats,
      message: `Successfully purged ${purgedCount} archived records older than 90 days.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to purge archived records" },
      { status: 500 },
    );
  }
}
