import type { DailyReadings } from "@/lib/types";

/**
 * In-memory 24-hour cache for live daily readings per Lagos calendar date (YYYY-MM-DD).
 */
const readingsCache = new Map<string, { readings: DailyReadings; cachedAt: number }>();
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&rsquo;/gi, "’")
    .replace(/&lsquo;/gi, "‘")
    .replace(/&rdquo;/gi, "”")
    .replace(/&ldquo;/gi, "“")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/&hellip;/gi, "…")
    .replace(/&amp;/gi, "&")
    .replace(/&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|li|tr|h[1-6])>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Provider 1: Universalis JSONP Feed (Supports Africa.Nigeria Liturgical Calendar)
 * URL: https://universalis.com/Africa.Nigeria/YYYYMMDD/jsonpmass.js
 */
async function fetchFromUniversalis(isoDate: string): Promise<DailyReadings | null> {
  const yyyymmdd = isoDate.replace(/-/g, "");
  const urls = [
    `https://universalis.com/Africa.Nigeria/${yyyymmdd}/jsonpmass.js`,
    `https://universalis.com/${yyyymmdd}/jsonpmass.js`,
  ];

  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; OMPHChaplaincyLectionary/1.0)",
          Accept: "*/*",
        },
        next: { revalidate: 3600 },
      });
      clearTimeout(timeoutId);

      if (!res.ok) continue;
      const raw = await res.text();
      const startIdx = raw.indexOf("{");
      const endIdx = raw.lastIndexOf("}");
      if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) continue;

      const jsonStr = raw.slice(startIdx, endIdx + 1);
      const data = JSON.parse(jsonStr);

      const extractPart = (part: any): { ref: string; text: string } | undefined => {
        if (!part || (!part.text && !part.source)) return undefined;
        const ref = decodeHtmlEntities(String(part.source ?? part.heading ?? "")).replace(/\n+/g, " ").trim();
        const text = decodeHtmlEntities(String(part.text ?? ""));
        if (!text) return undefined;
        return {
          ref: ref || "Lectionary Reading",
          text,
        };
      };

      const firstReading = extractPart(data.Mass_R1);
      const psalm = extractPart(data.Mass_Ps);
      const secondReading = extractPart(data.Mass_R2);
      const gospel = extractPart(data.Mass_G);

      if (gospel || firstReading) {
        return {
          date: isoDate,
          firstReading,
          psalm,
          secondReading,
          gospel,
          translation: "Catholic Lectionary for Mass (Nigeria / Jerusalem Bible & Grail Psalter)",
          sourceNote: "Daily Mass Readings via Universalis Liturgical Calendar (Africa/Nigeria).",
        };
      }
    } catch {
      // Try next URL
    }
  }

  return null;
}

/**
 * Provider 2: Evangelizo Official Catholic Daily Readings API v2
 * Endpoint: https://feed.evangelizo.org/v2/reader.php
 */
async function fetchFromEvangelizo(isoDate: string): Promise<DailyReadings | null> {
  const yyyymmdd = isoDate.replace(/-/g, "");
  const base = `https://feed.evangelizo.org/v2/reader.php?date=${yyyymmdd}&lang=AM`;

  async function getField(type: string, content: string): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5500);
    try {
      const res = await fetch(`${base}&type=${type}&content=${content}`, {
        signal: controller.signal,
        next: { revalidate: 3600 },
      });
      clearTimeout(timeoutId);
      if (!res.ok) return "";
      const txt = await res.text();
      const cleaned = decodeHtmlEntities(txt)
        .replace(/Copyright\s*©?\s*AELF.*$/gi, "")
        .replace(/Extraits de la Traduction.*$/gi, "")
        .trim();
      if (cleaned.length < 3 || /error|not found|invalid/i.test(cleaned.slice(0, 25))) {
        return "";
      }
      return cleaned;
    } catch {
      clearTimeout(timeoutId);
      return "";
    }
  }

  try {
    const [frRef, frText, psRef, psText, srRef, srText, gspRef, gspText] = await Promise.all([
      getField("reading_st", "FR"),
      getField("reading", "FR"),
      getField("reading_st", "PS"),
      getField("reading", "PS"),
      getField("reading_st", "SR"),
      getField("reading", "SR"),
      getField("reading_st", "GSP"),
      getField("reading", "GSP"),
    ]);

    if (!gspText && !frText) return null;

    return {
      date: isoDate,
      firstReading: frText ? { ref: frRef || "First Reading", text: frText } : undefined,
      psalm: psText ? { ref: psRef || "Responsorial Psalm", text: psText } : undefined,
      secondReading: srText ? { ref: srRef || "Second Reading", text: srText } : undefined,
      gospel: gspText ? { ref: gspRef || "Holy Gospel", text: gspText } : undefined,
      translation: "Catholic Daily Lectionary",
      sourceNote: "Daily Mass Readings provided via Evangelizo Liturgical Feed.",
    };
  } catch {
    return null;
  }
}

