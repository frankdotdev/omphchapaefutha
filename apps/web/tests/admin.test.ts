import { describe, expect, it } from "vitest";
import { RESOURCES, ADMIN_NAV, SETTING_KEYS, resourceByKey } from "@/lib/admin/resources";
import { formToRow, rowToForm, validateForm } from "@/lib/admin/convert";
import { slugify } from "@/lib/admin/slug";
import { isoToLagosLocal, lagosLocalToIso } from "@/lib/time/lagos";

describe("Lagos datetime-local conversion", () => {
  it("round-trips and uses UTC+1", () => {
    expect(lagosLocalToIso("2026-10-13T06:20")).toBe("2026-10-13T05:20:00.000Z");
    expect(isoToLagosLocal("2026-10-13T05:20:00.000Z")).toBe("2026-10-13T06:20");
    expect(isoToLagosLocal(lagosLocalToIso("2026-12-31T23:30"))).toBe("2026-12-31T23:30");
  });
  it("handles empty or invalid input", () => {
    expect(lagosLocalToIso("")).toBeNull();
    expect(lagosLocalToIso("2026-02-31T10:00")).toBeNull();
    expect(isoToLagosLocal(null)).toBe("");
  });
});

describe("slugify", () => {
  it("makes URL-safe slugs", () => {
    expect(slugify("Feast of Our Mother of Perpetual Help!")).toBe("feast-of-our-mother-of-perpetual-help");
    expect(slugify("  Café & Fellowship  ")).toBe("cafe-and-fellowship");
  });
});

describe("resource definitions", () => {
  it("have unique keys, a title field and valid permissions", () => {
    expect(new Set(RESOURCES.map((r) => r.key)).size).toBe(RESOURCES.length);
    for (const r of RESOURCES) {
      expect(r.permission).toMatch(/\.manage$/);
      expect(r.fields.length).toBeGreaterThan(2);
      for (const f of r.fields) {
        if (f.type === "select") expect(f.options?.length, `${r.key}.${f.name}`).toBeGreaterThan(1);
        if (f.type === "fk") expect(f.fk, `${r.key}.${f.name}`).toBeTruthy();
      }
    }
  });
  it("only references settings keys the public site reads", () => {
    const keys = SETTING_KEYS.map((s) => s.key);
    expect(keys).toEqual(expect.arrayContaining(["contact.address", "offering.amount", "offering.bank_instructions"]));
  });
  it("every nav item has a distinct href", () => {
    expect(new Set(ADMIN_NAV.map((n) => n.href)).size).toBe(ADMIN_NAV.length);
  });
});

describe("form conversion", () => {
  const ev = resourceByKey("events")!;
  it("converts a form to a row with Lagos times, blanks as null and a generated slug", () => {
    const values = { ...rowToForm(ev, null), title: "Feast Day Mass", starts_at: "2026-11-15T10:00", status: "published" };
    const row = formToRow(ev, values, null);
    expect(row.starts_at).toBe("2026-11-15T09:00:00.000Z");
    expect(row.ends_at).toBeNull();
    expect(row.slug).toBe("feast-day-mass");
    expect(row.is_featured).toBe(false);
  });
  it("keeps the id when editing", () => {
    expect(formToRow(ev, rowToForm(ev, { id: "x", title: "T", slug: "t", starts_at: "2026-11-15T09:00:00Z", status: "draft" }), { id: "x" }).id).toBe("x");
  });
  it("validates required fields and date order", () => {
    const e = validateForm(ev, { ...rowToForm(ev, null), title: "", starts_at: "2026-11-15T10:00", ends_at: "2026-11-15T09:00" });
    expect(e.title).toBeTruthy();
    expect(e.ends_at).toBeTruthy();
  });
  it("validates schedule changes and slide buttons", () => {
    const se = resourceByKey("schedule-exceptions")!;
    const bad = validateForm(se, { ...rowToForm(se, null), on_date: "2026-10-15", kind: "replace" });
    expect(bad.recurring_schedule_id && bad.start_time).toBeTruthy();
    const hs = resourceByKey("hero-slides")!;
    expect(validateForm(hs, { ...rowToForm(hs, null), latin: "Ave", english: "Hail", cta_label: "Go", cta_href: "https://evil.example" }).cta_href).toBeTruthy();
    expect(validateForm(hs, { ...rowToForm(hs, null), latin: "Ave", english: "Hail", cta_label: "Go", cta_href: "/events" }).cta_href).toBeUndefined();
  });
});
