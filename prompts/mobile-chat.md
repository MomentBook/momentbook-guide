# Mobile Chat Requests

Use these short requests from the mobile app. Each request starts a normal chat;
there is no recurring automation behind it.

## Full Guide Run

```text
/Users/hansol/workspace/momentbook-guide 에서 Momentbook guide 작업을 진행해줘.

목표:
- registry와 겹치지 않는 새 여행 가이드 1개를 고른다.
- 공식 자료로 핵심 사실을 검증한다.
- 영어 master를 작성하고 ko, en, ja, zh, es, pt, fr, th, vi 9개 언어를 모두 자연스럽게 완성한다.
- 품질/계약 gate를 통과한 뒤 production admin articles API에 게시한다.
- 게시된 translationGroupId를 다시 export해서 검증한다.
- readability, 제목/문단 흐름, 현지화 품질을 검토하고 필요한 경우 title/body만 patch한다.
- 검증된 registry 변경을 commit/push까지 진행한다.

반드시 먼저 읽을 파일:
- AGENTS.md
- prompts/guide-publisher.md
- playbooks/authoring-guide.md
- automation/shared/article-writing-standard.md
- automation/shared/admin-articles-api.md
- automation/shared/content-repair-workflow.md
- registry/editorial-guide-registry.md

결과 보고에는 topic, 공식 source pack, sourceCheckedDate, translationGroupId, 9개 언어 coverage, gate 결과, production API 검증, registry 변경, commit/push 결과, 남은 risk를 포함해줘.
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
먼저 registry 중복 여부와 공식 source quality를 확인하고, 겹치거나 공식 source가 약하면 대체 주제를 제안한 뒤 진행해줘.
```