/**
 * Provider 3: USCCB Daily Readings HTML Parser (Handles multiline h3.name & div.content-body)
 */
function parseUsccbHtml(html: string, date: string): DailyReadings | null {
  try {
    const clean = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

    const getSection = (headingRegex: RegExp, nextHeadingRegex: RegExp): { ref: string; text: string } | undefined => {
      const match = clean.match(headingRegex);
      if (!match || match.index === undefined) return undefined;
      const start = match.index + match[0].length;
      const after = clean.slice(start);
      const nextMatch = after.match(nextHeadingRegex);
      const sectionHtml = nextMatch && nextMatch.index !== undefined ? after.slice(0, nextMatch.index) : after.slice(0, 6000);

      const refMatch =
        sectionHtml.match(/<div[^>]*class="[^"]*address[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
        sectionHtml.match(/<a[^>]+href="[^"]*bible\.usccb\.org[^"]*"[^>]*>([\s\S]*?)<\/a>/i);

      const ref = refMatch ? decodeHtmlEntities(refMatch[1]).replace(/Listen to podcast.*$/i, "").replace(/\n+/g, " ").trim() : "";

      const bodyMatch = sectionHtml.match(/<div[^>]*class="[^"]*content-body[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
      const rawText = bodyMatch ? bodyMatch[1] : sectionHtml;
      const text = decodeHtmlEntities(rawText);

      const cleanedText = ref && text.startsWith(ref) ? text.slice(ref.length).trim() : text;

      if (!cleanedText) return undefined;
      return {
        ref: ref || "Lectionary Reading",
        text: cleanedText,
      };
    };

    const firstReading = getSection(
      /<h[234][^>]*>\s*(?:Reading\s*(?:1|I)\b|FIRST\s+READING)[\s\S]*?<\/h[234]>/i,
      /<h[234][^>]*>\s*(?:Responsorial\s+Psalm|Reading\s*(?:2|II)\b|Alleluia|Verse\s+Before\s+the\s+Gospel|Gospel\b)/i
    );

    const psalm = getSection(
      /<h[234][^>]*>\s*(?:Responsorial\s+Psalm|PSALM)[\s\S]*?<\/h[234]>/i,
      /<h[234][^>]*>\s*(?:Reading\s*(?:2|II)\b|Alleluia|Verse\s+Before\s+the\s+Gospel|Gospel\b)/i
    );

    const secondReading = getSection(
      /<h[234][^>]*>\s*(?:Reading\s*(?:2|II)\b|SECOND\s+READING)[\s\S]*?<\/h[234]>/i,
      /<h[234][^>]*>\s*(?:Alleluia|Verse\s+Before\s+the\s+Gospel|Gospel\b)/i
    );

    const gospel = getSection(
      /<h[234][^>]*>\s*(?:Gospel\b|HOLY\s+GOSPEL)\s*<\/h[234]>/i,
      /(?:<footer|<div[^>]*class="[^"]*(?:views-element-container|region-footer|bottom)[^"]*"|<h[234][^>]*>)/i
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
  } catch {
    return null;
  }
}

async function fetchFromUsccb(isoDate: string): Promise<DailyReadings | null> {
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
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);
    if (!response.ok) return null;

    const html = await response.text();
    return parseUsccbHtml(html, isoDate);
  } catch {
    return null;
  }
}

/**
 * Multi-provider live daily readings fetcher (Universalis Nigeria -> Evangelizo -> USCCB)
 * with automatic 12-hour caching per Lagos calendar date.
 */
export async function fetchLiveDailyReadings(isoDate: string): Promise<DailyReadings | null> {
  const cached = readingsCache.get(isoDate);
  const now = Date.now();
  if (cached && now - cached.cachedAt < CACHE_TTL_MS) {
    return cached.readings;
  }

  // 1. Try Universalis (Nigeria Liturgical Calendar)
  const universalis = await fetchFromUniversalis(isoDate);
  if (universalis) {
    readingsCache.set(isoDate, { readings: universalis, cachedAt: now });
    return universalis;
  }

  // 2. Try Evangelizo API v2
  const evangelizo = await fetchFromEvangelizo(isoDate);
  if (evangelizo) {
    readingsCache.set(isoDate, { readings: evangelizo, cachedAt: now });
    return evangelizo;
  }

  // 3. Try USCCB Lectionary
  const usccb = await fetchFromUsccb(isoDate);
  if (usccb) {
    readingsCache.set(isoDate, { readings: usccb, cachedAt: now });
    return usccb;
  }

  return null;
}
