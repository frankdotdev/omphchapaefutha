export const SITE = {
  name: "Our Mother of Perpetual Help Chaplaincy",
  designation: "AE-FUTHA",
  shortName: "OMPH Chaplaincy",
  description:
    "Our Mother of Perpetual Help Catholic Chaplaincy, AE-FUTHA: Mass times, announcements, events, societies and pastoral life.",
} as const;

export const PRIMARY_NAV: { href: string; label: string }[] = [
  { href: "/mass-schedule", label: "Mass Schedule" },
  { href: "/mass-intentions", label: "Mass Intentions" },
  { href: "/daily-readings", label: "Readings" },
  { href: "/sacraments", label: "Sacraments" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const MORE_NAV: { href: string; label: string }[] = [
  { href: "/doctrine", label: "Catholic Doctrine" },
  { href: "/societies", label: "Societies" },
  { href: "/prayer-intentions", label: "Prayer" },
  { href: "/announcements", label: "Announcements" },
  { href: "/events", label: "Events" },
  { href: "/leadership", label: "Leadership" },
  { href: "/ecclesiastical-communion", label: "Communion" },
];

/** All active routes, used by sitemaps, drawer, and tests. */
export const NAV: { href: string; label: string }[] = [
  { href: "/mass-schedule", label: "Mass Schedule" },
  { href: "/mass-intentions", label: "Mass Intentions" },
  { href: "/daily-readings", label: "Readings" },
  { href: "/prayer-intentions", label: "Prayer" },
  { href: "/sacraments", label: "Sacraments" },
  { href: "/doctrine", label: "Catholic Doctrine" },
  { href: "/ask", label: "Ask a Padre" },
  { href: "/about", label: "About" },
  { href: "/announcements", label: "Announcements" },
  { href: "/events", label: "Events" },
  { href: "/societies", label: "Societies" },
  { href: "/leadership", label: "Leadership" },
  { href: "/ecclesiastical-communion", label: "Communion" },
  { href: "/contact", label: "Contact" },
];

/** Place the approved Our Mother of Perpetual Help image here (public/images). The header falls back to the placeholder emblem until it exists. */
export const LOGO_SRC = "/images/omph-logo.png";
