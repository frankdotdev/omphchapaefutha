import type { Metadata } from "next";
import { getDataClient } from "@/lib/data";
import { PageHead } from "@/components/ui/PageHead";

export const metadata: Metadata = { title: "Leadership" };
export const revalidate = 300;

export default async function LeadershipPage() {
  const db = getDataClient();
  const [eccl, leaders] = await Promise.all([db.getEcclesiasticalDirectory(), db.getLeadership()]);
  const chaplains = eccl.filter((e) => e.level === "chaplaincy" && e.personName);
  return (
    <>
      <PageHead title="Leadership" latin="Pasce oves meas" lede="The chaplains and officers who serve the chaplaincy." />
      <section className="section">
        <div className="wrap">
          <ul className="entries">
            {chaplains.map((c) => (
              <li key={c.officeKey}>
                <div className="meta">{c.title}</div>
                <div><h3>{c.personName}</h3></div>
              </li>
            ))}
            {leaders.map((l) => (
              <li key={l.positionKey + l.personName}>
                <div className="meta">{l.title}</div>
                <div><h3>{l.personName}</h3>{l.bio && <p>{l.bio}</p>}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
