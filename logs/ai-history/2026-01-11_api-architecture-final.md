# MomentBook API Architecture - Final State (v2)

**Date:** 2026-01-11
**Version:** 2.0
**Status:** Production Ready

---

## Overview

MomentBook API는 **비소셜 우선 여정 기록 앱**을 위한 NestJS 기반 REST API입니다.

**핵심 철학:**
- 데이터 무결성과 프라이버시 우선
- 소셜/바이럴 기능 제외
- 서버는 중립적 저장소 (UX 로직은 클라이언트)
- 안정성 > 기능 확장

---

## Architecture Patterns

### 1. Facade Pattern (도입 완료)

모든 주요 도메인에 Facade 레이어 적용:

```
Controller → Facade → Service(s) → Repository/Model
```

**장점:**
- 컨트롤러는 얇은 레이어 (HTTP 관심사만)
- Facade가 비즈니스 로직 오케스트레이션
- 서비스는 재사용 가능한 단위 작업
- 테스트 및 유지보수 용이

**적용 도메인:**
- ✅ Users → `UsersFacade`
- ✅ Consents → `ConsentsFacade`
- ✅ Reports → `ReportsFacade`
- ✅ Auth → 기존 구조 유지 (이미 잘 구성됨)
- ✅ Journeys → 서브모듈 구조 (AI, Title)
- ✅ Health → 단순 구조 (facade 불필요)

### 2. Response Standardization (완료)

모든 API 성공 응답이 일관된 형태:

```typescript
{
  status: "success",
  data: <payload>,
  message?: "optional description"
}
```

**검증 완료:**
- Auth: UNCHANGED (하위 호환성 보장)
- Users: ✅ Consistent
- Reports: ✅ Consistent
- Consents: ✅ Fixed (version 필드 위치 수정)
- Journeys: ✅ Consistent
- Health: ✅ Consistent

### 3. Swagger Documentation (표준화 완료)

**ApiTags 통일:**
- 모든 태그 소문자 사용
- 도메인 이름과 일치

```
auth, users, consents, reports, journeys, health
```

---

## Domain Structure

### Auth Module

```
src/auth/
├── auth.module.ts
├── auth.controller.ts
├── services/
│   ├── google-auth.service.ts
│   ├── apple-auth.service.ts
│   ├── email-auth.service.ts
│   └── token.service.ts
├── strategies/
│   ├── jwt.strategy.ts
│   └── refresh-token.strategy.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   └── admin.guard.ts
├── dto/
│   └── auth.dto.ts
└── schemas/
    └── refresh-token.schema.ts
```

**특징:**
- 서비스 분리 (Google, Apple, Email, Token)
- JWT + Refresh Token 전략
- 게스트 사용자 지원

**엔드포인트:**
- Google OAuth (Web + Mobile)
- Apple Sign-In
- Email 인증 (코드 기반)
- Token refresh/logout

### Users Module

```
src/users/
├── users.module.ts
├── users.controller.ts
├── users.facade.ts ⭐ NEW
├── users.service.ts
├── dto/
│   ├── user-profile.dto.ts
│   ├── user-consents.dto.ts
│   ├── user-block.dto.ts
│   └── users-list.dto.ts
└── schemas/
    ├── user.schema.ts
    └── user-block.schema.ts
```

**특징:**
- Facade 패턴 적용
- 프로필, 동의, 차단 기능 통합
- 게스트 사용자 특별 처리

**엔드포인트:**
- Profile: GET/PUT `/users/profile/me`
- Admin: GET `/users` (관리자 전용)
- Profile lookup: GET `/users/profile/:userId`
- Account: DELETE `/users/me`
- Consents: GET/POST `/users/consents`
- Blocking: POST/DELETE/GET `/users/blocks/*` (Apple 필수)

### Consents Module

```
src/consents/
├── consents.module.ts
├── consent-templates.controller.ts
├── consents.facade.ts ⭐ NEW
├── consents.service.ts
├── dto/
│   └── consent-templates.dto.ts
└── schemas/
    ├── consent.schema.ts
    └── consent-template.schema.ts
```

**특징:**
- 템플릿 + 사용자 동의 분리
- Facade로 로직 통합
- 버전 관리

**엔드포인트:**
- Templates: GET `/consent-templates`
- User consents: `/users/consents/*` (Users 모듈에서 처리)

### Reports Module

```
src/reports/
├── reports.module.ts
├── reports.controller.ts
├── reports.facade.ts ⭐ NEW
├── reports.service.ts
├── dto/
│   └── report.dto.ts
└── schemas/
    └── report.schema.ts
```

**특징:**
- 신고 시스템 (사용자/콘텐츠)
- 관리자 리뷰 워크플로우
- 통계 제공

**엔드포인트:**
- Create: POST `/reports`
- Admin list: GET `/reports`
- Stats: GET `/reports/stats`
- Detail: GET/PUT/DELETE `/reports/:reportId`
- Count: GET `/reports/target/:targetType/:targetId/count`

### Journeys Module

```
src/journeys/
├── journeys.module.ts
├── ai/
│   ├── journey-ai.module.ts
│   ├── journey-ai.controller.ts
│   ├── journey-ai.service.ts
│   ├── dto/
│   └── schemas/
└── title/
    ├── journey-title.module.ts
    ├── journey-title.controller.ts
    ├── journey-title.service.ts
    └── dto/
```

