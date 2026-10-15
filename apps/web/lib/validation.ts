export interface FieldErrors { [field: string]: string }

const clean = (s: string) => s.replace(/\s+/g, " ").trim();

export function validateMassIntention(v: { text: string; preferredDate: string; contact: string }, today: string): FieldErrors {
  const e: FieldErrors = {};
  const t = clean(v.text);
  if (t.length < 3) e.text = "Please state the intention.";
  else if (t.length > 1000) e.text = "Please keep the intention under 1000 characters.";
  if (v.preferredDate && v.preferredDate < today) e.preferredDate = "Please choose today or a future date.";
  if (!clean(v.contact)) e.contact = "A phone number or email is needed so the office can reach you about this intention.";
  return e;
}

export function validatePrayer(v: { body: string; anonymous: boolean; name: string; consent: boolean }): FieldErrors {
  const e: FieldErrors = {};
  const b = clean(v.body);
  if (b.length < 3) e.body = "Please write your prayer intention.";
  else if (b.length > 800) e.body = "Please keep the intention under 800 characters.";
  if (!v.anonymous && !clean(v.name)) e.name = "Please enter a name, or choose anonymous display.";
  if (!v.consent) e.consent = "Please confirm how your intention may be shared.";
  return e;
}
