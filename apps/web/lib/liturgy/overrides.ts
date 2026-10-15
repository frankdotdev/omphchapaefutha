import type { Celebration, LiturgicalDay, LiturgicalOverride } from "@/lib/types";

export function overridesForDate(all: LiturgicalOverride[], date: string): LiturgicalOverride[] {
  return all.filter((o) => (o.repeatsYearly ? o.date.slice(5) === date.slice(5) : o.date === date));
}

/**
 * Merges staff-entered celebrations into the computed day. "replace" makes the entry the day's main celebration
 * (and its colour, if given, the day's colour); "add" lists it under "Also today". The universal entries are
 * kept (after a replacement they appear under "Also today") so nothing is silently hidden.
 */
export function applyOverrides(day: LiturgicalDay, all: LiturgicalOverride[]): LiturgicalDay {
  const mine = overridesForDate(all, day.date);
  if (!mine.length) return day;
  const toCelebration = (o: LiturgicalOverride): Celebration => ({
    id: `local_${o.id}`, name: o.name, latinName: o.latinName, rank: o.rank, isOptional: o.rank === "OPTIONAL_MEMORIAL", note: o.note,
  });
  const replacing = mine.filter((o) => o.mode === "replace");
  const adding = mine.filter((o) => o.mode === "add");
  const celebrations = [...replacing.map(toCelebration), ...day.celebrations, ...adding.map(toCelebration)];
  const colour = replacing.find((o) => o.colour)?.colour ?? day.colour;
  return { ...day, celebrations, colour };
}
