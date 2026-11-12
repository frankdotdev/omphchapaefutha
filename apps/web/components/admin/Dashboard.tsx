"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { friendlyError } from "@/lib/admin/client";
import { can } from "@/lib/admin/resources";
import { useAdmin } from "./AdminShell";
import { Database, Megaphone, Trash2, CheckCircle2, Clock, ShieldAlert } from "lucide-react";

const CARDS = [
  { label: "Intentions awaiting payment check", table: "mass_intentions", col: "state", val: "payment_review", href: "/admin/intentions", perm: "intentions.manage" },
  { label: "Intentions awaiting approval", table: "mass_intentions", col: "state", val: "pending_approval", href: "/admin/intentions", perm: "intentions.manage" },
  { label: "Prayer requests to moderate", table: "prayer_intentions", col: "state", val: "moderation_pending", href: "/admin/prayers", perm: "prayer.moderate" },
  { label: "Announcements in draft", table: "announcements", col: "status", val: "draft", href: "/admin/announcements", perm: "announcements.manage" },
  { label: "Events in draft", table: "events", col: "status", val: "draft", href: "/admin/events", perm: "events.manage" },
];

export function Dashboard() {
  const { client, perms } = useAdmin();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [retentionStats, setRetentionStats] = useState<any>(null);
  const [purging, setPurging] = useState(false);
  const [purgeMsg, setPurgeMsg] = useState("");
  const cards = CARDS.filter((c) => can(perms, c.perm));

  useEffect(() => {
    Promise.all(cards.map((c) => client.count(c.table, c.col, c.val)))
      .then((r) => setCounts(Object.fromEntries(cards.map((c, i) => [c.label, r[i]]))))
      .catch((e) => setError(friendlyError(e)));

    // Load 90-day archive retention stats
    fetch("/api/admin/purge-archive")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.stats) setRetentionStats(data.stats);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const handleManualPurge = async () => {
    if (!confirm("Are you sure you want to permanently purge all archived records older than 90 days to free database space?")) {
      return;
    }
    setPurging(true);
    setPurgeMsg("");
    try {
      const res = await fetch("/api/admin/purge-archive", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setRetentionStats(data.stats);
        setPurgeMsg(data.message || `Successfully purged ${data.purgedCount} expired records.`);
        setTimeout(() => setPurgeMsg(""), 5000);
      }
    } catch {
      alert("Failed to complete archive purge.");
    } finally {
      setPurging(false);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
        <h1 style={{ margin: 0 }}>Chaplaincy Admin Dashboard</h1>
        <Link
          href="/admin/announcements"
          className="btn"
          style={{
            fontSize: "0.85rem",
            padding: "0.45rem 0.9rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "var(--navy)",
            color: "#fff",
          }}
        >
          <Megaphone size={16} /> Sunday Announcements Manager →
        </Link>
      </div>

      {error && <p className="field-error" role="alert">{error}</p>}
      {cards.length === 0 && <p>Your role has no sections assigned yet. Ask a Super Admin to update your access.</p>}

      <ul className="admin-cards">
        {cards.map((c) => (
          <li key={c.label}>
            <Link href={c.href}>
              <span className="num">{counts[c.label] ?? "–"}</span>
              <span>{c.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Database Retention Policy & 90-Day Archiving Alert Card */}
      <div
        style={{
          marginTop: "2.5rem",
          background: "#ffffff",
          border: "1px solid var(--line)",
          borderTop: "3px solid var(--gold)",
          borderRadius: "8px",
          padding: "1.5rem",
          boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--gold-text)",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <Database size={16} /> Storage Management &amp; Auto-Archive Rules
            </span>
            <h2 style={{ fontSize: "1.35rem", margin: "0.3rem 0 0.5rem", color: "var(--navy)" }}>
              Database Space &amp; 90-Day Retention Notice
            </h2>
            <p className="muted" style={{ margin: 0, fontSize: "0.9rem", maxWidth: "48rem", lineHeight: 1.55 }}>
              • <strong>Announcements:</strong> Expire and move to archive after their specified duration (default: 7 days).<br />
              • <strong>Mass Intentions:</strong> Active only on their scheduled dates. Concluded bookings archive immediately.<br />
              • <strong>Events:</strong> Disappear from public view once the event date/time has passed.<br />
              • <strong>Prayer Requests:</strong> Active for 9 days (Novena period), then automatically archived.<br />
              • <strong>90-Day Purge:</strong> All archived records older than 90 days are permanently purged to preserve database storage.
            </p>
          </div>

          <button
            type="button"
            onClick={handleManualPurge}
            disabled={purging}
            className="btn secondary"
            style={{
              fontSize: "0.85rem",
              padding: "0.5rem 1rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "#dc2626",
              borderColor: "#fca5a5",
            }}
          >
            <Trash2 size={16} /> {purging ? "Purging Old Archive..." : "Purge Records Older Than 90 Days"}
          </button>
        </div>

        {purgeMsg && (
          <div style={{ marginTop: "1rem", background: "#f0fdf4", border: "1px solid #86efac", color: "#166534", padding: "0.6rem 0.9rem", borderRadius: "4px", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <CheckCircle2 size={16} /> {purgeMsg}
          </div>
        )}

        {retentionStats && (
          <div
            style={{
              marginTop: "1.25rem",
              paddingTop: "1rem",
              borderTop: "1px dashed var(--line)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            <div style={{ background: "var(--ivory)", padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase" }}>Active Notices</span>
              <strong style={{ display: "block", fontSize: "1.25rem", color: "var(--navy)" }}>{retentionStats.activeAnnouncements}</strong>
            </div>
            <div style={{ background: "var(--ivory)", padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase" }}>Active Intentions</span>
              <strong style={{ display: "block", fontSize: "1.25rem", color: "var(--navy)" }}>{retentionStats.activeIntentions}</strong>
            </div>
            <div style={{ background: "var(--ivory)", padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase" }}>Active Prayers (9 Days)</span>
              <strong style={{ display: "block", fontSize: "1.25rem", color: "var(--navy)" }}>{retentionStats.activePrayers}</strong>
            </div>
            <div style={{ background: "var(--ivory)", padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase" }}>Archived Records</span>
              <strong style={{ display: "block", fontSize: "1.25rem", color: "var(--muted)" }}>
                {retentionStats.archivedAnnouncements + retentionStats.archivedIntentions + retentionStats.archivedPrayers}
              </strong>
            </div>
            <div style={{ background: retentionStats.pendingPurgeCount > 0 ? "#fef2f2" : "var(--ivory)", padding: "0.75rem 1rem", borderRadius: "6px", border: retentionStats.pendingPurgeCount > 0 ? "1px solid #fecaca" : "1px solid var(--line)" }}>
              <span style={{ fontSize: "0.75rem", color: retentionStats.pendingPurgeCount > 0 ? "#dc2626" : "var(--muted)", textTransform: "uppercase", fontWeight: retentionStats.pendingPurgeCount > 0 ? 700 : 400 }}>
                Pending 90-Day Purge
              </span>
              <strong style={{ display: "block", fontSize: "1.25rem", color: retentionStats.pendingPurgeCount > 0 ? "#dc2626" : "var(--navy)" }}>
                {retentionStats.pendingPurgeCount}
              </strong>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
