import type { Field, Resource } from "./resources";
import { isoToLagosLocal, lagosLocalToIso } from "@/lib/time/lagos";
import { slugify } from "./slug";

export type Row = Record<string, any>;
export type FormValues = Record<string, string | boolean>;

/** Database row -> form values (strings and booleans only). */
export function rowToForm(resource: Resource, row: Row | null): FormValues {
  const out: FormValues = {};
  for (const f of resource.fields) {
    const v = row ? row[f.name] : resource.defaults?.[f.name];
    if (f.type === "boolean") out[f.name] = Boolean(v);
    else if (f.type === "datetime") out[f.name] = isoToLagosLocal(v as string | null);
    else if (f.type === "time") out[f.name] = typeof v === "string" ? v.slice(0, 5) : "";
    else out[f.name] = v == null ? "" : String(v);
  }
  return out;
}

/** Form values -> database row. Empty optional fields become null; slugs are generated when blank. */
export function formToRow(resource: Resource, values: FormValues, existing: Row | null): Row {
  const row: Row = existing?.id ? { id: existing.id } : {};
  for (const f of resource.fields) {
    const raw = values[f.name];
    row[f.name] = convertField(f, raw);
  }
  if (resource.slugFrom && !row.slug) {
    row.slug = slugify(String(values[resource.slugFrom] ?? ""));
  }
  return row;
}

function convertField(f: Field, raw: string | boolean | undefined): unknown {
  if (f.type === "boolean") return Boolean(raw);
  const s = typeof raw === "string" ? raw.trim() : "";
  if (s === "") return f.required && (f.type === "text" || f.type === "textarea") ? "" : null;
  if (f.type === "number") return Number.isFinite(Number(s)) ? Number(s) : null;
  if (f.type === "datetime") return lagosLocalToIso(s);
  if (f.type === "time") return /^\d{2}:\d{2}$/.test(s) ? s : null;
  return s;
}

/** Returns field-level problems. The database remains the authority; this is for fast feedback. */
export function validateForm(resource: Resource, values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of resource.fields) {
    const v = values[f.name];
    if (f.required && f.type !== "boolean" && (typeof v !== "string" || v.trim() === "")) errors[f.name] = `${f.label} is required.`;
    if (f.type === "datetime" && typeof v === "string" && v !== "" && !lagosLocalToIso(v)) errors[f.name] = "Please enter a valid date and time.";
  }
  if (resource.key === "schedule-exceptions") {
    if (values.kind !== "add" && !values.recurring_schedule_id) errors.recurring_schedule_id = "Choose which regular activity this changes.";
    if (values.kind !== "cancel" && !values.start_time) errors.start_time = "A start time is required for this type of change.";
  }
  if (resource.key === "hero-slides") {
    const a = String(values.cta_label ?? "").trim();
    const b = String(values.cta_href ?? "").trim();
    if (Boolean(a) !== Boolean(b)) errors.cta_href = "Fill in both button fields, or leave both empty.";
    if (b && !/^\/[A-Za-z0-9/_\-?=&#.]*$/.test(b)) errors.cta_href = "The link must be a page on this site, starting with /.";
  }
  if (resource.key === "events") {
    const s = lagosLocalToIso(String(values.starts_at ?? ""));
    const e = lagosLocalToIso(String(values.ends_at ?? ""));
    if (s && e && e < s) errors.ends_at = "The end must be after the start.";
  }
  return errors;
}
