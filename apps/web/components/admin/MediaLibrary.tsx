"use client";

import { useCallback, useEffect, useState } from "react";
import { checkUpload, friendlyError } from "@/lib/admin/client";
import type { Row } from "@/lib/admin/convert";
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

export function MediaLibrary() {
  const { client } = useAdmin();
  const [items, setItems] = useState<(Row & { url: string })[] | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [credit, setCredit] = useState("");
  const [rights, setRights] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    try { setItems(await client.listMedia()); } catch (e) { setError(friendlyError(e)); setItems([]); }
  }, [client]);
  useEffect(() => { load(); }, [load]);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setNotice("");
    if (!file) return setError("Choose an image first.");
    const problem = checkUpload(file);
    if (problem) return setError(problem);
    if (alt.trim().length < 5) return setError("Describe the image in a short sentence. This is read aloud to people who cannot see it.");
    if (!rights.trim()) return setError("Say where the image came from and that you have permission to use it.");
    setBusy(true);
    try {
      const size = await measure(file);
      await client.uploadMedia(file, { alt, credit, rightsNote: rights }, size);
      setNotice(size.width < 1200 ? "Uploaded. Note: the image is small, so it will look soft if used as a full-width background." : "Uploaded.");
      setFile(null); setAlt(""); setCredit(""); setRights("");
      (document.getElementById("media-file") as HTMLInputElement | null)?.value && ((document.getElementById("media-file") as HTMLInputElement).value = "");
      await load();
    } catch (err) { setError(friendlyError(err)); } finally { setBusy(false); }
  };

  const remove = async (m: Row) => {
    if (!window.confirm("Delete this image? Anything using it will lose its picture.")) return;
    try { await client.removeMedia(m); setNotice("Image deleted."); await load(); } catch (e) { setError(friendlyError(e)); }
  };

  return (
    <>
      <h1>Media</h1>
      <form className="form admin-form" onSubmit={upload} noValidate>
        <h2>Upload an image</h2>
        <Field id="media-file" label="Image file" hint="JPEG, PNG or WebP, up to 5 MB. For a full-width slide background, use an image at least 1600 pixels wide."><input id="media-file" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></Field>
        <Field id="media-alt" label="Description of the picture (required)"><input id="media-alt" value={alt} onChange={(e) => setAlt(e.target.value)} /></Field>
        <Field id="media-credit" label="Credit or artist"><input id="media-credit" value={credit} onChange={(e) => setCredit(e.target.value)} /></Field>
        <Field id="media-rights" label="Source and permission (required)" hint="For example: Painted in 1512, public domain. Or: Photo by Fr. X, used with permission."><input id="media-rights" value={rights} onChange={(e) => setRights(e.target.value)} /></Field>
        {error && <p className="field-error" role="alert">{error}</p>}
        {notice && <p className="admin-ok" role="status">{notice}</p>}
        <button className="btn" type="submit" disabled={busy}>{busy ? "Uploading…" : "Upload"}</button>
      </form>

      <h2>Library</h2>
      {items === null ? <p role="status">Loading…</p> : items.length === 0 ? <p>No images uploaded yet. The images that came with the site are built in and do not appear here.</p> : (
        <ul className="media-grid">
          {items.map((m) => (
            <li key={m.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.alt_text ?? ""} loading="lazy" />
              <p className="media-alt">{m.alt_text}</p>
              <p className="hint">{m.width && m.height ? `${m.width} × ${m.height} px` : ""}{m.credit ? ` · ${m.credit}` : ""}</p>
              <button type="button" className="link-btn" onClick={() => remove(m)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
