"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, BookOpen, MessageCircleQuestion } from "lucide-react";
import { useLang } from "@/components/layout/useLang";
import type { DoctrineEntry } from "@/lib/doctrine/types";

interface CategoryMeta {
  slug: string;
  title: string;
  blurb?: string;
}

export function DoctrineExplorer({
  entries,
  categories,
  initialQuery = "",
  initialCategory = "",
}: {
  entries: DoctrineEntry[];
  categories: readonly CategoryMeta[];
  initialQuery?: string;
  initialCategory?: string;
}) {
  const { t } = useLang();
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const [activeLetter, setActiveLetter] = useState<string>("all");

  // Alphabetical sort by question text
  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => a.question.localeCompare(b.question));
  }, [entries]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: entries.length };
    for (const e of entries) {
      counts[e.category] = (counts[e.category] ?? 0) + 1;
    }
    return counts;
  }, [entries]);

  // Available initial letters
  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    for (const e of entries) {
      const char = e.question.trim().charAt(0).toUpperCase();
      if (/[A-Z]/.test(char)) set.add(char);
    }
    return Array.from(set).sort();
  }, [entries]);

  // Filtered entries based on query, category, and letter
  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortedEntries.filter((e) => {
      // Category filter
      if (activeCategory !== "all" && e.category !== activeCategory) {
        return false;
      }

      // Letter filter (only applied if not actively searching text)
      if (!q && activeLetter !== "all") {
        const firstLetter = e.question.trim().charAt(0).toUpperCase();
        if (firstLetter !== activeLetter) return false;
      }

      // Search query filter
      if (!q) return true;

      const inQuestion = e.question.toLowerCase().includes(q);
      const inAnswer = e.answer.toLowerCase().includes(q);
      const inKeywords = e.keywords?.some((k) => k.toLowerCase().includes(q));
      const inSources = e.sources?.some((s) => {
        if ("title" in s && s.title) return s.title.toLowerCase().includes(q);
        if ("ref" in s && s.ref) return s.ref.toLowerCase().includes(q);
        return false;
      });
      return inQuestion || inAnswer || inKeywords || inSources;
    });
  }, [sortedEntries, query, activeCategory, activeLetter]);

  // Group filtered entries by letter if no query is present
  const groupedByLetter = useMemo(() => {
    if (query.trim()) return null;
    const groups: Record<string, DoctrineEntry[]> = {};
    for (const e of filteredEntries) {
      const char = e.question.trim().charAt(0).toUpperCase();
      const letter = /[A-Z]/.test(char) ? char : "#";
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(e);
    }
    return groups;
  }, [filteredEntries, query]);

  const catMap = useMemo(() => new Map(categories.map((c) => [c.slug, c.title])), [categories]);

  const openPadre = () => {
    const btn = document.getElementById("padre-chat-trigger");
    btn?.click();
  };

  return (
    <div className="doctrine-explorer">
      {/* Search and Filter Bar */}
      <div className="doctrine-controls" style={{ marginBottom: "2rem" }}>
        <div className="doctrine-search-box" style={{ position: "relative", marginBottom: "1.25rem" }}>
          <Search size={18} aria-hidden="true" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value) setActiveLetter("all");
            }}
            placeholder={t("search_placeholder", "Search all 80 Catholic teachings, topics, or questions (e.g. Mary, Eucharist, Confession, Creed)...")}
            aria-label="Search Catholic doctrine questions"
            style={{
              width: "100%",
              padding: "0.85rem 2.8rem 0.85rem 2.8rem",
              borderRadius: "4px",
              border: "1px solid var(--line)",
              fontSize: "1rem",
              fontFamily: "inherit",
              background: "var(--paper)",
              color: "var(--navy)",
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search query"
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--muted)",
                padding: "0.4rem",
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Categories Pills */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>{t("filter_category", "Filter by Category")}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            <button
              type="button"
              className={`pill-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => { setActiveCategory("all"); setActiveLetter("all"); }}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "999px",
                border: "1px solid var(--line)",
                background: activeCategory === "all" ? "var(--marian)" : "var(--paper)",
                color: activeCategory === "all" ? "#fff" : "var(--navy)",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              {t("all_categories", "All Topics")} ({categoryCounts.all ?? 0})
            </button>
            {categories.map((c) => {
              const active = activeCategory === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  className={`pill-btn ${active ? "active" : ""}`}
                  onClick={() => { setActiveCategory(c.slug); setActiveLetter("all"); }}
                  style={{
                    padding: "0.4rem 0.85rem",
                    borderRadius: "999px",
                    border: "1px solid var(--line)",
                    background: active ? "var(--marian)" : "var(--paper)",
                    color: active ? "#fff" : "var(--navy)",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  {c.title} ({categoryCounts[c.slug] ?? 0})
                </button>
              );
            })}
          </div>
        </div>

        {/* Alphabet Jump Bar (when not searching) */}
        {!query && (
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.3rem", padding: "0.5rem 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginRight: "0.4rem" }}>A–Z Index:</span>
            <button
              type="button"
              onClick={() => setActiveLetter("all")}
              style={{
                padding: "0.2rem 0.5rem",
                borderRadius: "3px",
                border: "none",
                background: activeLetter === "all" ? "var(--gold)" : "transparent",
                color: activeLetter === "all" ? "var(--navy)" : "var(--navy)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              All
            </button>
            {availableLetters.map((letter) => {
              const active = activeLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setActiveLetter(letter)}
                  style={{
                    padding: "0.2rem 0.45rem",
                    borderRadius: "3px",
                    border: "none",
                    background: active ? "var(--marian)" : "transparent",
                    color: active ? "#fff" : "var(--ink)",
                    fontWeight: active ? 700 : 500,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Results Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <p className="muted small" style={{ margin: 0 }}>
          Showing <strong>{filteredEntries.length}</strong> {filteredEntries.length === 1 ? "question" : "questions"} (Alphabetical A–Z)
          {activeCategory !== "all" && ` in ${catMap.get(activeCategory)}`}
          {activeLetter !== "all" && ` starting with “${activeLetter}”`}
          {query && ` matching “${query}”`}
        </p>
        <button
          type="button"
          onClick={openPadre}
          className="link-btn"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.88rem", fontWeight: 600 }}
        >
          <MessageCircleQuestion size={16} /> Have another question? Ask a Padre
        </button>
      </div>

      {/* Questions List */}
      {filteredEntries.length === 0 ? (
        <div className="ask-notice" style={{ padding: "2rem", textAlign: "center" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
            No matching questions found for <strong>“{query}”</strong>.
          </p>
          <p className="muted small" style={{ marginBottom: "1.25rem" }}>
            Try using different keywords, clear filters, or ask our automated Ask a Padre assistant directly.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <button
              type="button"
              className="btn secondary"
              onClick={() => { setQuery(""); setActiveCategory("all"); setActiveLetter("all"); }}
            >
              Reset Filters
            </button>
            <button
              type="button"
              className="btn"
              onClick={openPadre}
            >
              Ask a Padre Chatbot
            </button>
          </div>
        </div>
      ) : groupedByLetter ? (
        // Alphabetical Section Groups
        <div className="doctrine-alphabetical-groups">
          {Object.entries(groupedByLetter).sort(([a], [b]) => a.localeCompare(b)).map(([letter, items]) => (
            <div key={letter} style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "2px solid var(--gold)", paddingBottom: "0.3rem", marginBottom: "1.25rem" }}>
                <span style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 700, color: "var(--marian)" }}>{letter}</span>
                <span className="muted small">({items.length} {items.length === 1 ? "entry" : "entries"})</span>
              </div>
              <ul className="entries" style={{ listStyle: "none", padding: 0 }}>
                {items.map((entry) => (
                  <li key={entry.id} style={{ padding: "1.1rem 0", borderBottom: "1px solid var(--line)" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem" }}>
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.15rem 0.5rem", borderRadius: "3px", background: "var(--paper)", border: "1px solid var(--line)", color: "var(--gold-text)" }}>
                          {catMap.get(entry.category) ?? entry.category}
                        </span>
                        {entry.sources && entry.sources.length > 0 && (
                          <span className="muted small" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            <BookOpen size={12} /> {entry.sources.length} Church {entry.sources.length === 1 ? "source" : "sources"}
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontSize: "1.2rem", margin: "0.2rem 0 0.5rem" }}>
                        <Link href={`/doctrine/${entry.id}`} style={{ textDecoration: "none", color: "var(--navy)" }}>
                          {entry.question}
                        </Link>
                      </h3>
                      <p className="muted" style={{ fontSize: "0.95rem", margin: 0, lineHeight: 1.5 }}>
                        {entry.answer.split(/\n{2,}/)[0].slice(0, 220)}…
                      </p>
                      <div style={{ marginTop: "0.5rem" }}>
                        <Link href={`/doctrine/${entry.id}`} style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--marian)" }}>
                          Read complete answer and sources →
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        // Flat search results list
        <ul className="entries" style={{ listStyle: "none", padding: 0 }}>
          {filteredEntries.map((entry) => (
            <li key={entry.id} style={{ padding: "1.1rem 0", borderBottom: "1px solid var(--line)" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.15rem 0.5rem", borderRadius: "3px", background: "var(--paper)", border: "1px solid var(--line)", color: "var(--gold-text)" }}>
                    {catMap.get(entry.category) ?? entry.category}
                  </span>
                  {entry.sources && entry.sources.length > 0 && (
                    <span className="muted small" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                      <BookOpen size={12} /> {entry.sources.length} Church {entry.sources.length === 1 ? "source" : "sources"}
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: "1.2rem", margin: "0.2rem 0 0.5rem" }}>
                  <Link href={`/doctrine/${entry.id}`} style={{ textDecoration: "none", color: "var(--navy)" }}>
                    {entry.question}
                  </Link>
                </h3>
                <p className="muted" style={{ fontSize: "0.95rem", margin: 0, lineHeight: 1.5 }}>
                  {entry.answer.split(/\n{2,}/)[0].slice(0, 220)}…
                </p>
                <div style={{ marginTop: "0.5rem" }}>
                  <Link href={`/doctrine/${entry.id}`} style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--marian)" }}>
                    Read complete answer and sources →
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
