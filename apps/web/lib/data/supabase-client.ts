import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { DataClient } from "./client";
import type { Slide, SlideImage } from "@/lib/slides";
import type {
  Announcement,
  ChaplaincyEvent,
  EcclesiasticalEntry,
  LeadershipEntry,
  MassOption,
  OfferingInfo,
  PublicMassIntention,
  PublicPrayerIntention,
  RecurringSchedule,
  ScheduleException,
  SiteContact,
  Society,
  SocietyCategory,
  Weekday,
  DailyReadings,
  SaintProfile,
  LiturgicalOverride,
} from "@/lib/types";
import { SEED_SOCIETIES, SEED_ECCLESIASTICAL, SEED_MASS_INTENTIONS, SEED_PRAYER_INTENTIONS } from "./seed";

const hhmm = (t: string | null) => (t ? t.slice(0, 5) : null);

/**
 * Interim backend adapter. Uses ONLY the public anon key; every table it reads is protected by RLS so
 * visitors can only ever see published, public-safe rows. Privileged work (payment verification,
 * provider keys, scheduled refreshes) belongs in Edge Functions, never here.
 * All Supabase-specific code is confined to this file so the NestJS client can replace it.
 */
export class SupabaseDataClient implements DataClient {
  readonly backend = "supabase" as const;
  private sb: SupabaseClient;
  private baseUrl: string;

  constructor(url: string, anonKey: string) {
    this.baseUrl = url.replace(/\/$/, "");
    this.sb = createClient(url, anonKey, { auth: { persistSession: false } });
  }

  // Rows are mapped to domain types immediately below; join shapes are validated by the mappers.
  private async rows(q: PromiseLike<{ data: any[] | null; error: any }>): Promise<any[]> {
    const { data, error } = await q;
    if (error) throw new Error(`Data request failed: ${error.message}`);
    return data ?? [];
  }

  /** Public URL of an object in the `media` storage bucket. */
  mediaUrl(objectKey: string): string {
    return `${this.baseUrl}/storage/v1/object/public/media/${objectKey}`;
  }

  async getRecurringSchedule(): Promise<RecurringSchedule[]> {
    const rows = await this.rows(
      this.sb.from("recurring_schedules").select("id,label,weekday,start_time,nth_of_month,timezone,note,sort_order,activities(key,location)").order("sort_order"),
    );
    return rows.map((r) => ({
      id: r.id,
      activityKey: r.activities?.key ?? "",
      label: r.label,
      weekday: r.weekday as Weekday,
      startTime: hhmm(r.start_time),
      nthOfMonth: r.nth_of_month,
      timezone: r.timezone,
      note: r.note,
      location: r.activities?.location ?? null,
      sortOrder: r.sort_order,
    }));
  }

  async getScheduleExceptions(from: string, to: string): Promise<ScheduleException[]> {
    const rows = await this.rows(
      this.sb.from("schedule_exceptions").select("*").gte("on_date", from).lte("on_date", to),
    );
    return rows.map((e) => ({
      id: e.id,
      onDate: e.on_date,
      kind: e.kind,
      recurringScheduleId: e.recurring_schedule_id,
      label: e.label,
      startTime: hhmm(e.start_time),
      location: e.location,
      note: e.note,
    }));
  }

  async getSocietyCategories(): Promise<SocietyCategory[]> {
    const rows = await this.rows(this.sb.from("society_categories").select("*").order("display_order"));
    return rows.map((c) => ({ key: c.key, name: c.name, displayOrder: c.display_order }));
  }

  private mapSociety = (s: Record<string, any>): Society => ({
    slug: s.slug,
    name: s.name,
    shortName: s.short_name,
    categoryKey: s.society_categories?.key ?? "",
    summary: s.summary,
    mission: s.mission,
    spirituality: s.spirituality,
    movementHistory: s.movement_history,
    localHistory: s.local_history,
    patron: s.patron,
    feastDay: s.feast_day,
    activities: s.activities,
    meetingSchedule: s.meeting_schedule,
    meetingVenue: s.meeting_venue,
    membershipInfo: s.membership_info,
    isFeatured: s.is_featured,
    imageSrc: s.image_url ?? s.image_src ?? (SEED_SOCIETIES.find((x) => x.slug === s.slug)?.imageSrc ?? null),
    verified: s.review === "verified",
    published: s.status === "published",
  });

  async getSocieties(): Promise<Society[]> {
    const rows = await this.rows(
      this.sb.from("societies").select("*, society_categories(key)").order("display_order"),
    );
    return rows.map(this.mapSociety);
  }

  async getSociety(slug: string): Promise<Society | null> {
    const rows = await this.rows(
      this.sb.from("societies").select("*, society_categories(key)").eq("slug", slug).limit(1),
    );
    return rows[0] ? this.mapSociety(rows[0]) : null;
  }

