# Editorial Article Authoring Guide

이 문서는 `momentbook-api`의 editorial article을 작성, 번역, 검수, 운영할 때 따를 기준을 정리한다.
이 저장소의 editorial article은 일반 CMS가 아니라, 공개 웹 `/{lang}/guides`에 노출되는 published-only 콘텐츠를 안정적으로 운영하기 위한 최소 계약을 따른다.

## 0. Planning Documents

새 guide topic을 고르기 전에 아래 문서를 먼저 확인한다.

- `registry/editorial-guide-registry.md`: 이미 작성되었거나 queue에 올라간 국가, 도시, 정보 축을 한 번에 확인하는 canonical registry
- `prompts/guide-publisher.md`: "레지스트리에 없는 새 guide 1개를 작성하고 registry까지 갱신하라"는 재사용용 실행 프롬프트

운영 규칙:
- registry에 있는 `queued` 항목도 이미 잡힌 주제로 간주한다.
- 같은 국가를 다시 쓰지 않는 것을 기본값으로 삼는다.
- 같은 국가를 반드시 다시 써야 한다면, 기존 글과 다른 geography와 다른 search intent를 가져야 하며 registry에 이유를 남긴다.
- 새 guide를 draft, generate, queue, publish한 직후에는 registry를 즉시 갱신한다.
- 새 guide 작업의 기본 완료 기준은 "generated payload 생성"이 아니라 "현재 작업 중인 실행 환경의 DB upsert 완료"다.
- write / seed / import script와 generated JSON은 기본적으로 임시 artifact로 취급하고, DB 반영과 검증이 끝난 뒤에는 제거한다.
- registry status는 임시 파일 존재 여부가 아니라 실제 DB 반영 상태를 기준으로 쓴다.
- 모든 새 guide는 지원 언어 전체인 `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi` 로 완성한다.
- 번역은 외부 번역 API나 OpenAI API를 쓰지 않고 직접 작성한다.
- 예약 자동화는 `automation/parallel-agent-workflow.md`를 사용해 source, master, localization, QA, publish 역할을 분리한다.

## 0.1 Hard Quality Gates

아래 항목 중 하나라도 실패하면 DB insert/upsert를 하지 않는다. 이미 payload나 script를 만들었더라도 발행을 멈추고 원인을 수정한다.

- `publishedAt`은 실제 DB write 시각을 기준으로 한 공개 발행 시각이다. published-only article에서 미래 `publishedAt`은 금지한다.
- `publishedAt`을 batch 분산, slug 패턴, 행사일, 여행 대상 날짜, 공식 source 날짜처럼 쓰지 않는다.
- slug에 `YYYY-MM-DD`를 넣는다면 그 날짜는 실제 local publication date와 같아야 한다.
- `sourceCheckedDate`는 공식 source를 실제로 확인한 local date이며 미래일 수 없다.
- editorial article의 `title`, `body`, image alt/caption, source label은 ASCII-only 작성 원칙의 예외다. 각 언어의 자연스러운 문자 체계와 diacritic을 보존한다.
- 구조와 길이만 맞춘 번역은 실패다. DB write 전 `fact parity map`으로 9개 언어의 hard fact, warning, exception, source label, image alt/caption을 모두 대조한다.
- 언어별 품질을 확신할 수 없으면 publish하지 않는다. 검토 필요 상태로 멈추는 것이 잘못된 다국어 본문을 공개하는 것보다 낫다.
- `es`, `pt`, `fr`, `vi`에서 diacritic과 tone mark가 빠진 ASCII-only transliteration은 실패다.
- DB write 전 `node tools/quality/article-quality-gate.js <payload>` 형태의 자동 품질 gate를 통과해야 한다.

근거로 삼는 공식 기준:
- Google Search Central은 페이지 날짜를 페이지 자체의 발행/수정일로 쓰고, 미래 이벤트 날짜나 페이지 주제의 날짜를 발행일처럼 쓰지 말라고 안내한다.
- Google Search Central은 helpful content 평가에서 철자, 문체, 사실 오류, 급하게 만든 흔적을 품질 문제로 본다.
- Google Search Central은 다국어 페이지의 main content가 실제로 번역되어야 하며, 제목과 본문의 언어/문자 체계가 맞아야 한다고 설명한다.
- W3C Internationalization은 콘텐츠가 언어, 문자 체계, 문화권 차이를 고려해야 한다고 본다.
- W3C WAI와 GOV.UK content design 기준은 명확한 heading, 짧은 문장, 사용자가 필요한 정보를 먼저 제시하는 구조를 요구한다.

## 1. Article Schema 요약

editorial article은 기본적으로 아래 필드로 구성된다.

