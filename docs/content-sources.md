# Content sources: daily readings and saints

Status: researched 14 Oct 2026. "Checked" = read on the publisher's own page today. "Unchecked" = from general knowledge, confirm before relying on it.

## What the site does today
| Need | Source | Licence risk |
|---|---|---|
| Date, season, colour, rank, saints' names (English + Latin) | `romcal` 3.0.0 + General Roman Calendar plugin, computed in the app | None (MIT, no network). Checked. Universal calendar only: no Nigerian or Abakaliki proper days |
| Mass readings | Staff-entered references/text in Admin (Daily readings), else a plain link to the USCCB page for that date | None: USCCB says unframed links need no permission (checked) |
| Saint biographies | Staff-entered in Admin (Saint profiles), shown only when Verified, always with a source line | Depends on the source chosen (below) |

## Readings: options
1. **Link out (in use as the fallback).** USCCB: permission "may not be granted to post ... the daily or Sunday readings"; excerpts under 5,000 words / 40% of a book are allowed with exact wording and the copyright line; links are free (checked). Caveat: it follows the US lectionary, which may differ from the book used in Nigeria.
2. **Evangelizo.org feed.** Used by a WordPress plugin and an MIT-licensed GitHub wrapper; 17 languages; cached daily (checked). Neither states a licence for the text itself; the plugin only says the site owner claims no rights. Treat as "ask first": email Evangelizo for written permission before embedding.
3. **Universalis.** Commercial publisher (c) 1996-2026. Its homepage gives no syndication terms (checked); use their contact page to ask about a website licence and a Nigeria-calendar feed. Likely paid.
4. **Chaplaincy's own lectionary.** Staff type or paste references (and text only if they hold permission) in Admin. Most legally clean for text; labour-intensive; the chaplaincy owns the permission question.
5. **Public-domain text (Douay-Rheims / Clementine Vulgate).** Free to reproduce (latinprayer.org lists both as public domain, checked), but needs a date-to-reference table, wording and Psalm numbering differ from the modern lectionary, so label it clearly. Reasonable for Latin/traditional pages, not as "today's Mass readings".
6. **Vatican News** (unchecked): editorially strong, copyright reserved; link only.

## Recommendation
Launch with the calendar + saint names + link-out + staff-entered readings (already built). In parallel, write to Evangelizo and Universalis. If either grants written permission, add it as a provider in `lib/liturgy/readings.ts`; no page changes needed. Confirm with the chaplain which lectionary translation Nigerian parishes use.

## Saint biographies: options
- **Catholic Encyclopedia (1913)** and **Butler's Lives of the Saints** (older editions): public domain in the US (unchecked). Dated tone and old scholarship; have the chaplain review.
- **Wikipedia**: CC BY-SA 4.0, attribution and share-alike required (unchecked); quality varies, review needed.
- **Written by the chaplaincy**: safest and most local; slower.
Every profile needs a source line and "Verified" status before it appears.
