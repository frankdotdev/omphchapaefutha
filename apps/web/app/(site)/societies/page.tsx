import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Associations, Organizations and Societies — OMPH Chaplaincy",
  description: "Explore the 19 active lay associations, student movements, and devotional societies of Our Mother of Perpetual Help Catholic Chaplaincy, AE-FUTHA.",
};

export const revalidate = 300;

export default async function SocietiesPage() {
  const db = getDataClient();
  const [cats, societies] = await Promise.all([db.getSocietyCategories(), db.getSocieties()]);

  return (
    <>
      <PageHead
        title="Our Catholic Communities"
        latin="Ut omnes unum sint"
        lede="Associations, student apostolates, organizations and devotional societies active at the chaplaincy."
      />
      <section className="section">
        <div className="wrap">
          {[...cats].sort((a, b) => a.displayOrder - b.displayOrder).map((c) => {
            const list = societies.filter((s) => s.categoryKey === c.key && s.published);
            if (list.length === 0) return null;
            return (
              <div key={c.key} style={{ marginBottom: "3.5rem" }}>
                <div style={{ borderBottom: "2px solid var(--gold)", paddingBottom: "0.5rem", marginBottom: "1.75rem" }}>
                  <h2 style={{ margin: 0, color: "var(--navy)" }}>{c.name}</h2>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {list.map((s) => (
                    <article
                      key={s.slug}
                      style={{
                        background: "var(--paper)",
                        border: "1px solid var(--line)",
                        borderRadius: "8px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        transition: "box-shadow 0.15s ease, transform 0.15s ease",
                      }}
                    >
                      {/* Society Banner / Image */}
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "170px",
                          background: "var(--ivory)",
                          borderBottom: "1px solid var(--line)",
                        }}
                      >
                        {s.imageSrc ? (
                          <Image
                            src={s.imageSrc}
                            alt={s.name}
                            fill
                            sizes="(min-width: 64rem) 360px, (min-width: 40rem) 50vw, 100vw"
                            style={{ objectFit: "contain", padding: "0.75rem" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--muted)",
                            }}
                          >
                            <Users size={40} style={{ opacity: 0.3 }} />
                          </div>
                        )}
                        {s.shortName && (
                          <span
                            style={{
                              position: "absolute",
                              top: "0.75rem",
                              right: "0.75rem",
                              background: "var(--marian)",
                              color: "#fff",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              padding: "0.2rem 0.55rem",
                              borderRadius: "4px",
                            }}
                          >
                            {s.shortName}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                        <h3 style={{ fontSize: "1.2rem", margin: "0 0 0.5rem" }}>
                          <Link href={`/societies/${s.slug}`} style={{ textDecoration: "none", color: "var(--navy)" }}>
                            {s.name}
                          </Link>
                        </h3>

                        {s.patron && (
                          <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", color: "var(--gold-text)", fontWeight: 600 }}>
                            Patron: {s.patron}
                          </p>
                        )}

                        <p
                          className="muted"
                          style={{
                            fontSize: "0.9rem",
                            lineHeight: 1.45,
                            margin: "0 0 1rem",
                            flex: 1,
                          }}
                        >
                          {s.summary
                            ? s.summary.slice(0, 140) + (s.summary.length > 140 ? "…" : "")
                            : "Catholic society of the chaplaincy dedicated to prayer, formation and apostolate."}
                        </p>

                        <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                          <Link
                            href={`/societies/${s.slug}`}
                            style={{
                              fontSize: "0.88rem",
                              fontWeight: 600,
                              color: "var(--marian)",
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            Read history &amp; activities →
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
