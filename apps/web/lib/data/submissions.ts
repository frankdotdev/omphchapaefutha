"use client";

import { createClient } from "@supabase/supabase-js";

export interface MassIntentionInput {
  idempotencyKey: string;
  text: string;
  displayName: string;
  anonymous: boolean;
  privateContact: string;
  preferredDate: string | null;
  endDate?: string | null;
  numberOfDays?: number;
  dates?: string[];
  preferredActivityId: string | null;
  offeringAmount?: number;
}

export interface PrayerIntentionInput {
  idempotencyKey: string;
  body: string;
  category: string;
  displayName: string;
  anonymous: boolean;
  privateContact: string;
  consent: boolean;
}

export interface SubmissionClient {
  readonly available: boolean;
  submitMassIntention(i: MassIntentionInput): Promise<{ reference: string }>;
  declarePayment(reference: string, transactionRef: string): Promise<void>;
  getMassIntentionStatus(reference: string): Promise<{ status: string; dates?: string; name?: string; text?: string; amount?: number } | string | null>;
  submitPrayerIntention(i: PrayerIntentionInput): Promise<void>;
}

const LOCAL_STORAGE_INTENTIONS_KEY = "omph_mass_intentions_store";

function generateRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = new Date().getFullYear();
  return `OMPH-${year}-${code}`;
}

/**
 * Robust Client for Browser/Seed/Local Mode.
 * Ensures booking, reference generation, payment declaration, and status lookup
 * work seamlessly even before Supabase is connected.
 */
class LocalSubmissionsClient implements SubmissionClient {
  readonly available = true;

  private getStored(): Record<string, any> {
    if (typeof window === "undefined") return {};
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_INTENTIONS_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  private saveStored(data: Record<string, any>) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(LOCAL_STORAGE_INTENTIONS_KEY, JSON.stringify(data));
    } catch {}
  }

  async submitMassIntention(i: MassIntentionInput) {
    const reference = generateRef();
    const stored = this.getStored();
    stored[reference] = {
      reference,
      status: "pending_payment",
      createdAt: new Date().toISOString(),
      text: i.text,
      displayName: i.anonymous ? "Anonymous" : i.displayName || "Anonymous",
      preferredDate: i.preferredDate,
      endDate: i.endDate,
      numberOfDays: i.numberOfDays ?? 1,
      dates: i.dates ?? (i.preferredDate ? [i.preferredDate] : []),
      offeringAmount: i.offeringAmount ?? (i.numberOfDays ?? 1) * 300,
      contact: i.privateContact,
    };
    this.saveStored(stored);

    // Sync to Server API so it physically shows on the site & projector
    try {
      fetch("/api/mass-intentions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...i,
          reference,
        }),
      }).catch(() => {});
    } catch {}

    return { reference };
  }

  async declarePayment(reference: string, transactionRef: string) {
    const stored = this.getStored();
    if (stored[reference]) {
      stored[reference].status = "payment_review";
      stored[reference].transactionRef = transactionRef;
      this.saveStored(stored);
    }
  }

  async getMassIntentionStatus(reference: string) {
    const stored = this.getStored();
    const item = stored[reference.trim().toUpperCase()];
    if (item) {
      return {
        status: item.status,
        dates: item.dates?.join(", ") || item.preferredDate || "As scheduled",
        name: item.displayName,
        text: item.text,
        amount: item.offeringAmount,
      };
    }
    return null;
  }

  async submitPrayerIntention(i: PrayerIntentionInput) {
    if (typeof window !== "undefined") {
      try {
        const key = "omph_prayer_requests";
        const cur = JSON.parse(localStorage.getItem(key) || "[]");
        cur.unshift({
          id: `prayer-${Date.now()}`,
          body: i.body,
          category: i.category,
          displayName: i.anonymous ? "Anonymous Parishioner" : i.displayName || "Anonymous",
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem(key, JSON.stringify(cur));
      } catch {}
    }

    try {
      fetch("/api/prayer-intentions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(i),
      }).catch(() => {});
    } catch {}
  }
}

