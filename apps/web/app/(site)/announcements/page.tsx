import type { Metadata } from "next";
import Link from "next/link";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";
import { SubmissionWhatsAppBanner } from "@/components/ui/SubmissionWhatsAppBanner";

export const metadata: Metadata = {
  title: "Announcements — Chaplaincy Notices & Pastoral Bulletins",
  description: "Official weekly announcements and notices from Our Mother of Perpetual Help Catholic Chaplaincy, AE-FUTHA.",
};

export const revalidate = 60;

export default async function AnnouncementsPage() {
  const items = await getDataClient().getAnnouncements(50);
  return (
    <>
      <PageHead title="Announcements" latin="Verbum Domini" lede="Official notices and announcements from the chaplaincy." />
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

          {/* WhatsApp Submission Banner */}
          <SubmissionWhatsAppBanner type="announcement" />
        </div>
      </section>
    </>
  );
}
