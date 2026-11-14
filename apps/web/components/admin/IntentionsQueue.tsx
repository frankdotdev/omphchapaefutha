"use client";

import { useCallback, useEffect, useState } from "react";
import { friendlyError, type Option } from "@/lib/admin/client";
import type { Row } from "@/lib/admin/convert";
import { lagosDateString, addDays, formatLongDate } from "@/lib/time/lagos";
import { STATE_LABEL } from "@/lib/data/submissions";
import { Field } from "@/components/forms/Field";
import { useAdmin } from "./AdminShell";
import { Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const TABS: { key: string; label: string; states: string[] }[] = [
  { key: "payment", label: "Payment check", states: ["pending_payment", "payment_review"] },
  { key: "approval", label: "Awaiting approval", states: ["pending_approval"] },
  { key: "approved", label: "Approved & Scheduled", states: ["approved"] },
  { key: "done", label: "Completed & archived", states: ["completed", "archived"] },
  { key: "closed", label: "Rejected & cancelled", states: ["rejected", "cancelled"] },
  { key: "sheet", label: "Daily altar sheet", states: ["approved", "completed"] },
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
    try {
      await client.save("mass_intentions", { id: row.id, ...patch });

      // When approved or updated, sync to server mass-intentions store for website and projector
      if (patch.state === "approved" || row.state === "approved") {
        const startDate = (patch.scheduled_date || row.scheduled_date || row.preferred_date || lagosDateString()) as string;
        const numDays = Math.max(1, Number(patch.number_of_days || row.number_of_days || 1));
        const endDate = (patch.end_date || row.end_date || addDays(startDate, numDays - 1)) as string;
        const actId = (patch.scheduled_activity_id || row.scheduled_activity_id) as string;
        const actLabel = activities.find((a) => a.value === actId)?.label || "Holy Mass";

        try {
          await fetch("/api/mass-intentions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reference: row.reference,
              text: row.intention_text,
              displayName: row.display_name,
              anonymous: row.anonymous,
              scheduledDate: startDate,
              endDate,
              numberOfDays: numDays,
              activityName: actLabel,
              status: "confirmed",
            }),
          });
        } catch {}
      }

      setNotice(msg);
      setOpen(null);
      await load();
    } catch (e) {
      setError(friendlyError(e));
    }
  };

  const shown = tab === "sheet" ? (rows ?? []).filter((r) => r.scheduled_date === sheetDate).sort((a, b) => (a.list_order ?? 0) - (b.list_order ?? 0)) : rows;
  const actName = (id: string | null) => activities.find((a) => a.value === id)?.label ?? "";

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 style={{ margin: 0 }}>Mass intentions</h1>
          <p className="muted" style={{ margin: "0.2rem 0 0", fontSize: "0.88rem" }}>
            Review, schedule, and configure single or multi-day intentions for the altar.
          </p>
        </div>
        <button type="button" className="btn" onClick={() => setAdding(true)}>+ Add an intention by hand</button>
      </div>

      <div role="tablist" aria-label="Intention stages" className="admin-tabs">
        {TABS.map((t) => (
          <button key={t.key} type="button" role="tab" aria-selected={tab === t.key} className="tab" onClick={() => { setTab(t.key); setOpen(null); }}>{t.label}</button>
        ))}
      </div>
      {notice && <p className="admin-ok" role="status">{notice}</p>}
      {error && <p className="field-error" role="alert">{error}</p>}

      {adding && (
        <ManualEntry
          activities={activities}
          onCancel={() => setAdding(false)}
          onSave={async (v) => {
            const uid = await client.currentUserId();
            try {
              // 1. Save to Supabase (if available)
              await client.save("mass_intentions", {
                ...v,
                state: "approved",
                created_by: uid,
                payment_verified: true,
                payment_verified_at: new Date().toISOString(),
              });

              // 2. Sync to Server Store & Projector
              try {
                const actLabel = activities.find((a) => a.value === v.scheduled_activity_id)?.label || "Holy Mass";
                await fetch("/api/mass-intentions", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    text: v.intention_text,
                    displayName: v.display_name,
                    anonymous: v.anonymous,
                    scheduledDate: v.scheduled_date,
                    endDate: v.end_date,
                    numberOfDays: v.number_of_days,
                    activityName: actLabel,
                    status: "confirmed",
                  }),
                });
              } catch {}

              setAdding(false);
              setNotice(`Intention added and scheduled for ${v.number_of_days} day(s).`);
              setTab("approved");
              await load();
            } catch (e) {
              throw new Error(friendlyError(e));
            }
          }}
        />
      )}

      {tab === "sheet" && (
        <div className="sheet-controls no-print">
          <Field id="sheet-date" label="Date"><input id="sheet-date" type="date" value={sheetDate} onChange={(e) => setSheetDate(e.target.value)} /></Field>
          <button type="button" className="btn secondary" onClick={() => window.print()}>Print this sheet</button>
        </div>
      )}

      {shown === null ? <p role="status">Loading…</p> : shown.length === 0 ? <p>Nothing in this list.</p> : tab === "sheet" ? (
        <div className="print-sheet">
          <h2>Mass intentions for {formatLongDate(sheetDate)}</h2>
          <ol>{shown.map((r) => <li key={r.id}>{r.intention_text}{!r.anonymous && r.display_name ? ` (${r.display_name})` : ""}{r.scheduled_activity_id ? ` — ${actName(r.scheduled_activity_id)}` : ""}</li>)}</ol>
        </div>
      ) : (
        <ul className="queue">
          {shown.map((r) => {
            const numDays = r.number_of_days || 1;
            const startDate = (r.scheduled_date || r.preferred_date) as string;
            const endDate = (r.end_date || (startDate && numDays > 1 ? addDays(startDate, numDays - 1) : startDate)) as string;

            return (
              <li key={r.id} className="queue-item">
                <div className="queue-top">
                  <strong>{r.reference}</strong>
                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                    {numDays > 1 && (
                      <span className="pill" style={{ background: "rgba(173, 138, 72, 0.15)", color: "var(--navy)", fontWeight: 700 }}>
                        {numDays} Days Consecutive
                      </span>
                    )}
                    <span className="pill">{STATE_LABEL[r.state as keyof typeof STATE_LABEL] ?? r.state}</span>
                  </div>
                </div>
                <p style={{ fontWeight: 600, color: "var(--navy)", fontSize: "1.05rem", margin: "0.4rem 0" }}>
                  {r.intention_text}
                </p>
                <dl className="queue-meta">
                  <div><dt>Name</dt><dd>{r.display_name || "None given"}{r.anonymous ? " (asked not to be named)" : ""}</dd></div>
                  <div><dt>Contact (private)</dt><dd>{r.private_contact || "None given"}</dd></div>
                  <div>
                    <dt>Duration &amp; Dates</dt>
                    <dd>
                      {numDays > 1 ? (
                        <span><strong>{numDays} Days:</strong> {startDate ? formatLongDate(startDate) : "–"} to {endDate ? formatLongDate(endDate) : "–"}</span>
                      ) : (
                        <span>{startDate ? formatLongDate(startDate) : "None scheduled"}</span>
                      )}
                    </dd>
                  </div>
                  {r.scheduled_activity_id && (
                    <div><dt>Mass Service</dt><dd>{actName(r.scheduled_activity_id)}</dd></div>
                  )}
                  {r.payment_declared && <div><dt>Payment reference given</dt><dd>{r.payment_declared_reference || "Declared, no reference"}</dd></div>}
                  {r.manual_entry_reason && <div><dt>Entered by hand because</dt><dd>{r.manual_entry_reason}</dd></div>}
                </dl>
                {open?.id === r.id ? (
                  <ItemActions row={r} activities={activities} act={act} close={() => setOpen(null)} />
                ) : (
                  <button type="button" className="btn secondary small" onClick={() => setOpen(r)}>Manage &amp; Schedule</button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function ItemActions({ row, activities, act, close }: { row: Row; activities: Option[]; act: (r: Row, p: Row, m: string) => Promise<void>; close: () => void }) {
  const { client } = useAdmin();
  const [date, setDate] = useState<string>(row.scheduled_date ?? row.preferred_date ?? lagosDateString());
  const [daysCount, setDaysCount] = useState<number>(Number(row.number_of_days) || 1);
  const [activity, setActivity] = useState<string>(row.scheduled_activity_id ?? row.preferred_activity_id ?? "");
  const [order, setOrder] = useState<string>(String(row.list_order ?? 0));
  const [notes, setNotes] = useState<string>(row.internal_notes ?? "");
  const s = row.state as string;

  const endDate = date ? addDays(date, Math.max(1, daysCount) - 1) : "";

  const verify = async () => {
    const uid = await client.currentUserId();
    await act(row, { payment_verified: true, payment_verified_by: uid, payment_verified_at: new Date().toISOString(), state: "pending_approval", internal_notes: notes || null }, "Payment verified. The intention now awaits approval.");
  };
  const reject = () => {
    if (window.confirm("Reject this intention? The submitter will see it as not accepted.")) act(row, { state: "rejected", internal_notes: notes || null }, "Intention rejected.");
  };

  const handleApprove = () => {
    const numDays = Math.max(1, daysCount);
    const end = date ? addDays(date, numDays - 1) : null;
    act(row, {
      state: "approved",
      scheduled_date: date,
      end_date: end,
      number_of_days: numDays,
      scheduled_activity_id: activity || null,
      list_order: Number(order) || 0,
      internal_notes: notes || null,
    }, `Intention approved and scheduled for ${numDays} day(s).`);
  };

  return (
    <div className="queue-actions">
      <Field id={`n-${row.id}`} label="Internal notes (never shown publicly)"><textarea id={`n-${row.id}`} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>

      {(s === "pending_approval" || s === "approved") && (
        <fieldset style={{ background: "var(--paper)", padding: "1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
          <legend style={{ fontWeight: 700, color: "var(--navy)" }}>Schedule Details &amp; Number of Days</legend>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "0.5rem" }}>
            <Field id={`d-${row.id}`} label="Start Date">
              <input id={`d-${row.id}`} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>

            <Field id={`days-${row.id}`} label="Number of Days (Consecutive)">
              <input
                id={`days-${row.id}`}
                type="number"
                min={1}
                max={365}
                value={daysCount}
                onChange={(e) => setDaysCount(Math.max(1, Number(e.target.value) || 1))}
              />
            </Field>

            <Field id={`a-${row.id}`} label="Which Mass">
              <select id={`a-${row.id}`} value={activity} onChange={(e) => setActivity(e.target.value)}>
                <option value="">Any Mass / Morning Mass (06:20)</option>
                {activities.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
            </Field>

            <Field id={`o-${row.id}`} label="Order in the list">
              <input id={`o-${row.id}`} type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
            </Field>
          </div>

          {date && daysCount > 1 && (
            <div style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--navy)", background: "#fff", padding: "0.5rem 0.75rem", borderRadius: "4px", border: "1px solid var(--line)" }}>
              <strong>Multi-day booking schedule:</strong> {formatLongDate(date)} to {formatLongDate(endDate)} ({daysCount} consecutive days)
            </div>
          )}
        </fieldset>
      )}

      <div className="btn-row" style={{ marginTop: "1rem" }}>
        {(s === "pending_payment" || s === "payment_review") && <button type="button" className="btn" onClick={verify}>I have confirmed the payment</button>}
        {s === "pending_approval" && <button type="button" className="btn" disabled={!date} onClick={handleApprove}>Approve &amp; Schedule ({daysCount} Day{daysCount > 1 ? "s" : ""})</button>}
        {s === "approved" && <button type="button" className="btn" onClick={() => act(row, { state: "completed" }, "Marked as offered.")}>Mark as offered</button>}
        {(s === "approved" || s === "completed") && <button type="button" className="btn secondary" onClick={() => act(row, { state: "archived" }, "Archived.")}>Archive</button>}
        {["pending_payment", "payment_review", "pending_approval"].includes(s) && <button type="button" className="btn danger" onClick={reject}>Reject</button>}
        <button type="button" className="btn secondary" onClick={() => act(row, { internal_notes: notes || null }, "Notes saved.")}>Save notes</button>
        <button type="button" className="btn secondary" onClick={close}>Close</button>
      </div>
    </div>
  );
}

function ManualEntry({ activities, onCancel, onSave }: { activities: Option[]; onCancel: () => void; onSave: (v: Row) => Promise<void> }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [anon, setAnon] = useState(false);
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(lagosDateString());
  const [daysCount, setDaysCount] = useState(1);
  const [activity, setActivity] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const endDate = startDate ? addDays(startDate, Math.max(1, daysCount) - 1) : "";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 3) return setErr("Please enter the intention text.");
    if (!reason.trim()) return setErr("Please record why this is entered by hand (e.g. paid in cash at the chaplaincy office).");
    if (!startDate) return setErr("Please choose a start date.");

    setBusy(true); setErr("");
    const numDays = Math.max(1, daysCount);
    const end = addDays(startDate, numDays - 1);

    try {
      await onSave({
        intention_text: text.trim(),
        display_name: name.trim() || null,
        anonymous: anon,
        manual_entry_reason: reason.trim(),
        scheduled_date: startDate,
        end_date: end,
        number_of_days: numDays,
        scheduled_activity_id: activity || null,
      });
    } catch (x) {
      setErr(x instanceof Error ? x.message : "Could not save.");
      setBusy(false);
    }
  };

  return (
    <form className="form admin-form" onSubmit={submit} noValidate style={{ background: "#fff", border: "2px solid var(--gold)", borderRadius: "8px", padding: "1.5rem" }}>
      <h2 style={{ margin: "0 0 1rem", color: "var(--navy)" }}>Add an intention by hand &amp; Schedule</h2>

      <Field id="m-text" label="Intention (required)">
        <textarea id="m-text" rows={3} value={text} onChange={(e) => setText(e.target.value)} maxLength={1000} placeholder="e.g. For divine healing and quick recovery of..." />
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
        <Field id="m-name" label="Name to show">
          <input id="m-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Bro. Emmanuel / Okonkwo Family" />
        </Field>

        <Field id="m-reason" label="Reason for entering by hand (required)" hint="e.g. Paid cash at chaplaincy office">
          <input id="m-reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Paid stipend at Chaplain's office" />
        </Field>
      </div>

      <div className="field check" style={{ margin: "0.5rem 0 1.25rem" }}>
        <label>
          <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} /> Do not show the name publicly (Anonymous)
        </label>
      </div>

      {/* Date & Number of Days Scheduling Controls */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "6px", padding: "1.25rem", marginBottom: "1.25rem" }}>
        <h4 style={{ margin: "0 0 0.85rem", color: "var(--navy)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Calendar size={16} color="var(--gold-text)" /> Mass Scheduling &amp; Number of Days
        </h4>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <Field id="m-date" label="Start Date">
            <input id="m-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </Field>

          <Field id="m-days" label="Number of Days">
            <input
              id="m-days"
              type="number"
              min={1}
              max={365}
              value={daysCount}
              onChange={(e) => setDaysCount(Math.max(1, Number(e.target.value) || 1))}
            />
          </Field>

          <Field id="m-activity" label="Which Mass">
            <select id="m-activity" value={activity} onChange={(e) => setActivity(e.target.value)}>
              <option value="">Any Mass / Morning Mass (06:20)</option>
              {activities.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </Field>
        </div>

        {/* Quick Presets for Multi-Day Intentions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.85rem" }}>
          <span style={{ fontSize: "0.82rem", color: "var(--muted)", fontWeight: 600 }}>Quick presets:</span>
          {[
            { label: "1 Day (Single)", days: 1 },
            { label: "3 Days (Triduum)", days: 3 },
            { label: "7 Days (1 Week)", days: 7 },
            { label: "9 Days (Novena)", days: 9 },
            { label: "30 Days (Gregorian)", days: 30 },
          ].map((preset) => (
            <button
              key={preset.days}
              type="button"
              onClick={() => setDaysCount(preset.days)}
              className="btn secondary small"
              style={{
                fontSize: "0.78rem",
                padding: "0.25rem 0.55rem",
                background: daysCount === preset.days ? "var(--gold)" : undefined,
                color: daysCount === preset.days ? "#183b63" : undefined,
                fontWeight: daysCount === preset.days ? 700 : undefined,
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Summary preview */}
        <div style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--navy)", background: "#fff", padding: "0.6rem 0.85rem", borderRadius: "4px", border: "1px solid var(--line)" }}>
          {daysCount > 1 ? (
            <span>
              Scheduled for <strong>{daysCount} consecutive days</strong>: from <strong>{formatLongDate(startDate)}</strong> to <strong>{formatLongDate(endDate)}</strong>.
            </span>
          ) : (
            <span>Scheduled for <strong>1 Day</strong>: on <strong>{formatLongDate(startDate)}</strong>.</span>
          )}
        </div>
      </div>

      {err && <p className="field-error" role="alert">{err}</p>}

      <div className="btn-row">
        <button className="btn" type="submit" disabled={busy}>
          {busy ? "Saving..." : `Add & Schedule Intention (${daysCount} Day${daysCount > 1 ? "s" : ""})`}
        </button>
        <button className="btn secondary" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
