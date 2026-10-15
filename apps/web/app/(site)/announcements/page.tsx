import type { Metadata } from "next";
import Link from "next/link";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";

export const metadata: Metadata = { title: "Announcements" };
export const revalidate = 60;

export default async function AnnouncementsPage() {
  const items = await getDataClient().getAnnouncements(50);
  return (
    <>
      <PageHead title="Announcements" latin="Verbum Domini" lede="Official notices from the chaplaincy." />
      <section className="section">
        <div className="wrap">
          {items.length === 0 ? (
            <p className="muted">There are no announcements at the moment. Please check back soon.</p>
          ) : (
            <ul className="entries">
              {items.map((a) => (
                <li key={a.slug}>
                  <div className="meta">
                    <time dateTime={a.publishedAt}>{new Date(a.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" })}</time>
                    {a.category && <div>{a.category}</div>}
                  </div>
                  <div>
                    <h3><Link href={`/announcements/${a.slug}`}>{a.title}</Link></h3>
                    {a.excerpt && <p>{a.excerpt}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
