import type { RecurringSchedule, ScheduleEntry, ScheduleException } from "@/lib/types";
import { nthWeekdayOfMonth, weekdayOf } from "@/lib/time/lagos";

/**
 * Resolve what happens on a given Africa/Lagos calendar date.
 * Precedence: a date-specific exception ALWAYS overrides the recurring pattern, for that date only.
 */
export function resolveSchedule(
  dateStr: string,
  recurring: RecurringSchedule[],
  exceptions: ScheduleException[],
): ScheduleEntry[] {
  const wd = weekdayOf(dateStr);
  const nth = nthWeekdayOfMonth(dateStr);
  const todays = exceptions.filter((e) => e.onDate === dateStr);

  const entries: ScheduleEntry[] = [];

  for (const r of recurring) {
    if (r.weekday !== wd) continue;
    if (r.nthOfMonth != null && r.nthOfMonth !== nth) continue;

    const ex = todays.find((e) => e.recurringScheduleId === r.id && e.kind !== "add");
    if (ex?.kind === "cancel") {
      entries.push({
        key: r.id,
        label: r.label,
        startTime: r.startTime,
        note: ex.note ?? "Cancelled for this date",
        status: "cancelled",
      });
    } else if (ex?.kind === "replace") {
      entries.push({
        key: r.id,
        label: ex.label ?? r.label,
        startTime: ex.startTime ?? r.startTime,
        location: ex.location ?? r.location,
        note: ex.note ?? r.note,
        status: "rescheduled",
      });
    } else {
      entries.push({
        key: r.id,
        label: r.label,
        startTime: r.startTime,
        location: r.location,
        note: r.note,
        status: "regular",
      });
    }
  }

  for (const e of todays.filter((x) => x.kind === "add")) {
    entries.push({
      key: e.id,
      label: e.label ?? "Special celebration",
      startTime: e.startTime ?? null,
      location: e.location,
      note: e.note,
      status: "added",
    });
  }

  // Timed entries in clock order; untimed ones (e.g. Adoration "follows the Mass") keep their place after.
  const order = new Map(recurring.map((r) => [r.id, r.sortOrder]));
  return entries.sort((a, b) => {
    if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
    if (a.startTime) return -1;
    if (b.startTime) return 1;
    return (order.get(a.key) ?? 99) - (order.get(b.key) ?? 99);
  });
}
