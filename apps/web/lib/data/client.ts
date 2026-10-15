import type { Slide } from "@/lib/slides";
import type {
  Announcement,
  ChaplaincyEvent,
  EcclesiasticalEntry,
  LeadershipEntry,
  RecurringSchedule,
  ScheduleException,
  MassOption,
  OfferingInfo,
  PublicMassIntention,
  PublicPrayerIntention,
  SiteContact,
  Society,
  SocietyCategory,
  DailyReadings,
  SaintProfile,
  LiturgicalOverride,
} from "@/lib/types";

/**
 * The single seam between the UI and whatever backend is live.
 * UI code imports ONLY this interface (via getDataClient). Implementations:
 *   - SeedDataClient     built-in owner-supplied data (no backend needed)
 *   - SupabaseDataClient interim backend (RLS-protected, anon key)
 *   - NestApiDataClient  future backend (same interface; one env flag to switch)
 * Business rules (schedule precedence, countdowns, date handling) live in lib/, not in adapters.
 */
export interface DataClient {
  readonly backend: "seed" | "supabase" | "api";
  getRecurringSchedule(): Promise<RecurringSchedule[]>;
  getScheduleExceptions(from: string, to: string): Promise<ScheduleException[]>;
  getSocietyCategories(): Promise<SocietyCategory[]>;
  getSocieties(): Promise<Society[]>;
  getSociety(slug: string): Promise<Society | null>;
  getAnnouncements(limit?: number): Promise<Announcement[]>;
  getAnnouncement(slug: string): Promise<Announcement | null>;
  getUpcomingEvents(limit?: number): Promise<ChaplaincyEvent[]>;
  getEvent(slug: string): Promise<ChaplaincyEvent | null>;
  getEcclesiasticalDirectory(): Promise<EcclesiasticalEntry[]>;
  getLeadership(): Promise<LeadershipEntry[]>;
  getContact(): Promise<SiteContact>;
  getPublicMassIntentions(date: string): Promise<PublicMassIntention[]>;
  getPublicPrayerIntentions(limit?: number): Promise<PublicPrayerIntention[]>;
  getOfferingInfo(): Promise<OfferingInfo>;
  getMassOptions(): Promise<MassOption[]>;
  /** Slides after the built-in welcome slide. Empty means: use the default slides. */
  getHeroSlides(): Promise<Slide[]>;
  /** Published, staff-entered readings for a Lagos date, or null. */
  getDailyReadings(date: string): Promise<DailyReadings | null>;
  /** Verified, published saint profiles for the given romcal celebration ids. */
  getSaintProfiles(ids: string[]): Promise<SaintProfile[]>;
  /** Published local or national celebrations entered by staff. */
  getLiturgicalOverrides(): Promise<LiturgicalOverride[]>;
  /** Chaplaincy history text entered by staff in Settings, or null. */
  getAboutHistory(): Promise<string | null>;
}
