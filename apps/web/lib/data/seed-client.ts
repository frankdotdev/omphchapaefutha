import type { DataClient } from "./client";
import {
  SEED_ECCLESIASTICAL,
  SEED_RECURRING,
  SEED_SOCIETIES,
  SEED_SOCIETY_CATEGORIES,
  SEED_ABOUT_HISTORY,
  SEED_EVENTS,
  SEED_OFFERING_INFO,
  SEED_CHURCH_ACCOUNTS,
} from "./seed";
import type { PublicMassIntention, Announcement, PublicPrayerIntention } from "@/lib/types";
import { addDays, lagosDateString } from "@/lib/time/lagos";
import {
  getLiveAnnouncements,
  getLiveMassIntentions,
  getLivePrayerIntentions,
} from "./server-store";

/** Production-ready client with live storage bridge for real data, time limits & archiving. */
export class SeedDataClient implements DataClient {
  readonly backend = "seed" as const;
  async getRecurringSchedule() { return SEED_RECURRING; }
  async getScheduleExceptions(_from?: string, _to?: string) { return []; }
  async getSocietyCategories() { return SEED_SOCIETY_CATEGORIES; }
  async getSocieties() {
    // Merge CMO specific bank details
    return SEED_SOCIETIES.map((s) => {
      if (s.slug === "catholic-men-organization") {
        return {
          ...s,
          accountName: "CMO PADRE PIO",
          accountNumber: "1024371925",
          bankName: "UBA",
          executiveContacts: "Catechist: 08063314891 / CMO Secretariat",
        };
      }
      return s;
    });
  }
  async getSociety(slug: string) {
    const list = await this.getSocieties();
    return list.find((s) => s.slug === slug) ?? null;
  }

  async getAnnouncements(limit?: number): Promise<Announcement[]> {
    // 1. Check real published announcements from server store
    try {
      const live = getLiveAnnouncements(limit);
      if (live && live.length > 0) {
        return live;
      }
    } catch {}

    // 2. Browser fallback for immediate preview
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("omph_announcements_parsed_v1");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return limit ? parsed.slice(0, limit) : parsed;
          }
        }
      } catch {}
    }

    return [];
  }

  async getAnnouncement(slug?: string) {
    const list = await this.getAnnouncements();
    return list.find((a) => a.slug === slug) ?? null;
  }

  async getUpcomingEvents(limit?: number) {
    // Rule: events disappear after the event date/time has passed
    const now = Date.now();
    const activeEvents = SEED_EVENTS.filter((e) => {
      const eventTime = new Date(e.endsAt || e.startsAt).getTime();
      return eventTime >= now;
    });
    return limit ? activeEvents.slice(0, limit) : activeEvents;
  }

  async getEvent(slug?: string) {
    const events = await this.getUpcomingEvents();
    return events.find((e) => e.slug === slug) ?? null;
  }

  async getEcclesiasticalDirectory() {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("omph_communion_directory");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {}
    }
    return SEED_ECCLESIASTICAL;
  }

  async getLeadership() { return []; }
  async getContact() {
    return {
      address: "Our Mother of Perpetual Help Catholic Chaplaincy, Alex Ekwueme Federal University Teaching Hospital (AE-FUTHA 1), Abakaliki, Ebonyi State, Nigeria.",
      phone: "08063314891 (Catechist) / 09044469505 (Chaplain)",
      email: null,
      mapsUrl: null,
    };
  }

  async getPublicMassIntentions(date?: string): Promise<PublicMassIntention[]> {
    const today = lagosDateString();
    const targetDate = date || today;

    // Strict Archiving Rule: past dates are archived and NEVER displayed publicly
    if (targetDate < today) {
      return [];
    }

    // 1. Try real server-store bookings
    try {
      const live = getLiveMassIntentions(targetDate);
      if (live && live.length > 0) {
        return live;
      }
    } catch {}

    // 2. Try browser localStorage if on client
    const realBookings: PublicMassIntention[] = [];
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
              let lastDay = i.endDate;
              if (!lastDay) {
                if (i.dates && i.dates.length > 0) {
                  lastDay = [...i.dates].sort().pop();
                } else if (startDate && numDays > 1) {
                  lastDay = addDays(startDate, numDays - 1);
                } else {
                  lastDay = startDate;
                }
              }

              // Archiving rule: after last day, it is archived and not displayed publicly
              if (today > lastDay) {
                continue;
              }

              // Check if intention falls on the targetDate
              const activeOnTargetDate = i.dates
                ? i.dates.includes(targetDate)
                : startDate <= targetDate && targetDate <= lastDay;

              if (activeOnTargetDate) {
                realBookings.push({
                  id: i.reference || `real-${idx}`,
                  scheduledDate: targetDate,
                  activityName: i.preferredActivityId === "mass-afternoon"
                    ? "Afternoon Mass (15:15)"
                    : i.preferredActivityId === "mass-evening"
                    ? "Evening Mass (17:30)"
                    : "Morning Mass (06:20)",
                  listOrder: idx + 1,
                  text: i.text,
                  displayName: i.displayName || "Parishioner",
                  status: "confirmed",
                  numberOfDays: numDays,
                });
              }
            }
          }
        }
      } catch {}
    }

    if (realBookings.length > 0) {
      return realBookings;
    }

    // Never show old mock intentions! If no bookings exist for today, return []
    return [];
  }

  async getPublicPrayerIntentions(limit = 20): Promise<PublicPrayerIntention[]> {
    // 1. Try real server-store prayers (filtered strictly to 9 days)
    try {
      const live = getLivePrayerIntentions(limit);
      if (live && live.length > 0) {
        return live;
      }
    } catch {}

    // 2. Check browser localStorage
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("omph_prayer_requests");
        if (raw) {
          const items = JSON.parse(raw);
          const now = Date.now();
          const active = items.filter((p: any) => {
            const created = p.createdAt ? new Date(p.createdAt).getTime() : now;
            return now - created <= 9 * 86400000;
          });
          if (active.length > 0) {
            return active.slice(0, limit);
          }
        }
      } catch {}
    }

    return [];
  }

  async getOfferingInfo() {
    return SEED_OFFERING_INFO;
  }

  async getMassOptions() {
    return [
      { id: "mass-morning", name: "Morning Mass (06:20)" },
      { id: "mass-afternoon", name: "Afternoon Mass (15:15)" },
      { id: "mass-evening", name: "Evening Mass (17:30)" },
      { id: "", name: "Any Mass" },
    ];
  }

  async getHeroSlides() { return []; }
  async getDailyReadings(_date?: string) { return null; }
  async getSaintProfiles(_ids?: string[]) { return []; }
  async getLiturgicalOverrides() { return []; }
  async getAboutHistory() { return SEED_ABOUT_HISTORY; }
  async getChurchAccounts() { return SEED_CHURCH_ACCOUNTS; }
}
