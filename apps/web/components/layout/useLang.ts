"use client";
import { useEffect, useState } from "react";
import { LANGS, STORAGE_KEY, isLang, t as translate, type Lang } from "@/lib/i18n";

const EVENT = "omph-lang-change";

export function useLang() {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const read = () => {
      let v: string | null = null;
      try { v = localStorage.getItem(STORAGE_KEY); } catch { /* storage unavailable */ }
      const next: Lang = isLang(v) ? v : "en";
      setLangState(next);
      document.documentElement.lang = LANGS.find((l) => l.code === next)!.htmlLang;
    };
    read();
    window.addEventListener(EVENT, read);
    return () => window.removeEventListener(EVENT, read);
  }, []);
  const setLang = (next: Lang) => {
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    window.dispatchEvent(new Event(EVENT));
  };
  return { lang, setLang, t: (key: string, fallback: string) => translate(lang, key, fallback) };
}
