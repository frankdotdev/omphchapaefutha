import type { Metadata } from "next";
import { getDataClient } from "@/lib/data";
import { PageHead, Awaiting } from "@/components/ui/PageHead";
import { MassIntentionForm } from "@/components/forms/MassIntentionForm";

export const metadata: Metadata = { title: "Offer a Mass Intention" };
export const revalidate = 300;

export default async function OfferPage() {
  const db = getDataClient();
  const [options, offering] = await Promise.all([db.getMassOptions(), db.getOfferingInfo()]);
  return (
    <>
      <PageHead title="Offer a Mass Intention" latin="Hoc facite" image={{ src: "/images/art/church-interior.jpg", position: "center 40%" }} lede="Ask that a Mass be offered for a particular intention." crumbs={[{ href: "/mass-intentions", label: "Mass Intentions" }]} />
      <section className="section">
        <div className="wrap">
          <div style={{ marginBottom: "2rem" }}>
            <Awaiting>
              <strong>How it works.</strong> After you submit, you receive a reference number. The office verifies the
              offering and approves the intention before it is scheduled and shown publicly. Your preferred date and
              Mass are requests, not confirmed bookings. Your phone or email is private and never published.
            </Awaiting>
          </div>
          <MassIntentionForm options={options} offering={offering} />
        </div>
      </section>
    </>
  );
}
