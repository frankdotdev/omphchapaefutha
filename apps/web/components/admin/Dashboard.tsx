"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { friendlyError } from "@/lib/admin/client";
import { can } from "@/lib/admin/resources";
import { useAdmin } from "./AdminShell";

const CARDS = [
  { label: "Intentions awaiting payment check", table: "mass_intentions", col: "state", val: "payment_review", href: "/admin/intentions", perm: "intentions.manage" },
  { label: "Intentions awaiting approval", table: "mass_intentions", col: "state", val: "pending_approval", href: "/admin/intentions", perm: "intentions.manage" },
  { label: "Prayer requests to moderate", table: "prayer_intentions", col: "state", val: "moderation_pending", href: "/admin/prayers", perm: "prayer.moderate" },
  { label: "Announcements in draft", table: "announcements", col: "status", val: "draft", href: "/admin/announcements", perm: "announcements.manage" },
  { label: "Events in draft", table: "events", col: "status", val: "draft", href: "/admin/events", perm: "events.manage" },
];

export function Dashboard() {
  const { client, perms } = useAdmin();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const cards = CARDS.filter((c) => can(perms, c.perm));

  useEffect(() => {
    Promise.all(cards.map((c) => client.count(c.table, c.col, c.val)))
      .then((r) => setCounts(Object.fromEntries(cards.map((c, i) => [c.label, r[i]]))))
      .catch((e) => setError(friendlyError(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <>
      <h1>Dashboard</h1>
      {error && <p className="field-error" role="alert">{error}</p>}
      {cards.length === 0 && <p>Your role has no sections assigned yet. Ask a Super Admin to update your access.</p>}
      <ul className="admin-cards">
        {cards.map((c) => (
          <li key={c.label}>
            <Link href={c.href}>
              <span className="num">{counts[c.label] ?? "–"}</span>
              <span>{c.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
