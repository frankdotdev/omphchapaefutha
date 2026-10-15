import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { MEDIA } from "@/lib/media";

export const metadata: Metadata = { title: "Sacred Art", description: "Sacred art and images of the Catholic faith." };

const ORDER = [
  "annunciation", "sistine-madonna", "immaculate-conception", "virgin-of-the-angels",
  "divine-mercy", "crucifix", "risen-christ-window", "rosary-bible", "church-interior", "cardinals-st-peters",
];

export default function SacredArtPage() {
  return (
    <>
      <PageHead
        title="Sacred Art"
        lede="Images that have drawn the faithful to prayer for centuries."
        latin="Pulchritudo tam antiqua"
        image={{ src: "/images/art/st-peters-light.jpg", position: "center 60%" }}
      />
      <section className="section">
        <div className="wrap">
          <div className="art-gallery">
            {ORDER.map((id) => {
              const m = MEDIA[id];
              return (
                <figure key={id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} width={m.width} height={m.height} alt={m.alt} loading="lazy" style={{ maxWidth: `min(100%, ${m.maxCssWidth}px)` }} />
                  <figcaption>
                    <strong>{m.title}</strong>
                    {m.byline}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
