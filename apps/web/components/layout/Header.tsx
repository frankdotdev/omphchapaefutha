"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { MORE_NAV, NAV, PRIMARY_NAV, SITE } from "@/lib/site";
import { LangSwitcher } from "./LangSwitcher";
import { useLang } from "./useLang";

export function Header() {
  const pathname = usePathname();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!moreOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  const current = (href: string) => (pathname === href || pathname.startsWith(href + "/") ? "page" : undefined);

  const brand = (
    <Link href="/" className="brand" aria-label={`${SITE.name}, ${SITE.designation} — home`}>
      <Logo />
      <span className="brand-name">
        OMPH
        <small>Chaplaincy · {SITE.designation}</small>
      </span>
    </Link>
  );

  return (
    <header className="site-header">
      <div className="wrap">
        {brand}
        <nav className="nav-desktop" aria-label="Main">
          <ul>
            {PRIMARY_NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={current(n.href)}>{t(n.href, n.label)}</Link>
              </li>
            ))}
            <li className="nav-dropdown" ref={moreRef}>
              <button
                type="button"
                className="nav-dropdown-btn"
                aria-expanded={moreOpen}
                aria-haspopup="true"
                onClick={() => setMoreOpen((v) => !v)}
              >
                {t("more", "More")} <ChevronDown size={14} aria-hidden="true" style={{ transform: moreOpen ? "rotate(180deg)" : undefined, transition: "transform 0.15s ease" }} />
              </button>
              {moreOpen && (
                <ul className="nav-dropdown-menu" role="menu">
                  {MORE_NAV.map((n) => (
                    <li key={n.href} role="none">
                      <Link
                        href={n.href}
                        role="menuitem"
                        aria-current={current(n.href)}
                        onClick={() => setMoreOpen(false)}
                      >
                        {t(n.href, n.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <LangSwitcher />
          <button
            ref={btnRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} aria-hidden="true" /> {t("menu", "Menu")}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-drawer" className="drawer" role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="drawer-head">
            {brand}
            <button ref={closeRef} type="button" className="menu-btn" onClick={() => { setOpen(false); btnRef.current?.focus(); }}>
              <X size={20} aria-hidden="true" /> {t("close", "Close")}
            </button>
          </div>
          <nav aria-label="Main">
            <ul>
              <li><Link href="/" aria-current={pathname === "/" ? "page" : undefined}>{t("home", "Home")}</Link></li>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={current(n.href)}>{t(n.href, n.label)}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
