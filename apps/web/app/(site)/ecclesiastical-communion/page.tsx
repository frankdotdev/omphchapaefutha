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
      <PageHead title="In Communion with the Church" latin="Tu es Petrus" image={{ src: "/images/art/cardinals-st-peters.jpg", position: "center 35%" }} lede="From the Apostles to our local chaplaincy." />
      <section className="section light">
        <div className="wrap two-col">
          <div className="prose">
            <h2>Our Lord and Our Lady</h2>
            <p><strong>Our Lord Jesus Christ</strong> is the head of the Church.</p>
            <p>
              <strong>The Blessed Virgin Mary</strong>, Our Mother of Perpetual Help, holds a unique maternal place in
              Catholic devotion and is the spiritual patroness of this chaplaincy.
            </p>
            <p>
              The shepherds listed here serve at different levels of the Church&rsquo;s life: the universal Church,
              the Holy See&rsquo;s representation in Nigeria, the ecclesiastical province, the local diocese and the
              chaplaincy. These are distinct roles, not rungs of a single chain of command. For example, the Apostolic
              Nuncio represents the Holy See and is not the local bishop.
            </p>
            {pending && (
              <Awaiting>
                <strong>Appointments change over time.</strong> These names were supplied by the chaplaincy. Links to official
                Vatican, diocesan or episcopal sources and verification dates will be added as each appointment is confirmed.
              </Awaiting>
            )}
          </div>
          <Communion entries={eccl} />
        </div>
      </section>
    </>
  );
}
