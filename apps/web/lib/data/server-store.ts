import { lagosDateString, addDays } from "@/lib/time/lagos";
import type { Announcement, PublicMassIntention, PublicPrayerIntention } from "@/lib/types";

export interface StoredAnnouncement {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body: string;
  category?: string;
  issuedBy?: string;
  publishedAt: string;
  expiresAt: string;
  durationDays: number;
  isUrgent: boolean;
  isFeatured: boolean;
  status: "published" | "archived";
}

export interface StoredMassIntention {
  id: string;
  reference: string;
  scheduledDate: string;
  endDate?: string | null;
  numberOfDays: number;
  dates?: string[];
  activityName: string;
  listOrder: number;
  text: string;
  displayName: string;
  contact?: string;
  createdAt: string;
  archivedAt?: string;
  status: "confirmed" | "archived";
}

export interface StoredPrayerIntention {
  id: string;
  body: string;
  category: string;
  displayName: string;
  createdAt: string;
  expiresAt: string;
  archivedAt?: string;
  status: "published" | "archived";
}

interface ServerStoreData {
  announcements: StoredAnnouncement[];
  massIntentions: StoredMassIntention[];
  prayerIntentions: StoredPrayerIntention[];
  rawAnnouncementDraft?: string;
  announcementDurationDays?: number;
  lastPurgedAt?: string;
}

const GLOBAL_STORE_KEY = "__omph_unified_store_v1__";
const CLIENT_STORAGE_KEY = "omph_server_store_backup_v1";

function getInitialStore(): ServerStoreData {
  const defaultDraft = `1. Infant baptism will be on 21st of November that's third Saturday. Register with catechist.
Issued by: Chaplaincy Catechetical Commission

2. The Catholic Nurses of Abakaliki Diocese will hold their 2026 annual retreat on 14th November (Saturday) with a Holy Mass by 9:30 am at the chaplaincy.
Issued by: Catholic Nurses Guild

3. Our family planting and seed sowing is still on.
Issued by: Chaplaincy Harvest & Sowing Committee

4. There will be Chaplaincy Pastoral Council meeting on Wednesday at 4:30 pm.
Issued by: Chaplaincy Pastoral Council`;

  const now = new Date();
  const publishedAt = now.toISOString();
  const expiresAt = new Date(now.getTime() + 7 * 86400000).toISOString();

  return {
    announcements: [
      {
        id: "ann-init-1",
        slug: "infant-baptism-november-third-saturday",
        title: "Infant Baptism on Third Saturday (21st November)",
        body: "Infant baptism will be celebrated on 21st of November, that is the third Saturday of the month. Parents and godparents should register with the catechist.",
        excerpt: "Infant baptism will be celebrated on 21st of November (third Saturday). Register with catechist.",
        issuedBy: "Chaplaincy Catechetical Commission",
        category: "Sacraments",
        publishedAt,
        expiresAt,
        durationDays: 7,
        isUrgent: false,
        isFeatured: true,
        status: "published",
      },
      {
        id: "ann-init-2",
        slug: "catholic-nurses-annual-retreat-14th-november",
        title: "Catholic Nurses Guild Annual Retreat (14th November)",
        body: "The Catholic Nurses of Abakaliki Diocese will hold their 2026 annual retreat on 14th November (Saturday) with a Holy Mass by 9:30 am at the chaplaincy sanctuary.",
        excerpt: "Catholic Nurses of Abakaliki Diocese annual retreat on 14th November with Holy Mass at 9:30 AM.",
        issuedBy: "Catholic Nurses Guild",
        category: "Apostolate",
        publishedAt,
        expiresAt,
        durationDays: 7,
        isUrgent: false,
        isFeatured: true,
        status: "published",
      },
      {
        id: "ann-init-3",
        slug: "family-planting-and-seed-sowing",
        title: "Family Planting & Seed Sowing Appeal",
        body: "Our family planting and seed sowing spiritual and pastoral project is still on. All families are encouraged to participate faithfully.",
        excerpt: "Our family planting and seed sowing pastoral drive is ongoing.",
        issuedBy: "Harvest & Sowing Committee",
        category: "Pastoral",
        publishedAt,
        expiresAt,
        durationDays: 7,
        isUrgent: false,
        isFeatured: false,
        status: "published",
      },
      {
        id: "ann-init-4",
        slug: "chaplaincy-pastoral-council-meeting-wednesday",
        title: "Chaplaincy Pastoral Council Meeting (Wednesday 4:30 PM)",
        body: "There will be a Chaplaincy Pastoral Council meeting on Wednesday at 4:30 pm at the Chaplaincy Hall. All statutory members are requested to attend promptly.",
        excerpt: "Chaplaincy Pastoral Council meeting scheduled for Wednesday at 4:30 PM.",
        issuedBy: "Chaplaincy Pastoral Council",
        category: "Council",
        publishedAt,
        expiresAt,
        durationDays: 7,
        isUrgent: true,
        isFeatured: true,
        status: "published",
      },
    ],
    massIntentions: [],
    prayerIntentions: [],
    rawAnnouncementDraft: defaultDraft,
    announcementDurationDays: 7,
  };
}

