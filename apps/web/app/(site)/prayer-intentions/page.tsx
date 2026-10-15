import type { Metadata } from "next";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";
import { PrayerForm } from "@/components/forms/PrayerForm";

export const metadata: Metadata = { title: "Prayer Intentions" };
export const revalidate = 60;

export default async function PrayerPage() {
  const published = await getDataClient().getPublicPrayerIntentions(20);
  return (
    <>
      <PageHead title="Prayer Intentions" latin="Petite, et dabitur vobis" image={{ src: "/images/art/rosary-bible.jpg", position: "center 55%" }} lede="Ask the chaplaincy community to pray with you. This service is free." />
      <section className="section">
        <div className="wrap two-col">
          <PrayerForm />
          <div>
            <h2>Intentions we are praying for</h2>
            {published.length === 0 ? (
              <p className="muted">No intentions are currently displayed.</p>
            ) : (
              <ul className="entries" style={{ display: "block" }}>
                {published.map((p) => (
                  <li key={p.id} style={{ display: "block" }}>
                    <p style={{ margin: 0 }}>{p.body}</p>
                    <p className="muted" style={{ margin: "0.25rem 0 0", fontSize: "0.9rem" }}>
                      {[p.category, p.displayName ?? "Anonymous"].filter(Boolean).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
