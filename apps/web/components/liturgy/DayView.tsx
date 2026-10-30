import Link from "next/link";
import { getDataClient } from "@/lib/data";
import { getLiturgicalDay, COLOUR_LABEL, RANK_LABEL } from "@/lib/liturgy/calendar";
import { applyOverrides } from "@/lib/liturgy/overrides";
import { resolveReadings } from "@/lib/liturgy/readings";
import { getCuratedSaintProfile } from "@/lib/liturgy/saints-data";
import { addDays, formatLongDate } from "@/lib/time/lagos";
import { ReadingsWidget } from "@/components/liturgy/ReadingsWidget";
import { PageHead } from "@/components/ui/PageHead";
import type { DailyReadings } from "@/lib/types";
import { BookOpen, Sparkles, Calendar } from "lucide-react";

const COLOUR_SWATCH: Record<string, string> = {
  WHITE: "#fff",
  RED: "#9b1c2c",
  GREEN: "#2f6b3a",
  PURPLE: "#5b2a7a",
  ROSE: "#d98aa0",
  GOLD: "#c9a24a",
  BLACK: "#111"
};

function Reading({ title, part }: { title: string; part?: { ref: string; text?: string } }) {
  if (!part) return null;
  return (
    <article className="reading" style={{ marginBottom: "2rem", background: "#fff", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--line)", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
        <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--navy)" }}>{title}</h3>
        <span className="reading-ref" style={{ fontWeight: 700, color: "var(--gold-text)", fontSize: "0.95rem" }}>{part.ref}</span>
      </div>
      {part.text ? (
        part.text.split(/\n{2,}/).map((p, i) => (
          <p key={i} style={{ fontSize: "1.02rem", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 1rem" }}>
            {p}
          </p>
        ))
      ) : (
        <p className="muted">Scripture text available via the lectionary link below.</p>
      )}
    </article>
  );
}

export async function DayView({ date, isToday }: { date: string; isToday: boolean }) {
  const client = getDataClient();
  const base = await getLiturgicalDay(date);
  const overrides = await client.getLiturgicalOverrides().catch(() => []);
  const day = base ? applyOverrides(base, overrides) : null;
  if (!day) return <p className="wrap muted">The liturgical calendar is not available for this date.</p>;

  const [staffReadings, profiles] = await Promise.all([
    client.getDailyReadings(date).catch(() => null as DailyReadings | null),
    client.getSaintProfiles(day.celebrations.map((c) => c.id)).catch(() => []),
  ]);
  const result = await resolveReadings(date, staffReadings, { allowCuratedFallback: true });
  const profileById = new Map(profiles.map((p) => [p.celebrationId, p]));
  const principal = day.celebrations[0];
  const saintCelebration = day.celebrations.find(
    (c) =>
      c.name.includes("Saint") ||
      c.name.includes("St.") ||
      c.name.includes("Blessed") ||
      c.name.includes("Our Lady") ||
      c.rank === "MEMORIAL" ||
      c.rank === "OPTIONAL_MEMORIAL" ||
      c.rank === "FEAST" ||
      c.rank === "SOLEMNITY"
  ) ?? (day.celebrations.length > 1 ? day.celebrations[1] : (principal.rank !== "WEEKDAY" ? principal : null));

  return (
    <>
      <PageHead
        title={isToday ? "Today in the Church" : formatLongDate(date)}
        latin="Haec dies quam fecit Dominus"
        lede={isToday ? `${formatLongDate(date)} · Daily Mass Readings and Liturgical Day` : "The liturgical day and the Mass readings."}
      />
      <section className="section">
        <div className="wrap narrow">
          {/* Day Navigation */}
          <nav className="day-nav" aria-label="Choose a day" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--paper)", padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid var(--line)", marginBottom: "1.5rem" }}>
            <Link className="text-link" href={`/daily-readings/${addDays(date, -1)}`} rel="prev">
              ← Previous day
            </Link>
            {!isToday ? (
              <Link className="text-link" href="/daily-readings" style={{ fontWeight: 700, color: "var(--gold-text)" }}>
                Go to Today
              </Link>
            ) : (
              <span style={{ fontWeight: 700, color: "var(--marian)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Calendar size={16} /> Today
              </span>
            )}
            <Link className="text-link" href={`/daily-readings/${addDays(date, 1)}`} rel="next">
              Next day →
            </Link>
          </nav>

          {/* Liturgical Day Card */}
          <div className="day-card" style={{ background: "#fff", border: "1px solid var(--line)", borderTop: "4px solid var(--marian)", borderRadius: "8px", padding: "1.5rem", marginBottom: "2rem", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <p className="eyebrow" style={{ margin: 0 }}>
                {day.season}{day.sundayCycle ? ` · ${day.sundayCycle}` : ""}
              </p>
              {day.colour && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", color: "var(--muted)", fontWeight: 600 }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: COLOUR_SWATCH[day.colour] ?? "#ccc", border: "1px solid var(--line)", display: "inline-block" }} />
                  Vestment: {COLOUR_LABEL[day.colour] ?? day.colour}
                </span>
              )}
            </div>

            <h2 style={{ fontSize: "1.65rem", margin: "0 0 0.5rem", color: "var(--navy)" }}>{principal.name}</h2>
            <p className="day-meta" style={{ margin: "0 0 0.5rem", fontSize: "0.92rem", color: "var(--muted)" }}>
              {RANK_LABEL[principal.rank] ?? principal.rank}
            </p>
            {principal.note && <p className="small" style={{ margin: "0 0 0.5rem" }}>{principal.note}</p>}
            {principal.latinName && <p className="latin" lang="la" style={{ fontStyle: "italic", color: "var(--muted)", margin: 0 }}>{principal.latinName}</p>}
          </div>

          {/* Saint of the Day Section */}
          <section id="saint" style={{ marginTop: "2rem", marginBottom: "2.5rem" }} aria-label="Saint of the Day">
            {saintCelebration ? (
              <div
                style={{
                  background: "var(--paper)",
                  border: "2px solid var(--gold)",
                  borderRadius: "8px",
                  padding: "1.75rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--gold-text)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <Sparkles size={16} /> Saint / Celebration of the Day
                  </span>
                  <span style={{ fontSize: "0.75rem", padding: "0.15rem 0.5rem", borderRadius: "3px", background: "var(--ivory)", border: "1px solid var(--line)", color: "var(--navy)", fontWeight: 600 }}>
                    {RANK_LABEL[saintCelebration.rank] ?? saintCelebration.rank}
                  </span>
                </div>
                <h2 style={{ fontSize: "1.6rem", margin: "0 0 0.35rem", color: "var(--navy)" }}>
                  {saintCelebration.name}
                </h2>
                {saintCelebration.latinName && (
                  <p className="latin" lang="la" style={{ fontStyle: "italic", color: "var(--muted)", margin: "0 0 1rem" }}>
                    {saintCelebration.latinName}
                  </p>
                )}
                {(() => {
                  const prof = profileById.get(saintCelebration.id) ?? getCuratedSaintProfile(saintCelebration.id, saintCelebration.name);
                  if (prof) {
                    return (
                      <div style={{ marginTop: "0.75rem", lineHeight: 1.6 }}>
                        {prof.summary.split(/\n{2,}/).map((t, i) => (
                          <p key={i} style={{ margin: "0 0 0.75rem", fontSize: "1.02rem", color: "var(--ink)" }}>{t}</p>
                        ))}
                        <p className="muted small" style={{ margin: "0.75rem 0 0", borderTop: "1px dashed var(--line)", paddingTop: "0.5rem" }}>
                          Source: {prof.sourceUrl ? (
                            <a href={prof.sourceUrl} rel="noopener noreferrer" target="_blank">
                              {prof.sourceName}
                            </a>
                          ) : (
                            prof.sourceName
                          )}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.6 }}>
                      {saintCelebration.note ?? "Commemorated today in the universal Church and liturgical calendar."}
                    </p>
                  );
                })()}
              </div>
            ) : (
              <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "8px", padding: "1.25rem" }}>
                <p className="eyebrow" style={{ margin: "0 0 0.35rem" }}>Liturgical Day</p>
                <h2 style={{ fontSize: "1.3rem", margin: 0 }}>{principal.name}</h2>
                <p className="muted small" style={{ margin: "0.35rem 0 0" }}>
                  Today is celebrated as a liturgical weekday in {day.season}.
                </p>
              </div>
            )}
          </section>

          {/* Also Today List */}
          {day.celebrations.length > 1 && (
            <section aria-labelledby="also" style={{ marginBottom: "2.5rem" }}>
              <h2 id="also" style={{ fontSize: "1.35rem", marginBottom: "0.75rem" }}>Also today</h2>
              <ul className="entries">
                {day.celebrations.slice(1).map((c) => (
                  <li key={c.id}>
                    <div>
                      <h3 style={{ fontSize: "1.1rem" }}>{c.name}</h3>
                      <p className="muted small">{RANK_LABEL[c.rank] ?? c.rank}{c.isOptional ? " · may be celebrated at the priest's choice" : ""}</p>
                      {c.note && <p className="small">{c.note}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Mass Readings Section */}
          <section aria-labelledby="readings" style={{ marginTop: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "2px solid var(--gold)", paddingBottom: "0.5rem" }}>
              <h2 id="readings" style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--navy)" }}>
                <BookOpen size={22} style={{ color: "var(--marian)" }} />
                Daily Mass Readings
              </h2>
              {result.kind === "live" && (
                <span style={{ fontSize: "0.75rem", background: "var(--paper)", border: "1px solid var(--line)", padding: "0.2rem 0.5rem", borderRadius: "4px", color: "var(--navy)", fontWeight: 600 }}>
                  Live Daily Feed
                </span>
              )}
            </div>

            {result.kind === "staff" || result.kind === "live" || result.kind === "curated" ? (
              <>
                <Reading title="First Reading" part={result.readings.firstReading ?? undefined} />
                <Reading title="Responsorial Psalm" part={result.readings.psalm ?? undefined} />
                <Reading title="Second Reading" part={result.readings.secondReading ?? undefined} />
                <Reading title="Holy Gospel" part={result.readings.gospel ?? undefined} />
                
                <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "6px", padding: "0.85rem 1rem", marginTop: "1rem" }}>
                  <p className="muted small" style={{ margin: 0 }}>
                    {result.readings.translation ? `${result.readings.translation}. ` : ""}{result.readings.sourceNote}
                  </p>
                  {result.links && result.links.length > 0 && (
                    <p className="muted small" style={{ marginTop: "0.4rem", marginBottom: 0 }}>
                      Official Lectionary Portal: <a href={result.links[0].href} target="_blank" rel="noopener noreferrer">{result.links[0].label}</a>
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <p>The readings for this day can be read directly via the official portal below:</p>
                <ul className="entries">
                  {result.links.map((l) => (
                    <li key={l.href}><div><h3><a href={l.href} rel="noopener noreferrer">{l.label}</a></h3><p className="muted">{l.note}</p></div></li>
                  ))}
                </ul>
              </>
            )}

            {/* Interactive Widget Available For Extra Convenience */}
            <div style={{ marginTop: "2.5rem" }}>
              <ReadingsWidget />
            </div>
          </section>

          <p className="muted small" style={{ marginTop: "3rem" }}>Calendar: General Roman Calendar. Celebrations proper to Nigeria, the Diocese of Abakaliki or the chaplaincy are celebrated as appointed.</p>
        </div>
      </section>
    </>
  );
}
