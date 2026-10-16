import type { Metadata } from "next";
import Link from "next/link";
import { getDataClient } from "@/lib/data";
import { PageHead, Awaiting } from "@/components/ui/PageHead";
import { MassIntentionForm } from "@/components/forms/MassIntentionForm";
import { lagosDateString, formatLongDate } from "@/lib/time/lagos";

export const metadata: Metadata = { title: "Offer a Mass Intention" };
export const revalidate = 60;

export default async function OfferPage() {
  const db = getDataClient();
  const today = lagosDateString();
  const [options, offering, todayIntentions] = await Promise.all([
    db.getMassOptions(),
    db.getOfferingInfo(),
    db.getPublicMassIntentions(today),
  ]);

  return (
    <>
      <PageHead
        title="Offer a Mass Intention"
        latin="Hoc facite"
        image={{ src: "/images/art/church-interior.jpg", position: "center 40%" }}
        lede="Ask that the Holy Sacrifice of the Mass be offered for your intention."
        crumbs={[{ href: "/mass-intentions", label: "Mass Intentions" }]}
      />
      <section className="section">
        <div className="wrap" style={{ maxWidth: "58rem" }}>
          {/* 1. TODAY'S INTENTIONS PREVIEW (COMES FIRST) */}
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem", borderBottom: "2px solid var(--gold)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.6rem", color: "var(--navy)" }}>
                Today&rsquo;s Scheduled Intentions ({formatLongDate(today)})
              </h2>
              <Link href="/mass-intentions" className="text-link" style={{ fontWeight: 600 }}>
                View All Dates →
              </Link>
            </div>
            {todayIntentions.length === 0 ? (
              <p className="muted" style={{ margin: 0 }}>
                No intentions are published for today yet. Fill the form below to request a Mass.
              </p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
                {todayIntentions.slice(0, 3).map((i) => (
                  <li
                    key={i.id}
                    className="card pattern-paper"
                    style={{ padding: "0.85rem 1.25rem", borderRadius: "6px", border: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <span>{i.text}</span>
                    <span style={{ fontSize: "0.85rem", color: "var(--gold-text)", fontWeight: 600 }}>{i.activityName ?? "Holy Mass"}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 2. FORM TO OFFER INTENTION (COMES SECOND) */}
          <div className="card pattern-paper" style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)", border: "1px solid var(--gold)", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.85rem", color: "var(--navy)" }}>
              Submit an Intention
            </h2>
            <div style={{ marginBottom: "1.75rem" }}>
              <Awaiting>
                <strong>How it works.</strong> After you submit, you will receive a reference tracking number. The chaplaincy
                office reviews and schedules the intention upon verification of the stipend.
                Your telephone and email remain strictly private.
              </Awaiting>
            </div>
            <MassIntentionForm options={options} offering={offering} />
          </div>
        </div>
      </section>
    </>
  );
}
