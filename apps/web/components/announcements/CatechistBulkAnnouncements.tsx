"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { parseBulkAnnouncements } from "@/lib/announcements/parser";
import { SEED_ANNOUNCEMENTS } from "@/lib/data/seed";
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
  Send,
  AlertCircle,
} from "lucide-react";

const STORAGE_KEY = "omph_bulk_announcements_raw_v1";

const SAMPLE_BULK_INPUT = `1. CWO MONTHLY GENERAL MEETING
All mothers of the Catholic Women Organisation (CWO) are reminded of our monthly meeting this Saturday at 9:00 AM at the Chaplaincy Hall. Please come in your official CWO uniform. New mothers are warmly welcome.
Issued by: Catholic Women Organisation (CWO)

2. SACRAMENT OF INFANT BAPTISM
The Sacrament of Infant Baptism for this month will be celebrated on the third Saturday at 10:00 AM. Parents and godparents must attend the preparatory catechesis on Friday evening at 5:00 PM. Registration is ongoing with the Catechist.
Issued by: Chaplaincy Catechetical Commission

3. HARVEST & BAZAAR LEVY SUBMISSIONS
All statutory bodies (CMO, CWO, CYON), pious societies, and zonal units are requested to submit their progress reports and harvest levy envelopes to the Harvest Planning Committee after this Mass.
Issued by: Harvest & Bazaar Committee

4. YOUTH FELLOWSHIP & ACADEMIC RETREAT
The Catholic Youth Organization of Nigeria (CYON) and NFCS will host their joint monthly academic prayer retreat this Sunday at 4:00 PM. All students preparing for university exams are encouraged to attend.
Issued by: CYON & NFCS`;

export function CatechistBulkAnnouncements() {
  const [rawText, setRawText] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Load saved draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRawText(saved);
      } else {
        setRawText(SAMPLE_BULK_INPUT);
      }
    } catch {
      setRawText(SAMPLE_BULK_INPUT);
    }
  }, []);

  const parsedAnnouncements: Announcement[] = useMemo(() => {
    return parseBulkAnnouncements(rawText);
  }, [rawText]);

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, rawText);
      localStorage.setItem("omph_announcements_parsed_v1", JSON.stringify(parsedAnnouncements));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3500);
    } catch (e) {
      console.error(e);
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
      ...parsedAnnouncements.map((a, i) => `*${i + 1}. ${a.title.toUpperCase()}*\n${a.body}\n_(Issued by: ${a.issuedBy || "Chaplaincy Secretariat"})_\n`),
      "━━━━━━━━━━━━━━━━━━━━━━━━━",
      "For inquiries, contact the Catechist: 08063314891 or Chaplain: 09044469505",
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "100%", maxWidth: "100%", overflowX: "hidden", boxSizing: "border-box" }}>
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
            <p style={{ margin: 0, color: "#cbd5e1", maxWidth: "42rem", fontSize: "0.92rem", lineHeight: 1.5 }}>
              Enter or paste all notices for the Sunday bulletin in the box below. The system automatically
              formats them for both the <strong>Church Projector</strong> and the <strong>Website</strong>.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <Link
              href="/projector?tab=announcements"
              className="btn"
              style={{
                background: "var(--gold)",
                color: "#183b63",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.55rem 1.1rem",
                fontSize: "0.85rem",
              }}
            >
              <Tv size={16} /> Projector View →
            </Link>
          </div>
        </div>
      </div>

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
              {parsedAnnouncements.length} announcement{parsedAnnouncements.length === 1 ? "" : "s"} detected
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
                onClick={handleSave}
                className="btn"
                style={{
                  background: isSaved ? "#16a34a" : "var(--navy)",
                  color: "#fff",
                  fontSize: "0.9rem",
                  padding: "0.55rem 1.25rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <CheckCircle2 size={16} /> {isSaved ? "Saved Successfully!" : "Save & Format All"}
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

          {/* Direct Launch to Projector Card */}
          <div
            style={{
              background: "var(--ivory)",
              border: "1.5px solid var(--gold)",
              borderRadius: "8px",
              padding: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <strong style={{ display: "block", color: "var(--navy)", fontSize: "0.95rem" }}>
                Ready for Church Service?
              </strong>
              <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                Display these {parsedAnnouncements.length} announcements on the church projector with high-contrast text.
              </span>
            </div>

            <Link
              href="/projector?tab=announcements"
              className="btn"
              style={{ fontSize: "0.85rem", padding: "0.5rem 1rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Tv size={15} /> Open Projector Screen →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
