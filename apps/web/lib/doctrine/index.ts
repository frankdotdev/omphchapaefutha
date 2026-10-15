import type { DoctrineEntry } from "./types";
import { DOCTRINE_CATEGORIES } from "./types";
import reviewed from "@/data/doctrine/reviewed.json";

/**
 * The doctrine library is served from JSON files in data/doctrine (one per category).
 * `DoctrineSource` in this module is the seam: a database-backed or API-backed implementation
 * can replace the file loader without touching pages or the Ask a Padre route.
 */
import god from "@/data/doctrine/god-trinity-creation.json";
import jesus from "@/data/doctrine/jesus-christ.json";
import church from "@/data/doctrine/church-and-hierarchy.json";
import mary from "@/data/doctrine/mary-and-saints.json";
import sac1 from "@/data/doctrine/sacraments-initiation-healing.json";
import sac2 from "@/data/doctrine/sacraments-service-and-liturgy.json";
import scripture from "@/data/doctrine/scripture-and-tradition.json";
import moral from "@/data/doctrine/moral-life.json";
import prayer from "@/data/doctrine/prayer-and-spiritual-life.json";
import last from "@/data/doctrine/last-things-and-apologetics.json";

export { DOCTRINE_CATEGORIES };
export type { DoctrineEntry };

const ALL: DoctrineEntry[] = ([god, jesus, church, mary, sac1, sac2, scripture, moral, prayer, last] as unknown as DoctrineEntry[][]).flat();
const reviewedIds = new Set<string>((reviewed as { reviewedIds: string[] }).reviewedIds);

export const allDoctrine = (): DoctrineEntry[] => ALL;
export const getDoctrineEntry = (id: string) => ALL.find((e) => e.id === id) ?? null;
export const isReviewed = (id: string) => reviewedIds.has(id);
export const reviewedCount = () => ALL.filter((e) => reviewedIds.has(e.id)).length;
export const categoryCounts = (): Record<string, number> => {
  const out: Record<string, number> = {};
  for (const e of ALL) out[e.category] = (out[e.category] ?? 0) + 1;
  return out;
};

export interface Scored { entry: DoctrineEntry; score: number }

const STOP = new Set("a an the is are was were be been do does did of to in on at for from by with and or but not no what why how who when where which can could should would may might will shall it its this that these those i you he she we they my your our their me us them as if so than then there here about into over under between does catholic catholics church say said teach teaches believe believes".split(" "));

const stem = (w: string) => (w.length > 4 ? w.replace(/ies$/, "y").replace(/(ing|ed|es|s)$/, "") : w);
export const tokens = (s: string): string[] =>
  s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((t) => t.length > 1 && !STOP.has(t)).map(stem);

/** Simple weighted keyword search: keywords > question > answer. Deterministic and dependency-free. */
export function searchDoctrine(query: string, opts: { category?: string; limit?: number } = {}): Scored[] {
  const q = tokens(query);
  if (!q.length) return [];
  const phrase = query.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  const out: Scored[] = [];
  for (const e of ALL) {
    if (opts.category && e.category !== opts.category) continue;
    const kw = new Set(e.keywords.flatMap(tokens));
    const qs = new Set(tokens(e.question));
    const as = new Set(tokens(e.answer));
    let score = 0;
    let matched = 0;
    for (const t of q) {
      let hit = 0;
      if (kw.has(t)) hit += 5;
      if (qs.has(t)) hit += 3;
      if (as.has(t)) hit += 1;
      if (hit) matched++;
      score += hit;
    }
    if (!matched) continue;
    score *= 0.5 + matched / q.length; // reward covering more of the query
    if (phrase.length > 4 && e.question.toLowerCase().includes(phrase)) score += 8;
    out.push({ entry: e, score });
  }
  return out.sort((a, b) => b.score - a.score).slice(0, opts.limit ?? 20);
}

export function relatedDoctrine(entry: DoctrineEntry, limit = 4): DoctrineEntry[] {
  const kw = new Set(entry.keywords);
  return ALL.filter((e) => e.id !== entry.id)
    .map((e) => ({ e, s: e.keywords.filter((k) => kw.has(k)).length + (e.category === entry.category ? 0.5 : 0) }))
    .filter((x) => x.s >= 1)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.e);
}

export function formatSource(s: DoctrineEntry["sources"][number]): string {
  switch (s.type) {
    case "ccc": return `Catechism of the Catholic Church, ${/[-–,]/.test(s.ref) ? "paragraphs" : "paragraph"} ${s.ref}`;
    case "scripture": return s.ref;
    case "canon": return `Code of Canon Law, ${s.ref}`;
    case "document": return [s.title, s.ref, s.year].filter(Boolean).join(", ");
  }
}
