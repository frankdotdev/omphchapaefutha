import type { Metadata } from "next";
import { getDataClient } from "@/lib/data";
import { resolveSchedule } from "@/lib/schedule";
import { Timetable } from "@/components/schedule/Timetable";
import { PageHead, Awaiting } from "@/components/ui/PageHead";
import { addDays, formatLongDate, lagosDateString, weekdayOf } from "@/lib/time/lagos";

export const metadata: Metadata = { title: "Mass Schedule", description: "Mass times and weekly activities at Our Mother of Perpetual Help Chaplaincy, AE-FUTHA." };
export const revalidate = 60;

const DAY_NAME: Record<string, string> = { sun: "Sunday", mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday" };

export default async function MassSchedulePage() {
  const db = getDataClient();
  const today = lagosDateString();
  const end = addDays(today, 6);
  const [recurring, exceptions] = await Promise.all([db.getRecurringSchedule(), db.getScheduleExceptions(today, end)]);

  // Next seven days starting today, so special-date changes are visible where they apply.
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i)).map((d) => ({
    date: d,
    entries: resolveSchedule(d, recurring, exceptions),
  }));

  return (
    <>
      <PageHead title="Mass Schedule" latin="Venite adoremus" image={{ src: "/images/art/st-peters-light.jpg", position: "center 30%" }} lede="The coming seven days at the chaplaincy, including any special changes." />
      <section className="section">
        <div className="wrap">
          <div className="week">
            {days.map((d) => (
              <div key={d.date}>
                <h3>
                  <span>{DAY_NAME[weekdayOf(d.date)]}<span className="muted" style={{ fontFamily: "var(--sans)", fontSize: "0.9rem", fontWeight: 400, marginLeft: "0.6rem" }}>{formatLongDate(d.date).replace(/^\w+,? /, "").replace(/ \d{4}$/, "")}</span></span>
                  {d.date === today && <span className="today-tag">Today</span>}
                </h3>
                <Timetable entries={d.entries} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: "3rem" }}>
            <Awaiting>
              <strong>Please note.</strong> This timetable was supplied by the chaplaincy office and is confirmed
              periodically. Confession times, Holy Days of Obligation and special celebrations are announced
              separately; please contact the chaplaincy office to confirm any arrangement.
            </Awaiting>
          </div>
        </div>
      </section>
    </>
  );
}
