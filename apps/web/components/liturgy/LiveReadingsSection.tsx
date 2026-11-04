"use client";

import { useEffect, useState } from "react";
import type { DailyReadings } from "@/lib/types";
import type { ReadingsLink } from "@/lib/liturgy/readings";
import { BookOpen, RefreshCw } from "lucide-react";

function cleanHtmlClient(html: string): string {
  if (!html) return "";
  return html
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&rsquo;/gi, "’")
    .replace(/&lsquo;/gi, "‘")
    .replace(/&rdquo;/gi, "”")
    .replace(/&ldquo;/gi, "“")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/&hellip;/gi, "…")
    .replace(/&amp;/gi, "&")
    .replace(/&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|li|tr|h[1-6])>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function ReadingBlock({ title, part }: { title: string; part?: { ref: string; text?: string } | null }) {
  if (!part) return null;
  return (
    <article
      className="reading"
      style={{
        marginBottom: "2rem",
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "8px",
        border: "1px solid var(--line)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: "0.5rem",
          borderBottom: "1px solid var(--line)",
          paddingBottom: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--navy)" }}>{title}</h3>
        <span className="reading-ref" style={{ fontWeight: 700, color: "var(--gold-text)", fontSize: "0.95rem" }}>
          {part.ref}
        </span>
      </div>
      {part.text ? (
        part.text.split(/\n{2,}/).map((p, i) => (
          <p key={i} style={{ fontSize: "1.02rem", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 1rem", whiteSpace: "pre-line" }}>
            {p}
          </p>
        ))
      ) : (
        <p className="muted">Scripture text available via the official lectionary link below.</p>
      )}
    </article>
  );
}

export function LiveReadingsSection({
  date,
  initialKind,
  initialReadings,
  links,
}: {
  date: string;
  initialKind: "staff" | "live" | "curated" | "link";
  initialReadings: DailyReadings | null;
  links: ReadingsLink[];
}) {
  const [kind, setKind] = useState(initialKind);
  const [readings, setReadings] = useState<DailyReadings | null>(initialReadings);
  const [loadingLive, setLoadingLive] = useState(initialKind !== "staff" && initialKind !== "live");

  useEffect(() => {
    setKind(initialKind);
    setReadings(initialReadings);

    // If server already resolved staff or live readings for this exact date, no client fetch needed
    if ((initialKind === "staff" || initialKind === "live") && initialReadings?.date === date) {
      setLoadingLive(false);
      return;
    }

    let active = true;
    setLoadingLive(true);

    const yyyymmdd = date.replace(/-/g, "");
    const callbackName = `__universalis_cb_${yyyymmdd}_${Math.random().toString(36).slice(2, 7)}`;

    const extractPart = (p: any) => {
      if (!p || (!p.text && !p.source)) return undefined;
      const ref = cleanHtmlClient(String(p.source ?? p.heading ?? "")).replace(/\n+/g, " ").trim();
      const text = cleanHtmlClient(String(p.text ?? ""));
      if (!text) return undefined;
      return { ref: ref || "Lectionary Reading", text };
    };

    (window as any)[callbackName] = (data: any) => {
      if (!active || !data) return;
      const firstReading = extractPart(data.Mass_R1);
      const psalm = extractPart(data.Mass_Ps);
      const secondReading = extractPart(data.Mass_R2);
      const gospel = extractPart(data.Mass_G);

      if (gospel || firstReading) {
        setReadings({
          date,
          firstReading,
          psalm,
          secondReading,
          gospel,
          translation: "Catholic Lectionary for Mass (Nigeria / Jerusalem Bible & Grail Psalter)",
          sourceNote: "Live Daily Mass Readings via Universalis Liturgical Calendar (Africa/Nigeria).",
        });
        setKind("live");
      }
      setLoadingLive(false);
    };

    const script = document.createElement("script");
    script.src = `https://universalis.com/Africa.Nigeria/${yyyymmdd}/jsonpmass.js?callback=${callbackName}`;
    script.async = true;
    script.onerror = () => {
      if (active) setLoadingLive(false);
    };
    document.body.appendChild(script);

    const timeout = setTimeout(() => {
      if (active) setLoadingLive(false);
    }, 6000);

    return () => {
      active = false;
      clearTimeout(timeout);
      delete (window as any)[callbackName];
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [date, initialKind, initialReadings]);

  return (
    <section aria-labelledby="readings" style={{ marginTop: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "1.25rem",
          borderBottom: "2px solid var(--gold)",
          paddingBottom: "0.5rem",
        }}
      >
        <h2 id="readings" style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--navy)" }}>
          <BookOpen size={22} style={{ color: "var(--marian)" }} />
          Daily Mass Readings
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {loadingLive && (
            <span
              style={{
                fontSize: "0.75rem",
                background: "var(--ivory)",
                border: "1px solid var(--line)",
                padding: "0.2rem 0.55rem",
                borderRadius: "4px",
                color: "var(--muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <RefreshCw size={12} /> Syncing daily lectionary…
            </span>
          )}
          {kind === "live" && (
            <span
              style={{
                fontSize: "0.75rem",
                background: "#dcfce7",
                border: "1px solid #86efac",
                padding: "0.2rem 0.55rem",
                borderRadius: "4px",
                color: "#166534",
                fontWeight: 700,
              }}
            >
              ✓ Live Daily Lectionary ({date})
            </span>
          )}
        </div>
      </div>

      {readings && (readings.gospel || readings.firstReading) ? (
        <>
          <ReadingBlock title="First Reading" part={readings.firstReading} />
          <ReadingBlock title="Responsorial Psalm" part={readings.psalm} />
          <ReadingBlock title="Second Reading" part={readings.secondReading} />
          <ReadingBlock title="Holy Gospel" part={readings.gospel} />

          <div
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: "6px",
              padding: "0.85rem 1rem",
              marginTop: "1rem",
            }}
          >
            <p className="muted small" style={{ margin: 0 }}>
              {readings.translation ? `${readings.translation}. ` : ""}
              {readings.sourceNote}
            </p>
            {links && links.length > 0 && (
              <p className="muted small" style={{ marginTop: "0.4rem", marginBottom: 0 }}>
                Official Lectionary Portal:{" "}
                <a href={links[0].href} target="_blank" rel="noopener noreferrer">
                  {links[0].label}
                </a>
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <p>The readings for this day can be read directly via the official portal below:</p>
          <ul className="entries">
            {links.map((l) => (
              <li key={l.href}>
                <div>
                  <h3>
                    <a href={l.href} rel="noopener noreferrer">
                      {l.label}
                    </a>
                  </h3>
                  <p className="muted">{l.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
