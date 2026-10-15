import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Resource } from "./resources";
import type { Row } from "./convert";

export interface Option { value: string; label: string }
export interface MediaOption extends Option { url: string }

export interface MediaUpload {
  alt: string;
  credit: string;
  rightsNote: string;
}

/**
 * Everything the admin screens need from a backend. The Supabase implementation below talks to PostgREST,
 * Auth and Storage directly; a NestJS implementation can replace it without touching any screen.
 * What a signed-in user may actually read or change is decided by the database (RLS), never by this client.
 */
export interface AdminClient {
  readonly available: boolean;
  getSessionEmail(): Promise<string | null>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  getPermissions(): Promise<string[]>;
  currentUserId(): Promise<string | null>;
  list(resource: Pick<Resource, "table" | "orderBy">, select?: string): Promise<Row[]>;
  listWhere(table: string, column: string, values: string[], order: { column: string; ascending?: boolean }): Promise<Row[]>;
  save(table: string, row: Row): Promise<Row>;
  remove(table: string, id: string): Promise<void>;
  count(table: string, column?: string, value?: string): Promise<number>;
  fkOptions(fk: { table: string; labelColumn: string }): Promise<Option[]>;
  mediaOptions(): Promise<MediaOption[]>;
  listMedia(): Promise<(Row & { url: string })[]>;
  uploadMedia(file: File, meta: MediaUpload, size: { width: number; height: number }): Promise<Row>;
  removeMedia(row: Row): Promise<void>;
  getSettings(): Promise<Record<string, string>>;
  saveSetting(key: string, value: string, isPublic: boolean): Promise<void>;
}

export const ALLOWED_UPLOAD_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Returns a message when the file cannot be uploaded; the bucket enforces the same limits. */
export function checkUpload(file: { type: string; size: number }): string | null {
  if (!ALLOWED_UPLOAD_TYPES.includes(file.type)) return "Please choose a JPEG, PNG or WebP image.";
  if (file.size > MAX_UPLOAD_BYTES) return "The image is larger than 5 MB. Please reduce its size and try again.";
  return null;
}

const NOT_CONNECTED = "The site is not connected to its database yet.";

class UnavailableAdminClient implements AdminClient {
  readonly available = false;
  private fail(): never { throw new Error(NOT_CONNECTED); }
  async getSessionEmail() { return null; }
  async signIn(): Promise<void> { this.fail(); }
  async signOut() {}
  async getPermissions() { return []; }
  async currentUserId() { return null; }
  async list(): Promise<Row[]> { return this.fail(); }
  async listWhere(): Promise<Row[]> { return this.fail(); }
  async save(): Promise<Row> { return this.fail(); }
  async remove(): Promise<void> { this.fail(); }
  async count(): Promise<number> { return this.fail(); }
  async fkOptions(): Promise<Option[]> { return this.fail(); }
  async mediaOptions(): Promise<MediaOption[]> { return this.fail(); }
  async listMedia(): Promise<(Row & { url: string })[]> { return this.fail(); }
  async uploadMedia(): Promise<Row> { return this.fail(); }
  async removeMedia(): Promise<void> { this.fail(); }
  async getSettings(): Promise<Record<string, string>> { return this.fail(); }
  async saveSetting(): Promise<void> { this.fail(); }
}

/** Turns a database error into wording a non-technical administrator can act on. */
export function friendlyError(e: unknown): string {
  const msg = e instanceof Error ? e.message : typeof e === "object" && e && "message" in e ? String((e as any).message) : String(e);
  if (/row-level security|permission denied/i.test(msg)) return "You do not have permission to do that.";
  if (/duplicate key|unique constraint/i.test(msg)) return "That value is already in use. Please choose a different one.";
  if (/Invalid login credentials/i.test(msg)) return "The email or password is not correct.";
  if (/Invalid Mass intention transition/i.test(msg)) return "That change is not allowed from the intention's current stage.";
  if (/without verified payment/i.test(msg)) return "Verify the payment first, or record why this was entered manually.";
  if (/violates check constraint/i.test(msg)) return "One of the values is not allowed. Please review the form.";
  if (/Failed to fetch|NetworkError/i.test(msg)) return "Could not reach the server. Check your connection and try again.";
  return msg || "Something went wrong. Please try again.";
}

class SupabaseAdminClient implements AdminClient {
  readonly available = true;
  private sb: SupabaseClient;
  private baseUrl: string;

