"use client";

import { useMemo, useRef, useState } from "react";
import { Field } from "./Field";
import { getSubmissionClient } from "@/lib/data/submissions";
import { validateMassIntention, type FieldErrors } from "@/lib/validation";
import { lagosDateString, addDays, formatLongDate } from "@/lib/time/lagos";
import type { MassOption, OfferingInfo } from "@/lib/types";
import { Check, Copy, MessageSquare, Phone, Calendar, HeartHandshake } from "lucide-react";

export function MassIntentionForm({
  options,
  offering,
}: {
  options: MassOption[];
  offering: OfferingInfo;
}) {
  const client = useMemo(() => getSubmissionClient(), []);
  const key = useRef(typeof crypto !== "undefined" ? crypto.randomUUID() : String(Math.random()));

  const [bookingMode, setBookingMode] = useState<"single" | "consecutive" | "custom">("single");
  const [startDate, setStartDate] = useState(lagosDateString());
  const [daysCount, setDaysCount] = useState(1);
  const [customDates, setCustomDates] = useState<string[]>([]);
  const [newCustomDate, setNewCustomDate] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    reference: string;
    totalAmount: number;
    daysCount: number;
    datesDescription: string;
    text: string;
    displayName: string;
  } | null>(null);

  const [declared, setDeclared] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAcct, setCopiedAcct] = useState(false);

  const accountNumber = offering.accountNumber || "3056076559";
  const accountName = offering.accountName || "St. Padre Pio Catholic Chaplaincy";
  const bankName = offering.bankName || "First Bank";
  const catechistPhone = offering.catechistPhone || "08063314891";
  const chaplainPhone = offering.chaplainPhone || "08091422688";

  // Calculate dates and total stipend
  const totalDays = bookingMode === "single" ? 1 : bookingMode === "consecutive" ? Math.max(1, daysCount) : Math.max(1, customDates.length);
  const unitStipend = 300;
  const totalStipend = totalDays * unitStipend;

  const datesSummary = useMemo(() => {
    if (bookingMode === "single") {
      return formatLongDate(startDate);
    }
    if (bookingMode === "consecutive") {
      const end = addDays(startDate, Math.max(1, daysCount) - 1);
      return `${formatLongDate(startDate)} to ${formatLongDate(end)} (${daysCount} days)`;
    }
    return customDates.length > 0 ? `${customDates.length} selected days (${customDates.slice(0, 3).join(", ")}${customDates.length > 3 ? "..." : ""})` : "No dates selected";
  }, [bookingMode, startDate, daysCount, customDates]);

  function addCustomDate() {
    if (newCustomDate && !customDates.includes(newCustomDate)) {
      setCustomDates([...customDates, newCustomDate].sort());
      setNewCustomDate("");
    }
  }

  function removeCustomDate(d: string) {
    setCustomDates(customDates.filter((x) => x !== d));
  }

  function copyToClipboard(text: string, type: "code" | "acct") {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === "code") {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2500);
      } else {
        setCopiedAcct(true);
        setTimeout(() => setCopiedAcct(false), 2500);
      }
    }
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    if (f.get("website")) return;

    const text = String(f.get("text") ?? "").trim();
    const displayName = String(f.get("name") ?? "").trim();
    const contact = String(f.get("contact") ?? "").trim();
    const preferredActivityId = String(f.get("mass") ?? "") || null;

    const v = {
      text,
      preferredDate: startDate,
      contact,
    };
    const errs = validateMassIntention(v, lagosDateString());
    if (bookingMode === "custom" && customDates.length === 0) {
      errs.preferredDate = "Please add at least one date for your Mass intention.";
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    setFailure(null);

    const datesList = bookingMode === "single"
      ? [startDate]
      : bookingMode === "consecutive"
      ? Array.from({ length: daysCount }, (_, i) => addDays(startDate, i))
      : customDates;

    try {
      const res = await client.submitMassIntention({
        idempotencyKey: key.current,
        text,
        displayName,
        anonymous,
        privateContact: contact,
        preferredDate: startDate,
        endDate: bookingMode === "consecutive" ? addDays(startDate, daysCount - 1) : undefined,
        numberOfDays: totalDays,
        dates: datesList,
        preferredActivityId,
        offeringAmount: totalStipend,
      });

      setSubmittedData({
        reference: res.reference,
        totalAmount: totalStipend,
        daysCount: totalDays,
        datesDescription: datesSummary,
        text,
        displayName: anonymous ? "Anonymous" : displayName || "Parishioner",
      });
    } catch {
      setFailure("We could not record your intention just now. Please try again or contact the office directly.");
    } finally {
      setBusy(false);
    }
  }

  async function onDeclare(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!submittedData?.reference) return;
    const tx = String(new FormData(ev.currentTarget).get("tx") ?? "");
    setBusy(true);
    setFailure(null);
    try {
      await client.declarePayment(submittedData.reference, tx);
      setDeclared(true);
    } catch {
      setFailure("We could not record that notification. Please contact the office directly on WhatsApp.");
    } finally {
      setBusy(false);
    }
  }

  // WHATSAPP URL GENERATOR
  function getWhatsAppUrl(phone: string) {
    if (!submittedData) return "#";
    const cleanPhone = phone.replace(/^0/, "234").replace(/[^0-9]/g, "");
    const message = `Peace of Christ Father/Catechist,

I have just booked a Mass Intention on the Chaplaincy website:
• Reference Code: ${submittedData.reference}
• Booked by: ${submittedData.displayName}
• Intention: "${submittedData.text}"
• Number of Days: ${submittedData.daysCount} Mass(es)
• Scheduled Date(s): ${submittedData.datesDescription}
• Total Offering: ₦${submittedData.totalAmount.toLocaleString()}

I have made the transfer to First Bank (St. Padre Pio Catholic Chaplaincy, ${accountNumber}).
Kindly find my proof of transfer attached. Please verify and confirm my booking. Thank you!`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  if (submittedData) {
    return (
      <div className="receipt" role="status" style={{ background: "#fff", border: "2px solid var(--gold)", borderRadius: "8px", padding: "clamp(1.5rem, 4vw, 2.5rem)", boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
        <div style={{ textAlign: "center", borderBottom: "2px solid var(--line)", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
          <span className="eyebrow" style={{ color: "var(--gold-text)", fontWeight: 700 }}>
            Intention Booked Successfully
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", margin: "0.3rem 0", color: "var(--navy)" }}>
            Reference Code
          </h2>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "var(--paper)", border: "2px dashed var(--gold)", padding: "0.6rem 1.25rem", borderRadius: "6px", margin: "0.5rem 0" }}>
            <span style={{ fontFamily: "monospace", fontSize: "1.6rem", fontWeight: 700, color: "var(--marian)", letterSpacing: "0.08em" }}>
              {submittedData.reference}
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(submittedData.reference, "code")}
              className="btn secondary small"
              style={{ padding: "0.3rem 0.6rem", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
            >
              {copiedCode ? <><Check size={14} color="green" /> Copied!</> : <><Copy size={14} /> Copy Code</>}
            </button>
          </div>
          <p className="muted small" style={{ margin: "0.4rem 0 0" }}>
            Keep this reference code safe. You will quote it to the Catechist or Chaplain and can track its status online anytime.
          </p>
        </div>

        {/* Intention Summary */}
        <div style={{ background: "var(--ivory)", borderRadius: "6px", padding: "1rem 1.25rem", marginBottom: "1.5rem", border: "1px solid var(--line)" }}>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.95rem" }}>
            <strong>Intention:</strong> &ldquo;{submittedData.text}&rdquo;
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontSize: "0.9rem", color: "var(--muted)" }}>
            <span>📅 <strong>Dates:</strong> {submittedData.datesDescription}</span>
            <span>✝ <strong>Masses:</strong> {submittedData.daysCount} Day(s)</span>
            <span>💰 <strong>Total Offering:</strong> <strong style={{ color: "var(--burgundy)", fontSize: "1.05rem" }}>₦{submittedData.totalAmount.toLocaleString()}</strong> (₦300/Mass)</span>
          </div>
        </div>

        {/* Bank Payment Instructions */}
        <div style={{ background: "#fff", border: "1px solid var(--line)", borderLeft: "4px solid var(--marian)", borderRadius: "6px", padding: "1.25rem", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.2rem", margin: "0 0 0.5rem", color: "var(--navy)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <HeartHandshake size={20} color="var(--gold)" />
            Chaplaincy Bank Account for Offering
          </h3>
          <p className="muted small" style={{ margin: "0 0 0.75rem" }}>
            Please transfer the offering of <strong>₦{submittedData.totalAmount.toLocaleString()}</strong> to the following chaplaincy account:
          </p>
          
          <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "0.9rem 1.1rem", borderRadius: "6px", marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>
                  {bankName}
                </span>
                <strong style={{ fontSize: "1.35rem", color: "var(--navy)", fontFamily: "monospace", letterSpacing: "0.04em" }}>
                  {accountNumber}
                </strong>
                <span style={{ display: "block", fontSize: "0.9rem", color: "var(--ink)", fontWeight: 600 }}>
                  {accountName}
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(accountNumber, "acct")}
                className="btn secondary"
                style={{ fontSize: "0.85rem", padding: "0.45rem 0.85rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                {copiedAcct ? <><Check size={16} color="green" /> Copied!</> : <><Copy size={16} /> Copy Account Number</>}
              </button>
            </div>
          </div>

          <p className="muted small" style={{ margin: 0, fontStyle: "italic", fontSize: "0.82rem", lineHeight: 1.45 }}>
            <strong>Historical Note:</strong> The bank account retains the registered name <em>St. Padre Pio Catholic Chaplaincy</em>, as titled prior to the chaplaincy&rsquo;s dedication under Our Mother of Perpetual Help by the late Bishop Peter Nworie in 2023.
          </p>
        </div>

        {/* Smart WhatsApp Verification Buttons */}
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "1.25rem", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.15rem", margin: "0 0 0.4rem", color: "#166534", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <MessageSquare size={18} />
            Notify Office via WhatsApp for Immediate Confirmation
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#15803d", margin: "0 0 1rem", lineHeight: 1.5 }}>
            After making your transfer, click below to send your reference code <strong>{submittedData.reference}</strong> and payment screenshot directly to the Catechist or Chaplain. They will confirm and schedule your Mass immediately.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href={getWhatsAppUrl(catechistPhone)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ background: "#25D366", borderColor: "#22c55e", color: "#fff", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", padding: "0.6rem 1.1rem" }}
            >
              <MessageSquare size={16} />
              Message Catechist ({catechistPhone})
            </a>
            <a
              href={getWhatsAppUrl(chaplainPhone)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ background: "#128C7E", borderColor: "#0f766e", color: "#fff", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", padding: "0.6rem 1.1rem" }}
            >
              <MessageSquare size={16} />
              Message Chaplain ({chaplainPhone})
            </a>
          </div>
        </div>

        {/* Optional Online Confirmation Note */}
        {declared ? (
          <p style={{ color: "#166534", background: "#dcfce7", padding: "0.75rem 1rem", borderRadius: "6px", fontSize: "0.9rem" }}>
            ✓ <strong>Thank you.</strong> We have recorded your payment declaration. The chaplaincy office will review and publish your intention.
          </p>
        ) : (
          <form onSubmit={onDeclare} noValidate style={{ borderTop: "1px solid var(--line)", paddingTop: "1rem" }}>
            <Field id="tx" label="Already paid by transfer? (Optional)" hint="Enter your sender name or bank transfer transaction reference so the office can trace it.">
              <input id="tx" name="tx" type="text" maxLength={80} placeholder="e.g. Chukwuemeka / Access Bank transfer" autoComplete="off" />
            </Field>
            <button className="btn secondary" type="submit" disabled={busy} style={{ fontSize: "0.88rem" }}>
              {busy ? "Saving..." : "Record Payment Declaration Online"}
            </button>
          </form>
        )}

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <a href={`/mass-intentions/status?ref=${submittedData.reference}`} className="text-link" style={{ fontSize: "0.92rem", fontWeight: 600 }}>
            Check status of this intention online →
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="form">
      <Field id="text" label="Your Mass Intention" hint="What are you offering this Mass for? E.g. Thanksgiving for birthday, Repose of the soul of [Name], Divine healing for [Name], etc." error={errors.text}>
        <textarea
          id="text"
          name="text"
          rows={3}
          maxLength={1000}
          required
          placeholder="e.g. In thanksgiving to God for safe delivery, and for divine healing and protection upon our family."
          aria-invalid={!!errors.text}
        />
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
        <Field id="name" label="Name to display on bulletin / Mass sheet (optional)" hint="Name of the person or family offering the Mass. Leave blank to display anonymously.">
          <input id="name" name="name" type="text" maxLength={80} autoComplete="name" disabled={anonymous} placeholder="e.g. Dr. & Mrs. Okonkwo / Ani Family" />
        </Field>

        <Field id="contact" label="Telephone or WhatsApp (Private)" hint="Used only by the office to contact you. Never shown publicly." error={errors.contact}>
          <input id="contact" name="contact" type="text" maxLength={120} autoComplete="tel" required placeholder="e.g. 08012345678" aria-invalid={!!errors.contact} />
        </Field>
      </div>

      <div className="field check" style={{ marginBottom: "1.25rem" }}>
        <input id="anon" type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
        <label htmlFor="anon">Display anonymously on the public Mass sheet</label>
      </div>

      {/* Booking Mode: Single, Multiple Consecutive, or Custom Dates */}
      <div style={{ background: "var(--ivory)", border: "1px solid var(--line)", borderRadius: "8px", padding: "1.25rem", marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontWeight: 700, fontSize: "0.95rem", color: "var(--navy)", marginBottom: "0.6rem" }}>
          How many days would you like this Mass offered?
        </label>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <button
            type="button"
            className={`btn ${bookingMode === "single" ? "" : "secondary"}`}
            style={{ fontSize: "0.85rem", padding: "0.45rem 0.9rem" }}
            onClick={() => setBookingMode("single")}
          >
            Single Day (1 Mass)
          </button>
          <button
            type="button"
            className={`btn ${bookingMode === "consecutive" ? "" : "secondary"}`}
            style={{ fontSize: "0.85rem", padding: "0.45rem 0.9rem" }}
            onClick={() => setBookingMode("consecutive")}
          >
            Multiple Consecutive Days (Novena / Weeks)
          </button>
          <button
            type="button"
            className={`btn ${bookingMode === "custom" ? "" : "secondary"}`}
            style={{ fontSize: "0.85rem", padding: "0.45rem 0.9rem" }}
            onClick={() => setBookingMode("custom")}
          >
            Multiple Specific Dates
          </button>
        </div>

        {bookingMode === "single" && (
          <Field id="date" label="Preferred date" hint="Select the date you wish the Holy Mass to be offered." error={errors.preferredDate}>
            <input
              id="date"
              name="date"
              type="date"
              min={lagosDateString()}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Field>
        )}

        {bookingMode === "consecutive" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <Field id="startDate" label="Start Date">
              <input
                id="startDate"
                type="date"
                min={lagosDateString()}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Field>
            <Field id="daysCount" label="Number of Days (Masses)" hint="E.g. 3 days, 7 days, 9 days (Novena), 30 days (Gregorian)">
              <input
                id="daysCount"
                type="number"
                min={2}
                max={60}
                value={daysCount}
                onChange={(e) => setDaysCount(Math.max(2, parseInt(e.target.value) || 2))}
                required
              />
            </Field>
          </div>
        )}

        {bookingMode === "custom" && (
          <div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end", marginBottom: "0.75rem" }}>
              <div style={{ flex: 1 }}>
                <Field id="customDateInput" label="Add Date to Mass Schedule">
                  <input
                    id="customDateInput"
                    type="date"
                    min={lagosDateString()}
                    value={newCustomDate}
                    onChange={(e) => setNewCustomDate(e.target.value)}
                  />
                </Field>
              </div>
              <button
                type="button"
                className="btn secondary"
                onClick={addCustomDate}
                disabled={!newCustomDate}
                style={{ marginBottom: "1rem", whiteSpace: "nowrap" }}
              >
                + Add Date
              </button>
            </div>

            {customDates.length > 0 ? (
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                {customDates.map((d) => (
                  <span
                    key={d}
                    style={{ background: "#fff", border: "1px solid var(--line)", padding: "0.3rem 0.65rem", borderRadius: "4px", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                  >
                    📅 {d}
                    <button
                      type="button"
                      onClick={() => removeCustomDate(d)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--burgundy)", fontWeight: 700 }}
                      aria-label={`Remove date ${d}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="muted small" style={{ margin: 0 }}>No dates added yet. Pick dates above and click &quot;+ Add Date&quot;.</p>
            )}
          </div>
        )}

        {/* Live Stipend Calculation Box */}
        <div style={{ marginTop: "1rem", borderTop: "1px dashed var(--line)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.9rem", color: "var(--ink)" }}>
            Selected: <strong>{totalDays} Mass{totalDays > 1 ? "es" : ""}</strong> ({datesSummary})
          </span>
          <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--burgundy)" }}>
            Stipend: ₦{totalStipend.toLocaleString()}{" "}
            <span style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 400 }}>(₦300/Mass)</span>
          </span>
        </div>
      </div>

      <Field id="mass" label="Preferred Mass Time (optional)" hint="If you have a preference for which Mass of the day.">
        <select id="mass" name="mass" defaultValue="">
          {options.map((o) => (
            <option key={o.id} value={o.id}>{o.name}</option>
          ))}
        </select>
      </Field>

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {failure && <p className="field-error" role="alert">{failure}</p>}

      <div style={{ marginTop: "1.5rem" }}>
        <button className="btn" type="submit" disabled={busy} style={{ width: "100%", fontSize: "1.05rem", padding: "0.75rem" }}>
          {busy ? "Booking Mass Intention…" : `Proceed to Book (${totalDays} Mass${totalDays > 1 ? "es" : ""} · ₦${totalStipend.toLocaleString()}) →`}
        </button>
      </div>
    </form>
  );
}
