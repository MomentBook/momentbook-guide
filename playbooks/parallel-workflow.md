# Parallel Workflow for Guides Batch Operations

이 문서는 `guides` 대량 생성 작업을 여러 에이전트와 세션이 동시에 수행할 수 있도록 하는 운영 규칙을 정의한다.
전제는 명확하다. 이 작업은 항상 다른 작업자, 다른 에이전트, 다른 세션과 동시에 진행될 수 있으므로, 각 작업은 충돌 없이 분리되어야 한다.

## 1. 병렬화 단위

기본 병렬화 단위는 `translationGroupId`다.
- 서로 다른 `translationGroupId`는 동시에 처리 가능하다.
- 같은 `translationGroupId`는 동시에 수정하지 않는다.
- 한 그룹 안에서는 source pack 고정 -> 영문 master 고정 -> 로컬라이징 -> QA -> DB upsert 순서를 지킨다.

## 2. 역할 분리

### Topic Researcher
입력:
- 기존 guides dataset
- 검색 의도 후보
- 공식 출처 / 연구 자료 / 백과 자료

출력:
- topic proposal
- source pack
- 금지할 표현과 불확실 요소 메모
- 추천 category / slug / publish window

규칙:
- 번역문을 직접 확정하지 않는다.
- source pack이 고정되기 전에는 본문을 final로 취급하지 않는다.

### Localization Writer
입력:
- 고정된 source pack
- 영문 master article
- 대상 언어 목록

출력:
- 언어별 `title`
- 언어별 markdown `body`
- 이미지 alt/caption 현지화 결과

규칙:
- source pack에 없는 사실을 추가하지 않는다.
- 다른 그룹의 문안을 임의로 수정하지 않는다.
- 같은 그룹의 모든 언어는 동일한 사실, 링크, 이미지 URL을 유지한다.

### QA Reviewer
입력:
- source pack
- 영문 master
- 현지화 초안
- 기존 schema / authoring guide

출력:
- 수정 필요 목록
- 통과/보류 판정
- 배치 반영 가능 여부

규칙:
- 대규모 재작성보다 정확한 결함 지적을 우선한다.
- 오역, 구조 누락, 링크 훼손, 이미지 alt 누락, markdown 붕괴를 우선 확인한다.

### Seeder
입력:
- QA 통과 데이터
- `translationGroupId`
- `slug`
- `publishedAt`

출력:
- bulk upsert 결과
- 생성/갱신 건수
- 언어별 반영 여부
- 검증 리포트

규칙:
- 소유권이 없는 `translationGroupId`를 건드리지 않는다.
- 항상 upsert로 처리하고, 반영 후 검증을 생략하지 않는다.

## 3. Write Ownership 원칙

- 하나의 `translationGroupId`는 한 시점에 하나의 작업자만 write owner가 된다.
- write owner는 source pack 고정, 영문 master 확정, 번역본 수합, QA 반영 요청까지 해당 그룹의 쓰기 책임을 진다.
- 다른 작업자는 같은 그룹에 대해 read-only로만 접근한다.
- 이미 진행 중인 그룹은 덮어쓰지 말고, 새 그룹을 만들거나 기존 owner와 조율한다.
- 파일, JSON artifact, DB row 중 하나라도 동일 그룹이면 같은 ownership 규칙을 적용한다.

## 4. Source Pack 우선 고정 규칙

1. 먼저 topic과 출처를 조사한다.
2. source pack을 고정한다.
3. 영문 master를 작성한다.
4. source pack이 고정된 뒤에만 다국어 번역을 시작한다.
5. source pack 변경이 필요하면 번역본부터 수정하지 말고 source pack과 영문 master를 먼저 다시 고정한다.

source pack 최소 포함 요소:
- topic name
- primary search intent
- category
- title candidate
- 핵심 사실 bullet
- 공식/연구/백과/보조 링크
- 금지할 표현 또는 미확정 요소
- image URL / alt 방향성

## 5. PublishAt 분산 규칙

- 같은 batch의 글이 한 날짜에 몰려 보이지 않도록 그룹 단위로 날짜를 분산한다.
- 권장 방식은 서로 다른 topic group마다 서로 다른 날짜를 할당하는 것이다.
- 시간은 정시만 쓰지 말고 분 단위를 섞는다.
- 같은 `translationGroupId` 안의 다국어 문서는 일반적으로 같은 `publishedAt`을 사용한다.
- 재시드 시에는 기존 `publishedAt`을 보존해 list ordering이 불필요하게 흔들리지 않게 한다.

## 6. DB Upsert 검증 항목

Seeder는 반영 직후 아래 항목을 확인해야 한다.
- `translationGroupId`가 기대값과 일치하는가
- 언어 9개가 빠짐없이 존재하는가
- `(language, slug)` 조합이 의도대로 저장됐는가
- `title`, `body`, `category`, `publishedAt`가 비어 있지 않은가
- 첫 이미지 URL과 alt text가 유지되는가
- source section의 링크가 손상되지 않았는가
- 기존 row가 의도치 않게 다른 그룹으로 덮어써지지 않았는가
- public list ordering이 publish date 분산 원칙과 맞는가

검증 실패 시:
- 실패 그룹만 분리해서 다시 처리한다.
- source pack 문제인지, translation 문제인지, seed 문제인지 원인을 분리한다.
- 성공한 그룹과 실패한 그룹을 한 번에 다시 seed하지 않는다.

## 7. 권장 실행 순서

1. Topic Researcher가 source pack을 만든다.
2. source pack을 고정한다.
3. 영문 master article을 작성한다.
4. Localization Writer가 다국어 본문을 작성한다.
5. QA Reviewer가 검수한다.
6. Seeder가 DB upsert를 수행한다.
7. 최종 검증 결과를 docs 또는 작업 로그에 남긴다.

## 8. 충돌 방지 메모

- 서로 다른 `translationGroupId`는 병렬 실행한다.
- 같은 그룹은 순차 실행한다.
- 다른 작업자가 동시에 존재할 수 있으므로, 작업 시작 전에 ownership을 먼저 확인한다.
- 불확실한 상태에서는 추측으로 진행하지 말고 그룹을 분리하거나 대기한다.
