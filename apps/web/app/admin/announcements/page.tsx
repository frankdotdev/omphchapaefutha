import type { Metadata } from "next";
import { CatechistBulkAnnouncements } from "@/components/announcements/CatechistBulkAnnouncements";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Announcement Management — OMPH AE-FUTHA",
  description: "Official Catechist and Admin announcement management portal for Sunday bulletins and church projector.",
};

export default function AdminAnnouncementsPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            color: "var(--navy)",
            fontWeight: 600,
            fontSize: "0.9rem",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={16} /> Back to Chaplaincy Site
        </Link>
        <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <Shield size={14} color="var(--gold-text)" /> Admin &amp; Catechist Secretariat
        </span>
      </div>

      <CatechistBulkAnnouncements />
    </div>
  );
}
