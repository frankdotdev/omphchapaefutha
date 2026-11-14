"use client";

import { useEffect, useState } from "react";
import type { PublicMassIntention } from "@/lib/types";
import { addDays } from "@/lib/time/lagos";
import { Clock, Archive } from "lucide-react";

export function MassIntentionsListClient({
  initialItems,
  day,
  today,
}: {
  initialItems: PublicMassIntention[];
  day: string;
  today: string;
}) {
  const [items, setItems] = useState<PublicMassIntention[]>(initialItems);
  const isPast = day < today;
  const isToday = day === today;

  useEffect(() => {
    // 1. Check local storage for intentions booked in this browser for `day`
    const localItems: PublicMassIntention[] = [];
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("omph_mass_intentions_store");
        if (raw) {
          const store = JSON.parse(raw);
          const entries = Object.values(store) as any[];

          for (let idx = 0; idx < entries.length; idx++) {
            const i = entries[idx];
            if (["approved", "completed", "confirmed", "payment_review", "pending_payment"].includes(i.status)) {
              const startDate = i.preferredDate || i.scheduledDate || "";
              const numDays = i.numberOfDays || (i.dates ? i.dates.length : 1);
              const lastDay = i.endDate || (i.dates && i.dates.length > 0 ? [...i.dates].sort().pop() : addDays(startDate, numDays - 1));

              // If day falls within range
              const fallsOnDay =
                (Array.isArray(i.dates) && i.dates.includes(day)) ||
                (startDate && lastDay && startDate <= day && day <= lastDay);

              if (fallsOnDay) {
                localItems.push({
                  id: i.reference || `local-${idx}`,
                  scheduledDate: day,
                  activityName: i.preferredActivityId === "mass-afternoon"
                    ? "Afternoon Mass (15:15)"
                    : i.preferredActivityId === "mass-evening"
                    ? "Evening Mass (17:30)"
                    : "Morning Mass (06:20)",
                  listOrder: idx + 1,
                  text: i.text,
                  displayName: i.displayName || "Parishioner",
                  status: "confirmed",
                });
              }
            }
          }
        }
      } catch {}
    }

    // 2. Fetch live from server API
    fetch(`/api/mass-intentions?date=${day}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.intentions && Array.isArray(d.intentions) && d.intentions.length > 0) {
          // Merge server items with any distinct local items
          const serverRefs = new Set(d.intentions.map((x: any) => x.id || x.text));
          const extraLocal = localItems.filter((l) => !serverRefs.has(l.id) && !serverRefs.has(l.text));
          setItems([...d.intentions, ...extraLocal]);
        } else if (localItems.length > 0) {
          setItems(localItems);
        }
      })
      .catch(() => {
        if (localItems.length > 0 && items.length === 0) {
          setItems(localItems);
        }
      });
  }, [day, items.length]);

  const groups = new Map<string, PublicMassIntention[]>();
  for (const i of items) {
    const k = i.activityName ?? "Holy Mass";
    groups.set(k, [...(groups.get(k) ?? []), i]);
  }

  return (
    <div>
      {/* Past/Archived Indicator */}
      {isPast && (
        <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "0.75rem 1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#475569" }}>
          <Archive size={16} />
          <strong>Archived:</strong> Holy Mass has already been offered for this date. In accordance with chaplaincy policy, past intentions are archived from public view.
        </div>
      )}

      {isToday && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "6px", padding: "0.6rem 1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", color: "#166534" }}>
          <Clock size={16} />
          <strong>Today&rsquo;s Active Altar Schedule:</strong> Celebrated today in the Holy Sacrifice of the Mass. After this day concludes, intentions move automatically to the archive.
        </div>
      )}

      {items.length === 0 ? (
        <div className="card pattern-paper" style={{ padding: "2.5rem 1.5rem", textAlign: "center", border: "1px dashed var(--line)" }}>
          <p className="muted" style={{ margin: 0, fontSize: "1rem" }}>
            {isPast
              ? "Intentions for this past date have completed their liturgical celebration and are preserved in the chaplaincy archive."
              : "No public intentions currently scheduled for this date. You can offer a Mass intention using the form below."}
          </p>
        </div>
      ) : (
        [...groups.entries()].map(([mass, list]) => (
          <div key={mass} style={{ marginBottom: "2.25rem" }} className="mass-group-card">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem", borderBottom: "2px solid var(--gold)", paddingBottom: "0.4rem" }}>
              <span style={{ fontSize: "1.2rem", color: "var(--marian)" }}>✝</span>
              <h3 style={{ margin: 0, fontSize: "1.3rem", color: "var(--navy)" }}>{mass}</h3>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)", marginLeft: "auto" }}>
                {list.length} {list.length === 1 ? "Intention" : "Intentions"}
              </span>
            </div>

            <ol className="intention-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.85rem" }}>
              {list.map((i, index) => (
                <li
                  key={i.id || index}
                  className="card pattern-paper"
                  style={{
                    padding: "1.2rem 1.5rem",
                    borderRadius: "6px",
                    border: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <span style={{ fontWeight: 700, color: "var(--gold-text)", fontSize: "1.1rem", minWidth: "1.5rem" }}>
                    {index + 1}.
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.5, color: "var(--navy)" }}>
                      {i.text}
                    </p>
                    {i.displayName && (
                      <div className="by" style={{ marginTop: "0.4rem", fontSize: "0.88rem", color: "var(--muted)" }}>
                        Offered by: <strong style={{ color: "var(--navy)" }}>{i.displayName}</strong>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))
      )}
    </div>
  );
}
