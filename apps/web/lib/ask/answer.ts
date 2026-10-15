import { searchDoctrine } from "@/lib/doctrine";
import { triage, SAFETY_MESSAGE, type SafetyKind } from "./safety";
import type { AnswerProvider, Citation } from "./provider";

export type AskResult =
  | { kind: "safety"; safety: SafetyKind; message: string }
  | { kind: "library"; matches: { id: string; question: string; snippet: string }[] }
  | { kind: "magisterium"; text: string; citations: Citation[]; also: { id: string; question: string }[] }
  | { kind: "none"; message: string };

/** A library match must clear this score to count as an answer (see searchDoctrine weights). */
export const LIBRARY_THRESHOLD = 12;

export const NONE_MESSAGE =
  "We do not yet have a reviewed answer to that question. Please browse the questions and answers, or speak to a priest after Mass.";

export const MAX_QUESTION = 500;

export function validateQuestion(input: unknown): { ok: true; q: string } | { ok: false; error: string } {
  if (typeof input !== "string") return { ok: false, error: "Please type your question." };
  const q = input.replace(/\s+/g, " ").trim();
  if (q.length < 3) return { ok: false, error: "Please type your question." };
  if (q.length > MAX_QUESTION) return { ok: false, error: `Please keep your question under ${MAX_QUESTION} characters.` };
  return { ok: true, q };
}

/** Order: safety, then our own library, then the provider (if configured), then an honest "not yet". */
export async function answerQuestion(q: string, provider: AnswerProvider | null): Promise<AskResult> {
  const safety = triage(q);
  if (safety) return { kind: "safety", safety, message: SAFETY_MESSAGE[safety] };

  const hits = searchDoctrine(q, { limit: 4 });
  const good = hits.filter((h) => h.score >= LIBRARY_THRESHOLD);
  const toMatch = (h: (typeof hits)[number]) => ({ id: h.entry.id, question: h.entry.question, snippet: h.entry.answer.split(/\n{2,}/)[0].slice(0, 240) });
  if (good.length) return { kind: "library", matches: good.map(toMatch) };

  if (provider) {
    try {
      const r = await provider.answer(q);
      return { kind: "magisterium", text: r.text, citations: r.citations, also: hits.slice(0, 2).map((h) => ({ id: h.entry.id, question: h.entry.question })) };
    } catch {
      /* fall through to the honest fallback */
    }
  }
  return { kind: "none", message: NONE_MESSAGE };
}