| 필드 | 의미 | 작성 규칙 |
| --- | --- | --- |
| `translationGroupId` | 같은 주제의 다국어 문서를 묶는 그룹 ID | 동일한 콘텐츠 세트의 번역본은 같은 값을 사용한다. 새 그룹을 시작할 때만 새 ID를 만든다. |
| `language` | 문서 언어 | `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi` 중 하나만 사용한다. |
| `slug` | 언어별 고유 URL 식별자 | 같은 `language` 안에서 유일해야 한다. 제목 기반으로 만들되, 시의성 있는 글은 연도 또는 날짜를 포함할 수 있다. |
| `category` | 기사 분류 | `festival`, `travel-guide`, `destination-guide`, `wellbeing-guide` 중 하나만 사용한다. |
| `title` | 공개 제목 | 해당 언어의 자연스러운 제목으로 작성한다. 과장보다 명확성을 우선한다. |
| `body` | 본문 markdown | 실제 기사 내용의 단일 원본이다. summary, cover, reading time은 여기서 파생된다. |
| `publishedAt` | 공개 기준 시각 | DB에 쓰는 실제 발행 시점을 나타낸다. published-only article에서는 미래 시각을 쓰지 않는다. 같은 translation group은 같은 값을 쓰며, batch 분산이 필요하면 현재 날짜 안에서 분 단위만 조정한다. |

추가 운영 원칙:
- article은 `published-only`로 다룬다.
- public/web summary와 cover image는 `body`를 기준으로 자동 파생된다.
- `body`를 고치면 summary와 cover도 함께 달라질 수 있으므로, 본문이 곧 공개 결과의 기준 데이터다.
- 같은 `translationGroupId` 안에서는 사실관계, 구조, 핵심 메시지가 일치해야 한다.

## 2. Markdown Body 작성 규칙

`body`는 일반 텍스트가 아니라 공개 페이지로 바로 렌더링되는 markdown 원문이다.
따라서 읽기 쉬움, 사실성, 파생 가능성을 동시에 만족해야 한다.

작성 규칙:
- H1 제목은 1개만 두고, 본문 전체의 주제를 명확하게 드러낸다.
- 도입부는 2~4문장 안에서 핵심 효용과 지금 읽어야 할 이유를 먼저 전달한다.
- 섹션은 H2/H3 중심으로 나누고, 문단은 짧게 유지한다.
- 일정, 준비물, 동선, 팁처럼 실행 항목이 있는 내용은 목록으로 정리한다.
- 숫자, 날짜, 장소명, 가격, 운영시간, 규정처럼 바뀌기 쉬운 사실은 근거 확인 후만 쓴다.
- 추측성 표현, 과장된 문구, 원인 미상의 단정은 쓰지 않는다.
- 표가 꼭 필요하지 않다면 우선 markdown heading과 list로 해결한다.
- HTML 삽입, 스크립트성 내용, 불필요한 장식 문구는 피한다.
- 한 문서 안에서 문체와 용어를 일관되게 유지한다.
- 가능한 경우 글 말미에 `## Sources` 또는 해당 언어의 동등한 제목을 두고, 참고 링크를 markdown list로 정리한다.

권장 구조:
- `# 제목`
- 도입부 2개 문단
- `## What to know first` 또는 해당 언어의 동등 섹션 + 핵심 bullet
- 대표 이미지 1개 + 짧은 출처 캡션
- `##` 상세 섹션 4~6개
- 현실적인 한계 또는 주의 섹션 1개
- `## Sources` 링크 목록

검색 친화성을 고려하되, 키워드를 억지로 반복하지 않는다.
검색에 중요한 것은 키워드 밀도보다 주제 일치성과 검증된 정보의 밀도다.

## 3. 이미지 및 Alt Text 규칙

이미지는 본문 안에 markdown 이미지 문법으로만 넣는다.

형식:
- `![설명](https://example.com/image.jpg)`

규칙:
- 이미지 URL은 반드시 절대 `http` 또는 `https` URL이어야 한다.
- 상대 경로, data URL, base64 inline 이미지는 사용하지 않는다.
- alt text는 반드시 비어 있으면 안 된다.
- alt text는 이미지가 무엇을 보여주는지 구체적으로 설명해야 한다.
- `image`, `photo`, `picture` 같은 빈약한 표현만 쓰지 않는다.
- 첫 번째 이미지가 가능하면 cover image가 되도록 구성한다.
- 이미지가 본문 정보와 무관하면 넣지 않는다.
- 이미지 다음 줄에 짧은 출처 캡션을 두는 것을 권장한다.

좋은 alt text 예:
- `벚꽃철 교토의 전통 거리와 보행자`
- `방콕 송끄란 행사장에서 물놀이를 즐기는 방문객`
- `공항 자동출입국 심사 게이트 앞을 지나는 여행객`

