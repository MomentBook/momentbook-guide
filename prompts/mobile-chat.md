# Mobile Chat Requests

Use these short requests from the mobile app. Each request starts a normal chat;
there is no recurring automation behind it.

## Full Guide Run

```text
/Users/hansol/workspace/momentbook-guide 에서 Momentbook guide 작업을 진행해줘.

목표:
- registry와 겹치지 않는 새 여행 가이드 1개를 고른다.
- registry 중복 기준은 국가가 아니라 content coverage signature다. 같은 국가/지역이어도 특정 장소, 행사/페스티벌 종류, 이동 route, ticket/pass/permit/rule, traveller intent가 기존 row와 다르면 진행할 수 있다.
- 새 주제 선택 전에 registry의 Country / Scope는 메타데이터로 보고, City / Region, Information Angle, Category, Slug를 함께 읽어 실제 콘텐츠가 겹치는지 판단한다.
- 공식 자료로 핵심 사실을 검증한다.
- 영어 master 작성 전에 reader-decision brief와 fact parity map을 만든다.
- 영어 master를 먼저 읽기 좋은 article로 완성한 뒤 ko, en, ja, zh, es, pt, fr, th, vi 9개 언어를 모두 full localization으로 완성한다.
- 각 언어는 번역 직후 별도의 native-prose pass를 수행한다. 제목, H1, intro 2문단, H2 흐름, bullet, image alt/caption, Sources label을 현지어로 자연스럽게 다듬고 얇은 요약이나 직역투를 남기지 않는다.
- 품질/계약 gate를 통과한 뒤 production admin articles API에 게시한다.
- 게시된 translationGroupId를 다시 export해서 검증한다.
- 자동 gate 통과는 최저 기준으로 본다. production 게시 전과 export 후에 readability, 제목/문단 흐름, 현지화 품질을 다시 읽고 필요한 경우 title/body만 patch한다.
- 검증된 registry 변경을 commit/push까지 진행한다.

반드시 먼저 읽을 파일:
- AGENTS.md
- prompts/mobile-chat.md
- prompts/guide-publisher.md
- playbooks/authoring-guide.md
- automation/shared/article-writing-standard.md
- automation/shared/admin-articles-api.md
- automation/shared/content-repair-workflow.md
- registry/editorial-guide-registry.md

결과 보고에는 topic, registry-safe reason, reader-decision brief, 공식 source pack, sourceCheckedDate, translationGroupId, 9개 언어 coverage, pre/post-publish manual quality review, gate 결과, production API 검증, registry 변경, commit/push 결과, 남은 risk를 포함해줘.
```

## Publish Only

```text
/Users/hansol/workspace/momentbook-guide 에서 새 Momentbook guide 1개를 production에 게시해줘.
AGENTS.md와 prompts/guide-publisher.md를 따른다. 게시 후 registry를 갱신하되 commit/push는 하지 말고 최종 diff와 검증 결과만 보고해줘.
```

## Review Only

```text
/Users/hansol/workspace/momentbook-guide 에서 최근 게시된 guide 1개를 production admin API export 기준으로 검토해줘.
metadata는 보존하고, 개선이 확실한 경우 title/body만 patch한다. patch 전후 gate 결과와 translationGroupId를 보고해줘.
```

## Git Only

```text
/Users/hansol/workspace/momentbook-guide 의 현재 변경 중 검증된 durable state만 확인해서 commit/push해줘.
article content나 production API는 건드리지 말고, diff 검토 후 registry 또는 명시된 상태 파일만 stage해줘.
```

## Topic-Specific Run

```text
/Users/hansol/workspace/momentbook-guide 에서 [주제/국가/도시] guide를 작성해줘.
먼저 registry 중복 여부와 공식 source quality를 확인하고 진행해줘. 중복 판단은 국가가 아니라 content coverage signature 기준으로 한다. 같은 국가/도시라도 특정 장소, festival/event type, route, ticket/pass/permit/rule, traveller intent가 다르면 후보로 유지하고, 실제 콘텐츠가 겹치거나 공식 source가 약하면 대체 주제를 제안해줘.
```
