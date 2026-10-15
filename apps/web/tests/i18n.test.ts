import { describe, it, expect } from "vitest";
import { DICT, LANGS, t } from "@/lib/i18n";
import { NAV } from "@/lib/site";

describe("language switcher", () => {
  it("covers every nav item in every non-English language", () => {
    for (const l of LANGS.filter((x) => x.code !== "en")) for (const n of NAV) expect(DICT[l.code][n.href], `${l.code} ${n.href}`).toBeTruthy();
  });
  it("falls back to English", () => expect(t("ig", "/nope", "Fallback")).toBe("Fallback"));
});
