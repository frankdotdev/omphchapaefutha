import { describe, it, expect } from "vitest";
import { applyOverrides, overridesForDate } from "@/lib/liturgy/overrides";
import type { LiturgicalDay, LiturgicalOverride } from "@/lib/types";

const day: LiturgicalDay = { date: "2027-06-27", season: "Ordinary Time", colour: "GREEN", sundayCycle: null, celebrations: [{ id: "weekday", name: "Sunday", rank: "SUNDAY", isOptional: false }] };
const o = (p: Partial<LiturgicalOverride>): LiturgicalOverride => ({ id: "1", date: "2027-06-27", repeatsYearly: false, name: "Local feast", rank: "FEAST", mode: "add", ...p });

describe("local feast days", () => {
  it("matches exact dates and yearly repeats", () => {
    expect(overridesForDate([o({})], "2027-06-27")).toHaveLength(1);
    expect(overridesForDate([o({ date: "2020-06-27" })], "2027-06-27")).toHaveLength(0);
    expect(overridesForDate([o({ date: "2020-06-27", repeatsYearly: true })], "2027-06-27")).toHaveLength(1);
  });
  it("adds under the day's own celebration", () => {
    const r = applyOverrides(day, [o({})]);
    expect(r.celebrations.map((c) => c.name)).toEqual(["Sunday", "Local feast"]);
    expect(r.colour).toBe("GREEN");
  });
  it("replace makes it the headline and takes its colour, keeping the universal entry", () => {
    const r = applyOverrides(day, [o({ mode: "replace", colour: "WHITE" })]);
    expect(r.celebrations.map((c) => c.name)).toEqual(["Local feast", "Sunday"]);
    expect(r.colour).toBe("WHITE");
  });
  it("leaves the day untouched when nothing matches", () => expect(applyOverrides(day, [o({ date: "2027-01-01" })])).toBe(day));
});
