# API Response Standardization

**Date:** 2026-01-11
**Task:** Standardize success response shapes across non-auth APIs

---

## What Changed

### 1. Consents Module Response Format
- **Endpoint:** `GET /v2/consent-templates`
- **Before:**
  ```json
  {
    "status": "success",
    "data": {
      "templates": [...]
    },
    "version": "1.0.0"
  }
  ```
- **After:**
  ```json
  {
    "status": "success",
    "data": {
      "templates": [...],
      "version": "1.0.0"
    }
  }
  ```
- **Rationale:** Moved `version` inside `data` to match standard pattern

### 2. DTO Updates
- Updated `ConsentTemplatesDataDto` to include `version` field
- Updated `ConsentTemplatesResponseDto` to remove root-level `version`
- Updated controller return type signature

---

## Why

**Goal:** Ensure all non-auth API success responses follow the consistent pattern:

```typescript
{
  status: "success",
  data: <payload>,
  message?: "optional description"
}
```

**Auth endpoints remain UNCHANGED** - they are locked and backward-compatible.

---

## Standard Response Pattern (Final)

### Success Response (All Endpoints)
```typescript
{
  status: "success",
  data: { ... },          // Payload goes here
  message?: "..."         // Optional description
}
```

### Verification Results

✅ **Auth** (`/v2/auth/**`) - UNCHANGED (locked contract)
✅ **Users** (`/v2/users/**`) - Already consistent
✅ **Reports** (`/v2/reports/**`) - Already consistent
✅ **Journeys** (`/v2/journeys/**`) - Already consistent
✅ **Health** (`/v2/health/**`) - Already consistent
✅ **Consents** (`/v2/consent-templates`) - **FIXED** (moved `version` into `data`)

---

## Files Modified

### Controllers
- [src/consents/consent-templates.controller.ts](../../src/consents/consent-templates.controller.ts)
  - Moved `version` field inside `data` object
  - Updated return type signature

### DTOs
- [src/consents/dto/consent-templates.dto.ts](../../src/consents/dto/consent-templates.dto.ts)
  - Added `version` property to `ConsentTemplatesDataDto`
  - Removed `version` from `ConsentTemplatesResponseDto`

---

## Breaking Changes

### For Non-Auth Clients

**Consents Template Endpoint Only:**
- Mobile/web clients calling `GET /v2/consent-templates` must update to read `version` from `response.data.version` instead of `response.version`
- Since v2 client is being rewritten, this is acceptable

**All Other Endpoints:**
- No breaking changes (already consistent)

### For Auth Clients

**Zero impact** - Auth endpoints remain completely unchanged:
- Same response structure
- Same field names and nesting
- Same token handling

---

## Validation

### Build Status
✅ `npm run build` - SUCCESS

### Response Pattern Verification
```bash
# Checked all controller return statements:
✅ Auth: { status, message, data } ✓ UNCHANGED
✅ Users: { status, message?, data } ✓
✅ Reports: { status, message?, data } ✓
✅ Journeys: { status, message?, data } ✓
✅ Health: { status, data } ✓
✅ Consents: { status, data } ✓ FIXED
```

---

## Next Steps

**For Client Teams:**
1. Update consent template parsing to read `response.data.version`
2. Verify all other endpoints work unchanged (they should)

**For Backend:**
- Pattern is now consistent across all APIs
- Future endpoints should follow this exact structure
- Auth remains locked and backward-compatible

---

## Summary

- **Changed:** 1 endpoint response structure (consents template)
- **Reason:** Consistency with rest of API
- **Impact:** Minor (v2 client rewrite in progress)
- **Auth Impact:** None (strictly preserved)
- **Pattern:** `{ status, data, message? }` now universal
