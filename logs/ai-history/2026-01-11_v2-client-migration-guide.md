# MomentBook API v2 - Client Migration Guide

**Date:** 2026-01-11
**Target Audience:** Mobile & Web Client Developers

---

## Overview

이 가이드는 MomentBook API v2로 마이그레이션하는 클라이언트 개발자를 위한 것입니다.

**주요 변경사항:**
- ✅ Response 형식 표준화
- ✅ Swagger documentation 개선
- ⚠️ 1개 엔드포인트 Breaking Change (Consents)

---

## Breaking Changes

### 1. Consent Templates Response (변경됨)

**엔드포인트:** `GET /v2/consent-templates`

**변경 내용:** `version` 필드 위치 이동

#### Before (Old)
```json
{
  "status": "success",
  "data": {
    "templates": [
      {
        "_id": "...",
        "key": "eula",
        "label": "EULA 동의",
        "content": "...",
        "required": true,
        "version": "1.0.0"
      }
    ]
  },
  "version": "1.0.0"  // ❌ Root level
}
```

#### After (New)
```json
{
  "status": "success",
  "data": {
    "templates": [
      {
        "_id": "...",
        "key": "eula",
        "label": "EULA 동의",
        "content": "...",
        "required": true,
        "version": "1.0.0"
      }
    ],
    "version": "1.0.0"  // ✅ Inside data
  }
}
```

#### Migration Code

**React Native / TypeScript:**
```typescript
// Before
const response = await api.get('/consent-templates');
const version = response.version;  // ❌ Old way

// After
const response = await api.get('/consent-templates');
const version = response.data.version;  // ✅ New way
```

**Swift:**
```swift
// Before
let version = response.version  // ❌ Old

// After
let version = response.data.version  // ✅ New
```

**Kotlin:**
```kotlin
// Before
val version = response.version  // ❌ Old

// After
val version = response.data.version  // ✅ New
```

---

## Standard Response Format (전체 API)

모든 성공 응답은 이제 일관된 형태를 따릅니다:

```typescript
{
  status: "success",
  data: <payload>,
  message?: "optional description"
}
```

### Examples

#### User Profile
```json
{
  "status": "success",
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "...",
    "name": "...",
    "email": "...",
    "picture": "..."
  },
  "consents": {
    "isAllRequiredConsented": true,
    "missingRequiredConsents": [],
    "requiresAction": false
  }
}
```

#### Report Creation
```json
{
  "status": "success",
  "message": "신고가 접수되었습니다.",
  "data": {
    "_id": "...",
    "targetType": "user",
    "targetId": "...",
    "reason": "spam",
    "status": "pending"
  }
}
```

#### AI Job Status
```json
{
  "status": "success",
  "data": {
    "job": {
      "jobId": "...",
      "status": "completed",
      "result": {
        "outputUrl": "..."
      }
    }
  }
}
```

---

## Auth Endpoints (변경 없음)

**중요:** Auth 엔드포인트는 **완전히 하위 호환**됩니다.

모든 인증 관련 API는 기존과 동일하게 작동:
- ✅ Google OAuth
- ✅ Apple Sign-In
- ✅ Email 인증
- ✅ Token refresh
- ✅ Logout

**변경 사항 없음 - 기존 코드 그대로 사용 가능**

---

## Response Handling Best Practices

### 1. Type-Safe Response Handling

**TypeScript 예시:**
```typescript
interface ApiResponse<T> {
  status: 'success';
  data: T;
  message?: string;
}

interface ConsentTemplatesData {
  templates: ConsentTemplate[];
  version: string;
}

// Usage
const response = await api.get<ApiResponse<ConsentTemplatesData>>(
  '/consent-templates'
);

const { templates, version } = response.data;
```

### 2. Error Handling

