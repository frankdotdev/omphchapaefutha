"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { parseBulkAnnouncements } from "@/lib/announcements/parser";
import type { Announcement } from "@/lib/types";
import {
  Megaphone,
  Tv,
  CheckCircle2,
  FileText,
  Sparkles,
  RotateCcw,
  Copy,
  ExternalLink,
  Clock,
  Archive,
  Database,
  Send,
  Loader2,
} from "lucide-react";

const STORAGE_KEY = "omph_bulk_announcements_raw_v1";

const SAMPLE_BULK_INPUT = `1. Infant baptism will be on 21st of November that's third Saturday. Register with catechist.
Issued by: Chaplaincy Catechetical Commission

2. The Catholic Nurses of Abakaliki Diocese will hold their 2026 annual retreat on 14th November (Saturday) with a Holy Mass by 9:30 am at the chaplaincy.
Issued by: Catholic Nurses Guild

3. Our family planting and seed sowing is still on.
Issued by: Harvest & Sowing Committee

4. There will be Chaplaincy Pastoral Council meeting on Wednesday at 4:30 pm.
Issued by: Chaplaincy Pastoral Council`;

export function CatechistBulkAnnouncements() {
  const [rawText, setRawText] = useState<string>("");
  const [durationDays, setDurationDays] = useState<number>(7);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishSuccess, setPublishSuccess] = useState<{
    count: number;
    expiresAt: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [archiveStats, setArchiveStats] = useState<any>(null);

  // Load saved draft and live status on mount
  useEffect(() => {
    // 1. Try fetching from server API
    fetch("/api/admin/announcements")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.rawDraft) {
            setRawText(data.rawDraft);
          } else {
            const saved = localStorage.getItem(STORAGE_KEY);
            setRawText(saved || SAMPLE_BULK_INPUT);
          }
          if (data.durationDays) {
            setDurationDays(data.durationDays);
          }
          if (data.stats) {
            setArchiveStats(data.stats);
          }
        }
      })
      .catch(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        setRawText(saved || SAMPLE_BULK_INPUT);
      });
  }, []);

  const parsedAnnouncements: Announcement[] = useMemo(() => {
    return parseBulkAnnouncements(rawText);
  }, [rawText]);

  const handlePublish = async () => {
    if (parsedAnnouncements.length === 0) {
      alert("Please enter at least one announcement before publishing.");
      return;
    }

    setIsPublishing(true);
    setPublishSuccess(null);

    try {
      // 1. Client backup
      localStorage.setItem(STORAGE_KEY, rawText);
      localStorage.setItem("omph_announcements_parsed_v1", JSON.stringify(parsedAnnouncements));

      // 2. Publish to Server API (ensures it physically appears on website & projector)
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawText,
          durationDays,
          announcements: parsedAnnouncements,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to publish");
      }

      setPublishSuccess({
        count: data.count || parsedAnnouncements.length,
        expiresAt: data.expiresAt || new Date(Date.now() + durationDays * 86400000).toISOString(),
      });

      // Refresh archive stats
      fetch("/api/admin/purge-archive")
        .then((r) => r.json())
        .then((d) => setArchiveStats(d.stats))
        .catch(() => {});
    } catch (e: any) {
      console.error(e);
      alert(`Error publishing announcements: ${e.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear the announcement box?")) {
      setRawText("");
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("omph_announcements_parsed_v1");
    }
  };

  const handleCopyWhatsApp = () => {
    if (parsedAnnouncements.length === 0) return;
    const text = [
      "*OUR MOTHER OF PERPETUAL HELP CHAPLAINCY, AE-FUTHA*",
      `*SUNDAY ANNOUNCEMENTS & PARISH BULLETIN*`,
      `Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━",
      ...parsedAnnouncements.map(
        (a, i) =>
          `*${i + 1}. ${a.title.toUpperCase()}*\n${a.body}\n_(Issued by: ${a.issuedBy || "Chaplaincy Secretariat"})_\n`,
      ),
      "━━━━━━━━━━━━━━━━━━━━━━━━━",
      "For inquiries, contact the Catechist: 08063314891 or Chaplain: 09044469505",
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", width: "100%", maxWidth: "100%", overflowX: "hidden", boxSizing: "border-box" }}>
      {/* Overview Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #183b63 0%, #0e243d 100%)",
          color: "#fff",
          borderRadius: "8px",
          padding: "clamp(1.25rem, 3vw, 2rem)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--gold)",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <Megaphone size={16} /> Admin &amp; Catechist Secretariat
            </span>
            <h1 style={{ margin: "0.35rem 0 0.5rem", fontSize: "clamp(1.35rem, 3.5vw, 1.85rem)", color: "#fff" }}>
              Sunday Announcements Manager
            </h1>
            <p style={{ margin: 0, color: "#cbd5e1", maxWidth: "44rem", fontSize: "0.92rem", lineHeight: 1.5 }}>
              Type or paste all announcements in the single box below. Choose the public display duration, then click{" "}
              <strong>Publish Live to Website &amp; Projector</strong>.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <Link
              href="/announcements"
              target="_blank"
              className="btn"
              style={{
                background: "var(--paper)",
                color: "var(--navy)",
                fontWeight: 600,
                fontSize: "0.85rem",
                padding: "0.55rem 1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <ExternalLink size={15} /> View Live on Website →
            </Link>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {publishSuccess && (
        <div
          style={{
            background: "#f0fdf4",
            border: "1.5px solid #86efac",
            borderRadius: "8px",
            padding: "1.25rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            boxShadow: "0 4px 14px rgba(22, 101, 52, 0.08)",
          }}
        >
          <div>
            <strong style={{ color: "#166534", fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle2 size={20} color="#16a34a" /> Successfully Published {publishSuccess.count} Announcements!
            </strong>
            <p style={{ margin: "0.25rem 0 0", color: "#1e3a29", fontSize: "0.9rem" }}>
              These announcements are now live on the public website and church projector. They will remain displayed until{" "}
              <strong>
                {new Date(publishSuccess.expiresAt).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </strong>
              , after which they will be automatically moved to the archive.
            </p>
          </div>

          <Link
            href="/announcements"
            target="_blank"
            className="btn"
            style={{
              background: "#16a34a",
              borderColor: "#16a34a",
              color: "#fff",
              fontSize: "0.88rem",
              padding: "0.5rem 1.1rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <ExternalLink size={16} /> Open Public Announcements Page →
          </Link>
        </div>
      )}

      {/* Main Grid: Input Box on Left, Live Parsed Preview on Right */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "1.5rem", width: "100%", boxSizing: "border-box" }}>
        {/* Left Column: Single Big Box Input */}
        <div
          style={{
            background: "#fff",
            border: "2px solid var(--line)",
            borderRadius: "10px",
            padding: "1.5rem",
            boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <label htmlFor="bulk-box" style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--navy)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <FileText size={18} /> Type / Paste All Announcements
            </label>
            <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
              {parsedAnnouncements.length} notice{parsedAnnouncements.length === 1 ? "" : "s"} detected
            </span>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0 0 1rem", lineHeight: 1.4 }}>
            Tip: Number each item (e.g., <strong>1. TITLE</strong>, <strong>2. TITLE</strong>) or leave empty lines between notices. The system splits and formats them smoothly!
          </p>

          <textarea
            id="bulk-box"
            rows={16}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Type or paste all announcements for next Sunday here...

1. CWO MONTHLY MEETING
All mothers are reminded of our meeting this Saturday at 9:00 AM...

2. INFANT BAPTISM
Baptism will take place on the 3rd Saturday..."
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "0.95rem",
              fontFamily: "inherit",
              lineHeight: 1.55,
              border: "1.5px solid var(--line)",
              borderRadius: "8px",
              background: "var(--paper)",
              color: "var(--ink)",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />

          {/* Public Display Duration Selector */}
          <div style={{ marginTop: "1.25rem", padding: "1rem", background: "var(--ivory)", borderRadius: "8px", border: "1px solid var(--line)" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.4rem" }}>
              <Clock size={15} style={{ verticalAlign: "middle", marginRight: "0.35rem", color: "var(--gold-text)" }} />
              Public Display Duration (Auto-Archiving Rule):
            </label>
            <p style={{ margin: "0 0 0.6rem", fontSize: "0.78rem", color: "var(--muted)" }}>
              After this duration, the announcements will automatically expire and be archived from public view.
            </p>

            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {[
                { days: 7, label: "7 Days (1 Week - Default)" },
                { days: 14, label: "14 Days (2 Weeks)" },
                { days: 21, label: "21 Days (3 Weeks)" },
                { days: 30, label: "30 Days (1 Month)" },
              ].map((opt) => (
                <button
                  key={opt.days}
                  type="button"
                  onClick={() => setDurationDays(opt.days)}
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.35rem 0.65rem",
                    borderRadius: "4px",
                    border: "1px solid",
                    borderColor: durationDays === opt.days ? "var(--marian)" : "var(--line)",
                    background: durationDays === opt.days ? "var(--marian)" : "#fff",
                    color: durationDays === opt.days ? "#fff" : "var(--navy)",
                    fontWeight: durationDays === opt.days ? 700 : 500,
                    cursor: "pointer",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => setRawText(SAMPLE_BULK_INPUT)}
                className="btn secondary"
                style={{ fontSize: "0.85rem", padding: "0.45rem 0.85rem" }}
              >
                <Sparkles size={14} style={{ marginRight: "0.3rem" }} /> Load Sample
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="btn secondary"
                style={{ fontSize: "0.85rem", padding: "0.45rem 0.85rem", color: "#dc2626" }}
              >
                <RotateCcw size={14} style={{ marginRight: "0.3rem" }} /> Clear
              </button>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing || parsedAnnouncements.length === 0}
                className="btn"
                style={{
                  background: isPublishing ? "var(--muted)" : "var(--navy)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  padding: "0.6rem 1.4rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  fontWeight: 700,
                }}
              >
                {isPublishing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Publishing...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Publish Live to Website &amp; Projector
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Formatted Preview & Projector Ready Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Header & Quick Sync */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: "1.2rem", color: "var(--navy)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Sparkles size={18} color="var(--gold-text)" /> Smooth Output Preview
            </h3>

            <button
              type="button"
              onClick={handleCopyWhatsApp}
              className="btn secondary"
              style={{ fontSize: "0.82rem", padding: "0.4rem 0.75rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Copy size={14} /> {copied ? "Copied!" : "Copy for WhatsApp"}
            </button>
          </div>

          {parsedAnnouncements.length === 0 ? (
            <div
              style={{
                background: "var(--paper)",
                border: "2px dashed var(--line)",
                borderRadius: "8px",
                padding: "3rem 2rem",
                textAlign: "center",
                color: "var(--muted)",
              }}
            >
              <Megaphone size={36} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
              <p style={{ margin: 0, fontWeight: 600 }}>No announcements typed yet.</p>
              <p style={{ margin: "0.4rem 0 0", fontSize: "0.85rem" }}>
                Type or paste into the box on the left, and each notice will appear here cleanly formatted.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "680px", overflowY: "auto", paddingRight: "0.25rem" }}>
              {parsedAnnouncements.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderTop: item.isUrgent ? "2px solid #dc2626" : "2px solid var(--gold)",
                    borderRadius: "6px",
                    padding: "1.25rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--gold-text)",
                        background: "var(--paper)",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "4px",
                        border: "1px solid var(--line)",
                      }}
                    >
                      Notice {idx + 1} · {item.issuedBy || "Chaplaincy"}
                    </span>

                    {item.isUrgent && (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "#dc2626",
                          background: "#fee2e2",
                          padding: "0.15rem 0.5rem",
                          borderRadius: "4px",
                        }}
                      >
                        URGENT
                      </span>
                    )}
                  </div>

                  <h4 style={{ margin: "0 0 0.6rem", fontSize: "1.15rem", color: "var(--navy)" }}>
                    {item.title}
                  </h4>

                  <div style={{ fontSize: "0.9rem", lineHeight: 1.55, color: "var(--ink)", whiteSpace: "pre-line" }}>
                    {item.body}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Database Space & 90-Day Retention Notice */}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              padding: "1rem 1.25rem",
              fontSize: "0.85rem",
              color: "#334155",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.3rem" }}>
              <Database size={16} color="var(--gold-text)" />
              Database Retention Policy (Saving Space)
            </div>
            <p style={{ margin: 0, lineHeight: 1.45 }}>
              All announcements, concluded Mass intentions, past events, and 9-day prayer requests are automatically archived.
              Archived records older than <strong>90 days</strong> are automatically cleared to optimize database storage.
            </p>
            {archiveStats && (
              <div style={{ marginTop: "0.5rem", fontSize: "0.78rem", color: "#64748b", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <span>Active Notices: <strong>{archiveStats.activeAnnouncements}</strong></span>
                <span>Archived Notices: <strong>{archiveStats.archivedAnnouncements}</strong></span>
                <span>Pending 90-day Purge: <strong>{archiveStats.pendingPurgeCount}</strong></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
