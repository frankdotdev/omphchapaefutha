"use client";

import Link from "next/link";
import { useState } from "react";

type Result =
  | { kind: "safety"; message: string }
  | { kind: "library"; matches: { id: string; question: string; snippet: string }[] }
  | { kind: "magisterium"; text: string; citations: { title: string; url?: string }[]; also: { id: string; question: string }[] }
  | { kind: "none"; message: string };

export function AskPadre({ initial = "" }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: q }) });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Something went wrong. Please try again.");
      else setResult(data);
    } catch {
      setError("Could not reach the server. Please check your connection and try again.");
    } finally { setBusy(false); }
  }

  return (
    <div>
      <form className="ask-box" onSubmit={submit}>
        <label htmlFor="ask-q"><strong>Your question about the Catholic faith</strong></label>
        <textarea id="ask-q" value={q} onChange={(e) => setQ(e.target.value)} maxLength={500} required aria-describedby="ask-help" />
        <p id="ask-help" className="muted small">Up to 500 characters. Please do not include personal details.</p>
        <button className="btn" type="submit" disabled={busy}>{busy ? "Searching…" : "Ask"}</button>
      </form>
      <div aria-live="polite" role="status">
        {error && <p className="ask-notice">{error}</p>}
        {result?.kind === "safety" && <div className="ask-notice"><p>{result.message}</p></div>}
        {result?.kind === "none" && <div className="ask-notice"><p>{result.message}</p><p><Link href="/doctrine">Browse questions and answers</Link></p></div>}
        {result?.kind === "library" && (
          <div>
            <h2>From our questions and answers</h2>
            {result.matches.map((m) => (
              <div className="ask-answer" key={m.id}>
                <h3><Link href={`/doctrine/${m.id}`}>{m.question}</Link></h3>
                <p>{m.snippet}…</p>
                <p><Link href={`/doctrine/${m.id}`}>Read the full answer and sources</Link></p>
              </div>
            ))}
          </div>
        )}
        {result?.kind === "magisterium" && (
          <div className="ask-answer">
            <h2>Answer</h2>
            {result.text.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}
            {result.citations.length > 0 && (
              <>
                <h3>Sources</h3>
                <ul>{result.citations.map((c, i) => <li key={i}>{c.url ? <a href={c.url} rel="noopener noreferrer" target="_blank">{c.title || c.url}</a> : c.title}</li>)}</ul>
              </>
            )}
            <p className="muted small">This answer was produced by an automated service from Church sources and has not been reviewed by the chaplaincy.</p>
            {result.also.length > 0 && <p className="small">Related: {result.also.map((a, i) => <span key={a.id}>{i > 0 && ", "}<Link href={`/doctrine/${a.id}`}>{a.question}</Link></span>)}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
