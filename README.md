# Momentbook Guide

Local workspace for manual Momentbook guide writing, production publication,
post-publish review, and verified git persistence.

## Current Operating Model

Recurring Codex automations have been removed. Start guide work from a mobile or
desktop chat request, keep the scope to one guide group unless the user says
otherwise, and report every production write and git action visibly.

Primary entry points:

- `prompts/mobile-chat.md`: copy-ready mobile conversation requests.
- `prompts/guide-publisher.md`: compact execution contract for one new guide.
- `playbooks/authoring-guide.md`: durable article schema, source, localization,
  and review policy.
- `automation/shared/article-writing-standard.md`: readability and localization
  standard.
- `automation/shared/admin-articles-api.md`: production admin API contract.
- `registry/editorial-guide-registry.md`: content-level topic coverage and
  publication state.

## Standard Mobile Flow

1. Read the required repo context and inspect `git status --short`.
2. Choose one registry-safe topic, or use the topic explicitly requested by the
   user after checking registry overlap. Registry safety is judged by coverage
   signature: specific place, destination or festival type, route,
   ticket/pass/permit/rule, traveler decision, category, and slug keywords.
   Country or city alone does not block a topic.
3. Verify hard facts from current official sources and record the checked date in
   `Asia/Seoul`.
4. Write the English master, freeze a fact parity map, then complete all 9
   languages: `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`.
5. Run the article quality and contract gates before any production API write.
6. Publish through `https://api.momentbook.app/v2/admin/articles`, then export
   and verify the created `translationGroupId`.
7. Review the published group for readability, headings, paragraph flow, and
   natural localization. Patch only `title` and `body` when a verified improvement
   is needed.
8. Update the registry from verified production API state.
9. Commit and push only verified durable changes when the user requested git
   persistence in the chat.

## Non-Negotiable Checks

- Use current official sources for prices, hours, routes, rules, booking terms,
  closures, entry conditions, and other hard facts.
- Do not copy source prose or imitate old generated articles.
- Do not use SSH, direct MongoDB access, remote helper scripts, or a development
  environment for publication or review.
- Stop before writing to production when source support, dates, localization
  parity, API scope, or executable gates are uncertain.
- Do not store credentials, tokens, cookies, payloads with private data, or
  production response bodies in git.

## Quality Gates

```sh
node tools/quality/article-quality-gate.js --admin-create-payload <payload.json>
node tools/quality/article-contract-gate.js --admin-create-payload <payload.json>
node tools/quality/article-quality-gate.js <admin-api-export.json>
node tools/quality/article-contract-gate.js --admin-api <admin-api-export.json>
```

Use `--admin-create-payload` before production creates because the create API
does not accept or return client-supplied `publishedAt`. Use `--admin-api` after
production exports. If a gate fails, stop or repair the exact failing fields
before continuing.
