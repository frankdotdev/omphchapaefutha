import Link from "next/link";
import { getDataClient } from "@/lib/data";

/** One highest-priority urgent notice, only while published and unexpired. Renders nothing otherwise. */
export async function NoticeStrip() {
  const items = await getDataClient().getAnnouncements(10);
  const urgent = items.find((a) => a.isUrgent);
  if (!urgent) return null;
  return (
    <div className="notice-strip" role="region" aria-label="Important notice">
      <div className="wrap">
        <span>{urgent.title}</span>
        <Link href={`/announcements/${urgent.slug}`}>Read notice</Link>
      </div>
    </div>
  );
}
