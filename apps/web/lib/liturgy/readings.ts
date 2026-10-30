import type { DailyReadings } from "@/lib/types";
import { getCuratedDailyReadings } from "./daily-readings-data";
import { fetchLiveDailyReadings } from "./auto-readings";

export interface ReadingsLink { label: string; href: string; note: string }

/** USCCB explicitly allows plain (unframed) links to its readings. */
export function readingsLinks(isoDate: string): ReadingsLink[] {
  const [y, m, d] = isoDate.split("-");
  return [{
    label: "Read today's Mass readings on the official USCCB website",
    href: `https://bible.usccb.org/bible/readings/${m}${d}${y.slice(2)}.cfm`,
    note: "Opens in the publisher's portal. Follows the official Lectionary for Mass.",
  }];
}

export type ReadingsResult =
  | { kind: "staff"; readings: DailyReadings; links: ReadingsLink[] }
  | { kind: "live"; readings: DailyReadings; links: ReadingsLink[] }
  | { kind: "curated"; readings: DailyReadings; links: ReadingsLink[] }
  | { kind: "link"; links: ReadingsLink[] };

/**
 * Multi-tier readings resolver:
 * 1. Staff-entered custom readings in Admin (top priority)
 * 2. Automated live readings fetched and cached for the day
 * 3. Curated Catholic public domain scripture lectionary
 * 4. Fallback link-out and interactive readings viewer
 */
export async function resolveReadings(
  isoDate: string,
  staff: DailyReadings | null,
  options: { allowCuratedFallback?: boolean } = {}
): Promise<ReadingsResult> {
  const links = readingsLinks(isoDate);

  if (staff && (staff.gospel || staff.firstReading)) {
    return { kind: "staff", readings: staff, links };
  }

  // 2. Automated live readings feed
  try {
    const live = await fetchLiveDailyReadings(isoDate);
    if (live && (live.gospel || live.firstReading)) {
      return { kind: "live", readings: live, links };
    }
  } catch (err) {
    // Continue to next tier
  }

  // 3. Curated local readings
  if (options.allowCuratedFallback) {
    const curated = getCuratedDailyReadings(isoDate);
    if (curated) {
      return { kind: "curated", readings: curated, links };
    }
  }

  // 4. Fallback
  return { kind: "link", links };
}
