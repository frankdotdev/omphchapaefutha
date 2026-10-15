import Link from "next/link";
import { getDataClient } from "@/lib/data";
import { resolveSchedule } from "@/lib/schedule";
import { Timetable } from "@/components/schedule/Timetable";
import { Communion } from "@/components/ui/Communion";
import { HeroSlider } from "@/components/home/HeroSlider";
import { SLIDES } from "@/lib/slides";
import { CrossDivider, Inscription, RoseWindow } from "@/components/art/Art";
import { formatLongDate, lagosDateString } from "@/lib/time/lagos";
import { getLiturgicalDay, RANK_LABEL, COLOUR_LABEL } from "@/lib/liturgy/calendar";
import { applyOverrides } from "@/lib/liturgy/overrides";
import { getCuratedSaintProfile } from "@/lib/liturgy/saints-data";
import { BookOpen, Sparkles } from "lucide-react";

const COLOUR_SWATCH: Record<string, string> = {
  WHITE: "#fff",
  RED: "#9b1c2c",
  GREEN: "#2f6b3a",
  PURPLE: "#5b2a7a",
  ROSE: "#d98aa0",
  GOLD: "#c9a24a",
  BLACK: "#111",
};

// Re-render at most every minute so the schedule day rolls over at Lagos midnight, not UTC midnight.
export const revalidate = 60;

