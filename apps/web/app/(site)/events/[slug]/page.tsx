import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";
import { countdownTo } from "@/lib/time/lagos";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = await getDataClient().getEvent(slug);
  return { title: e?.title ?? "Event" };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const e = await getDataClient().getEvent(slug);
  if (!e) notFound();
  const cd = e.countdownEnabled && !e.isCancelled ? countdownTo(e.startsAt) : null;
  return (
    <>
      <PageHead title={e.title} crumbs={[{ href: "/events", label: "Events" }]} />
      <section className="section">
        <div className="wrap prose">
          {e.isCancelled && <p><strong>This event has been cancelled.</strong></p>}
          <dl className="facts">
            <dt>Date</dt>
            <dd>{new Date(e.startsAt).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: e.timezone })}</dd>
            <dt>Time</dt>
            <dd>{new Date(e.startsAt).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: e.timezone })}</dd>
            {e.venue && (<><dt>Venue</dt><dd>{e.venue}</dd></>)}
            {e.organizer && (<><dt>Organizer</dt><dd>{e.organizer}</dd></>)}
            {cd && (<><dt>Starts in</dt><dd>{cd.days} days, {cd.hours} hours, {cd.minutes} minutes</dd></>)}
          </dl>
          {e.description && e.description.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>
    </>
  );
}
