"use client";
import { LANGS, isLang } from "@/lib/i18n";
import { useLang } from "./useLang";

export function LangSwitcher() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-switch">
      <label htmlFor="lang-select" className="sr-only">{t("language", "Language")}</label>
      <select id="lang-select" value={lang} onChange={(e) => isLang(e.target.value) && setLang(e.target.value)}>
        {LANGS.map((l) => <option key={l.code} value={l.code} lang={l.htmlLang}>{l.label}</option>)}
      </select>
    </div>
  );
}
