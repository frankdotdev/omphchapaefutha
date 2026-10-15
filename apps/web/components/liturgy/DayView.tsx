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

const COLOUR_SWATCH: Record<string, string> = { WHITE: "#fff", RED: "#9b1c2c", GREEN: "#2f6b3a", PURPLE: "#5b2a7a", ROSE: "#d98aa0", GOLD: "#c9a24a", BLACK: "#111" };

function Reading({ title, part }: { title: string; part?: { ref: string; text?: string } }) {
  if (!part) return null;
  return (
    <article className="reading">
      <h3>{title}</h3>
      <p className="reading-ref">{part.ref}</p>
      {part.text && part.text.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}
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
  const result = resolveReadings(date, staffReadings, { allowCuratedFallback: true });
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
        lede={isToday ? formatLongDate(date) : "The liturgical day and the Mass readings."}
      />
      <section className="section">
        <div className="wrap narrow">
          <nav className="day-nav" aria-label="Choose a day">
            <Link href={`/daily-readings/${addDays(date, -1)}`} rel="prev">Previous day</Link>
            {!isToday && <Link href="/daily-readings">Today</Link>}
            <Link href={`/daily-readings/${addDays(date, 1)}`} rel="next">Next day</Link>
          </nav>

          <div className="day-card">
            <p className="eyebrow">{day.season}{day.sundayCycle ? ` · ${day.sundayCycle}` : ""}</p>
            <h2>{principal.name}</h2>
            <p className="day-meta">
              {RANK_LABEL[principal.rank] ?? principal.rank}
              {day.colour && (<> · <span className="swatch" style={{ background: COLOUR_SWATCH[day.colour] }} aria-hidden="true" /> Vestment colour: {COLOUR_LABEL[day.colour] ?? day.colour}</>)}
            </p>
            {principal.note && <p className="small">{principal.note}</p>}
            {principal.latinName && <p className="latin" lang="la">{principal.latinName}</p>}
          </div>

          {/* Saint / Holy Celebration of the Day Section */}
          <section id="saint" style={{ marginTop: "2rem", marginBottom: "2rem" }} aria-label="Saint of the Day">
            {saintCelebration ? (
              <div
                style={{
                  background: "var(--paper)",
                  border: "2px solid var(--gold)",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--gold-text)",
                    }}
                  >
                    Saint / Celebration of the Day
                  </span>
                  <span style={{ fontSize: "0.75rem", padding: "0.15rem 0.5rem", borderRadius: "3px", background: "var(--ivory)", border: "1px solid var(--line)", color: "var(--navy)", fontWeight: 600 }}>
                    {RANK_LABEL[saintCelebration.rank] ?? saintCelebration.rank}
                  </span>
                </div>
                <h2 style={{ fontSize: "1.5rem", margin: "0 0 0.35rem", color: "var(--navy)" }}>
                  {saintCelebration.name}
                </h2>
                {saintCelebration.latinName && (
                  <p className="latin" lang="la" style={{ fontStyle: "italic", color: "var(--muted)", margin: "0 0 0.75rem" }}>
                    {saintCelebration.latinName}
                  </p>
                )}
                {(() => {
                  const prof = profileById.get(saintCelebration.id) ?? getCuratedSaintProfile(saintCelebration.id, saintCelebration.name);
                  if (prof) {
                    return (
                      <div style={{ marginTop: "0.75rem", lineHeight: 1.55 }}>
                        {prof.summary.split(/\n{2,}/).map((t, i) => (
                          <p key={i} style={{ margin: "0 0 0.5rem" }}>{t}</p>
                        ))}
                        <p className="muted small" style={{ margin: "0.5rem 0 0" }}>
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
                    <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.5 }}>
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

          {day.celebrations.length > 1 && (
            <section aria-labelledby="also">
              <h2 id="also">Also today</h2>
              <ul className="entries">
                {day.celebrations.slice(1).map((c) => (
                  <li key={c.id}>
                    <div>
                      <h3>{c.name}</h3>
                      <p className="muted">{RANK_LABEL[c.rank] ?? c.rank}{c.isOptional ? " · may be celebrated at the priest's choice" : ""}</p>
                      {c.note && <p className="small">{c.note}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="readings">
            <h2 id="readings">Mass readings</h2>
            {result.kind === "staff" || result.kind === "curated" ? (
              <>
                <Reading title="First reading" part={result.readings.firstReading ?? undefined} />
                <Reading title="Responsorial psalm" part={result.readings.psalm ?? undefined} />
                <Reading title="Second reading" part={result.readings.secondReading ?? undefined} />
                <Reading title="Gospel" part={result.readings.gospel ?? undefined} />
                <p className="muted small" style={{ marginTop: "1rem" }}>
                  {result.readings.translation ? `${result.readings.translation}. ` : ""}{result.readings.sourceNote}
                </p>
                {result.links && result.links.length > 0 && (
                  <p className="muted small" style={{ marginTop: "0.4rem" }}>
                    Official Lectionary Portal: <a href={result.links[0].href} target="_blank" rel="noopener noreferrer">{result.links[0].label}</a>
                  </p>
                )}
              </>
            ) : (
              <>
                <p>The chaplaincy has not published the readings for this day on this site.</p>
                <ul className="entries">
                  {result.links.map((l) => (
                    <li key={l.href}><div><h3><a href={l.href} rel="noopener noreferrer">{l.label}</a></h3><p className="muted">{l.note}</p></div></li>
                  ))}
                </ul>
              </>
            )}
            {isToday && result.kind === "link" && <ReadingsWidget />}
          </section>

          <p className="muted small">Calendar: General Roman Calendar. Celebrations proper to Nigeria, the Diocese of Abakaliki or the chaplaincy are added by the chaplaincy office where they apply.</p>
        </div>
      </section>
    </>
  );
}
