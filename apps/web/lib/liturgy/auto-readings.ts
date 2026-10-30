import type { DailyReadings } from "@/lib/types";

/**
 * In-memory 24-hour cache for live daily readings per Lagos calendar date (YYYY-MM-DD).
 */
const readingsCache = new Map<string, { readings: DailyReadings; cachedAt: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function decodeHtml(html: string): string {
  return html
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+\n/g, "\n\n")
    .trim();
}

/**
 * Robust parser for USCCB Daily Mass readings HTML page.
 */
function parseUsccbHtml(html: string, date: string): DailyReadings | null {
  try {
    // Strip script and style blocks
    const clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

    const getSection = (headingRegex: RegExp, nextHeadingRegex: RegExp): { ref: string; text: string } | undefined => {
      const match = clean.match(headingRegex);
      if (!match || match.index === undefined) return undefined;
      const start = match.index + match[0].length;
      const after = clean.slice(start);
      const nextMatch = after.match(nextHeadingRegex);
      const sectionHtml = nextMatch && nextMatch.index !== undefined ? after.slice(0, nextMatch.index) : after.slice(0, 4000);

      // Extract reference if present in an address or heading link
      const refMatch = sectionHtml.match(/<div class="[^"]*address[^"]*">([\s\S]*?)<\/div>/i) ||
                       sectionHtml.match(/<h[23456][^>]*>([\s\S]*?)<\/h[23456]>/i) ||
                       sectionHtml.match(/<a[^>]+>([A-Za-z0-9\s:,\-–]+)<\/a>/i);
      
      const ref = refMatch ? decodeHtml(refMatch[1]).replace(/Listen to podcast.*$/i, "").trim() : "";
      
      // Extract main content body
      const bodyMatch = sectionHtml.match(/<div class="[^"]*content-body[^"]*">([\s\S]*?)<\/div>/i);
      const rawText = bodyMatch ? bodyMatch[1] : sectionHtml;
      const text = decodeHtml(rawText);

      // Clean reference if it repeated in text
      const cleanedText = ref && text.startsWith(ref) ? text.slice(ref.length).trim() : text;

      if (!cleanedText && !ref) return undefined;
      return {
        ref: ref || "Daily Lectionary",
        text: cleanedText || text,
      };
    };

    const firstReading = getSection(
      /<h[234][^>]*>(?:Reading\s*(?:1|I)\b|FIRST\s+READING)/i,
      /<h[234][^>]*>(?:Responsorial\s+Psalm|Reading\s*(?:2|II)|Gospel)/i
    );

    const psalm = getSection(
      /<h[234][^>]*>(?:Responsorial\s+Psalm|PSALM)/i,
      /<h[234][^>]*>(?:Reading\s*(?:2|II)|Alleluia|Gospel\s+Acclamation|Gospel)/i
    );

    const secondReading = getSection(
      /<h[234][^>]*>(?:Reading\s*(?:2|II)\b|SECOND\s+READING)/i,
      /<h[234][^>]*>(?:Alleluia|Gospel\s+Acclamation|Gospel)/i
    );

    const gospel = getSection(
      /<h[234][^>]*>(?:Gospel\b|HOLY\s+GOSPEL)/i,
      /(?:<footer|<div class="[^"]*bottom|<h[234][^>]*>)/i
    );

    if (!gospel && !firstReading) return null;

    return {
      date,
      firstReading,
      psalm,
      secondReading,
      gospel,
      translation: "Official Catholic Lectionary (NABRE)",
      sourceNote: "Confraternity of Christian Doctrine, USCCB Lectionary for Mass.",
    };
  } catch (err) {
    console.error("Error parsing USCCB readings:", err);
    return null;
  }
}

/**
 * Live daily readings fetcher with automatic 24-hour Lagos midnight caching.
 */
export async function fetchLiveDailyReadings(isoDate: string): Promise<DailyReadings | null> {
  const cached = readingsCache.get(isoDate);
  const now = Date.now();
  if (cached && now - cached.cachedAt < CACHE_TTL_MS) {
    return cached.readings;
  }

  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return null;
  const mmddyy = `${m}${d}${y.slice(2)}`;
  const url = `https://bible.usccb.org/bible/readings/${mmddyy}.cfm`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 (Catholic Chaplaincy Web Lectionary)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 3600 }, // Next.js cache revalidation
    });

    clearTimeout(timeoutId);

    if (!response.ok) return null;
    const html = await response.text();
    const parsed = parseUsccbHtml(html, isoDate);

    if (parsed && (parsed.gospel || parsed.firstReading)) {
      readingsCache.set(isoDate, { readings: parsed, cachedAt: now });
      return parsed;
    }
  } catch (e) {
    // Network timeout or offline mode, fall back cleanly
  }

  return null;
}
