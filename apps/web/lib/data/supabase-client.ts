import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { DataClient } from "./client";
import type { Slide, SlideImage } from "@/lib/slides";
import type {
  Announcement,
  ChaplaincyEvent,
  ChurchAccountProject,
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
import {
  SEED_SOCIETIES,
  SEED_ECCLESIASTICAL,
  SEED_MASS_INTENTIONS,
  SEED_PRAYER_INTENTIONS,
  SEED_OFFERING_INFO,
  SEED_CHURCH_ACCOUNTS,
} from "./seed";

const hhmm = (t: string | null) => (t ? t.slice(0, 5) : null);

export class SupabaseDataClient implements DataClient {
  readonly backend = "supabase" as const;
  private sb: SupabaseClient;

  constructor(url: string, key: string) {
    this.sb = createClient(url, key, { auth: { persistSession: false } });
  }

  private async rows<T>(query: PromiseLike<{ data: T[] | null; error: unknown }>): Promise<T[]> {
    const { data, error } = await query;
    if (error) throw new Error(typeof error === "object" && error && "message" in error ? String((error as any).message) : "Database query failed");
    return data ?? [];
  }

  async getRecurringSchedule(): Promise<RecurringSchedule[]> {
    const rows = await this.rows(
      this.sb
        .from("recurring_schedules")
        .select("id, weekday, start_time, nth_of_month, timezone, note, sort_order, label, activities!inner(key, location)")
        .eq("status", "published")
        .order("sort_order"),
    );
    return rows.map((r: any) => ({
      id: r.id,
      activityKey: r.activities.key,
      label: r.label,
      weekday: r.weekday as Weekday,
      startTime: hhmm(r.start_time),
      nthOfMonth: r.nth_of_month,
      timezone: r.timezone,
      note: r.note,
      location: r.activities.location,
      sortOrder: r.sort_order,
    }));
  }

  async getScheduleExceptions(from: string, to: string): Promise<ScheduleException[]> {
    const rows = await this.rows(
      this.sb
        .from("schedule_exceptions")
        .select("id, on_date, kind, recurring_schedule_id, label, start_time, location, note")
        .eq("status", "published")
        .gte("on_date", from)
        .lte("on_date", to)
        .order("on_date"),
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
    accountName: s.account_name ?? (s.slug === "catholic-men-organization" ? "CMO PADRE PIO" : null),
    accountNumber: s.account_number ?? (s.slug === "catholic-men-organization" ? "1024371925" : null),
    bankName: s.bank_name ?? (s.slug === "catholic-men-organization" ? "UBA" : null),
    executiveContacts: s.executive_contacts ?? null,
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

  async getAnnouncements(limit = 10): Promise<Announcement[]> {
    const rows = await this.rows(
      this.sb
        .from("announcements")
        .select("slug, title, excerpt, body, category, issued_by, publish_at, is_urgent, is_featured")
        .eq("status", "published")
        .order("priority", { ascending: false })
        .order("publish_at", { ascending: false })
        .limit(limit),
    );
    return rows.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      body: a.body,
      category: a.category,
      issuedBy: a.issued_by,
      publishedAt: a.publish_at,
      isUrgent: a.is_urgent,
      isFeatured: a.is_featured,
    }));
  }

  async getAnnouncement(slug: string): Promise<Announcement | null> {
    const rows = await this.rows(
      this.sb
        .from("announcements")
        .select("slug, title, excerpt, body, category, issued_by, publish_at, is_urgent, is_featured")
        .eq("status", "published")
        .eq("slug", slug)
        .limit(1),
    );
    const a = rows[0];
    return a
      ? {
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          body: a.body,
          category: a.category,
          issuedBy: a.issued_by,
          publishedAt: a.publish_at,
          isUrgent: a.is_urgent,
          isFeatured: a.is_featured,
        }
      : null;
  }

  async getUpcomingEvents(limit = 10): Promise<ChaplaincyEvent[]> {
    const rows = await this.rows(
      this.sb
        .from("events")
        .select("slug, title, description, category, starts_at, ends_at, timezone, venue, organizer, is_featured, countdown_enabled, is_cancelled")
        .eq("status", "published")
        .gte("starts_at", new Date().toISOString())
        .order("starts_at")
        .limit(limit),
    );
    return rows.map((e) => ({
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
    }));
  }

  async getEvent(slug: string): Promise<ChaplaincyEvent | null> {
    const rows = await this.rows(
      this.sb
        .from("events")
        .select("slug, title, description, category, starts_at, ends_at, timezone, venue, organizer, is_featured, countdown_enabled, is_cancelled")
        .eq("status", "published")
        .eq("slug", slug)
        .limit(1),
    );
    const e = rows[0];
    return e
      ? {
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
        }
      : null;
  }

  async getEcclesiasticalDirectory(): Promise<EcclesiasticalEntry[]> {
    try {
      const rows = await this.rows(
        this.sb
          .from("ecclesiastical_appointments")
          .select("id, occupancy, designation, source_url, verified_at, is_current, review, status, ecclesiastical_offices!inner(key, title, level, description), people(display_name)")
          .eq("status", "published")
          .eq("is_current", true),
      );
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          officeKey: r.ecclesiastical_offices.key,
          title: r.ecclesiastical_offices.title,
          level: r.ecclesiastical_offices.level,
          description: r.ecclesiastical_offices.description,
          personName: r.review === "verified" ? (r.people?.display_name ?? null) : null,
          occupancy: r.occupancy,
          designation: r.designation,
          sourceUrl: r.source_url,
          verifiedAt: r.verified_at,
        }));
      }
    } catch {}
    return SEED_ECCLESIASTICAL;
  }

  async getLeadership(): Promise<LeadershipEntry[]> {
    const rows = await this.rows(
      this.sb
        .from("leadership_appointments")
        .select("is_current, leadership_positions!inner(key, title, display_order), people!inner(display_name, biography)")
        .eq("status", "published")
        .eq("is_current", true),
    );
    return (rows as any[])
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
    return {
      address: v("contact.address"),
      phone: v("contact.phone") ?? "08063314891 (Catechist) / 08091422688 (Chaplain)",
      email: v("contact.email"),
      mapsUrl: v("contact.maps_url"),
    };
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
    try {
      const rows = await this.rows(this.sb.from("chaplaincy_settings").select("key,value").like("key", "offering.%"));
      const v = (k: string) => rows.find((r) => r.key === k)?.value ?? null;
      return {
        amount: v("offering.amount") ?? SEED_OFFERING_INFO.amount,
        bankInstructions: v("offering.bank_instructions") ?? SEED_OFFERING_INFO.bankInstructions,
        bankName: v("offering.bank_name") ?? SEED_OFFERING_INFO.bankName,
        accountName: v("offering.account_name") ?? SEED_OFFERING_INFO.accountName,
        accountNumber: v("offering.account_number") ?? SEED_OFFERING_INFO.accountNumber,
        catechistPhone: v("offering.catechist_phone") ?? SEED_OFFERING_INFO.catechistPhone,
        chaplainPhone: v("offering.chaplain_phone") ?? SEED_OFFERING_INFO.chaplainPhone,
        bazaarAccountName: SEED_OFFERING_INFO.bazaarAccountName,
        bazaarAccountNumber: SEED_OFFERING_INFO.bazaarAccountNumber,
        bazaarBankName: SEED_OFFERING_INFO.bazaarBankName,
        bazaarPhone: SEED_OFFERING_INFO.bazaarPhone,
      };
    } catch {
      return SEED_OFFERING_INFO;
    }
  }

  async getMassOptions(): Promise<MassOption[]> {
    const rows = await this.rows(this.sb.from("activities").select("id,name").eq("kind", "mass").order("name"));
    return [{ id: "", name: "Any Mass" }, ...rows.map((r) => ({ id: r.id, name: r.name }))];
  }

  async getHeroSlides(): Promise<Slide[]> {
    try {
      const rows = await this.rows(
        this.sb
          .from("hero_slides")
          .select("id, kind, latin, english, source, cta_label, cta_href, display_order, image:image_id(storage_path, alt_text, width, height), background:background_id(storage_path, alt_text, width, height)")
          .eq("status", "published")
          .order("display_order"),
      );
      return rows.map((r: any) => ({
        id: r.id,
        kind: (r.kind ?? "inscription") as "identity" | "inscription",
        latin: r.latin,
        english: r.english,
        source: r.source ?? undefined,
        cta: r.cta_label && r.cta_href ? { label: r.cta_label, href: r.cta_href } : undefined,
        image: r.image ? ({ src: r.image.storage_path, alt: r.image.alt_text ?? "", width: r.image.width, height: r.image.height } as SlideImage) : undefined,
        background: r.background ? ({ src: r.background.storage_path, alt: r.background.alt_text ?? "", width: r.background.width, height: r.background.height } as SlideImage) : undefined,
      }));
    } catch {
      return [];
    }
  }

  async getDailyReadings(date: string): Promise<DailyReadings | null> {
    const rows = await this.rows(this.sb.from("daily_readings").select("*").eq("status", "published").eq("on_date", date).limit(1));
    const r = rows[0];
    if (!r) return null;
    const part = (ref?: string | null, text?: string | null) => (ref ? { ref, text: text ?? undefined } : undefined);
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

  async getChurchAccounts(): Promise<ChurchAccountProject[]> {
    return SEED_CHURCH_ACCOUNTS;
  }
}
