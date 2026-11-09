"use client";

import { useState } from "react";
import type { VaticanNewsItem } from "@/lib/vatican/feed";
import { Globe, PlayCircle, ExternalLink, Newspaper, Tv } from "lucide-react";

export function VaticanNewsWidget({ items = [] }: { items?: VaticanNewsItem[] }) {
  const [mode, setMode] = useState<"horizontal" | "vertical" | "livestream">("horizontal");

  const widgetSrc =
    mode === "vertical"
      ? "https://www.vaticannews.va/widget/embed.html?lng=en&layout=vertical"
      : "https://www.vaticannews.va/widget/embed.html?lng=en&layout=horizontal";

  return (
    <div
      style={{
        background: "#ffffff",
        border: "2px solid var(--gold)",
        borderRadius: "10px",
        padding: "clamp(1.25rem, 3.5vw, 2rem)",
        boxShadow: "0 8px 28px rgba(0, 0, 0, 0.08)",
        color: "var(--ink)",
      }}
    >
      {/* Top Header & Papal Invitation Notice */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          borderBottom: "2px solid var(--gold)",
          paddingBottom: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "46rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.76rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold-text)",
              marginBottom: "0.3rem",
            }}
          >
            <Globe size={15} /> Dicastery for Communication · Holy See
          </span>
          <h3 style={{ margin: "0 0 0.35rem", fontSize: "clamp(1.35rem, 2.5vw, 1.7rem)", color: "var(--navy)" }}>
            Vatican News Video &amp; Papal Updates Widget
          </h3>
          <p className="muted" style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.55 }}>
            Embedded in response to <strong>Pope Leo XIV&rsquo;s</strong> invitation to dioceses and parishes worldwide—bringing
            real-time papal videos, Angelus addresses, and authentic primary-source updates directly from Rome.
          </p>
        </div>

        {/* Mode Switcher */}
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setMode("horizontal")}
            className={`btn small ${mode === "horizontal" ? "" : "secondary"}`}
            style={{ fontSize: "0.78rem", padding: "0.35rem 0.7rem" }}
          >
            <PlayCircle size={14} style={{ marginRight: "0.25rem", verticalAlign: " text-bottom" }} />
            Horizontal Widget
          </button>
          <button
            type="button"
            onClick={() => setMode("vertical")}
            className={`btn small ${mode === "vertical" ? "" : "secondary"}`}
            style={{ fontSize: "0.78rem", padding: "0.35rem 0.7rem" }}
          >
            <PlayCircle size={14} style={{ marginRight: "0.25rem", verticalAlign: "text-bottom" }} />
            Vertical Widget
          </button>
          <button
            type="button"
            onClick={() => setMode("livestream")}
            className={`btn small ${mode === "livestream" ? "" : "secondary"}`}
            style={{ fontSize: "0.78rem", padding: "0.35rem 0.7rem" }}
          >
            <Tv size={14} style={{ marginRight: "0.25rem", verticalAlign: "text-bottom" }} />
            Vatican Media Channel
          </button>
        </div>
      </div>

      {/* Embedded Official Vatican News Widget Iframe */}
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          padding: "0.75rem",
          marginBottom: "1.75rem",
        }}
      >
        {mode === "livestream" ? (
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", maxHeight: "460px", borderRadius: "6px", overflow: "hidden", background: "#0f172a" }}>
            <iframe
              title="Vatican News Official English Video Stream"
              src="https://www.youtube.com/embed/live_stream?channel=UCxIsefyl9g9A5SGJq4c1gPA&autoplay=0"
              width="100%"
              height="100%"
              style={{ border: "none", width: "100%", height: "100%" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <div
            style={{
              maxWidth: mode === "vertical" ? "420px" : "100%",
              margin: "0 auto",
            }}
          >
            <iframe
              key={mode}
              title="Official Vatican News Video Widget"
              src={widgetSrc}
              width="100%"
              height={mode === "vertical" ? "560" : "430"}
              style={{
                border: "1px solid var(--line)",
                borderRadius: "6px",
                background: "#ffffff",
                display: "block",
                width: "100%",
              }}
              scrolling="auto"
              frameBorder={0}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginTop: "0.65rem",
            padding: "0 0.25rem",
            fontSize: "0.8rem",
            color: "var(--muted)",
          }}
        >
          <span>
            Official Vatican News Embed (<code>vaticannews.va/widget/embed.html</code>)
          </span>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="https://www.vaticannews.va/en/epg.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontWeight: 600, color: "var(--marian)" }}
            >
              Watch Vatican Media Live <ExternalLink size={12} />
            </a>
            <a
              href="https://www.vaticannews.va/widget/embed.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontWeight: 600, color: "var(--gold-text)" }}
            >
              Open Full Widget Portal <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Live Auto-Synced Vatican News & Video Dispatches */}
      {items.length > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <h4 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy)", display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <Newspaper size={18} color="var(--marian)" />
              Latest Dispatches from Pope Leo XIV &amp; the Holy See
            </h4>
            <span
              style={{
                fontSize: "0.72rem",
                background: "#dcfce7",
                border: "1px solid #86efac",
                color: "#166534",
                padding: "0.15rem 0.5rem",
                borderRadius: "4px",
                fontWeight: 700,
              }}
            >
              ● Auto-Updating Feed
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {items.slice(0, 3).map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "var(--ivory)",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid var(--marian)",
                  borderRadius: "6px",
                  padding: "1rem",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.15s ease",
                }}
              >
                <div>
                  {item.imageUrl && (
                    <div
                      style={{
                        width: "100%",
                        height: "140px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        marginBottom: "0.75rem",
                        background: "#e2e8f0",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <h5 style={{ margin: "0 0 0.4rem", fontSize: "0.98rem", color: "var(--navy)", lineHeight: 1.4 }}>
                    {item.title}
                  </h5>
                  {item.description && (
                    <p className="muted" style={{ margin: "0 0 0.75rem", fontSize: "0.84rem", lineHeight: 1.45 }}>
                      {item.description}
                    </p>
                  )}
                </div>

                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--marian)", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  Watch / Read on Vatican News <ExternalLink size={12} />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Primary Holy See Sources Footer Bar */}
      <div
        style={{
          marginTop: "1.5rem",
          paddingTop: "1rem",
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          fontSize: "0.82rem",
        }}
      >
        <span style={{ color: "var(--muted)", fontWeight: 600 }}>Official Primary Sources:</span>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="https://www.vatican.va/content/vatican/en.html" target="_blank" rel="noopener noreferrer" className="text-link">
            Vatican.va (Papal Texts)
          </a>
          <a href="https://www.vaticannews.va/en.html" target="_blank" rel="noopener noreferrer" className="text-link">
            Vatican News
          </a>
          <a href="https://www.osservatoreromano.va/en.html" target="_blank" rel="noopener noreferrer" className="text-link">
            L&rsquo;Osservatore Romano
          </a>
          <a href="https://www.vaticannews.va/en/podcast.html" target="_blank" rel="noopener noreferrer" className="text-link">
            Vatican Radio
          </a>
        </div>
      </div>
    </div>
  );
}