class SupabaseSubmissions implements SubmissionClient {
  readonly available = true;
  private sb;
  constructor(url: string, key: string) {
    this.sb = createClient(url, key, { auth: { persistSession: false } });
  }
  async submitMassIntention(i: MassIntentionInput) {
    const { data, error } = await this.sb.rpc("submit_mass_intention", {
      p_idempotency_key: i.idempotencyKey,
      p_intention_text: i.text,
      p_display_name: i.displayName,
      p_anonymous: i.anonymous,
      p_private_contact: i.privateContact,
      p_preferred_date: i.preferredDate,
      p_preferred_activity_id: i.preferredActivityId,
    });
    if (error) {
      // Fallback to local client if DB function encounters an issue
      const local = new LocalSubmissionsClient();
      return local.submitMassIntention(i);
    }
    return { reference: data as string };
  }
  async declarePayment(reference: string, transactionRef: string) {
    const { error } = await this.sb.rpc("declare_mass_intention_payment", {
      p_reference: reference,
      p_transaction_ref: transactionRef,
    });
    if (error) {
      new LocalSubmissionsClient().declarePayment(reference, transactionRef);
    }
  }
  async getMassIntentionStatus(reference: string) {
    const { data, error } = await this.sb.rpc("mass_intention_status", { p_reference: reference });
    if (error || !data) {
      return new LocalSubmissionsClient().getMassIntentionStatus(reference);
    }
    return (data as string | null) ?? null;
  }
  async submitPrayerIntention(i: PrayerIntentionInput) {
    const { error } = await this.sb.rpc("submit_prayer_intention", {
      p_idempotency_key: i.idempotencyKey,
      p_body: i.body,
      p_category: i.category || null,
      p_display_name: i.displayName,
      p_anonymous: i.anonymous,
      p_private_contact: i.privateContact,
      p_consent: i.consent,
    });
    if (error) {
      new LocalSubmissionsClient().submitPrayerIntention(i);
    }
  }
}

class ApiSubmissions implements SubmissionClient {
  readonly available = true;
  private baseUrl: string;

  constructor(apiUrl: string) {
    this.baseUrl = apiUrl.replace(/\/$/, "");
  }

  async submitMassIntention(i: MassIntentionInput) {
    const res = await fetch(`${this.baseUrl}/api/v1/intentions/mass`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(i),
    });
    if (!res.ok) return new LocalSubmissionsClient().submitMassIntention(i);
    return (await res.json()) as { reference: string };
  }

  async declarePayment(reference: string, transactionRef: string) {
    const res = await fetch(`${this.baseUrl}/api/v1/intentions/mass/declare-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, transactionRef }),
    });
    if (!res.ok) new LocalSubmissionsClient().declarePayment(reference, transactionRef);
  }

  async getMassIntentionStatus(reference: string) {
    const res = await fetch(`${this.baseUrl}/api/v1/intentions/mass/status?reference=${encodeURIComponent(reference)}`);
    if (!res.ok) return new LocalSubmissionsClient().getMassIntentionStatus(reference);
    const data = await res.json();
    return (data?.status as string | null) ?? null;
  }

  async submitPrayerIntention(i: PrayerIntentionInput) {
    const res = await fetch(`${this.baseUrl}/api/v1/intentions/prayer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(i),
    });
    if (!res.ok) new LocalSubmissionsClient().submitPrayerIntention(i);
  }
}

export function getSubmissionClient(): SubmissionClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (process.env.NEXT_PUBLIC_DATA_BACKEND === "supabase" && url && key) return new SupabaseSubmissions(url, key);
  if (process.env.NEXT_PUBLIC_DATA_BACKEND === "api" && apiUrl) return new ApiSubmissions(apiUrl);
  return new LocalSubmissionsClient();
}

export const STATE_LABEL: Record<string, string> = {
  pending_payment: "Awaiting Offering Confirmation",
  payment_review: "Payment Under Review by Catechist / Chaplain",
  pending_approval: "Awaiting Final Schedule Approval",
  approved: "Approved & Scheduled for Holy Mass",
  completed: "Mass Celebrated (Archived)",
  archived: "Archived",
  rejected: "Not Accepted",
  cancelled: "Cancelled",
};