export default async function Home() {
  const db = getDataClient();
  const today = lagosDateString();
  const [
    recurring,
    exceptions,
    announcements,
    events,
    eccl,
    societies,
    dbSlides,
    liturgicalBase,
    overrides,
  ] = await Promise.all([
    db.getRecurringSchedule(),
    db.getScheduleExceptions(today, today),
    db.getAnnouncements(3),
    db.getUpcomingEvents(3),
    db.getEcclesiasticalDirectory(),
    db.getSocieties(),
    db.getHeroSlides(),
    getLiturgicalDay(today),
    db.getLiturgicalOverrides().catch(() => []),
  ]);
  // The welcome slide always comes first; administrator-managed slides follow, or the defaults if none are published.
  const slides = [SLIDES[0], ...(dbSlides.length ? dbSlides : SLIDES.slice(1))];
  const entries = resolveSchedule(today, recurring, exceptions);
  const featured = events.find((e) => e.isFeatured) ?? events[0];
  const groups = societies.filter((s) => s.published);

  const day = liturgicalBase ? applyOverrides(liturgicalBase, overrides) : null;
  const principal = day?.celebrations[0];
  const saintCelebration = day?.celebrations.find(
    (c) =>
      c.name.includes("Saint") ||
      c.name.includes("St.") ||
      c.name.includes("Blessed") ||
      c.name.includes("Our Lady") ||
      c.rank === "MEMORIAL" ||
      c.rank === "OPTIONAL_MEMORIAL" ||
      c.rank === "FEAST" ||
      c.rank === "SOLEMNITY",
  ) ?? (day && day.celebrations.length > 1 ? day.celebrations[1] : (principal && principal.rank !== "WEEKDAY" ? principal : null));
  const saintBio = saintCelebration ? getCuratedSaintProfile(saintCelebration.id, saintCelebration.name) : null;

  return (
    <>
      <HeroSlider slides={slides} />

      {/* Liturgical Previews: Mass Readings & Saint of the Day */}
      {day && principal && (
        <section className="section" style={{ paddingBottom: "2rem", background: "var(--paper)", borderBottom: "1px solid var(--line)" }} aria-label="Today in the Liturgy">
          <div className="wrap">
            <div style={{ marginBottom: "1.25rem" }}>
              <p className="eyebrow" style={{ margin: 0 }}>Liturgy &amp; Calendar · {formatLongDate(today)}</p>
              <h2 style={{ margin: "0.2rem 0 0", fontSize: "1.7rem", color: "var(--navy)" }}>Today in the Church</h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {/* Daily Mass Readings Card */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid var(--marian)",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--marian)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      <BookOpen size={16} /> Mass Readings
                    </span>
                    {day.colour && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600 }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: COLOUR_SWATCH[day.colour] ?? "#ccc", border: "1px solid var(--line)", display: "inline-block" }} />
                        {COLOUR_LABEL[day.colour] ?? day.colour}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: "1.3rem", margin: "0 0 0.4rem", color: "var(--navy)" }}>
                    {principal.name}
                  </h3>
                  <p className="eyebrow" style={{ fontSize: "0.78rem", margin: "0 0 0.85rem", color: "var(--gold-text)" }}>
                    {day.season}{day.sundayCycle ? ` · ${day.sundayCycle}` : ""}
                  </p>
                  <p className="muted" style={{ fontSize: "0.9rem", lineHeight: 1.5, margin: "0 0 1.25rem" }}>
                    Listen to God&rsquo;s Word appointed for today in the sacred liturgy, with the Responsorial Psalm and Gospel.
                  </p>
                </div>

                <div>
                  <Link
                    href="/daily-readings"
                    className="btn"
                    style={{ width: "100%", fontSize: "0.92rem", padding: "0.55rem 1rem" }}
                  >
                    Read Today&rsquo;s Readings →
                  </Link>
                </div>
              </div>

              {/* Saint of the Day Card */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid var(--gold)",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--gold-text)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      <Sparkles size={16} /> Saint of the Day
                    </span>
                    {saintCelebration && (
                      <span style={{ fontSize: "0.72rem", padding: "0.15rem 0.45rem", borderRadius: "3px", background: "var(--paper)", border: "1px solid var(--line)", color: "var(--navy)", fontWeight: 600 }}>
                        {RANK_LABEL[saintCelebration.rank] ?? saintCelebration.rank}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: "1.3rem", margin: "0 0 0.4rem", color: "var(--navy)" }}>
                    {saintCelebration ? saintCelebration.name : principal.name}
                  </h3>
                  {saintCelebration?.latinName && (
                    <p style={{ fontStyle: "italic", fontSize: "0.82rem", color: "var(--muted)", margin: "0 0 0.85rem" }}>
                      {saintCelebration.latinName}
                    </p>
                  )}
                  <p className="muted" style={{ fontSize: "0.9rem", lineHeight: 1.5, margin: "0 0 1.25rem" }}>
                    {saintBio
                      ? (saintBio.summary.length > 175 ? `${saintBio.summary.slice(0, 175).trim()}…` : saintBio.summary)
                      : (saintCelebration?.note ?? "Commemorated today in the liturgical calendar. Discover their life, patronage, and spiritual witness.")}
                  </p>
                </div>

                <div>
                  <Link
                    href="/daily-readings#saint"
                    className="btn secondary"
                    style={{ width: "100%", fontSize: "0.92rem", padding: "0.55rem 1rem" }}
                  >
                    Learn About Today&rsquo;s Saint →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section tint has-inscription pattern-light" aria-labelledby="today-title">
        <Inscription>Haec dies</Inscription>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Today · {formatLongDate(today)}</p>
              <h2 id="today-title">Today at the Chaplaincy</h2>
            </div>
            <Link className="text-link" href="/mass-schedule">Full timetable</Link>
          </div>
          <Timetable entries={entries} emptyText="No scheduled activities today. See the full timetable for the week." />
        </div>
      </section>

      {events.length > 0 && (
        <section className="section" aria-labelledby="events-title">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow">Chaplaincy Calendar</p>
                <h2 id="events-title">Upcoming Events</h2>
              </div>
              <Link className="text-link" href="/events">All events</Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {events.map((evt) => (
                <div
                  key={evt.slug}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span className="eyebrow" style={{ margin: 0, color: "var(--gold-text)", fontWeight: 700 }}>
                        {evt.category ?? "Event"}
                      </span>
                      {evt.venue && (
                        <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                          {evt.venue}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "1.2rem", margin: "0 0 0.5rem", color: "var(--navy)" }}>
                      <Link href={`/events/${evt.slug}`}>{evt.title}</Link>
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--marian)", fontWeight: 600, margin: "0 0 0.75rem" }}>
                      📅 {new Date(evt.startsAt).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" })}
                    </p>
                    {evt.description && (
                      <p className="muted" style={{ fontSize: "0.88rem", lineHeight: 1.5, margin: "0 0 1rem" }}>
                        {evt.description}
                      </p>
                    )}
                  </div>
                  <div>
                    <Link
                      href={`/events/${evt.slug}`}
                      className="btn secondary"
                      style={{ width: "100%", fontSize: "0.88rem", padding: "0.5rem 0.8rem", textAlign: "center" }}
                    >
                      Event Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="section cta-band cta-photo has-inscription on-dark"
        style={{ ["--cta-img" as string]: "url(/images/art/rosary-bible.jpg)" } as React.CSSProperties}
        aria-labelledby="cta-title"
      >
        <Inscription className="at-left">Orate, fratres</Inscription>
        <div className="wrap">
          <CrossDivider className="ornament" />
          <h2 id="cta-title" style={{ textAlign: "center", marginBottom: "2.5rem" }}>Pray with us</h2>
          <div className="cta-split">
            <div>
              <p className="eyebrow">Free · Prayer intentions</p>
              <h3>Ask the community to pray for you</h3>
              <p>Share a thanksgiving, a healing, a family need or an examination. Intentions are reviewed before anything is shown publicly.</p>
              <div className="btn-row"><Link className="btn" href="/prayer-intentions">Request a prayer</Link></div>
            </div>
            <div className="vrule" aria-hidden="true" />
            <div>
              <p className="eyebrow">Mass intentions</p>
              <h3>Have a Mass offered for an intention</h3>
              <p>Offer a Mass for the living or the faithful departed. You will receive a reference number and can check its progress at any time.</p>
              <div className="btn-row">
                <Link className="btn" href="/mass-intentions/offer">Offer a Mass intention</Link>
                <Link className="btn secondary" href="/mass-intentions">Today&rsquo;s intentions</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {announcements.length > 0 && (
        <section className="section tint" aria-labelledby="ann-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="ann-title">Announcements</h2>
              <Link className="text-link" href="/announcements">All announcements</Link>
            </div>
            <ul className="entries">
              {announcements.map((a) => (
                <li key={a.slug}>
                  <div className="meta">
                    <time dateTime={a.publishedAt}>{new Date(a.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" })}</time>
                    {a.category && <div>{a.category}</div>}
                  </div>
                  <div>
                    <h3><Link href={`/announcements/${a.slug}`}>{a.title}</Link></h3>
                    {a.excerpt && <p>{a.excerpt}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section dark on-dark has-inscription pattern-quatrefoil" aria-labelledby="comm-title">
        <Inscription className="at-top">Tu es Petrus</Inscription>
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">From the Apostles to our local chaplaincy</p>
            <h2 id="comm-title">In Communion with the Church</h2>
            <p>
              Jesus Christ is the head of the Church, and the Blessed Virgin Mary, Our Mother of Perpetual Help, is
              the spiritual patroness of this chaplaincy. We live in communion with the successor of Saint Peter and
              with our shepherds.
            </p>
            <div className="btn-row">
              <Link className="btn secondary" href="/ecclesiastical-communion">Learn more</Link>
            </div>
          </div>
          <Communion entries={eccl} />
        </div>
      </section>

      <section className="section has-inscription" aria-labelledby="soc-title">
        <Inscription>Ut omnes unum sint</Inscription>
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">{groups.length} communities</p>
            <h2 id="soc-title">Our Catholic Communities</h2>
            <p className="lede">
              Associations, organizations and devotional societies through which the faithful of the chaplaincy serve,
              pray and grow together.
            </p>
            <div className="btn-row"><Link className="btn" href="/societies">Browse all societies</Link></div>
          </div>
          <div className="society-spread" aria-label="A selection of our communities">
            <ul>
              {groups.slice(0, 8).map((s) => (
                <li key={s.slug}><Link href={`/societies/${s.slug}`}>{s.shortName ?? s.name}</Link></li>
              ))}
            </ul>
            <RoseWindow className="spread-art" />
          </div>
        </div>
      </section>

      <section className="section tint has-inscription" aria-labelledby="about-title">
        <Inscription className="at-left">Mater de Perpetuo Succursu</Inscription>
        <div className="wrap two-col">
          <figure className="about-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/omph-icon.jpg" width={404} height={495} alt="Icon of Our Mother of Perpetual Help" loading="lazy" />
            <figcaption>Mater de Perpetuo Succursu</figcaption>
          </figure>
          <div>
            <p className="eyebrow">Our patroness</p>
            <h2 id="about-title">Our Mother of Perpetual Help</h2>
            <p>
              The chaplaincy is placed under the maternal patronage of the Blessed Virgin Mary, honoured for centuries
              before the beloved icon of Our Mother of Perpetual Help, who holds the Child Jesus while the archangels
              show Him the instruments of the Passion.
            </p>
            <div className="btn-row"><Link className="btn secondary" href="/about">About the chaplaincy</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
