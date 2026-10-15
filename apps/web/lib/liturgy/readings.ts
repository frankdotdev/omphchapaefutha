import type { DailyReadings } from "@/lib/types";
import { getCuratedDailyReadings } from "./daily-readings-data";

/**
 * Readings are served through a provider so the source can change without touching the UI.
 *  - StaffEnteredProvider: references/text typed in by authorised staff (reads through the DataClient)
 *  - CuratedProvider: in-page Roman lectionary scriptures with Douay-Rheims/Vulgate public domain texts
 *  - LinkOutProvider: links to external publishers (USCCB)
 */
export interface ReadingsLink { label: string; href: string; note: string }

/** USCCB explicitly allows plain (unframed) links to its readings. These follow the US lectionary. */
export function readingsLinks(isoDate: string): ReadingsLink[] {
  const [y, m, d] = isoDate.split("-");
  return [{
    label: "Read today's Mass readings on the USCCB website",
    href: `https://bible.usccb.org/bible/readings/${m}${d}${y.slice(2)}.cfm`,
    note: "Opens in the publisher's site. Follows the United States lectionary; wording may differ slightly from the book used at the chaplaincy.",
  }];
}

export type ReadingsResult =
  | { kind: "staff"; readings: DailyReadings; links?: ReadingsLink[] }
  | { kind: "curated"; readings: DailyReadings; links: ReadingsLink[] }
  | { kind: "link"; links: ReadingsLink[] };

export function resolveReadings(
  isoDate: string,
  staff: DailyReadings | null,
  options: { allowCuratedFallback?: boolean } = {}
): ReadingsResult {
  if (staff) {
    return { kind: "staff", readings: staff, links: readingsLinks(isoDate) };
  }
  if (options.allowCuratedFallback) {
    const curated = getCuratedDailyReadings(isoDate);
    return { kind: "curated", readings: curated, links: readingsLinks(isoDate) };
  }
  return { kind: "link", links: readingsLinks(isoDate) };
}