나쁜 alt text 예:
- `image`
- `photo`
- `img1`
- `picture of things`

## 4. Source-Backed Authoring 규칙

editorial article은 "그럴듯한 글"이 아니라 "출처로 뒷받침되는 글"이어야 한다.
추정으로 채운 문장은 금지하고, 확인 가능한 사실만 공개 본문에 넣는다.

출처 우선순위:
1. 공식 출처
   - 정부, 관광청, 박물관, 행사 주최 측, 항공/철도/공공 교통 기관, 공식 관광 사이트
2. 연구 자료
   - 학술 논문, 대학/연구기관 보고서, 체계적 문헌고찰, 공공 보건 가이드
3. 백과/레퍼런스 자료
   - UNESCO, Britannica, 국가 문화유산 문서, 공신력 있는 reference page
4. 보조 기사
   - 신뢰도 높은 언론 기사, 전문 여행 매체, 현지 운영 가이드

작성 원칙:
- 핵심 사실은 가능하면 2개 이상의 서로 다른 출처로 교차 확인한다.
- 일정, 운영시간, 가격, 접근성, 지역 규정, 안전 정보는 특히 엄격하게 검증한다.
- 출처가 불명확하면 본문에 넣지 않는다.
- 확인되지 않은 수치, 통계, "최고", "가장 유명한" 같은 표현은 쓰지 않는다.
- 문화, 종교, 행사, 관습 설명은 단정하지 말고 맥락을 붙여 작성한다.
- 연구 결과는 과장하지 말고, 적용 범위와 한계를 함께 설명한다.
- 법률 또는 입국 규정은 국가와 국적에 따라 달라질 수 있음을 명시하고, 최종 확인은 공식 사이트로 유도한다.
- 건강 가이드는 치료 지시처럼 쓰지 말고, 공식 가이드와 연구에서 지지되는 범위만 정리한다.

실무 기준:
- 공식 출처 1개만으로 충분하지 않은 주제는 보조 출처를 추가한다.
- 여행/행사 글은 계절성과 변동성이 높으므로 발행 직전 재확인이 필요하다.
- 기사 끝에 source list를 남기고, source pack은 별도 문서나 작업 노트에도 보존한다.

## 5. Translation Rules

editorial article은 영문 1개만 쓰고 끝내는 작업이 아니다.
지원 언어 전체를 직접 번역해 같은 translation group 안에 묶어야 한다.

번역 규칙:
- 지원 언어는 항상 `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi` 9개를 모두 포함한다.
- 새 topic을 추가할 때는 9개 언어 record를 한 번에 작성한다.
- 번역은 사람이 직접 쓴 문장처럼 자연스럽게 작성한다.
- 외부 번역 API, OpenAI API, 기계 번역 배치 호출은 사용하지 않는다.
- 언어별 title, intro, bullet, section heading, source heading은 각 언어에서 자연스럽게 다듬되 사실관계와 구조는 유지한다.
- 날짜, 수치, 규정, 운영시간, 금지사항은 모든 언어에서 동일해야 한다.
- 특정 언어만 더 과장하거나, 다른 언어에서 빠진 경고 문구가 생기지 않게 한다.
- 이미지 alt text와 caption도 각 언어 문맥에 맞게 자연스럽게 번역한다.
- article body는 ASCII-only 작성 원칙의 예외다. 자연스러운 번역을 위해 필요한 문자와 diacritic을 그대로 사용한다.
- `ko`는 자연스러운 한국어와 한글을 사용한다.
- `ja`는 일본어 문장부호, kana, kanji를 사용하고 영어 heading을 남기지 않는다.
- `zh`는 한 translation group 안에서 선택한 Chinese variant를 일관되게 유지한다.
- `es`, `pt`, `fr`, `vi`는 일반적인 철자와 diacritic을 사용한다.
- `th`는 Thai script를 사용한다. 로마자 음역만 있는 본문은 실패다.
- `vi`는 제목과 본문 전체에 Vietnamese tone mark를 유지한다. `Huong dan`, `gia ve`, `gio mo cua`, `khong`, `chuyen tuyen`처럼 악센트가 빠진 ASCII 문장이 반복되면 실패다.
- `es`, `pt`, `fr`는 정상 철자의 accent/diacritic을 유지한다. `Guia`, `publica`, `nao`, `regles`, `a La Paz`처럼 diacritic이 빠진 문장이 반복되면 실패다.
- 고유명사, 공식 ticket/pass name, URL처럼 원문 보존이 필요한 경우를 제외하고 비영어 본문에 영어 heading, placeholder, source label을 남기지 않는다.
- master freeze 후 `fact parity map`을 만들고, 각 언어가 수치, 날짜, 가격, 시간, 예외, 금지사항, route, source meaning을 모두 보존했는지 확인한다.

