import { describe, it, expect } from "vitest";
import { triage } from "@/lib/ask/safety";
import { validateQuestion, answerQuestion, NONE_MESSAGE } from "@/lib/ask/answer";
import { parseMagisterium, type AnswerProvider } from "@/lib/ask/provider";
import { allow } from "@/lib/ask/rate-limit";

const stub: AnswerProvider = { name: "stub", answer: async () => ({ text: "An answer.", citations: [{ title: "CCC 1" }] }) };
const failing: AnswerProvider = { name: "bad", answer: async () => { throw new Error("down"); } };

describe("ask a padre", () => {
  it("triages self-harm, abuse and emergencies", () => {
    expect(triage("I want to die")).toBe("self-harm");
    expect(triage("my uncle abused me")).toBe("abuse");
    expect(triage("he has chest pain")).toBe("emergency");
    expect(triage("Why do Catholics pray to Mary?")).toBeNull();
  });
  it("never sends a safety message to the provider", async () => {
    let called = false;
    const spy: AnswerProvider = { name: "s", answer: async () => { called = true; return { text: "x", citations: [] }; } };
    const r = await answerQuestion("I want to kill myself", spy);
    expect(r.kind).toBe("safety");
    expect(called).toBe(false);
  });
  it("validates questions", () => {
    expect(validateQuestion("hi").ok).toBe(false);
    expect(validateQuestion(5).ok).toBe(false);
    expect(validateQuestion("x".repeat(501)).ok).toBe(false);
    expect(validateQuestion("  What is grace?  ")).toEqual({ ok: true, q: "What is grace?" });
  });
  it("uses the provider when the library has no match, and degrades honestly", async () => {
    expect((await answerQuestion("zzqx unmatched topic", stub)).kind).toBe("magisterium");
    const r = await answerQuestion("zzqx unmatched topic", failing);
    expect(r).toEqual({ kind: "none", message: NONE_MESSAGE });
    expect((await answerQuestion("zzqx unmatched topic", null)).kind).toBe("none");
  });
  it("parses provider output and drops unsafe urls", () => {
    const r = parseMagisterium({ choices: [{ message: { content: " Hi " } }], citations: [{ title: "A", url: "javascript:alert(1)" }, { title: "B", url: "https://x.org" }] });
    expect(r.text).toBe("Hi");
    expect(r.citations[0].url).toBeUndefined();
    expect(r.citations[1].url).toBe("https://x.org");
    expect(() => parseMagisterium({})).toThrow();
  });
  it("rate limits", () => {
    const k = "ip-test";
    for (let i = 0; i < 8; i++) expect(allow(k, 8, 1000, 1000)).toBe(true);
    expect(allow(k, 8, 1000, 1500)).toBe(false);
    expect(allow(k, 8, 1000, 2500)).toBe(true);
  });
});
