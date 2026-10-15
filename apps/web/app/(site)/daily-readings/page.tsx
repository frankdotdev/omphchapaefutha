import type { Metadata } from "next";
import { DayView } from "@/components/liturgy/DayView";
import { lagosDateString } from "@/lib/time/lagos";

export const metadata: Metadata = { title: "Today in the Church" };
export const revalidate = 1800;

export default function Page() {
  return <DayView date={lagosDateString(new Date())} isToday />;
}
