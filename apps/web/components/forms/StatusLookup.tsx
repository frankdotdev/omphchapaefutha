"use client";

import { useEffect, useMemo, useState } from "react";
import { Field } from "./Field";
import { getSubmissionClient, STATE_LABEL } from "@/lib/data/submissions";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Clock, Copy, Check, MessageSquare, AlertCircle } from "lucide-react";

export function StatusLookup() {
  const client = useMemo(() => getSubmissionClient(), []);
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";

  const [inputRef, setInputRef] = useState(initialRef);
  const [result, setResult] = useState<any | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialRef) {
      checkStatus(initialRef);
    }
  }, [initialRef]);

  async function checkStatus(refCode: string) {
    const clean = refCode.trim().toUpperCase();
    setResult(null);
    setMsg(null);
    if (!clean) {
      setMsg("Please enter your reference code.");
      return;
    }
    setBusy(true);
    try {
      const data = await client.getMassIntentionStatus(clean);
      if (!data) {
        setMsg("No Mass intention was found with that reference code. Please verify the code or check with the chaplaincy office.");
      } else if (typeof data === "string") {
        setResult({
          status: data,
          statusLabel: STATE_LABEL[data] ?? data,
          reference: clean,
        });
      } else {
        setResult({
          ...data,
          statusLabel: STATE_LABEL[data.status] ?? data.status,
          reference: clean,
        });
      }
    } catch {
      setMsg("Could not check status right now. Please try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  function copyCode(text: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function getWhatsAppUrl(phone: string) {
    if (!result) return "#";
    const cleanPhone = phone.replace(/^0/, "234").replace(/[^0-9]/g, "");
    const message = `Peace of Christ Father/Catechist,

I am checking on my booked Mass intention with Reference Code: ${result.reference}.
• Intended for: ${result.name || "Parishioner"}
• Intention: ${result.text || "Mass Intention"}
• Current Status: ${result.statusLabel}

Kindly let me know if any further details or verification are required. Thank you!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  return (
    <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkStatus(inputRef);
        }}
        noValidate
        className="form"
        style={{ background: "#fff", padding: "1.75rem", borderRadius: "8px", border: "1px solid var(--line)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
      >
        <Field id="ref" label="Enter Reference Code" hint="For example OMPH-2026-X8M2 or MI-2610-1001">
          <input
            id="ref"
            name="ref"
            type="text"
            maxLength={35}
            value={inputRef}
            onChange={(e) => setInputRef(e.target.value.toUpperCase())}
            placeholder="OMPH-2026-..."
            autoComplete="off"
            required
            style={{ fontFamily: "monospace", fontSize: "1.15rem", letterSpacing: "0.06em" }}
          />
        </Field>

        <button className="btn" type="submit" disabled={busy} style={{ width: "100%", padding: "0.65rem" }}>
          {busy ? "Checking Status…" : "Lookup Intention Status"}
        </button>
      </form>

      {msg && (
        <div style={{ marginTop: "1.25rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "6px", padding: "0.85rem 1.1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "#991b1b" }}>
          <AlertCircle size={18} />
          <span>{msg}</span>
        </div>
      )}

      {result && (
        <div
          role="status"
          style={{
            marginTop: "2rem",
            background: "#fff",
            border: "2px solid var(--gold)",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", borderBottom: "1px solid var(--line)", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
              Reference Code
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontFamily: "monospace", fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)" }}>
                {result.reference}
              </span>
              <button
                type="button"
                onClick={() => copyCode(result.reference)}
                className="btn secondary small"
                style={{ padding: "0.25rem 0.5rem", fontSize: "0.78rem" }}
              >
                {copied ? <Check size={14} color="green" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "block", marginBottom: "0.25rem" }}>
              Current Status:
            </span>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "4px",
                fontWeight: 700,
                fontSize: "0.95rem",
                background: result.status === "approved" ? "#dcfce7" : result.status === "payment_review" ? "#fef3c7" : "#eff6ff",
                color: result.status === "approved" ? "#166534" : result.status === "payment_review" ? "#92400e" : "#1e40af",
                border: "1px solid currentColor",
              }}
            >
              {result.status === "approved" ? <CheckCircle size={16} /> : <Clock size={16} />}
              {result.statusLabel}
            </div>
          </div>

          {result.text && (
            <div style={{ background: "var(--ivory)", padding: "0.85rem 1rem", borderRadius: "6px", marginBottom: "1rem" }}>
              <p style={{ margin: "0 0 0.4rem", fontStyle: "italic", fontSize: "0.95rem" }}>
                &ldquo;{result.text}&rdquo;
              </p>
              {result.name && (
                <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "block" }}>
                  Offered by: <strong>{result.name}</strong>
                </span>
              )}
              {result.dates && (
                <span style={{ fontSize: "0.85rem", color: "var(--marian)", display: "block", marginTop: "0.2rem" }}>
                  📅 Scheduled: <strong>{result.dates}</strong>
                </span>
              )}
            </div>
          )}

          {/* Quick WhatsApp Contact Links */}
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: "1rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0 0 0.6rem" }}>
              Need to follow up or confirm payment directly with the chaplaincy pastoral team?
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <a
                href={getWhatsAppUrl("08063314891")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn secondary"
                style={{ fontSize: "0.82rem", padding: "0.45rem 0.75rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                <MessageSquare size={14} color="#25D366" /> WhatsApp Catechist (08063314891)
              </a>
              <a
                href={getWhatsAppUrl("08091422688")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn secondary"
                style={{ fontSize: "0.82rem", padding: "0.45rem 0.75rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                <MessageSquare size={14} color="#128C7E" /> WhatsApp Chaplain (08091422688)
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
