import { describe, expect, it } from "vitest";
import { getLiturgicalDay } from "@/lib/liturgy/calendar";
import { readingsLinks, resolveReadings } from "@/lib/liturgy/readings";

describe("liturgical calendar", () => {
  it("resolves a memorial with its colour", async () => {
    const d = await getLiturgicalDay("2026-10-15");
    expect(d?.celebrations[0].name).toMatch(/Teresa of Jesus/);
    expect(d?.celebrations[0].rank).toBe("MEMORIAL");
    expect(d?.colour).toBe("WHITE");
  });
  it("lists the weekday and an optional memorial together", async () => {
    const d = await getLiturgicalDay("2026-10-14");
    expect(d?.celebrations.some((c) => c.isOptional)).toBe(true);
    expect(d?.season).toBe("Ordinary Time");
    // The weekday leads; the optional memorial is offered beneath it, and the colour is the weekday's.
    expect(d?.celebrations[0].rank).toBe("WEEKDAY");
    expect(d?.colour).toBe("GREEN");
  });
  it("ranks Christmas as a solemnity in white", async () => {
    const d = await getLiturgicalDay("2026-12-25");
    expect(d?.celebrations[0].rank).toBe("SOLEMNITY");
    expect(d?.colour).toBe("WHITE");
  });
  it("rejects malformed dates", async () => {
    expect(await getLiturgicalDay("not-a-date")).toBeNull();
  });
});

describe("readings provider", () => {
  it("links out (no copied text) when staff have not entered readings", () => {
    const r = resolveReadings("2026-10-15", null);
    expect(r.kind).toBe("link");
    expect(readingsLinks("2026-10-15")[0].href).toBe("https://bible.usccb.org/bible/readings/101526.cfm");
  });
  it("prefers staff-entered readings", () => {
    const r = resolveReadings("2026-10-15", { date: "2026-10-15", gospel: { ref: "Luke 11:47-54" }, sourceNote: "test" });
    expect(r.kind).toBe("staff");
  });
});
