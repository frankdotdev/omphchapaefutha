"use client";

import { useMemo, useRef, useState } from "react";
import { Field } from "./Field";
import { getSubmissionClient } from "@/lib/data/submissions";
import { validateMassIntention, type FieldErrors } from "@/lib/validation";
import { lagosDateString } from "@/lib/time/lagos";
import type { MassOption, OfferingInfo } from "@/lib/types";

export function MassIntentionForm({ options, offering }: { options: MassOption[]; offering: OfferingInfo }) {
  const client = useMemo(() => getSubmissionClient(), []);
  const key = useRef(typeof crypto !== "undefined" ? crypto.randomUUID() : String(Math.random()));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [declared, setDeclared] = useState(false);
  const [anonymous, setAnonymous] = useState(false);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    if (f.get("website")) return; // honeypot: real visitors never fill this
    const v = {
      text: String(f.get("text") ?? ""),
      preferredDate: String(f.get("date") ?? ""),
      contact: String(f.get("contact") ?? ""),
    };
    const errs = validateMassIntention(v, lagosDateString());
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    setFailure(null);
    try {
      const res = await client.submitMassIntention({
        idempotencyKey: key.current,
        text: v.text,
        displayName: String(f.get("name") ?? ""),
        anonymous,
        privateContact: v.contact,
        preferredDate: v.preferredDate || null,
        preferredActivityId: String(f.get("mass") ?? "") || null,
      });
      setReference(res.reference);
    } catch {
      setFailure("We could not record your intention just now. Nothing was submitted; please try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  async function onDeclare(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!reference) return;
    const tx = String(new FormData(ev.currentTarget).get("tx") ?? "");
    setBusy(true);
    setFailure(null);
    try {
      await client.declarePayment(reference, tx);
      setDeclared(true);
    } catch {
      setFailure("We could not record that notification. Please try again, or contact the office with your reference.");
    } finally {
      setBusy(false);
    }
  }

  if (reference) {
    return (
      <div className="receipt" role="status">
        <p className="eyebrow">Intention received</p>
        <h2>Your reference: <span className="ref">{reference}</span></h2>
        <p>
          Please keep this reference. Your intention is <strong>not yet confirmed</strong>: it is published and
          scheduled only after the office has verified the offering and approved it. The date and Mass you asked
          for are a preference, not a promise.
        </p>
        {(offering.amount || offering.bankInstructions) ? (
          <dl className="facts">
            {offering.amount && (<><dt>Offering</dt><dd>{offering.amount}</dd></>)}
            {offering.bankInstructions && (<><dt>How to give</dt><dd style={{ whiteSpace: "pre-line" }}>{offering.bankInstructions}</dd></>)}
          </dl>
        ) : (
          <p className="muted">Offering instructions have not been published yet. The office will contact you.</p>
        )}
        {declared ? (
          <p><strong>Thank you.</strong> We have noted that you have made your offering. It will be checked by the office; this note is not proof of payment.</p>
        ) : (
          <form onSubmit={onDeclare} noValidate>
            <Field id="tx" label="I have made my offering" hint="Optional: your transfer reference, to help the office find it.">
              <input id="tx" name="tx" type="text" maxLength={80} autoComplete="off" aria-describedby="tx-hint" />
            </Field>
            <button className="btn" type="submit" disabled={busy}>Notify the office that I have paid</button>
          </form>
        )}
        {failure && <p className="field-error" role="alert">{failure}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="form">
      {!client.available && (
        <div className="awaiting" role="note">
          <strong>Online submission is not available yet.</strong> Please contact the chaplaincy office to offer a Mass intention.
        </div>
      )}
      <Field id="text" label="Your intention" hint="This will be read at Mass if approved. Do not include private medical details." error={errors.text}>
        <textarea id="text" name="text" rows={4} maxLength={1000} required aria-describedby="text-hint" aria-invalid={!!errors.text} />
      </Field>
      <Field id="name" label="Name to display (optional)">
        <input id="name" name="name" type="text" maxLength={80} autoComplete="name" disabled={anonymous} />
      </Field>
      <div className="field check">
        <input id="anon" type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
        <label htmlFor="anon">Display anonymously</label>
      </div>
      <Field id="date" label="Preferred date (optional)" hint="A request only. The office will confirm the final date." error={errors.preferredDate}>
        <input id="date" name="date" type="date" min={lagosDateString()} aria-describedby="date-hint" />
      </Field>
      <Field id="mass" label="Preferred Mass (optional)">
        <select id="mass" name="mass" defaultValue="">
          {options.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      </Field>
      <Field id="contact" label="Phone or email (private)" hint="Used only by the office to reach you. Never shown publicly." error={errors.contact}>
        <input id="contact" name="contact" type="text" maxLength={120} autoComplete="email" required aria-describedby="contact-hint" aria-invalid={!!errors.contact} />
      </Field>
      {/* honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {failure && <p className="field-error" role="alert">{failure}</p>}
      <button className="btn" type="submit" disabled={busy || !client.available}>{busy ? "Sending…" : "Submit intention"}</button>
    </form>
  );
}
