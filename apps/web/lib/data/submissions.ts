"use client";

import { createClient } from "@supabase/supabase-js";

/**
 * Visitor write operations. These call SECURITY DEFINER database functions that validate input, force the
 * safe initial state and are idempotent. When no backend is configured, `available` is false and the forms
 * show an honest "not available" state instead of pretending to succeed.
 * The NestJS API will provide the same interface.
 */
export interface MassIntentionInput {
  idempotencyKey: string;
  text: string;
  displayName: string;
  anonymous: boolean;
  privateContact: string;
  preferredDate: string | null;
  preferredActivityId: string | null;
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
  getMassIntentionStatus(reference: string): Promise<string | null>;
  submitPrayerIntention(i: PrayerIntentionInput): Promise<void>;
}

class UnavailableSubmissions implements SubmissionClient {
  readonly available = false;
  private fail(): never { throw new Error("Submissions are not available yet."); }
  async submitMassIntention(): Promise<never> { return this.fail(); }
  async declarePayment(): Promise<never> { return this.fail(); }
  async getMassIntentionStatus(): Promise<never> { return this.fail(); }
  async submitPrayerIntention(): Promise<never> { return this.fail(); }
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
    if (error) throw new Error(error.message);
    return { reference: data as string };
  }
  async declarePayment(reference: string, transactionRef: string) {
    const { error } = await this.sb.rpc("declare_mass_intention_payment", {
      p_reference: reference,
      p_transaction_ref: transactionRef,
    });
    if (error) throw new Error(error.message);
  }
  async getMassIntentionStatus(reference: string) {
    const { data, error } = await this.sb.rpc("mass_intention_status", { p_reference: reference });
    if (error) throw new Error(error.message);
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
    if (error) throw new Error(error.message);
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
    if (!res.ok) throw new Error("Could not submit intention.");
    return (await res.json()) as { reference: string };
  }

  async declarePayment(reference: string, transactionRef: string) {
    const res = await fetch(`${this.baseUrl}/api/v1/intentions/mass/declare-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, transactionRef }),
    });
    if (!res.ok) throw new Error("Could not declare payment.");
  }

  async getMassIntentionStatus(reference: string) {
    const res = await fetch(`${this.baseUrl}/api/v1/intentions/mass/status?reference=${encodeURIComponent(reference)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.status as string | null) ?? null;
  }

  async submitPrayerIntention(i: PrayerIntentionInput) {
    const res = await fetch(`${this.baseUrl}/api/v1/intentions/prayer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(i),
    });
    if (!res.ok) throw new Error("Could not submit prayer intention.");
  }
}

export function getSubmissionClient(): SubmissionClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (process.env.NEXT_PUBLIC_DATA_BACKEND === "supabase" && url && key) return new SupabaseSubmissions(url, key);
  if (process.env.NEXT_PUBLIC_DATA_BACKEND === "api" && apiUrl) return new ApiSubmissions(apiUrl);
  return new UnavailableSubmissions();
}


export const STATE_LABEL: Record<string, string> = {
  pending_payment: "Awaiting offering",
  payment_review: "Payment under review",
  pending_approval: "Awaiting approval",
  approved: "Approved",
  completed: "Completed",
  archived: "Archived",
  rejected: "Not accepted",
  cancelled: "Cancelled",
};
