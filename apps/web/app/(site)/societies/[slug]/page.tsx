import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDataClient } from "@/lib/data";
import { PageHead, Awaiting } from "@/components/ui/PageHead";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getDataClient().getSociety(slug);
  return {
    title: s?.name ? `${s.name} — OMPH Chaplaincy` : "Society",
    description: s?.summary ?? undefined,
  };
}

const SECTIONS: [keyof import("@/lib/types").Society, string][] = [
  ["mission", "Mission and purpose"],
  ["spirituality", "Catholic identity and spirituality"],
  ["movementHistory", "History of the wider movement"],
  ["localHistory", "History at the chaplaincy"],
  ["activities", "Activities and apostolate"],
  ["membershipInfo", "Membership"],
];

export default async function SocietyPage({ params }: Props) {
  const { slug } = await params;
  const s = await getDataClient().getSociety(slug);
  if (!s || !s.published) notFound();

  const facts: [string, string | null | undefined][] = [
    ["Patron", s.patron],
    ["Feast day", s.feastDay],
    ["Meets", s.meetingSchedule],
    ["Venue", s.meetingVenue],
  ];
  const shownFacts = facts.filter(([, v]) => v);
  const shownSections = SECTIONS.filter(([k]) => s[k]);
  const hasContent = shownFacts.length > 0 || shownSections.length > 0 || s.summary;

  return (
    <>
      <PageHead
        title={s.name}
        lede={s.summary ?? undefined}
        crumbs={[{ href: "/societies", label: "Societies" }]}
      />
      <section className="section">
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gap: "3rem",
              alignItems: "start",
            }}
            className="about-grid"
          >
            {/* Left Column: Editorial Content */}
            <div className="prose">
              {shownSections.map(([k, label]) => (
                <div key={k}>
                  <h2>{label}</h2>
                  {(s[k] as string).split(/\n{2,}/).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              ))}

              {!hasContent && (
                <Awaiting>
                  <strong>Profile in preparation.</strong> The history, patronage, meeting times and leadership of the{" "}
                  {s.name} will be published after the chaplaincy has verified them. We do not publish unverified
                  histories, patron saints, or executive names.
                </Awaiting>
              )}
            </div>

            {/* Right Column: Society Badge, Image & Facts Card */}
            <aside
              style={{
                background: "var(--paper)",
                border: "2px solid var(--gold)",
                borderRadius: "8px",
                padding: "1.25rem",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
                position: "sticky",
                top: "5rem",
              }}
              aria-label="Society details"
            >
              {s.imageSrc && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4/3",
                    maxHeight: "260px",
                    overflow: "hidden",
                    borderRadius: "6px",
                    border: "1px solid var(--line)",
                    background: "var(--ivory)",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Image
                    src={s.imageSrc}
                    alt={s.name}
                    fill
                    sizes="(min-width: 52rem) 360px, 100vw"
                    style={{ objectFit: "contain", padding: "0.5rem" }}
                    priority
                  />
                </div>
              )}

              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", margin: "0 0 0.25rem", color: "var(--navy)" }}>
                {s.name}
              </h3>
              {s.shortName && (
                <p style={{ fontFamily: "var(--sans)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-text)", margin: "0 0 1rem" }}>
                  {s.shortName}
                </p>
              )}

              {shownFacts.length > 0 && (
                <dl className="facts" style={{ margin: "0 0 1.25rem" }}>
                  {shownFacts.map(([k, v]) => (
                    <div key={k} style={{ display: "contents" }}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "1rem", marginTop: "1rem" }}>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0 0 0.75rem" }}>
                  Interested in joining this apostolate or devotional group?
                </p>
                <Link
                  href="/contact"
                  className="btn secondary"
                  style={{ width: "100%", textAlign: "center", fontSize: "0.88rem", padding: "0.5rem 1rem" }}
                >
                  Contact the Chaplaincy
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
