import { decodeHtmlEntities } from "@/lib/liturgy/auto-readings";

export interface VaticanNewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  imageUrl?: string;
}

const FALLBACK_VATICAN_ITEMS: VaticanNewsItem[] = [
  {
    title: "Pope Leo XIV: General Audiences, Angelus & Papal Celebrations",
    link: "https://www.vaticannews.va/en/pope.html",
    description: "Watch and read the latest catechesis, homilies, Angelus addresses, and apostolic messages of His Holiness Pope Leo XIV from St. Peter's Square.",
    pubDate: new Date().toUTCString(),
  },
  {
    title: "Holy See Press Office & Dicastery for Communication Updates",
    link: "https://www.vaticannews.va/en/vatican-city.html",
    description: "Official communiqués, synodal updates, Roman Curia appointments, and papal diplomatic audiences from Vatican City.",
    pubDate: new Date().toUTCString(),
  },
  {
    title: "The Church in Africa & Universal Mission",
    link: "https://www.vaticannews.va/en/church.html",
    description: "Coverage of dioceses, missionary apostolates, episcopal conferences, and charitable works of the universal Catholic Church.",
    pubDate: new Date().toUTCString(),
  },
];

/**
 * Fetches live news and video dispatches from the official Vatican News English RSS feed.
 * Endpoint: https://www.vaticannews.va/en.rss.xml
 */
export async function fetchVaticanNewsFeed(limit = 6): Promise<VaticanNewsItem[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5500);

    const res = await fetch("https://www.vaticannews.va/en.rss.xml", {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OMPHChaplaincy/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      next: { revalidate: 1800 }, // Refresh every 30 minutes
    });

    clearTimeout(timeoutId);
    if (!res.ok) return FALLBACK_VATICAN_ITEMS.slice(0, limit);

    const xml = await res.text();
    const items: VaticanNewsItem[] = [];
    const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/gi) ?? [];

    for (const block of itemBlocks.slice(0, limit)) {
      const extractTag = (tag: string): string => {
        const m = block.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tag}>`, "i"));
        if (!m) return "";
        return decodeHtmlEntities((m[1] ?? m[2] ?? "").trim());
      };

      const title = extractTag("title");
      const link = extractTag("link");
      const description = extractTag("description").slice(0, 220);
      const pubDate = extractTag("pubDate");

      const mediaMatch =
        block.match(/<media:content[^>]+url="([^"]+)"/i) ||
        block.match(/<enclosure[^>]+url="([^"]+)"/i);
      const imageUrl = mediaMatch ? mediaMatch[1] : undefined;

      if (title && link) {
        items.push({
          title,
          link,
          description,
          pubDate,
          imageUrl,
        });
      }
    }

    return items.length > 0 ? items : FALLBACK_VATICAN_ITEMS.slice(0, limit);
  } catch {
    return FALLBACK_VATICAN_ITEMS.slice(0, limit);
  }
}
