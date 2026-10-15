"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { friendlyError, getAdminClient, type AdminClient } from "@/lib/admin/client";
import { ADMIN_NAV, can } from "@/lib/admin/resources";

interface Ctx { client: AdminClient; email: string; perms: string[] }
const AdminCtx = createContext<Ctx | null>(null);
export const useAdmin = () => {
  const c = useContext(AdminCtx);
  if (!c) throw new Error("useAdmin outside AdminShell");
  return c;
};

/** Guards every panel page: requires a session, then shows only the sections the user may use. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const client = getAdminClient();
  const router = useRouter();
  const path = usePathname();
  const [state, setState] = useState<"loading" | "unavailable" | "error" | "ready">("loading");
  const [ctx, setCtx] = useState<Ctx | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!client.available) { setState("unavailable"); return; }
    (async () => {
      try {
        const email = await client.getSessionEmail();
        if (!email) { router.replace("/admin/login"); return; }
        const perms = await client.getPermissions();
        setCtx({ client, email, perms });
        setState("ready");
      } catch (e) { setErr(friendlyError(e)); setState("error"); }
    })();
  }, [client, router]);

  if (state === "loading") return <main id="main"><p className="admin-note" role="status">Loading…</p></main>;
  if (state === "unavailable") return <main id="main"><NotConnected /></main>;
  if (state === "error" || !ctx) return <main id="main"><div className="admin-note" role="alert"><p>{err}</p><Link href="/admin/login">Sign in again</Link></div></main>;

  const nav = ADMIN_NAV.filter((n) => can(ctx.perms, n.permission));
  const signOut = async () => { await client.signOut(); router.replace("/admin/login"); };

  return (
    <AdminCtx.Provider value={ctx}>
      <div className="admin">
        <aside className="admin-side">
          <Link className="admin-brand" href="/admin">OMPH Admin</Link>
          <nav aria-label="Admin sections">
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={path === n.href || (n.href !== "/admin" && path.startsWith(n.href)) ? "page" : undefined}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="admin-user">
            <span>{ctx.email}</span>
            <button type="button" className="btn secondary small" onClick={signOut}>Sign out</button>
            <Link href="/" className="admin-viewsite">View the public site</Link>
          </div>
        </aside>
        <main className="admin-main" id="main">{children}</main>
      </div>
    </AdminCtx.Provider>
  );
}

export function NotConnected() {
  return (
    <div className="admin-note">
      <h1>Admin is waiting for the database</h1>
      <p>This site is currently showing its built-in information only. Once the Supabase project is connected (see <code>database/README.md</code>), you can sign in here to manage content.</p>
    </div>
  );
}
