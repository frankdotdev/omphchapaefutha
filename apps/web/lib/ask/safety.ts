/**
 * Safety triage runs BEFORE any retrieval or AI call. Messages that suggest self-harm, abuse or an emergency
 * are never answered with doctrine; the person is pointed to a priest and to emergency help.
 * This is deliberately conservative: a false alarm costs a kind referral, a miss costs far more.
 */
export type SafetyKind = "self-harm" | "abuse" | "emergency";

const PATTERNS: { kind: SafetyKind; re: RegExp }[] = [
  { kind: "self-harm", re: /\b(kill(ing)? myself|end(ing)? my life|want to die|wanna die|suicid\w*|self[- ]?harm|hurt(ing)? myself|cut(ting)? myself|no reason to live|better off dead)\b/i },
  { kind: "abuse", re: /\b(abus(e|ed|ing|er)|molest\w*|raped?|rap(ing)? me|sexually assault\w*|beats? me|beating me|domestic violence|being hit)\b/i },
  { kind: "emergency", re: /\b(overdos\w*|bleeding (heavily|badly)|can'?t breathe|chest pain|having a heart attack|in danger|someone is (attacking|threatening))\b/i },
];

export function triage(text: string): SafetyKind | null {
  for (const p of PATTERNS) if (p.re.test(text)) return p.kind;
  return null;
}

export const SAFETY_MESSAGE: Record<SafetyKind, string> = {
  "self-harm":
    "I am sorry you are carrying this. You matter, and you do not have to face it alone. Please speak to someone today: a priest, a trusted family member or friend, or a doctor. If you may act on these thoughts or are in danger now, call your local emergency number straight away. This tool cannot give you the care you need, but people near you can.",
  abuse:
    "I am sorry this is happening or has happened. It is not your fault. Please tell a trusted adult, and speak to a priest, a doctor or the police. If you are in danger now, call your local emergency number. A priest can also help you find safe support.",
  emergency:
    "This sounds urgent. Please call your local emergency number or get to the nearest hospital now. If you wish, ask for a priest to be called to be with you.",
};
