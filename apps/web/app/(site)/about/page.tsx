import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDataClient } from "@/lib/data";
import { PageHead, Awaiting } from "@/components/ui/PageHead";

export const metadata: Metadata = {
  title: "About the Chaplaincy — Our Mother of Perpetual Help, AE-FUTHA",
  description: "Learn about Our Mother of Perpetual Help Catholic Chaplaincy at Alex Ekwueme Federal University Teaching Hospital, Abakaliki: our identity, worship, community, and history.",
};

export const revalidate = 300;

export default async function AboutPage() {
  const history = await getDataClient().getAboutHistory().catch(() => null);
  return (
    <>
      <PageHead
        title="About the Chaplaincy"
        latin="Domine, dilexi decorem domus tuae"
        lede="A Catholic chaplaincy under the maternal patronage of Our Mother of Perpetual Help, serving the hospital community and university faithful."
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
            {/* Left Column: Text & History */}
            <div className="prose">
              <h2>Our Catholic identity</h2>
              <p>
                Our Mother of Perpetual Help Chaplaincy, AE-FUTHA, is a Catholic community of worship, prayer and
                formation. It is placed under the maternal patronage of the Blessed Virgin Mary, venerated under the
                title Our Mother of Perpetual Help, and lives in communion with the universal Church.
              </p>

              <h2>Worship and sacramental life</h2>
              <p>
                The chaplaincy gathers for daily Mass and Sunday celebrations, devotions such as Divine Mercy and
                Benediction, Adoration, catechism classes, confession, and the baptism of infants. See the{" "}
                <Link href="/mass-schedule">Mass schedule</Link> for current times.
              </p>

              <h2>Community &amp; Apostolates</h2>
              <p>
                The faithful serve and pray together through the chaplaincy&rsquo;s{" "}
                <Link href="/societies">associations, organizations and societies</Link>, guided by its{" "}
                <Link href="/leadership">chaplains and leaders</Link>.
              </p>

              <h2>History</h2>
              {history ? (
                history.split(/\n{2,}/).map((t, i) => <p key={i}>{t}</p>)
              ) : (
                <Awaiting>
                  <strong>History to be supplied.</strong> The establishment, milestones and past chaplains of the
                  chaplaincy will be published here once confirmed by the chaplaincy office. We do not publish
                  unverified dates or narratives.
                </Awaiting>
              )}
            </div>

            {/* Right Column: Marian Patron Icon Presentation */}
            <aside
              style={{
                background: "var(--paper)",
                border: "2px solid var(--gold)",
                borderRadius: "8px",
                padding: "1.25rem",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
                textAlign: "center",
                position: "sticky",
                top: "5rem",
              }}
              aria-label="Patroness of the Chaplaincy"
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3/4",
                  maxHeight: "460px",
                  overflow: "hidden",
                  borderRadius: "6px",
                  border: "1px solid var(--line)",
                  background: "var(--ivory)",
                  marginBottom: "1rem",
                }}
              >
                <Image
                  src="/images/pictures/ourmotherofperpetualhelp.png"
                  alt="Sacred Icon of Our Mother of Perpetual Help, Patroness of the AE-FUTHA Catholic Chaplaincy"
                  fill
                  sizes="(min-width: 52rem) 360px, 100vw"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <h3
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.25rem",
                  margin: "0 0 0.35rem",
                  color: "var(--navy)",
                }}
              >
                Our Mother of Perpetual Help
              </h3>
              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold-text)",
                  margin: "0 0 0.5rem",
                }}
              >
                Sancta Maria de Perpetuo Succursu
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Patroness and Protector of our Chaplaincy community, patients, medical staff, and students at AE-FUTHA, Abakaliki.
              </p>
              <p
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--burgundy)",
                  marginTop: "0.75rem",
                  marginBottom: 0,
                }}
              >
                Pray for us!
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
