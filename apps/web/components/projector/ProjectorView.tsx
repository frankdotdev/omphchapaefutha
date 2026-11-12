"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ORDER_OF_MASS, type OrderOfMassPart } from "@/lib/liturgy/order-of-mass";
import { CATHOLIC_HYMNS, type Hymn } from "@/lib/hymns/data";
import { CURATED_DAILY_READINGS } from "@/lib/liturgy/daily-readings-data";
import { SEED_ANNOUNCEMENTS, SEED_EVENTS } from "@/lib/data/seed";
import type { Announcement, ChaplaincyEvent } from "@/lib/types";
import { lagosDateString, formatLongDate } from "@/lib/time/lagos";
import {
  Maximize,
  Minimize,
  Type,
  Sun,
  Moon,
  Tv,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Music,
  ScrollText,
  HeartHandshake,
  ArrowLeft,
  Megaphone,
  Calendar,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

type ProjectorTab = "readings" | "order" | "hymns" | "intentions" | "announcements" | "events";
type ThemeMode = "sanctuary" | "daylight" | "amber";
type LangChoice = "en_ig" | "en_la" | "all" | "en" | "ig" | "la";

export function ProjectorView() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as ProjectorTab) || "readings";
  const initialHymnId = searchParams.get("hymnId") || "comm-001";
  const initialLang = (searchParams.get("lang") as LangChoice) || "en_ig";

  const [activeTab, setActiveTab] = useState<ProjectorTab>(initialTab);
  const [theme, setTheme] = useState<ThemeMode>("sanctuary");
  const [fontSizePx, setFontSizePx] = useState<number>(36);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [langChoice, setLangChoice] = useState<LangChoice>(initialLang);

  // Daily Readings Slide State
  const todayDate = lagosDateString();
  const readings = CURATED_DAILY_READINGS[todayDate] || CURATED_DAILY_READINGS["2026-11-11"];
  const [readingSlide, setReadingSlide] = useState<number>(0);

  // Order of Mass Slide State
  const [orderPartIdx, setOrderPartIdx] = useState<number>(0);

  // Hymns Slide State
  const [selectedHymnId, setSelectedHymnId] = useState<string>(initialHymnId);
  const [hymnVerseIdx, setHymnVerseIdx] = useState<number>(0);

  // Announcements Slide State
  const [announcements, setAnnouncements] = useState<Announcement[]>(SEED_ANNOUNCEMENTS);
  const [announcementIdx, setAnnouncementIdx] = useState<number>(0);

  // Events Slide State
  const [events, setEvents] = useState<ChaplaincyEvent[]>(SEED_EVENTS);
  const [eventIdx, setEventIdx] = useState<number>(0);

  // Hydrate custom draft announcements from Catechist bulk box if present in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("omph_announcements_parsed_v1");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnnouncements(parsed);
        }
      }
    } catch {
      // Fallback to SEED_ANNOUNCEMENTS
    }
  }, []);

  const activeHymn = useMemo(() => {
    return CATHOLIC_HYMNS.find((h) => h.id === selectedHymnId) || CATHOLIC_HYMNS[0];
  }, [selectedHymnId]);

  // Slides builder for Daily Readings
  const readingSlides = useMemo(() => {
    if (!readings) return [];
    const list: { title: string; subtitle?: string; ref: string; content: string; response?: string }[] = [];

    if (readings.firstReading) {
      list.push({
        title: "First Reading",
        ref: readings.firstReading.ref || "",
        content: readings.firstReading.text || "",
      });
    }

    if (readings.psalm) {
      list.push({
        title: "Responsorial Psalm",
        ref: readings.psalm.ref || "",
        content: readings.psalm.text || "",
      });
    }

    if (readings.secondReading) {
      list.push({
        title: "Second Reading",
        ref: readings.secondReading.ref || "",
        content: readings.secondReading.text || "",
      });
    }

    if (readings.gospel) {
      list.push({
        title: "The Holy Gospel",
        subtitle: "The Lord be with you — And with your spirit",
        ref: readings.gospel.ref || "",
        content: readings.gospel.text || "",
      });
    }

    return list;
  }, [readings]);

  // Fullscreen toggle handler
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  }, []);

  // Slide navigation
  const handlePrev = useCallback(() => {
    if (activeTab === "readings") {
      setReadingSlide((curr) => Math.max(0, curr - 1));
    } else if (activeTab === "order") {
      setOrderPartIdx((curr) => Math.max(0, curr - 1));
    } else if (activeTab === "hymns") {
      setHymnVerseIdx((curr) => Math.max(0, curr - 1));
    } else if (activeTab === "announcements") {
      setAnnouncementIdx((curr) => Math.max(0, curr - 1));
    } else if (activeTab === "events") {
      setEventIdx((curr) => Math.max(0, curr - 1));
    }
  }, [activeTab]);

  const handleNext = useCallback(() => {
    if (activeTab === "readings") {
      setReadingSlide((curr) => Math.min(readingSlides.length - 1, curr + 1));
    } else if (activeTab === "order") {
      setOrderPartIdx((curr) => Math.min(ORDER_OF_MASS.length - 1, curr + 1));
    } else if (activeTab === "hymns") {
      if (activeHymn) {
        setHymnVerseIdx((curr) => Math.min(activeHymn.verses.length - 1, curr + 1));
      }
    } else if (activeTab === "announcements") {
      setAnnouncementIdx((curr) => Math.min(announcements.length - 1, curr + 1));
    } else if (activeTab === "events") {
      setEventIdx((curr) => Math.min(events.length - 1, curr + 1));
    }
  }, [activeTab, readingSlides.length, activeHymn, announcements.length, events.length]);

  // Keyboard navigation & remote clicker listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or select
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if (e.key === "1") {
        setActiveTab("readings");
      } else if (e.key === "2") {
        setActiveTab("order");
      } else if (e.key === "3") {
        setActiveTab("hymns");
      } else if (e.key === "4") {
        setActiveTab("intentions");
      } else if (e.key === "5") {
        setActiveTab("announcements");
      } else if (e.key === "6") {
        setActiveTab("events");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, toggleFullscreen]);

  // Theme styling definitions
  const themeStyles = useMemo(() => {
    if (theme === "daylight") {
      return {
        bg: "#ffffff",
        text: "#111827",
        heading: "#1e3a8a",
        gold: "#b45309",
        cardBg: "#f8fafc",
        border: "#e2e8f0",
        dialoguePriest: "#991b1b",
        dialoguePeople: "#1e3a8a",
      };
    }
    if (theme === "amber") {
      return {
        bg: "#16130e",
        text: "#fbf6ec",
        heading: "#fcd34d",
        gold: "#f59e0b",
        cardBg: "#221d15",
        border: "#3d3423",
        dialoguePriest: "#f87171",
        dialoguePeople: "#60a5fa",
      };
    }
    // sanctuary (Dark)
    return {
      bg: "#05070a",
      text: "#ffffff",
      heading: "#ffd700",
      gold: "#eab308",
      cardBg: "#0f172a",
      border: "#1e293b",
      dialoguePriest: "#fca5a5",
      dialoguePeople: "#93c5fd",
    };
  }, [theme]);

  const currentOrderPart = ORDER_OF_MASS[orderPartIdx] || ORDER_OF_MASS[0];
  const currentAnnouncement = announcements[announcementIdx] || announcements[0];
  const currentEvent = events[eventIdx] || events[0];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        overflowY: "auto",
        minHeight: "100vh",
        background: themeStyles.bg,
        color: themeStyles.text,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Cinzel', 'Palatino', 'Georgia', serif",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Top Projector Control Bar */}
      <header
        style={{
          background: "rgba(10, 15, 25, 0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${themeStyles.border}`,
          padding: "0.6rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/"
            style={{
              color: "#94a3b8",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> Exit Projector
          </Link>
          <span
            style={{
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#f59e0b",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Tv size={18} /> OMPH AE-FUTHA · PROJECTOR MODE
          </span>
        </div>

        {/* Tab Switchers: 1 to 6 */}
        <div style={{ display: "flex", gap: "0.3rem", background: "#1e293b", padding: "0.25rem", borderRadius: "6px", flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveTab("readings")}
            style={{
              padding: "0.4rem 0.75rem",
              fontSize: "0.8rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              background: activeTab === "readings" ? "#eab308" : "transparent",
              color: activeTab === "readings" ? "#000" : "#cbd5e1",
            }}
          >
            <BookOpen size={14} /> [1] Readings
          </button>

          <button
            onClick={() => setActiveTab("order")}
            style={{
              padding: "0.4rem 0.75rem",
              fontSize: "0.8rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              background: activeTab === "order" ? "#eab308" : "transparent",
              color: activeTab === "order" ? "#000" : "#cbd5e1",
            }}
          >
            <ScrollText size={14} /> [2] Order of Mass
          </button>

          <button
            onClick={() => setActiveTab("hymns")}
            style={{
              padding: "0.4rem 0.75rem",
              fontSize: "0.8rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              background: activeTab === "hymns" ? "#eab308" : "transparent",
              color: activeTab === "hymns" ? "#000" : "#cbd5e1",
            }}
          >
            <Music size={14} /> [3] Hymns
          </button>

          <button
            onClick={() => setActiveTab("intentions")}
            style={{
              padding: "0.4rem 0.75rem",
              fontSize: "0.8rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              background: activeTab === "intentions" ? "#eab308" : "transparent",
              color: activeTab === "intentions" ? "#000" : "#cbd5e1",
            }}
          >
            <HeartHandshake size={14} /> [4] Intentions
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            style={{
              padding: "0.4rem 0.75rem",
              fontSize: "0.8rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              background: activeTab === "announcements" ? "#eab308" : "transparent",
              color: activeTab === "announcements" ? "#000" : "#cbd5e1",
            }}
          >
            <Megaphone size={14} /> [5] Notices
          </button>

          <button
            onClick={() => setActiveTab("events")}
            style={{
              padding: "0.4rem 0.75rem",
              fontSize: "0.8rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              background: activeTab === "events" ? "#eab308" : "transparent",
              color: activeTab === "events" ? "#000" : "#cbd5e1",
            }}
          >
            <Calendar size={14} /> [6] Events
          </button>
        </div>

        {/* View Controls: Theme, Font-size, Fullscreen */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Theme */}
          <button
            onClick={() =>
              setTheme((curr) => (curr === "sanctuary" ? "daylight" : curr === "daylight" ? "amber" : "sanctuary"))
            }
            title="Toggle theme"
            style={{
              background: "#1e293b",
              color: "#f8fafc",
              border: "1px solid #334155",
              borderRadius: "4px",
              padding: "0.35rem 0.6rem",
              fontSize: "0.75rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            {theme === "sanctuary" ? <Moon size={14} /> : <Sun size={14} />}
            {theme.toUpperCase()}
          </button>

          {/* Font Controls */}
          <div style={{ display: "flex", alignItems: "center", background: "#1e293b", borderRadius: "4px", border: "1px solid #334155" }}>
            <button
              onClick={() => setFontSizePx((f) => Math.max(22, f - 4))}
              title="Decrease Font Size"
              style={{
                background: "transparent",
                color: "#f8fafc",
                border: "none",
                padding: "0.35rem 0.65rem",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              A-
            </button>
            <span style={{ fontSize: "0.75rem", color: "#94a3b8", padding: "0 0.25rem" }}>{fontSizePx}px</span>
            <button
              onClick={() => setFontSizePx((f) => Math.min(60, f + 4))}
              title="Increase Font Size"
              style={{
                background: "transparent",
                color: "#f8fafc",
                border: "none",
                padding: "0.35rem 0.65rem",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              A+
            </button>
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            title="Fullscreen [F]"
            style={{
              background: "#1e293b",
              color: "#f8fafc",
              border: "1px solid #334155",
              borderRadius: "4px",
              padding: "0.35rem 0.6rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.75rem",
            }}
          >
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
            {isFullscreen ? "Exit Full" : "Full [F]"}
          </button>
        </div>
      </header>

      {/* Main Broadcast Screen */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 3.5rem",
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* ========================================================= */}
        {/* TAB 1: DAILY READINGS (The Daily Missal Nigeria / RSV-CE) */}
        {/* ========================================================= */}
        {activeTab === "readings" && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "70vh", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `2px solid ${themeStyles.border}`, paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <span style={{ textTransform: "uppercase", fontSize: "1rem", letterSpacing: "0.15em", color: themeStyles.gold, fontWeight: 700 }}>
                    {formatLongDate(todayDate)} · The Daily Missal (Paulines Africa / CBCN)
                  </span>
                  <h1 style={{ fontSize: `${Math.round(fontSizePx * 1.25)}px`, margin: "0.25rem 0 0", color: themeStyles.heading }}>
                    {readingSlides[readingSlide]?.title || "Daily Readings"}
                  </h1>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "1.3rem", fontWeight: 700, color: themeStyles.gold, fontFamily: "sans-serif" }}>
                    {readingSlides[readingSlide]?.ref}
                  </span>
                  <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                    Slide {readingSlide + 1} of {readingSlides.length} · [Space / Arrows to Flip]
                  </div>
                </div>
              </div>

              {readingSlides[readingSlide]?.subtitle && (
                <div style={{ fontSize: `${Math.round(fontSizePx * 0.85)}px`, color: themeStyles.gold, fontStyle: "italic", marginBottom: "1rem" }}>
                  {readingSlides[readingSlide].subtitle}
                </div>
              )}

              <div
                style={{
                  fontSize: `${fontSizePx}px`,
                  lineHeight: 1.55,
                  whiteSpace: "pre-line",
                  textAlign: "justify",
                  textJustify: "inter-word",
                  fontFamily: "'Merriweather', 'Georgia', serif",
                }}
              >
                {readingSlides[readingSlide]?.title.includes("Psalm") ? (
                  <div>
                    {readingSlides[readingSlide].content.split("\n\n").map((stanza, idx) => {
                      const isResp = stanza.trim().startsWith("R.");
                      return (
                        <p
                          key={idx}
                          style={{
                            margin: "1rem 0",
                            color: isResp ? themeStyles.gold : themeStyles.text,
                            fontWeight: isResp ? 800 : 400,
                            paddingLeft: isResp ? "1rem" : "0",
                            borderLeft: isResp ? `4px solid ${themeStyles.gold}` : "none",
                            background: isResp ? (theme === "sanctuary" ? "rgba(234, 179, 8, 0.1)" : "rgba(234, 179, 8, 0.15)") : "transparent",
                            padding: isResp ? "0.6rem 1rem" : "0",
                            borderRadius: "4px",
                          }}
                        >
                          {stanza}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  readingSlides[readingSlide]?.content
                )}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${themeStyles.border}` }}>
              <button
                onClick={handlePrev}
                disabled={readingSlide === 0}
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  background: readingSlide === 0 ? "transparent" : themeStyles.cardBg,
                  color: readingSlide === 0 ? "#64748b" : themeStyles.text,
                  border: `1px solid ${themeStyles.border}`,
                  cursor: readingSlide === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <ChevronLeft size={20} /> Previous Slide
              </button>

              <div style={{ display: "flex", gap: "0.4rem" }}>
                {readingSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setReadingSlide(idx)}
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      background: idx === readingSlide ? themeStyles.gold : "#475569",
                    }}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={readingSlide === readingSlides.length - 1}
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  background: readingSlide === readingSlides.length - 1 ? "transparent" : themeStyles.gold,
                  color: readingSlide === readingSlides.length - 1 ? "#64748b" : "#000",
                  fontWeight: 700,
                  border: "none",
                  cursor: readingSlide === readingSlides.length - 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                Next Reading <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ORDER OF MASS (English, Latin, Igbo)              */}
        {/* ========================================================= */}
        {activeTab === "order" && currentOrderPart && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "70vh", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `2px solid ${themeStyles.border}`, paddingBottom: "1rem", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <span style={{ textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.15em", color: themeStyles.gold, fontWeight: 700 }}>
                    {currentOrderPart.category.toUpperCase().replace("-", " ")} · PART {orderPartIdx + 1} OF {ORDER_OF_MASS.length}
                  </span>
                  <h1 style={{ fontSize: `${Math.round(fontSizePx * 1.15)}px`, margin: "0.2rem 0 0", color: themeStyles.heading }}>
                    {currentOrderPart.titleEn}
                  </h1>
                  <div style={{ fontSize: `${Math.round(fontSizePx * 0.7)}px`, color: "#94a3b8", fontStyle: "italic" }}>
                    {currentOrderPart.titleIg} · {currentOrderPart.titleLa}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.3rem", background: "#1e293b", padding: "0.25rem", borderRadius: "6px" }}>
                  {(["en_ig", "en_la", "all", "en", "ig", "la"] as LangChoice[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setLangChoice(mode)}
                      style={{
                        padding: "0.3rem 0.6rem",
                        fontSize: "0.75rem",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 600,
                        background: langChoice === mode ? themeStyles.gold : "transparent",
                        color: langChoice === mode ? "#000" : "#cbd5e1",
                      }}
                    >
                      {mode === "en_ig"
                        ? "English + Igbo"
                        : mode === "en_la"
                        ? "English + Latin"
                        : mode === "all"
                        ? "Trilingual"
                        : mode.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {currentOrderPart.rubric && (
                <div style={{ fontSize: `${Math.round(fontSizePx * 0.55)}px`, fontStyle: "italic", color: "#f87171", marginBottom: "1rem" }}>
                  ❖ {currentOrderPart.rubric}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {currentOrderPart.dialogues.map((dlg, idx) => {
                  const isPriest = dlg.speaker === "Priest";
                  const speakerColor = isPriest ? themeStyles.dialoguePriest : themeStyles.dialoguePeople;

                  return (
                    <div
                      key={idx}
                      style={{
                        padding: "0.85rem 1.25rem",
                        background: isPriest ? "transparent" : themeStyles.cardBg,
                        borderLeft: `5px solid ${speakerColor}`,
                        borderRadius: "4px",
                      }}
                    >
                      <div style={{ fontSize: `${Math.round(fontSizePx * 0.6)}px`, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: speakerColor, marginBottom: "0.35rem" }}>
                        {dlg.speaker}:
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            langChoice === "all"
                              ? "1fr 1fr 1fr"
                              : ["en_ig", "en_la"].includes(langChoice)
                              ? "1fr 1fr"
                              : "1fr",
                          gap: "1.5rem",
                        }}
                      >
                        {(langChoice === "all" || langChoice.includes("en")) && (
                          <div>
                            {langChoice !== "en" && (
                              <div style={{ fontSize: "0.75rem", color: themeStyles.gold, fontWeight: 700, marginBottom: "0.2rem" }}>
                                ENGLISH
                              </div>
                            )}
                            <div style={{ fontSize: `${fontSizePx}px`, lineHeight: 1.45, whiteSpace: "pre-line" }}>
                              {dlg.english}
                            </div>
                          </div>
                        )}

                        {(langChoice === "all" || langChoice.includes("ig")) && (
                          <div style={{ borderLeft: langChoice === "all" || langChoice === "en_ig" ? `1px solid ${themeStyles.border}` : "none", paddingLeft: "1rem" }}>
                            {langChoice !== "ig" && (
                              <div style={{ fontSize: "0.75rem", color: themeStyles.gold, fontWeight: 700, marginBottom: "0.2rem" }}>
                                IGBO (ASỤSỤ IGBO)
                              </div>
                            )}
                            <div style={{ fontSize: `${fontSizePx}px`, lineHeight: 1.45, whiteSpace: "pre-line", color: "#38bdf8" }}>
                              {dlg.igbo}
                            </div>
                          </div>
                        )}

                        {(langChoice === "all" || langChoice.includes("la")) && (
                          <div style={{ borderLeft: `1px solid ${themeStyles.border}`, paddingLeft: "1rem" }}>
                            {langChoice !== "la" && (
                              <div style={{ fontSize: "0.75rem", color: themeStyles.gold, fontWeight: 700, marginBottom: "0.2rem" }}>
                                LATIN (LATINA)
                              </div>
                            )}
                            <div style={{ fontSize: `${fontSizePx}px`, lineHeight: 1.45, fontStyle: "italic", whiteSpace: "pre-line", color: "#e2e8f0" }}>
                              {dlg.latin}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${themeStyles.border}` }}>
              <button
                onClick={handlePrev}
                disabled={orderPartIdx === 0}
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  background: orderPartIdx === 0 ? "transparent" : themeStyles.cardBg,
                  color: orderPartIdx === 0 ? "#64748b" : themeStyles.text,
                  border: `1px solid ${themeStyles.border}`,
                  cursor: orderPartIdx === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <ChevronLeft size={20} /> Previous Prayer
              </button>

              <span style={{ fontSize: "0.95rem", color: "#94a3b8" }}>
                Use [Space / Left-Right Arrows] to navigate
              </span>

              <button
                onClick={handleNext}
                disabled={orderPartIdx === ORDER_OF_MASS.length - 1}
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  background: orderPartIdx === ORDER_OF_MASS.length - 1 ? "transparent" : themeStyles.gold,
                  color: orderPartIdx === ORDER_OF_MASS.length - 1 ? "#64748b" : "#000",
                  fontWeight: 700,
                  border: "none",
                  cursor: orderPartIdx === ORDER_OF_MASS.length - 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                Next Prayer <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: HYMNS & CHOIR LYRICS                              */}
        {/* ========================================================= */}
        {activeTab === "hymns" && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "70vh", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `2px solid ${themeStyles.border}`, paddingBottom: "1rem", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <span style={{ textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "0.15em", color: themeStyles.gold, fontWeight: 700 }}>
                    {activeHymn?.categoryLabel.toUpperCase()} · {activeHymn?.language}
                  </span>
                  <h1 style={{ fontSize: `${Math.round(fontSizePx * 1.2)}px`, margin: "0.2rem 0 0", color: themeStyles.heading }}>
                    {activeHymn?.title}
                  </h1>
                  {activeHymn?.tune && (
                    <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                      Tune: {activeHymn.tune}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <label htmlFor="hymn-select" style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                    Select Hymn:
                  </label>
                  <select
                    id="hymn-select"
                    value={selectedHymnId}
                    onChange={(e) => {
                      setSelectedHymnId(e.target.value);
                      setHymnVerseIdx(0);
                    }}
                    style={{
                      background: "#1e293b",
                      color: "#f8fafc",
                      border: "1px solid #334155",
                      borderRadius: "6px",
                      padding: "0.45rem 0.75rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {CATHOLIC_HYMNS.map((h) => (
                      <option key={h.id} value={h.id}>
                        [{h.categoryLabel.replace(" Hymn", "")}] {h.title} ({h.language})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {activeHymn?.refrain && (
                <div
                  style={{
                    background: theme === "sanctuary" ? "rgba(234, 179, 8, 0.12)" : "rgba(234, 179, 8, 0.2)",
                    border: `2px solid ${themeStyles.gold}`,
                    borderRadius: "8px",
                    padding: "1.25rem 2rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: themeStyles.gold, marginBottom: "0.4rem" }}>
                    Chorus / Refrain (All Sing):
                  </div>
                  <div style={{ fontSize: `${Math.round(fontSizePx * 0.95)}px`, lineHeight: 1.5, fontWeight: 700, whiteSpace: "pre-line", color: themeStyles.heading }}>
                    {activeHymn.refrain}
                  </div>
                </div>
              )}

              <div
                style={{
                  background: themeStyles.cardBg,
                  border: `1px solid ${themeStyles.border}`,
                  borderRadius: "8px",
                  padding: "2rem",
                  minHeight: "220px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "0.95rem", color: themeStyles.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
                  Verse {hymnVerseIdx + 1} of {activeHymn?.verses.length}:
                </div>
                <div
                  style={{
                    fontSize: `${fontSizePx}px`,
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                    fontFamily: "'Merriweather', 'Georgia', serif",
                  }}
                >
                  {activeHymn?.verses[hymnVerseIdx]}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${themeStyles.border}` }}>
              <button
                onClick={handlePrev}
                disabled={hymnVerseIdx === 0}
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  background: hymnVerseIdx === 0 ? "transparent" : themeStyles.cardBg,
                  color: hymnVerseIdx === 0 ? "#64748b" : themeStyles.text,
                  border: `1px solid ${themeStyles.border}`,
                  cursor: hymnVerseIdx === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <ChevronLeft size={20} /> Previous Verse
              </button>

              <div style={{ display: "flex", gap: "0.4rem" }}>
                {activeHymn?.verses.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHymnVerseIdx(idx)}
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      background: idx === hymnVerseIdx ? themeStyles.gold : "#475569",
                    }}
                    title={`Verse ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!activeHymn || hymnVerseIdx === activeHymn.verses.length - 1}
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  background: !activeHymn || hymnVerseIdx === activeHymn.verses.length - 1 ? "transparent" : themeStyles.gold,
                  color: !activeHymn || hymnVerseIdx === activeHymn.verses.length - 1 ? "#64748b" : "#000",
                  fontWeight: 700,
                  border: "none",
                  cursor: !activeHymn || hymnVerseIdx === activeHymn.verses.length - 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                Next Verse <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: TODAY'S MASS INTENTIONS                           */}
        {/* ========================================================= */}
        {activeTab === "intentions" && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "70vh", justifyContent: "space-between" }}>
            <div>
              <div style={{ borderBottom: `2px solid ${themeStyles.border}`, paddingBottom: "1rem", marginBottom: "2rem" }}>
                <span style={{ textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.15em", color: themeStyles.gold, fontWeight: 700 }}>
                  HOLY SACRIFICE OF THE MASS · INTENTIONS
                </span>
                <h1 style={{ fontSize: `${Math.round(fontSizePx * 1.25)}px`, margin: "0.2rem 0 0", color: themeStyles.heading }}>
                  Mass Intentions for {formatLongDate(todayDate)}
                </h1>
                <div style={{ fontSize: "1rem", color: "#94a3b8" }}>
                  Booked for Morning Mass (06:20 AM) and Afternoon Mass (03:15 PM)
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div
                  style={{
                    background: themeStyles.cardBg,
                    border: `1px solid ${themeStyles.border}`,
                    borderRadius: "8px",
                    padding: "1.5rem",
                  }}
                >
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: themeStyles.gold, borderBottom: `1px solid ${themeStyles.border}`, paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                    ☀️ Morning Mass — 06:20 AM
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <li style={{ fontSize: `${Math.round(fontSizePx * 0.75)}px`, lineHeight: 1.4 }}>
                      <strong style={{ color: themeStyles.heading }}>Thanksgiving:</strong> Obasi family for God's continuous preservation, good health, and divine protection.
                    </li>
                    <li style={{ fontSize: `${Math.round(fontSizePx * 0.75)}px`, lineHeight: 1.4 }}>
                      <strong style={{ color: themeStyles.heading }}>Healing &amp; Recovery:</strong> For all hospitalized patients in AE-FUTHA teaching hospital.
                    </li>
                    <li style={{ fontSize: `${Math.round(fontSizePx * 0.75)}px`, lineHeight: 1.4 }}>
                      <strong style={{ color: themeStyles.heading }}>Repose of Souls:</strong> For the faithful departed of Our Mother of Perpetual Help Chaplaincy.
                    </li>
                  </ul>
                </div>

                <div
                  style={{
                    background: themeStyles.cardBg,
                    border: `1px solid ${themeStyles.border}`,
                    borderRadius: "8px",
                    padding: "1.5rem",
                  }}
                >
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: themeStyles.gold, borderBottom: `1px solid ${themeStyles.border}`, paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                    🕊️ Afternoon Mass — 03:15 PM
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <li style={{ fontSize: `${Math.round(fontSizePx * 0.75)}px`, lineHeight: 1.4 }}>
                      <strong style={{ color: themeStyles.heading }}>Divine Intervention:</strong> Special prayer for peace in families, safety on journeys, and university students.
                    </li>
                    <li style={{ fontSize: `${Math.round(fontSizePx * 0.75)}px`, lineHeight: 1.4 }}>
                      <strong style={{ color: themeStyles.heading }}>Birthday Thanksgiving:</strong> Gratitude to God for another year of life and grace.
                    </li>
                    <li style={{ fontSize: `${Math.round(fontSizePx * 0.75)}px`, lineHeight: 1.4 }}>
                      <strong style={{ color: themeStyles.heading }}>Priestly &amp; Religious Vocations:</strong> For young men and women discerning God's call in the diocese.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${themeStyles.border}`, fontSize: "0.9rem", color: "#94a3b8" }}>
              Mass intentions can be booked via the chaplaincy portal or with the Catechist (08063314891).
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: PARISH ANNOUNCEMENTS (Catechist Bulk Output)     */}
        {/* ========================================================= */}
        {activeTab === "announcements" && currentAnnouncement && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "70vh", justifyContent: "space-between" }}>
            <div>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `2px solid ${themeStyles.border}`, paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <span style={{ textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.15em", color: themeStyles.gold, fontWeight: 700, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Megaphone size={16} /> CHAPLAINCY NOTICES · {currentAnnouncement.issuedBy || "Chaplaincy Council"}
                  </span>
                  <h1 style={{ fontSize: `${Math.round(fontSizePx * 1.25)}px`, margin: "0.25rem 0 0", color: themeStyles.heading }}>
                    {currentAnnouncement.title}
                  </h1>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "1.1rem", fontWeight: 700, color: themeStyles.gold }}>
                    Notice {announcementIdx + 1} of {announcements.length}
                  </span>
                  <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                    [Space / Clicker to advance]
                  </div>
                </div>
              </div>

              {/* Body Card */}
              <div
                style={{
                  background: themeStyles.cardBg,
                  border: `2px solid ${currentAnnouncement.isUrgent ? "#dc2626" : themeStyles.border}`,
                  borderRadius: "12px",
                  padding: "2.5rem",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                }}
              >
                {currentAnnouncement.isUrgent && (
                  <div style={{ display: "inline-block", background: "#dc2626", color: "#fff", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0.25rem 0.75rem", borderRadius: "4px", marginBottom: "1.25rem" }}>
                    ⚠️ URGENT PARISH NOTICE
                  </div>
                )}

                <div
                  style={{
                    fontSize: `${fontSizePx}px`,
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                    fontFamily: "'Merriweather', 'Georgia', serif",
                    textAlign: "justify",
                  }}
                >
                  {currentAnnouncement.body}
                </div>
              </div>
            </div>

            {/* Stepper Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${themeStyles.border}` }}>
              <button
                onClick={handlePrev}
                disabled={announcementIdx === 0}
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  background: announcementIdx === 0 ? "transparent" : themeStyles.cardBg,
                  color: announcementIdx === 0 ? "#64748b" : themeStyles.text,
                  border: `1px solid ${themeStyles.border}`,
                  cursor: announcementIdx === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <ChevronLeft size={20} /> Previous Notice
              </button>

              <div style={{ display: "flex", gap: "0.45rem" }}>
                {announcements.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAnnouncementIdx(idx)}
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      background: idx === announcementIdx ? themeStyles.gold : "#475569",
                    }}
                    title={`Notice ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={announcementIdx === announcements.length - 1}
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  background: announcementIdx === announcements.length - 1 ? "transparent" : themeStyles.gold,
                  color: announcementIdx === announcements.length - 1 ? "#64748b" : "#000",
                  fontWeight: 700,
                  border: "none",
                  cursor: announcementIdx === announcements.length - 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                Next Notice <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: UPCOMING EVENTS PROJECTION                        */}
        {/* ========================================================= */}
        {activeTab === "events" && currentEvent && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "70vh", justifyContent: "space-between" }}>
            <div>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `2px solid ${themeStyles.border}`, paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <span style={{ textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.15em", color: themeStyles.gold, fontWeight: 700, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Calendar size={16} /> CHAPLAINCY CALENDAR · {currentEvent.category || "Event"}
                  </span>
                  <h1 style={{ fontSize: `${Math.round(fontSizePx * 1.25)}px`, margin: "0.25rem 0 0", color: themeStyles.heading }}>
                    {currentEvent.title}
                  </h1>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "1.1rem", fontWeight: 700, color: themeStyles.gold }}>
                    Event {eventIdx + 1} of {events.length}
                  </span>
                  <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                    [Space / Clicker to advance]
                  </div>
                </div>
              </div>

              {/* Event Metadata Highlights */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1.75rem",
                }}
              >
                <div style={{ background: themeStyles.cardBg, border: `1px solid ${themeStyles.border}`, borderRadius: "8px", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Clock size={24} color={themeStyles.gold} />
                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>Date &amp; Time</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: themeStyles.heading }}>
                      {new Date(currentEvent.startsAt).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" })}
                    </div>
                  </div>
                </div>

                {currentEvent.venue && (
                  <div style={{ background: themeStyles.cardBg, border: `1px solid ${themeStyles.border}`, borderRadius: "8px", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <MapPin size={24} color={themeStyles.gold} />
                    <div>
                      <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>Venue</div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: themeStyles.heading }}>
                        {currentEvent.venue}
                      </div>
                    </div>
                  </div>
                )}

                {currentEvent.organizer && (
                  <div style={{ background: themeStyles.cardBg, border: `1px solid ${themeStyles.border}`, borderRadius: "8px", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <Users size={24} color={themeStyles.gold} />
                    <div>
                      <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>Organizer</div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: themeStyles.heading }}>
                        {currentEvent.organizer}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Event Description Card */}
              {currentEvent.description && (
                <div
                  style={{
                    background: themeStyles.cardBg,
                    border: `1px solid ${themeStyles.border}`,
                    borderRadius: "12px",
                    padding: "2rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: `${fontSizePx}px`,
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                      fontFamily: "'Merriweather', 'Georgia', serif",
                    }}
                  >
                    {currentEvent.description}
                  </div>
                </div>
              )}
            </div>

            {/* Stepper Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${themeStyles.border}` }}>
              <button
                onClick={handlePrev}
                disabled={eventIdx === 0}
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  background: eventIdx === 0 ? "transparent" : themeStyles.cardBg,
                  color: eventIdx === 0 ? "#64748b" : themeStyles.text,
                  border: `1px solid ${themeStyles.border}`,
                  cursor: eventIdx === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <ChevronLeft size={20} /> Previous Event
              </button>

              <div style={{ display: "flex", gap: "0.45rem" }}>
                {events.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setEventIdx(idx)}
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      background: idx === eventIdx ? themeStyles.gold : "#475569",
                    }}
                    title={`Event ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={eventIdx === events.length - 1}
                style={{
                  padding: "0.6rem 1.4rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  background: eventIdx === events.length - 1 ? "transparent" : themeStyles.gold,
                  color: eventIdx === events.length - 1 ? "#64748b" : "#000",
                  fontWeight: 700,
                  border: "none",
                  cursor: eventIdx === events.length - 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                Next Event <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Projection Helper Footer */}
      <footer
        style={{
          borderTop: `1px solid ${themeStyles.border}`,
          padding: "0.5rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.75rem",
          color: "#64748b",
          background: "rgba(10, 15, 25, 0.95)",
        }}
      >
        <div>
          Keyboard Clicker: <kbd style={{ background: "#334155", color: "#fff", padding: "0.1rem 0.35rem", borderRadius: "3px" }}>Space</kbd> / <kbd style={{ background: "#334155", color: "#fff", padding: "0.1rem 0.35rem", borderRadius: "3px" }}>→</kbd> Next · <kbd style={{ background: "#334155", color: "#fff", padding: "0.1rem 0.35rem", borderRadius: "3px" }}>←</kbd> Prev · <kbd style={{ background: "#334155", color: "#fff", padding: "0.1rem 0.35rem", borderRadius: "3px" }}>1-6</kbd> Mode · <kbd style={{ background: "#334155", color: "#fff", padding: "0.1rem 0.35rem", borderRadius: "3px" }}>F</kbd> Fullscreen
        </div>
        <div>
          Our Mother of Perpetual Help Catholic Chaplaincy, AE-FUTHA
        </div>
      </footer>
    </div>
  );
}
