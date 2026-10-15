"use client";

import { useCallback, useEffect, useState } from "react";
import { friendlyError, type Option } from "@/lib/admin/client";
import type { Row } from "@/lib/admin/convert";
import { lagosDateString } from "@/lib/time/lagos";
import { STATE_LABEL } from "@/lib/data/submissions";
import { Field } from "@/components/forms/Field";
import { useAdmin } from "./AdminShell";

const TABS: { key: string; label: string; states: string[] }[] = [
  { key: "payment", label: "Payment check", states: ["pending_payment", "payment_review"] },
  { key: "approval", label: "Awaiting approval", states: ["pending_approval"] },
  { key: "approved", label: "Approved", states: ["approved"] },
  { key: "done", label: "Completed and archived", states: ["completed", "archived"] },
  { key: "closed", label: "Rejected and cancelled", states: ["rejected", "cancelled"] },
  { key: "sheet", label: "Daily sheet", states: ["approved", "completed"] },
];

export function IntentionsQueue() {
  const { client } = useAdmin();
  const [tab, setTab] = useState("payment");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [activities, setActivities] = useState<Option[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState<Row | null>(null);
  const [adding, setAdding] = useState(false);
  const [sheetDate, setSheetDate] = useState(lagosDateString(new Date()));

  const load = useCallback(async () => {
    setError(""); setRows(null);
    const t = TABS.find((x) => x.key === tab)!;
    try {
      const r = await client.listWhere("mass_intentions", "state", t.states, { column: "created_at", ascending: tab === "approved" || tab === "sheet" });
      setRows(r);
      if (!activities.length) {
        const a = await client.listWhere("activities", "kind", ["mass"], { column: "name" });
        setActivities(a.map((x) => ({ value: x.id, label: x.name })));
      }
    } catch (e) { setError(friendlyError(e)); setRows([]); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, tab]);
  useEffect(() => { load(); }, [load]);

  const act = async (row: Row, patch: Row, msg: string) => {
    setError(""); setNotice("");
    try { await client.save("mass_intentions", { id: row.id, ...patch }); setNotice(msg); setOpen(null); await load(); }
    catch (e) { setError(friendlyError(e)); }
  };

  const shown = tab === "sheet" ? (rows ?? []).filter((r) => r.scheduled_date === sheetDate).sort((a, b) => (a.list_order ?? 0) - (b.list_order ?? 0)) : rows;
  const actName = (id: string | null) => activities.find((a) => a.value === id)?.label ?? "";

  return (
    <>
      <div className="admin-head">
        <h1>Mass intentions</h1>
        <button type="button" className="btn" onClick={() => setAdding(true)}>Add an intention by hand</button>
      </div>
      <div role="tablist" aria-label="Intention stages" className="admin-tabs">
        {TABS.map((t) => (
          <button key={t.key} type="button" role="tab" aria-selected={tab === t.key} className="tab" onClick={() => { setTab(t.key); setOpen(null); }}>{t.label}</button>
        ))}
      </div>
      {notice && <p className="admin-ok" role="status">{notice}</p>}
      {error && <p className="field-error" role="alert">{error}</p>}

      {adding && <ManualEntry onCancel={() => setAdding(false)} onSave={async (v) => {
        const uid = await client.currentUserId();
        try { await client.save("mass_intentions", { ...v, state: "pending_approval", created_by: uid, payment_verified: false }); setAdding(false); setNotice("Intention added. Approve it from the Awaiting approval tab."); setTab("approval"); await load(); }
        catch (e) { throw new Error(friendlyError(e)); }
      }} />}

      {tab === "sheet" && (
        <div className="sheet-controls no-print">
          <Field id="sheet-date" label="Date"><input id="sheet-date" type="date" value={sheetDate} onChange={(e) => setSheetDate(e.target.value)} /></Field>
          <button type="button" className="btn secondary" onClick={() => window.print()}>Print this sheet</button>
        </div>
      )}

      {shown === null ? <p role="status">Loading…</p> : shown.length === 0 ? <p>Nothing in this list.</p> : tab === "sheet" ? (
        <div className="print-sheet">
          <h2>Mass intentions for {sheetDate}</h2>
          <ol>{shown.map((r) => <li key={r.id}>{r.intention_text}{!r.anonymous && r.display_name ? ` (${r.display_name})` : ""}{r.scheduled_activity_id ? ` — ${actName(r.scheduled_activity_id)}` : ""}</li>)}</ol>
        </div>
      ) : (
        <ul className="queue">
          {shown.map((r) => (
            <li key={r.id} className="queue-item">
              <div className="queue-top">
                <strong>{r.reference}</strong>
                <span className="pill">{STATE_LABEL[r.state as keyof typeof STATE_LABEL] ?? r.state}</span>
              </div>
              <p>{r.intention_text}</p>
              <dl className="queue-meta">
                <div><dt>Name</dt><dd>{r.display_name || "None given"}{r.anonymous ? " (asked not to be named)" : ""}</dd></div>
                <div><dt>Contact (private)</dt><dd>{r.private_contact || "None given"}</dd></div>
                <div><dt>Preferred date</dt><dd>{r.preferred_date || "None"}</dd></div>
                {r.payment_declared && <div><dt>Payment reference given</dt><dd>{r.payment_declared_reference || "Declared, no reference"}</dd></div>}
                {r.scheduled_date && <div><dt>Scheduled</dt><dd>{r.scheduled_date}{r.scheduled_activity_id ? ` · ${actName(r.scheduled_activity_id)}` : ""}</dd></div>}
                {r.manual_entry_reason && <div><dt>Entered by hand because</dt><dd>{r.manual_entry_reason}</dd></div>}
              </dl>
              {open?.id === r.id ? (
                <ItemActions row={r} activities={activities} act={act} close={() => setOpen(null)} />
              ) : (
                <button type="button" className="btn secondary small" onClick={() => setOpen(r)}>Manage</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function ItemActions({ row, activities, act, close }: { row: Row; activities: Option[]; act: (r: Row, p: Row, m: string) => Promise<void>; close: () => void }) {
  const { client } = useAdmin();
  const [date, setDate] = useState<string>(row.scheduled_date ?? row.preferred_date ?? "");
  const [activity, setActivity] = useState<string>(row.scheduled_activity_id ?? row.preferred_activity_id ?? "");
  const [order, setOrder] = useState<string>(String(row.list_order ?? 0));
  const [notes, setNotes] = useState<string>(row.internal_notes ?? "");
  const s = row.state as string;

  const verify = async () => {
    const uid = await client.currentUserId();
    await act(row, { payment_verified: true, payment_verified_by: uid, payment_verified_at: new Date().toISOString(), state: "pending_approval", internal_notes: notes || null }, "Payment verified. The intention now awaits approval.");
  };
  const reject = () => {
    if (window.confirm("Reject this intention? The submitter will see it as not accepted.")) act(row, { state: "rejected", internal_notes: notes || null }, "Intention rejected.");
  };

  return (
    <div className="queue-actions">
      <Field id={`n-${row.id}`} label="Internal notes (never shown publicly)"><textarea id={`n-${row.id}`} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>

      {s === "pending_approval" && (
        <fieldset>
          <legend>Approve and schedule</legend>
          <p className="hint">Approval makes the intention public on the Mass intentions page for the chosen date, showing the intention and, unless anonymous, the name.</p>
          <Field id={`d-${row.id}`} label="Mass date"><input id={`d-${row.id}`} type="date" value={date} onChange={(e) => setDate(e.target.value)} /></Field>
          <Field id={`a-${row.id}`} label="Which Mass">
            <select id={`a-${row.id}`} value={activity} onChange={(e) => setActivity(e.target.value)}>
              <option value="">Not specified</option>{activities.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </Field>
          <Field id={`o-${row.id}`} label="Order in the list"><input id={`o-${row.id}`} type="number" value={order} onChange={(e) => setOrder(e.target.value)} /></Field>
        </fieldset>
      )}

      <div className="btn-row">
        {(s === "pending_payment" || s === "payment_review") && <button type="button" className="btn" onClick={verify}>I have confirmed the payment</button>}
        {s === "pending_approval" && <button type="button" className="btn" disabled={!date} onClick={() => act(row, { state: "approved", scheduled_date: date, scheduled_activity_id: activity || null, list_order: Number(order) || 0, internal_notes: notes || null }, "Intention approved and scheduled.")}>Approve</button>}
        {s === "approved" && <button type="button" className="btn" onClick={() => act(row, { state: "completed" }, "Marked as offered.")}>Mark as offered</button>}
        {(s === "approved" || s === "completed") && <button type="button" className="btn secondary" onClick={() => act(row, { state: "archived" }, "Archived.")}>Archive</button>}
        {["pending_payment", "payment_review", "pending_approval"].includes(s) && <button type="button" className="btn danger" onClick={reject}>Reject</button>}
        <button type="button" className="btn secondary" onClick={() => act(row, { internal_notes: notes || null }, "Notes saved.")}>Save notes</button>
        <button type="button" className="btn secondary" onClick={close}>Close</button>
      </div>
    </div>
  );
}

function ManualEntry({ onCancel, onSave }: { onCancel: () => void; onSave: (v: Row) => Promise<void> }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [anon, setAnon] = useState(false);
  const [reason, setReason] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 3) return setErr("Please enter the intention.");
    if (!reason.trim()) return setErr("Please record why this is entered by hand, for example: paid in cash at the office.");
    setBusy(true); setErr("");
    try { await onSave({ intention_text: text.trim(), display_name: name.trim() || null, anonymous: anon, manual_entry_reason: reason.trim() }); }
    catch (x) { setErr(x instanceof Error ? x.message : "Could not save."); setBusy(false); }
  };
  return (
    <form className="form admin-form" onSubmit={submit} noValidate>
      <h2>Add an intention by hand</h2>
      <Field id="m-text" label="Intention (required)"><textarea id="m-text" rows={3} value={text} onChange={(e) => setText(e.target.value)} maxLength={1000} /></Field>
      <Field id="m-name" label="Name to show"><input id="m-name" value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <div className="field check"><label><input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} /> Do not show the name publicly</label></div>
      <Field id="m-reason" label="Reason for entering by hand (required)" hint="This replaces online payment verification and is recorded in the audit log."><input id="m-reason" value={reason} onChange={(e) => setReason(e.target.value)} /></Field>
      {err && <p className="field-error" role="alert">{err}</p>}
      <div className="btn-row"><button className="btn" type="submit" disabled={busy}>Add intention</button><button className="btn secondary" type="button" onClick={onCancel}>Cancel</button></div>
    </form>
  );
}