**특징:**
- 서브모듈 구조 (AI, Title)
- 비동기 작업 처리 (AI worker 연동)
- Job 상태 관리

**엔드포인트:**
- AI panorama: POST `/journeys/:id/ai/panorama`
- AI title: POST `/journeys/:id/ai/title`
- Job status: GET `/journeys/:id/ai/jobs/:jobId`
- Title generation: POST `/journeys/:id/title/auto`

### Health Module

```
src/health/
├── health.module.ts
├── health.controller.ts
└── dto/
    └── health-response.dto.ts
```

**특징:**
- Process health: `/healthz`
- DB health: `/readyz` (Mongo ping)

---

## Cross-Cutting Concerns

### 1. Authentication & Authorization

**JWT 기반:**
- Access Token (짧은 만료)
- Refresh Token (DB 저장, 무효화 가능)

**Guards:**
- `JwtAuthGuard` - 인증 필요
- `AdminGuard` - 관리자 권한 필요

**게스트 지원:**
- UUID 기반 임시 사용자
- 제한된 기능 (AI, 신고 불가)

### 2. Validation

**Global ValidationPipe:**
```typescript
{
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true
}
```

**DTO 기반 검증:**
- `class-validator` 사용
- Swagger 타입 정의와 일치

### 3. Error Handling

**HttpExceptionFilter:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description",
  "timestamp": "ISO-8601",
  "path": "/v2/..."
}
```

**로깅:**
- `LoggingInterceptor` 사용
- PM2 로그: `logs/out.log`, `logs/error.log`

### 4. Storage

**AWS S3:**
- 프로필 사진
- 여정 이미지
- Base64 업로드 지원

---

## API Versioning

**Prefix:** `/v2`

**하위 호환성:**
- Auth 엔드포인트는 엄격히 보존
- Non-auth 엔드포인트는 v2 클라이언트 재작성 고려하여 표준화

---

## Security Considerations

### 1. 차단 기능 (Apple 요구사항)

4개 엔드포인트 필수:
- `POST /users/blocks/:blockedUserId`
- `DELETE /users/blocks/:blockedUserId`
- `GET /users/blocks/:blockedUserId/status`
- `GET /users/blocks`

### 2. 게스트 제한

- AI 기능 사용 불가
- 신고 기능 사용 불가
- 동의 불필요

### 3. Rate Limiting

- 신고: 일일 제한 (서비스 레벨)
- 이메일 인증: 재전송 제한

---

## Database Schema

**MongoDB + Mongoose**

**Collections:**
- `users` - 사용자 프로필
- `user_blocks` - 차단 관계
- `consents` - 사용자 동의 기록
- `consent_templates` - 동의 템플릿
- `refresh_tokens` - 토큰 관리
- `reports` - 신고 데이터
- `journey_ai_jobs` - AI 작업 상태

---

## Environment Configuration

**설정 파일:**
- `.env.development`
- `.env.production`

**주요 설정:**
- MongoDB URI
- JWT Secret + Expiry
- AWS S3 (Bucket, Region, Credentials)
- Firebase FCM
- OAuth (Google, Apple)
- Email Service
- Worker URL

---

## Deployment

**PM2:**
- Development: `momentbook-api-dev`
- Production: `momentbook-api`

**Build:**
```bash
npm run build
```

**Start:**
```bash
npm run start:prod
```

---

## API Documentation

**Swagger UI:**
- Development: `/api-docs`
- JSON: `/api-docs-json`
- Production: Disabled

**Postman Collection:**
- Available on request

---

## Testing Strategy

**권장 접근:**
- Unit: Service 레이어
- Integration: Facade 레이어
- E2E: Controller (실제 HTTP)

**현재 상태:**
- Manual testing via Swagger/Postman
- TODO: Automated test suite

---

## Migration Notes (v1 → v2)

### Breaking Changes

1. **Response Format:**
   - Consents: `version` 필드 위치 변경 (root → data)

2. **Module Structure:**
   - Facade 레이어 추가 (내부 변경, API 계약 유지)

### Non-Breaking Changes

- Swagger tags 소문자 통일
- Response 형식 표준화 (이미 대부분 일치)

---

## Future Improvements

### Recommended

1. **Testing:**
   - Jest 테스트 suite 추가
   - E2E 테스트 자동화

2. **Performance:**
   - Redis 캐싱 (consent templates)
   - Query 최적화 (인덱스 검토)

3. **Monitoring:**
   - APM 통합 (New Relic, DataDog)
   - Error tracking (Sentry)

4. **Documentation:**
   - ADR (Architecture Decision Records) 확장
   - API changelog 자동화

### Not Recommended

- 소셜/바이럴 기능 (철학과 불일치)
- 알고리즘 추천 (클라이언트 책임)
- 실시간 기능 (현재 범위 외)

---

## Summary

**현재 상태:**
- ✅ Facade 패턴 적용 완료
- ✅ Response 표준화 완료
- ✅ Swagger 문서화 정리
- ✅ 하위 호환성 보장 (Auth)
- ✅ Apple 요구사항 충족 (차단 기능)
- ✅ Build 성공

**프로덕션 준비 완료**

**아키텍처 원칙:**
1. 단순함 > 복잡함
2. 안정성 > 새 기능
3. 명시적 > 암묵적
4. 데이터 무결성 최우선

---

**Last Updated:** 2026-01-11
**Reviewed By:** Claude (AI Assistant)
**Status:** ✅ Production Ready
