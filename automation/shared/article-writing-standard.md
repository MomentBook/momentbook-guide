# Article Writing And Localization Standard

Use this standard for new guide publication and manual post-publish review.

## Fresh Context Rule

Write from the current source pack, current English master, current fact parity
map, and current production admin API export only. Do not imitate old generated
articles, old run logs, old batch plans, old import payloads, or dated helper
scripts.

## Readable Guide Standard

A publishable guide helps a traveler make decisions quickly.

- Start with a reader-decision brief: traveler type, practical decision, main
  constraint, likely wrong assumption, and volatile facts to recheck.
- Build a fact parity map before localization. Include names, numbers, dates,
  times, prices, routes, booking rules, exceptions, warnings, image meaning,
  caption meaning, and source labels.
- The first two paragraphs must identify the reader, the decision, and the main
  constraint.
- `What to know first` must contain 5-7 concrete decision bullets, not generic
  tips.
- Each H2 must answer a practical question. Avoid vague headings such as
  "Overview", "Details", "More information", or "Practical decision section".
- Read the title, H1, intro, and H2 sequence as one flow before translating.
  The article should feel like a planned decision path, not a filled template.
- Keep paragraphs short. Split paragraphs that mix route, price, exception, and
  recommendation into bullets or separate paragraphs.
- Use bullets for prices, opening windows, booking terms, route choices,
  exceptions, and day-of-visit checks.
- Avoid hype, filler, SEO padding, copied source phrasing, and generic city
  descriptions.
- Add length only when it adds source-backed decision value.

## Translation Standard

Translation is a full rewrite in the target language with fact parity.

- Preserve the same decisions, facts, warnings, exceptions, route logic, source
  meaning, image meaning, and checklist value.
- Localize titles, headings, intro paragraphs, bullets, image alt text, captions,
  and source labels.
- Rewrite sentence order naturally when needed. Do not translate word-by-word
  when it creates stiff or machine-like prose.
- Do not shorten any locale into a summary.
- Do not leave English headings, placeholders, or source labels in non-English
  bodies unless an official proper noun must remain unchanged.
- Keep required scripts and diacritics throughout:
  `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`.

Run three passes for every locale:

1. Fact pass: compare against the parity map for every hard fact, route,
   exception, warning, image meaning, and source label.
2. Native-prose pass: read the localized title, H1, intro, H2 flow, and section
   bodies as target-language prose. Fix literal calques, English rhythm,
   awkward punctuation, and paragraphs that feel translated rather than written.
3. Publish-surface pass: verify the first image alt text, caption prefix,
   Sources heading, source link labels, and final checklist are localized and
   useful without seeing the English master.

## Review Standard

Post-publish review should improve the article group, not only pass structure
checks.

- Run the same readability/localization review before production create; do not
  rely on post-publish repair for issues that are visible in the draft.
- Build the review from current production admin API exports only.
- Identify weak openings, vague headings, wall-like paragraphs, literal
  translation, missing diacritics, English leakage, thin locale bodies, and
  source-label drift.
- Patch English first when the master structure is weak.
- Patch localizations against the improved English meaning and the fact parity
  map, not old generated phrasing.
- Preserve metadata and URLs.
- Fail instead of patching if a language cannot be made natural without changing
  facts or adding unsupported content.

## QA Failure Conditions

Fail the gate when any of these are present:

- the opening does not explain the traveler decision
- H2 headings are generic or placeholder-like
- `What to know first` is generic, too short, or too long
- paragraphs hide prices, route choices, or exceptions
- the title, H1, intro, and H2 sequence do not form a clear reader decision path
- a locale reads like machine translation or a short summary
- a non-English body keeps English headings or source labels
- required scripts, accents, or Vietnamese tone marks are missing
- image alt text or caption is not localized
- any hard fact differs from the fact parity map
