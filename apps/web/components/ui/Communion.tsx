import type { EcclesiasticalEntry } from "@/lib/types";

const LEVEL: Record<EcclesiasticalEntry["level"], string> = {
  universal: "The universal Church",
  nunciature: "The Holy See in Nigeria",
  province: "The ecclesiastical province",
  diocese: "The local diocese",
  chaplaincy: "The chaplaincy",
};

/** A stepped sequence of communion, deliberately not an org chart. Unverified names are never invented. */
export function Communion({ entries }: { entries: EcclesiasticalEntry[] }) {
  return (
    <ol className="communion">
      {entries.map((e) => (
        <li key={e.officeKey} className={e.portraitSrc ? "has-portrait" : undefined}>
          {e.portraitSrc && e.personName && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="portrait" src={e.portraitSrc} alt={`Portrait of ${e.personName}`} width={72} height={72} loading="lazy" />
          )}
          <div>
          <p className="level">{LEVEL[e.level]}</p>
          <p className={e.personName ? "person" : "person pending"}>
            {e.personName ?? "Name to be confirmed from official sources"}
          </p>
          <p className="desc">
            <strong>{e.title}</strong>
            {e.description ? `. ${e.description}` : ""}
            {e.occupancy === "vacant" ? " The see is currently vacant." : ""}
          </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
