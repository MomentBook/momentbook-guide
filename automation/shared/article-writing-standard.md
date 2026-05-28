# Article Writing And Localization Standard

Use this standard for new guide publication and post-publish review.

## Fresh Context Rule

Write from the current source pack, current English master, current fact parity
map, and current production admin API export only. Do not search for or imitate
old generated articles, old run logs, old batch plans, old import payloads, or
dated helper scripts.

## Readable Guide Standard

A publishable guide helps a traveler make decisions quickly.

- The first two paragraphs must identify the reader, the decision, and the main
  constraint.
- `What to know first` must contain 5-7 concrete decision bullets, not generic
  tips.
- Each H2 must answer a practical question. Avoid vague headings such as
  "Overview", "Details", "More information", or "Practical decision section".
- Paragraphs should be short. Split any paragraph that mixes route, price,
  exception, and recommendation into separate paragraphs or bullets.
- Use bullets for prices, opening windows, booking terms, route choices,
  exceptions, and day-of-visit checks.
- Avoid hype, filler, SEO padding, copied source phrasing, and generic city
  descriptions.
- Do not increase length by repetition. Add only source-backed decision value.

## Translation Standard

Translation is a full rewrite in the target language with fact parity.

- Preserve the same decisions, facts, warnings, exceptions, route logic,
  source meaning, image meaning, and checklist value.
- Localize titles, headings, intro paragraphs, bullets, image alt text,
  captions, and source labels.
- Do not translate word-by-word when it creates stiff or machine-like prose.
  Rewrite sentence order naturally while keeping the fact map intact.
- Do not shorten any locale into a summary.
- Do not leave English headings, placeholders, or source labels in non-English
  bodies unless an official proper noun must remain unchanged.
- Keep required scripts and diacritics throughout:
  `ko`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`.

## Review Standard

Post-publish review should improve the article group, not only pass structure
checks.

- Build the review plan from current production admin API exports only.
- Identify weak openings, vague headings, wall-like paragraphs, literal
  translation, missing diacritics, English leakage, thin locale bodies, and
  source-label drift.
- Patch English first when the master structure is weak.
- Patch localizations against the improved English meaning and the fact parity
  map, not against old generated phrasing.
- Preserve metadata and URLs.
- Fail instead of patching if a language cannot be made natural without
  changing facts or adding unsupported content.

## QA Failure Conditions

Fail the gate when any of these are present:

- the opening does not explain the traveler decision
- H2 headings are generic or placeholder-like
- `What to know first` is generic, too short, or too long
- paragraphs are long enough to hide prices, route choices, or exceptions
- a locale reads like machine translation or a short summary
- a non-English body keeps English headings or source labels
- required scripts, accents, or Vietnamese tone marks are missing
- image alt text or caption is not localized
- any hard fact differs from the fact parity map
