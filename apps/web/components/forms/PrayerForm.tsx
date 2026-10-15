"use client";

import { useMemo, useRef, useState } from "react";
import { Field } from "./Field";
import { getSubmissionClient } from "@/lib/data/submissions";
import { validatePrayer, type FieldErrors } from "@/lib/validation";
import { PRAYER_CATEGORIES } from "@/lib/types";

export function PrayerForm() {
  const client = useMemo(() => getSubmissionClient(), []);
  const key = useRef(typeof crypto !== "undefined" ? crypto.randomUUID() : String(Math.random()));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [anonymous, setAnonymous] = useState(true);
  const [consent, setConsent] = useState(false);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    if (f.get("website")) return;
    const v = { body: String(f.get("body") ?? ""), anonymous, name: String(f.get("name") ?? ""), consent };
    const errs = validatePrayer(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    setFailure(null);
    try {
      await client.submitPrayerIntention({
        idempotencyKey: key.current,
        body: v.body,
        category: String(f.get("category") ?? ""),
        displayName: v.name,
        anonymous,
        privateContact: String(f.get("contact") ?? ""),
        consent,
      });
      setDone(true);
    } catch {
      setFailure("We could not record your intention just now. Nothing was submitted; please try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="receipt" role="status">
        <h2>Thank you</h2>
        <p>
          Your intention has been received and will be reviewed before it is shared. We will remember it in prayer.
          Submitting a request does not guarantee any particular outcome; it joins you to the prayer of the community.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="form">
      {!client.available && (
        <div className="awaiting" role="note">
          <strong>Online submission is not available yet.</strong> Please speak to a chaplain or the office to request prayer.
        </div>
      )}
      <Field id="body" label="Your prayer intention" hint="Please avoid private medical or personal details." error={errors.body}>
        <textarea id="body" name="body" rows={4} maxLength={800} required aria-describedby="body-hint" aria-invalid={!!errors.body} />
      </Field>
      <Field id="category" label="Category (optional)">
        <select id="category" name="category" defaultValue="">
          <option value="">Choose a category</option>
          {PRAYER_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      <div className="field check">
        <input id="anon" type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
        <label htmlFor="anon">Share anonymously</label>
      </div>
      {!anonymous && (
        <Field id="name" label="Name to display" error={errors.name}>
          <input id="name" name="name" type="text" maxLength={80} autoComplete="name" aria-invalid={!!errors.name} />
        </Field>
      )}
      <Field id="contact" label="Phone or email (optional, private)" hint="Only if you would like the chaplaincy to be able to reach you. Never shown publicly.">
        <input id="contact" name="contact" type="text" maxLength={120} aria-describedby="contact-hint" />
      </Field>
      <div className="field check">
        <input id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-describedby="consent-err" />
        <label htmlFor="consent">I understand my intention will be reviewed, and may be shown publicly as described above.</label>
      </div>
      {errors.consent && <p className="field-error" id="consent-err" role="alert">{errors.consent}</p>}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {failure && <p className="field-error" role="alert">{failure}</p>}
      <button className="btn" type="submit" disabled={busy || !client.available}>{busy ? "Sending…" : "Submit prayer intention"}</button>
      <p className="muted" style={{ fontSize: "0.92rem", marginTop: "1.25rem" }}>
        This service is not for emergencies or medical or sacramental needs. For an urgent sick call, contact the
        chaplaincy office directly.
      </p>
    </form>
  );
}
