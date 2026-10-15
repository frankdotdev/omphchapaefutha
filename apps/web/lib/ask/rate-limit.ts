/** Small in-memory limiter. On serverless hosts each instance has its own memory, so this slows casual abuse only; put a real limiter in front for production. */
const hits = new Map<string, number[]>();

export function allow(key: string, limit = 8, windowMs = 60_000, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) { hits.set(key, recent); return false; }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const k of hits.keys()) { if (!hits.get(k)!.some((t) => now - t < windowMs)) hits.delete(k); }
  return true;
}
