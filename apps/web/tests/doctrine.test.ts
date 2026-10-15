import { describe, it, expect } from "vitest";
import { allDoctrine, searchDoctrine, DOCTRINE_CATEGORIES } from "@/lib/doctrine";

const PREFIX: Record<string, string> = {
  "god-trinity-creation": "gtc-", "jesus-christ": "jc-", "church-and-hierarchy": "ch-", "mary-and-saints": "ms-",
  "sacraments-initiation-healing": "sih-", "sacraments-service-and-liturgy": "ssl-", "scripture-and-tradition": "st-",
  "moral-life": "ml-", "prayer-and-spiritual-life": "psl-", "last-things-and-apologetics": "lta-",
};

describe("doctrine library", () => {
  const all = allDoctrine();
  it("has unique ids", () => expect(new Set(all.map((e) => e.id)).size).toBe(all.length));
  it("uses known categories and matching id prefixes", () => {
    const slugs = DOCTRINE_CATEGORIES.map((c) => c.slug);
    for (const e of all) {
      expect(slugs).toContain(e.category);
      expect(e.id.startsWith(PREFIX[e.category])).toBe(true);
    }
  });
  it("gives every entry a question, an answer, a source and keywords", () => {
    for (const e of all) {
      expect(e.question.trim().length).toBeGreaterThan(5);
      expect(e.answer.trim().length).toBeGreaterThan(100);
      expect(e.sources.length).toBeGreaterThan(0);
      expect(e.keywords.length).toBeGreaterThanOrEqual(3);
    }
  });
  it("returns nothing for an empty or stop-word query", () => {
    expect(searchDoctrine("")).toEqual([]);
    expect(searchDoctrine("the of a")).toEqual([]);
  });
});
