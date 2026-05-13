# Route Inventory BEFORE Clean Refactor

**Date:** 2026-01-11
**Purpose:** Safety baseline - all routes must remain unchanged after refactor

---

## Auth Controller

**Tag:** `@ApiTags('auth')`
**Base Path:** `/v2/auth`

| Method | Path | Summary |
|--------|------|---------|
| GET | /google | Google OAuth 인증 시작 |
| GET | /google/callback | Google OAuth Callback |
| POST | /google/token | Google Token으로 인증 (모바일) |
| POST | /apple | Apple Sign-In 인증 |
| POST | /guest | 게스트로 계속하기 |
| POST | /refresh | Access Token 갱신 |
| POST | /logout | 로그아웃 (단일 디바이스) |
| POST | /logout-all | 모든 디바이스에서 로그아웃 |
| POST | /email/send-verification | 이메일 인증 코드 발송 |
| POST | /email/verify-code | 이메일 인증 코드 확인 |
| POST | /email/signup | 이메일 회원가입 |
| POST | /email/login | 이메일 로그인 |
| POST | /email/password | 비밀번호 변경 |
| POST | /email/request-password-reset | 비밀번호 재설정 코드 요청 |
| POST | /email/reset-password | 비밀번호 재설정 |
| GET | /email/check | 이메일 존재 여부 확인 |

**Total:** 16 endpoints

---

## Users Controller

**Tag:** `@ApiTags('users')`
**Base Path:** `/v2/users`

| Method | Path | Summary | Notes |
|--------|------|---------|-------|
| GET | /profile/me | 내 프로필 조회 | |
| PUT | /profile/me | 내 프로필 업데이트 | |
| GET | / | 모든 사용자 목록 조회 | Admin only |
| GET | /profile/:userId | 특정 사용자 정보 조회 | |
| DELETE | /me | 회원 탈퇴 | |
| **GET** | **/consents** | **사용자 동의 목록 조회** | **MOVE TO CONSENTS** |
| **POST** | **/consents** | **사용자 동의 업데이트** | **MOVE TO CONSENTS** |
| **GET** | **/consents/validate** | **필수 동의 항목 검증** | **MOVE TO CONSENTS** |
| POST | /blocks/:blockedUserId | 사용자 차단 | **Apple requirement** |
| DELETE | /blocks/:blockedUserId | 사용자 차단 해제 | **Apple requirement** |
| GET | /blocks/:blockedUserId/status | 사용자 차단 상태 조회 | **Apple requirement** |
| GET | /blocks | 차단된 사용자 목록 조회 | **Apple requirement** |

**Total:** 12 endpoints
**To Move:** 3 consent endpoints (keep path `/v2/users/consents*`, change tag to `consents`)
**Must Keep:** 4 blocking endpoints (Apple requirement)

---

## Consents Controller

**Tag:** `@ApiTags('consents')`
**Base Path:** `/v2/consent-templates`

| Method | Path | Summary |
|--------|------|---------|
| GET | / | 동의 항목 템플릿 목록 조회 |

**Total:** 1 endpoint

**Will Add:** 3 user-consents endpoints (moved from users controller)

---

## Reports Controller

**Tag:** `@ApiTags('reports')`
**Base Path:** `/v2/reports`

| Method | Path | Summary |
|--------|------|---------|
| POST | / | 신고 생성 |
| GET | / | 신고 목록 조회 (관리자용) |
| GET | /stats | 신고 통계 조회 (관리자용) |
| GET | /target/:targetType/:targetId/count | 특정 대상의 신고 개수 조회 |
| GET | /:reportId | 특정 신고 조회 (관리자용) |
| PUT | /:reportId | 신고 업데이트 (관리자용) |
| DELETE | /:reportId | 신고 삭제 (관리자용) |

**Total:** 7 endpoints

---

## Journeys AI Controller

**Tag:** `@ApiTags('journeys')`
**Base Path:** `/v2/journeys`

| Method | Path | Summary |
|--------|------|---------|
| POST | /:journeyId/ai/panorama | 파노라마(360) 생성 작업 요청 |
| POST | /:journeyId/ai/title | 제목 생성 작업 요청 |
| GET | /:journeyId/ai/jobs/:jobId | AI 작업 상태 조회 |

**Total:** 3 endpoints

---

## Journeys Title Controller

**Tag:** `@ApiTags('journeys')`
**Base Path:** `/v2/journeys`

| Method | Path | Summary |
|--------|------|---------|
| POST | /:journeyId/title/auto | 게시 제목 자동 생성 |

**Total:** 1 endpoint

---

## Health Controller

**Tag:** `@ApiTags('health')`
**Base Path:** `/v2/health`

| Method | Path | Summary |
|--------|------|---------|
| GET | /healthz | Health Check (process only) |
| GET | /readyz | Ready Check (includes Mongo ping) |

**Total:** 2 endpoints

---

## Summary

**Total Endpoints:** 42

**Endpoints by Controller:**
- Auth: 16
- Users: 12 (will become 9 after moving consents)
- Consents: 1 (will become 4 after adding user-consents)
- Reports: 7
- Journeys (AI): 3
- Journeys (Title): 1
- Health: 2

**Critical Requirements:**
- ✅ All 42 routes must remain exactly the same (path + method)
- ✅ Auth endpoints: response JSON MUST NOT change
- ✅ Apple blocking endpoints (4) MUST remain unchanged
- ✅ `/v2/users/consents*` paths stay the same, only Swagger tag changes

---

**Status:** Baseline documented - ready for refactor