function loadStore(): ServerStoreData {
  const g = globalThis as any;
  if (!g[GLOBAL_STORE_KEY]) {
    // Try client localStorage if in browser
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(CLIENT_STORAGE_KEY);
        if (stored) {
          g[GLOBAL_STORE_KEY] = JSON.parse(stored);
        }
      } catch {}
    }

    if (!g[GLOBAL_STORE_KEY]) {
      g[GLOBAL_STORE_KEY] = getInitialStore();
    }
  }
  return g[GLOBAL_STORE_KEY];
}

function saveStore(store: ServerStoreData): void {
  const g = globalThis as any;
  g[GLOBAL_STORE_KEY] = store;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(store));
    } catch {}
  }
}

/**
 * Applies church time-limit and archiving rules:
 * 1. Announcements expire after durationDays (default 7 days).
 * 2. Mass Intentions archive once their scheduledDate (or multi-day lastDay) has passed.
 * 3. Prayer Intentions archive after 9 days (Novena).
 * 4. Items archived > 90 days are automatically purged to save database space.
 */
export function syncAndAutoArchive(): ServerStoreData {
  const store = loadStore();
  const now = Date.now();
  const today = lagosDateString();
  const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;

  let changed = false;

  // 1. Process Announcements
  for (const a of store.announcements) {
    if (a.status === "published" && a.expiresAt) {
      if (new Date(a.expiresAt).getTime() < now) {
        a.status = "archived";
        changed = true;
      }
    }
  }

  // 2. Process Mass Intentions
  for (const m of store.massIntentions) {
    let lastDay = m.endDate || m.scheduledDate;
    if (m.dates && m.dates.length > 0) {
      lastDay = [...m.dates].sort().pop() || m.scheduledDate;
    }
    if (m.status !== "archived" && today > lastDay) {
      m.status = "archived";
      m.archivedAt = m.archivedAt || new Date().toISOString();
      changed = true;
    }
  }

  // 3. Process Prayer Intentions (9 days default)
  for (const p of store.prayerIntentions) {
    if (p.status !== "archived") {
      const expiry = p.expiresAt ? new Date(p.expiresAt).getTime() : new Date(p.createdAt).getTime() + 9 * 86400000;
      if (now > expiry) {
        p.status = "archived";
        p.archivedAt = p.archivedAt || new Date().toISOString();
        changed = true;
      }
    }
  }

  // 4. 90-Day Retention Purge (saves database space)
  const announcementsBefore = store.announcements.length;
  store.announcements = store.announcements.filter((a) => {
    if (a.status === "archived") {
      const archivedTime = a.expiresAt ? new Date(a.expiresAt).getTime() : new Date(a.publishedAt).getTime();
      return now - archivedTime < ninetyDaysMs;
    }
    return true;
  });

  const intentionsBefore = store.massIntentions.length;
  store.massIntentions = store.massIntentions.filter((m) => {
    if (m.status === "archived") {
      const archivedTime = m.archivedAt ? new Date(m.archivedAt).getTime() : new Date(m.createdAt).getTime();
      return now - archivedTime < ninetyDaysMs;
    }
    return true;
  });

  const prayersBefore = store.prayerIntentions.length;
  store.prayerIntentions = store.prayerIntentions.filter((p) => {
    if (p.status === "archived") {
      const archivedTime = p.archivedAt ? new Date(p.archivedAt).getTime() : new Date(p.createdAt).getTime();
      return now - archivedTime < ninetyDaysMs;
    }
    return true;
  });

  if (
    changed ||
    store.announcements.length !== announcementsBefore ||
    store.massIntentions.length !== intentionsBefore ||
    store.prayerIntentions.length !== prayersBefore
  ) {
    saveStore(store);
  }

  return store;
}

// -------------------------------------------------------------
// ANNOUNCEMENTS
// -------------------------------------------------------------