에러 응답은 기존과 동일:
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description",
  "timestamp": "2026-01-11T12:00:00.000Z",
  "path": "/v2/..."
}
```

**예시:**
```typescript
try {
  const response = await api.post('/reports', reportData);
  if (response.status === 'success') {
    console.log('Report created:', response.data);
  }
} catch (error) {
  if (error.response) {
    console.error('Error:', error.response.message);
    console.error('Status:', error.response.statusCode);
  }
}
```

---

## API Client Generation

### 1. OpenAPI/Swagger

Swagger 문서에서 자동 생성:
```bash
# Download OpenAPI spec
curl http://localhost:3001/api-docs-json > openapi.json

# Generate TypeScript client
npx openapi-typescript-codegen --input openapi.json --output ./src/api

# Generate Swift client
brew install openapi-generator
openapi-generator generate -i openapi.json -g swift5 -o ./API
```

### 2. Manual Client (참고용)

```typescript
// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.momentbook.app/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.statusCode === 401) {
      // Handle token refresh
      return refreshTokenAndRetry(error.config);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## Testing Your Migration

### Checklist

#### 1. Consent Templates
- [ ] Update `version` field access from `response.version` to `response.data.version`
- [ ] Test template fetching
- [ ] Verify version comparison logic

#### 2. All Other Endpoints
- [ ] Verify response parsing still works
- [ ] Check error handling
- [ ] Test pagination (if applicable)

#### 3. Auth Flow
- [ ] Login (Google/Apple/Email)
- [ ] Token refresh
- [ ] Logout
- [ ] No changes expected ✅

#### 4. User Features
- [ ] Profile view/update
- [ ] Consent management
- [ ] Blocking users (Apple requirement)

#### 5. Reports
- [ ] Create report
- [ ] View report status

---

## Common Pitfalls

### ❌ Don't Do This

```typescript
// Accessing version from wrong place
const version = response.version;  // undefined!

// Assuming old response shape
const templates = response.templates;  // undefined!
```

### ✅ Do This

```typescript
// Always access data through response.data
const { templates, version } = response.data;

// Use type guards
if (response.status === 'success') {
  const data = response.data;
  // Now TypeScript knows the shape
}
```

---

## Backward Compatibility Strategy

### Option 1: Hard Cut (Recommended)

기존 v1 클라이언트를 완전히 v2로 마이그레이션:

```typescript
// Update all API calls at once
import { apiV2 } from './api/v2-client';

// Use v2 everywhere
const templates = await apiV2.getConsentTemplates();
```

### Option 2: Gradual Migration

일부 기능만 먼저 마이그레이션:

```typescript
// Keep both versions temporarily
import { apiV1 } from './api/v1-client';
import { apiV2 } from './api/v2-client';

// Use v2 for new features
const templates = await apiV2.getConsentTemplates();

// Keep v1 for critical paths (temporary)
const userProfile = await apiV1.getUserProfile();
```

**주의:** Option 2는 임시 전략이며, 최대한 빨리 Option 1로 전환 권장

---

## Support & Resources

### Documentation
- Swagger UI: `https://api.momentbook.app/api-docs` (개발 환경만)
- Architecture Doc: `/docs/ai/2026-01-11_api-architecture-final.md`

### Questions?
- Backend 팀에 문의
- API 변경사항은 모두 문서화되어 있음

### Breaking Changes Summary
- **1개 엔드포인트만 영향:** `GET /consent-templates`
- **모든 Auth 엔드포인트:** 변경 없음 ✅
- **기타 엔드포인트:** 이미 표준 형식 사용 중 ✅

---

## Quick Reference

### Response Format

```typescript
// All successful responses
{
  status: "success",
  data: { ... },
  message?: "..."
}

// All error responses
{
  success: false,
  statusCode: number,
  message: string,
  timestamp: string,
  path: string
}
```

### Changed Endpoints

| Endpoint | Change | Action Required |
|----------|--------|-----------------|
| `GET /consent-templates` | `version` moved to `data` | Update field access |

### Unchanged Endpoints

All other endpoints maintain the same response structure ✅

---

**Last Updated:** 2026-01-11
**Version:** 2.0
**Status:** Ready for Client Integration
