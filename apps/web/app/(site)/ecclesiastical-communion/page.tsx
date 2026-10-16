import type { Metadata } from "next";
import { getDataClient } from "@/lib/data";
import { PageHead, Awaiting } from "@/components/ui/PageHead";
import { Communion } from "@/components/ui/Communion";

export const metadata: Metadata = { title: "In Communion with the Church" };
export const revalidate = 300;

export default async function CommunionPage() {
  const eccl = await getDataClient().getEcclesiasticalDirectory();
  const pending = eccl.some((e) => !e.verifiedAt);

  return (
    <>
      <PageHead
        title="In Communion with the Church"
        latin="Tu es Petrus"
        image={{ src: "/images/art/cardinals-st-peters.jpg", position: "center 35%" }}
        lede="From the Apostles and the Holy See to our local chaplaincy."
      />
      <section className="section pattern-navy" style={{ background: "var(--navy)", color: "var(--ivory)", padding: "4rem 0" }}>
        <div className="wrap two-col" style={{ alignItems: "start" }}>
          <div className="prose" style={{ color: "var(--ivory)" }}>
            <h2 style={{ color: "#ffffff", marginTop: 0 }}>Our Lord and Our Lady</h2>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "#e0dacd" }}>
              <strong style={{ color: "var(--gold)" }}>Our Lord Jesus Christ</strong> is the divine founder and head of the Church.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "#e0dacd" }}>
              <strong style={{ color: "var(--gold)" }}>The Blessed Virgin Mary</strong>, Our Mother of Perpetual Help, holds a unique maternal place in
              Catholic devotion and is the loving spiritual patroness of this chaplaincy.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "#e0dacd" }}>
              The shepherds displayed here serve at different levels of the Church&rsquo;s life: the universal Church,
              the Holy See&rsquo;s representation in Nigeria, the ecclesiastical province, the local diocese and the
              chaplaincy. These are distinct hierarchical roles uniting our local altar with Rome and the Apostles.
            </p>
            {pending && (
              <div style={{ marginTop: "2rem" }}>
                <Awaiting>
                  <strong>Appointments change over time.</strong> These names were supplied by the chaplaincy. Official
                  Vatican and diocesan verification dates will be updated as appointments are published.
                </Awaiting>
              </div>
            )}
          </div>
          <div>
            <Communion entries={eccl} />
          </div>
        </div>
      </section>
    </>
  );
}
