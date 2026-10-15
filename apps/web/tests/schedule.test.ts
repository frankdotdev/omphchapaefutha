import { describe, expect, it } from "vitest";
import { resolveSchedule } from "@/lib/schedule";
import {
  addDays,
  countdownTo,
  formatTime12,
  isValidDateString,
  lagosDateString,
  lagosWallClockToInstant,
  nthWeekdayOfMonth,
  weekdayOf,
} from "@/lib/time/lagos";
import { SEED_RECURRING } from "@/lib/data/seed";
import type { ScheduleException } from "@/lib/types";

describe("Africa/Lagos date handling", () => {
  it("uses the Lagos calendar day, not UTC, across midnight", () => {
    // 23:30 UTC on 12 Oct is 00:30 on 13 Oct in Lagos (UTC+1)
    expect(lagosDateString(new Date("2026-10-12T23:30:00Z"))).toBe("2026-10-13");
    // 22:59 UTC is still 23:59 on the 12th in Lagos
    expect(lagosDateString(new Date("2026-10-12T22:59:00Z"))).toBe("2026-10-12");
  });
  it("handles leap days and month/year rollover", () => {
    expect(isValidDateString("2028-02-29")).toBe(true);
    expect(isValidDateString("2027-02-29")).toBe(false);
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
  });
  it("computes weekday and nth weekday of month", () => {
    expect(weekdayOf("2026-10-13")).toBe("tue");
    expect(nthWeekdayOfMonth("2026-10-17")).toBe(3); // third Saturday
    expect(nthWeekdayOfMonth("2026-10-03")).toBe(1);
  });
  it("converts Lagos wall-clock to the right instant", () => {
    expect(lagosWallClockToInstant("2026-10-13", "06:20").toISOString()).toBe("2026-10-13T05:20:00.000Z");
  });
  it("formats 12-hour times", () => {
    expect(formatTime12("06:20")).toBe("6:20 AM");
    expect(formatTime12("15:15")).toBe("3:15 PM");
    expect(formatTime12("12:00")).toBe("12:00 PM");
    expect(formatTime12("00:05")).toBe("12:05 AM");
  });
});

describe("countdown", () => {
  it("returns null once the event has started", () => {
    expect(countdownTo("2026-10-13T10:00:00Z", new Date("2026-10-13T10:00:00Z"))).toBeNull();
    expect(countdownTo("2026-10-13T10:00:00Z", new Date("2026-10-14T00:00:00Z"))).toBeNull();
  });
  it("returns null for invalid input", () => {
    expect(countdownTo("not-a-date")).toBeNull();
  });
  it("counts down for a future event", () => {
    expect(countdownTo("2026-10-15T12:30:00Z", new Date("2026-10-13T10:00:00Z"))).toEqual({
      days: 2,
      hours: 2,
      minutes: 30,
    });
  });
});

describe("schedule resolution (seed data from the project owner)", () => {
  const labels = (d: string, ex: ScheduleException[] = []) =>
    resolveSchedule(d, SEED_RECURRING, ex).map((e) => `${e.startTime ?? "—"} ${e.label}`);

  it("Sunday has the four supplied Masses/devotions plus catechism", () => {
    expect(labels("2026-10-18")).toEqual([
      "06:30 First Mass",
      "08:30 Second Mass",
      "16:00 Catechism Classes",
      "17:00 Sunday Benediction",
      "17:30 Evening Mass",
    ]);
  });
  it("Monday/Tuesday/Wednesday/Friday have morning and afternoon Mass", () => {
    for (const d of ["2026-10-12", "2026-10-13", "2026-10-14", "2026-10-16"]) {
      expect(labels(d)).toEqual(["06:20 Morning Mass", "15:15 Afternoon Mass"]);
    }
  });
  it("Thursday has Divine Mercy Mass at 3:00 PM and Adoration without an invented time", () => {
    expect(labels("2026-10-15")).toEqual(["06:20 Morning Mass", "15:00 Divine Mercy Mass", "— Adoration"]);
  });
  it("Saturday has morning Mass, Confessions, and catechism; baptism only on the third Saturday", () => {
    expect(labels("2026-10-10")).toEqual(["06:20 Morning Mass", "16:00 Catechism Classes", "— Confessions"]); // 2nd Saturday
    const third = labels("2026-10-17");
    expect(third).toContain("— Infant Baptism");
    expect(third).toContain("— Confessions");
  });
  it("a replace exception overrides only that date", () => {
    const thuDM = SEED_RECURRING.find((r) => r.weekday === "thu" && r.label === "Divine Mercy Mass")!;
    const ex: ScheduleException[] = [
      { id: "x1", onDate: "2026-10-15", kind: "replace", recurringScheduleId: thuDM.id, startTime: "17:00", note: "Feast celebration" },
    ];
    const special = resolveSchedule("2026-10-15", SEED_RECURRING, ex);
    expect(special.find((e) => e.label === "Divine Mercy Mass")).toMatchObject({ startTime: "17:00", status: "rescheduled" });
    // next Thursday is unaffected
    expect(labels("2026-10-22")).toContain("15:00 Divine Mercy Mass");
  });
  it("a cancel exception marks the entry cancelled", () => {
    const aft = SEED_RECURRING.find((r) => r.weekday === "tue" && r.label === "Afternoon Mass")!;
    const ex: ScheduleException[] = [{ id: "x2", onDate: "2026-10-13", kind: "cancel", recurringScheduleId: aft.id }];
    const r = resolveSchedule("2026-10-13", SEED_RECURRING, ex).find((e) => e.label === "Afternoon Mass");
    expect(r?.status).toBe("cancelled");
  });
  it("an add exception appears for that date", () => {
    const ex: ScheduleException[] = [{ id: "x3", onDate: "2026-12-25", kind: "add", label: "Christmas Mass", startTime: "07:00" }];
    expect(resolveSchedule("2026-12-25", SEED_RECURRING, ex).some((e) => e.label === "Christmas Mass")).toBe(true);
  });
});
