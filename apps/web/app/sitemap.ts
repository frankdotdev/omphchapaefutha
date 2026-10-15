import type { MetadataRoute } from "next";
import { getDataClient } from "@/lib/data";
import { NAV } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const db = getDataClient();
  const [societies, announcements] = await Promise.all([db.getSocieties(), db.getAnnouncements(200)]);
  return [
    { url: base },
    { url: `${base}/sacred-art` },
    ...NAV.map((n) => ({ url: `${base}${n.href}` })),
    ...societies.filter((s) => s.published).map((s) => ({ url: `${base}/societies/${s.slug}` })),
    ...announcements.map((a) => ({ url: `${base}/announcements/${a.slug}` })),
  ];
}
