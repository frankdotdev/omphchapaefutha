"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, X, Bell } from "lucide-react";
import type { Announcement } from "@/lib/types";

interface Props {
  announcements?: Announcement[];
}

export function UrgentNoticeModal({ announcements = [] }: Props) {
  const [activeNotice, setActiveNotice] = useState<Announcement | null>(null);

  useEffect(() => {
    const urgent = announcements.find((a) => a.isUrgent);
    if (!urgent) return;

    // Check if this specific urgent announcement was already dismissed in this session
    try {
      const dismissed = sessionStorage.getItem(`omph_urgent_dismissed_${urgent.slug}`);
      if (!dismissed) {
        setActiveNotice(urgent);
      }
    } catch {
      setActiveNotice(urgent);
    }
  }, [announcements]);

  const handleDismiss = () => {
    if (activeNotice) {
      try {
        sessionStorage.setItem(`omph_urgent_dismissed_${activeNotice.slug}`, "true");
      } catch {
        // ignore storage errors
      }
    }
    setActiveNotice(null);
  };

  if (!activeNotice) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="urgent-notice-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10, 20, 40, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <div
        style={{
          background: "#fff",
          maxWidth: "32rem",
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          border: "2px solid #b91c1c",
          overflow: "hidden",
        }}
      >
        {/* Banner Header */}
        <div
          style={{
            background: "#b91c1c",
            color: "#fff",
            padding: "0.85rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Bell size={20} className="animate-pulse" />
            <span style={{ fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Important Chaplaincy Notice
            </span>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close urgent notice"
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "0.2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", marginBottom: "1rem" }}>
            <AlertCircle size={28} color="#b91c1c" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
            <div>
              <h2
                id="urgent-notice-title"
                style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.35rem", color: "var(--navy)" }}
              >
                {activeNotice.title}
              </h2>
              {activeNotice.issuedBy && (
                <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0, fontWeight: 600 }}>
                  Issued by: {activeNotice.issuedBy}
                </p>
              )}
            </div>
          </div>

          <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#333", margin: "0 0 1.5rem" }}>
            {activeNotice.excerpt ?? activeNotice.body}
          </p>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={handleDismiss}
              className="btn secondary"
              style={{ fontSize: "0.9rem", padding: "0.5rem 1rem" }}
            >
              Dismiss
            </button>
            <Link
              href={`/announcements/${activeNotice.slug}`}
              onClick={handleDismiss}
              className="btn"
              style={{ fontSize: "0.9rem", padding: "0.5rem 1.25rem", background: "#b91c1c", borderColor: "#991b1b" }}
            >
              Read Full Notice →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
