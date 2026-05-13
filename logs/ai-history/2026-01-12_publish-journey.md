# Publish Journey Feature Implementation

Date: 2026-01-12
Status: ✅ Completed (API only)

## Overview

Implemented "Publish Journey" (게시하기) feature that allows mobile app users to publish their journey data with images to the API, which will later be used by `momentbook-web` for SEO page generation.

## Key Design Decisions

### 1. Client-Side Image Upload (No Binary to API)
- Mobile app resizes images locally
- Mobile app requests presigned S3 URLs from API
- Mobile app uploads directly to S3 using presigned URLs
- Mobile app sends only the resulting `downloadUrl` to API along with journey data
- **No AWS credentials exposed to mobile app**

### 2. Presigned URL Strategy
- Endpoint: `POST /v2/uploads/presign`
- Generates time-limited (1 hour) presigned S3 PUT URLs
- Validates content types (only image/jpeg, image/png, image/webp)
- Enforces max file size (5MB)
- Returns both `uploadUrl` (for PUT) and `downloadUrl` (for later reference)

### 3. Published Journey Storage
- Endpoint: `POST /v2/journeys/publish`
- Stores journey data + image URLs mapped to userId
- Generates stable `publicId` (nanoid 12 chars) for SEO URLs
- Validates all image URLs must be from our S3/CDN domain
- Max 30 images per journey

### 4. Public Fetch for SEO
- Endpoint: `GET /v2/journeys/public/:publicId`
- Public endpoint (no auth required)
- Returns published journey data for web SEO page generation
- Ready for rate limiting in the future

## API Routes Added

All routes use the `/v2` prefix:

1. **POST /v2/uploads/presign** (authenticated)
   - Request: `{ contentType, fileExt?, sizeBytes?, purpose }`
   - Response: `{ status: "success", data: { uploadUrl, downloadUrl, key } }`

2. **POST /v2/journeys/publish** (authenticated)
   - Request: `{ journeyData: object, images: [{ url, width?, height? }], options? }`
   - Response: `{ status: "success", data: { publicId, createdAt } }`

3. **GET /v2/journeys/public/:publicId** (public)
   - Response: `{ status: "success", data: { publicId, journeyData, images, createdAt, updatedAt } }`

## Database Schema

### PublishedJourney Collection
```typescript
{
  publicId: string (unique, indexed)
  userId: ObjectId (indexed)
  journeyData: Mixed (client-side recap/aggregation)
  images: [{ url, width?, height? }]
  status: "published" | "unpublished"
  createdAt: Date
  updatedAt: Date
}
```

Indexes:
- `{ publicId: 1 }` unique
- `{ userId: 1, createdAt: -1 }`

## Configuration Changes

Added to `src/config/configuration.ts`:
```typescript
aws: {
  // ... existing
  s3PublicBaseUrl: process.env.AWS_S3_PUBLIC_BASE_URL,
  s3JourneysPrefix: process.env.AWS_S3_JOURNEYS_PREFIX || 'journeys',
}
```

Required env vars:
- `AWS_S3_PUBLIC_BASE_URL` (optional, defaults to bucket URL)
- `AWS_S3_JOURNEYS_PREFIX` (optional, defaults to "journeys")

## Files Created

### Uploads Module
- `src/uploads/uploads.module.ts`
- `src/uploads/uploads.controller.ts`
- `src/uploads/dto/presign-upload.dto.ts`

### Publish Journey Module
- `src/journeys/publish/publish-journey.module.ts`
- `src/journeys/publish/publish-journey.controller.ts`
- `src/journeys/publish/publish-journey.service.ts`
- `src/journeys/publish/dto/publish-journey.dto.ts`
- `src/journeys/schemas/published-journey.schema.ts`

### Updated Files
- `src/config/configuration.ts` (added S3 config)
- `src/utils/storage.service.ts` (added presigned URL generation)
- `src/journeys/journeys.module.ts` (imported PublishJourneyModule)
- `src/app.module.ts` (imported UploadsModule)

## Dependencies Added

```bash
npm install nanoid@^3.3.7 @aws-sdk/s3-request-presigner@^3.943.0
```

## Security Validations

1. **Presigned URL endpoint**
   - JWT authentication required
   - Content-type whitelist (only images)
   - File size limit (5MB)
   - Purpose validation (only "journey")

2. **Publish endpoint**
   - JWT authentication required
   - Image URL validation (must be from our S3/CDN)
   - Max 30 images limit
   - No arbitrary external URLs allowed

3. **Public fetch endpoint**
   - Read-only (no auth)
   - Only returns published journeys (status='published')
   - Ready for rate limiting

## Client Implementation Notes

**Updated to match client RecapDraft spec (2026-01-12)**

The mobile client should:
1. Resize images locally (e.g., 1080px max dimension)
2. For each image in Journey.photos:
   - Call `POST /v2/uploads/presign` with `{ contentType: "image/jpeg", purpose: "journey" }`
   - Upload via `fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": contentType }, body: blob })`
   - Build `photoUrlMapping`: `{ [photo.uri]: downloadUrl }`
3. Call `POST /v2/journeys/publish` with:
   - `journeyId`: Journey.id
   - `startedAt`: Journey.startedAt
   - `endedAt`: Journey.endedAt
   - `recapDraft`: Journey.recapDraft (computed + overrides)
   - `recapStage`: Journey.recapStage
   - `photoUrlMapping`: `{ localUri → s3Url }`
   - `images`: array of `{ url: downloadUrl, width?, height? }`
4. Server automatically replaces all photoIds in recapDraft with S3 URLs
5. Store the returned `publicId` for later reference

**Important:**
- `photoId` in client uses local file uri (e.g., `file:///...`)
- Server replaces these with S3 URLs in all nested structures
- `RecapFinal` is NOT sent (client-side runtime composition only)

## Testing Checklist

- [x] Build succeeds (`npm run build`)
- [ ] Server boots without errors
- [ ] Swagger docs show new endpoints at `/api-docs`
- [ ] POST `/v2/uploads/presign` returns presigned URL (with valid JWT)
- [ ] POST `/v2/journeys/publish` stores journey and returns publicId
- [ ] GET `/v2/journeys/public/:publicId` returns published journey
- [ ] Auth endpoints unchanged (contract locked per ADR 0001)

## Future Enhancements

1. Rate limiting on public fetch endpoint
2. Journey update/unpublish endpoints
3. User's published journey list endpoint
4. Image optimization/CDN integration
5. Analytics tracking for published journeys

## Compliance with ADRs

- ✅ ADR 0001: Auth API contract untouched
- ✅ ADR 0001: Non-auth endpoints use `{ status: "success", data }` envelope
- ✅ ADR 0003: Swagger tags = domain (`uploads`, `journeys`)
- ✅ ADR 0004: Single doc file created in `docs/ai/`
- ✅ CLAUDE.md: No social features, server stores raw data, minimal changes
- ✅ PRODUCT.md: Privacy-first, client-driven interpretation

## Risks / TODO

1. Client repo integration pending (no access to `momentbook` RN app)
2. No migration needed (new collection)
3. Consider CloudFront for `AWS_S3_PUBLIC_BASE_URL` in production
4. Add monitoring for presigned URL generation failures
5. Consider image validation (dimensions, actual content type) on upload callback