export function getLiveAnnouncements(limit?: number): Announcement[] {
  const store = syncAndAutoArchive();
  const now = Date.now();

  const active = store.announcements
    .filter((a) => a.status === "published" && new Date(a.expiresAt).getTime() >= now)
    .sort((a, b) => (b.isUrgent ? 1 : 0) - (a.isUrgent ? 1 : 0) || new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt || "",
      body: a.body,
      category: a.category || "General",
      issuedBy: a.issuedBy || "Chaplaincy Pastoral Council",
      publishedAt: a.publishedAt,
      isUrgent: a.isUrgent,
      isFeatured: a.isFeatured,
    }));

  return limit ? active.slice(0, limit) : active;
}

export function savePublishedAnnouncements(
  rawText: string,
  announcements: Announcement[],
  durationDays = 7,
): { savedCount: number; expiresAt: string } {
  const store = syncAndAutoArchive();
  const now = new Date();
  const publishedAt = now.toISOString();
  const expiresDate = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);
  const expiresAt = expiresDate.toISOString();

  store.rawAnnouncementDraft = rawText;
  store.announcementDurationDays = durationDays;

  // Mark previous published announcements as archived
  for (const prev of store.announcements) {
    if (prev.status === "published") {
      prev.status = "archived";
    }
  }

  // Insert new announcements
  const newItems: StoredAnnouncement[] = announcements.map((a, idx) => ({
    id: `ann-${Date.now()}-${idx + 1}`,
    slug: a.slug || `notice-${Date.now()}-${idx + 1}`,
    title: a.title,
    excerpt: a.excerpt || a.body.slice(0, 140) + "…",
    body: a.body,
    category: a.category || "General",
    issuedBy: a.issuedBy || "Chaplaincy Pastoral Council",
    publishedAt,
    expiresAt,
    durationDays,
    isUrgent: Boolean(a.isUrgent),
    isFeatured: Boolean(a.isFeatured),
    status: "published",
  }));

  store.announcements = [...newItems, ...store.announcements];
  saveStore(store);

  return { savedCount: newItems.length, expiresAt };
}

export function getAnnouncementDraft(): { rawText: string; durationDays: number } {
  const store = loadStore();
  return {
    rawText: store.rawAnnouncementDraft || "",
    durationDays: store.announcementDurationDays || 7,
  };
}

// -------------------------------------------------------------
// MASS INTENTIONS
// -------------------------------------------------------------

export function getLiveMassIntentions(date: string): PublicMassIntention[] {
  const store = syncAndAutoArchive();
  const today = lagosDateString();
  const targetDate = date || today;

  // Past dates are strictly archived and never displayed publicly
  if (targetDate < today) {
    return [];
  }

  const results: PublicMassIntention[] = [];

  for (const m of store.massIntentions) {
    let lastDay = m.endDate || m.scheduledDate;
    if (m.dates && m.dates.length > 0) {
      lastDay = [...m.dates].sort().pop() || m.scheduledDate;
    }

    // Exclude expired bookings
    if (today > lastDay) {
      continue;
    }

    const fallsOnTargetDate = m.dates
      ? m.dates.includes(targetDate)
      : m.scheduledDate <= targetDate && targetDate <= lastDay;

    if (fallsOnTargetDate) {
      results.push({
        id: m.reference || m.id,
        scheduledDate: targetDate,
        activityName: m.activityName || "Holy Mass",
        listOrder: m.listOrder || results.length + 1,
        text: m.text,
        displayName: m.displayName || "Parishioner",
      });
    }
  }

  return results;
}

export function saveBookedMassIntention(input: {
  reference: string;
  text: string;
  displayName: string;
  scheduledDate: string;
  endDate?: string | null;
  numberOfDays?: number;
  dates?: string[];
  activityName?: string;
  contact?: string;
}): void {
  const store = syncAndAutoArchive();
  const newItem: StoredMassIntention = {
    id: `intent-${Date.now()}`,
    reference: input.reference,
    scheduledDate: input.scheduledDate,
    endDate: input.endDate || null,
    numberOfDays: input.numberOfDays || 1,
    dates: input.dates || [input.scheduledDate],
    activityName: input.activityName || "Holy Mass",
    listOrder: store.massIntentions.filter((x) => x.scheduledDate === input.scheduledDate).length + 1,
    text: input.text,
    displayName: input.displayName || "Parishioner",
    contact: input.contact,
    createdAt: new Date().toISOString(),
    status: "confirmed",
  };

  store.massIntentions.unshift(newItem);
  saveStore(store);
}

// -------------------------------------------------------------
// PRAYER INTENTIONS (9 Days Novena Duration)
// -------------------------------------------------------------

