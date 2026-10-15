"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { checkUpload, friendlyError, type MediaOption, type Option } from "@/lib/admin/client";
import { formToRow, rowToForm, validateForm, type FormValues, type Row } from "@/lib/admin/convert";
import { can, type Field as FieldDef, type Resource } from "@/lib/admin/resources";
import { Field } from "@/components/forms/Field";
import { useAdmin } from "./AdminShell";

function measure(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => { resolve({ width: im.naturalWidth, height: im.naturalHeight }); URL.revokeObjectURL(url); };
    im.onerror = () => { reject(new Error("That file could not be read as an image.")); URL.revokeObjectURL(url); };
    im.src = url;
  });
}

function display(f: FieldDef, row: Row, fk: Record<string, Option[]>): string {
  const v = row[f.name];
  if (v == null || v === "") return "";
  if (f.type === "boolean") return v ? "Yes" : "No";
  if (f.type === "select") return f.options?.find((o) => o.value === v)?.label ?? String(v);
  if (f.type === "fk") return fk[f.name]?.find((o) => o.value === v)?.label ?? "";
  if (f.type === "datetime") return new Date(v).toLocaleString("en-GB", { timeZone: "Africa/Lagos", dateStyle: "medium", timeStyle: "short" });
  if (f.type === "time") return String(v).slice(0, 5);
  return String(v);
}