## 5.1 Automated Quality Gate

예약 실행과 DB 반영 작업은 payload를 만들고 아래 gate를 통과해야 한다.

```sh
node tools/quality/article-quality-gate.js <payload-json>
```

이 gate는 아래 실패를 차단한다.

- 9개 언어 누락
- 미래 `publishedAt`
- H1/H2/source/image 구조 누락
- 본문 정보량 부족
- Thai/Hangul/Japanese/Chinese script 누락
- Spanish/Portuguese/French/Vietnamese diacritic 누락
- 영어 heading placeholder 잔존

자동 gate는 최종 품질 판단을 대체하지 않는다. 다만 gate가 실패하면 DB write를 하지 않는다.

## 6. `slug` / `publishedAt` / `category` 운영 규칙

### `slug`
- 제목을 바탕으로 짧고 안정적으로 만든다.
- 같은 언어에서 중복되면 안 된다.
- 너무 길거나 해시처럼 보이는 값은 피한다.
- 시의성이 강한 주제는 연도 또는 게시일을 포함해도 된다.
- 기존 dataset과 맞추기 위해 `2026-topic-name-2026-04-10` 같은 패턴을 사용할 수 있다.
- 날짜를 포함하는 slug의 날짜는 실제 local publication date와 일치해야 한다.
- 미래 이벤트, 예약 시작일, source 문서 날짜를 slug의 게시일처럼 쓰지 않는다.
- 같은 translation group의 문서들은 가능하면 동일 slug를 공유한다.

### `publishedAt`
- DB에 record를 쓰는 실제 공개 시점을 나타내는 값으로 사용한다.
- published-only article에서는 미래 `publishedAt`을 쓰지 않는다.
- 같은 translation group의 다국어 문서는 일반적으로 같은 `publishedAt`을 사용한다.
- 여러 topic batch를 넣을 때도 calendar date를 미래로 보내지 않는다.
- 분산이 필요하면 현재 날짜 안에서 분 단위만 조정한다.
- topic이 미래 행사나 seasonal guide여도 `publishedAt`은 article 자체의 발행 시각이다.

### `category`
- `festival`: 축제, 시즌 이벤트, 퍼레이드, 행사 중심 글
- `travel-guide`: 이동, 입국, 준비, 체크리스트, 절차, 예산 같은 실전 가이드
- `destination-guide`: 도시/지역 자체를 소개하는 개요형 가이드
- `wellbeing-guide`: 회복, 수면, 리듬, 조용한 체류, 웰니스 중심 글

분류 원칙:
- 제목보다 본문 목적이 category 선택의 기준이다.
- 한 글에 여러 주제가 있어도 가장 강한 검색 의도를 기준으로 하나만 선택한다.

## 7. 검수 체크리스트

발행 전 아래 항목을 모두 확인한다.

- `language`가 지원 언어 9개 중 하나인가
- `translationGroupId`가 같은 주제 묶음과 일치하는가
- `slug`가 언어 내에서 유일하고 설명적인가
- `category`가 본문 의도와 맞는가
- `title`이 본문 내용과 정확히 일치하는가
- `body`가 markdown 구조를 깔끔하게 유지하는가
- 본문에 추정, 과장, 확인되지 않은 사실이 없는가
- 핵심 사실이 공식/연구/백과/보조 출처로 뒷받침되는가
- 이미지 URL이 모두 절대 경로 `http`/`https` 인가
- 모든 이미지에 의미 있는 alt text가 있는가
- 첫 이미지가 cover로 사용될 수 있는가
- summary와 cover가 본문에서 자연스럽게 파생되는가
- `publishedAt`이 실제 발행 시각이며 현재 검증 시각보다 미래가 아닌가
- slug 날짜와 source checked date가 실제 발행/확인 날짜와 맞고 미래가 아닌가
- 다국어 번역본 사이에 주제, 용어, 사실이 일관되는가
- 지원 언어 9개 record가 모두 존재하는가
- `fact parity map` 기준으로 9개 언어의 hard fact, warning, exception, source label, image alt/caption이 모두 대응되는가
- 각 언어의 문자 체계와 diacritic이 보존됐는가
- `es`, `pt`, `fr`, `vi`가 ASCII-only transliteration이 아닌가
- 비영어 본문에 영어 heading, placeholder, 로마자 음역으로 대체한 문장이 남아 있지 않은가
- 번역이 외부 번역 API나 OpenAI API 없이 직접 작성되었는가
- 현실적인 한계, 예외, 최종 확인이 필요한 항목이 빠지지 않았는가

최종 기준:
- 추정하지 않는다.
- 출처 없는 단정은 넣지 않는다.
- 본문이 곧 공개 계약이다.
- summary와 cover는 별도 꾸밈값이 아니라 body의 결과물이다.
