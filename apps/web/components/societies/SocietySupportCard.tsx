"use client";

import { useState } from "react";
import { Building2, Copy, Check, Heart } from "lucide-react";

export function SocietySupportCard({
  societyName,
  bankName,
  accountName,
  accountNumber,
}: {
  societyName: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}) {
  const [copied, setCopied] = useState(false);

  function copyAcct() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }

  return (
    <div
      style={{
        background: "var(--paper)",
        border: "1px solid var(--gold)",
        borderLeft: "4px solid var(--gold)",
        borderRadius: "6px",
        padding: "1rem",
        marginTop: "1.25rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }}>
        <Heart size={16} color="var(--burgundy)" />
        <h4 style={{ margin: 0, fontSize: "0.95rem", color: "var(--navy)" }}>
          Support {societyName}
        </h4>
      </div>
      <p className="muted small" style={{ margin: "0 0 0.65rem", fontSize: "0.82rem", lineHeight: 1.4 }}>
        Donations directly support this pious society&rsquo;s meetings, apostolates, and charitable outreach.
      </p>

      <div style={{ background: "var(--ivory)", padding: "0.75rem 0.95rem", borderRadius: "4px", border: "1px solid var(--line)", marginBottom: "0.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "0.82rem", color: "var(--ink)", marginBottom: "0.25rem" }}>
              <span style={{ color: "var(--muted)", textTransform: "uppercase", fontSize: "0.72rem", letterSpacing: "0.05em" }}>Bank: </span>
              <strong style={{ color: "var(--marian)" }}>{bankName}</strong>
            </div>
            <div style={{ marginBottom: "0.2rem" }}>
              <span style={{ color: "var(--muted)", textTransform: "uppercase", fontSize: "0.72rem", letterSpacing: "0.05em", display: "block" }}>
                Account Number:
              </span>
              <strong style={{ fontSize: "1.2rem", fontFamily: "monospace", color: "var(--navy)", letterSpacing: "0.04em" }}>
                {accountNumber}
              </strong>
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--ink)", fontWeight: 600 }}>
              <span style={{ color: "var(--muted)", fontWeight: 400 }}>Account Name: </span>
              {accountName}
            </div>
          </div>

          <button
            type="button"
            onClick={copyAcct}
            className="btn secondary small"
            style={{ padding: "0.35rem 0.65rem", fontSize: "0.78rem" }}
          >
            {copied ? <><Check size={13} color="green" /> Copied!</> : <><Copy size={13} /> Copy</>}
          </button>
        </div>
      </div>
    </div>
  );
}
