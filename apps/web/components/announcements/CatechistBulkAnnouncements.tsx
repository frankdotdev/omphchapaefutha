"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
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
  Trash2,
  AlertTriangle,
} from "lucide-react";

const STORAGE_KEY = "omph_bulk_announcements_raw_v1";
const PARSED_STORAGE_KEY = "omph_announcements_parsed_v1";

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
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<{
    count: number;
    expiresAt: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [archiveStats, setArchiveStats] = useState<any>(null);
  const [activePublishedList, setActivePublishedList] = useState<any[]>([]);

  // Function to refresh active announcements from server API & localStorage
  const refreshAnnouncements = useCallback(() => {
    fetch("/api/admin/announcements")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (Array.isArray(data.announcements)) {
            setActivePublishedList(data.announcements);
            // Sync to browser localStorage so client pages and projector see it immediately
            localStorage.setItem(PARSED_STORAGE_KEY, JSON.stringify(data.announcements));
          }
          if (data.rawDraft && !rawText) {
            setRawText(data.rawDraft);
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
        // Fallback to local storage
        try {
          const stored = localStorage.getItem(PARSED_STORAGE_KEY);
          if (stored) setActivePublishedList(JSON.parse(stored));
        } catch {}
      });
  }, [rawText]);

  // Load saved draft and live status on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setRawText(saved);
    } else {
      setRawText(SAMPLE_BULK_INPUT);
    }
    refreshAnnouncements();
  }, [refreshAnnouncements]);

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
      localStorage.setItem(PARSED_STORAGE_KEY, JSON.stringify(parsedAnnouncements));

      // 2. Publish to Server API
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

      refreshAnnouncements();
    } catch (e: any) {
      console.error(e);
      alert(`Error publishing announcements: ${e.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDeleteOne = async (identifier: string, title: string) => {
    if (!confirm(`Delete announcement "${title}"?\n\nIt will be permanently removed from the website and church projector immediately.`)) {
      return;
    }

    setDeletingId(identifier);
    try {
      // 1. Call server API delete
      const res = await fetch(`/api/admin/announcements?id=${encodeURIComponent(identifier)}`, {
        method: "DELETE",
      });

      // 2. Also update local storage immediately
      const updatedList = activePublishedList.filter((a) => a.id !== identifier && a.slug !== identifier);
      setActivePublishedList(updatedList);
      localStorage.setItem(PARSED_STORAGE_KEY, JSON.stringify(updatedList));

      if (res.ok) {
        refreshAnnouncements();
      }
    } catch (e: any) {
      alert(`Failed to delete announcement: ${e.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAllActive = async () => {
    if (!confirm("Are you sure you want to remove ALL currently active announcements from both the website and church projector?")) {
      return;
    }

    try {
      await fetch("/api/admin/announcements?clearAll=true", { method: "DELETE" });
      setActivePublishedList([]);
      localStorage.removeItem(PARSED_STORAGE_KEY);
      refreshAnnouncements();
      alert("All active announcements have been cleared.");
    } catch {
      alert("Failed to clear announcements.");
    }
  };

  const handleClearBox = () => {
    if (confirm("Are you sure you want to clear the announcement text box?")) {
      setRawText("");
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleCopyWhatsApp = () => {
    const listToCopy = parsedAnnouncements.length > 0 ? parsedAnnouncements : activePublishedList;
    if (listToCopy.length === 0) return;
    const text = [
      "*OUR MOTHER OF PERPETUAL HELP CHAPLAINCY, AE-FUTHA*",
      `*SUNDAY ANNOUNCEMENTS & PARISH BULLETIN*`,
      `Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━",
      ...listToCopy.map(
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
              Type or paste announcements in the box below to publish live. You can also delete any notice at any time below even before its expiry date.
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
            border: "1px solid #86efac",
            borderRadius: "8px",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <CheckCircle2 color="#16a34a" size={22} />
            <div>
              <strong style={{ color: "#166534", display: "block" }}>
                Successfully Published Live!
              </strong>
              <span style={{ fontSize: "0.88rem", color: "#15803d" }}>
                {publishSuccess.count} announcement(s) are now live on both the Website and Church Projector. Valid until{" "}
                {new Date(publishSuccess.expiresAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}.
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link
              href="/announcements"
              target="_blank"
              className="btn secondary"
              style={{ fontSize: "0.82rem", padding: "0.35rem 0.75rem" }}
            >
              View on Website →
            </Link>
            <Link
              href="/projector?tab=announcements"
              target="_blank"
              className="btn"
              style={{ fontSize: "0.82rem", padding: "0.35rem 0.75rem", background: "var(--gold)", color: "#183b63" }}
            >
              View on Projector →
            </Link>
          </div>
        </div>
      )}

      {/* 1. CURRENTLY ACTIVE & PUBLISHED ANNOUNCEMENTS SECTION (WITH DELETE ABILITY) */}
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--line)",
          borderTop: "3px solid var(--navy)",
          borderRadius: "8px",
          padding: "clamp(1rem, 2.5vw, 1.5rem)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "var(--navy)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Megaphone size={18} color="var(--gold)" />
              Currently Published Announcements ({activePublishedList.length})
            </h2>
            <p className="muted" style={{ margin: "0.2rem 0 0", fontSize: "0.85rem" }}>
              These notices are actively showing on the public website and projector. You can remove any item immediately.
            </p>
          </div>

          {activePublishedList.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllActive}
              className="btn secondary"
              style={{
                fontSize: "0.8rem",
                padding: "0.4rem 0.8rem",
                color: "#dc2626",
                borderColor: "#fca5a5",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <Trash2 size={14} /> Clear All Announcements
            </button>
          )}
        </div>

        {activePublishedList.length === 0 ? (
          <div style={{ background: "var(--paper)", padding: "1.5rem", borderRadius: "6px", textAlign: "center", color: "var(--muted)", fontSize: "0.9rem" }}>
            No announcements are currently published. Type your notices below and click <strong>Publish Live</strong>.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {activePublishedList.map((item, idx) => (
              <div
                key={item.id || item.slug || idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "0.85rem",
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  borderLeft: item.isUrgent ? "3px solid #dc2626" : "3px solid var(--gold)",
                  borderRadius: "6px",
                  padding: "0.9rem 1.1rem",
                }}
              >
                <div style={{ flex: "1 1 280px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase" }}>
                      Notice {idx + 1}
                    </span>
                    {item.issuedBy && (
                      <span style={{ fontSize: "0.75rem", color: "var(--muted)", background: "#fff", padding: "0.15rem 0.5rem", borderRadius: "3px", border: "1px solid var(--line)" }}>
                        {item.issuedBy}
                      </span>
                    )}
                    {item.isUrgent && (
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#dc2626", background: "#fee2e2", padding: "0.1rem 0.45rem", borderRadius: "3px" }}>
                        URGENT
                      </span>
                    )}
                  </div>
                  <h4 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", color: "var(--navy)" }}>
                    {item.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.45, whiteSpace: "pre-line" }}>
                    {item.body}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <button
                    type="button"
                    disabled={deletingId === (item.id || item.slug)}
                    onClick={() => handleDeleteOne(item.id || item.slug, item.title)}
                    className="btn secondary"
                    style={{
                      fontSize: "0.78rem",
                      padding: "0.4rem 0.75rem",
                      color: "#dc2626",
                      borderColor: "#fca5a5",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <Trash2 size={13} /> {deletingId === (item.id || item.slug) ? "Deleting..." : "Delete Notice"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. BULK COMPOSER & PREVIEW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
          gap: "1.5rem",
          width: "100%",
        }}
      >
        {/* Left Column: Input Box & Settings */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--line)",
            borderTop: "3px solid var(--gold)",
            borderRadius: "8px",
            padding: "clamp(1.25rem, 3vw, 1.75rem)",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.2rem", color: "var(--navy)", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <FileText size={18} color="var(--gold)" />
                Type / Paste All Announcements
              </h3>
              <span style={{ fontSize: "0.82rem", color: "var(--muted)", fontWeight: 600 }}>
                {parsedAnnouncements.length} detected
              </span>
            </div>
            <p className="muted" style={{ margin: "0.35rem 0 0", fontSize: "0.84rem" }}>
              Number each notice (e.g. 1. Title, 2. Title). You can include &ldquo;Issued by: Committee&rdquo;.
            </p>
          </div>

          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="1. INFANT BAPTISM&#10;Infant baptism will be celebrated on the third Saturday...&#10;Issued by: Chaplaincy Catechetical Commission&#10;&#10;2. CWO MONTHLY MEETING&#10;All mothers of CWO are reminded of our meeting...&#10;Issued by: Catholic Women Organisation"
            rows={14}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "0.85rem",
              fontFamily: "var(--sans)",
              fontSize: "0.95rem",
              lineHeight: 1.55,
              border: "1px solid var(--line)",
              borderRadius: "6px",
              background: "var(--paper)",
              color: "var(--ink)",
              resize: "vertical",
            }}
          />

          {/* Public Display Duration Setting */}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              padding: "0.85rem 1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div>
              <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--navy)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Clock size={15} color="var(--gold-text)" />
                Public Display Duration
              </span>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: "#64748b" }}>
                Automatically archives when duration lapses.
              </p>
            </div>

            <select
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              style={{
                padding: "0.4rem 0.75rem",
                fontSize: "0.88rem",
                borderRadius: "4px",
                border: "1px solid var(--line)",
                background: "#fff",
                fontWeight: 600,
                color: "var(--navy)",
              }}
            >
              <option value={7}>7 Days (1 Week - Recommended)</option>
              <option value={14}>14 Days (2 Weeks)</option>
              <option value={21}>21 Days (3 Weeks)</option>
              <option value={30}>30 Days (1 Month)</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
            <button
              type="button"
              disabled={isPublishing || parsedAnnouncements.length === 0}
              onClick={handlePublish}
              className="btn"
              style={{
                flex: "1 1 auto",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: "var(--gold)",
                color: "#183b63",
                fontWeight: 700,
                padding: "0.65rem 1.25rem",
              }}
            >
              {isPublishing ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
              Publish Live to Website &amp; Projector
            </button>

            <button
              type="button"
              onClick={() => setRawText(SAMPLE_BULK_INPUT)}
              className="btn secondary"
              style={{ fontSize: "0.85rem", padding: "0.6rem 0.9rem" }}
            >
              <Sparkles size={14} /> Sample
            </button>

            <button
              type="button"
              onClick={handleClearBox}
              className="btn secondary"
              style={{ fontSize: "0.85rem", padding: "0.6rem 0.9rem" }}
            >
              <RotateCcw size={14} /> Clear
            </button>
          </div>
        </div>

        {/* Right Column: Live Formatted Preview */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--line)",
            borderTop: "3px solid var(--marian)",
            borderRadius: "8px",
            padding: "clamp(1.25rem, 3vw, 1.75rem)",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.2rem", color: "var(--navy)" }}>
                Live Output Preview
              </h3>
              <p className="muted" style={{ margin: "0.2rem 0 0", fontSize: "0.82rem" }}>
                How notices appear on the Projector and Website
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyWhatsApp}
              className="btn secondary"
              style={{ fontSize: "0.82rem", padding: "0.35rem 0.75rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Copy size={14} /> {copied ? "Copied!" : "Copy for WhatsApp"}
            </button>
          </div>

          {parsedAnnouncements.length === 0 ? (
            <div style={{ background: "var(--paper)", padding: "2.5rem 1.5rem", textAlign: "center", borderRadius: "6px", color: "var(--muted)", fontSize: "0.9rem" }}>
              Type your notices on the left to see the formatted output.
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
              Database Retention Policy
            </div>
            <p style={{ margin: 0, lineHeight: 1.45 }}>
              Archived notices older than <strong>90 days</strong> are automatically cleared to optimize database storage.
            </p>
            {archiveStats && (
              <div style={{ marginTop: "0.5rem", fontSize: "0.78rem", color: "#64748b", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <span>Active: <strong>{archiveStats.activeAnnouncements}</strong></span>
                <span>Archived: <strong>{archiveStats.archivedAnnouncements}</strong></span>
                <span>Pending Purge: <strong>{archiveStats.pendingPurgeCount}</strong></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
