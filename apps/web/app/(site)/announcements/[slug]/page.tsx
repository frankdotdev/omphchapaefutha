import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getDataClient().getAnnouncement(slug);
  return { title: a?.title ?? "Announcement", description: a?.excerpt ?? undefined };
}

export default async function AnnouncementPage({ params }: Props) {
  const { slug } = await params;
  const a = await getDataClient().getAnnouncement(slug);
  if (!a) notFound();
  return (
    <>
      <PageHead title={a.title} crumbs={[{ href: "/announcements", label: "Announcements" }]} />
      <section className="section">
        <div className="wrap prose">
          <p className="muted">
            <time dateTime={a.publishedAt}>{new Date(a.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" })}</time>
            {a.issuedBy ? ` · ${a.issuedBy}` : ""}
          </p>
          {/* Rendered as plain text paragraphs: never inject stored HTML. */}
          {a.body.split(/\n{2,}/).map((p, i) => (<p key={i}>{p}</p>))}
        </div>
      </section>
    </>
  );
}
