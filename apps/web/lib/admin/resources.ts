/**
 * Declarative definitions for the generic admin editors. Each resource maps to a database table; what a
 * user may actually do is decided by Row Level Security, not by this file (it only drives the UI).
 */
export type FieldType = "text" | "textarea" | "number" | "boolean" | "date" | "time" | "datetime" | "select" | "fk" | "media";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  hint?: string;
  options?: { value: string; label: string }[];
  /** for "fk": table and the column shown as the label */
  fk?: { table: string; labelColumn: string; select?: string };
  /** show as a column in the list */
  list?: boolean;
}

export interface Resource {
  key: string;
  table: string;
  title: string;
  singular: string;
  permission: string;
  titleField: string;
  orderBy: { column: string; ascending?: boolean };
  slugFrom?: string;
  defaults?: Record<string, unknown>;
  fields: Field[];
}

const STATUS: Field["options"] = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In review" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];
const REVIEW: Field["options"] = [
  { value: "unverified", label: "Unverified" },
  { value: "in_review", label: "In review" },
  { value: "verified", label: "Verified" },
];

export const RESOURCES: Resource[] = [
  {
    key: "announcements", table: "announcements", title: "Announcements", singular: "announcement",
    permission: "announcements.manage", titleField: "title", orderBy: { column: "created_at", ascending: false }, slugFrom: "title",
    defaults: { status: "draft", priority: 0, is_featured: false, is_urgent: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, list: true },
      { name: "slug", label: "URL slug", type: "text", hint: "Leave blank to generate from the title." },
      { name: "excerpt", label: "Short excerpt", type: "textarea" },
      { name: "body", label: "Body", type: "textarea", required: true, hint: "Separate paragraphs with a blank line. Plain text only." },
      { name: "issued_by", label: "Issued by", type: "text" },
      { name: "publish_at", label: "Publish at (Lagos time)", type: "datetime", list: true },
      { name: "expires_at", label: "Expires at (Lagos time)", type: "datetime" },
      { name: "is_featured", label: "Featured", type: "boolean" },
      { name: "is_urgent", label: "Urgent (shows in the top notice strip)", type: "boolean" },
      { name: "priority", label: "Priority", type: "number" },
      { name: "status", label: "Status", type: "select", options: STATUS, required: true, list: true },
    ],
  },
  {
    key: "events", table: "events", title: "Events", singular: "event",
    permission: "events.manage", titleField: "title", orderBy: { column: "starts_at", ascending: false }, slugFrom: "title",
    defaults: { status: "draft", timezone: "Africa/Lagos", is_featured: false, countdown_enabled: false, is_cancelled: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, list: true },
      { name: "slug", label: "URL slug", type: "text", hint: "Leave blank to generate from the title." },
      { name: "description", label: "Description", type: "textarea" },
      { name: "category", label: "Category", type: "text" },
      { name: "starts_at", label: "Starts (Lagos time)", type: "datetime", required: true, list: true },
      { name: "ends_at", label: "Ends (Lagos time)", type: "datetime" },
      { name: "venue", label: "Venue", type: "text" },
      { name: "organizer", label: "Organizer", type: "text" },
      { name: "registration_url", label: "Registration link", type: "text" },
      { name: "is_featured", label: "Featured on the home page", type: "boolean" },
      { name: "countdown_enabled", label: "Show countdown", type: "boolean" },
      { name: "is_cancelled", label: "Cancelled", type: "boolean" },
      { name: "status", label: "Status", type: "select", options: STATUS, required: true, list: true },
    ],
  },
  {
    key: "societies", table: "societies", title: "Societies and groups", singular: "society",
    permission: "societies.manage", titleField: "name", orderBy: { column: "display_order" }, slugFrom: "name",
    defaults: { status: "draft", review: "unverified", is_featured: false, display_order: 0 },
    fields: [
      { name: "name", label: "Name", type: "text", required: true, list: true },
      { name: "short_name", label: "Abbreviation", type: "text", list: true },
      { name: "slug", label: "URL slug", type: "text" },
      { name: "category_id", label: "Category", type: "fk", required: true, fk: { table: "society_categories", labelColumn: "name" } },
      { name: "summary", label: "Short introduction", type: "textarea" },
      { name: "mission", label: "Mission and purpose", type: "textarea" },
      { name: "spirituality", label: "Catholic identity and spirituality", type: "textarea" },
      { name: "movement_history", label: "History of the wider movement", type: "textarea" },
      { name: "local_history", label: "History at the chaplaincy", type: "textarea", hint: "Only verified local history." },
      { name: "patron", label: "Patron saint or devotion", type: "text" },
      { name: "patron_source", label: "Source for the patron", type: "text" },
      { name: "feast_day", label: "Feast day", type: "text" },
      { name: "activities", label: "Activities and apostolate", type: "textarea" },
      { name: "meeting_schedule", label: "Meeting days and times", type: "text" },
      { name: "meeting_venue", label: "Meeting venue", type: "text" },
      { name: "membership_info", label: "Membership information", type: "textarea" },
      { name: "source_notes", label: "Source notes (internal)", type: "textarea" },
      { name: "is_featured", label: "Featured", type: "boolean" },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "review", label: "Review status", type: "select", options: REVIEW, list: true },
      { name: "status", label: "Status", type: "select", options: STATUS, required: true, list: true },
    ],
  },
  {
    key: "activities", table: "activities", title: "Activities & Devotions", singular: "activity",
    permission: "schedule.manage", titleField: "name", orderBy: { column: "name" },
    defaults: { kind: "mass", is_active: true },
    fields: [
      { name: "name", label: "Name of activity", type: "text", required: true, list: true },
      { name: "key", label: "Unique key identifier", type: "text", required: true, list: true, hint: "For example: confession, infant-baptism, rosary-procession." },
      { name: "kind", label: "Category / Kind", type: "select", required: true, list: true, options: [
        { value: "mass", label: "Holy Mass" },
        { value: "devotion", label: "Devotion / Adoration" },
        { value: "sacrament", label: "Sacrament" },
        { value: "formation", label: "Catechism / Formation" },
        { value: "other", label: "Other pastoral activity" },
      ] },
      { name: "location", label: "Standard location", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "is_active", label: "Active", type: "boolean", list: true },
    ],
  },
  {
    key: "recurring-schedules", table: "recurring_schedules", title: "Timetable & Schedules", singular: "schedule item",
    permission: "schedule.manage", titleField: "label", orderBy: { column: "sort_order" },
    defaults: { weekday: "sun", status: "published", timezone: "Africa/Lagos", sort_order: 1 },
    fields: [
      { name: "activity_id", label: "Activity", type: "fk", required: true, list: true, fk: { table: "activities", labelColumn: "name" } },
      { name: "label", label: "Schedule label", type: "text", required: true, list: true, hint: "For example: Morning Mass, Confessions, Sunday Benediction." },
      { name: "weekday", label: "Day of week", type: "select", required: true, list: true, options: [
        { value: "sun", label: "Sunday" }, { value: "mon", label: "Monday" }, { value: "tue", label: "Tuesday" },
        { value: "wed", label: "Wednesday" }, { value: "thu", label: "Thursday" }, { value: "fri", label: "Friday" }, { value: "sat", label: "Saturday" },
      ] },
      { name: "start_time", label: "Start time (24h)", type: "time", list: true, hint: "HH:MM. Leave blank if untimed or follows another service." },
      { name: "nth_of_month", label: "Occurrence of weekday in month", type: "number", hint: "Leave blank for every week; enter 1..5 for specific week (e.g. 3 for 3rd Saturday)." },
      { name: "note", label: "Note shown to visitors", type: "text", hint: "For example: Every Saturday immediately after the Morning Mass." },
      { name: "sort_order", label: "Order", type: "number", list: true },
      { name: "status", label: "Status", type: "select", options: STATUS, required: true, list: true },
    ],
  },
  {
    key: "schedule-exceptions", table: "schedule_exceptions", title: "Schedule changes", singular: "schedule change",
    permission: "schedule.manage", titleField: "on_date", orderBy: { column: "on_date", ascending: false },
    defaults: { status: "draft", kind: "replace" },
    fields: [
      { name: "on_date", label: "Date", type: "date", required: true, list: true },
      { name: "kind", label: "Type of change", type: "select", required: true, list: true,
        options: [{ value: "cancel", label: "Cancel a regular activity" }, { value: "replace", label: "Reschedule a regular activity" }, { value: "add", label: "Add a special activity" }] },
      { name: "recurring_schedule_id", label: "Regular activity affected", type: "fk", hint: "Required for cancel and reschedule.", fk: { table: "recurring_schedules", labelColumn: "label", select: "id,label,weekday,start_time" } },
      { name: "label", label: "Name", type: "text", list: true },
      { name: "start_time", label: "New start time", type: "time" },
      { name: "location", label: "Location", type: "text" },
      { name: "note", label: "Note shown to visitors", type: "text" },
      { name: "status", label: "Status", type: "select", options: STATUS, required: true, list: true },
    ],
  },
  {
    key: "hero-slides", table: "hero_slides", title: "Home slideshow", singular: "slide",
    permission: "media.manage", titleField: "latin", orderBy: { column: "display_order" },
    defaults: { status: "draft", display_order: 10 },
    fields: [
      { name: "latin", label: "Latin inscription", type: "text", required: true, list: true },
      { name: "english", label: "English translation", type: "text", required: true, list: true },
      { name: "source", label: "Source of the text", type: "text", hint: "For example: Psalm 88:2 (Vulgate)." },
      { name: "image_id", label: "Framed image", type: "media", hint: "Shown beside the text. Upload in Media first." },
      { name: "background_id", label: "Background image", type: "media", hint: "Full-width, under a dark overlay. Use a large image." },
      { name: "cta_label", label: "Button text", type: "text" },
      { name: "cta_href", label: "Button link", type: "text", hint: "A page on this site, for example /events. Both button fields or neither." },
      { name: "display_order", label: "Order", type: "number", list: true },
      { name: "status", label: "Status", type: "select", options: STATUS, required: true, list: true },
    ],
  },
  {
    key: "daily-readings", table: "daily_readings", title: "Daily readings", singular: "day's readings",
    permission: "readings.manage", titleField: "on_date", orderBy: { column: "on_date", ascending: false },
    defaults: { status: "draft" },
    fields: [
      { name: "on_date", label: "Date", type: "date", required: true, list: true },
      { name: "first_reading_ref", label: "First reading (reference)", type: "text", hint: "For example: Isaiah 55:10-11." },
      { name: "first_reading_text", label: "First reading (text)", type: "textarea", hint: "Only paste text from a lectionary you hold permission to publish." },
      { name: "psalm_ref", label: "Psalm (reference)", type: "text" },
      { name: "psalm_text", label: "Psalm (text)", type: "textarea" },
      { name: "second_reading_ref", label: "Second reading (reference)", type: "text" },
      { name: "second_reading_text", label: "Second reading (text)", type: "textarea" },
      { name: "gospel_ref", label: "Gospel (reference)", type: "text", required: true },
      { name: "gospel_text", label: "Gospel (text)", type: "textarea" },
      { name: "translation", label: "Translation used", type: "text" },
      { name: "source_note", label: "Source and permission (required)", type: "text", required: true, hint: "Where this came from, and that you may publish it. Shown to visitors beneath the readings." },
      { name: "status", label: "Status", type: "select", options: STATUS, required: true, list: true },
    ],
  },
  {
    key: "liturgical-overrides", table: "liturgical_overrides", title: "Feast days (local)", singular: "local feast day",
    permission: "readings.manage", titleField: "name", orderBy: { column: "on_date", ascending: false },
    defaults: { status: "draft", rank: "FEAST", mode: "add", repeats_yearly: false },
    fields: [
      { name: "name", label: "Name of the celebration", type: "text", required: true, list: true },
      { name: "on_date", label: "Date", type: "date", required: true, list: true },
      { name: "repeats_yearly", label: "Repeats every year on this date", type: "boolean", list: true },
      { name: "rank", label: "Rank", type: "select", required: true, options: [
        { value: "SOLEMNITY", label: "Solemnity" }, { value: "FEAST", label: "Feast" }, { value: "MEMORIAL", label: "Memorial" },
        { value: "OPTIONAL_MEMORIAL", label: "Optional memorial" }, { value: "LOCAL", label: "Local celebration" } ] },
      { name: "colour", label: "Vestment colour", type: "select", hint: "Leave blank to keep the day's usual colour.", options: [
        { value: "WHITE", label: "White" }, { value: "RED", label: "Red" }, { value: "GREEN", label: "Green" }, { value: "PURPLE", label: "Violet" },
        { value: "ROSE", label: "Rose" }, { value: "GOLD", label: "Gold" }, { value: "BLACK", label: "Black" } ] },
      { name: "mode", label: "How it appears", type: "select", required: true, hint: "\"Main celebration\" overrides the day's headline and colour; the Church's usual entries stay under Also today.", options: [
        { value: "add", label: "Also today" }, { value: "replace", label: "Main celebration of the day" } ] },
      { name: "latin_name", label: "Latin name", type: "text" },
      { name: "note", label: "Note shown to visitors", type: "textarea", hint: "For example: Patronal feast of the chaplaincy. Mass at 7:00 am." },
      { name: "status", label: "Status", type: "select", options: STATUS, required: true, list: true },
    ],
  },
  {
    key: "saint-profiles", table: "saint_profiles", title: "Saint profiles", singular: "saint profile",
    permission: "readings.manage", titleField: "name", orderBy: { column: "name" },
    defaults: { status: "draft", review: "unverified" },
    fields: [
      { name: "name", label: "Name", type: "text", required: true, list: true },
      { name: "celebration_id", label: "Calendar ID", type: "text", required: true, hint: "Matches the celebration on the Readings page, for example teresa_of_jesus_of_avila_virgin." },
      { name: "summary", label: "Short biography", type: "textarea", required: true },
      { name: "source_name", label: "Source", type: "text", required: true, hint: "For example: Catholic Encyclopedia (1913), public domain." },
      { name: "source_url", label: "Source link", type: "text" },
      { name: "review", label: "Review status", type: "select", options: REVIEW, list: true, hint: "Only Verified profiles are shown to visitors." },
      { name: "status", label: "Status", type: "select", options: STATUS, required: true, list: true },
    ],
  },
  {
    key: "people", table: "people", title: "People", singular: "person",
    permission: "leadership.manage", titleField: "display_name", orderBy: { column: "display_name" },
    defaults: { contact_approved: false },
    fields: [
      { name: "display_name", label: "Name as displayed", type: "text", required: true, list: true },
      { name: "full_name", label: "Full name", type: "text", required: true },
      { name: "biography", label: "Biography", type: "textarea" },
      { name: "portrait_id", label: "Portrait", type: "media" },
      { name: "public_email", label: "Public email", type: "text" },
      { name: "public_phone", label: "Public phone", type: "text" },
      { name: "contact_approved", label: "Contact details approved for publication", type: "boolean" },
    ],
  },
  {
    key: "leadership", table: "leadership_appointments", title: "Chaplaincy leadership", singular: "appointment",
    permission: "leadership.manage", titleField: "id", orderBy: { column: "created_at", ascending: false },
    defaults: { status: "draft", is_current: true },
    fields: [
      { name: "person_id", label: "Person", type: "fk", required: true, list: true, fk: { table: "people", labelColumn: "display_name" } },
      { name: "position_id", label: "Position", type: "fk", required: true, list: true, fk: { table: "leadership_positions", labelColumn: "title" } },
      { name: "term_start", label: "Term starts", type: "date" },
      { name: "term_end", label: "Term ends", type: "date" },
      { name: "is_current", label: "Current", type: "boolean", list: true },
      { name: "verification_note", label: "Verification note", type: "text" },
      { name: "status", label: "Status", type: "select", options: STATUS, required: true, list: true },
    ],
  },
  {
    key: "communion", table: "ecclesiastical_appointments", title: "Communion with the Church", singular: "appointment",
    permission: "leadership.manage", titleField: "id", orderBy: { column: "id" },
    defaults: { status: "draft", is_current: true, occupancy: "occupied", review: "unverified", show_on_home: false },
    fields: [
      { name: "office_id", label: "Office", type: "fk", required: true, list: true, fk: { table: "ecclesiastical_offices", labelColumn: "title" } },
      { name: "person_id", label: "Person", type: "fk", list: true, fk: { table: "people", labelColumn: "display_name" } },
      { name: "occupancy", label: "Occupancy", type: "select", required: true,
        options: [{ value: "occupied", label: "Occupied" }, { value: "vacant", label: "Vacant" }, { value: "administered", label: "Temporarily administered" }] },
      { name: "designation", label: "Designation", type: "text", hint: "For example: Apostolic Administrator." },
      { name: "source_url", label: "Official source link", type: "text" },
      { name: "verified_at", label: "Date verified", type: "date" },
      { name: "review", label: "Review status", type: "select", options: REVIEW, list: true },
      { name: "is_current", label: "Current", type: "boolean" },
      { name: "show_on_home", label: "Show on the home page", type: "boolean" },
      { name: "status", label: "Status", type: "select", options: STATUS, required: true, list: true },
    ],
  },
];

