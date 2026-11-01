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
    return limit ? SEED_ANNOUNCEMENTS.slice(0, limit) : SEED_ANNOUNCEMENTS;
  }
  async getAnnouncement(slug?: string) {
    return SEED_ANNOUNCEMENTS.find((a) => a.slug === slug) ?? null;
  }
  async getUpcomingEvents(limit?: number) {
    return limit ? SEED_EVENTS.slice(0, limit) : SEED_EVENTS;
  }
  async getEvent(slug?: string) {
    return SEED_EVENTS.find((e) => e.slug === slug) ?? null;
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
    let all = [...SEED_MASS_INTENTIONS];
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("omph_mass_intentions_store");
        if (raw) {
          const store = JSON.parse(raw);
          const localApproved = Object.values(store)
            .filter((i: any) => i.status === "approved" || i.status === "completed")
            .map((i: any, idx: number) => ({
              id: i.reference || `local-${idx}`,
              scheduledDate: i.preferredDate || "",
              activityName: "Morning Mass (06:20)",
              listOrder: idx + 10,
              text: i.text,
              displayName: i.displayName,
              status: i.status,
            }));
          all = [...all, ...localApproved];
        }
      } catch {}
    }
    if (!date) return all;
    return all.filter((m) => m.scheduledDate === date || !m.scheduledDate);
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
