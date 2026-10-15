import { NextResponse } from "next/server";
import { answerQuestion, validateQuestion } from "@/lib/ask/answer";
import { getProvider } from "@/lib/ask/provider";
import { allow } from "@/lib/ask/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!allow(ip)) return NextResponse.json({ error: "Too many questions. Please wait a minute and try again." }, { status: 429 });
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const v = validateQuestion((body as any)?.question);
  if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });
  const result = await answerQuestion(v.q, getProvider());
  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}
