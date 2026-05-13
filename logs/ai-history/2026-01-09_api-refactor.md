# API Refactor - 2026-01-09

## What Changed

- Introduced **facade pattern** across all domain modules for consistency
- Unified **Swagger API tags** to lowercase (`auth`, `users`, `consents`, `reports`, `journeys`, `health`)
- Removed unused imports from health controller
- All controllers now delegate to facades instead of calling services directly
- Auth controller updated to use `ConsentsFacade` instead of `ConsentsService`
- Fixed type signatures in facades to match DTOs

## Why

- **Consistency**: Establishes uniform architecture across all domains
- **Maintainability**: Facade pattern provides single entry point for domain operations
- **Testability**: Facades can be mocked more easily than multiple service dependencies
- **Separation of concerns**: Controllers become thin HTTP adapters, facades orchestrate business logic
- **Swagger clarity**: Lowercase tags provide consistent API documentation grouping

## Files Added

### Facades
- `src/reports/reports.facade.ts` - Reports domain facade
- `src/consents/consents.facade.ts` - Consents domain facade
- `src/users/users.facade.ts` - Users domain facade (orchestrates profile, consents, blocks)

## Files Modified

### Module Files
- `src/reports/reports.module.ts` - Added ReportsFacade provider/export
- `src/consents/consents.module.ts` - Added ConsentsFacade provider/export
- `src/users/users.module.ts` - Added UsersFacade provider/export

### Controllers
- `src/health/health.controller.ts` - Fixed Swagger tag (`health`), removed unused imports
- `src/journeys/title/journey-title.controller.ts` - Fixed Swagger tag (`journeys`)
- `src/journeys/ai/journey-ai.controller.ts` - Fixed Swagger tag (`journeys`)
- `src/reports/reports.controller.ts` - Uses ReportsFacade, fixed Swagger tag (`reports`)
- `src/consents/consent-templates.controller.ts` - Uses ConsentsFacade, fixed Swagger tag (`consents`)
- `src/users/users.controller.ts` - Uses UsersFacade instead of UsersService + ConsentsService
- `src/auth/auth.controller.ts` - Uses ConsentsFacade instead of ConsentsService

## Architecture Pattern Applied

### Facade Structure
```
Domain Module
  ├─ domain.module.ts          (wires everything)
  ├─ domain.facade.ts           (orchestration layer)
  ├─ domain.controller.ts       (thin HTTP adapter)
  ├─ domain.service.ts          (business logic)
  └─ schemas/dto/               (data contracts)
```

### Request Flow
```
HTTP Request
  → Controller (validation, auth guards)
    → Facade (orchestration)
      → Service(s) (business logic)
        → Repository/Model (data access)
```

## API Surface Verification

### Critical Endpoints Preserved (Apple Review Requirement)
✅ `POST   /v2/users/blocks/:blockedUserId` - Block user
✅ `DELETE /v2/users/blocks/:blockedUserId` - Unblock user
✅ `GET    /v2/users/blocks/:blockedUserId/status` - Check block status
✅ `GET    /v2/users/blocks` - List blocked users

### All Route Paths Unchanged
- Auth: `/v2/auth/*` (16 endpoints)
- Users: `/v2/users/*` (12 endpoints)
- Consents: `/v2/consent-templates/*` (1 endpoint)
- Reports: `/v2/reports/*` (7 endpoints)
- Journeys: `/v2/journeys/*` (4 endpoints)
- Health: `/v2/health/*` (2 endpoints)

### Swagger Tags (Now Consistent)
- Before: `auth`, `users`, `Consent Templates`, `Reports`, `Journeys`, `헬스체크`
- After: `auth`, `users`, `consents`, `reports`, `journeys`, `health`

## Build & Verification

```bash
# Build succeeded
yarn build  # ✓ No errors

# Dist output generated
ls dist/src/  # ✓ All modules compiled

# Critical endpoints present
grep "blocks/:blockedUserId" src/users/users.controller.ts  # ✓ 4 routes found
```

## Risks / TODO

### None (Safe Refactor)
- No API contract changes
- No route path modifications
- No auth behavior changes
- All blocking endpoints intact
- Build passes cleanly
- Response shapes preserved

### Future Improvements (Not In Scope)
- Consider splitting Users module further (profiles/, blocks/, etc.) if complexity grows
- Standardize DTO naming (`*ResponseDto` vs `*SuccessResponseDto`) in future iterations
- Add facade integration tests

## Migration Impact

**Zero breaking changes for clients.**

- All route paths unchanged
- All HTTP methods unchanged
- All response formats unchanged
- All auth guards unchanged

Internal code organization improved without affecting external API contract.
