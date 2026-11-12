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
          {/* Catechist Bulk Action Banner */}
          <div
            style={{
              background: "var(--paper)",
              border: "1.5px solid var(--gold)",
              borderRadius: "8px",
              padding: "1.25rem 1.5rem",
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gold-text)" }}>
                Catechist &amp; Altar Secretariat
              </span>
              <h3 style={{ margin: "0.2rem 0 0.35rem", fontSize: "1.15rem", color: "var(--navy)" }}>
                Have Multiple Sunday Announcements?
              </h3>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--muted)" }}>
                Instead of inserting notices one by one, use the single-box tool to type all announcements at once for the Projector and Website.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <Link
                href="/announcements/bulk"
                className="btn"
                style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
              >
                One-Box Announcements Editor →
              </Link>
              <Link
                href="/projector?tab=announcements"
                className="btn secondary"
                style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
              >
                Projector Mode →
              </Link>
            </div>
          </div>

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
