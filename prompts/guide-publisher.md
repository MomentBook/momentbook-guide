# Guide Publisher Prompt

이 프롬프트는 Momentbook 여행 정보 guide 1개를 고르고, 공식 자료를 확인해 작성하고, 지원 언어 전체로 현지화한 뒤, dev DB와 요청 시 prod DB까지 반영하는 end-to-end 실행 계약이다.

사용자 지시는 짧아도 된다. 이 파일을 읽은 에이전트는 아래 기준을 모두 책임진다.

## Scheduled Automation Orchestration

예약 실행에서는 이 파일만 읽고 단일 에이전트가 끝까지 진행하지 않는다.

예약 실행은 반드시 아래 파일을 함께 따른다.

- `automation/tasks/guide-publisher/workflow.md`
- `automation/shared/codex-operating-principles.md`
- `automation/tasks/guide-publisher/agents/orchestrator.md`
- `automation/tasks/guide-publisher/agents/source-researcher.md`
- `automation/tasks/guide-publisher/agents/master-writer.md`
- `automation/tasks/guide-publisher/agents/localization-cjk-agent.md`
- `automation/tasks/guide-publisher/agents/localization-latin-agent.md`
- `automation/tasks/guide-publisher/agents/localization-sea-agent.md`
- `automation/tasks/guide-publisher/agents/qa-reviewer.md`
- `automation/tasks/guide-publisher/agents/publisher.md`

핵심 원칙:

- source pack, English master, fact parity map, localization, QA, publishing을 서로 다른 bounded role로 분리한다.
- localization은 English master와 fact parity map이 freeze된 뒤에만 병렬 실행한다.
- QA는 모든 localization output이 존재한 뒤 병렬 실행한다.
- DB write 전 `node tools/quality/article-quality-gate.js .automation/runs/<run_id>/payload/articles.json`가 반드시 exit 0이어야 한다.
- 품질 gate가 실패하면 수동 판단으로 덮어쓰지 말고 publish를 중단한다.
- 역할 agent는 frozen input과 명확한 output schema를 받아야 하며, raw log나 전체 DB export를 불필요하게 넘기지 않는다.

## One-Line User Command

```text
momentbook-guide의 guide-publisher.md대로 새 guide 1개를 dev 작성부터 운영 DB 반영까지 끝내줘.
```

## Non-Negotiable Outcome

작업은 "글을 작성했다", "JSON을 만들었다", "스크립트를 만들었다"에서 끝나지 않는다.

완료 기준은 아래다.

- `registry/editorial-guide-registry.md`에 없는 새 여행 guide topic 1개를 고른다.
- 공식 source를 실제로 확인하고, source pack을 만든다.
- 작성일, source checked date, slug 날짜, `publishedAt`을 실행 당일 기준으로 정확히 다룬다.
- 독자가 읽기 좋은 웹 정보글을 source-language master로 완성한다.
- `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi` 9개 언어 전체를 완전한 정보량으로 현지화한다.
- `es`, `pt`, `fr`, `vi`는 ASCII-only transliteration이 아니라 정상 diacritic과 tone mark가 있는 문장이어야 한다.
- dev DB에 9개 article record를 insert/upsert 한다.
- dev DB에서 같은 `translationGroupId`의 9개 언어 record를 검증한다.
- 사용자가 운영 반영까지 요청했으면 prod DB에도 같은 `translationGroupId` 하나만 DB-only로 복제한다.
- prod DB에서 같은 `translationGroupId`의 9개 언어 record를 검증한다.
- registry status를 실제 DB 상태에 맞게 `dev` 또는 `prod+dev`로 갱신한다.
- 작업 중 만든 임시 script, generated payload, backup, helper file을 제거한다.

## Environment Contract

### Development

- 접속 명령어: `ssh momentbook-dev`
- guide workspace: `/home/ubuntu/app/momentbook-guide`
- app/API workspace: `/home/ubuntu/app/momentbook-api`
- web workspace: `/home/ubuntu/app/momentbook-web`
- prompt path: `/home/ubuntu/app/momentbook-guide/prompts/guide-publisher.md`
- authoring guide: `/home/ubuntu/app/momentbook-guide/playbooks/authoring-guide.md`
- registry path: `/home/ubuntu/app/momentbook-guide/registry/editorial-guide-registry.md`

