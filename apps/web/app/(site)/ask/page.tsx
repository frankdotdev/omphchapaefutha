import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui/PageHead";
import { AskPadre } from "@/components/ask/AskPadre";

export const metadata: Metadata = {
  title: "Ask a Padre — Catholic Doctrine Assistant",
  description: "Ask questions on Catholic faith and morals or explore our alphabetical Catholic Doctrine Library.",
};

export default async function AskPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return (
    <>
      <PageHead
        title="Ask a Padre"
        latin="Paratus semper ad responsionem"
        lede="Inquire into Catholic doctrine, liturgy and Church teachings with instant magisterial references."
      />
      <section className="section">
        <div className="wrap narrow">
          <div
            style={{
              background: "var(--paper)",
              border: "1px solid var(--gold)",
              borderRadius: "6px",
              padding: "1rem 1.25rem",
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <strong style={{ color: "var(--navy)", display: "block" }}>
                Chatbot Available On Every Page
              </strong>
              <span className="muted small">
                You can also access Ask a Padre at any time from the bottom-right corner of any page.
              </span>
            </div>
            <Link href="/doctrine" className="btn secondary" style={{ fontSize: "0.88rem", padding: "0.4rem 0.9rem" }}>
              Explore All 80 Teachings (A–Z) →
            </Link>
          </div>

          <p className="ask-notice" role="note">
            This is an informational tool, not a priest. It does not hear confessions, give spiritual direction, or advise on personal, medical or legal crises.
            For sacramental life and personal pastoral counsel, please speak to a priest.
          </p>
          <AskPadre initial={q.slice(0, 500)} />
        </div>
      </section>
    </>
  );
}
