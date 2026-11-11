import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { OrderOfMassView } from "@/components/liturgy/OrderOfMassView";

export const metadata: Metadata = {
  title: "Order of Mass (Ordo Missae) — English, Igbo & Latin",
  description:
    "Complete Roman Catholic Order of Mass in English (Roman Missal 2010 Nigeria Recognitio), Latin, and Igbo. Introductory Rites, Liturgy of the Word, Preface, Eucharistic Prayer, Consecration, and Communion Rite.",
};

export default function OrderOfMassPage() {
  return (
    <>
      <PageHead
        title="Order of Mass (Ordo Missae)"
        latin="Introibo ad altare Dei"
        image={{ src: "/images/art/church-interior.jpg", position: "center 30%" }}
        lede="Follow the holy sacrifice of the Mass in English, Igbo, and Latin. Includes complete Introductory Rites, Creed, Preface, Eucharistic Prayer with the Words of Consecration, and Communion Rite."
      />

      <section className="section">
        <div className="wrap">
          <OrderOfMassView />
        </div>
      </section>
    </>
  );
}
