"use client";

import { useEffect, useState } from "react";
import { friendlyError } from "@/lib/admin/client";
import { useAdmin } from "./AdminShell";
import type { EcclesiasticalEntry } from "@/lib/types";
import { SEED_ECCLESIASTICAL } from "@/lib/data/seed";
import { Communion } from "@/components/ui/Communion";

const LEVELS = [
  { value: "universal", label: "The Universal Church" },
  { value: "nunciature", label: "The Holy See in Nigeria" },
  { value: "province", label: "The Ecclesiastical Province" },
  { value: "diocese", label: "The Local Diocese" },
  { value: "chaplaincy", label: "The Chaplaincy" },
];

export function CommunionEditor() {
  const { client } = useAdmin();
  const [entries, setEntries] = useState<EcclesiasticalEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    // Load existing settings or fallback
    client.getSettings().then((s) => {
      if (s["directory.ecclesiastical"]) {
        try {
          const parsed = JSON.parse(s["directory.ecclesiastical"]);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setEntries(parsed);
            return;
          }
        } catch {}
      }
      setEntries(SEED_ECCLESIASTICAL);
    }).catch(() => {
      setEntries(SEED_ECCLESIASTICAL);
    });
  }, [client]);

  const updateEntry = (index: number, patch: Partial<EcclesiasticalEntry>) => {
    setEntries((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  };

  const moveEntry = (index: number, direction: -1 | 1) => {
    setEntries((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      const temp = next[index];
      next[index] = next[target];
      next[target] = temp;
      return next;
    });
  };

  const removeEntry = (index: number) => {
    if (!confirm("Are you sure you want to remove this office from the hierarchy?")) return;
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const addEntry = () => {
    setEntries((prev) => [
      ...prev,
      {
        officeKey: `office-${Date.now()}`,
        level: "chaplaincy",
        title: "New Office",
        personName: "",
        occupancy: "occupied",
        description: "",
        portraitSrc: null,
      },
    ]);
  };

  const handleFileUpload = async (index: number, file: File) => {
    setBusy(true);
    setError("");
    try {
      const row = await client.uploadMedia(file, { alt: `Portrait of ${entries[index].personName || entries[index].title}`, credit: "Chaplaincy", rightsNote: "Confirmed" }, { width: 300, height: 300 });
      if (row.url) {
        updateEntry(index, { portraitSrc: row.url });
      }
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setBusy(false);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const payload = JSON.stringify(entries);
      await client.saveSetting("directory.ecclesiastical", payload, true);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("omph_communion_directory", payload);
        } catch {}
      }
      setNotice("Communion with the Church directory saved successfully! Public pages are updated.");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "2rem", color: "var(--navy)" }}>Communion with the Church</h1>
          <p className="muted" style={{ margin: "0.25rem 0 0 0" }}>
            Edit the ecclesiastical timeline of shepherds (Pope, Nuncio, Metropolitan Archbishop, Local Ordinary, Chaplains).
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            className={`btn ${activeTab === "edit" ? "" : "secondary"}`}
            onClick={() => setActiveTab("edit")}
          >
            Edit Entries
          </button>
          <button
            type="button"
            className={`btn ${activeTab === "preview" ? "" : "secondary"}`}
            onClick={() => setActiveTab("preview")}
          >
            Live Preview
          </button>
        </div>
      </div>

      {notice && <p className="admin-ok" role="status" style={{ marginBottom: "1.5rem" }}>{notice}</p>}
      {error && <p className="field-error" role="alert" style={{ marginBottom: "1.5rem" }}>{error}</p>}

      {activeTab === "preview" ? (
        <div style={{ background: "var(--navy)", padding: "2rem", borderRadius: "8px", marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--gold)", fontSize: "1.2rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Public Display Preview
          </h2>
          <Communion entries={entries} />
        </div>
      ) : (
        <form onSubmit={save} noValidate>
          <div style={{ display: "grid", gap: "1.5rem", marginBottom: "2rem" }}>
            {entries.map((item, idx) => (
              <div
                key={item.officeKey || idx}
                className="card pattern-paper"
                style={{
                  padding: "1.5rem",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem" }}>
                  <span style={{ fontWeight: 700, color: "var(--gold-text)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    #{idx + 1} · {item.level.toUpperCase()}
                  </span>
                  <div style={{ display: "flex", gap: "0.35rem" }}>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveEntry(idx, -1)}
                      style={{ padding: "0.2rem 0.5rem", cursor: "pointer", fontSize: "0.85rem" }}
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={idx === entries.length - 1}
                      onClick={() => moveEntry(idx, 1)}
                      style={{ padding: "0.2rem 0.5rem", cursor: "pointer", fontSize: "0.85rem" }}
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeEntry(idx)}
                      style={{ padding: "0.2rem 0.5rem", cursor: "pointer", color: "var(--burgundy)", fontSize: "0.85rem" }}
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                      Ecclesiastical Level
                    </label>
                    <select
                      value={item.level}
                      onChange={(e) => updateEntry(idx, { level: e.target.value as any })}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--line)" }}
                    >
                      {LEVELS.map((l) => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                      Person Name
                    </label>
                    <input
                      type="text"
                      value={item.personName ?? ""}
                      placeholder="e.g. Pope Leo XIV, Archbishop..."
                      onChange={(e) => updateEntry(idx, { personName: e.target.value })}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--line)" }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Ecclesiastical Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    placeholder="e.g. Supreme Pontiff, Metropolitan Archbishop of Onitsha..."
                    onChange={(e) => updateEntry(idx, { title: e.target.value })}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--line)" }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Description / Explanation
                  </label>
                  <textarea
                    rows={2}
                    value={item.description ?? ""}
                    placeholder="e.g. Head of the Onitsha ecclesiastical province, to which the Diocese of Abakaliki belongs."
                    onChange={(e) => updateEntry(idx, { description: e.target.value })}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--line)" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Portrait Photo (Square / Circular)
                  </label>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    {item.portraitSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.portraitSrc}
                        alt={item.personName || "Portrait"}
                        style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)" }}
                      />
                    ) : (
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#666" }}>
                        None
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <input
                        type="text"
                        value={item.portraitSrc ?? ""}
                        placeholder="Image URL or choose file below"
                        onChange={(e) => updateEntry(idx, { portraitSrc: e.target.value || null })}
                        style={{ width: "100%", padding: "0.4rem", borderRadius: "4px", border: "1px solid var(--line)", marginBottom: "0.4rem", fontSize: "0.85rem" }}
                      />
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFileUpload(idx, f);
                        }}
                        style={{ fontSize: "0.8rem" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "1rem" }}>
            <button
              type="button"
              className="btn secondary"
              onClick={addEntry}
            >
              + Add Shepherd / Office
            </button>
            <button
              type="submit"
              className="btn"
              disabled={busy}
              style={{ minWidth: "10rem" }}
            >
              {busy ? "Saving…" : "Save Communion Directory"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
