import type { DataClient } from "./client";
import { SeedDataClient } from "./seed-client";
import type { Slide } from "@/lib/slides";
import type {
  Announcement,
  ChaplaincyEvent,
  DailyReadings,
  EcclesiasticalEntry,
  LeadershipEntry,
  LiturgicalOverride,
  MassOption,
  OfferingInfo,
  PublicMassIntention,
  PublicPrayerIntention,
  RecurringSchedule,
  SaintProfile,
  ScheduleException,
  SiteContact,
  Society,
  SocietyCategory,
} from "@/lib/types";

/**
 * REST API client for standalone backends (NestJS, Express, Go, etc.)
 * deployed on Neon, Railway, Render, VPS, or self-hosted servers.
 *
 * Each call attempts to fetch from the configured API endpoint.
 * If the API is unreachable, down, or returns an error, it gracefully falls back
 * to the built-in seed data client so public pages continue functioning smoothly.
 */
export class ApiDataClient implements DataClient {
  readonly backend = "api" as const;
  private readonly baseUrl: string;
  private readonly fallback: SeedDataClient;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.fallback = new SeedDataClient();
  }

  private async fetchJson<T>(path: string, fallbackValue: T): Promise<T> {
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
      });
      if (!res.ok) return fallbackValue;
      return (await res.json()) as T;
    } catch {
      return fallbackValue;
    }
  }

  async getRecurringSchedule(): Promise<RecurringSchedule[]> {
    return this.fetchJson<RecurringSchedule[]>("/api/v1/schedule", await this.fallback.getRecurringSchedule());
  }

  async getScheduleExceptions(from: string, to: string): Promise<ScheduleException[]> {
    return this.fetchJson<ScheduleException[]>(
      `/api/v1/schedule/exceptions?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
      await this.fallback.getScheduleExceptions(from, to),
    );
  }

  async getSocietyCategories(): Promise<SocietyCategory[]> {
    return this.fetchJson<SocietyCategory[]>("/api/v1/societies/categories", await this.fallback.getSocietyCategories());
  }

  async getSocieties(): Promise<Society[]> {
    return this.fetchJson<Society[]>("/api/v1/societies", await this.fallback.getSocieties());
  }

  async getSociety(slug: string): Promise<Society | null> {
    return this.fetchJson<Society | null>(`/api/v1/societies/${encodeURIComponent(slug)}`, await this.fallback.getSociety(slug));
  }

  async getAnnouncements(limit = 10): Promise<Announcement[]> {
    return this.fetchJson<Announcement[]>(`/api/v1/announcements?limit=${limit}`, await this.fallback.getAnnouncements(limit));
  }

  async getAnnouncement(slug: string): Promise<Announcement | null> {
    return this.fetchJson<Announcement | null>(`/api/v1/announcements/${encodeURIComponent(slug)}`, await this.fallback.getAnnouncement(slug));
  }

  async getUpcomingEvents(limit = 10): Promise<ChaplaincyEvent[]> {
    return this.fetchJson<ChaplaincyEvent[]>(`/api/v1/events?limit=${limit}`, await this.fallback.getUpcomingEvents(limit));
  }

  async getEvent(slug: string): Promise<ChaplaincyEvent | null> {
    return this.fetchJson<ChaplaincyEvent | null>(`/api/v1/events/${encodeURIComponent(slug)}`, await this.fallback.getEvent(slug));
  }

  async getEcclesiasticalDirectory(): Promise<EcclesiasticalEntry[]> {
    return this.fetchJson<EcclesiasticalEntry[]>("/api/v1/directory/ecclesiastical", await this.fallback.getEcclesiasticalDirectory());
  }

  async getLeadership(): Promise<LeadershipEntry[]> {
    return this.fetchJson<LeadershipEntry[]>("/api/v1/directory/leadership", await this.fallback.getLeadership());
  }

  async getContact(): Promise<SiteContact> {
    return this.fetchJson<SiteContact>("/api/v1/settings/contact", await this.fallback.getContact());
  }

  async getPublicMassIntentions(date: string): Promise<PublicMassIntention[]> {
    return this.fetchJson<PublicMassIntention[]>(
      `/api/v1/intentions/mass/public?date=${encodeURIComponent(date)}`,
      await this.fallback.getPublicMassIntentions(date),
    );
  }

  async getPublicPrayerIntentions(limit = 20): Promise<PublicPrayerIntention[]> {
    return this.fetchJson<PublicPrayerIntention[]>(
      `/api/v1/intentions/prayer/public?limit=${limit}`,
      await this.fallback.getPublicPrayerIntentions(limit),
    );
  }

  async getOfferingInfo(): Promise<OfferingInfo> {
    return this.fetchJson<OfferingInfo>("/api/v1/settings/offering", await this.fallback.getOfferingInfo());
  }

  async getMassOptions(): Promise<MassOption[]> {
    return this.fetchJson<MassOption[]>("/api/v1/schedule/mass-options", await this.fallback.getMassOptions());
  }

  async getHeroSlides(): Promise<Slide[]> {
    return this.fetchJson<Slide[]>("/api/v1/settings/slides", await this.fallback.getHeroSlides());
  }

  async getDailyReadings(date: string): Promise<DailyReadings | null> {
    return this.fetchJson<DailyReadings | null>(
      `/api/v1/liturgy/readings?date=${encodeURIComponent(date)}`,
      await this.fallback.getDailyReadings(date),
    );
  }

  async getSaintProfiles(ids: string[]): Promise<SaintProfile[]> {
    if (!ids.length) return [];
    return this.fetchJson<SaintProfile[]>(
      `/api/v1/liturgy/saints?ids=${encodeURIComponent(ids.join(","))}`,
      await this.fallback.getSaintProfiles(ids),
    );
  }

  async getLiturgicalOverrides(): Promise<LiturgicalOverride[]> {
    return this.fetchJson<LiturgicalOverride[]>("/api/v1/liturgy/overrides", await this.fallback.getLiturgicalOverrides());
  }

  async getAboutHistory(): Promise<string | null> {
    return this.fetchJson<string | null>("/api/v1/settings/about-history", await this.fallback.getAboutHistory());
  }
}
