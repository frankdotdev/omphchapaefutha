import { NextResponse } from "next/server";
import {
  savePublishedAnnouncements,
  getLiveAnnouncements,
  getStoredAnnouncementsDetailed,
  deleteStoredAnnouncement,
  clearActiveAnnouncements,
  getAnnouncementDraft,
  getDatabaseRetentionStats,
} from "@/lib/data/server-store";
import { parseBulkAnnouncements } from "@/lib/announcements/parser";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const announcements = getLiveAnnouncements();
  const storedItems = getStoredAnnouncementsDetailed();
  const draft = getAnnouncementDraft();
  const stats = getDatabaseRetentionStats();

  return NextResponse.json({
    announcements,
    storedItems,
    rawDraft: draft.rawText,
    durationDays: draft.durationDays,
    stats,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, id, rawText, durationDays = 7, announcements: clientParsed } = body;

    // Handle delete action via POST as well for maximum client compatibility
    if (action === "delete" && id) {
      const deleted = deleteStoredAnnouncement(id);
      return NextResponse.json({ ok: true, deleted, remaining: getLiveAnnouncements() });
    }

    if (action === "clear_all") {
      const cleared = clearActiveAnnouncements();
      return NextResponse.json({ ok: true, cleared, remaining: [] });
    }

    const itemsToSave =
      Array.isArray(clientParsed) && clientParsed.length > 0
        ? clientParsed
        : parseBulkAnnouncements(rawText || "");

    if (itemsToSave.length === 0) {
      return NextResponse.json(
        { error: "No announcements detected in the text box." },
        { status: 400 },
      );
    }

    const { savedCount, expiresAt } = savePublishedAnnouncements(
      rawText || "",
      itemsToSave,
      Number(durationDays) || 7,
    );

    // Optional Supabase synchronization if configured
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (sbUrl && sbKey) {
      try {
        const sb = createClient(sbUrl, sbKey, { auth: { persistSession: false } });
        for (const item of itemsToSave) {
          await sb.from("announcements").upsert(
            {
              title: item.title,
              slug: item.slug || `notice-${Date.now()}`,
              body: item.body,
              excerpt: item.excerpt || item.body.slice(0, 140),
              issued_by: item.issuedBy || "Chaplaincy Pastoral Council",
              is_urgent: Boolean(item.isUrgent),
              is_featured: Boolean(item.isFeatured),
              status: "published",
              publish_at: new Date().toISOString(),
              expires_at: expiresAt,
            },
            { onConflict: "slug" },
          );
        }
      } catch (err) {
        console.warn("Supabase announcement sync note:", err);
      }
    }

    return NextResponse.json({
      ok: true,
      count: savedCount,
      expiresAt,
      announcements: itemsToSave,
    });
  } catch (err: any) {
    console.error("Failed to publish announcements:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to publish announcements" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const clearAll = searchParams.get("clearAll") === "true";

    if (clearAll) {
      const cleared = clearActiveAnnouncements();
      return NextResponse.json({ ok: true, cleared, remaining: [] });
    }

    if (!id) {
      return NextResponse.json({ error: "Missing announcement id or slug" }, { status: 400 });
    }

    const deleted = deleteStoredAnnouncement(id);
    return NextResponse.json({ ok: true, deleted, remaining: getLiveAnnouncements() });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to delete" }, { status: 500 });
  }
}
