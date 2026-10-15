# Doctrine library: handoff for continued work

Status: the **infrastructure is complete; the content has barely started.** Only `prayer-and-spiritual-life.json`
has entries (10, written by a delegated agent: they are unreviewed, and their Catechism numbers 2653, 2157, 2828
and the Lumen Gentium reference "no. 40" should be re-checked against the Catechism before the chaplain sees them).
The other nine files are empty arrays (`[]`). The site, search and Ask a Padre all work with an
empty library and tell visitors honestly that no matching answer is available yet.

Continue this in Claude Code, Antigravity or any agent that can read files and browse. Read
`docs/doctrine-brief.md` first; it is the authoring brief (schema, wording rules, verification rules).

## What exists

| Piece | Location |
|---|---|
| Entry type, categories | `apps/web/lib/doctrine/types.ts` |
| Loader, weighted search | `apps/web/lib/doctrine/index.ts` (keywords 5, question 3, answer 1, phrase bonus) |
| Pages | `apps/web/app/(site)/doctrine/page.tsx`, `[id]/page.tsx` |
| Data, one file per category | `apps/web/data/doctrine/<category>.json` |
| Review gate | `apps/web/data/doctrine/reviewed.json` (`{"reviewedIds": [...]}`) |
| Validation tests | `apps/web/tests/doctrine.test.ts` (skips empty files; fails on bad entries) |

## Entry schema

```json
{
  "id": "ms-001",
  "category": "mary-and-saints",
  "question": "Why do Catholics honour Mary?",
  "answer": "70 to 200 words, our own words, paragraphs separated by a blank line.",
  "sources": [{ "type": "ccc", "ref": "971" }, { "type": "scripture", "ref": "Luke 1:48" }],
  "keywords": ["mary", "honour", "veneration", "hail mary"],
  "level": "basic"
}
```

Source types: `ccc` (`ref`), `scripture` (`ref`), `document` (`title`, optional `ref`, `year`), `canon` (`ref`).
`level`: `basic`, `intermediate`, `advanced`. Keep 4 to 8 keywords.

## Categories and id prefixes

| Slug | Prefix |
|---|---|
| god-trinity-creation | gtc- |
| jesus-christ | jc- |
| church-and-hierarchy | ch- |
| mary-and-saints | ms- |
| sacraments-initiation-healing | sih- |
| sacraments-service-and-liturgy | ssl- |
| scripture-and-tradition | st- |
| moral-life | ml- |
| prayer-and-spiritual-life | psl- |
| last-things-and-apologetics | lta- |

Ids are `<prefix><short-slug-or-number>` (for example `psl-what-is-prayer`), unique across all files.

## Rules (do not relax these)

1. **Own words.** Never paste the Catechism, a papal document or a Bible translation. Paraphrase and cite.
2. **Every claim is sourced.** At least one source per entry. Cite only paragraph numbers you have opened and checked.
3. **No office-holder names** in answers (popes, bishops change). Say "the Pope" or "the bishop".
4. **No invented local facts.** Chaplaincy-specific information does not belong here.
5. **Nothing is "reviewed" until the chaplain says so.** Add an id to `reviewed.json` only after review.
6. **Sensitive questions** (suicide, abuse, medical, legal) get a short, pastoral answer that points to a priest or professional.
7. The death penalty entry needs a current source (the Catechism text was revised in 2018); check before writing.

## Verifying Catechism paragraphs

vatican.va is not reachable from the build environment used so far. Paragraph pages at
`scborromeo.org` (CCC by paragraph) were readable and matched. Elsewhere, use the official Vatican
Catechism online or the USCCB's copy. Open the paragraph, confirm the topic, then cite.

### Paragraphs already checked (topic matched)

God and creation: 36 (knowing God by reason), 159 (faith and science), 253 (one God in three persons),
283 (creation and science), 309 (the problem of evil), 336 (guardian angels), 404 (original sin).
Christ: 464 (true God and true man), 496 (virginal conception), 615 (why Christ died), 638 (the Resurrection).
Church: 811 (four marks), 846 (outside the Church), 843 and 847 (other religions), 861 (apostolic succession),
881 (Peter), 891 (infallibility).
Mary and saints: 491 (Immaculate Conception), 495 (Mother of God), 956 (intercession of saints),
966 (Assumption), 971 (honouring Mary), 2132 (images).
Sacraments: 1213, 1250, 1256 (Baptism), 1285 (Confirmation), 1374 and 1376 (Real Presence),
1385 (preparing for Communion), 1461 (confession to a priest), 1499 (Anointing), 1536 (Holy Orders),
1577 (men only), 1601 (marriage), 1631 and 1640 (marriage), 1578 and 1583 (Orders).
Scripture and faith: 80 (Scripture and Tradition), 105 (inspiration), 120 (the canon).
Moral life: 1778 (conscience), 1857 (mortal sin), 2056 (Ten Commandments), 2116 and 2117 (astrology, occult),
2181 (Sunday), 2270 (abortion), 2277 (euthanasia), 2283 (suicide), 2296 (organ donation), 2301 (cremation),
2370 (regulating births), 2408 (theft), 2477 (rash judgement), 2482 (lying).
Prayer: 2559 (what prayer is), 2705 (meditation), 2759 (the Our Father).
Last things: 997 (resurrection of the body), 1021 (death and judgement), 1023 (heaven), 1030 (purgatory), 1033 (hell).

Re-open any you rely on; this list is a starting aid, not a substitute for checking.

## Suggested way to proceed

1. Start with the ~65 topics above (one entry each), then widen with the standard questions people ask.
2. Work one category file at a time; run `pnpm --filter web test` after each (the doctrine tests validate shape, unique ids, source presence, word count).
3. Aim for breadth first; the original ambition is 1000+ entries, which needs a team and chaplain review.
4. When a batch is ready, send it to the chaplain; record approvals in `reviewed.json`.

## Ask a Padre dependency

`/ask` searches this library first and only calls Magisterium (if `MAGISTERIUM_API_KEY` is set) when the library has no good match. A fuller library makes the chatbot cheaper and more reliable.