  constructor(url: string, anonKey: string) {
    this.baseUrl = url.replace(/\/$/, "");
    // Staff sessions persist in the browser; visitors never get here.
    this.sb = createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true } });
  }

  private url(key: string) { return `${this.baseUrl}/storage/v1/object/public/media/${key}`; }
  private check<T>(r: { data: T; error: any }): T {
    if (r.error) throw new Error(r.error.message);
    return r.data;
  }

  async getSessionEmail() {
    const { data } = await this.sb.auth.getSession();
    return data.session?.user.email ?? null;
  }
  async signIn(email: string, password: string) {
    const { error } = await this.sb.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  }
  async signOut() { await this.sb.auth.signOut(); }
  async getPermissions(): Promise<string[]> {
    const { data, error } = await this.sb.rpc("my_permissions");
    if (error) throw new Error(error.message);
    return (data as any[] | null)?.map((x) => (typeof x === "string" ? x : x.key ?? x.my_permissions)).filter(Boolean) ?? [];
  }
  async currentUserId() {
    const { data } = await this.sb.auth.getUser();
    return data.user?.id ?? null;
  }
  async list(resource: Pick<Resource, "table" | "orderBy">, select = "*") {
    const q = this.sb.from(resource.table).select(select).order(resource.orderBy.column, { ascending: resource.orderBy.ascending ?? true });
    return (this.check(await q) as unknown as Row[]) ?? [];
  }
  async listWhere(table: string, column: string, values: string[], order: { column: string; ascending?: boolean }) {
    const q = this.sb.from(table).select("*").in(column, values).order(order.column, { ascending: order.ascending ?? true });
    return (this.check(await q) as unknown as Row[]) ?? [];
  }
  async save(table: string, row: Row) {
    const { id, ...rest } = row;
    const q = id
      ? this.sb.from(table).update(rest).eq("id", id).select().single()
      : this.sb.from(table).insert(rest).select().single();
    return this.check(await q) as Row;
  }
  async remove(table: string, id: string) {
    this.check(await this.sb.from(table).delete().eq("id", id));
  }
  async count(table: string, column?: string, value?: string) {
    let q = this.sb.from(table).select("id", { count: "exact", head: true });
    if (column && value !== undefined) q = q.eq(column, value);
    const r = await q;
    if (r.error) throw new Error(r.error.message);
    return r.count ?? 0;
  }
  async fkOptions(fk: { table: string; labelColumn: string }) {
    const rows = this.check(await this.sb.from(fk.table).select("*").order(fk.labelColumn)) as any[];
    return rows.map((r) => ({ value: r.id, label: String(r[fk.labelColumn] ?? r.id) }));
  }
  async mediaOptions() {
    const rows = this.check(await this.sb.from("media_assets").select("id,object_key,alt_text,created_at").order("created_at", { ascending: false })) as any[];
    return rows.map((r) => ({ value: r.id, label: r.alt_text || r.object_key, url: this.url(r.object_key) }));
  }
  async listMedia() {
    const rows = this.check(await this.sb.from("media_assets").select("*").order("created_at", { ascending: false })) as Row[];
    return rows.map((r) => ({ ...r, url: this.url(r.object_key) }));
  }
  async uploadMedia(file: File, meta: MediaUpload, size: { width: number; height: number }) {
    const problem = checkUpload(file);
    if (problem) throw new Error(problem);
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const key = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
    const up = await this.sb.storage.from("media").upload(key, file, { contentType: file.type, upsert: false });
    if (up.error) throw new Error(up.error.message);
    const ins = await this.sb.from("media_assets").insert({
      object_key: key, mime_type: file.type, size_bytes: file.size,
      alt_text: meta.alt.trim(), credit: meta.credit.trim() || null, rights_note: meta.rightsNote.trim() || null,
      width: size.width, height: size.height,
    }).select().single();
    if (ins.error) {
      // Do not leave an orphaned file behind if the record could not be saved.
      await this.sb.storage.from("media").remove([key]);
      throw new Error(ins.error.message);
    }
    return ins.data as Row;
  }
  async removeMedia(row: Row) {
    this.check(await this.sb.from("media_assets").delete().eq("id", row.id));
    await this.sb.storage.from("media").remove([row.object_key]);
  }
  async getSettings() {
    const rows = this.check(await this.sb.from("chaplaincy_settings").select("key,value")) as any[];
    const out: Record<string, string> = {};
    for (const r of rows) out[r.key] = typeof r.value === "string" ? r.value : r.value == null ? "" : JSON.stringify(r.value);
    return out;
  }
  async saveSetting(key: string, value: string, isPublic: boolean) {
    this.check(await this.sb.from("chaplaincy_settings").upsert({ key, value, is_public: isPublic, updated_at: new Date().toISOString() }));
  }
}

let cached: AdminClient | null = null;

export function getAdminClient(): AdminClient {
  if (cached) return cached;
  const mode = process.env.NEXT_PUBLIC_DATA_BACKEND ?? "seed";
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  cached = mode === "supabase" && url && key ? new SupabaseAdminClient(url, key) : new UnavailableAdminClient();
  return cached;
}
