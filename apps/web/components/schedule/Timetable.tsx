import type { ScheduleEntry } from "@/lib/types";
import { formatTime12 } from "@/lib/time/lagos";

const FLAG: Record<ScheduleEntry["status"], string | null> = {
  regular: null,
  rescheduled: "Rescheduled",
  added: "Special",
  cancelled: "Cancelled",
};

export function Timetable({ entries, emptyText }: { entries: ScheduleEntry[]; emptyText?: string }) {
  if (entries.length === 0) {
    return <p className="muted">{emptyText ?? "No scheduled activities for this day."}</p>;
  }
  return (
    <ul className="timetable">
      {entries.map((e) => (
        <li key={e.key} data-status={e.status}>
          {e.startTime ? (
            <span className="time">{formatTime12(e.startTime)}</span>
          ) : (
            <span className="time untimed">After Mass</span>
          )}
          <span className="what">
            {e.label}
            {FLAG[e.status] && <span className="flag">{FLAG[e.status]}</span>}
          </span>
          {(e.note || e.location) && (
            <p className="note">{[e.location, e.note].filter(Boolean).join(" · ")}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
