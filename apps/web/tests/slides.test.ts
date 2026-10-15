import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { SLIDES } from "@/lib/slides";
import { MEDIA, PORTRAITS } from "@/lib/media";

describe("hero slides", () => {
  it("has unique ids and a starting identity slide", () => {
    expect(new Set(SLIDES.map((s) => s.id)).size).toBe(SLIDES.length);
    expect(SLIDES[0].kind).toBe("identity");
  });
  it("every inscription slide has Latin, an English translation and a source", () => {
    for (const s of SLIDES.filter((x) => x.kind === "inscription")) {
      expect(s.latin && s.english && s.source).toBeTruthy();
    }
  });
  it("every built-in slide image exists on disk and has alt text", () => {
    for (const s of SLIDES) {
      for (const im of [s.image, s.background].filter(Boolean)) {
        expect(im!.alt.length).toBeGreaterThan(10);
        expect(existsSync(path.join(__dirname, "../public", im!.src)), im!.src).toBe(true);
      }
    }
  });
});

describe("media registry", () => {
  it("has alt text and a rights status for every item", () => {
    for (const m of Object.values(MEDIA)) {
      expect(m.alt.length).toBeGreaterThan(10);
      expect(["public-domain-art", "confirmed", "to-confirm"]).toContain(m.rights);
    }
  });
  it("portraits exist on disk", () => {
    for (const p of Object.values(PORTRAITS)) {
      expect(existsSync(path.join(__dirname, "../public", p.src)), p.src).toBe(true);
    }
  });
});
