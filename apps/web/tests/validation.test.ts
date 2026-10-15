import { describe, expect, it } from "vitest";
import { validateMassIntention, validatePrayer } from "@/lib/validation";

describe("Mass intention validation", () => {
  const today = "2026-10-13";
  it("accepts a normal submission", () => {
    expect(validateMassIntention({ text: "For the repose of John", preferredDate: "2026-10-20", contact: "0800" }, today)).toEqual({});
  });
  it("rejects empty text, past dates and missing contact", () => {
    const e = validateMassIntention({ text: "  ", preferredDate: "2026-10-01", contact: "" }, today);
    expect(Object.keys(e).sort()).toEqual(["contact", "preferredDate", "text"]);
  });
  it("allows no preferred date", () => {
    expect(validateMassIntention({ text: "Thanksgiving", preferredDate: "", contact: "a@b.c" }, today)).toEqual({});
  });
  it("rejects over-long text", () => {
    expect(validateMassIntention({ text: "x".repeat(1001), preferredDate: "", contact: "1" }, today).text).toBeTruthy();
  });
});

describe("Prayer validation", () => {
  it("requires a name unless anonymous, and consent", () => {
    expect(validatePrayer({ body: "Healing", anonymous: false, name: "", consent: true }).name).toBeTruthy();
    expect(validatePrayer({ body: "Healing", anonymous: true, name: "", consent: false }).consent).toBeTruthy();
    expect(validatePrayer({ body: "Healing", anonymous: true, name: "", consent: true })).toEqual({});
  });
});
