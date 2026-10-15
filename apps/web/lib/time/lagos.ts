/**
 * Chaplaincy calendar logic. The canonical timezone is Africa/Lagos (UTC+1, no DST).
 * Never derive the liturgical/schedule date from UTC midnight or the server's local zone.
 */
import type { Weekday } from "@/lib/types";

export const CHAPLAINCY_TZ = "Africa/Lagos";
const WEEKDAYS: Weekday[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

/** Calendar date (YYYY-MM-DD) in Africa/Lagos for a given instant. */
export function lagosDateString(instant: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CHAPLAINCY_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(instant);
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function isValidDateString(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

/** Weekday of a calendar date. Pure date arithmetic, independent of any timezone. */
export function weekdayOf(dateStr: string): Weekday {
  const [y, m, d] = dateStr.split("-").map(Number);
  return WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
}

/** 1..5: which occurrence of its weekday this date is within its month. */
export function nthWeekdayOfMonth(dateStr: string): number {
  const day = Number(dateStr.split("-")[2]);
  return Math.floor((day - 1) / 7) + 1;
}

export function addDays(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}

/** Convert a Lagos wall-clock date + "HH:MM" to a UTC instant. Lagos is a fixed UTC+1 offset. */
export function lagosWallClockToInstant(dateStr: string, hhmm: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = hhmm.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh - 1, mm));
}

/** "06:20" -> "6:20 AM" */
export function formatTime12(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatLongDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/**
 * Countdown to an event start. Returns null when the event has already started or the
 * start is invalid, so expired countdowns are never shown.
 */
export function countdownTo(startsAt: string, now: Date = new Date()) {
  const start = new Date(startsAt).getTime();
  if (Number.isNaN(start)) return null;
  const ms = start - now.getTime();
  if (ms <= 0) return null;
  const mins = Math.floor(ms / 60000);
  return { days: Math.floor(mins / 1440), hours: Math.floor((mins % 1440) / 60), minutes: mins % 60 };
}

/** ISO instant -> value for <input type="datetime-local"> in Africa/Lagos wall-clock time. */
export function isoToLagosLocal(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CHAPLAINCY_TZ, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(d);
  const g = (t: string) => parts.find((p) => p.type === t)!.value;
  return `${g("year")}-${g("month")}-${g("day")}T${g("hour")}:${g("minute")}`;
}

/** Value of <input type="datetime-local"> entered in Lagos time -> ISO instant. Null when empty/invalid. */
export function lagosLocalToIso(local: string | null | undefined): string | null {
  if (!local) return null;
  const m = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(local);
  if (!m || !isValidDateString(m[1])) return null;
  return lagosWallClockToInstant(m[1], m[2]).toISOString();
}
