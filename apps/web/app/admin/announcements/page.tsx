import type { Metadata } from "next";
import { CatechistBulkAnnouncements } from "@/components/announcements/CatechistBulkAnnouncements";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, ExternalLink, Shield, Tv } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Announcement Management — OMPH AE-FUTHA",
  description: "Official Catechist and Admin announcement management portal for Sunday bulletins and church projector.",
};

export default function AdminAnnouncementsPage() {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem" }}>
      {/* Top Admin Action Bar */}
      <div
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          background: "#ffffff",
          padding: "0.85rem 1.25rem",
          borderRadius: "8px",
          border: "1px solid var(--line)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            href="/admin"
            className="btn secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.88rem",
              padding: "0.45rem 0.9rem",
            }}
          >
            <LayoutDashboard size={16} /> ← Back to Admin Dashboard
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              color: "var(--muted)",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} /> Back to Chaplaincy Site
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          <Link
            href="/announcements"
            target="_blank"
            className="btn secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.85rem",
              padding: "0.45rem 0.85rem",
            }}
          >
            <ExternalLink size={15} /> View Live on Website →
          </Link>

          <Link
            href="/projector?tab=announcements"
            target="_blank"
            className="btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.85rem",
              padding: "0.45rem 0.85rem",
              background: "var(--gold)",
              color: "#183b63",
              fontWeight: 700,
            }}
          >
            <Tv size={15} /> Open Projector Screen
          </Link>
        </div>
      </div>

      <CatechistBulkAnnouncements />
    </div>
  );
}
