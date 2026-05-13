# 2026-04 Traffic Editorial Batch Plan

이 문서는 2026년 4월 중순 기준으로 개발 환경의 기존 guide dataset을 검토한 뒤, 중복을 피하면서도 검색 유입 가능성이 높은 새 guide topic 4개를 정리한 배치 계획이다.

검토 기준:
- 개발 DB export 기준 기존 slug 13개와 카테고리 구성을 확인했다.
- 이미 운영 중인 축제형 slug와 직접 겹치지 않는 주제를 우선했다.
- 2026-04-15 현재 공식 사이트에서 확인 가능한 사실만 본문에 사용할 수 있는 topic만 선택했다.
- 검색 의도는 "실행형 travel query" 또는 "행사 직전 planning query"에 맞췄다.

## Existing Coverage Snapshot

개발 환경에는 아래 slug가 이미 존재한다.

- `europe-entry-rules-2026-ees-etias-guide-2026-03-18`
- `kyoto-first-time-travel-guide-2026-03-31`
- `songkran-2026-bangkok-guide-2026-04-07`
- `jet-lag-recovery-guide-for-long-haul-trips-2026-04-12`
- `sapporo-snow-festival-2026-travel-guide-2026-01-09`
- `rio-carnival-2026-travel-guide-2026-01-16`
- `mardi-gras-new-orleans-2026-travel-guide-2026-01-27`
- `venice-carnival-2026-travel-guide-2026-02-06`
- `st-patricks-festival-dublin-2026-guide-2026-02-19`
- `gion-matsuri-kyoto-2026-guide-2026-03-06`
- `albuquerque-balloon-fiesta-2026-guide-2026-03-21`
- `oktoberfest-munich-2026-guide-2026-04-03`
- `day-of-the-dead-mexico-city-2026-guide-2026-04-11`

요약:
- `festival` 비중이 높다.
- `travel-guide`는 유럽 입국/EES-ETIAS 1건만 강하게 잡혀 있다.
- `destination-guide`는 교토 1건뿐이다.
- 4월 중순 이후 바로 검색될 실무형 입국 가이드와 5월 직전 행사형 콘텐츠가 비어 있다.

## Batch Summary

| Topic | Category | Slug | Translation Group | Published At (UTC) | Why it can pull traffic |
| --- | --- | --- | --- | --- | --- |
| UK ETA 2026 | `travel-guide` | `uk-eta-2026-guide-fee-validity-who-needs-it-2026-04-15` | `artgrp_U6kD1mP4xR9q` | `2026-04-15T06:18:00.000Z` | 2026-04-08 fee change가 이미 반영됐고, 입국 가능 여부/유효기간/비용/예외를 한 번에 찾는 검색 의도가 강하다. |
| Thailand TDAC 2026 | `travel-guide` | `thailand-digital-arrival-card-tdac-2026-guide-2026-04-17` | `artgrp_V8nQ2sL5dK3m` | `2026-04-17T07:12:00.000Z` | 태국 입국 직전 작성하는 high-intent query이며, 제출 시점·예외·수정 가능 범위를 헷갈리는 사용자가 많다. |
| Tokyo first-time guide | `destination-guide` | `tokyo-first-time-travel-guide-2026-04-20` | `artgrp_W4rM8tC2pN7x` | `2026-04-20T08:06:00.000Z` | 대도시 초행 search volume이 크고, 교토 guide와 자연스럽게 내부 연결이 가능하다. |
| Cannes 2026 visitor guide | `festival` | `cannes-film-festival-2026-travel-guide-2026-04-22` | `artgrp_X9cT3vL6qB1k` | `2026-04-22T09:24:00.000Z` | 5월 직전 급상승할 행사형 query이며, badge 여부와 public access 범위를 혼동하는 검색이 많다. |

## Topic 1. UK ETA in 2026

- Category: `travel-guide`
- Search intent:
  - uk eta 2026
  - who needs uk eta
  - uk eta price 2026
  - how long does uk eta last
- Angle:
  - 2026년 4월 수수료 인상 이후 기준으로, eligibility, validity, use case, exception을 한 문서에서 명확하게 정리한다.
  - "비자 대체"처럼 과장하지 않고, ETA가 허용하는 것과 허용하지 않는 것을 선명하게 분리한다.
