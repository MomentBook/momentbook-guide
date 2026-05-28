# Production Admin Articles API Contract

Manual guide publication and review must use the production admin articles API
instead of SSH, direct MongoDB access, or remote helper scripts.

## Base URL And Credentials

- Base URL: `https://api.momentbook.app`
- Local credential file: `.codex/automation/admin-api.env`
- Environment variables:
  - `MOMENTBOOK_ADMIN_API_BASE_URL`
  - `MOMENTBOOK_ADMIN_EMAIL`
  - `MOMENTBOOK_ADMIN_PASSWORD`
  - `MOMENTBOOK_ADMIN_ACCESS_TOKEN`, optional short-lived override

Do not commit credentials, access tokens, refresh tokens, cookies, payloads, or
production response bodies that contain private data.

## Authentication

Authenticate with:

```text
POST /v2/auth/email/login
```

Use the returned `data.accessToken` as:

```text
Authorization: Bearer <accessToken>
```

## Article Endpoints

Use only these article endpoints for normal guide publication and review:

- `GET /v2/admin/articles`
- `POST /v2/admin/articles`
- `GET /v2/admin/articles/{articleId}`
- `PATCH /v2/admin/articles/{articleId}`

`DELETE /v2/admin/articles/{articleId}` is manual admin recovery only and is not
part of guide publication or review.

## Create Schema

`POST /v2/admin/articles` creates one language record and publishes it after
server validation.

```json
{
  "translationGroupId": "optional existing group id",
  "language": "en",
  "slug": "optional-custom-slug",
  "category": "travel-guide",
  "title": "Localized title",
  "body": "# Localized title\n\nMarkdown body"
}
```

When creating a 9-language guide group, create exactly one record per supported
language. Use one shared `translationGroupId`; if the first create starts a new
group, reuse the returned `translationGroupId` for the remaining languages.

## Update Schema

`PATCH /v2/admin/articles/{articleId}` updates one published record. For
post-publish review, send content-only patches:

```json
{
  "title": "Improved localized title",
  "body": "# Improved localized title\n\nMarkdown body"
}
```

Do not change `language`, `slug`, `category`, or `translationGroupId` during
review. `updatedAt` may change as a server-side timestamp.

## Verification

Use `GET /v2/admin/articles` to find all records in the target
`translationGroupId`, then `GET /v2/admin/articles/{articleId}` for full details.
Publication or review is complete only when the API returns exactly 9 records:

```text
ko, en, ja, zh, es, pt, fr, th, vi
```

Before create:

```sh
node tools/quality/article-quality-gate.js <payload.json>
node tools/quality/article-contract-gate.js --admin-create-payload <payload.json>
```

After create or patch:

```sh
node tools/quality/article-quality-gate.js <admin-api-export.json>
node tools/quality/article-contract-gate.js --admin-api <admin-api-export.json>
```

The admin API does not expose `sourceCheckedDate`, `status`, or `createdAt`.
Keep source-check evidence in local run notes and validate pre-write payloads
with the create-payload contract gate before calling the API.

## Local Helper

Prefer the local helper over ad hoc shell JSON handling:

```sh
node tools/admin/articles-api.js create-group <payload.json> --confirm-production --out <api-create.json>
node tools/admin/articles-api.js export-group <translationGroupId> --out <api-export.json>
node tools/admin/articles-api.js patch-group <translationGroupId> <patches.json> --confirm-production --out <api-patch.json>
```
