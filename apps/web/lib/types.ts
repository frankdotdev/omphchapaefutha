export type Weekday = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export interface RecurringSchedule {
  id: string;
  activityKey: string;
  label: string;
  weekday: Weekday;
  /** "HH:MM" 24h wall-clock in `timezone`. null when no time has been supplied. */
  startTime: string | null;
  /** 1..5 = nth occurrence of the weekday in the month; null = every week */
  nthOfMonth: number | null;
  timezone: string;
  note?: string | null;
  location?: string | null;
  sortOrder: number;
}

export interface ScheduleException {
  id: string;
  onDate: string; // YYYY-MM-DD, Africa/Lagos calendar date
  kind: "cancel" | "replace" | "add";
  recurringScheduleId?: string | null;
  label?: string | null;
  startTime?: string | null;
  location?: string | null;
  note?: string | null;
}

export interface ScheduleEntry {
  key: string;
  label: string;
  startTime: string | null;
  location?: string | null;
  note?: string | null;
  /** Why this entry differs from the normal weekly pattern, if it does. */
  status: "regular" | "rescheduled" | "added" | "cancelled";
}

export interface SocietyCategory { key: string; name: string; displayOrder: number }

export interface Society {
  slug: string;
  name: string;
  shortName?: string | null;
  categoryKey: string;
  summary?: string | null;
  mission?: string | null;
  spirituality?: string | null;
  movementHistory?: string | null;
  localHistory?: string | null;
  patron?: string | null;
  feastDay?: string | null;
  activities?: string | null;
  meetingSchedule?: string | null;
  meetingVenue?: string | null;
  membershipInfo?: string | null;
  isFeatured: boolean;
  imageSrc?: string | null;
  /** Whether the editorial content has been checked against sources. */
  verified: boolean;
  published: boolean;
}

export interface Announcement {
  slug: string;
  title: string;
  excerpt?: string | null;
  body: string;
  category?: string | null;
  issuedBy?: string | null;
  publishedAt: string;
  isUrgent: boolean;
  isFeatured: boolean;
}

export interface ChaplaincyEvent {
  slug: string;
  title: string;
  description?: string | null;
  category?: string | null;
  startsAt: string; // ISO instant
  endsAt?: string | null;
  timezone: string;
  venue?: string | null;
  organizer?: string | null;
  isFeatured: boolean;
  countdownEnabled: boolean;
  isCancelled: boolean;
}

export interface EcclesiasticalEntry {
  officeKey: string;
  title: string;
  level: "universal" | "nunciature" | "province" | "diocese" | "chaplaincy";
  description?: string | null;
  /** Null until an appointment has been verified against official sources. */
  personName: string | null;
  occupancy: "occupied" | "vacant" | "administered";
  designation?: string | null;
  sourceUrl?: string | null;
  verifiedAt?: string | null;
  /** Portrait image URL, set through the media library */
  portraitSrc?: string | null;
}

export interface LeadershipEntry {
  positionKey: string;
  title: string;
  personName: string;
  bio?: string | null;
  isCurrent: boolean;
}

export interface SiteContact {
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  mapsUrl?: string | null;
}

export interface PublicMassIntention {
  id: string;
  scheduledDate: string;
  activityName: string | null;
  listOrder: number;
  text: string;
  displayName: string | null;
}

export interface PublicPrayerIntention {
  id: string;
  body: string;
  category: string | null;
  displayName: string | null;
}

/** Public offering instructions, maintained in protected admin settings. Null fields = not yet configured. */
export interface OfferingInfo {
  amount: string | null;
  bankInstructions: string | null;
}

export interface MassOption { id: string; name: string }

export const PRAYER_CATEGORIES = [
  "Thanksgiving", "Healing", "Family", "Studies and examinations", "Work and vocation",
  "Travel", "Guidance", "Repose of the faithful departed", "Other",
] as const;

// ---------------------------------------------------------------- liturgy, readings, saints
export type LiturgicalColour = "WHITE" | "RED" | "GREEN" | "PURPLE" | "ROSE" | "GOLD" | "BLACK";

export interface Celebration {
  id: string;
  name: string;
  /** Latin name when the calendar provides one */
  latinName?: string;
  rank: string;
  isOptional: boolean;
  /** Staff note, set for celebrations entered locally */
  note?: string;
}

export interface LiturgicalDay {
  date: string; // YYYY-MM-DD, Africa/Lagos
  season: string;
  colour: LiturgicalColour | null;
  sundayCycle: string | null;
  celebrations: Celebration[];
}

/** Entered by chaplaincy staff. Text fields exist only when staff recorded a source and permission. */
export interface DailyReadings {
  date: string;
  firstReading?: { ref: string; text?: string };
  psalm?: { ref: string; text?: string };
  secondReading?: { ref: string; text?: string };
  gospel?: { ref: string; text?: string };
  translation?: string;
  sourceNote: string;
}

export interface SaintProfile {
  celebrationId: string;
  name: string;
  summary: string;
  sourceName: string;
  sourceUrl?: string;
}

/** A celebration entered by staff for Nigeria, the diocese or the chaplaincy (not in the universal calendar). */
export interface LiturgicalOverride {
  id: string;
  date: string; // YYYY-MM-DD; with repeatsYearly only month and day matter
  repeatsYearly: boolean;
  name: string;
  latinName?: string;
  rank: "SOLEMNITY" | "FEAST" | "MEMORIAL" | "OPTIONAL_MEMORIAL" | "LOCAL";
  colour?: LiturgicalColour;
  mode: "add" | "replace";
  note?: string;
}
