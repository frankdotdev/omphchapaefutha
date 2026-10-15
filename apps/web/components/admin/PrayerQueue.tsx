"use client";

import { useCallback, useEffect, useState } from "react";
import { friendlyError } from "@/lib/admin/client";
import type { Row } from "@/lib/admin/convert";
import { useAdmin } from "./AdminShell";

const TABS = [
  { key: "pending", label: "To moderate", states: ["moderation_pending", "submitted"] },
  { key: "approved", label: "Approved (private)", states: ["approved"] },
  { key: "published", label: "Published", states: ["published"] },
  { key: "closed", label: "Rejected, removed, archived", states: ["rejected", "removed", "archived"] },
];

export function PrayerQueue() {
  const { client } = useAdmin();
  const [tab, setTab] = useState("pending");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setRows(null); setError("");
    try { setRows(await client.listWhere("prayer_intentions", "state", TABS.find((t) => t.key === tab)!.states, { column: "created_at", ascending: false })); }
    catch (e) { setError(friendlyError(e)); setRows([]); }
  }, [client, tab]);
  useEffect(() => { load(); }, [load]);

  const move = async (r: Row, state: string, msg: string) => {
    setError(""); setNotice("");
    try {
      await client.save("prayer_intentions", { id: r.id, state, moderated_by: await client.currentUserId(), moderated_at: new Date().toISOString() });
      setNotice(msg); await load();
    } catch (e) { setError(friendlyError(e)); }
  };

  return (
    <>
      <h1>Prayer requests</h1>
      <p className="hint">A request is shown publicly only when it is Published and the person agreed to publication. Contact details are never shown.</p>
      <div role="tablist" aria-label="Prayer request stages" className="admin-tabs">
        {TABS.map((t) => <button key={t.key} type="button" role="tab" aria-selected={tab === t.key} className="tab" onClick={() => setTab(t.key)}>{t.label}</button>)}
      </div>
      {notice && <p className="admin-ok" role="status">{notice}</p>}
      {error && <p className="field-error" role="alert">{error}</p>}
      {rows === null ? <p role="status">Loading…</p> : rows.length === 0 ? <p>Nothing in this list.</p> : (
        <ul className="queue">
          {rows.map((r) => (
            <li key={r.id} className="queue-item">
              <div className="queue-top"><strong>{r.category || "Prayer request"}</strong><span className="pill">{r.consent_to_publish ? "Agreed to publication" : "Private only"}</span></div>
              <p>{r.body}</p>
              <dl className="queue-meta">
                <div><dt>Name</dt><dd>{r.display_name || "None given"}{r.anonymous ? " (shown as anonymous)" : ""}</dd></div>
                <div><dt>Contact (private)</dt><dd>{r.private_contact || "None given"}</dd></div>
              </dl>
              <div className="btn-row">
                {["moderation_pending", "submitted"].includes(r.state) && <>
                  {r.consent_to_publish && <button type="button" className="btn" onClick={() => move(r, "published", "Published on the Prayer page.")}>Publish</button>}
                  <button type="button" className="btn secondary" onClick={() => move(r, "approved", "Kept privately for the intercessors.")}>Keep private</button>
                  <button type="button" className="btn danger" onClick={() => move(r, "rejected", "Rejected.")}>Reject</button>
                </>}
                {r.state === "approved" && r.consent_to_publish && <button type="button" className="btn" onClick={() => move(r, "published", "Published on the Prayer page.")}>Publish</button>}
                {r.state === "published" && <button type="button" className="btn danger" onClick={() => move(r, "removed", "Removed from the public page.")}>Remove from public page</button>}
                {["approved", "published"].includes(r.state) && <button type="button" className="btn secondary" onClick={() => move(r, "archived", "Archived.")}>Archive</button>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