export function getLivePrayerIntentions(limit = 30): PublicPrayerIntention[] {
  const store = syncAndAutoArchive();
  const now = Date.now();

  const active = store.prayerIntentions
    .filter((p) => p.status === "published" && new Date(p.expiresAt).getTime() >= now)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((p) => ({
      id: p.id,
      body: p.body,
      category: p.category,
      displayName: p.displayName,
    }));

  return limit ? active.slice(0, limit) : active;
}

export function saveSubmittedPrayer(input: {
  body: string;
  category: string;
  displayName: string;
}): void {
  const store = syncAndAutoArchive();
  const now = new Date();
  const createdAt = now.toISOString();
  // 9 days Novena default
  const expiresAt = new Date(now.getTime() + 9 * 24 * 60 * 60 * 1000).toISOString();

  const newItem: StoredPrayerIntention = {
    id: `pray-${Date.now()}`,
    body: input.body,
    category: input.category,
    displayName: input.displayName,
    createdAt,
    expiresAt,
    status: "published",
  };

  store.prayerIntentions.unshift(newItem);
  saveStore(store);
}

// -------------------------------------------------------------
// 90-DAY RETENTION & ADMIN NOTIFICATIONS
// -------------------------------------------------------------

export function getDatabaseRetentionStats(): {
  activeAnnouncements: number;
  archivedAnnouncements: number;
  activeIntentions: number;
  archivedIntentions: number;
  activePrayers: number;
  archivedPrayers: number;
  pendingPurgeCount: number;
  lastPurgedAt: string | null;
} {
  const store = syncAndAutoArchive();
  const now = Date.now();
  const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;

  const activeAnnouncements = store.announcements.filter((a) => a.status === "published").length;
  const archivedAnnouncements = store.announcements.filter((a) => a.status === "archived").length;

  const activeIntentions = store.massIntentions.filter((m) => m.status === "confirmed").length;
  const archivedIntentions = store.massIntentions.filter((m) => m.status === "archived").length;

  const activePrayers = store.prayerIntentions.filter((p) => p.status === "published").length;
  const archivedPrayers = store.prayerIntentions.filter((p) => p.status === "archived").length;

  // Count items older than 90 days
  let pendingPurgeCount = 0;
  for (const a of store.announcements) {
    if (a.status === "archived" && now - new Date(a.expiresAt || a.publishedAt).getTime() >= ninetyDaysMs) {
      pendingPurgeCount++;
    }
  }
  for (const m of store.massIntentions) {
    if (m.status === "archived" && now - new Date(m.archivedAt || m.createdAt).getTime() >= ninetyDaysMs) {
      pendingPurgeCount++;
    }
  }
  for (const p of store.prayerIntentions) {
    if (p.status === "archived" && now - new Date(p.archivedAt || p.createdAt).getTime() >= ninetyDaysMs) {
      pendingPurgeCount++;
    }
  }

  return {
    activeAnnouncements,
    archivedAnnouncements,
    activeIntentions,
    archivedIntentions,
    activePrayers,
    archivedPrayers,
    pendingPurgeCount,
    lastPurgedAt: store.lastPurgedAt || null,
  };
}

export function purgeOldRecordsNow(): { purgedCount: number } {
  const store = loadStore();
  const now = Date.now();
  const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;

  const annCountBefore = store.announcements.length;
  store.announcements = store.announcements.filter((a) => {
    if (a.status === "archived") {
      const t = a.expiresAt ? new Date(a.expiresAt).getTime() : new Date(a.publishedAt).getTime();
      return now - t < ninetyDaysMs;
    }
    return true;
  });

  const intCountBefore = store.massIntentions.length;
  store.massIntentions = store.massIntentions.filter((m) => {
    if (m.status === "archived") {
      const t = m.archivedAt ? new Date(m.archivedAt).getTime() : new Date(m.createdAt).getTime();
      return now - t < ninetyDaysMs;
    }
    return true;
  });

  const prayCountBefore = store.prayerIntentions.length;
  store.prayerIntentions = store.prayerIntentions.filter((p) => {
    if (p.status === "archived") {
      const t = p.archivedAt ? new Date(p.archivedAt).getTime() : new Date(p.createdAt).getTime();
      return now - t < ninetyDaysMs;
    }
    return true;
  });

  const purgedCount =
    annCountBefore - store.announcements.length +
    (intCountBefore - store.massIntentions.length) +
    (prayCountBefore - store.prayerIntentions.length);

  store.lastPurgedAt = new Date().toISOString();
  saveStore(store);

  return { purgedCount };
}