- Source pack:
  - [GOV.UK - Check if you can get an electronic travel authorisation (ETA)](https://www.gov.uk/guidance/check-when-you-can-get-an-electronic-travel-authorisation-eta)
  - [GOV.UK - What you can and cannot do with an ETA](https://www.gov.uk/eta/what-you-can-cannot-do)
  - [GOV.UK - Apply for an ETA](https://www.gov.uk/eta/apply)
  - [GOV.UK - When you do not need an ETA](https://www.gov.uk/get-eta/when-not-need-eta)
- Must-use facts:
  - ETA는 영국뿐 아니라 Jersey, Guernsey, Isle of Man 방문에도 사용할 수 있다.
  - ETA는 보통 최대 6개월 방문용이며, nationality와 여행 목적에 따라 필요 여부가 갈린다.
  - 2026-04-08부터 신청 비용이 GBP 20으로 오른다.
  - ETA는 보통 하루 안에 결정되지만, 공식 안내는 최대 3영업일 여유를 두라고 한다.
  - ETA는 2년 또는 여권 만료 시점까지 유효하며, 유효기간 내 여러 번 입국할 수 있다.
  - ETA는 입국을 보장하지 않는다.
  - British/Irish citizen, UK visa 보유자, 영국 체류 권한 보유자 등은 ETA가 필요하지 않다.
- Avoid:
  - 모든 국적을 본문에서 장황하게 재열거하기
  - "ETA만 있으면 무조건 입국 가능" 같은 단정
  - 취업, 장기체류, 결혼 관련 허용 범위 오인

## Topic 2. Thailand Digital Arrival Card in 2026

- Category: `travel-guide`
- Search intent:
  - thailand digital arrival card 2026
  - tdac when to submit
  - thailand arrival card 72 hours
  - do children need tdac
- Angle:
  - 공항 직전 검색하는 사용자를 위한 "언제, 누가, 무엇을 준비해야 하는가" 문서로 쓴다.
  - transit exemption, one-time use, 수정 가능 범위를 확실히 분리한다.
- Source pack:
  - [Thailand Digital Arrival Card user guide](https://tdac.immigration.go.th/manual/en/)
  - [Thailand Digital Arrival Card FAQ](https://tdac.immigration.go.th/manual/en/faq.html)
  - [Thailand Digital Arrival Card official site](https://tdac.immigration.go.th)
  - [Tak Immigration official notice about TDAC and official site only](https://tak.immigration.go.th/tdac-%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%97%E0%B8%B5%E0%B9%88/)
- Must-use facts:
  - TDAC는 종이 입국카드를 대체하는 온라인 입국 신고서다.
  - 태국에 입국하는 모든 non-Thai national은 육로, 해로, 항공편 모두 TDAC 제출 대상이다.
  - 공식 FAQ는 도착일을 포함해 3일 이내, 최대 72시간 전부터 제출할 수 있다고 안내한다.
  - 제출 시 passport, travel, accommodation, health declaration, email 정보가 필요하다.
  - immigration을 통과하지 않는 transit 또는 technical landing은 TDAC 대상이 아니다.
  - TDAC는 1회 입국용이며, 입국 때마다 새로 제출해야 한다.
  - infant와 child도 TDAC가 필요하다.
  - group submission은 한 번에 최대 10명까지 가능하다.
  - identity core field를 잘못 입력했으면 update가 아니라 새 제출이 더 안전하다는 점을 공식 FAQ 기준으로 설명한다.
  - 공식 안내는 TDAC가 visa가 아니라고 명시한다.
- Avoid:
  - 비자 면제/visa-on-arrival 규정을 TDAC와 혼동
  - 공식 source pack에 없는 벌금, 심사 기준, 수수료 단정
  - 모든 공항 kiosk 운영 방식을 과도하게 일반화

## Topic 3. Tokyo First-Time Travel Guide 2026

- Category: `destination-guide`
- Search intent:
  - tokyo first time guide
  - where to stay in tokyo first trip
  - tokyo airport access haneda narita
  - tokyo etiquette on trains
- Angle:
  - "명소 나열" 대신 `area + airport access + transit-first planning + etiquette` 구조로 쓴다.
  - 숙소 추천 리스트 대신 어떤 유형의 여행자에게 어느 구역이 맞는지 설명한다.
- Source pack:
  - [GO TOKYO - Transportation in Tokyo](https://www.gotokyo.org/en/plan/getting-around/)
  - [GO TOKYO - Getting to Tokyo](https://www.gotokyo.org/en/plan/getting-to-tokyo/index.html)
  - [GO TOKYO - Tips for Tokyo sightseeing](https://www.gotokyo.org/en/plan/tips-for-tokyo-sightseeing/index.html)
  - [GO TOKYO - A guide to Shinjuku](https://www.gotokyo.org/en/destinations/western-tokyo/shinjuku/index.html)
  - [GO TOKYO - Explore Shibuya](https://www.gotokyo.org/en/story/walks-and-tours/shibuya/index.html)
  - [GO TOKYO - A guide to Asakusa](https://www.gotokyo.org/en/destinations/eastern-tokyo/asakusa/)
  - [GO TOKYO - Online Tourist Guide: Tokyo Navigation AI](https://www.gotokyo.org/en/plan/online-tourist-guide/index.html)
- Must-use facts:
  - GO TOKYO는 도쿄 대중교통망이 매우 촘촘하고 multilingual signage가 늘어 relatively stress-free라고 설명한다.
  - Central Tokyo는 상대적으로 compact하고, central stay라면 car rental이 꼭 필요하지 않다고 본다.
  - Haneda와 Narita 모두 도심 접근성이 좋지만, Haneda가 더 central하다.
  - Tokyo Metro와 Toei subway가 핵심 축이고, 버스는 immediate city center 밖에서 useful alternative가 될 수 있다.
  - GO TOKYO의 도시 구조는 central/eastern/western/southern/northern/Tama/islands처럼 area-based planning에 가깝다.
  - Shinjuku는 다수의 JR, private rail, subway가 모인 hub다.
  - Shibuya는 transfer가 많은 hub이므로 exit와 transfer time을 여유 있게 잡아야 한다.
  - Asakusa는 전통적 분위기와 공항 접근성을 동시에 설명하기 좋은 first-time zone이다.
  - 공식 etiquette guide는 대중교통에서 조용히 행동하고, 사진 촬영 시 주변 사람을 배려하며, 쓰레기를 직접 가져가는 문화를 강조한다.
- Avoid:
  - "best area" 단정
  - pass 가격, 호텔 랭킹, 맛집 순위 나열
  - 출처 없는 cherry blossom, crowd forecast, taxi fare 단정

## Topic 4. Cannes Film Festival 2026

- Category: `festival`
- Search intent:
  - cannes film festival 2026 dates
  - cannes 2026 tickets public access
  - 3 days in cannes 2026
  - cannes cinema de la plage 2026
- Angle:
  - "갈 수 있나?"보다 "무엇은 badge가 필요하고 무엇은 public도 가능한가"를 명확하게 설명한다.
  - red carpet fantasy보다는 realistic visitor plan으로 정리한다.
- Source pack:
  - [Festival de Cannes - Official Selection 2026 overview](https://www.festival-cannes.com/en/the-selection/)
  - [Festival de Cannes - The films of the Official Selection 2026](https://www.festival-cannes.com/en/press/press-releases/the-films-of-the-official-selection-2026/)
  - [Festival de Cannes - Organise your time](https://www.festival-cannes.com/en/take-part/your-festival-experience/organise-your-time/)
  - [Festival de Cannes - Admission to screenings](https://www.festival-cannes.com/en/take-part/your-festival-experience/admission-to-screenings/)
  - [Festival de Cannes - Accreditations](https://www.festival-cannes.com/en/take-part/accreditations/)
  - [Festival de Cannes - Park Chan-wook, President of the Jury of the 79th Festival de Cannes](https://www.festival-cannes.com/en/press/press-releases/park-chan-wook-president-of-the-jury-of-the-79th-festival-de-cannes/)
- Must-use facts:
  - 제79회 Cannes Film Festival은 2026-05-12부터 2026-05-23까지 열린다.
  - Official Selection 2026 작품 목록은 2026-04-09에 공개됐다.
  - Festival zone access는 기본적으로 badge를 가진 festival-goer에게 제한된다.
  - Cinéma de la Plage는 매일 21:30부터 open-air screening을 제공하며, 좌석 여건에 따라 public도 입장할 수 있다.
  - Ticket office access와 screening access는 accreditation category에 따라 다르다.
  - last-minute queue는 badge holder에게만 열리는 fallback option으로 설명해야 한다.
  - `3 Days in Cannes`는 18세에서 28세 cinephile 대상 프로그램이며 2026년에는 3개 세션으로 운영된다.
  - Cineum 이동에는 `My Cannes`에서 받는 QR code 기반 Festival Pass가 Palm Bus network에서 사용된다.
  - Park Chan-wook이 2026 Jury President라는 점은 한국어권 검색자에게 강한 관심 요소가 될 수 있다.
- Avoid:
  - public visitor가 main red carpet나 official screening을 자유롭게 볼 수 있다는 식의 서술
  - 무자격자도 티켓만 사면 들어갈 수 있다는 오해
  - dress code, seating, queue 결과를 과장해서 보장하는 표현

## Operational Notes

- 이 배치는 `travel-guide` 2건, `destination-guide` 1건, `festival` 1건으로 구성한다.
- `festival` 과잉을 피하면서도 5월 직전 spike topic 하나는 유지한다.
- 각 topic은 기존 배치와 동일하게 9개 지원 언어로 확장 가능하도록 설계한다.
- 영문 master 생성 후 다국어 번역을 돌리고, seed는 dev DB에 먼저 반영한다.
- 운영 전 final pass에서는 제목/slug 중복, Sources section 누락, embedded image URL, alt text, time-sensitive fact를 다시 확인한다.
