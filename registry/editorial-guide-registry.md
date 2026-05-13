# Editorial Guide Registry

이 문서는 중복된 국가 guide와 중복된 정보 angle guide를 막기 위한 단일 관리 문서다.
새 guide를 고르기 전에 반드시 이 문서를 먼저 읽고, 새 글을 draft하거나 queue에 올린 직후 즉시 이 문서를 갱신한다.

기준 시점:
- 마지막 검토일: `2026-05-12`

검토에 사용한 데이터:
- local prod export: `editorial-guides-2026-04.prod-db-export.json`
- local dev export: `guide-sync-dev-export-2026-04-14.json`
- local generated queue:
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-04-traffic.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-04-global.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-austria-schonbrunn.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-hong-kong.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-malta.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-iceland.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-canada-moraine-lake.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-switzerland-jungfraujoch.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-peru-machu-picchu.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-south-africa-table-mountain.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-netherlands-schiphol.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-finland-suomenlinna.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-croatia-plitvice.json`
  - `staging/momentbook-api/scripts/generated/editorial-guides-2026-05-czechia-prague-airport.json`
- remote confirmation:
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 에 `austria|vienna|schonbrunn|schönbrunn` queue 파일 없음 확인
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 에 `south-africa|table-mountain|cape-town` queue 파일 없음 확인
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 에 `schiphol|netherlands|amsterdam-airport` queue 파일 없음 확인
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 에 `finland|suomenlinna|helsinki` queue 파일 없음 확인
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 에 `croatia|plitvice|plitvicka|jezera` queue 파일 없음 확인
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 에 `czech|czechia|prague|vaclav` queue 파일 없음 확인
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 에 `oman|muscat|sultan-qaboos|grand-mosque` queue 파일 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 에 `saudi|alula|al-ula|hegra|madain` queue 파일 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `sri-lanka|sigiriya|lion-rock|ccf` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `qatar|doha|museum-of-islamic-art|mia-park` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `philippines|manila|intramuros|fort-santiago` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `argentina|iguazu|puerto-iguazu|garganta-del-diablo` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `japan|miyajima|itsukushima|miyajimaguchi` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `japan|himeji|koko-en|kokoen` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `japan|nara|todaiji|daibutsuden` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `japan|matsumoto|nagano|matsumoto-castle` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `egypt|giza|grand-egyptian|gem` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 dev DB에 `cambodia|angkor|siem|wat` 기존 9개 언어 record 확인 후 registry backfill
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `denmark|kronborg|helsingor|helsingør|copenhagen-card` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `rwanda|gorilla|volcanoes|kinigi` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `kenya|madaraka|sgr|mombasa|nairobi` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `panama|miraflores|canal` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `costa-rica|manuel-antonio|sinac|quepos` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `colombia|bogota|bogotá|monserrate` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `bulgaria|rila-monastery|rilskimanastir` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `vietnam|hue|imperial-city|ngo-mon|dai-noi` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `china|beijing|palace-museum|forbidden-city|wumen` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `uzbekistan|samarkand|registan|registon` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `slovakia|bratislava|devin|devín|devinsky` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `cyprus|paphos|pafos|nea-pafos|kato-pafos` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `albania|butrint|saranda|ksamil` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `armenia|yerevan|matenadaran|mashtots` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `vatican|vaticani|sistine|sixtine|sixtina|museos-vaticanos` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `san-marino|sammarinese|borgo-maggiore|funivia` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `liechtenstein|vaduz|liemobil|malbun|adventure-pass` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `monaco|monte-carlo|oceanographic|monapass|public-lifts` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `namibia|etosha|okaukuejo|andersson|anderson` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `mauritius|pamplemousses|ramgoolam|botanic` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `bolivia|la-paz|el-alto|mi-teleferico|mi-teleférico` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `andorra|andorra-la-vella|sant-julia|pas-de-la-casa|bus-ad` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `macao|macau|lrt|hengqin|taipa-ferry` 중복 slug/title 없음 확인 후 dev DB upsert 완료
  - `ssh momentbook-dev` 기준 `/home/ubuntu/app/momentbook-api/scripts/generated` 와 dev DB에 `ghana|cape-coast|gmmb|door-of-no-return` 중복 slug/title 없음 확인 후 dev DB upsert 완료

## Selection Guard

- 이 문서에 있는 모든 row는 이미 사용 중인 주제로 간주한다.
- `queued` status도 이미 선점된 주제다. 아직 import되지 않았더라도 새 글 후보에서 제외한다.
- 기본 규칙은 "아직 이 문서에 없는 국가 또는 scope"를 고르는 것이다.
- 같은 국가를 다시 쓰지 않는 것을 기본값으로 둔다. 이미 반복이 많은 국가부터 먼저 피한다.
- 국가가 달라도 정보 angle이 겹치면 피한다.
  - 예: 같은 유형의 `first-time city guide`
  - 예: 같은 유형의 `entry authorization / arrival card / ETA` guide
  - 예: 같은 유형의 대표 annual festival guide
- 같은 국가를 다시 써야 한다면 아래 3가지를 모두 만족해야 한다.
  - 사용자가 그 국가를 명시적으로 요청했거나, 공식 source quality가 다른 미사용 국가보다 분명히 좋다.
  - 기존 row와 geography 또는 traveller intent가 실질적으로 다르다.
  - 이 문서의 신규 row 옆이나 아래에 reuse reason을 짧게 남긴다.

## Research And Image Rules

- 새 글의 핵심 사실은 공식 정부, 관광청, 공항, 철도, 행사 주최 측, 공공기관 source를 우선 사용한다.
- 날짜, 가격, 규정, 입국 조건, 운영시간처럼 변동 가능한 사실은 작성 당일 다시 확인한다.
- 새 글은 지원 언어 `ko`, `en`, `ja`, `zh`, `es`, `pt`, `fr`, `th`, `vi` 전체를 한 번에 완성한다.
- 번역은 직접 작성하고, OpenAI API나 외부 번역 API는 사용하지 않는다.
- 첫 이미지는 글의 핵심 angle과 직접 맞아야 한다.
- 이미지 우선순위는 다음과 같다.
  - 공식 press, media, tourism image
  - 공식 사이트에서 안정적으로 hotlink 가능한 대표 이미지
  - 위가 어려우면 사실성이 높은 Wikimedia Commons 이미지
- 이미지 caption에는 출처를 짧게 남긴다.
- generic stock image, 무관한 skyline, source 불명 이미지, alt text 없는 이미지는 사용하지 않는다.

## Coverage Snapshot

- reserved topics total: `122`
- status counts:
  - `prod+dev`: `111`
  - `dev`: `10`
  - `queued`: `1`
- category counts:
  - `festival`: `12`
  - `destination-guide`: `10`
  - `travel-guide`: `97`
  - `wellbeing-guide`: `3`
- already used countries or scopes: `107`
  - Albania, Andorra, Argentina, Armenia, Australia, Austria, Azerbaijan, Bahrain, Barbados, Belgium, Belize, Bermuda, Bolivia, Bosnia and Herzegovina, Brazil, Brunei, Bulgaria, Cambodia, Canada, Chile, China, Colombia, Costa Rica, Croatia, Cyprus, Czechia, Denmark, Ecuador, Egypt, Estonia, Europe (multi-country), Fiji, Finland, France, Georgia, Germany, Ghana, Global / multi-country, Greece, Guatemala, Hong Kong, Hungary, Iceland, India, Indonesia, Ireland, Italy, Jamaica, Japan, Jordan, Kazakhstan, Kenya, Latvia, Liechtenstein, Lithuania, Luxembourg, Macao SAR, Malaysia, Malta, Mauritius, Mexico, Monaco, Mongolia, Montenegro, Morocco, Namibia, Nepal, New Zealand, Netherlands, North Macedonia, Norway, Oman, Panama, Paraguay, Peru, Philippines, Poland, Portugal, Qatar, Romania, Rwanda, San Marino, Saudi Arabia, Senegal, Serbia, Seychelles, Singapore, Slovakia, Slovenia, South Africa, South Korea, Spain, Sri Lanka, Sweden, Switzerland, Taiwan, Tanzania, Thailand, Tunisia, Turkey, United Arab Emirates, United Kingdom, United States, Uruguay, Uzbekistan, Vatican City, Vietnam
- repeated countries already visible:
  - Japan: Kyoto first-time, Gion Matsuri Kyoto, Sapporo Snow Festival, Tokyo first-time queued, Miyajima ferry/visitor tax, Himeji Castle ticket/hours, Nara Tōdai-ji/deer safety, Matsumoto Castle ticket/stairs/shoes
  - United States: Albuquerque Balloon Fiesta, Mardi Gras New Orleans
  - Thailand: Songkran Bangkok, TDAC queued
  - Germany: Oktoberfest Munich, Berlin first-time queued

운영 해석:
- 현재 dataset은 `festival` 과 `first-time city guide` 비중이 높다.
- 따라서 다음 글은 가능하면 미사용 국가를 우선하고, 같은 country family 또는 같은 angle family를 반복하지 않는 편이 좋다.

## Registry

### `prod+dev`

| Status | Country / Scope | City / Region | Information Angle | Category | Slug |
| --- | --- | --- | --- | --- | --- |
| `prod+dev` | Europe (multi-country) | EU external border | EES / ETIAS entry rules | `travel-guide` | `europe-entry-rules-2026-ees-etias-guide-2026-03-18` |
| `prod+dev` | Global / multi-country | Long-haul travel | Jet lag recovery | `wellbeing-guide` | `jet-lag-recovery-guide-for-long-haul-trips-2026-04-12` |
| `prod+dev` | Japan | Kyoto | First-time city guide | `destination-guide` | `kyoto-first-time-travel-guide-2026-03-31` |
| `prod+dev` | Thailand | Bangkok | Songkran festival guide | `festival` | `songkran-2026-bangkok-guide-2026-04-07` |
| `prod+dev` | South Africa | Cape Town, Western Cape | Table Mountain Cableway ticket, weather, and access guide | `travel-guide` | `table-mountain-cableway-ticket-weather-guide-2026-05-07` |
| `prod+dev` | Netherlands | Amsterdam Airport Schiphol, North Holland | Layover luggage storage and Amsterdam train guide | `travel-guide` | `schiphol-layover-luggage-storage-train-guide-2026-05-08` |
| `prod+dev` | Finland | Helsinki / Suomenlinna | Suomenlinna ferry ticket and Blue Route day-trip guide | `travel-guide` | `suomenlinna-ferry-blue-route-day-trip-guide-2026-05-09` |
| `prod+dev` | Austria | Vienna | Schönbrunn Palace ticket and free grounds guide | `travel-guide` | `schonbrunn-palace-ticket-free-grounds-guide-2026-05-10` |
| `prod+dev` | Croatia | Plitvice Lakes National Park, Lika-Senj / Karlovac | Ticket, entrance, shuttle, and boat route guide | `travel-guide` | `plitvice-lakes-ticket-entrance-route-guide-2026-05-11` |
| `prod+dev` | Czechia | Prague / Václav Havel Airport Prague | Airport to city transport guide | `travel-guide` | `prague-airport-city-transport-guide-2026-05-12` |
| `prod+dev` | Greece | Athens | Acropolis Museum separate ticket, Friday late hours, and bag rules guide | `travel-guide` | `acropolis-museum-friday-night-ticket-guide-2026-05-14` |
| `prod+dev` | Slovenia | Postojna | Postojna Cave reserved time, cave train, temperature, and combo ticket guide | `travel-guide` | `postojna-cave-train-temperature-combo-ticket-guide-2026-05-15` |
| `prod+dev` | Romania | Bucharest | Palace of Parliament physical ID, phone reservation, and ticket desk guide | `travel-guide` | `bucharest-palace-of-parliament-id-reservation-guide-2026-05-16` |
| `prod+dev` | India | Agra, Uttar Pradesh | Taj Mahal Friday closure, main mausoleum ticket, and East vs West gate guide | `travel-guide` | `taj-mahal-friday-closure-mausoleum-ticket-guide-2026-05-17` |
| `prod+dev` | Luxembourg | Nationwide network / Luxembourg City Airport | Free public transport, first-class exceptions, and airport-border guide | `travel-guide` | `luxembourg-free-public-transport-airport-border-guide-2026-05-20` |
| `prod+dev` | Belgium | Brussels / Atomium | Atomium ticket, lockers, and queue guide | `travel-guide` | `brussels-atomium-ticket-locker-queue-guide-2026-05-21` |
| `prod+dev` | Jordan | Petra / Wadi Musa | Jordan Pass vs gate ticket, consecutive-day use, and Petra by Night guide | `travel-guide` | `petra-jordan-pass-gate-ticket-petra-by-night-guide-2026-05-22` |
| `prod+dev` | Estonia | Virtsu-Kuivastu / Saaremaa route | Ferry e-ticket, 48-hour validity, and number plate guide | `travel-guide` | `saaremaa-ferry-e-ticket-48-hour-number-plate-guide-2026-05-23` |
| `prod+dev` | Indonesia | Borobudur, Magelang, Central Java | Ground vs Structure ticket, Upanat, and sunrise-sunset guide | `travel-guide` | `borobudur-ground-vs-structure-upanat-guide-2026-05-24` |
| `prod+dev` | Poland | Wieliczka, Lesser Poland | Tourist Route vs Miners’ Route, stairs, temperature, and luggage guide | `travel-guide` | `wieliczka-salt-mine-tourist-vs-miners-route-guide-2026-05-25` |
| `prod+dev` | Sweden | Stockholm / Djurgården | Vasa Museum ticket, bag rules, queue reality, and Vrak combo guide | `travel-guide` | `stockholm-vasa-museum-ticket-bag-queue-guide-2026-05-26` |
| `prod+dev` | Turkey | Istanbul / nationwide ministry museum route | MuseumPass Istanbul vs MuseumPass Türkiye validity, one-entry rule, and night-museum limits | `travel-guide` | `istanbul-museum-pass-vs-turkiye-pass-guide-2026-05-27` |
| `prod+dev` | Latvia | Jūrmala | Entry pass paid-zone boundary, train-vs-car arrival, and same-day permit timing guide | `travel-guide` | `jurmala-entry-pass-train-vs-car-guide-2026-05-28` |
| `prod+dev` | Lithuania | Klaipėda / Curonian Spit National Park, Neringa | Old vs new ferry terminal choice, local fee at Alksnynė, and Smiltynė-to-Nida bus chain guide | `travel-guide` | `neringa-ferry-local-fee-bus-guide-2026-04-23` |
| `prod+dev` | Chile | Torres del Paine National Park, Magallanes | Full Day vehicular pass vs Base Torres ticket, April cutoff times, and current route-status guide | `travel-guide` | `torres-del-paine-full-day-base-torres-guide-2026-05-29` |
| `prod+dev` | Morocco | Marrakech | Official online-only tickets, Wednesday museum closures, and last-entry guide | `travel-guide` | `jardin-majorelle-online-ticket-wednesday-guide-2026-05-30` |
| `prod+dev` | Malaysia | Penang, Penang Island | Express vs normal lane, 24-hour online cutoff, and one-way on-site-only guide | `travel-guide` | `penang-hill-express-lane-one-way-guide-2026-05-31` |
| `prod+dev` | United States | Albuquerque, New Mexico | Balloon fiesta guide | `festival` | `albuquerque-balloon-fiesta-2026-guide-2026-03-21` |
| `prod+dev` | Mexico | Mexico City | Day of the Dead guide | `festival` | `day-of-the-dead-mexico-city-2026-guide-2026-04-11` |
| `prod+dev` | Japan | Kyoto | Gion Matsuri festival guide | `festival` | `gion-matsuri-kyoto-2026-guide-2026-03-06` |
| `prod+dev` | United States | New Orleans, Louisiana | Mardi Gras guide | `festival` | `mardi-gras-new-orleans-2026-travel-guide-2026-01-27` |
| `prod+dev` | Germany | Munich | Oktoberfest guide | `festival` | `oktoberfest-munich-2026-guide-2026-04-03` |
| `prod+dev` | Brazil | Rio de Janeiro | Rio Carnival guide | `festival` | `rio-carnival-2026-travel-guide-2026-01-16` |
| `prod+dev` | Japan | Sapporo | Snow festival guide | `festival` | `sapporo-snow-festival-2026-travel-guide-2026-01-09` |
| `prod+dev` | Ireland | Dublin | St. Patrick's Festival guide | `festival` | `st-patricks-festival-dublin-2026-guide-2026-02-19` |
| `prod+dev` | Italy | Venice | Venice Carnival guide | `festival` | `venice-carnival-2026-travel-guide-2026-02-06` |
| `prod+dev` | Oman | Muscat | Sultan Qaboos Grand Mosque visitor hours, dress code, and official-source check guide | `travel-guide` | `sultan-qaboos-grand-mosque-visitor-hours-dress-code-guide-2026-06-01` |
| `prod+dev` | Saudi Arabia | AlUla / Hegra | Hegra Day Tour ticket, visitor-centre transport notice, e-ticket, and ID guide | `travel-guide` | `hegra-day-tour-ticket-visitor-centre-guide-2026-06-02` |
| `prod+dev` | Sri Lanka | Sigiriya / Central Province | Sigiriya current-price page, counter collection, passport relief-ticket check, single-entry, and drone-approval guide | `travel-guide` | `sigiriya-ticket-passport-drone-rule-guide-2026-06-03` |
| `prod+dev` | Qatar | Doha / Museum of Islamic Art | Museum of Islamic Art hours, QAR 100 ticket category, timed entry, dress code, bag, and photography guide | `travel-guide` | `doha-museum-islamic-art-ticket-hours-guide-2026-06-04` |
| `prod+dev` | Philippines | Manila / Intramuros | Fort Santiago hours, PHP 75 ticket, Klook late-entry, payment, and discount-ID guide | `travel-guide` | `fort-santiago-manila-ticket-hours-guide-2026-06-05` |
| `prod+dev` | Argentina | Puerto Iguazú / Parque Nacional Iguazú | Iguazú National Park ticket, last entry, Ecological Train, parking, and locker guide | `travel-guide` | `iguazu-national-park-ticket-train-guide-2026-06-06` |
| `prod+dev` | Japan | Hiroshima / Miyajima and Itsukushima Shrine | Miyajima Visitor Tax, JR ferry fare, Great Torii route, and Itsukushima Shrine hours guide | `travel-guide` | `miyajima-ferry-visitor-tax-shrine-guide-2026-06-07` |
| `prod+dev` | Japan | Himeji / Himeji Castle and Koko-en | Himeji Castle revised ticket, 16:00 gate close, Koko-en combo ticket, and locker guide | `travel-guide` | `himeji-castle-ticket-hours-kokoen-guide-2026-06-08` |
| `prod+dev` | Japan | Nara / Tōdai-ji and Nara Park | Tōdai-ji Great Buddha Hall seasonal hours, ¥800 admission, audio guide, and Nara deer safety guide | `travel-guide` | `nara-todaiji-daibutsuden-deer-safety-guide-2026-06-09` |
| `prod+dev` | Japan | Matsumoto / Matsumoto Castle | Matsumoto Castle e-ticket vs paper ticket, 2026 Golden Week hours, steep stairs, shoe, locker, and access guide | `travel-guide` | `matsumoto-castle-ticket-stairs-shoes-guide-2026-06-10` |
| `prod+dev` | Egypt | Giza / Grand Egyptian Museum | Grand Egyptian Museum official ticketing, hours, bag-size, photo, and single-entry guide | `travel-guide` | `grand-egyptian-museum-hours-bag-photo-guide-2026-06-11` |
| `prod+dev` | Denmark | Helsingør / Kronborg Castle | Copenhagen train, online ticket, Copenhagen Card DISCOVER, luggage, and accessibility guide | `travel-guide` | `kronborg-castle-day-trip-ticket-copenhagen-card-guide-2026-06-12` |
| `prod+dev` | Rwanda | Volcanoes National Park / Kinigi | Gorilla trekking permit, 15-year age rule, Kinigi 07:00 start, one-hour encounter, porter, and wet-forest packing guide | `travel-guide` | `rwanda-gorilla-trekking-permit-age-kinigi-guide-2026-06-13` |
| `prod+dev` | Kenya | Nairobi-Mombasa SGR / Madaraka Express | Official booking channels, ID match, one-hour station arrival, cancellation/reschedule window, and luggage guide | `travel-guide` | `madaraka-express-ticket-id-luggage-guide-2026-06-14` |
| `prod+dev` | Panama | Panama City / Miraflores Visitor Center | Ticket office hours, resident vs non-resident pricing, IMAX screening times, viewing deck capacity, and ship-transit variability guide | `travel-guide` | `panama-canal-miraflores-ticket-imax-guide-2026-06-15` |
| `prod+dev` | Costa Rica | Quepos / Manuel Antonio National Park | SINAC online ticket, Tuesday closure, ID check, no-parking, locker, shower, and food-rule guide | `travel-guide` | `manuel-antonio-national-park-ticket-parking-food-guide-2026-06-16` |
| `prod+dev` | Colombia | Bogotá / Cerro de Monserrate | Official ticket portal, funicular/cable-car hours, Sunday pricing, IDRD trail closure, and trail restriction guide | `travel-guide` | `bogota-monserrate-ticket-trail-schedule-guide-2026-06-17` |
| `prod+dev` | Vietnam | Hue / Hue Imperial City | Official e-ticket, adult/children/priority prices, combo validity, and Ngo Mon entry planning guide | `travel-guide` | `hue-imperial-city-eticket-combo-guide-2026-06-19` |
| `prod+dev` | China | Beijing / Palace Museum | Forbidden City real-name ticket reservation, passport booking, 7-day release, Monday closure, and south-to-north route guide | `travel-guide` | `forbidden-city-palace-museum-ticket-passport-guide-2026-06-20` |
| `prod+dev` | Uzbekistan | Samarkand / Registan Ensemble | Official e-ticket, seasonal opening hours, schedule-change announcement checks, and day-vs-night visit guide | `travel-guide` | `registan-samarkand-eticket-season-hours-guide-2026-06-21` |
| `prod+dev` | Slovakia | Bratislava-Devín / Devín Castle | Seasonal opening hours, summer-vs-winter admission, Bratislava CARD one-time entry, and visitor-rules guide | `travel-guide` | `devin-castle-ticket-season-hours-bratislava-card-guide-2026-06-22` |
| `prod+dev` | Cyprus | Paphos / Archaeological Park of Kato Pafos | Seasonal opening hours, €4.50 ticket, Tombs of the Kings add-on, special entry cards, mosaics route, and accessibility guide | `travel-guide` | `kato-pafos-archaeological-park-ticket-hours-mosaics-guide-2026-06-23` |
| `prod+dev` | Albania | Butrint / Saranda and Lake Butrint | Butrint ticket, seasonal last-entry hours, free-entry dates, online ticket validity, and UNESCO landscape guide | `travel-guide` | `butrint-ticket-hours-unesco-route-guide-2026-06-24` |
| `prod+dev` | Armenia | Yerevan / Matenadaran | Matenadaran ticket, Tuesday-Saturday visitor hours, group guide reservation, professional camera permission, and restoration-department access guide | `travel-guide` | `matenadaran-ticket-hours-guide-2026-06-25` |
| `prod+dev` | Vatican City | Vatican City / Vatican Museums | Official ticket portal, last Sunday free entry, dress code, cloakroom, and Sistine Chapel rules guide | `travel-guide` | `vatican-museums-ticket-free-sunday-dress-code-guide-2026-06-26` |
| `prod+dev` | San Marino | Borgo Maggiore / Città di San Marino | Cable car, P9/P11/P12 parking, Rimini bus, and National Museums pass guide | `travel-guide` | `san-marino-cable-car-parking-museum-pass-guide-2026-06-27` |
| `prod+dev` | Liechtenstein | Vaduz / Malbun / nationwide LIEmobil network | WELCOME vs ALL INCLUSIVE Adventure Pass, LIEmobil buses, Vaduz museums, and Malbun guide | `travel-guide` | `liechtenstein-adventure-pass-liemobil-vaduz-guide-2026-06-28` |
| `prod+dev` | Monaco | Monaco-Ville / Monte-Carlo / Port Hercule | Public lifts, CAM bus day pass, Monapass, bus boat, and Oceanographic Museum access guide | `travel-guide` | `monaco-public-lifts-bus-day-pass-oceanographic-museum-guide-2026-06-29` |
| `prod+dev` | United Kingdom | United Kingdom | ETA guide | `travel-guide` | `uk-eta-2026-guide-fee-validity-who-needs-it-2026-04-15` |
| `prod+dev` | Thailand | Thailand | Digital Arrival Card guide | `travel-guide` | `thailand-digital-arrival-card-tdac-2026-guide-2026-04-17` |
| `prod+dev` | Japan | Tokyo | First-time city guide | `destination-guide` | `tokyo-first-time-travel-guide-2026-04-20` |
| `prod+dev` | France | Cannes | Film festival visitor guide | `festival` | `cannes-film-festival-2026-travel-guide-2026-04-22` |
| `prod+dev` | New Zealand | New Zealand | NZeTA guide | `travel-guide` | `new-zealand-nzeta-2026-guide-cost-validity-transit-2026-04-23` |
| `prod+dev` | Singapore | Singapore | SG Arrival Card guide | `travel-guide` | `singapore-arrival-card-sgac-2026-guide-2026-04-24` |
| `prod+dev` | Australia | Sydney | First-time city guide | `destination-guide` | `sydney-first-time-travel-guide-2026-04-25` |
| `prod+dev` | United Arab Emirates | Dubai | First-time city guide | `destination-guide` | `dubai-first-time-travel-guide-2026-04-26` |
| `prod+dev` | Portugal | Lisbon | First-time city guide | `destination-guide` | `lisbon-first-time-travel-guide-2026-04-27` |
| `prod+dev` | Germany | Berlin | First-time city guide | `destination-guide` | `berlin-first-time-travel-guide-2026-04-28` |
| `prod+dev` | Taiwan | Taipei | First-time city guide | `destination-guide` | `taipei-first-time-travel-guide-2026-04-29` |
| `prod+dev` | Spain | Pamplona | San Fermin guide | `festival` | `san-fermin-pamplona-2026-guide-2026-04-30` |
| `prod+dev` | Hong Kong | Hong Kong | First-time city guide | `destination-guide` | `hong-kong-first-time-travel-guide-2026-05-01` |
| `prod+dev` | Malta | Malta | First-time travel guide | `destination-guide` | `malta-first-time-travel-guide-2026-05-02` |
| `prod+dev` | Iceland | National ring-road route | Ring Road driving guide | `travel-guide` | `iceland-ring-road-driving-guide-2026-05-03` |
| `prod+dev` | Canada | Banff National Park, Alberta | Moraine Lake shuttle access guide | `travel-guide` | `moraine-lake-banff-shuttle-guide-2026-05-04` |
| `prod+dev` | Switzerland | Jungfrau Region, Bernese Oberland | Jungfraujoch ticket and seat reservation guide | `travel-guide` | `jungfraujoch-ticket-seat-reservation-guide-2026-05-05` |
| `prod+dev` | Peru | Machupicchu, Cusco Region | Machu Picchu ticket and circuit choice guide | `travel-guide` | `machu-picchu-ticket-circuit-guide-2026-05-06` |
| `prod+dev` | Global / multi-country | Travel fundamentals | Travel tips, packing list, and airport tips | `travel-guide` | `essential-travel-tips-for-smoother-richer-trips-2026-04-09` |
| `prod+dev` | Global / multi-country | International trip preparation | Passport-to-carry-on packing checklist | `travel-guide` | `2026-international-travel-packing-checklist-2026-04-10` |
| `prod+dev` | Global / multi-country | International airport process | Check-in, security, immigration, gate, and boarding sequence guide | `travel-guide` | `2026-international-airport-process-guide-2026-04-10` |
| `prod+dev` | Global / multi-country | Cabin baggage and airport security | Carry-on restricted items and power bank rules checklist | `travel-guide` | `2026-carry-on-restricted-items-and-power-bank-rules-2026-04-10` |
| `prod+dev` | Global / multi-country | Travel memory / wellbeing | Beautiful moments, memory, and brighter-future reflection guide | `wellbeing-guide` | `beautiful-moments-memory-brain-brighter-future-2026-04-13` |
| `prod+dev` | Georgia | Kumistavi / Tskaltubo, Imereti | Prometheus Cave ticket, boat add-on, seasonal hours, and safety-check guide | `travel-guide` | `prometheus-cave-ticket-boat-hours-guide-2026-06-30` |
| `prod+dev` | Mongolia | Ulaanbaatar | Chinggis Khaan National Museum seasonal hours, Tuesday closure, ticket, and photo-permit guide | `travel-guide` | `chinggis-khaan-national-museum-ticket-hours-guide-2026-07-01` |
| `prod+dev` | Serbia | Belgrade | Museum of Yugoslavia ticket, Monday closure, free-entry, and Saturday guided-tour guide | `travel-guide` | `museum-of-yugoslavia-ticket-hours-guided-tour-guide-2026-07-02` |
| `prod+dev` | Tunisia | Tunis / Le Bardo | Bardo National Museum seasonal hours, Monday closure, and 2026 ticket guide | `travel-guide` | `bardo-national-museum-hours-ticket-guide-2026-07-03` |
| `prod+dev` | Montenegro | Lovćen National Park / Jezerski vrh | Lovćen entry ticket, parking, 461-step Njegoš Mausoleum, and weather-check guide | `travel-guide` | `lovcen-national-park-ticket-mausoleum-steps-guide-2026-07-04` |
| `prod+dev` | Ecuador | Galápagos Islands / Quito and Guayaquil departure airports | Transit Control Card, protected-area entry fee, biosecurity, and Baltra arrival sequence | `travel-guide` | `galapagos-tct-entry-fee-biosecurity-guide-2026-07-05` |
| `prod+dev` | Paraguay | Hernandarias / ITAIPU Tourist Complex | Visitor reception, free access, ID/passport, reservation, and attraction timing guide | `travel-guide` | `itaipu-visitor-reservation-id-guide-2026-07-06` |
| `prod+dev` | Bosnia and Herzegovina | Sarajevo / Trebević | Cable car working hours, maintenance checks, and Trebević route planning | `travel-guide` | `sarajevo-cable-car-trebevic-hours-guide-2026-07-07` |
| `prod+dev` | Senegal | Dakar / Island of Gorée | Dakar-Gorée ferry schedule, round-trip fare categories, and UNESCO memory-site planning | `travel-guide` | `goree-island-ferry-schedule-fare-guide-2026-07-08` |
| `prod+dev` | Azerbaijan | Gobustan / Boyukdash and museum area | Rock art reserve hours, ticket categories, guide services, and UNESCO context | `travel-guide` | `gobustan-rock-art-ticket-hours-guide-2026-07-09` |
| `prod+dev` | Bahrain | Manama / Qal’at al-Bahrain | Qal'at Al-Bahrain Site Museum working-hours conflict, fort route, free guided tour, and audio-guide planning | `travel-guide` | `qal-at-al-bahrain-site-museum-fort-hours-guide-2026-07-10` |
| `prod+dev` | Uruguay | Colonia del Sacramento | Historic Quarter UNESCO walking route, Calle de los Suspiros, lighthouse, and short-stay pacing guide | `travel-guide` | `colonia-del-sacramento-historic-quarter-walking-guide-2026-07-11` |
| `prod+dev` | Brunei | Temburong District / Ulu Temburong National Park | Certified permit, public launch, temuai ride, boardwalk, packing, and forest rules guide | `travel-guide` | `ulu-temburong-permit-boardwalk-temuai-guide-2026-07-12` |
| `prod+dev` | Barbados | St. Thomas / Harrison’s Cave | Harrison’s Cave opening days, tram tour time window, Bridgetown-airport distance, and UNESCO add-on guide | `travel-guide` | `harrisons-cave-barbados-tour-hours-guide-2026-07-13` |
| `prod+dev` | Kazakhstan | Almaty / Medeu and Shymbulak | Medeu-Shymbulak cableway, altitude, Route 123 easy trek, season, and mountain day-trip pacing guide | `travel-guide` | `shymbulak-medeu-cableway-altitude-day-trip-guide-2026-07-14` |
| `prod+dev` | Seychelles | Praslin / Vallée de Mai | Vallée de Mai opening hours, SCR 450 ticket, last entry, closure dates, and coco de mer conservation guide | `travel-guide` | `vallee-de-mai-ticket-hours-coco-de-mer-guide-2026-07-15` |
| `prod+dev` | Guatemala | Petén / Tikal National Park | Tikal regular ticket, sunrise/sunset add-on, authorized guide, card notice, and park-rule guide | `travel-guide` | `tikal-ticket-hours-sunrise-sunset-guide-2026-07-16` |
| `prod+dev` | Nepal | Kathmandu / Pashupatinath Temple | Pashupatinath temple hours, non-Hindu access boundary, photography, drone, and ghat etiquette guide | `travel-guide` | `pashupatinath-temple-hours-non-hindu-access-guide-2026-07-17` |
| `prod+dev` | Belize | Ambergris Caye / Hol Chan Marine Reserve | Hol Chan snorkel and dive zone rules, valid pass, ranger registration, guide ratio, and mooring guide | `travel-guide` | `hol-chan-marine-reserve-snorkel-rules-zone-guide-2026-07-18` |
| `prod+dev` | North Macedonia | Ohrid / Lake Ohrid | Ohrid UNESCO old-town, lake-edge route, endemic lake ecology, and low-pressure visitor guide | `destination-guide` | `ohrid-unesco-old-town-lake-route-guide-2026-07-19` |
| `prod+dev` | Jamaica | Ocho Rios / Dunn’s River Falls | Dunn’s River Falls ticket, hours, weather, resident-ID, locker, and climb planning guide | `travel-guide` | `dunns-river-falls-ticket-hours-climb-guide-2026-05-11` |
| `prod+dev` | Fiji | Suva / Fiji Museum | Fiji Museum admission, guided tour, hours, and closure-day guide | `travel-guide` | `fiji-museum-suva-ticket-hours-guide-2026-05-11` |
| `prod+dev` | Tanzania | Dar es Salaam / Zanzibar ferry route | Fast ferry ticket confirmation, class, luggage allowance, port timing, and booking-rule guide | `travel-guide` | `dar-es-salaam-zanzibar-ferry-ticket-luggage-guide-2026-05-11` |
| `prod+dev` | Bermuda | Nationwide bus and ferry network | Shorelink fare, zone, pass, app, exact-cash, and transfer guide | `travel-guide` | `bermuda-shorelink-bus-ferry-pass-guide-2026-05-11` |

### `dev`

| Status | Country / Scope | City / Region | Information Angle | Category | Slug |
| --- | --- | --- | --- | --- | --- |
| `dev` | Cambodia | Siem Reap / Angkor Archaeological Park | Angkor Pass 1-day vs 3-day, sunrise entry, and dress code guide | `travel-guide` | `angkor-pass-ticket-sunrise-dress-code-guide-2026-06-01` |
| `dev` | South Korea | Incheon Airport and major KTX stations | KorailPassPlus pickup, top-up, and refund guide | `travel-guide` | `korail-pass-plus-pickup-top-up-refund-guide-2026-05-18` |
| `dev` | Norway | Oslo | Oslo Pass airport train, zone coverage, and activation guide | `travel-guide` | `oslo-pass-airport-train-zone-guide-2026-05-19` |
| `dev` | Bulgaria | Rila Monastery / Rila Mountains | Museum ticket, dress code, photography rule, and Sofia access guide | `travel-guide` | `rila-monastery-museum-ticket-dress-code-guide-2026-06-18` |
| `dev` | Namibia | Etosha National Park / Okaukuejo, Halali, Namutoni route | Etosha park fees, sunrise-sunset gates, self-drive rules, camp booking, and waterhole timing guide | `travel-guide` | `etosha-national-park-fees-gates-self-drive-guide-2026-07-20` |
| `dev` | Mauritius | Pamplemousses / Sir Seewoosagur Ramgoolam Botanic Garden | Ticket categories, daily hours, guide fees, golf cart, wheelchair, parking, and living-collection visitor rules | `travel-guide` | `pamplemousses-botanical-garden-ticket-hours-guide-2026-07-21` |
| `dev` | Bolivia | La Paz / El Alto metropolitan network | Mi Teleferico fare, transfer, hours, line-choice, smart-card, luggage, food, alcohol, and passenger-rule guide | `travel-guide` | `la-paz-mi-teleferico-fare-transfer-hours-guide-2026-07-22` |
| `dev` | Andorra | National bus network / Andorra la Vella, valleys, Pas de la Casa | Bus fare zones, timed transfers, pass choice, line selection, ski-season services, and Bus Nocturn planning guide | `travel-guide` | `andorra-national-bus-fare-zones-night-bus-guide-2026-07-23` |
| `dev` | Macao SAR | Airport / Taipa Ferry Terminal / Hengqin / LRT network | LRT, public bus fare, payment, and port-arrival planning guide | `travel-guide` | `macao-lrt-bus-fare-airport-hengqin-guide-2026-05-10` |
| `dev` | Ghana | Cape Coast / Central Region | Cape Coast Castle ticket, guided tour, Door of No Return, and museum timing guide | `travel-guide` | `cape-coast-castle-ticket-guided-tour-guide-2026-05-10` |

### `queued`

| Status | Country / Scope | City / Region | Information Angle | Category | Slug |
| --- | --- | --- | --- | --- | --- |
| `queued` | Hungary | Budapest | Széchenyi Bath locker, cabin, and swim-cap guide | `wellbeing-guide` | `szechenyi-bath-locker-cabin-swim-cap-guide-2026-05-13` |

Reuse reason:
- Country reused because the user explicitly requested Japan guides.
- Miyajima coverage differs because it covers Hiroshima/Miyajima ferry access, visitor tax, Great Torii route timing, and Itsukushima Shrine admission, not Kyoto/Tokyo destination overview or Kyoto/Sapporo festival coverage.
- Himeji coverage differs because it covers Himeji Castle admission, 16:00 gate close, Koko-en combo ticket, and locker logistics, not prior Japan destination overview, festival, or Miyajima ferry-tax coverage.
- Nara coverage differs because it covers Tōdai-ji Great Buddha Hall seasonal hours, admission, audio guide logistics, and Nara deer safety, not prior Japan destination overview, festival, Miyajima ferry-tax, or Himeji Castle ticket coverage.
- Matsumoto coverage differs because it covers Matsumoto Castle e-ticket vs paper ticket pricing, 2026 Golden Week extended hours, steep-stair/shoe rules, lockers, and station access, not prior Japan destination overview, festival, Miyajima ferry-tax, Himeji Castle, or Nara deer-safety coverage.

## Update Workflow

새 guide를 만들 때는 아래 순서를 지킨다.

1. 이 문서에서 이미 잡힌 country, city, information angle을 먼저 제외한다.
2. 공식 source pack을 먼저 만들고, time-sensitive fact를 재확인한다.
3. 새 글을 draft하거나 generated JSON에 넣는 단계에서는 필요하면 임시로 `queued` row를 추가할 수 있다.
4. DB insert 또는 upsert가 성공하면 registry status를 실제 DB 상태에 맞게 즉시 갱신한다.
5. generated JSON, write script, seed script, import script 같은 임시 artifact는 DB 반영과 검증이 끝난 뒤 제거한다.
6. status는 아래처럼 쓴다.
   - `queued`: generated 되었지만 dev/prod DB에는 아직 반영되지 않음
   - `dev`: dev dataset 또는 dev DB에 실제로 존재함
   - `prod+dev`: prod에도 실제로 반영됨
7. 같은 국가를 다시 썼다면 아래 template로 이유를 남긴다.

```md
Reuse reason:
- Country reused because ...
- Existing coverage differs because ...
```

## New Row Template

아래 row를 복사해서 새 주제를 바로 추가한다. `status` 는 실제 DB 반영 상태에 맞게 `queued`, `dev`, `prod+dev` 중 하나를 넣는다.

```md
| `status` | Country / Scope | City / Region | Information Angle | `category` | `slug` |
```
