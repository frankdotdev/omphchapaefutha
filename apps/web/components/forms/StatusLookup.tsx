"use client";

import { useMemo, useState } from "react";
import { Field } from "./Field";
import { getSubmissionClient, STATE_LABEL } from "@/lib/data/submissions";

export function StatusLookup() {
  const client = useMemo(() => getSubmissionClient(), []);
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const ref = String(new FormData(ev.currentTarget).get("ref") ?? "").trim().toUpperCase();
    setResult(null);
    setMsg(null);
    if (!ref) { setMsg("Please enter your reference number."); return; }
    setBusy(true);
    try {
      const state = await client.getMassIntentionStatus(ref);
      if (!state) setMsg("No intention was found with that reference. Please check it and try again.");
      else setResult(STATE_LABEL[state] ?? state);
    } catch {
      setMsg("We could not check that just now. Please try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="form">
      {!client.available && (
        <div className="awaiting" role="note"><strong>Status lookup is not available yet.</strong> Please contact the chaplaincy office.</div>
      )}
      <Field id="ref" label="Reference number" hint="For example MI-2610-1001">
        <input id="ref" name="ref" type="text" maxLength={30} autoComplete="off" aria-describedby="ref-hint" />
      </Field>
      <button className="btn" type="submit" disabled={busy || !client.available}>{busy ? "Checking…" : "Check status"}</button>
      <div aria-live="polite" style={{ marginTop: "1.25rem" }}>
        {result && <p><strong>Status:</strong> {result}</p>}
        {msg && <p className="field-error">{msg}</p>}
      </div>
    </form>
  );
}
