import type { Metadata } from "next";
import Link from "next/link";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";
import { AccountCard } from "@/components/giving/AccountCard";
import { CrossDivider } from "@/components/art/Art";
import { Heart, Building2, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Support the Chaplaincy — Accounts & Projects",
  description: "Official bank accounts and ongoing pastoral projects of Our Mother of Perpetual Help Catholic Chaplaincy, AE-FUTHA, Abakaliki.",
};

export const revalidate = 180;

export default async function SupportPage() {
  const db = getDataClient();
  const accounts = await db.getChurchAccounts();

  return (
    <>
      <PageHead
        title="Support & Pastoral Projects"
        latin="Date, et dabitur vobis"
        image={{ src: "/images/art/st-peters-light.jpg", position: "center 35%" }}
        lede="Partner with Our Mother of Perpetual Help Chaplaincy in ministering to hospital patients, medical personnel, and the university community."
      />

      <section className="section">
        <div className="wrap">
          <div style={{ maxWidth: "52rem", margin: "0 auto 3rem", textAlign: "center" }}>
            <p className="lede" style={{ margin: "0 auto 1.5rem" }}>
              Every donation and project contribution sustains our bedside ministry to the sick, Eucharistic adoration,
              catechetical formation, and chapel facilities at AE-FUTHA.
            </p>

            <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderLeft: "4px solid var(--gold)", padding: "1rem 1.25rem", borderRadius: "6px", textAlign: "left" }}>
              <strong style={{ color: "var(--navy)", display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.25rem" }}>
                <HelpCircle size={18} color="var(--gold-text)" /> Important Notice Regarding Account Names
              </strong>
              <p className="muted small" style={{ margin: 0, lineHeight: 1.5 }}>
                Official bank accounts retain the registered title <strong>St. Padre Pio Catholic Chaplaincy</strong>, as
                incorporated prior to the dedication of our grotto and renaming of the chaplaincy under Our Mother of
                Perpetual Help by the late Bishop Peter Nworie in 2023. All funds are received directly by the chaplaincy pastoral council.
              </p>
            </div>
          </div>

          <CrossDivider className="ornament" />

          {/* Accounts Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
              marginTop: "2.5rem",
              marginBottom: "3.5rem",
            }}
          >
            {accounts.map((acct) => (
              <AccountCard key={acct.id} project={acct} />
            ))}
          </div>

          {/* Additional Pastoral Giving Ways */}
          <div
            className="card pattern-paper"
            style={{
              padding: "2rem",
              borderRadius: "8px",
              border: "1px solid var(--line)",
              maxWidth: "52rem",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", margin: "0 0 0.5rem", color: "var(--navy)" }}>
              Other Ways to Give and Pray
            </h2>
            <p className="muted" style={{ margin: "0 0 1.5rem" }}>
              Have a Holy Mass celebrated for your family, or offer your intentions to our intercessory community.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/mass-intentions/offer" className="btn">
                Offer a Mass Intention (₦300) →
              </Link>
              <Link href="/prayer-intentions#submit-prayer" className="btn secondary">
                Request Free Community Prayer →
              </Link>
              <Link href="/contact" className="btn secondary">
                Contact Chaplaincy Office →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
