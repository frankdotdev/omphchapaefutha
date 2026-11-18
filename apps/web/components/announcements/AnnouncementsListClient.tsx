"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Announcement } from "@/lib/types";
import { Megaphone, Calendar, Tv, Share2, Check, ExternalLink } from "lucide-react";

export function AnnouncementsListClient({
  initialAnnouncements,
}: {
  initialAnnouncements: Announcement[];
}) {
  const [items, setItems] = useState<Announcement[]>(initialAnnouncements);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check local storage if published in this browser
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("omph_announcements_parsed_v1");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed);
          }
        }
      } catch {}
    }

    // 2. Fetch latest live from server API (global cloud store)
    fetch("/api/admin/announcements")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.announcements && Array.isArray(data.announcements)) {
          setItems(data.announcements);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopyNotice = (a: Announcement) => {
    const text = `*${a.title.toUpperCase()}*\n${a.body}\n\nIssued by: ${a.issuedBy || "Our Mother of Perpetual Help Chaplaincy, AE-FUTHA"}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSlug(a.slug);
      setTimeout(() => setCopiedSlug(null), 2500);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          padding: "3rem 1.5rem",
          textAlign: "center",
          maxWidth: "40rem",
          margin: "0 auto",
        }}
      >
        <Megaphone size={36} color="var(--gold)" style={{ margin: "0 auto 1rem" }} />
        <h3 style={{ margin: "0 0 0.5rem", color: "var(--navy)" }}>No Announcements at this Time</h3>
        <p className="muted" style={{ margin: "0 0 1.5rem", fontSize: "0.95rem" }}>
          There are currently no active announcements published for this week. Please check back soon or visit our Admin portal to update notices.
        </p>
        <Link href="/admin/announcements" className="btn secondary" style={{ fontSize: "0.85rem" }}>
          Admin Announcements Manager →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Banner with Projector Quick Link */}
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          padding: "0.85rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--navy)" }}>
            Active Notices ({items.length})
          </span>
          <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
            · Official Chaplaincy Bulletins
          </span>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Link
            href="/projector?tab=announcements"
            className="btn"
            style={{
              fontSize: "0.82rem",
              padding: "0.4rem 0.85rem",
              background: "var(--gold)",
              color: "#183b63",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <Tv size={14} /> Open in Projector Screen
          </Link>
        </div>
      </div>

      {/* Formatted Announcements Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {items.map((a, idx) => (
          <article
            key={a.slug || idx}
            style={{
              background: "#ffffff",
              border: "1px solid var(--line)",
              borderTop: a.isUrgent ? "3px solid #dc2626" : "3px solid var(--gold)",
              borderRadius: "8px",
              padding: "clamp(1.25rem, 3.5vw, 2rem)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
              transition: "transform 0.15s ease",
            }}
          >
            {/* Header: Meta Badges & Date */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "0.6rem",
                marginBottom: "0.85rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--navy)",
                    background: "var(--paper)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    border: "1px solid var(--line)",
                  }}
                >
                  Notice {idx + 1}
                </span>

                {a.category && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--gold-text)",
                      background: "rgba(173, 138, 72, 0.08)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "4px",
                    }}
                  >
                    {a.category}
                  </span>
                )}

                {a.isUrgent && (
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#dc2626",
                      background: "#fee2e2",
                      padding: "0.18rem 0.55rem",
                      borderRadius: "4px",
                    }}
                  >
                    URGENT NOTICE
                  </span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--muted)", fontSize: "0.82rem" }}>
                <Calendar size={14} color="var(--gold)" />
                <time dateTime={a.publishedAt}>
                  {new Date(a.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "Africa/Lagos",
                  })}
                </time>
              </div>
            </div>

            {/* Title */}
            <h3 style={{ margin: "0 0 0.85rem", fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", color: "var(--navy)", lineHeight: 1.3 }}>
              <Link href={`/announcements/${a.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                {a.title}
              </Link>
            </h3>

            {/* Body: Formatted Paragraphs */}
            <div
              style={{
                fontSize: "1rem",
                lineHeight: 1.68,
                color: "var(--ink)",
                whiteSpace: "pre-line",
                marginBottom: "1.25rem",
              }}
            >
              {a.body}
            </div>

            {/* Footer: Issuer & Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.75rem",
                paddingTop: "1rem",
                borderTop: "1px solid var(--line)",
              }}
            >
              <div style={{ fontSize: "0.86rem", color: "var(--muted)" }}>
                {a.issuedBy ? (
                  <span>
                    Issued by: <strong style={{ color: "var(--navy)" }}>{a.issuedBy}</strong>
                  </span>
                ) : (
                  <span>Issued by: Chaplaincy Pastoral Council</span>
                )}
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => handleCopyNotice(a)}
                  className="btn secondary"
                  style={{
                    fontSize: "0.78rem",
                    padding: "0.35rem 0.75rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  {copiedSlug === a.slug ? (
                    <>
                      <Check size={13} color="#16a34a" /> Copied!
                    </>
                  ) : (
                    <>
                      <Share2 size={13} /> Share Notice
                    </>
                  )}
                </button>

                <Link
                  href={`/announcements/${a.slug}`}
                  className="btn secondary"
                  style={{
                    fontSize: "0.78rem",
                    padding: "0.35rem 0.75rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <ExternalLink size={13} /> Full Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