export function ResourceManager({ resource }: { resource: Resource }) {
  const { client, perms } = useAdmin();
  const allowed = can(perms, resource.permission);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [fk, setFk] = useState<Record<string, Option[]>>({});
  const [media, setMedia] = useState<MediaOption[]>([]);
  const [editing, setEditing] = useState<Row | "new" | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const [r, ...opts] = await Promise.all([
        client.list(resource),
        ...resource.fields.filter((f) => f.type === "fk").map((f) => client.fkOptions(f.fk!)),
      ]);
      const fks = resource.fields.filter((f) => f.type === "fk");
      setFk(Object.fromEntries(fks.map((f, i) => [f.name, opts[i] as Option[]])));
      if (resource.fields.some((f) => f.type === "media")) setMedia(await client.mediaOptions());
      setRows(r);
    } catch (e) { setError(friendlyError(e)); setRows([]); }
  }, [client, resource]);

  useEffect(() => { setEditing(null); setRows(null); if (allowed) load(); }, [load, allowed]);

  if (!allowed) return <p className="admin-note">Your role does not include {resource.title.toLowerCase()}.</p>;

  const listCols = resource.fields.filter((f) => f.list);
  const rowTitle = (r: Row) => {
    const f = resource.fields.find((x) => x.name === resource.titleField);
    return (f ? display(f, r, fk) : "") || `Untitled ${resource.singular}`;
  };

  if (editing) {
    return (
      <Editor
        resource={resource}
        row={editing === "new" ? null : editing}
        fk={fk}
        media={media}
        onCancel={() => setEditing(null)}
        onSaved={async (msg) => { setEditing(null); setNotice(msg); await load(); }}
      />
    );
  }

  return (
    <>
      <div className="admin-head">
        <h1>{resource.title}</h1>
        <button type="button" className="btn" onClick={() => { setNotice(""); setEditing("new"); }}>Add {resource.singular}</button>
      </div>
      {notice && <p className="admin-ok" role="status">{notice}</p>}
      {error && <p className="field-error" role="alert">{error}</p>}
      {rows === null ? <p role="status">Loading…</p> : rows.length === 0 ? <p>Nothing here yet.</p> : (
        <div className="table-wrap">
          <table className="admin-table">
            <caption className="sr-only">{resource.title}</caption>
            <thead><tr>{listCols.map((f) => <th key={f.name} scope="col">{f.label.replace(/ \(.*\)/, "")}</th>)}<th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  {listCols.map((f, i) => <td key={f.name}>{display(f, r, fk) || "—"}</td>)}
                  <td><button type="button" className="link-btn" onClick={() => { setNotice(""); setEditing(r); }} aria-label={`Edit ${rowTitle(r)}`}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function Editor({ resource, row, fk, media, onCancel, onSaved }: {
  resource: Resource; row: Row | null; fk: Record<string, Option[]>; media: MediaOption[];
  onCancel: () => void; onSaved: (msg: string) => void | Promise<void>;
}) {
  const { client } = useAdmin();
  const [values, setValues] = useState<FormValues>(() => rowToForm(resource, row));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [mediaList, setMediaList] = useState<MediaOption[]>(media);
  const [formError, setFormError] = useState("");
  const set = (name: string, v: string | boolean) => setValues((p) => ({ ...p, [name]: v }));
  const preview = useMemo(() => Object.fromEntries(mediaList.map((m) => [m.value, m.url])), [mediaList]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm(resource, values);
    setErrors(errs);
    if (Object.keys(errs).length) { setFormError("Please fix the highlighted fields."); return; }
    setBusy(true); setFormError("");
    try {
      await client.save(resource.table, formToRow(resource, values, row));
      await onSaved(`${cap(resource.singular)} saved.`);
    } catch (err) { setFormError(friendlyError(err)); setBusy(false); }
  };

  const del = async () => {
    if (!row?.id) return;
    if (!window.confirm(`Delete this ${resource.singular}? This cannot be undone. To keep it but hide it, set its status to Archived instead.`)) return;
    setBusy(true);
    try { await client.remove(resource.table, row.id); await onSaved(`${cap(resource.singular)} deleted.`); }
    catch (err) { setFormError(friendlyError(err)); setBusy(false); }
  };

  return (
    <form className="form admin-form" onSubmit={save} noValidate>
      <h1>{row ? `Edit ${resource.singular}` : `New ${resource.singular}`}</h1>
      {resource.fields.map((f) => {
        const id = `f-${f.name}`;
        const v = values[f.name];
        const common = { id, "aria-describedby": [f.hint ? `${id}-hint` : "", errors[f.name] ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined, "aria-invalid": errors[f.name] ? true : undefined } as const;
        if (f.type === "boolean") {
          return (
            <div className="field check" key={f.name}>
              <label><input type="checkbox" checked={Boolean(v)} onChange={(e) => set(f.name, e.target.checked)} /> {f.label}</label>
            </div>
          );
        }
        return (
          <Field key={f.name} id={id} label={f.label + (f.required ? " (required)" : "")} hint={f.hint} error={errors[f.name]}>
            {f.type === "textarea" ? (
              <textarea {...common} rows={f.name === "body" ? 10 : 4} value={String(v)} onChange={(e) => set(f.name, e.target.value)} />
            ) : f.type === "select" ? (
              <select {...common} value={String(v)} onChange={(e) => set(f.name, e.target.value)}>
                {f.options!.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : f.type === "fk" ? (
              <select {...common} value={String(v)} onChange={(e) => set(f.name, e.target.value)}>
                <option value="">{f.required ? "Choose…" : "None"}</option>
                {(fk[f.name] ?? []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : f.type === "media" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
                  <label className="btn secondary" style={{ fontSize: "0.85rem", padding: "0.35rem 0.85rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    <span>📁 Upload from device</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      style={{ display: "none" }}
                      disabled={uploadingMedia || busy}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const problem = checkUpload(file);
                        if (problem) { alert(problem); return; }
                        setUploadingMedia(true);
                        try {
                          const size = await measure(file);
                          const uploaded = await client.uploadMedia(file, { alt: file.name, credit: "", rightsNote: "Uploaded by administrator" }, size);
                          const newOpt = { value: uploaded.id, label: file.name, url: URL.createObjectURL(file) };
                          setMediaList((prev) => [newOpt, ...prev]);
                          set(f.name, uploaded.id);
                        } catch (err) {
                          alert(friendlyError(err));
                        } finally {
                          setUploadingMedia(false);
                        }
                      }}
                    />
                  </label>
                  <span className="muted small">{uploadingMedia ? "Uploading image..." : "or choose from media library:"}</span>
                </div>
                <select {...common} value={String(v)} onChange={(e) => set(f.name, e.target.value)}>
                  <option value="">None</option>
                  {mediaList.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {preview[String(v)] && (
                  <div style={{ marginTop: "0.25rem" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="admin-thumb" src={preview[String(v)]} alt="" style={{ maxHeight: "120px", borderRadius: "4px", border: "1px solid var(--line)" }} />
                  </div>
                )}
              </div>
            ) : (
              <input {...common} type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "time" ? "time" : f.type === "datetime" ? "datetime-local" : "text"} value={String(v)} onChange={(e) => set(f.name, e.target.value)} />
            )}
          </Field>
        );
      })}
      {formError && <p className="field-error" role="alert">{formError}</p>}
      <div className="btn-row">
        <button className="btn" type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</button>
        <button className="btn secondary" type="button" onClick={onCancel} disabled={busy}>Cancel</button>
        {row && <button className="btn danger" type="button" onClick={del} disabled={busy}>Delete</button>}
      </div>
    </form>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
