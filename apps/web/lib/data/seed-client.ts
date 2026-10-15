import type { DataClient } from "./client";
import {
  SEED_ECCLESIASTICAL,
  SEED_RECURRING,
  SEED_SOCIETIES,
  SEED_SOCIETY_CATEGORIES,
  SEED_ABOUT_HISTORY,
  SEED_ANNOUNCEMENTS,
  SEED_EVENTS,
} from "./seed";

/** Read-only client over owner-supplied seed data. Honest about what it doesn't have: empty, not fake. */
export class SeedDataClient implements DataClient {
  readonly backend = "seed" as const;
  async getRecurringSchedule() { return SEED_RECURRING; }
  async getScheduleExceptions(_from?: string, _to?: string) { return []; }
  async getSocietyCategories() { return SEED_SOCIETY_CATEGORIES; }
  async getSocieties() { return SEED_SOCIETIES; }
  async getSociety(slug: string) { return SEED_SOCIETIES.find((s) => s.slug === slug) ?? null; }
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
  async getEcclesiasticalDirectory() { return SEED_ECCLESIASTICAL; }
  async getLeadership() {
    return [];
  }
  async getContact() { return {}; }
  async getPublicMassIntentions(_date?: string) { return []; }
  async getPublicPrayerIntentions(_limit?: number) { return []; }
  async getOfferingInfo() { return { amount: null, bankInstructions: null }; }
  async getMassOptions() {
    return [{ id: "", name: "Any Mass" }];
  }
  async getHeroSlides() { return []; }
  async getDailyReadings(_date?: string) { return null; }
  async getSaintProfiles(_ids?: string[]) { return []; }
  async getLiturgicalOverrides() { return []; }
  async getAboutHistory() { return SEED_ABOUT_HISTORY; }

}