  private mapAnnouncement = (a: Record<string, any>): Announcement => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    body: a.body,
    category: a.announcement_categories?.name ?? null,
    issuedBy: a.issued_by,
    publishedAt: a.publish_at ?? a.created_at,
    isUrgent: a.is_urgent,
    isFeatured: a.is_featured,
  });

  async getAnnouncements(limit = 20): Promise<Announcement[]> {
    const rows = await this.rows(
      this.sb.from("announcements").select("*, announcement_categories(name)").order("publish_at", { ascending: false }).limit(limit),
    );
    return rows.map(this.mapAnnouncement);
  }

  async getAnnouncement(slug: string): Promise<Announcement | null> {
    const rows = await this.rows(
      this.sb.from("announcements").select("*, announcement_categories(name)").eq("slug", slug).limit(1),
    );
    return rows[0] ? this.mapAnnouncement(rows[0]) : null;
  }

  private mapEvent = (e: Record<string, any>): ChaplaincyEvent => ({
    slug: e.slug,
    title: e.title,
    description: e.description,
    category: e.category,
    startsAt: e.starts_at,
    endsAt: e.ends_at,
    timezone: e.timezone,
    venue: e.venue,
    organizer: e.organizer,
    isFeatured: e.is_featured,
    countdownEnabled: e.countdown_enabled,
    isCancelled: e.is_cancelled,
  });

  async getUpcomingEvents(limit = 20): Promise<ChaplaincyEvent[]> {
    const rows = await this.rows(
      this.sb.from("events").select("*").gte("starts_at", new Date().toISOString()).order("starts_at").limit(limit),
    );
    return rows.map(this.mapEvent);
  }

  async getEvent(slug: string): Promise<ChaplaincyEvent | null> {
    const rows = await this.rows(this.sb.from("events").select("*").eq("slug", slug).limit(1));
    return rows[0] ? this.mapEvent(rows[0]) : null;
  }

  async getEcclesiasticalDirectory(): Promise<EcclesiasticalEntry[]> {
    // 1. Check if admin configured custom directory in chaplaincy_settings
    try {
      const sRows = await this.rows(this.sb.from("chaplaincy_settings").select("value").eq("key", "directory.ecclesiastical"));
      if (sRows[0]?.value) {
        const val = typeof sRows[0].value === "string" ? JSON.parse(sRows[0].value) : sRows[0].value;
        if (Array.isArray(val) && val.length > 0) return val;
      }
    } catch {}

    // 2. Query relational ecclesiastical offices & appointments
    try {
      const offices = await this.rows(this.sb.from("ecclesiastical_offices").select("*").order("display_order"));
      if (offices && offices.length > 0) {
        const appts = await this.rows(
          this.sb.from("ecclesiastical_appointments").select("*, people(full_name, display_name, portrait:media_assets!portrait_id(object_key, storage_provider))").eq("is_current", true),
        );
        return offices.map((o) => {
          const a = appts.find((x) => x.office_id === o.id);
          return {
            officeKey: o.key,
            title: o.title,
            level: o.level,
            description: o.description,
            personName: a?.people?.display_name ?? null,
            occupancy: a?.occupancy ?? "occupied",
            designation: a?.designation,
            sourceUrl: a?.source_url,
            verifiedAt: a?.verified_at,
            portraitSrc: a?.people?.portrait ? this.mediaUrl(a.people.portrait.object_key) : null,
          };
        });
      }
    } catch {}

    // 3. Fallback to default canonical hierarchy
    return SEED_ECCLESIASTICAL;
  }

  async getLeadership(): Promise<LeadershipEntry[]> {
    const rows = await this.rows(
      this.sb
        .from("leadership_appointments")
        .select("is_current, people(display_name, biography), leadership_positions(key, title, display_order)")
        .eq("is_current", true),
    );
    return rows
      .sort((a, b) => (a.leadership_positions?.display_order ?? 0) - (b.leadership_positions?.display_order ?? 0))
      .map((r) => ({
        positionKey: r.leadership_positions.key,
        title: r.leadership_positions.title,
        personName: r.people.display_name,
        bio: r.people.biography,
        isCurrent: r.is_current,
      }));
  }

  async getContact(): Promise<SiteContact> {
    const rows = await this.rows(this.sb.from("chaplaincy_settings").select("key,value").like("key", "contact.%"));
    const v = (k: string) => rows.find((r) => r.key === k)?.value ?? null;
    return { address: v("contact.address"), phone: v("contact.phone"), email: v("contact.email"), mapsUrl: v("contact.maps_url") };
  }

  async getPublicMassIntentions(date: string): Promise<PublicMassIntention[]> {
    try {
      const rows = await this.rows(
        this.sb.from("public_mass_intentions").select("*").eq("scheduled_date", date).order("list_order"),
      );
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          scheduledDate: r.scheduled_date,
          activityName: r.activity_name,
          listOrder: r.list_order,
          text: r.intention_text,
          displayName: r.display_name,
        }));
      }
    } catch {}
    return SEED_MASS_INTENTIONS.filter((m) => m.scheduledDate === date || !m.scheduledDate);
  }

  async getPublicPrayerIntentions(limit = 30): Promise<PublicPrayerIntention[]> {
    try {
      const rows = await this.rows(
        this.sb.from("public_prayer_intentions").select("*").order("created_at", { ascending: false }).limit(limit),
      );
      if (rows && rows.length > 0) {
        return rows.map((r) => ({ id: r.id, body: r.body, category: r.category, displayName: r.display_name }));
      }
    } catch {}
    return SEED_PRAYER_INTENTIONS.slice(0, limit);
  }

  async getOfferingInfo(): Promise<OfferingInfo> {
    const rows = await this.rows(this.sb.from("chaplaincy_settings").select("key,value").like("key", "offering.%"));
    const v = (k: string) => rows.find((r) => r.key === k)?.value ?? null;
    return { amount: v("offering.amount"), bankInstructions: v("offering.bank_instructions") };
  }

  async getMassOptions(): Promise<MassOption[]> {
    const rows = await this.rows(this.sb.from("activities").select("id,name").eq("kind", "mass").order("name"));
    return [{ id: "", name: "Any Mass" }, ...rows.map((r) => ({ id: r.id, name: r.name }))];
  }

  async getHeroSlides(): Promise<Slide[]> {
    const rows = await this.rows(
      this.sb
        .from("hero_slides")
        .select("*, image:media_assets!image_id(object_key,alt_text,width,height,credit), background:media_assets!background_id(object_key,alt_text,width,height)")
        .order("display_order"),
    );
    const toImage = (m: any): SlideImage | undefined =>
      m ? { src: this.mediaUrl(m.object_key), width: m.width ?? undefined, height: m.height ?? undefined, alt: m.alt_text ?? "", title: undefined, byline: m.credit ?? undefined, maxCssWidth: m.width ?? undefined } : undefined;
    return rows.map((r) => ({
      id: r.id,
      kind: "inscription" as const,
      latin: r.latin,
      english: r.english,
      source: r.source ?? undefined,
      art: "rose" as const,
      image: toImage(r.image),
      background: toImage(r.background),
      cta: r.cta_href && r.cta_href.startsWith("/") ? { href: r.cta_href, label: r.cta_label } : undefined,
    }));
  }

  async getDailyReadings(date: string): Promise<DailyReadings | null> {
    const rows = await this.rows(this.sb.from("daily_readings").select("*").eq("on_date", date).eq("status", "published").limit(1));
    const r = rows[0];
    if (!r) return null;
    const part = (ref: string | null, text: string | null) => (ref ? { ref, text: text ?? undefined } : undefined);
    return {
      date: r.on_date,
      firstReading: part(r.first_reading_ref, r.first_reading_text),
      psalm: part(r.psalm_ref, r.psalm_text),
      secondReading: part(r.second_reading_ref, r.second_reading_text),
      gospel: part(r.gospel_ref, r.gospel_text),
      translation: r.translation ?? undefined,
      sourceNote: r.source_note,
    };
  }

  async getLiturgicalOverrides(): Promise<LiturgicalOverride[]> {
    const rows = await this.rows(this.sb.from("liturgical_overrides").select("*").eq("status", "published"));
    return rows.map((r) => ({
      id: r.id, date: r.on_date, repeatsYearly: Boolean(r.repeats_yearly), name: r.name, latinName: r.latin_name ?? undefined,
      rank: r.rank, colour: r.colour ?? undefined, mode: r.mode, note: r.note ?? undefined,
    }));
  }

  async getAboutHistory(): Promise<string | null> {
    const rows = await this.rows(this.sb.from("chaplaincy_settings").select("value").eq("key", "about.history").limit(1));
    const v = rows[0]?.value;
    return typeof v === "string" && v.trim() ? v : null;
  }

  async getSaintProfiles(ids: string[]): Promise<SaintProfile[]> {
    if (!ids.length) return [];
    const rows = await this.rows(this.sb.from("saint_profiles").select("celebration_id,name,summary,source_name,source_url").in("celebration_id", ids));
    return rows.map((r) => ({ celebrationId: r.celebration_id, name: r.name, summary: r.summary, sourceName: r.source_name, sourceUrl: r.source_url ?? undefined }));
  }
}
