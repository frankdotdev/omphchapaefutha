import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui/PageHead";

export const metadata: Metadata = { title: "The Sacraments", description: "The seven sacraments of the Catholic Church, with what they are and where to read more." };

const SACRAMENTS: { name: string; latin: string; text: string; ccc: string }[] = [
  { name: "Baptism", latin: "Baptismus", ccc: "1213", text: "The doorway to the Christian life. In Baptism we are freed from original sin, born anew as children of God and made members of the Church." },
  { name: "Confirmation", latin: "Confirmatio", ccc: "1285", text: "Completes Baptism. The Holy Spirit strengthens the baptised to live and witness to the faith, sealed with the anointing of chrism." },
  { name: "Holy Eucharist", latin: "Eucharistia", ccc: "1374", text: "The source and summit of Christian life. Bread and wine become the Body and Blood of Christ, truly present, offered and received at Mass." },
  { name: "Reconciliation (Confession)", latin: "Paenitentia", ccc: "1461", text: "Christ forgives sins committed after Baptism through the ministry of a priest. We confess, are sorry, receive absolution and make amends." },
  { name: "Anointing of the Sick", latin: "Unctio infirmorum", ccc: "1499", text: "Strength, peace and courage for those who are seriously ill, elderly and frail, or facing surgery. It is for the living, not only the dying." },
  { name: "Holy Orders", latin: "Ordo", ccc: "1536", text: "Christ continues to shepherd his people through bishops, priests and deacons, ordained to teach, sanctify and serve." },
  { name: "Holy Matrimony", latin: "Matrimonium", ccc: "1601", text: "The lifelong, faithful and fruitful covenant of a man and a woman, a sign of Christ's love for his Church." },
];

export default function SacramentsPage() {
  return (
    <>
      <PageHead title="The Sacraments" latin="Septem sacramenta" lede="Seven signs of Christ's grace, given through the Church." />
      <section className="section">
        <div className="wrap narrow">
          <ul className="entries">
            {SACRAMENTS.map((s) => (
              <li key={s.name}>
                <div>
                  <h2 style={{ fontSize: "1.3rem" }}>{s.name} <small lang="la" className="muted">{s.latin}</small></h2>
                  <p>{s.text}</p>
                  <p className="muted small">Catechism of the Catholic Church, paragraph {s.ccc}.</p>
                </div>
              </li>
            ))}
          </ul>
          <h2>At the chaplaincy</h2>
          <p>The Sacrament of Reconciliation (Confession) is celebrated <strong>every Saturday immediately after the Morning Mass</strong> (and at any time upon personal request to the priests). Infant baptism is celebrated after the morning Mass on the third Saturday of every month. For baptism, confirmation, marriage, anointing or pastoral counseling, and for any sacramental preparation, please <Link href="/contact">contact the chaplaincy office</Link> or speak to a priest after Mass.</p>
          <p className="muted small">Questions about what the Church teaches? See <Link href="/doctrine">Questions and Answers</Link>.</p>
        </div>
      </section>
    </>
  );
}