export const resourceByKey = (key: string) => RESOURCES.find((r) => r.key === key);

/** Fixed public settings edited on the Settings page. Values are stored as JSON strings. */
export const SETTING_KEYS: { key: string; label: string; type: "text" | "textarea"; hint?: string }[] = [
  { key: "contact.address", label: "Address", type: "textarea" },
  { key: "contact.phone", label: "Telephone", type: "text" },
  { key: "contact.email", label: "Email", type: "text" },
  { key: "contact.maps_url", label: "Map link", type: "text", hint: "A link to the location on a map service." },
  { key: "about.history", label: "Chaplaincy history", type: "textarea", hint: "Shown on the About page. Separate paragraphs with a blank line. Publish only what the chaplaincy has confirmed." },
  { key: "offering.amount", label: "Mass intention offering", type: "text", hint: "Shown to visitors who offer an intention." },
  { key: "offering.bank_instructions", label: "How to give the offering", type: "textarea", hint: "Bank name, account name and number, and any reference to quote. Shown publicly." },
];

/** Admin navigation. `permission` hides links the signed-in user cannot use. */
export const ADMIN_NAV: { href: string; label: string; permission: string }[] = [
  { href: "/admin", label: "Dashboard", permission: "" },
  { href: "/admin/intentions", label: "Mass intentions", permission: "intentions.manage" },
  { href: "/admin/prayers", label: "Prayer requests", permission: "prayer.moderate" },
  ...RESOURCES.map((r) => ({ href: `/admin/${r.key}`, label: r.title, permission: r.permission })),
  { href: "/admin/media", label: "Media", permission: "media.manage" },
  { href: "/admin/settings", label: "Settings", permission: "settings.manage" },
];

/** "*" grants everything (super admin). */
export const can = (perms: string[], needed: string) => !needed || perms.includes("*") || perms.includes(needed);
