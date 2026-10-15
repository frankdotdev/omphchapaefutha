import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { DOCTRINE_CATEGORIES, allDoctrine } from "@/lib/doctrine";
import { DoctrineExplorer } from "@/components/doctrine/DoctrineExplorer";

export const metadata: Metadata = {
  title: "Catholic Doctrine Library: Questions & Answers",
  description: "Browse all 80 Catholic teachings, dogmas, and moral questions arranged alphabetically with Catechism and Scripture sources.",
};

export default async function DoctrinePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; c?: string }>;
}) {
  const { q = "", c = "" } = await searchParams;
  const entries = allDoctrine();

  return (
    <>
      <PageHead
        title="Catholic Teaching & Doctrine"
        latin="Parati semper ad satisfactionem"
        lede="Plain, source-backed answers to 80 common questions on Catholic faith, moral life, and sacraments, arranged alphabetically."
      />
      <section className="section">
        <div className="wrap">
          <p className="ask-notice" role="note" style={{ marginBottom: "2rem" }}>
            This library offers faithful summaries of Church teaching referenced directly to the{" "}
            <strong>Catechism of the Catholic Church (CCC)</strong>, Sacred Scripture, and ecumenical councils.
            For personal discernment, confession, or spiritual direction, please speak with our chaplaincy priests.
          </p>
          <DoctrineExplorer
            entries={entries}
            categories={DOCTRINE_CATEGORIES}
            initialQuery={q}
            initialCategory={c}
          />
        </div>
      </section>
    </>
  );
}
