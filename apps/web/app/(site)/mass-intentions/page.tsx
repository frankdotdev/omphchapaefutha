import type { Metadata } from "next";
import Link from "next/link";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";
import { addDays, formatLongDate, isValidDateString, lagosDateString } from "@/lib/time/lagos";

export const metadata: Metadata = { title: "Mass Intentions" };
export const revalidate = 60;

type Props = { searchParams: Promise<{ date?: string }> };

export default async function MassIntentionsPage({ searchParams }: Props) {
  const { date } = await searchParams;
  const today = lagosDateString();
  const day = date && isValidDateString(date) ? date : today;
  const items = await getDataClient().getPublicMassIntentions(day);
  const groups = new Map<string, typeof items>();
  for (const i of items) {
    const k = i.activityName ?? "Mass";
    groups.set(k, [...(groups.get(k) ?? []), i]);
  }

  return (
    <>
      <PageHead title="Mass Intentions" latin="Hoc facite in meam commemorationem" image={{ src: "/images/art/church-interior.jpg", position: "center 40%" }} lede="Intentions offered at Mass, shown only after they have been approved." />
      <section className="section">
        <div className="wrap">
          <div className="btn-row" style={{ marginTop: 0, marginBottom: "2rem" }}>
            <Link className="btn" href="/mass-intentions/offer">Offer a Mass intention</Link>
            <Link className="btn secondary" href="/mass-intentions/status">Check my intention</Link>
          </div>
          <div className="date-nav">
            <Link className="text-link" href={`/mass-intentions?date=${addDays(day, -1)}`} rel="prev">Previous day</Link>
            <h2 style={{ margin: 0, fontSize: "1.6rem" }}>{formatLongDate(day)}</h2>
            <Link className="text-link" href={`/mass-intentions?date=${addDays(day, 1)}`} rel="next">Next day</Link>
            {day !== today && <Link className="text-link" href="/mass-intentions">Today</Link>}
          </div>
          {items.length === 0 ? (
            <p className="muted">No approved intentions are published for this date.</p>
          ) : (
            [...groups.entries()].map(([mass, list]) => (
              <div key={mass} style={{ marginBottom: "2rem" }}>
                <h3>{mass}</h3>
                <ol className="intention-list">
                  {list.map((i) => (
                    <li key={i.id}>
                      <div>
                        {i.text}
                        {i.displayName && <div className="by">Offered by {i.displayName}</div>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
