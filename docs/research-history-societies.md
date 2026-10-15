# Brief: researching the chaplaincy history and the society details

For Claude Code, Antigravity or any research agent with web access and file access. Read `docs/doctrine-brief.md`
sections on wording and verification first; the same rules apply here.

## Goal

Produce **draft, source-attributed** text for:
1. The chaplaincy's history (shown on `/about`).
2. Each society, association and organisation listed on `/societies`.

Everything you write enters the database as `draft` + `unverified`. A person at the chaplaincy marks it verified in the admin.

## Two kinds of fact, two ways of working

| Kind | Examples | How |
|---|---|---|
| **Wider movement** | Who founded the Legion of Mary and when; what the CYON is; the patron of a devotion | Research public sources (official websites, the Catholic Church's own documents, reputable reference works). Cite each source. |
| **Local to our chaplaincy** | When our chaplaincy began, past chaplains, when our Legion praesidium was formed, meeting days, current officers | **Cannot be found online. Never guess.** Leave the field empty and add it to `docs/questions-for-the-chaplaincy.md` for the office to answer. |

If a date, name or number is not in a source you can cite, do not write it.

## Where the text goes

### Society details (one society at a time)

Table `societies`, matched by `slug` (the list is in `database/seeds/0001_schedule_and_societies.sql`).
Columns you may fill: `summary`, `mission`, `spirituality`, `movement_history`, `patron`, `patron_source`, `feast_day`, `activities`, `source_notes`.
Leave `local_history`, `meeting_schedule`, `meeting_venue`, `membership_info` empty unless the chaplaincy supplied them.
Never change `status` or `review` (they stay `draft` / `unverified`).

Write one file, `database/seeds/0003_society_details.sql`, containing one statement per society:

```sql
update societies set
  summary = '...',
  mission = '...',
  spirituality = '...',
  movement_history = '...',
  patron = '...',
  patron_source = '...',
  feast_day = '...',
  activities = '...',
  source_notes = 'Sources: <title, publisher, URL, date accessed>; <next source>'
where slug = 'legion-of-mary';
```
Escape single quotes by doubling them. The file must run on plain PostgreSQL and be safe to re-run.

### Chaplaincy history

One paragraph block per topic, separated by blank lines, saved as `docs/history-draft.md` for the office to approve, and then entered
in the admin under **Settings, Chaplaincy history**. Include only what the chaplaincy has told you or what a citable source states
(for example the diocese or the university). Under the text, list the sources.

## Writing rules

- Plain, reverent English. Short paragraphs. 60 to 150 words per field.
- Your own words. No copying from websites; no long quotations.
- No claims about current office-holders (they change).
- No invented history, numbers, anniversaries or testimonies.
- A devotion's patron or feast day must come from the Church's own sources or the society's official constitution; cite it in `patron_source`.
- Keep the Catholic identity accurate; if two sources disagree, say nothing and list the disagreement in `docs/questions-for-the-chaplaincy.md`.

## Questions to put to the chaplaincy (copy into `docs/questions-for-the-chaplaincy.md`)

Chaplaincy: year it began and by whose initiative; where Mass was first celebrated; the names and years of past chaplains;
building and renovation milestones; patronal feast and how it is kept; notable events.
Each society: year formed here; founding members; current meeting day, time and venue; how a student joins; activities during the year;
patron and feast; any local anniversary.

## Done means

- `database/seeds/0003_society_details.sql` runs without error on an empty copy of the database after the migrations.
- Every filled society has `source_notes`.
- `docs/questions-for-the-chaplaincy.md` lists every gap.
- Nothing is marked verified or published.
