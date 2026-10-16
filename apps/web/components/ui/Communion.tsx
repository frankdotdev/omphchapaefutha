import type { EcclesiasticalEntry } from "@/lib/types";

const LEVEL: Record<string, string> = {
  universal: "The Universal Church",
  nunciature: "The Holy See in Nigeria",
  province: "The Ecclesiastical Province",
  diocese: "The Local Diocese",
  chaplaincy: "The Chaplaincy",
};

/**
 * Stepped sequence of ecclesiastical communion.
 * Designed to faithfully reflect apostolic succession and ecclesiastical bonds,
 * matching the chaplaincy's signature liturgical navy and gold timeline.
 */
export function Communion({ entries }: { entries: EcclesiasticalEntry[] }) {
  return (
    <div className="communion-container">
      <ol className="communion-timeline">
        {entries.map((e) => (
          <li key={e.officeKey} className="communion-node-item">
            {/* The circular gold node ring on the vertical timeline */}
            <span className="communion-ring" aria-hidden="true" />
            
            <div className="communion-content">
              {e.portraitSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="communion-avatar"
                  src={e.portraitSrc}
                  alt={e.personName ? `Portrait of ${e.personName}` : e.title}
                  width={68}
                  height={68}
                  loading="lazy"
                />
              ) : null}

              <div className="communion-details">
                <p className="communion-level">{LEVEL[e.level] ?? e.level}</p>
                <h3 className="communion-name">
                  {e.personName ?? "Name to be confirmed"}
                </h3>
                <p className="communion-text">
                  <strong>{e.title}</strong>
                  {e.description ? `. ${e.description}` : ""}
                  {e.occupancy === "vacant" ? " The see is currently vacant." : ""}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
