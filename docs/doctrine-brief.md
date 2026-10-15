# Doctrine library authoring brief

Context: Q&A library for the website of Our Mother of Perpetual Help Chaplaincy (a Catholic chaplaincy at a Nigerian federal university teaching hospital). Readers: mainly Catholic students, many in medicine/health, plus curious non-Catholics. Accuracy matters far more than volume.

## Output
One JSON array per category file in /home/claude/omph/apps/web/data/doctrine/. Save progress early: write the file after the first batch, then rewrite the full array with additions. Entry fields, exactly:

{ "id": "<prefix>-<kebab-slug>" (unique), "category": "<category slug>", "question": "...?",
  "answer": "70-200 words, own words, paragraphs separated by \n\n, British/Nigerian English, warm, clear, no unexplained jargon",
  "sources": [ {"type":"ccc","ref":"1213"} | {"type":"ccc","ref":"1322-1327"} | {"type":"scripture","ref":"Matthew 16:18"} | {"type":"document","title":"Lumen Gentium","ref":"no. 25","year":"1964"} | {"type":"canon","ref":"can. 849"} ]  (1 to 4),
  "keywords": [4-8 lowercase search terms and synonyms people might type],
  "level": "basic" | "intermediate" | "advanced" }

Questions should sound like real people ask them, at mixed levels. Target about 80 entries; stop short rather than pad.

## Hard rules
1. VERIFY CITATIONS. Direct curl is blocked and vatican.va is blocked. Use the WebFetch tool on single-paragraph Catechism pages: https://www.scborromeo.org/ccc/para/<number>.htm (e.g. .../para/1374.htm) and confirm the paragraph really covers your point before citing it; for a range, check its first paragraph. Do NOT cite CCC numbers from memory. If a page cannot be fetched or does not match, drop that citation. Scripture refs must be real book/chapter:verse. Cite Church documents or canon numbers only when certain of the name and number (confirm via WebSearch/WebFetch on another site if possible); otherwise omit. Historical or devotional facts (dates, places, how a devotion is prayed) only if confirmed by a search.
2. NO VERBATIM QUOTES from the CCC, canon law, modern Bible translations, modern documents or liturgical translations (copyright). Paraphrase. Never invent quotations or attribute invented sayings to popes, saints, Mary or councils.
3. Faithful to authentic Catholic teaching, stated accurately and not watered down, with pastoral compassion. Distinguish dogma, doctrine, discipline, pious opinion and private revelation; say so when theologians legitimately differ. Where a practice varies by diocese or bishops' conference, say "check with your parish priest" rather than guessing.
4. Charitable and accurate toward other Christians and faiths; no polemic or strawmen; describe others' beliefs fairly first.
5. No invented facts, dates or statistics; no claims about Nigeria or any diocese you have not verified; no political endorsements; no medical or legal advice (point to a doctor, lawyer or priest). NEVER state who currently holds any office (pope, nuncio, archbishop, bishop); define offices generically.
6. Unique ids, distinct questions, every entry has all fields and 1+ sources.
7. Finish by validating with python3 (json.load, count, unique ids, required fields).

Final reply (under 120 words): entry count, how many CCC citations verified, topics skipped. Do not paste entries.
