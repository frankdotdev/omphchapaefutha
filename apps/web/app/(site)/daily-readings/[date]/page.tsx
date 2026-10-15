import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DayView } from "@/components/liturgy/DayView";
import { lagosDateString } from "@/lib/time/lagos";

export const metadata: Metadata = { title: "Liturgical day" };
export const revalidate = 86400;

export default async function Page({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const valid = /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && new Date(date).toISOString().startsWith(date);
  const year = Number(date.slice(0, 4));
  if (!valid || year < 2000 || year > 2100) notFound();
  return <DayView date={date} isToday={date === lagosDateString(new Date())} />;
}
