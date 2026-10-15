import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/ui/PageHead";
import { DOCTRINE_CATEGORIES, allDoctrine, formatSource, getDoctrineEntry, isReviewed, relatedDoctrine } from "@/lib/doctrine";

export function generateStaticParams() { return allDoctrine().map((e) => ({ id: e.id })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const e = getDoctrineEntry((await params).id);
  return { title: e ? e.question : "Question" , description: e?.answer.slice(0, 155) };
}

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const entry = getDoctrineEntry((await params).id);
  if (!entry) notFound();
  const cat = DOCTRINE_CATEGORIES.find((c) => c.slug === entry.category);
  const related = relatedDoctrine(entry);
  return (
    <>
      <PageHead title="Questions and Answers" latin="Parati semper ad satisfactionem" lede={cat?.title} />
      <section className="section">
        <div className="wrap narrow">
          <article>
            <h2>{entry.question}</h2>
            {entry.answer.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}
            <h3>Sources</h3>
            <ul>{entry.sources.map((s, i) => <li key={i}>{formatSource(s)}</li>)}</ul>
            <p className="muted small">{isReviewed(entry.id) ? "Reviewed by the chaplaincy." : "Awaiting review by the chaplaincy."} Written in our own words; the Church's own texts are the authority.</p>
          </article>
          {related.length > 0 && (
            <aside aria-labelledby="rel"><h3 id="rel">Related questions</h3>
              <ul>{related.map((r) => <li key={r.id}><Link href={`/doctrine/${r.id}`}>{r.question}</Link></li>)}</ul>
            </aside>
          )}
          <p><Link href="/doctrine">All questions</Link> · <Link href={`/ask?q=${encodeURIComponent(entry.question)}`}>Ask a Padre</Link></p>
        </div>
      </section>
    </>
  );
}
