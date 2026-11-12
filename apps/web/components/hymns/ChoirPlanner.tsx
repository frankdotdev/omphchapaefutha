"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CATHOLIC_HYMNS,
  DEFAULT_HYMN_SELECTION,
  HYMN_CATEGORY_LABELS,
  type Hymn,
  type HymnCategory,
  type MassHymnSelection,
} from "@/lib/hymns/data";
import {
  Music,
  Tv,
  Check,
  Search,
  BookOpen,
  ChevronRight,
  Sparkles,
  Share2,
} from "lucide-react";

const STORAGE_KEY = "omph_active_hymns_schedule";

export function ChoirPlanner({ initialDate }: { initialDate: string }) {
  const [selection, setSelection] = useState<MassHymnSelection>(DEFAULT_HYMN_SELECTION);
  const [activeSlot, setActiveSlot] = useState<HymnCategory>("entrance");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelection(parsed);
      }
    } catch {}
  }, []);

  function saveSelection(updated: MassHymnSelection) {
    setSelection(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }

  function getHymnForSlot(slot: HymnCategory): Hymn | undefined {
    let id: string | undefined;
    switch (slot) {
      case "entrance": id = selection.entranceId; break;
      case "kyrie": id = selection.kyrieId; break;
      case "gloria": id = selection.gloriaId; break;
      case "credo": id = selection.credoId; break;
      case "offertory": id = selection.offertoryId; break;
      case "sanctus": id = selection.sanctusId; break;
      case "memorial": id = selection.memorialId; break;
      case "agnus_dei": id = selection.agnusDeiId; break;
      case "communion": id = selection.communionId; break;
      case "thanksgiving": id = selection.thanksgivingId; break;
      case "dismissal": id = selection.dismissalId; break;
    }
    return CATHOLIC_HYMNS.find((h) => h.id === id);
  }

  function assignHymn(slot: HymnCategory, hymnId: string) {
    const updated = { ...selection };
    switch (slot) {
      case "entrance": updated.entranceId = hymnId; break;
      case "kyrie": updated.kyrieId = hymnId; break;
      case "gloria": updated.gloriaId = hymnId; break;
      case "credo": updated.credoId = hymnId; break;
      case "offertory": updated.offertoryId = hymnId; break;
      case "sanctus": updated.sanctusId = hymnId; break;
      case "memorial": updated.memorialId = hymnId; break;
      case "agnus_dei": updated.agnusDeiId = hymnId; break;
      case "communion": updated.communionId = hymnId; break;
      case "thanksgiving": updated.thanksgivingId = hymnId; break;
      case "dismissal": updated.dismissalId = hymnId; break;
    }
    saveSelection(updated);
  }

  const activeHymn = selectedHymn ?? getHymnForSlot(activeSlot) ?? CATHOLIC_HYMNS[0];

  const filteredHymns = CATHOLIC_HYMNS.filter((h) => {
    const matchesSlot = searchQuery ? true : h.category === activeSlot;
    if (!matchesSlot) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      h.title.toLowerCase().includes(q) ||
      h.categoryLabel.toLowerCase().includes(q) ||
      h.language.toLowerCase().includes(q) ||
      h.verses.some((v) => v.toLowerCase().includes(q))
    );
  });

  const slots: HymnCategory[] = [
    "entrance",
    "kyrie",
    "gloria",
    "credo",
    "offertory",
    "sanctus",
    "memorial",
    "agnus_dei",
    "communion",
    "thanksgiving",
    "dismissal",
  ];

  function copyShareLink() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "2rem", alignItems: "start", width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
      {/* LEFT COLUMN: THE MASS HYMN ROSTER (CHOIR MASTER SELECTOR) */}
      <div>
        <div style={{ background: "var(--paper)", border: "2px solid var(--gold)", borderRadius: "8px", padding: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--gold-text)", margin: 0 }}>
                Choir Master &amp; Congregation Roster
              </span>
              <h3 style={{ margin: "0.2rem 0 0", color: "var(--navy)", fontSize: "1.3rem" }}>
                Today&rsquo;s Mass Hymns ({initialDate})
              </h3>
            </div>
            <Link
              href="/projector?tab=hymns"
              className="btn"
              style={{ fontSize: "0.82rem", padding: "0.45rem 0.85rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <Tv size={15} /> Projector Broadcast →
            </Link>
          </div>

          <p className="muted small" style={{ margin: "0 0 1rem", lineHeight: 1.45 }}>
            Select any liturgical part below to view lyrics or pick an alternate hymn for today&rsquo;s Holy Mass.
            Parishioners can follow along on their phones, and choir masters can broadcast directly to the church projector.
          </p>

          {/* Roster of 11 Liturgical Slots */}
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {slots.map((slot) => {
              const assigned = getHymnForSlot(slot);
              const isSelected = activeSlot === slot && !selectedHymn;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    setActiveSlot(slot);
                    setSelectedHymn(null);
                    setSearchQuery("");
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "6px",
                    background: isSelected ? "var(--ivory)" : "#ffffff",
                    border: isSelected ? "2px solid var(--marian)" : "1px solid var(--line)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em", display: "block" }}>
                      {HYMN_CATEGORY_LABELS[slot]}
                    </span>
                    <strong style={{ fontSize: "0.95rem", color: "var(--navy)" }}>
                      {assigned ? assigned.title : "Not Selected"}
                    </strong>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {assigned && (
                      <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.45rem", borderRadius: "3px", background: "var(--paper)", border: "1px solid var(--line)", color: "var(--ink)" }}>
                        {assigned.language}
                      </span>
                    )}
                    <ChevronRight size={16} color="var(--muted)" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hymn Search & Library Picker */}
        <div style={{ background: "#ffffff", border: "1px solid var(--line)", borderRadius: "8px", padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <Search size={16} color="var(--marian)" />
            <h4 style={{ margin: 0, fontSize: "1.05rem", color: "var(--navy)" }}>
              Hymnary for {HYMN_CATEGORY_LABELS[activeSlot]}
            </h4>
          </div>

          <input
            type="search"
            placeholder="Search hymns by title, words, language (English, Igbo, Latin)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "0.55rem 0.85rem", borderRadius: "6px", border: "1px solid var(--line)", fontSize: "0.9rem", marginBottom: "0.75rem" }}
          />

          <div style={{ maxHeight: "320px", overflowY: "auto", display: "grid", gap: "0.4rem" }}>
            {filteredHymns.map((hymn) => {
              const currentAssigned = getHymnForSlot(activeSlot)?.id === hymn.id;
              return (
                <div
                  key={hymn.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "6px",
                    background: currentAssigned ? "#f0fdf4" : "var(--paper)",
                    border: currentAssigned ? "1px solid #86efac" : "1px solid var(--line)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedHymn(hymn)}
                    style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", flex: 1 }}
                  >
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--navy)", display: "block" }}>
                      {hymn.title}
                    </span>
                    <span className="muted small" style={{ fontSize: "0.75rem" }}>
                      {hymn.categoryLabel} · {hymn.language} {hymn.tune ? `(${hymn.tune})` : ""}
                    </span>
                  </button>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <button
                      type="button"
                      onClick={() => assignHymn(activeSlot, hymn.id)}
                      className={`btn small ${currentAssigned ? "" : "secondary"}`}
                      style={{ fontSize: "0.72rem", padding: "0.25rem 0.6rem" }}
                    >
                      {currentAssigned ? <><Check size={12} /> Active</> : "Pick"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: ACTIVE HYMN DISPLAY & PROJECTOR LAUNCHER */}
      <div>
        <div
          style={{
            background: "#ffffff",
            border: "2px solid var(--marian)",
            borderRadius: "8px",
            padding: "clamp(1.25rem, 3vw, 2rem)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
            position: "sticky",
            top: "5rem",
          }}
        >
          {/* Header of Active Hymn */}
          <div style={{ borderBottom: "2px solid var(--gold)", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--gold-text)", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                  <Music size={14} /> {activeHymn.categoryLabel}
                </span>
                <h2 style={{ margin: "0.25rem 0 0.2rem", fontSize: "1.65rem", color: "var(--navy)" }}>
                  {activeHymn.title}
                </h2>
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", fontSize: "0.82rem", color: "var(--muted)" }}>
                  <span>Language: <strong>{activeHymn.language}</strong></span>
                  {activeHymn.tune && <span>Tune: <strong>{activeHymn.tune}</strong></span>}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button
                  type="button"
                  onClick={copyShareLink}
                  className="btn secondary small"
                  style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem" }}
                  title="Copy link to this hymn"
                >
                  {copiedLink ? <Check size={14} color="green" /> : <Share2 size={14} />}
                </button>
              </div>
            </div>
          </div>

          {/* Action Bar: Projector Button */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <Link
              href={`/projector?tab=hymns&hymnId=${activeHymn.id}`}
              className="btn"
              style={{ flex: 1, textAlign: "center", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.45rem", fontSize: "0.92rem", padding: "0.6rem 1rem" }}
            >
              <Tv size={17} /> Broadcast This Hymn on Projector →
            </Link>
          </div>

          {/* Refrain Box */}
          {activeHymn.refrain && (
            <div
              style={{
                background: "var(--paper)",
                border: "1px solid var(--gold)",
                borderLeft: "4px solid var(--gold)",
                borderRadius: "6px",
                padding: "0.85rem 1.15rem",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--gold-text)", display: "block", marginBottom: "0.25rem" }}>
                Refrain / Chorale
              </span>
              <p style={{ margin: 0, fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.6, color: "var(--navy)", whiteSpace: "pre-line" }}>
                {activeHymn.refrain}
              </p>
            </div>
          )}

          {/* Verses */}
          <div style={{ display: "grid", gap: "1.25rem" }}>
            {activeHymn.verses.map((verse, index) => (
              <div
                key={index}
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "6px",
                  background: "var(--ivory)",
                  border: "1px solid var(--line)",
                }}
              >
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gold-text)", display: "block", marginBottom: "0.35rem" }}>
                  Stanza {index + 1}
                </span>
                <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.65, color: "var(--ink)", whiteSpace: "pre-line" }}>
                  {verse}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Pew Reader Notice */}
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: "1rem", marginTop: "1.5rem", textAlign: "center" }}>
            <p className="muted small" style={{ margin: 0 }}>
              📱 Parishioners can access this page anytime at <strong>omph-aefutha.catholic.ng/hymns</strong> on their phones during Mass.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
