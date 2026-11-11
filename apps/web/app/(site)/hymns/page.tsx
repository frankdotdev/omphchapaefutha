import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { ChoirPlanner } from "@/components/hymns/ChoirPlanner";
import { lagosDateString, formatLongDate } from "@/lib/time/lagos";

export const metadata: Metadata = {
  title: "Mass Hymns & Liturgical Music — Choir Portal",
  description: "Official Mass hymns, Entrance, Kyrie, Gloria, Credo, Offertory, Sanctus, Agnus Dei, Communion and Dismissal lyrics for Our Mother of Perpetual Help Chaplaincy.",
};

export const revalidate = 60;

export default function HymnsPage() {
  const today = lagosDateString();

  return (
    <>
      <PageHead
        title="Mass Hymns &amp; Liturgical Music"
        latin="Cantate Domino canticum novum"
        image={{ src: "/images/art/church-interior.jpg", position: "center 40%" }}
        lede={`Liturgical hymns for ${formatLongDate(today)}. Follow the choir and lyrics on your mobile phone or broadcast directly to the church projector.`}
      />

      <section className="section">
        <div className="wrap">
          <ChoirPlanner initialDate={today} />
        </div>
      </section>
    </>
  );
}
