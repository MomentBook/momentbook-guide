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

Authenticate with the admin email and password:

```text
POST /v2/auth/email/login
```

Use the returned `data.accessToken` as a bearer token on every admin article API
request:

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

Current accepted create request fields for the POST body:

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

Required: `language`, `category`, `title`, `body`.

Optional: `translationGroupId`, `slug`.

The local pre-create payload used by the quality and contract gates may include
`sourceCheckedDate` and other local evidence fields. The helper compacts that
payload before POST and sends only the accepted create request fields above.

Do not send server-derived or local-evidence fields in the create request body:
`publishedAt`, `sourceCheckedDate`, `status`, `createdAt`, `updatedAt`,
`summary`, `coverImage`, `readingTimeMinutes`, or `authorName`.

When creating a 9-language guide group, create exactly one record per supported
language. Prefer one shared pre-generated `translationGroupId` in the local
payload for deterministic gate checks. If the first create omits
`translationGroupId`, the server starts a new group; reuse the returned
`translationGroupId` for the remaining languages.

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
node tools/quality/article-quality-gate.js --admin-create-payload <payload.json>
node tools/quality/article-contract-gate.js --admin-create-payload <payload.json>
```

After create or patch:

```sh
node tools/quality/article-quality-gate.js <admin-api-export.json>
node tools/quality/article-contract-gate.js --admin-api <admin-api-export.json>
```

The create API sets `publishedAt`; the admin API export does not expose
`sourceCheckedDate`, `status`, or `createdAt`. Keep source-check evidence in
local run notes and validate pre-write payloads with create-payload gate modes
before calling the API.

## Local Helper

Prefer the local helper over ad hoc shell JSON handling:

```sh
node tools/admin/articles-api.js create-group <payload.json> --confirm-production --out <api-create.json>
node tools/admin/articles-api.js export-group <translationGroupId> --out <api-export.json>
node tools/admin/articles-api.js patch-group <translationGroupId> <patches.json> --confirm-production --out <api-patch.json>
```

`create-group` accepts the local gate payload, then sends only `language`,
`category`, `title`, `body`, and optional `translationGroupId`/`slug` to the API.
