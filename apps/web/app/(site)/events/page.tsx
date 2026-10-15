import type { Metadata } from "next";
import Link from "next/link";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";

export const metadata: Metadata = { title: "Events" };
export const revalidate = 60;

export default async function EventsPage() {
  const events = await getDataClient().getUpcomingEvents(50);
  return (
    <>
      <PageHead title="Events" latin="Venite, exsultemus Domino" lede="Upcoming celebrations, retreats and gatherings." />
      <section className="section">
        <div className="wrap">
          {events.length === 0 ? (
            <p className="muted">No upcoming events have been published yet.</p>
          ) : (
            <ul className="entries">
              {events.map((e) => (
                <li key={e.slug}>
                  <div className="meta">
                    {new Date(e.startsAt).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: e.timezone })}
                    <div>{new Date(e.startsAt).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: e.timezone })}</div>
                  </div>
                  <div>
                    <h3><Link href={`/events/${e.slug}`}>{e.title}</Link>{e.isCancelled && " (cancelled)"}</h3>
                    {e.venue && <p className="muted">{e.venue}</p>}
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