### Production

- 접속 명령어: `ssh momentbook`
- 운영 반영은 DB-only로 수행한다.
- 운영 환경에는 import script, generated payload, backup JSON, temp helper file을 남기지 않는다.
- 운영 DB 반영 범위는 dev DB에서 이번 작업으로 검증한 `translationGroupId` 하나로 제한한다.
- 운영에서 임시 파일이 불가피하게 생겼다면 검증 전에 삭제하고, 최종 보고에 삭제 목록을 남긴다.

## Required First Reads

작업을 시작하기 전에 반드시 아래 파일을 읽고 현재 상태를 이해한다.

- `AGENTS.md`
- `playbooks/authoring-guide.md`
- `registry/editorial-guide-registry.md`
- 이 파일, `prompts/guide-publisher.md`

`logs/`와 `artifacts/`는 과거 참고 자료다. 현재 작업 규칙은 위 네 파일이 우선한다.

## Research Basis For Web Writing

가이드 작성 전에 아래 기준을 작업 메모리에 반영한다.

- [GOV.UK Writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk): 사용자가 과업을 끝내는 데 필요한 정보만 앞쪽에 명확히 배치한다.
- [Nielsen Norman Group, How Users Read on the Web](https://www.nngroup.com/articles/how-users-read-on-the-web/): 사용자는 웹페이지를 단어 단위로 읽기보다 스캔한다. 의미 있는 subheading, bullet list, 한 문단 한 생각, inverted pyramid, 객관적 문체가 필요하다.
- [Nielsen Norman Group, F-Shaped Pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/): formatting이 약하면 독자는 중요한 정보를 놓친다. heading과 list로 시선을 안내해야 한다.
- [Nielsen Norman Group, Inverted Pyramid](https://www.nngroup.com/articles/inverted-pyramid/): 결론과 핵심 판단 정보를 먼저 제시하고, 세부 정보는 뒤에 둔다.
- [W3C WAI Writing for Web Accessibility](https://www.w3.org/WAI/tips/writing/): 짧고 고유한 제목, 구조를 전달하는 heading, 의미 있는 link text, 구체적 image alt text, 명확한 지시문이 필요하다.
- [Google Search Central, Helpful Reliable People-First Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): 검색엔진이 아니라 사람에게 도움이 되는 완전하고 신뢰 가능한 콘텐츠여야 한다.
- [Google Search Central, Best date for your web page](https://developers.google.com/search/blog/2019/03/help-google-search-know-best-date-for): 페이지 날짜는 페이지 자체가 발행 또는 실질 갱신된 날짜여야 하며, 미래 이벤트 날짜를 발행일처럼 쓰면 안 된다.
- [Google Search Central, Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions): 다국어 페이지는 main content가 실제로 번역되어야 하며, 언어별 버전 관계가 명확해야 한다.
- [Google Search Central, Language or script misalignment](https://developers.google.com/search/blog/2022/06/title-script-misalignment): 제목과 본문은 페이지의 주 언어와 문자 체계가 맞아야 한다.
- [W3C Internationalization](https://www.w3.org/International/): 언어, 문자, 지역 차이를 콘텐츠 품질의 일부로 다룬다.

이 기준에서 도출한 실행 원칙은 아래다.

- 첫 2문단 안에 독자의 문제, 결론, 가장 중요한 제약을 제시한다.
- H2만 훑어도 글의 구조와 판단 흐름이 보여야 한다.
- `What to know first`는 5~7개 bullet로 작성한다.
- 긴 벽돌 문단을 금지한다. 한 문단은 보통 1~3문장이다.
- 숫자, 가격, 시간, 날짜, 예약 조건, 예외, route는 bullet 또는 짧은 단락으로 분리한다.
- 홍보 문구, 과장, "ultimate", "hidden gem", "must-see" 같은 근거 없는 표현을 금지한다.
- 공식 source를 복붙하지 말고, 여행자의 의사결정 언어로 해석한다.
- 링크 텍스트와 source label은 사람이 보고 목적을 알 수 있어야 한다.
- 이미지 alt text는 `image`, `photo`가 아니라 이미지가 보여주는 구체적 장면이어야 한다.

## Topic Selection

새 topic은 아래 조건을 모두 만족해야 한다.

- registry에 같은 국가, 도시, 장소, scope, information angle이 없어야 한다.
- registry의 `queued` 항목도 이미 선점된 주제로 간주한다.
- 기본값은 아직 registry에 없는 국가 또는 scope를 고르는 것이다.
- 같은 국가는 사용자가 명시적으로 허용하지 않으면 재사용하지 않는다.
- 같은 국가를 예외적으로 재사용할 때는 registry에 reuse reason을 남긴다.
- 너무 generic한 도시 소개가 아니라 검색 의도가 분명한 여행 정보글이어야 한다.
- 공식 source만으로 핵심 사실을 검증할 수 있어야 한다.
- 최소 6개 이상의 실질 H2 섹션을 만들 만큼 traveler decision point가 충분해야 한다.

좋은 topic의 예:

- 공항-도심 이동, 공식 패스, 입장 예약, timed entry, 교통권, 국립공원 permit, 박물관/유적지 방문 규칙, 공식 ferry/rail route, 날씨·폐쇄 리스크, 현장 실수 방지.

나쁜 topic의 예:

- "서울 여행 가이드", "파리에서 할 일", "숨은 명소", source 없이 감상으로 채우는 도시 개요.

## Official Source Crawling Protocol

가이드는 공식 자료를 크롤링 또는 직접 확인한 정보글이어야 한다.

source 우선순위:

1. 정부, 이민국, 관광청, 공항, 철도, 공공교통, 국립공원, 박물관, 문화재 기관, 행사 주최 측 공식 페이지
2. UNESCO, 공공 reference, 공식 cultural institution
3. 필요한 경우에만 신뢰 가능한 보조 출처
4. 핵심 사실은 보조 출처만으로 확정하지 않는다

source pack에는 각 source마다 아래를 남긴다.

- URL
- publisher
- page title 또는 document title
- checked date: 실행 환경의 오늘 날짜
- source purpose: 이 source가 어떤 hard fact를 뒷받침하는지
- volatility: `low`, `medium`, `high`
- recheck item: 운영시간, 가격, 예약, 폐쇄, route, 규정처럼 재확인이 필요한 항목

크롤링 규칙:

- time-sensitive fact는 작성 당일 공식 페이지에서 다시 확인한다.
- 공식 페이지가 동적으로 로딩되면 가능한 범위에서 rendered text, linked PDF, FAQ, ticket page를 확인한다.
- source 간 정보가 충돌하면 본문에 단정하지 말고 `What to check before you go`에 재확인 지점을 명시한다.
- 가격, 운영시간, 예약 가능일, 규정, 입장 조건, 교통 시간표는 source pack에 근거가 없으면 본문에 넣지 않는다.
- source page의 문장을 길게 복사하지 않는다. 사실을 확인한 뒤 독자에게 필요한 판단으로 재구성한다.

## Date And Today Rules

작성일은 항상 실행 환경의 실제 오늘 날짜로 작성한다.

- 작업 시작 시 dev 환경에서 `date` 또는 동등한 명령으로 현재 날짜와 시간, timezone을 확인한다.
- `sourceCheckedDate`는 source를 실제 확인한 local date다. 미래일 수 없다.
- article의 visible 작성일 또는 updated date가 필요하면 오늘 날짜를 사용한다.
- slug에 날짜를 넣는다면 오늘 local date와 같아야 한다.
- `publishedAt`은 DB에 실제로 쓰는 공개 발행 timestamp다.
- `publishedAt`은 topic의 행사일, 여행 시즌, 공식 source 날짜, batch 정렬용 날짜가 아니다.
- 같은 `translationGroupId`의 9개 language record는 같은 `publishedAt`을 사용한다.
- published-only workflow에서 `publishedAt`은 현재 검증 시각보다 미래일 수 없다. 허용 오차는 clock skew를 고려해 5분 이내다.
- 내용 변경 없이 freshness만 노리는 날짜 갱신을 하지 않는다.

## Article Schema Contract

각 record는 아래 필드를 갖는다.

- `translationGroupId`: 9개 언어가 공유하는 새 그룹 ID
- `language`: `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi` 중 하나
- `slug`: language 안에서 유일한 설명적 slug
- `category`: `festival`, `travel-guide`, `destination-guide`, `wellbeing-guide` 중 하나
- `title`: 해당 언어의 자연스러운 제목
- `body`: markdown article body
- `publishedAt`: 실제 DB write timestamp
- `status`: published-only article이면 `PUBLISHED`

category는 제목이 아니라 독자 의도 기준으로 고른다.

- `travel-guide`: 이동, 예약, 준비, 절차, 입장, 교통, 패스, 비용, 규칙 중심
- `destination-guide`: 장소 자체의 방문 판단과 동선 중심
- `festival`: 축제, 시즌 이벤트, 퍼레이드, 행사 중심
- `wellbeing-guide`: 회복, 수면, 리듬, 조용한 체류, 웰니스 중심

## Required Article Shape

각 언어의 markdown body는 아래 기능을 모두 포함한다. heading 이름은 언어별로 자연스럽게 바꿀 수 있지만 기능은 유지한다.

```md
# Clear user-focused title

2 short paragraphs:
- who this is for
- what decision it helps with
- the most important constraint or conclusion

## What to know first

- 5~7 concrete bullets.
- Each bullet helps the traveler decide, prepare, or avoid a mistake.

![Specific alt text](https://example.com/image.jpg)
Source: short source caption.

## Access, ticket, reservation, or route decision

## Timing and route plan

## Rules that change the day

## Common mistakes

## Who should choose which option

## What to check before you go

## Sources

- Official source links with human-readable labels.
```

depth 기준:

- English master 기준 1,100~1,800 words에 해당하는 정보 밀도를 목표로 한다.
- 모든 언어는 같은 정보량과 같은 판단 흐름을 유지한다.
- 최소 6개 이상의 실질 H2 섹션을 둔다. `Sources`는 이 숫자에 포함하지 않는다.
- 각 H2는 최소 2~4개의 짧은 문단 또는 실행 가능한 list를 포함한다.
- 반복으로 길이를 채우지 않는다. 깊이가 부족하면 topic이나 source pack을 다시 고른다.

## Master Writing Workflow

1. source-language master를 먼저 완성한다. 기본 master language는 `en`이다.
2. master 단계에서 topic, source pack, section structure, hard facts, image, warnings, source list를 모두 확정한다.
3. master는 초안이 아니라 publish 가능한 최종 글이어야 한다.
4. master freeze 후 `fact parity map`을 작성한다.
5. fact parity map에는 아래 항목을 섹션별로 적는다.
   - 가격
   - 시간
   - 날짜
   - 예약 조건
   - 입장 조건
   - 예외와 폐쇄 리스크
   - 금지사항과 현장 규칙
   - route와 transfer
   - image alt/caption
   - source link와 source label

## Full Localization Contract

지원 언어는 항상 9개다.

- `ko`
- `en`
- `ja`
- `zh`
- `es`
- `pt`
- `fr`
- `th`
- `vi`

번역은 "대략적인 요약"이 아니라 완전한 현지화다.

- 모든 언어는 같은 hard fact, 같은 warning, 같은 예외, 같은 source meaning을 가져야 한다.
- 각 언어의 title, H1, H2, paragraph, bullet, image alt, caption, source label을 자연스럽게 현지화한다.
- 비영어 본문에 영어 heading이나 placeholder를 남기지 않는다.
- 외부 번역 API, OpenAI API, 자동 번역 배치 호출을 사용하지 않는다.
- 언어별 품질을 확신할 수 없으면 publish하지 않는다.
- 완벽한 정보 보존을 검증할 수 없으면 중단하고 필요한 검토를 보고한다.

문자 체계 규칙:

- `ko`: 자연스러운 한국어와 한글을 사용한다.
- `ja`: 日本語の文体、かな、漢字、句読点を 사용한다.
- `zh`: 한 translation group 안에서 선택한 Chinese variant를 일관되게 유지한다.
- `es`: 표준 스페인어 철자와 diacritic을 보존한다.
- `pt`: 표준 포르투갈어 철자와 diacritic을 보존한다.
- `fr`: 표준 프랑스어 철자와 diacritic을 보존한다.
- `th`: Thai script를 사용한다. 로마자 음역만 있는 본문은 실패다.
- `vi`: Vietnamese tone marks를 보존한다.
- `es`, `pt`, `fr`, `vi`에서 악센트가 빠진 ASCII-only 문장은 "번역 완료"가 아니라 실패다.
- 예: `Huong dan`, `gia ve`, `gio mo cua`, `khong`, `Guia`, `publica`, `nao`, `regles`, `a La Paz`처럼 정상 철자에서 diacritic이 빠진 문장이 반복되면 publish하지 않는다.

## Quality Gates

아래 gate 중 하나라도 실패하면 DB insert/upsert를 하지 않는다.

### Source Gate

- source pack이 공식 source 중심인가
- 모든 hard fact가 source pack에 추적 가능한가
- time-sensitive fact를 오늘 다시 확인했는가
- source conflict를 숨기지 않았는가
- official source가 약하면 topic을 바꿨는가

### Date Gate

- 실행 환경 clock을 확인했는가
- 작성일과 source checked date가 오늘인가
- slug 날짜를 썼다면 오늘 날짜인가
- `publishedAt`이 실제 DB write timestamp인가
- `publishedAt`이 미래가 아닌가
- 9개 언어 record가 같은 `publishedAt`을 쓰는가

### Readability Gate

- 첫 2문단 안에 독자 문제와 결론이 있는가
- `What to know first`만 읽어도 핵심 판단이 가능한가
- H2 heading이 정보 scent를 주는가
- 긴 벽돌 문단이 없는가
- 숫자, 규칙, route, 예외가 스캔 가능하게 정리됐는가
- 공식 source를 여행자 행동 언어로 바꿨는가
- 과장과 마케팅 문구가 없는가

### Accessibility Gate

- H1은 1개인가
- H2/H3 hierarchy가 논리적인가
- link text와 source label이 의미 있는가
- 첫 이미지가 cover 후보로 적절한가
- alt text가 구체적인가
- 표를 사용했다면 markdown에서 읽기 쉬운가

### Localization Gate

- 9개 언어가 모두 존재하는가
- 비영어 본문에 영어 heading이나 placeholder가 없는가
- 필요한 script와 diacritic이 보존됐는가
- `es`, `pt`, `fr`, `vi`가 ASCII-only transliteration으로 작성되지 않았는가
- image alt/caption과 source label까지 현지화했는가
- 언어별 문체가 자연스러운가

### Semantic Parity Gate

- fact parity map의 모든 항목이 9개 언어에 존재하는가
- 각 언어의 H1/H2/source/image 구조가 대응되는가
- hard fact, warning, route, exception, rule, price, time이 언어별로 누락되지 않았는가
- 특정 언어만 축약본이 되지 않았는가

### Automated Quality Gate

DB write 전 아래 command를 실행한다.

```sh
node tools/quality/article-quality-gate.js .automation/runs/<run_id>/payload/articles.json
```

이 gate는 아래를 자동 확인한다.

- required language set 9개
- future `publishedAt` 금지
- H1/H2, first image, source section, `What to know first`
- 최소 정보량
- locale script와 diacritic/tone mark
- 영어 heading leakage

exit code가 0이 아니면 dev DB와 prod DB 모두에 쓰지 않는다.

## Dev DB Apply

dev DB 반영 전:

- 9개 language record를 모두 준비한다.
- 필요한 경우에만 임시 script 또는 payload를 만든다.
- 가능하면 파일을 남기지 않는 one-shot 실행 방식을 우선한다.
- 임시 artifact를 만들었다면 경로를 기록하고, 검증 후 삭제한다.
- 예약 실행에서는 `payload/articles.json`을 만든 뒤 automated quality gate를 통과해야 한다.

dev DB 반영 후 반드시 검증한다.

- `translationGroupId`
- language set: `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi`
- `(language, slug)` uniqueness
- `category`
- `title`
- `publishedAt`
- `status`
- body length
- H1 1개
- 최소 6개 실질 H2
- `What to know first`
- 첫 image와 alt text
- `Sources`
- localization/script/diacritic
- automated quality gate pass
- fact parity map consistency

dev DB 검증이 끝나면 이번 작업의 canonical 값으로 아래를 고정한다.

- `translationGroupId`
- `category`
- `publishedAt`
- language별 slug

## Prod DB-Only Replication

사용자가 운영 반영까지 요청했으면 dev DB 검증 후 prod로 진행한다.

운영 반영 원칙:

- `ssh momentbook` 으로 접속한다.
- dev에서 검증한 `translationGroupId` 하나만 복제한다.
- 시간 범위, "이번 세션", generated file 목록으로 복제 범위를 잡지 않는다.
- 운영 환경에는 파일을 남기지 않는다.
- 운영에 임시 파일을 만들지 않는 stdin, one-shot DB command, shell command 방식을 우선한다.
- 운영 DB에 쓰기 전에 같은 `translationGroupId` 또는 `(language, slug)` 충돌을 확인한다.
- 운영 DB에 9개 record를 insert/upsert 한다.
- 운영 DB에서 dev와 같은 검증을 반복한다.
- dev와 prod의 language set, slug set, title set, category, publishedAt이 일치하는지 확인한다.

운영 검증이 끝나기 전에는 완료로 보고하지 않는다.

## Registry Update

registry status는 파일 존재 여부가 아니라 실제 DB 상태 기준이다.

- DB insert 전: `queued`
- dev DB 검증 완료: `dev`
- dev DB와 prod DB 검증 완료: `prod+dev`

registry에는 최소한 아래를 남긴다.

- topic
- country/scope
- city/region
- information angle
- category
- translationGroupId
- slug
- language set
- source checked date
- publishedAt
- status
- dev/prod 검증 요약
- 같은 국가를 재사용했다면 reuse reason

## Artifact Lifecycle

- script와 generated payload는 기본적으로 임시 artifact다.
- DB 반영 후 검증까지 끝났다면 같은 작업 안에서 삭제한다.
- 사용자가 보존을 명시하지 않았는데 재실행용 script만 남기고 끝내는 것은 실패다.
- DB 반영 실패로 artifact를 남겨야 한다면 최종 보고에 이유와 경로를 명확히 적고 registry status를 실제 DB 상태에 맞춘다.
- 운영 환경에는 artifact를 남기지 않는다.

## Final Report

최종 보고는 검증 중심으로 간결하게 작성한다. 사용자가 요청하지 않는 한 9개 언어의 전체 본문을 모두 붙여 넣지 않는다. 본문은 DB record에 있어야 한다.

최종 보고에는 아래를 포함한다.

- 선택한 topic, country/scope, city/region
- registry와 겹치지 않는 이유
- category
- translationGroupId
- language별 slug
- title set 요약
- source pack 요약과 checked date
- runtime clock과 작성일
- publishedAt
- date gate 결과
- readability gate 결과
- localization gate 결과
- semantic parity gate 결과
- automated quality gate 결과
- dev DB upsert 검증 결과
- prod 요청 시 prod DB upsert 검증 결과
- registry 최종 status
- 생성했다가 제거한 임시 artifact 목록
- 남은 리스크 또는 사용자 확인이 필요한 점

## Stop Conditions

아래 상황에서는 DB write를 하지 말고 중단 보고한다.

- official source로 핵심 사실을 검증할 수 없다.
- topic이 registry와 겹친다.
- 오늘 날짜와 publishedAt 기준을 맞출 수 없다.
- 9개 언어 중 하나라도 완전한 정보량으로 현지화할 수 없다.
- fact parity map을 통과하지 못했다.
- dev DB 검증이 실패했다.
- 운영 반영 요청이 있는데 prod DB-only 복제 범위를 `translationGroupId` 하나로 제한할 수 없다.

## Short Version

- 공식 자료를 오늘 확인한다.
- registry에 없는 여행 정보 guide 1개만 고른다.
- 독자가 읽기 좋은 source-backed web guide를 쓴다.
- 9개 언어 전체를 완전한 정보량으로 현지화한다.
- dev DB에 쓰고 9개 record를 검증한다.
- 운영까지 요청받으면 같은 `translationGroupId` 하나만 prod DB에 파일 없이 복제하고 검증한다.
- registry를 실제 DB 상태로 갱신한다.
- 임시 artifact를 남기지 않는다.
