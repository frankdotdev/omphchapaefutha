"use client";

import { useState } from "react";
import Link from "next/link";
import { ORDER_OF_MASS, type OrderOfMassPart, type LiturgicalDialogue } from "@/lib/liturgy/order-of-mass";
import { Tv, Languages, BookOpen, ChevronRight } from "lucide-react";

type LanguageMode = "all" | "en_ig" | "en_la" | "en" | "ig" | "la";

export function OrderOfMassView() {
  const [langMode, setLangMode] = useState<LanguageMode>("en_ig");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredParts = ORDER_OF_MASS.filter((p) =>
    activeCategory === "all" ? true : p.category === activeCategory
  );

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden", boxSizing: "border-box" }}>
      {/* Top Controls Bar */}
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          padding: "clamp(1rem, 3vw, 1.5rem)",
          marginBottom: "2rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.1em", color: "var(--gold-text)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Languages size={15} /> Roman Missal (Nigeria Recognitio)
            </span>
            <h2 style={{ margin: "0.25rem 0 0", fontSize: "clamp(1.25rem, 3.5vw, 1.7rem)", color: "var(--navy)" }}>
              The Order of Mass (Ordo Missae)
            </h2>
          </div>

          <div style={{ width: "100%", maxWidth: "fit-content" }}>
            <Link
              href="/projector?tab=order"
              className="btn"
              style={{ fontSize: "0.85rem", padding: "0.5rem 1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "100%", justifyContent: "center" }}
            >
              <Tv size={16} /> Broadcast on Projector →
            </Link>
          </div>
        </div>

        {/* Language Selection Filter */}
        <div style={{ borderTop: "1px solid var(--line)", marginTop: "1rem", paddingTop: "0.85rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Select Languages:
            </span>
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", width: "100%" }}>
              {[
                { id: "en_ig", label: "English + Igbo" },
                { id: "en_la", label: "English + Latin" },
                { id: "all", label: "Trilingual (All 3)" },
                { id: "en", label: "English Only" },
                { id: "ig", label: "Igbo Only" },
                { id: "la", label: "Latin Only" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLangMode(opt.id as LanguageMode)}
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.35rem 0.65rem",
                    borderRadius: "4px",
                    border: "1px solid",
                    borderColor: langMode === opt.id ? "var(--marian)" : "var(--line)",
                    background: langMode === opt.id ? "var(--marian)" : "#fff",
                    color: langMode === opt.id ? "#fff" : "var(--navy)",
                    fontWeight: langMode === opt.id ? 700 : 500,
                    cursor: "pointer",
                    flex: "1 1 auto",
                    textAlign: "center",
                    minWidth: "fit-content",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Section Jumper */}
          <div style={{ marginTop: "0.85rem", paddingTop: "0.75rem", borderTop: "1px dashed var(--line)" }}>
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", marginRight: "0.2rem" }}>
                Jump to Part:
              </span>
              {[
                { id: "all", label: "All Mass" },
                { id: "introductory", label: "1. Introductory" },
                { id: "word", label: "2. Liturgy of Word" },
                { id: "eucharist", label: "3. Eucharist" },
                { id: "communion", label: "4. Communion" },
                { id: "concluding", label: "5. Dismissal" },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id)}
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.55rem",
                    borderRadius: "4px",
                    border: "none",
                    background: activeCategory === c.id ? "var(--gold)" : "transparent",
                    color: activeCategory === c.id ? "#000" : "var(--ink)",
                    fontWeight: activeCategory === c.id ? 700 : 500,
                    cursor: "pointer",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Liturgical Sections List */}
      <div style={{ display: "grid", gap: "2rem", width: "100%", maxWidth: "100%" }}>
        {filteredParts.map((part) => (
          <section
            key={part.id}
            id={part.id}
            style={{
              background: "#ffffff",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              padding: "clamp(1rem, 3vw, 2rem)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
              boxSizing: "border-box",
              width: "100%",
              maxWidth: "100%",
              overflowX: "hidden",
            }}
          >
            {/* Section Heading */}
            <div style={{ borderBottom: "1.5px solid var(--gold)", paddingBottom: "0.75rem", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, color: "var(--gold-text)", display: "block" }}>
                {part.categoryLabel}
              </span>
              <h2 style={{ margin: "0.25rem 0 0.15rem", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", color: "var(--navy)" }}>
                {part.title}
              </h2>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", fontSize: "0.88rem", color: "var(--muted)", fontStyle: "italic" }}>
                <span>Latin: <strong>{part.latinTitle}</strong></span>
                <span>Igbo: <strong>{part.igboTitle}</strong></span>
              </div>
              {part.rubric && (
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem", color: "#92400e", fontStyle: "italic", background: "var(--ivory)", padding: "0.45rem 0.75rem", borderRadius: "4px", border: "1px solid var(--line)" }}>
                  ❖ Rubric: {part.rubric}
                </p>
              )}
            </div>

            {/* Liturgical Dialogue Items */}
            <div style={{ display: "grid", gap: "1.5rem", width: "100%" }}>
              {part.items.map((item) => (
                <article
                  key={item.id}
                  style={{
                    background: "var(--paper)",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    padding: "clamp(0.85rem, 2.5vw, 1.25rem)",
                    boxSizing: "border-box",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem", borderBottom: "1px dashed var(--line)", paddingBottom: "0.4rem", flexWrap: "wrap", gap: "0.4rem" }}>
                    <h3 style={{ margin: 0, fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: "var(--navy)" }}>
                      {item.title}
                    </h3>
                    <span style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {item.section}
                    </span>
                  </div>

                  {item.rubric && (
                    <p style={{ margin: "0 0 0.75rem", fontSize: "0.82rem", color: "#92400e", fontStyle: "italic" }}>
                      {item.rubric}
                    </p>
                  )}

                  {/* Parallel Display Columns (Mobile-First responsive) */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        langMode === "all"
                          ? "repeat(auto-fit, minmax(min(100%, 260px), 1fr))"
                          : ["en_la", "en_ig"].includes(langMode)
                          ? "repeat(auto-fit, minmax(min(100%, 280px), 1fr))"
                          : "1fr",
                      gap: "1rem",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    {/* ENGLISH */}
                    {(langMode === "all" || langMode === "en_la" || langMode === "en_ig" || langMode === "en") && (
                      <div style={{ background: "#ffffff", padding: "0.85rem", borderRadius: "6px", border: "1px solid var(--line)", boxSizing: "border-box", minWidth: 0 }}>
                        <span style={{ fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: "var(--marian)", display: "block", marginBottom: "0.4rem" }}>
                          English (Roman Missal 2010)
                        </span>
                        {item.english.celebrant && (
                          <p style={{ margin: "0 0 0.45rem", fontSize: "0.92rem", color: "var(--burgundy)", fontWeight: 600, wordBreak: "break-word" }}>
                            <span style={{ color: "var(--muted)", fontWeight: 400 }}>Priest: </span>
                            {item.english.celebrant}
                          </p>
                        )}
                        <p style={{ margin: 0, fontSize: "0.96rem", lineHeight: 1.55, color: "var(--ink)", whiteSpace: "pre-line", wordBreak: "break-word" }}>
                          <span style={{ color: "var(--gold-text)", fontWeight: 700 }}>People: </span>
                          {item.english.people}
                        </p>
                      </div>
                    )}

                    {/* IGBO */}
                    {(langMode === "all" || langMode === "en_ig" || langMode === "ig") && (
                      <div style={{ background: "#ffffff", padding: "0.85rem", borderRadius: "6px", border: "1px solid var(--line)", boxSizing: "border-box", minWidth: 0 }}>
                        <span style={{ fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: "#15803d", display: "block", marginBottom: "0.4rem" }}>
                          Igbo (Usoro nke Emume Mass)
                        </span>
                        {item.igbo.celebrant && (
                          <p style={{ margin: "0 0 0.45rem", fontSize: "0.92rem", color: "var(--burgundy)", fontWeight: 600, wordBreak: "break-word" }}>
                            <span style={{ color: "var(--muted)", fontWeight: 400 }}>Ụkọchukwu: </span>
                            {item.igbo.celebrant}
                          </p>
                        )}
                        <p style={{ margin: 0, fontSize: "0.96rem", lineHeight: 1.55, color: "var(--ink)", whiteSpace: "pre-line", wordBreak: "break-word" }}>
                          <span style={{ color: "var(--gold-text)", fontWeight: 700 }}>Ọgbakọ: </span>
                          {item.igbo.people}
                        </p>
                      </div>
                    )}

                    {/* LATIN */}
                    {(langMode === "all" || langMode === "en_la" || langMode === "la") && (
                      <div style={{ background: "#ffffff", padding: "0.85rem", borderRadius: "6px", border: "1px solid var(--line)", boxSizing: "border-box", minWidth: 0 }}>
                        <span style={{ fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: "var(--navy)", display: "block", marginBottom: "0.4rem" }}>
                          Latin (Missale Romanum)
                        </span>
                        {item.latin.celebrant && (
                          <p style={{ margin: "0 0 0.45rem", fontSize: "0.92rem", color: "var(--burgundy)", fontWeight: 600, wordBreak: "break-word" }}>
                            <span style={{ color: "var(--muted)", fontWeight: 400 }}>Sacerdos: </span>
                            {item.latin.celebrant}
                          </p>
                        )}
                        <p style={{ margin: 0, fontSize: "0.96rem", lineHeight: 1.55, color: "var(--ink)", fontStyle: "italic", whiteSpace: "pre-line", wordBreak: "break-word" }}>
                          <span style={{ color: "var(--gold-text)", fontWeight: 700, fontStyle: "normal" }}>Populus: </span>
                          {item.latin.people}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
