"use client";

import { useState } from "react";
import Link from "next/link";
import { ORDER_OF_MASS, type OrderOfMassPart, type LiturgicalDialogue } from "@/lib/liturgy/order-of-mass";
import { Tv, Languages, BookOpen, ChevronDown } from "lucide-react";

type LanguageMode = "all" | "en_la" | "en_ig" | "en" | "la" | "ig";

export function OrderOfMassView() {
  const [langMode, setLangMode] = useState<LanguageMode>("en_ig");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredParts = ORDER_OF_MASS.filter((p) =>
    activeCategory === "all" ? true : p.category === activeCategory
  );

  return (
    <div>
      {/* Top Controls Bar */}
      <div
        style={{
          background: "var(--paper)",
          border: "2px solid var(--gold)",
          borderRadius: "8px",
          padding: "1.25rem",
          marginBottom: "2rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.1em", color: "var(--gold-text)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Languages size={15} /> Roman Missal 2010 (Nigeria Recognitio)
            </span>
            <h2 style={{ margin: "0.2rem 0 0", fontSize: "1.45rem", color: "var(--navy)" }}>
              The Order of Mass (Ordo Missae)
            </h2>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link
              href="/projector?tab=order"
              className="btn"
              style={{ fontSize: "0.85rem", padding: "0.5rem 1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
            >
              <Tv size={16} /> Broadcast on Church Projector →
            </Link>
          </div>
        </div>

        {/* Language Selection Tabs */}
        <div style={{ borderTop: "1px solid var(--line)", marginTop: "1rem", paddingTop: "0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--muted)", marginRight: "0.2rem" }}>
              Languages:
            </span>
            <button
              type="button"
              onClick={() => setLangMode("en_ig")}
              className={`btn small ${langMode === "en_ig" ? "" : "secondary"}`}
              style={{ fontSize: "0.78rem", padding: "0.3rem 0.65rem" }}
            >
              English + Igbo
            </button>
            <button
              type="button"
              onClick={() => setLangMode("en_la")}
              className={`btn small ${langMode === "en_la" ? "" : "secondary"}`}
              style={{ fontSize: "0.78rem", padding: "0.3rem 0.65rem" }}
            >
              English + Latin
            </button>
            <button
              type="button"
              onClick={() => setLangMode("all")}
              className={`btn small ${langMode === "all" ? "" : "secondary"}`}
              style={{ fontSize: "0.78rem", padding: "0.3rem 0.65rem" }}
            >
              Trilingual (All 3)
            </button>
            <button
              type="button"
              onClick={() => setLangMode("en")}
              className={`btn small ${langMode === "en" ? "" : "secondary"}`}
              style={{ fontSize: "0.78rem", padding: "0.3rem 0.65rem" }}
            >
              English Only
            </button>
            <button
              type="button"
              onClick={() => setLangMode("ig")}
              className={`btn small ${langMode === "ig" ? "" : "secondary"}`}
              style={{ fontSize: "0.78rem", padding: "0.3rem 0.65rem" }}
            >
              Igbo Only
            </button>
            <button
              type="button"
              onClick={() => setLangMode("la")}
              className={`btn small ${langMode === "la" ? "" : "secondary"}`}
              style={{ fontSize: "0.78rem", padding: "0.3rem 0.65rem" }}
            >
              Latin Only
            </button>
          </div>

          {/* Category Filter */}
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--muted)", marginRight: "0.2rem" }}>
              Jump:
            </span>
            {[
              { id: "all", label: "All Mass" },
              { id: "introductory", label: "1. Introductory" },
              { id: "word", label: "2. Word" },
              { id: "eucharist", label: "3. Eucharist" },
              { id: "communion", label: "4. Communion" },
              { id: "concluding", label: "5. Dismissal" },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={`link-btn ${activeCategory === c.id ? "active" : ""}`}
                style={{
                  fontSize: "0.78rem",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  background: activeCategory === c.id ? "var(--marian)" : "transparent",
                  color: activeCategory === c.id ? "#ffffff" : "var(--ink)",
                  fontWeight: activeCategory === c.id ? 700 : 500,
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liturgical Sections List */}
      <div style={{ display: "grid", gap: "2.5rem" }}>
        {filteredParts.map((part) => (
          <section
            key={part.id}
            id={part.id}
            style={{
              background: "#ffffff",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            {/* Section Heading */}
            <div style={{ borderBottom: "2px solid var(--gold)", paddingBottom: "0.75rem", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, color: "var(--gold-text)", display: "block" }}>
                {part.categoryLabel}
              </span>
              <h2 style={{ margin: "0.25rem 0 0.15rem", fontSize: "1.75rem", color: "var(--navy)" }}>
                {part.title}
              </h2>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.9rem", color: "var(--muted)", fontStyle: "italic" }}>
                <span>Latin: <strong>{part.latinTitle}</strong></span>
                <span>Igbo: <strong>{part.igboTitle}</strong></span>
              </div>
              {part.rubric && (
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.88rem", color: "#b45309", fontStyle: "italic", background: "#fef3c7", padding: "0.45rem 0.85rem", borderRadius: "4px" }}>
                  ℹ Rubric: {part.rubric}
                </p>
              )}
            </div>

            {/* Liturgical Dialogue Items */}
            <div style={{ display: "grid", gap: "1.75rem" }}>
              {part.items.map((item) => (
                <article
                  key={item.id}
                  style={{
                    background: "var(--paper)",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", borderBottom: "1px dashed var(--line)", paddingBottom: "0.4rem" }}>
                    <h3 style={{ margin: 0, fontSize: "1.15rem", color: "var(--navy)" }}>
                      {item.title}
                    </h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {item.section}
                    </span>
                  </div>

                  {item.rubric && (
                    <p style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: "#92400e", fontStyle: "italic" }}>
                      {item.rubric}
                    </p>
                  )}

                  {/* Parallel Display Columns */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        langMode === "all"
                          ? "repeat(auto-fit, minmax(260px, 1fr))"
                          : langMode === "en_la" || langMode === "en_ig"
                          ? "repeat(auto-fit, minmax(300px, 1fr))"
                          : "1fr",
                      gap: "1.25rem",
                    }}
                  >
                    {/* ENGLISH */}
                    {(langMode === "all" || langMode === "en_la" || langMode === "en_ig" || langMode === "en") && (
                      <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
                        <span style={{ fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: "var(--marian)", display: "block", marginBottom: "0.4rem" }}>
                          English (Roman Missal 2010)
                        </span>
                        {item.english.celebrant && (
                          <p style={{ margin: "0 0 0.5rem", fontSize: "0.95rem", color: "var(--burgundy)", fontWeight: 600 }}>
                            <span style={{ color: "var(--muted)", fontWeight: 400 }}>Priest: </span>
                            {item.english.celebrant}
                          </p>
                        )}
                        <p style={{ margin: 0, fontSize: "1.02rem", lineHeight: 1.6, color: "var(--ink)", whiteSpace: "pre-line" }}>
                          <span style={{ color: "var(--gold-text)", fontWeight: 700 }}>People: </span>
                          {item.english.people}
                        </p>
                      </div>
                    )}

                    {/* IGBO */}
                    {(langMode === "all" || langMode === "en_ig" || langMode === "ig") && (
                      <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
                        <span style={{ fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: "#15803d", display: "block", marginBottom: "0.4rem" }}>
                          Igbo (Usoro nke Emume Mass)
                        </span>
                        {item.igbo.celebrant && (
                          <p style={{ margin: "0 0 0.5rem", fontSize: "0.95rem", color: "var(--burgundy)", fontWeight: 600 }}>
                            <span style={{ color: "var(--muted)", fontWeight: 400 }}>Ụkọchukwu: </span>
                            {item.igbo.celebrant}
                          </p>
                        )}
                        <p style={{ margin: 0, fontSize: "1.02rem", lineHeight: 1.6, color: "var(--ink)", whiteSpace: "pre-line" }}>
                          <span style={{ color: "var(--gold-text)", fontWeight: 700 }}>Ọgbakọ: </span>
                          {item.igbo.people}
                        </p>
                      </div>
                    )}

                    {/* LATIN */}
                    {(langMode === "all" || langMode === "en_la" || langMode === "la") && (
                      <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
                        <span style={{ fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: "var(--navy)", display: "block", marginBottom: "0.4rem" }}>
                          Latin (Missale Romanum)
                        </span>
                        {item.latin.celebrant && (
                          <p style={{ margin: "0 0 0.5rem", fontSize: "0.95rem", color: "var(--burgundy)", fontWeight: 600 }}>
                            <span style={{ color: "var(--muted)", fontWeight: 400 }}>Sacerdos: </span>
                            {item.latin.celebrant}
                          </p>
                        )}
                        <p style={{ margin: 0, fontSize: "1.02rem", lineHeight: 1.6, color: "var(--ink)", fontStyle: "italic", whiteSpace: "pre-line" }}>
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
