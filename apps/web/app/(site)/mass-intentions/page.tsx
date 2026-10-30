import type { Metadata } from "next";
import Link from "next/link";
import { getDataClient } from "@/lib/data";
import { PageHead, Awaiting } from "@/components/ui/PageHead";
import { addDays, formatLongDate, isValidDateString, lagosDateString } from "@/lib/time/lagos";
import { MassIntentionForm } from "@/components/forms/MassIntentionForm";
import { PrintButton } from "@/components/ui/PrintButton";
import { Archive, Calendar, CheckCircle2, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Mass Intentions — Daily Altar Schedule & Booking",
  description: "View daily intentions offered at Holy Mass and book a Mass intention for thanksgiving, repose of souls, or healing.",
};

export const revalidate = 60;

type Props = { searchParams: Promise<{ date?: string }> };

export default async function MassIntentionsPage({ searchParams }: Props) {
  const { date } = await searchParams;
  const today = lagosDateString();
  const day = date && isValidDateString(date) ? date : today;
  const db = getDataClient();
  const [items, options, offering] = await Promise.all([
    db.getPublicMassIntentions(day),
    db.getMassOptions(),
    db.getOfferingInfo(),
  ]);

  const isPast = day < today;
  const isToday = day === today;

  const groups = new Map<string, typeof items>();
  for (const i of items) {
    const k = i.activityName ?? "Holy Mass";
    groups.set(k, [...(groups.get(k) ?? []), i]);
  }

  return (
    <>
      <PageHead
        title="Mass Intentions"
        latin="Hoc facite in meam commemorationem"
        image={{ src: "/images/art/church-interior.jpg", position: "center 40%" }}
        lede="Intentions offered at the altar of God, celebrated daily in the Holy Sacrifice of the Mass."
      />

      <section className="section">
        <div className="wrap" style={{ maxWidth: "58rem" }}>
          {/* 1. PUBLISHED MASS INTENTIONS FOR THE DAY */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "var(--navy)" }}>
                  Intentions Offered at Mass
                </h2>
                <p className="muted" style={{ margin: "0.25rem 0 0 0" }}>
                  Official schedule of intentions offered during Holy Mass by our chaplains.
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                <a href="#offer-intention" className="btn" style={{ fontSize: "0.88rem", padding: "0.55rem 1.1rem" }}>
                  + Offer a Mass Intention
                </a>
                <Link className="btn secondary" href="/mass-intentions/status" style={{ fontSize: "0.88rem", padding: "0.55rem 1.1rem" }}>
                  Check Status
                </Link>
                <PrintButton />
              </div>
            </div>

            {/* Date Navigation & Status Banner */}
            <div className="date-nav" style={{ margin: "1.5rem 0 1rem", background: "var(--paper)", padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid var(--line)" }}>
              <Link className="text-link" href={`/mass-intentions?date=${addDays(day, -1)}`} rel="prev">
                ← Previous day
              </Link>
              <h3 style={{ margin: 0, fontSize: "1.35rem", color: "var(--navy)", fontFamily: "var(--serif)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Calendar size={18} color="var(--gold)" />
                {formatLongDate(day)}
              </h3>
              <Link className="text-link" href={`/mass-intentions?date=${addDays(day, 1)}`} rel="next">
                Next day →
              </Link>
              {!isToday && (
                <Link className="text-link" href="/mass-intentions" style={{ fontWeight: 700, color: "var(--gold-text)" }}>
                  (Go to Today)
                </Link>
              )}
            </div>

            {/* Past/Archived Indicator */}
            {isPast && (
              <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "0.75rem 1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#475569" }}>
                <Archive size={16} />
                <strong>Archived:</strong> Holy Mass has already been offered for this date. These intentions are preserved on record.
              </div>
            )}

            {isToday && (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "6px", padding: "0.6rem 1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", color: "#166534" }}>
                <Clock size={16} />
                <strong>Today&rsquo;s Roster:</strong> Scheduled for today&rsquo;s liturgies. After celebration, intentions move automatically to the archive.
              </div>
            )}

            {items.length === 0 ? (
              <div className="card pattern-paper" style={{ padding: "2rem", textAlign: "center", border: "1px dashed var(--line)" }}>
                <p className="muted" style={{ margin: 0 }}>
                  No published intentions recorded for this date. You can offer a Mass intention using the form below.
                </p>
              </div>
            ) : (
              [...groups.entries()].map(([mass, list]) => (
                <div key={mass} style={{ marginBottom: "2.25rem" }} className="mass-group-card">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem", borderBottom: "2px solid var(--gold)", paddingBottom: "0.4rem" }}>
                    <span style={{ fontSize: "1.2rem", color: "var(--marian)" }}>✝</span>
                    <h3 style={{ margin: 0, fontSize: "1.3rem", color: "var(--navy)" }}>{mass}</h3>
                    <span style={{ fontSize: "0.85rem", color: "var(--muted)", marginLeft: "auto" }}>
                      {list.length} {list.length === 1 ? "Intention" : "Intentions"}
                    </span>
                  </div>

                  <ol className="intention-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.85rem" }}>
                    {list.map((i, index) => (
                      <li
                        key={i.id}
                        className="card pattern-paper"
                        style={{
                          padding: "1.2rem 1.5rem",
                          borderRadius: "6px",
                          border: "1px solid var(--line)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "1rem",
                        }}
                      >
                        <span style={{ fontWeight: 700, color: "var(--gold-text)", fontSize: "1.1rem", minWidth: "1.5rem" }}>
                          {index + 1}.
                        </span>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.5, color: "var(--navy)" }}>
                            {i.text}
                          </p>
                          {i.displayName && (
                            <div className="by" style={{ marginTop: "0.4rem", fontSize: "0.88rem", color: "var(--muted)" }}>
                              Offered by: <strong style={{ color: "var(--navy)" }}>{i.displayName}</strong>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))
            )}
          </div>

          {/* 2. FORM TO OFFER A MASS INTENTION */}
          <div
            id="offer-intention"
            className="card pattern-paper"
            style={{
              padding: "clamp(1.5rem, 4vw, 2.75rem)",
              border: "1px solid var(--gold)",
              borderRadius: "8px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ marginBottom: "1.5rem", borderBottom: "1px solid var(--line)", paddingBottom: "1rem" }}>
              <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.85rem", color: "var(--navy)" }}>
                Offer a Mass Intention
              </h2>
              <p className="muted" style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.5 }}>
                Request that the Holy Sacrifice of the Mass be offered for your family, thanksgiving, departed souls, healing, or special petition.
                You can book for a single day, consecutive days (novena), or multiple specific dates.
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <Awaiting>
                <strong>How it works:</strong> Bookings carry a stipend of <strong>₦300 per day / Mass</strong>.
                Upon submission, you receive an instant Reference Tracking Code. You will transfer to First Bank (St. Padre Pio Catholic Chaplaincy)
                and click the WhatsApp button to notify the Catechist or Chaplain directly. Your intention is reviewed and scheduled immediately.
              </Awaiting>
            </div>

            <MassIntentionForm options={options} offering={offering} />
          </div>
        </div>
      </section>
    </>
  );
}
