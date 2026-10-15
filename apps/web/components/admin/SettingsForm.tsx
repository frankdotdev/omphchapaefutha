"use client";

import { useEffect, useState } from "react";
import { friendlyError } from "@/lib/admin/client";
import { SETTING_KEYS } from "@/lib/admin/resources";
import { Field } from "@/components/forms/Field";
import { useAdmin } from "./AdminShell";

export function SettingsForm() {
  const { client } = useAdmin();
  const [vals, setVals] = useState<Record<string, string> | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    client.getSettings().then((s) => setVals(Object.fromEntries(SETTING_KEYS.map((k) => [k.key, s[k.key] ?? ""])))).catch((e) => { setError(friendlyError(e)); setVals({}); });
  }, [client]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(""); setNotice("");
    try {
      for (const k of SETTING_KEYS) await client.saveSetting(k.key, (vals![k.key] ?? "").trim(), true);
      setNotice("Settings saved. The public site updates within a few minutes.");
    } catch (err) { setError(friendlyError(err)); } finally { setBusy(false); }
  };

  if (!vals) return <p role="status">Loading…</p>;
  return (
    <form className="form admin-form" onSubmit={save} noValidate>
      <h1>Settings</h1>
      <p className="hint">Everything on this page is shown publicly. Do not enter anything private.</p>
      {SETTING_KEYS.map((k) => (
        <Field key={k.key} id={`s-${k.key}`} label={k.label} hint={k.hint}>
          {k.type === "textarea"
            ? <textarea id={`s-${k.key}`} rows={4} value={vals[k.key] ?? ""} onChange={(e) => setVals({ ...vals, [k.key]: e.target.value })} />
            : <input id={`s-${k.key}`} value={vals[k.key] ?? ""} onChange={(e) => setVals({ ...vals, [k.key]: e.target.value })} />}
        </Field>
      ))}
      {error && <p className="field-error" role="alert">{error}</p>}
      {notice && <p className="admin-ok" role="status">{notice}</p>}
      <button className="btn" type="submit" disabled={busy}>{busy ? "Saving…" : "Save settings"}</button>
    </form>
  );
}
