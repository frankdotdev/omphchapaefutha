import type { Metadata } from "next";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";
import { PrayerForm } from "@/components/forms/PrayerForm";

export const metadata: Metadata = { title: "Prayer Intentions" };
export const revalidate = 60;

export default async function PrayerPage() {
  const published = await getDataClient().getPublicPrayerIntentions(30);

  return (
    <>
      <PageHead
        title="Prayer Intentions"
        latin="Petite, et dabitur vobis"
        image={{ src: "/images/art/rosary-bible.jpg", position: "center 55%" }}
        lede="United in prayer before the Blessed Sacrament. Ask the chaplaincy community to pray with you."
      />
      <section className="section">
        <div className="wrap" style={{ maxWidth: "58rem" }}>
          {/* 1. COMMUNITY PRAYERS AND INTENTIONS (COMES FIRST) */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "1.5rem",
                borderBottom: "2px solid var(--gold)",
                paddingBottom: "0.75rem",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "var(--navy)" }}>
                  Intentions We Are Praying For
                </h2>
                <p className="muted" style={{ margin: "0.35rem 0 0 0", fontSize: "0.98rem" }}>
                  Remembered daily at Holy Mass, during Sunday Benediction, and in hospital ward devotions.
                </p>
              </div>
              <a href="#submit-prayer" className="btn" style={{ fontSize: "0.88rem", padding: "0.55rem 1.1rem" }}>
                + Submit Your Intention
              </a>
            </div>

            {published.length === 0 ? (
              <div className="card pattern-paper" style={{ padding: "2rem", textAlign: "center", border: "1px dashed var(--line)" }}>
                <p className="muted" style={{ margin: 0 }}>No intentions are currently published. Be the first to submit a prayer request below.</p>
              </div>
            ) : (
              <ul
                className="entries"
                style={{
                  display: "grid",
                  gap: "1.25rem",
                  gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {published.map((p) => (
                  <li
                    key={p.id}
                    className="card pattern-paper"
                    style={{
                      padding: "1.5rem",
                      borderRadius: "8px",
                      border: "1px solid var(--line)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div>
                      {p.category && (
                        <div style={{ marginBottom: "0.75rem" }}>
                          <span
                            style={{
                              background: "var(--marian)",
                              color: "#ffffff",
                              fontSize: "0.74rem",
                              fontWeight: 700,
                              padding: "0.25rem 0.65rem",
                              borderRadius: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {p.category}
                          </span>
                        </div>
                      )}
                      <p
                        style={{
                          margin: "0 0 1rem 0",
                          fontSize: "1.05rem",
                          lineHeight: 1.55,
                          color: "var(--navy)",
                          fontStyle: "italic",
                        }}
                      >
                        &ldquo;{p.body}&rdquo;
                      </p>
                    </div>

                    <div
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--muted)",
                        borderTop: "1px dashed var(--line)",
                        paddingTop: "0.65rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        Requested by <strong>{p.displayName ?? "Anonymous Parishioner"}</strong>
                      </span>
                      <span style={{ color: "var(--gold-text)", fontWeight: 600, fontSize: "0.82rem" }}>
                        In Prayer 🙏
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 2. FORM TO SUBMIT A PRAYER REQUEST (COMES SECOND) */}
          <div
            id="submit-prayer"
            className="card pattern-paper"
            style={{
              padding: "clamp(1.5rem, 4vw, 2.75rem)",
              border: "1px solid var(--gold)",
              borderRadius: "8px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ marginBottom: "1.75rem", borderBottom: "1px solid var(--line)", paddingBottom: "1rem" }}>
              <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.85rem", color: "var(--navy)" }}>
                Ask for Prayers
              </h2>
              <p className="muted" style={{ margin: 0, fontSize: "0.98rem" }}>
                Submit your prayer intention below. Our chaplains and pious societies will pray with you.
                This service is completely free and your contact details remain private.
              </p>
            </div>
            <PrayerForm />
          </div>
        </div>
      </section>
    </>
  );
}
