"use client";

import { useState } from "react";
import type { ChurchAccountProject } from "@/lib/types";
import { Copy, Check, MessageSquare, Building2 } from "lucide-react";

export function AccountCard({ project }: { project: ChurchAccountProject }) {
  const [copied, setCopied] = useState(false);

  function copyAcct() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(project.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }

  const cleanPhone = project.receiptContact ? project.receiptContact.split("/")[0].replace(/^0/, "234").replace(/[^0-9]/g, "") : null;
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Peace of Christ, I have just made a donation/support transfer to the ${project.title} (${project.bankName}, ${project.accountNumber}). Kindly find my payment receipt attached.`
      )}`
    : null;

  return (
    <div
      className="card pattern-paper"
      style={{
        background: "#ffffff",
        border: "1px solid var(--line)",
        borderTop: "4px solid var(--gold)",
        borderRadius: "8px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-text)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Building2 size={15} /> {project.bankName}
          </span>
        </div>

        <h3 style={{ fontSize: "1.3rem", margin: "0 0 0.5rem", color: "var(--navy)" }}>
          {project.title}
        </h3>

        <p className="muted" style={{ fontSize: "0.9rem", lineHeight: 1.5, margin: "0 0 1.25rem" }}>
          {project.purpose}
        </p>

        {/* Account Details Box */}
        <div style={{ background: "var(--ivory)", border: "1px solid var(--line)", padding: "0.9rem 1.1rem", borderRadius: "6px", marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
                Account Number
              </span>
              <strong style={{ fontSize: "1.4rem", fontFamily: "monospace", letterSpacing: "0.06em", color: "var(--navy)" }}>
                {project.accountNumber}
              </strong>
              <span style={{ display: "block", fontSize: "0.85rem", color: "var(--ink)", fontWeight: 600, marginTop: "0.15rem" }}>
                {project.accountName}
              </span>
            </div>

            <button
              type="button"
              onClick={copyAcct}
              className="btn secondary small"
              style={{ padding: "0.4rem 0.75rem", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              {copied ? <><Check size={14} color="green" /> Copied!</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
        </div>
      </div>

      <div>
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn secondary"
            style={{ width: "100%", fontSize: "0.88rem", padding: "0.55rem 0.85rem", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
          >
            <MessageSquare size={16} color="#25D366" />
            Send Receipt on WhatsApp ({project.receiptContact})
          </a>
        )}
      </div>
    </div>
  );
}
