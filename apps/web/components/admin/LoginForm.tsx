"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { friendlyError, getAdminClient } from "@/lib/admin/client";
import { Field } from "@/components/forms/Field";
import { NotConnected } from "./AdminShell";

export function LoginForm() {
  const client = getAdminClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!client.available) return <NotConnected />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError("");
    try { await client.signIn(email.trim(), password); router.replace("/admin"); }
    catch (err) { setError(friendlyError(err)); }
    finally { setBusy(false); }
  };

  return (
    <form className="form login" onSubmit={submit} noValidate>
      <h1>Staff sign in</h1>
      <Field id="email" label="Email"><input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
      <Field id="password" label="Password"><input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></Field>
      {error && <p className="field-error" role="alert">{error}</p>}
      <button className="btn" type="submit" disabled={busy || !email || !password}>{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
