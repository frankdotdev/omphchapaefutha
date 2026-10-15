import type { Metadata } from "next";
import { getDataClient } from "@/lib/data";
import { PageHead, Awaiting } from "@/components/ui/PageHead";

export const metadata: Metadata = { title: "Contact" };
export const revalidate = 300;

export default async function ContactPage() {
  const c = await getDataClient().getContact();
  const has = c.address || c.phone || c.email;
  return (
    <>
      <PageHead title="Contact and Location" latin="Pax vobis" lede="Reach the chaplaincy office." />
      <section className="section">
        <div className="wrap prose">
          {has ? (
            <dl className="facts">
              {c.address && (<><dt>Address</dt><dd>{c.address}</dd></>)}
              {c.phone && (<><dt>Telephone</dt><dd>{c.phone}</dd></>)}
              {c.email && (<><dt>Email</dt><dd><a href={`mailto:${c.email}`}>{c.email}</a></dd></>)}
              {c.mapsUrl && (<><dt>Directions</dt><dd><a href={c.mapsUrl}>Open in maps</a></dd></>)}
            </dl>
          ) : (
            <Awaiting>
              <strong>Contact details to be confirmed.</strong> The chaplaincy&rsquo;s address, telephone and email
              will be published here once supplied and approved. We do not publish unverified contact information.
            </Awaiting>
          )}
        </div>
      </section>
    </>
  );
}
