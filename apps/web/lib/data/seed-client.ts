import type { DataClient } from "./client";
import {
  SEED_ECCLESIASTICAL,
  SEED_RECURRING,
  SEED_SOCIETIES,
  SEED_SOCIETY_CATEGORIES,
  SEED_ABOUT_HISTORY,
  SEED_ANNOUNCEMENTS,
  SEED_EVENTS,
  SEED_PRAYER_INTENTIONS,
  SEED_MASS_INTENTIONS,
  SEED_OFFERING_INFO,
  SEED_CHURCH_ACCOUNTS,
} from "./seed";
import type { PublicMassIntention } from "@/lib/types";
import { addDays, lagosDateString } from "@/lib/time/lagos";

/** Read-only client over owner-supplied seed data with live storage bridge for local development/offline. */
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
  async getAnnouncements(limit?: number) {
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
    return limit ? SEED_ANNOUNCEMENTS.slice(0, limit) : SEED_ANNOUNCEMENTS;
  }
  async getAnnouncement(slug?: string) {
    const list = await this.getAnnouncements();
    return list.find((a) => a.slug === slug) ?? null;
  }
  async getUpcomingEvents(limit?: number) {
    const now = Date.now() - 24 * 60 * 60 * 1000;
    const activeEvents = SEED_EVENTS.filter((e) => new Date(e.startsAt).getTime() >= now);
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
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return SEED_ECCLESIASTICAL;
  }
  async getLeadership() {
    return [];
  }
  async getContact() {
    return {
      phone: "08063314891 (Catechist) / 09044469505 (Chaplain)",
      email: "info@omph-aefutha.catholic.ng",
      address: "Our Mother of Perpetual Help Catholic Chaplaincy, Alex Ekwueme Federal University Teaching Hospital, Abakaliki (AE-FUTHA), Ebonyi State, Nigeria",
    };
  }
  async getPublicMassIntentions(date?: string): Promise<PublicMassIntention[]> {
    const today = lagosDateString();
    const targetDate = date || today;

    // Archiving rule: once a day is in the past, its intentions are archived and not displayed publicly
    if (targetDate < today) {
      return [];
    }

    const realBookings: PublicMassIntention[] = [];

    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("omph_mass_intentions_store");
        if (raw) {
          const store = JSON.parse(raw);
          const entries = Object.values(store) as any[];

          for (let idx = 0; idx < entries.length; idx++) {
            const i = entries[idx];
            // Filter by active booking statuses
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

              // Archiving rule: after the intention has passed its last day, it is archived and not displayed publicly
              const isPastIntention = today > lastDay;
              if (isPastIntention) {
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
                  status: isPastIntention ? "archived" : "confirmed",
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

    // Only fallback to active seed intentions if viewing today and zero real bookings exist
    if (targetDate === today) {
      return SEED_MASS_INTENTIONS.map((m) => ({ ...m, scheduledDate: today }));
    }

    return [];
  }
  async getPublicPrayerIntentions(limit = 20) {
    let all = [...SEED_PRAYER_INTENTIONS];
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("omph_prayer_requests");
        if (raw) {
          const items = JSON.parse(raw);
          all = [...items, ...all];
        }
      } catch {}
    }
    return all.slice(0, limit);
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
