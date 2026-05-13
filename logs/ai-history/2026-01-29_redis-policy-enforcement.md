# Redis Policy Enforcement - 2026-01-29

## Summary

Formalized and enforced Redis usage policy across the codebase to prevent misuse of Redis as a permanent data store. All Redis usage is now limited to volatile, ephemeral data with mandatory TTL.

## Changes Made

### 1. Code Cleanup - JourneyEnrichment Migration (Completed Earlier Today)

**Problem**: Journey enrichment data was stored in Redis with 90-day TTL, causing:
- Data loss after TTL expiration
- Data loss on server restart
- Unclear source of truth
- Duplicate API costs after TTL expiration

**Solution**: Migrated to MongoDB permanent storage

**Files Changed**:
- Created: `src/journeys/schemas/journey-enrichment.schema.ts`
  - New MongoDB schema for permanent enrichment data
  - Stores `journeyId`, `locationNames`, `isEnriched` flag

- Updated: `src/journeys/location/location-enrichment.service.ts`
  - Removed: `ENRICHMENT_FLAG_PREFIX` constant
  - Removed: `LOCATION_NAMES_CACHE_PREFIX` constant
  - Removed: `markJourneyAsEnriched()` method (Redis-based)
  - Changed: `isJourneyAlreadyEnriched()` - now queries MongoDB
  - Changed: `saveLocationNames()` - now uses MongoDB upsert
  - Changed: `getLocationNames()` - now returns from MongoDB
  - Injected: `JourneyEnrichmentModel` for MongoDB access

- Updated: `src/journeys/location/location-enrichment.module.ts`
  - Removed: UtilsModule import (RedisService)
  - Added: JourneyEnrichment schema registration

- Updated: `src/journeys/publish/publish-journey.service.ts`
  - Removed: `ENRICHMENT_FLAG_PREFIX` constant
  - Changed: `checkLocationEnriched()` - now queries MongoDB
  - Injected: `JourneyEnrichmentModel`

- Updated: `src/journeys/publish/publish-journey.module.ts`
  - Added: JourneyEnrichment schema registration

**Impact**:
- ✅ No more data loss from TTL expiration
- ✅ No more data loss from server restart
- ✅ Clear source of truth (MongoDB)
- ✅ Permanent enrichment tracking without API cost waste

### 2. Documentation - ADR Created

**Created**: `docs/adr/0009-redis-usage-policy.md`

**Content**:
- **Context**: Risks of using Redis as permanent storage
- **Decision**: Redis ONLY for volatile data, MongoDB is source of truth
- **Allowed Uses**: Sessions, cache, rate limits, locks, temp queues (all with TTL)
- **Prohibited Uses**: Permanent domain data, source of truth, keys without TTL
- **Enforcement**: TTL mandatory, cache-aside pattern, dual-write for sessions
- **Key Naming Conventions**: Documented standard prefixes
- **Code Review Checklist**: Added 4-point checklist for Redis PR reviews
- **Consequences**: Listed positive/negative outcomes
- **Alternatives Considered**: Documented rejected alternatives
- **Current Status**: Audit of all Redis usage (all compliant)

### 3. Documentation - CLAUDE.md Updated

**Updated**: `CLAUDE.md`

**Added Section 7**: "Redis Usage Policy (BINDING)"

**Content**:
- Quick rules for allowed/prohibited uses
- Mandatory patterns (TTL, MongoDB first, cache-aside)
- Code review checklist
- Key naming conventions
- Warning: NEVER use Redis as primary storage

### 4. Code Enforcement - RedisService Enhanced

**Updated**: `src/common/redis/redis.service.ts`

**Changes**:
- Added comprehensive class-level documentation explaining policy
- Added `MAX_TTL_SECONDS` constant (1 year sanity check)
- Enhanced `setEx()` method with:
  - Validation: Throws error if TTL <= 0
  - Warning: Logs if TTL > 1 year (suggests MongoDB instead)
  - Documentation: Detailed JSDoc explaining policy

**Impact**:
- ✅ Impossible to create keys without TTL (setEx is only write method)
- ✅ Clear error messages referencing ADR-0009
- ✅ Warnings for suspiciously long TTLs

## Current Redis Usage Audit

All Redis usage in codebase is COMPLIANT with new policy:

### ✅ Token Storage (auth/token.service.ts)
- `auth:rt:{hash}` - Refresh tokens (30d TTL)
- `auth:rtv:{userId}` - Token version for logout-all (1y TTL)
- Pattern: Dual-write to Redis + MongoDB
- Fallback: MongoDB when Redis disabled
- **Compliant**: Session storage with appropriate TTL

### ✅ Email Verification (auth/email-verification.service.ts)
- `auth:ev:{type}:{email}:code` - Verification codes (10m TTL)
- `auth:ev:{type}:{email}:rl` - Rate limiting (60s TTL)
- `auth:ev:{type}:{email}:verified` - Verification status (1h TTL)
- Pattern: Dual-write to Redis + MongoDB
- **Compliant**: Temporary codes with appropriate TTL

### ✅ POI Cache (journeys/location/location-enrichment.service.ts)
- `journey:location:nearby:v3:{hash}` - POI lookup results (30d TTL)
- Pattern: Cache-aside (miss → DB → cache)
- **Compliant**: Cache with appropriate TTL

### ✅ Consent Templates Cache (consents/consents.service.ts)
- Template caching with TTL
- Pattern: Cache-aside
- **Compliant**: Cache with appropriate TTL

### ✅ Journey Title Cache (journeys/title/journey-title.service.ts)
- Title generation caching with TTL
- Pattern: Cache-aside
- **Compliant**: Cache with appropriate TTL

### ✅ Rate Limiting (common/redis/rate-limit.service.ts)
- Rate limit counters with TTL
- **Compliant**: Ephemeral counters with appropriate TTL

## Benefits of This Policy

1. **Data Safety**: No risk of permanent data loss from Redis failures
2. **Clear Architecture**: Unambiguous source of truth (MongoDB)
3. **Operational Simplicity**: Redis can be flushed/restarted safely
4. **Cost Optimization**: Hot data in Redis, cold data in cheaper MongoDB
5. **Consistency**: Cache invalidation is straightforward
6. **Developer Guidance**: Clear rules prevent misuse in new features

## Migration Checklist

- [x] Audit all Redis usage
- [x] Identify and fix misuse (JourneyEnrichment)
- [x] Create binding ADR
- [x] Update CLAUDE.md with policy
- [x] Add enforcement to RedisService
- [x] Verify all Redis writes use setEx with TTL
- [x] Document changes

## References

- ADR: `docs/adr/0009-redis-usage-policy.md`
- Code Guide: `CLAUDE.md` section 7
- Schema: `src/journeys/schemas/journey-enrichment.schema.ts`
- Service: `src/common/redis/redis.service.ts`
