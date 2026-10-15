import Romcal from "romcal";
import { GeneralRoman_En, GeneralRoman_La } from "@romcal/calendar.general-roman";
import type { Celebration, LiturgicalColour, LiturgicalDay } from "@/lib/types";

/**
 * Liturgical day for a date, computed locally from the General Roman Calendar (romcal, MIT).
 * No network, no licensed text. IMPORTANT: this is the UNIVERSAL calendar. Proper celebrations specific to
 * Nigeria or to the Diocese of Abakaliki are not included and must be added by the chaplaincy
 * (see docs/content-sources.md).
 */
const cache = new Map<number, Promise<Record<string, any[]>>>();

function yearCalendar(year: number): Promise<Record<string, any[]>> {
  let p = cache.get(year);
  if (!p) {
    p = new Romcal({ localizedCalendar: GeneralRoman_En, scope: "gregorian" }).generateCalendar(year) as Promise<Record<string, any[]>>;
    cache.set(year, p);
  }
  return p;
}

const latinCache = new Map<number, Promise<Record<string, any[]>>>();
function latinCalendar(year: number): Promise<Record<string, any[]>> {
  let p = latinCache.get(year);
  if (!p) {
    p = new Romcal({ localizedCalendar: GeneralRoman_La, scope: "gregorian" }).generateCalendar(year) as Promise<Record<string, any[]>>;
    latinCache.set(year, p);
  }
  return p;
}

const SEASONS: Record<string, string> = {
  ADVENT: "Advent", CHRISTMAS_TIME: "Christmas Time", LENT: "Lent", HOLY_WEEK: "Holy Week", EASTER_TRIDUUM: "Easter Triduum",
  EASTER_TIME: "Easter Time", ORDINARY_TIME: "Ordinary Time", EARLY_ORDINARY_TIME: "Ordinary Time", LATE_ORDINARY_TIME: "Ordinary Time",
};
const RANK_ORDER = ["TRIDUUM", "SOLEMNITY", "SUNDAY", "HOLY_WEEK_WEEKDAY", "FEAST", "MEMORIAL", "WEEKDAY", "OPTIONAL_MEMORIAL"];

/** `date` must be a Lagos calendar date, YYYY-MM-DD. */
export async function getLiturgicalDay(date: string): Promise<LiturgicalDay | null> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const year = Number(date.slice(0, 4));
  const [en, la] = await Promise.all([yearCalendar(year), latinCalendar(year).catch(() => ({}) as Record<string, any[]>)]);
  const entries = en[date];
  if (!entries?.length) return null;
  const latin = new Map<string, string>((la[date] ?? []).map((e: any) => [e.id, e.name]));

  const sorted = [...entries].sort((a, b) => RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank));
  const principal = sorted[0];
  const celebrations: Celebration[] = sorted.map((e) => ({
    id: e.id,
    name: e.name,
    latinName: latin.get(e.id),
    rank: e.rank,
    isOptional: e.rank === "OPTIONAL_MEMORIAL",
  }));
  return {
    date,
    season: SEASONS[principal.seasons?.[0]] ?? String(principal.seasons?.[0] ?? "").replace(/_/g, " ").toLowerCase(),
    colour: (principal.colors?.[0] as LiturgicalColour | undefined) ?? null,
    sundayCycle: principal.cycles?.sundayCycle ? String(principal.cycles.sundayCycle).replace("YEAR_", "Year ") : null,
    celebrations,
  };
}

export const RANK_LABEL: Record<string, string> = {
  SOLEMNITY: "Solemnity", FEAST: "Feast", MEMORIAL: "Memorial", OPTIONAL_MEMORIAL: "Optional memorial", SUNDAY: "Sunday", WEEKDAY: "Weekday", LOCAL: "Local celebration", TRIDUUM: "Easter Triduum", HOLY_WEEK_WEEKDAY: "Holy Week",
};
export const COLOUR_LABEL: Record<string, string> = { WHITE: "White", RED: "Red", GREEN: "Green", PURPLE: "Violet", ROSE: "Rose", GOLD: "Gold", BLACK: "Black" };
