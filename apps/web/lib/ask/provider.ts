export interface Citation { title: string; url?: string; excerpt?: string }
export interface ProviderAnswer { text: string; citations: Citation[] }

/** Anything that can answer a question with sources. Magisterium today; another provider or the NestJS API later. */
export interface AnswerProvider {
  readonly name: string;
  answer(question: string, signal?: AbortSignal): Promise<ProviderAnswer>;
}

const ENDPOINT = "https://www.magisterium.com/api/v1/chat/completions";

/** OpenAI-compatible chat endpoint. The key is read on the server only. */
export class MagisteriumProvider implements AnswerProvider {
  readonly name = "magisterium";
  constructor(private apiKey: string, private fetchImpl: typeof fetch = fetch) {}

  async answer(question: string, signal?: AbortSignal): Promise<ProviderAnswer> {
    const res = await this.fetchImpl(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({
        model: "magisterium-1",
        messages: [{ role: "user", content: question }],
      }),
      signal,
    });
    if (!res.ok) throw new Error(`Magisterium responded ${res.status}`);
    return parseMagisterium(await res.json());
  }
}

export function parseMagisterium(json: any): ProviderAnswer {
  const msg = json?.choices?.[0]?.message;
  const text = typeof msg?.content === "string" ? msg.content.trim() : "";
  if (!text) throw new Error("Empty answer");
  const raw: any[] = Array.isArray(json?.citations) ? json.citations : Array.isArray(msg?.citations) ? msg.citations : [];
  const citations: Citation[] = raw
    .map((c) => ({
      title: String(c?.title ?? c?.document_title ?? c?.source ?? "").trim(),
      url: typeof c?.url === "string" && /^https?:\/\//.test(c.url) ? c.url : undefined,
      excerpt: typeof c?.excerpt === "string" ? c.excerpt.slice(0, 300) : undefined,
    }))
    .filter((c) => c.title || c.url);
  return { text, citations };
}

export function getProvider(): AnswerProvider | null {
  const key = process.env.MAGISTERIUM_API_KEY;
  return key ? new MagisteriumProvider(key) : null;
}
