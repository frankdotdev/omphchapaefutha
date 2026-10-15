// Smoke + accessibility check. Usage: build, start the site (pnpm start -p 3111), then: node e2e/smoke.mjs
import { chromium } from "playwright-core";
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire(import.meta.url);
const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const PATHS = ["/", "/mass-schedule", "/mass-intentions", "/daily-readings", "/prayer-intentions", "/sacraments", "/ask", "/doctrine", "/about", "/announcements", "/events", "/societies", "/leadership", "/ecclesiastical-communion", "/contact", "/sacred-art", "/privacy", "/accessibility", "/offline", "/admin/login"];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
let failed = 0;
for (const path of PATHS) {
  const page = await ctx.newPage();
  const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
  const status = res?.status() ?? 0;
  await page.evaluate(axeSource);
  const r = await page.evaluate(() => axe.run({ exclude: [[".inscription"]] }, {  /* .inscription is aria-hidden decoration, exempt from contrast */ runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] }));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  const bad = r.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  const ok = status === 200 && !bad.length && !overflow;
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${path} status=${status} serious=${bad.length} hscroll=${overflow}`);
  for (const v of bad) console.log(`     ${v.id}: ${v.help} (${v.nodes.length})`, v.nodes[0]?.target?.join(" "));
  await page.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
