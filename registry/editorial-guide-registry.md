# Editorial Guide Registry

이 문서는 중복된 content coverage guide를 막기 위한 단일 관리 문서다.
새 guide를 고르기 전에 반드시 이 문서를 먼저 읽고, 새 글을 draft하거나 queue에 올린 직후 즉시 이 문서를 갱신한다.

중복 판단의 기본 단위는 국가가 아니라 coverage signature다. Coverage signature는 특정 장소 또는 여행지 종류, 행사/페스티벌 종류, route, ticket/pass/permit/rule, traveller intent, category, slug keyword를 함께 본 값이다. `Country / Scope`와 `City / Region`은 검색과 다양성 관리를 위한 메타데이터이며, 같은 국가나 같은 지역이라는 이유만으로 새 글을 제외하지 않는다.

기준 시점:
- 마지막 검토일: `2026-08-03` (Haleakalā sunrise reservation guide published)
- 마지막 검토일: `2026-07-12` (Hallasan National Park guide published)
- 2026-07-12 (Haiti Citadelle Laferrière guide published)
- 2026-07-11 (Milford Track and Vintgar Gorge guides published)
- 2026-07-12 기준 production admin articles API에 `artgrp_hallasan_jeju_trail_summit_gate_20260712` 9개 언어 record 확인
- 2026-08-03 기준 production admin articles API에 `artgrp_haleakala_sunrise_reservation_20260803` 9개 언어 record 확인
- 2026-07-12 기준 production admin articles API에 `artgrp_haiti_citadelle_sans_souci_guide_20260712` 9개 언어 record 확인
- 2026-07-11 기준 production admin articles API에 `artgrp_milford_track_hut_boat_route_20260711` 9개 언어 record 확인
- 2026-07-03 기준 production admin articles API에 `artgrp_uluru_kata_tjuta_pass_walk_climb_20260703` 9개 언어 record 확인
- 2026-07-02 기준 production admin articles API에 `artgrp_grand_palace_ticket_dress_code_20260702` 9개 언어 record 확인
- 2026-07-02 기준 production admin articles API에 `artgrp_halong_bay_cruise_entry_fee_20260702` 9개 언어 record 확인
- 2026-07-02 기준 production admin articles API에 `artgrp_ubud_monkey_forest_ticket_rules_20260702` 9개 언어 record 확인
- 2026-07-02 기준 Pena Palace Sintra guide published + 7개 기존 가이드 이미지 URL 일괄 패치
- 2026-07-02 기준 production admin articles API에 `artgrp_pena_palace_sintra_ticket_transport_20260702` 9개 언어 record 확인
- 2026-07-01 기준 production admin articles API에 `artgrp_cinque_terre_card_trail_rules_20260701` 9개 언어 record 확인
- 2026-06-30 기준 production admin articles API에 `artgrp_versailles_ticket_passport_fountains_20260630` 9개 언어 record 확인 후 title/body factual error patch 완료
- 2026-06-30 기준 Uffizi Gallery guide published
- 2026-06-30 기준 National Palace Museum guide published
- 2026-06-24 기준 Mount Fuji climbing guide published
- 2026-06-24 기준 production admin articles API에 `artgrp_seoraksan_cable_car_trail_20260624` 9개 언어 record 확인
- 2026-06-24 기준 production admin articles API에 `artgrp_masaya_volcano_night_lava_20260624` 9개 언어 record 확인
- 2026-06-24 기준 production admin articles API에 `artgrp_auschwitz_birkenau_entry_card_20260624` 9개 언어 record 확인
- 2026-06-24 기준 production admin articles API에 `artgrp_prambanan_temple_ticket_guide_20260624` 9개 언어 record 확인
- 2026-06-24 기준 production admin articles API에 `artgrp_neuschwanstein_castle_ticket_transport_20260624` 9개 언어 record 확인

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
  - 2026-05-19 기준 dev/prod DB slug 확인 결과 `namibia|mauritius|bolivia|andorra|macao|ghana` 관련 row는 양쪽 DB 모두 9개 언어 record 확인
  - 2026-05-29 기준 production admin articles API에 `artgrp_kuwait_towers_20260529` 9개 언어 record 확인
  - 2026-05-30 기준 production admin articles API에 `artgrp_maldives_velana_airport_transfer_20260530` 9개 언어 record 확인
  - 2026-05-30 기준 production admin articles API에 `artgrp_isle_of_man_go_explore_railways_20260530` 9개 언어 record 확인
  - 2026-05-30 기준 production admin articles API에 `artgrp_botswana_chobe_riverfront_20260530` 9개 언어 record 확인
  - 2026-05-30 기준 production admin articles API에 `artgrp_mozambique_gorongosa_no_self_drive_20260530` 9개 언어 record 확인
  - 2026-05-31 기준 production admin articles API에 `artgrp_dominican_republic_faro_a_colon_20260531` 9개 언어 record 확인
  - 2026-05-31 기준 production admin articles API에 `artgrp_israel_masada_cable_car_snake_path_20260531` 9개 언어 record 확인
  - 2026-05-31 기준 production admin articles API에 `artgrp_laos_kuang_si_waterfall_20260531` 9개 언어 record 확인
  - 2026-05-31 기준 production admin articles API에 `artgrp_el_salvador_joya_de_ceren_20260531` 9개 언어 record 확인
  - 2026-05-31 기준 production admin articles API에 `artgrp_trinidad_tobago_interisland_ferry_20260531` 9개 언어 record 확인
  - 2026-05-31 기준 production admin articles API에 `artgrp_madagascar_andasibe_mantadia_20260531` 9개 언어 record 확인
  - 2026-05-31 기준 production admin articles API에 `artgrp_eswatini_mantenga_cultural_village_falls_20260531` 9개 언어 record 확인
  - 2026-05-31 기준 production admin articles API에 `artgrp_uganda_entebbe_expressway_toll_20260531` 9개 언어 record 확인
  - 2026-05-31 기준 production admin articles API에 `artgrp_guyana_kaieteur_falls_flight_day_trip_20260531` 9개 언어 record 확인 후 title/body 현지화 patch 완료
  - 2026-06-01 기준 production admin articles API에 `artgrp_zimbabwe_victoria_falls_rainforest_20260601` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-01 기준 production admin articles API에 `artgrp_samoa_upolu_savaii_ferry_20260601` 9개 언어 record 확인 후 ko/th title/body 현지화 patch 완료
  - 2026-06-02 기준 production admin articles API에 `artgrp_honduras_copan_ticket_tunnel_museum_20260602` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-02 기준 production admin articles API에 `artgrp_palau_rock_islands_jellyfish_lake_permit_20260602` 9개 언어 record 확인 후 fr title/body 현지화 patch 완료
  - 2026-06-02 기준 production admin articles API에 `artgrp_saint_kitts_brimstone_hill_fortress_20260602` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-03 기준 production admin articles API에 `artgrp_suriname_paramaribo_unesco_walk_20260603` 9개 언어 record 확인 후 ja/es/pt/fr/th/vi title/body 현지화 patch 완료
  - 2026-06-04 기준 production admin articles API에 `artgrp_ethiopia_unity_park_ticket_rules_20260604` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-04 기준 production admin articles API에 `artgrp_kosovo_bear_sanctuary_prishtina_20260604` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-04 기준 production admin articles API에 `artgrp_kosovo_prishtina_airport_transfer_20260604` 9개 언어 record 확인 후 ko/ja/zh/pt/th/vi title/body 현지화 patch 완료
  - 2026-06-05 기준 production admin articles API에 `artgrp_bangladesh_dhaka_mrt_line6_ticket_pass_20260605` 9개 언어 record 확인 후 en title/body 현지화/범위 patch 완료
  - 2026-06-06 기준 production admin articles API에 `artgrp_dominica_boiling_lake_site_pass_20260606` 9개 언어 record 확인 후 ko/ja/zh/th title/body 현지화 patch 완료
  - 2026-06-06 기준 production admin articles API에 `artgrp_antigua_nelsons_dockyard_20260606` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-06 기준 production admin articles API에 `artgrp_aruba_arikok_pass_entrance_rules_20260606` 9개 언어 record 확인 후 vi title/body 현지화 patch 완료
  - 2026-06-06 기준 production admin articles API에 `artgrp_vanuatu_mount_yasur_alert_guide_20260606` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-07 기준 production admin articles API에 `artgrp_saint_lucia_gros_piton_nature_trail_20260607` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-07 기준 production admin articles API에 `artgrp_cook_islands_rarotonga_bus_20260607` 9개 언어 record 확인 후 es/pt title/body 현지화 patch 완료
  - 2026-06-07 기준 production admin articles API에 `artgrp_cabo_verde_cidade_velha_unesco_walk_20260607` 9개 언어 record 확인 후 ko/ja/zh/es/pt/fr/th/vi title/body 현지화 patch 완료
  - 2026-06-07 기준 production admin articles API에 `artgrp_papua_new_guinea_kokoda_track_permit_20260607` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-07 기준 production admin articles API에 `artgrp_faroe_islands_mykines_ferry_hike_20260607` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-07 기준 production admin articles API에 `artgrp_lesotho_sani_pass_border_4x4_levy_20260607` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-07 기준 production admin articles API에 `artgrp_curacao_christoffel_mountain_climb_20260607` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-08 기준 production admin articles API에 `artgrp_gibraltar_upper_rock_nature_reserve_20260608` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-08 기준 production admin articles API에 `artgrp_bvi_greater_baths_day_pass_20260608` 9개 언어 record 확인 후 ja/zh/fr title/body 현지화 patch 완료
  - 2026-06-08 기준 production admin articles API에 `artgrp_jersey_elizabeth_castle_ferry_tide_20260608` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-08 기준 production admin articles API에 `artgrp_montserrat_soufriere_hills_exclusion_zone_20260608` 9개 언어 record 확인 후 ko/ja/zh/es/pt/fr/th/vi title/body 현지화 patch 완료
  - 2026-06-08 기준 production admin articles API에 `artgrp_bhutan_paro_taktsang_hike_sdf_20260608` 9개 언어 record 확인 후 ko/ja title/body 현지화 patch 완료
  - 2026-06-08 기준 production admin articles API에 `artgrp_grenada_underwater_sculpture_mpa_fee_20260608` 9개 언어 record 확인 후 ko/ja/zh/es/pt/fr/th/vi title/body 현지화 patch 완료
  - 2026-06-08 기준 production admin articles API에 `artgrp_anguilla_marigot_blowing_point_ferry_20260608` 9개 언어 record 확인 후 th title/body spacing patch 완료
  - 2026-06-09 기준 production admin articles API에 `artgrp_nigeria_lagos_blue_line_cowry_card_20260609` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-09 기준 production admin articles API에 `artgrp_malawi_liwonde_self_drive_boat_20260609` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-09 기준 production admin articles API에 `artgrp_greenland_ilulissat_icefjord_trails_20260609` 9개 언어 record 확인 후 ko/ja title/body 현지화 patch 완료
  - 2026-06-09 기준 production admin articles API에 `artgrp_kyrgyzstan_ala_archa_shuttle_cableway_20260609` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-09 기준 production admin articles API에 `artgrp_sierra_leone_tacugama_sanctuary_tour_20260609` 9개 언어 record 확인 후 ko/fr/th title/body 현지화 patch 완료
  - 2026-06-09 기준 production admin articles API에 `artgrp_pakistan_lahore_fort_hbn_20260609` 9개 언어 record 확인 후 ko/ja/zh/es/pt/fr/th/vi title/body 현지화 patch 완료
  - 2026-06-09 기준 production admin articles API에 `artgrp_zambia_kafue_fees_self_drive_busanga_20260609` 9개 언어 record 확인 후 es/pt title/body 현지화 patch 완료
  - 2026-06-09 기준 production admin articles API에 `artgrp_tonga_whale_swim_rules_20260609` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-09 기준 production admin articles API에 `artgrp_algeria_algiers_metro_ticket_hours_20260609` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-09 기준 production admin articles API에 `artgrp_bahamas_exuma_cays_mooring_rules_20260609` 9개 언어 record 확인 후 ko/ja/zh/es/pt/fr/th/vi title/body 현지화 patch 완료
  - 2026-06-10 기준 production admin articles API에 `artgrp_singapore_night_safari_tram_time_slot_20260610` 9개 언어 record 확인 후 image URL title/body patch 완료
  - 2026-06-10 기준 production admin articles API에 `artgrp_singapore_jewel_changi_canopy_park_20260610` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-10 기준 production admin articles API에 `artgrp_taipei_maokong_gondola_ticket_weather_20260610` 9개 언어 record 확인 후 th title/body 현지화 patch 완료
  - 2026-06-11 기준 production admin articles API에 `artgrp_south_korea_gyeongbokgung_hanbok_ticket_20260611` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-12 기준 production admin articles API에 `artgrp_spain_alhambra_nasrid_palaces_ticket_20260612` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-12 기준 production admin articles API에 `artgrp_washington_monument_ticket_walkup_security_20260612` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-12 기준 production admin articles API에 `artgrp_statue_liberty_ellis_ferry_crown_security_20260612` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-12 기준 production admin articles API에 `artgrp_yosemite_no_reservation_fee_shuttle_20260612` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-13 기준 production admin articles API에 `artgrp_stonehenge_timed_ticket_shuttle_20260613` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-13 기준 production admin articles API에 `artgrp_barcelona_sagrada_familia_ticket_towers_20260613` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-13 기준 production admin articles API에 `artgrp_paris_louvre_ticket_entrance_bag_20260613` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-13 기준 production admin articles API에 `artgrp_rome_colosseum_ticket_arena_forum_20260613` 9개 언어 record 확인 후 zh title/body 현지화 patch 완료
  - 2026-06-14 기준 production admin articles API에 `artgrp_dubai_museum_future_ticket_metro_20260614` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-14 기준 production admin articles API에 `artgrp_malaysia_klia_ekspres_transit_20260614` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-23 기준 production admin articles API에 `artgrp_eiffel_tower_ticket_20260622` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-23 기준 production admin articles API에 `artgrp_cuba_viazul_bus_20260623` 9개 언어 record 확인 후 title/body patch 불필요
  - 2026-06-24 기준 production admin articles API에 `artgrp_masaya_volcano_night_lava_20260624` 9개 언어 record 확인 후 title/body patch 불필요
- 2026-06-24 기준 production admin articles API에 `artgrp_mount_fuji_climbing_20260624` 9개 언어 record 확인 후 title/body patch 불필요
- 2026-06-30 기준 production admin articles API에 `artgrp_national_palace_museum_taipei_ticket_guide_20260630` 9개 언어 record 확인 후 title/body patch 불필요
- 2026-06-30 기준 production admin articles API에 `artgrp_uffizi_gallery_ticket_free_sunday_20260630` 9개 언어 record 확인 후 title/body patch 불필요
- 2026-07-01 기준 production admin articles API에 `artgrp_cinque_terre_card_trail_rules_20260701` 9개 언어 record 확인 후 title/body patch 불필요
- 2026-07-01 기준 production admin articles API에 `artgrp_moscow_metro_troika_aeroexpress_20260701` 9개 언어 record 확인 후 title/body patch 불필요
- 2026-07-02 기준 production admin articles API에 `artgrp_ethiopia_unity_park_ticket_rules_20260604` 이미지 URL patch 완료 (Wikimedia Commons 직접 URL로 교체)
- 2026-07-02 기준 production admin articles API에 `artgrp_israel_masada_cable_car_snake_path_20260531` 이미지 URL patch 완료 (Wikimedia Commons 직접 URL로 교체)
- 2026-07-02 기준 production admin articles API에 `artgrp_botswana_chobe_riverfront_20260530` 이미지 URL patch 완료 (Wikimedia Commons 직접 URL로 교체)
- 2026-07-02 기준 production admin articles API에 `artgrp_O7mN3qS6vK9r` (Sultan Qaboos Grand Mosque) 이미지 URL patch 완료 (Wikimedia Commons 직접 URL로 교체)
- 2026-07-02 기준 production admin articles API에 `artgrp_H5pN9mQ2vL7r` (Borobudur) 이미지 URL patch 완료 (Wikimedia Commons 직접 URL로 교체)
- 2026-07-02 기준 production admin articles API에 `artgrp_G6mN4vQ8tL2p` (Table Mountain Cableway) 이미지 URL patch 완료 (Wikimedia Commons 직접 URL로 교체)
- 2026-07-02 기준 production admin articles API에 `artgrp_W4rM8tC2pN7x` (Tokyo first-time) 이미지 URL patch 완료 (Wikimedia Commons 직접 URL로 교체, es broken markdown fix 포함)
- 2026-07-02 기준 production admin articles API에 `artgrp_ubud_monkey_forest_ticket_rules_20260702` (Ubud Monkey Forest) 이미지 URL patch 완료 (hallucinated URL → Wikimedia Commons 직접 URL로 교체)
- 2026-07-02 기준 production admin articles API에 `artgrp_halong_bay_cruise_entry_fee_20260702` (Ha Long Bay) 이미지 URL patch 완료 (잘못된 hash path → 정확한 Wikimedia Commons URL로 교체)
- 2026-07-02 기준 production admin articles API에 `artgrp_O7mN3qS6vK9r` (Sultan Qaboos Grand Mosque) 이미지 URL patch 완료 (thumbnail URL 괄호로 인한 markdown 파싱 깨짐 → 직접 URL로 교체)
- 2026-07-02 기준 production admin articles API에 `artgrp_G6mN4vQ8tL2p` (Table Mountain Cableway) 이미지 URL patch 완료 (thumbnail URL 괄호로 인한 markdown 파싱 깨짐 → 직접 URL로 교체)
- 2026-07-11 기준 production admin articles API에 `artgrp_vintgar_gorge_timed_entry_shuttle_20260711` 9개 언어 record 확인 후 title/body patch 불필요

## Selection Guard

- 이 문서에 있는 모든 row는 이미 사용 중인 주제로 간주한다.
- `queued` status도 이미 선점된 주제다. 아직 import되지 않았더라도 새 글 후보에서 제외한다.
- 기본 규칙은 "아직 이 문서에 없는 coverage signature"를 고르는 것이다.
- Coverage signature는 `Country / Scope`, `City / Region`, `Information Angle`, `Category`, `Slug`를 함께 읽어 판단한다. 핵심은 국가가 아니라 특정 장소/여행지 종류, 행사/페스티벌 종류, 이동 route, ticket/pass/permit/rule, traveller intent다.
- 같은 국가나 같은 지역을 다시 써도 된다. 기존 row와 named place, event/festival type, route, ticket/pass/permit/rule, traveller decision이 실질적으로 다르면 후보로 유지한다.
- 국가가 달라도 coverage signature가 겹치면 피한다.
  - 예: 같은 유형의 generic `first-time city guide`를 도시명만 바꿔 반복
  - 예: 같은 유형의 `entry authorization / arrival card / ETA` guide를 사실상 같은 reader decision으로 반복
  - 예: 특정 차별점 없이 대표 annual festival overview를 반복
  - 예: 같은 named place, 같은 official ticket/pass/permit, 같은 access rule을 다른 제목으로 반복
- 같은 국가 안의 같은 broad type은 자동 중복이 아니다. 예를 들어 일본의 미야코지마 신사 guide와 신주쿠 신사 guide는 named shrine, 지역, 접근 방식, 방문 decision이 다르면 공존할 수 있다.
- 기존 row와 가까워 보이는 같은 국가/지역 topic을 선택했다면 신규 row 옆이나 아래에 coverage distinction note를 짧게 남긴다.

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

- reserved topics total: `215`
- status counts:
  - `prod+dev`: `210`
  - `dev`: `4`
  - `queued`: `1`
- category counts:
  - `festival`: `12`
  - `destination-guide`: `12`
  - `travel-guide`: `184`
  - `wellbeing-guide`: `3`
- country/scope metadata already visible, not an exclusion list: `164`
  - Albania, Algeria, Andorra, Anguilla, Antigua and Barbuda, Argentina, Armenia, Aruba, Australia, Austria, Azerbaijan, Bahamas, Bahrain, Bangladesh, Barbados, Belgium, Belize, Bermuda, Bhutan, Bolivia, Bosnia and Herzegovina, Botswana, Brazil, Brunei, British Virgin Islands, Bulgaria, Cabo Verde, Cambodia, Canada, Chile, China, Colombia, Cook Islands, Costa Rica, Croatia, Cuba, Curaçao, Cyprus, Czechia, Denmark, Dominica, Dominican Republic, Ecuador, Egypt, El Salvador, Estonia, Ethiopia, Eswatini, Europe (multi-country), Faroe Islands, Fiji, Finland, France, Georgia, Germany, Ghana, Gibraltar, Global / multi-country, Greece, Greenland, Grenada, Guatemala, Guyana, Haiti, Honduras, Hong Kong, Hungary, Iceland, India, Indonesia, Ireland, Israel, Isle of Man, Italy, Jamaica, Japan, Jersey, Jordan, Kazakhstan, Kenya, Kosovo, Kuwait, Kyrgyzstan, Laos, Latvia, Lesotho, Liechtenstein, Lithuania, Luxembourg, Macao SAR, Madagascar, Malawi, Malaysia, Maldives, Malta, Mauritius, Mexico, Moldova, Monaco, Montserrat, Mongolia, Montenegro, Morocco, Mozambique, Myanmar, Namibia, Nepal, New Zealand, Nicaragua, Netherlands, Nigeria, North Macedonia, Norway, Oman, Palau, Pakistan, Panama, Papua New Guinea, Paraguay, Peru, Philippines, Poland, Portugal, Qatar, Romania, Russia, Rwanda, Saint Kitts and Nevis, Saint Lucia, Samoa, San Marino, Saudi Arabia, Senegal, Serbia, Seychelles, Sierra Leone, Singapore, Slovakia, Slovenia, South Africa, South Korea, Spain, Sri Lanka, Suriname, Sweden, Switzerland, Taiwan, Tanzania, Thailand, Tonga, Trinidad and Tobago, Tunisia, Turkey, Uganda, United Arab Emirates, United Kingdom, United States, Uruguay, Uzbekistan, Vanuatu, Vatican City, Vietnam, Zambia, Zimbabwe
- repeated country metadata already visible, allowed when coverage differs:
  - Japan: Kyoto first-time, Gion Matsuri Kyoto, Sapporo Snow Festival, Tokyo first-time queued, Miyajima ferry/visitor tax, Himeji Castle ticket/hours, Nara Tōdai-ji/deer safety, Matsumoto Castle ticket/stairs/shoes, Mount Fuji climbing fee/trail/reservation
  - United States: Albuquerque Balloon Fiesta, Mardi Gras New Orleans, Washington Monument timed-entry ticket/walk-up/security planning, Statue of Liberty ferry/pedestal/crown/security planning, Yosemite 2026 no timed entrance reservation/fee/pass/traffic/shuttle/road-check planning, Haleakalā sunrise reservation/fee/viewpoint/drive planning
  - Thailand: Songkran Bangkok, TDAC, Grand Palace ticket/dress-code/transport production coverage
  - Germany: Oktoberfest Munich, Berlin first-time queued, Neuschwanstein Castle ticket/transport/Marienbrücke/rules production coverage
  - Singapore: SG Arrival Card entry declaration, Night Safari ticket/tram/presentation/late-transport planning, Jewel Changi Canopy Park/Rain Vortex/luggage timing
  - Taiwan: Taipei first-time, Maokong Gondola ticket/cabin/weather closure guide, National Palace Museum ticket/hours/Monday/bag/transport/audio-guide production coverage
  - South Korea: KorailPassPlus pickup/top-up/refund dev coverage, Gyeongbokgung Palace ticket/hanbok/Tuesday closure production coverage, Seoraksan cable car/trail/seasonal production coverage, Hallasan National Park trail choice/summit gate/seasonal gear production coverage
  - Spain: San Fermin Pamplona festival, Alhambra General/Nasrid Palaces timed-entry ticket and visitor-rule planning, Sagrada Família ticket/tower/security/access planning
  - United Kingdom: UK ETA entry authorization guide, Stonehenge timed-ticket/shuttle/parking/Stone Circle Experience planning guide
  - France: Cannes Film Festival visitor guide, Louvre ticket/entrance/bag/security planning, Eiffel Tower stairs vs elevator ticket/ID/summit/weather-closure guide, Versailles Palace Passport/timed entry/garden fountains/Paris transport guide
  - Italy: Venice Carnival festival coverage, Rome Colosseum timed/nominative ticket/arena/underground/Forum-Palatine one-entry timing coverage, Pompeii nominative ticket choice (Express vs Pompeii+ vs Pompeii Plus 3-day)/time-slot entrance/20,000 daily cap/three-entrance transport planning coverage, Uffizi Gallery timed ticket choice/free-Sunday/no-reservation/advance-vs-same-day/PassePartout 5-day-combo/visitor-rules production coverage, Cinque Terre Treno vs Trekking Card/trail open-closed/Via dell'Amore one-way timed-entry/train validation/winter season rules production coverage
  - United Arab Emirates: Dubai first-time guide, Museum of the Future AED 169 timed-ticket/Metro/bag/family/accessibility planning guide, Qasr Al Watan dated ticket/dress-code/security/Visitor Centre shuttle planning guide
  - Malaysia: Penang Hill express/normal lane and one-way ticket coverage, KLIA Ekspres/Transit airport rail ticket and T1-T2 terminal-transfer coverage
  - Mexico: Day of the Dead Mexico City festival guide, Chichén Itzá ticket/surcharge/transport/night-show guide
  - Poland: Wieliczka Salt Mine Tourist vs Miners' Route guide, Auschwitz-Birkenau Memorial entry card/guide/bag/dress-code/shuttle logistics guide
  - Portugal: Lisbon first-time city guide, Pena Palace timed ticket/transport/visitor rules production coverage
  - Indonesia: Borobudur Ground vs Structure ticket/Upanat guide, Prambanan Temple ticket/transport/Ratu Boko combo/Ramayana Ballet add-on guide, Ubud Monkey Forest ticket/rules/visitor-safety/temple-etiquette guide
  - Vietnam: Hue Imperial City e-ticket/combo guide, Ha Long Bay entry fee/cruise choice/transport guide

운영 해석:
- 현재 dataset은 `festival` 과 `first-time city guide` 비중이 높다.
- 따라서 다음 글은 generic festival overview나 generic first-time city guide를 반복하지 않는 편이 좋다. 미사용 국가는 다양성 관점에서 좋은 후보지만 필수 조건이 아니며, 같은 국가/지역도 coverage signature가 다르면 선택할 수 있다.

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
| `prod+dev` | Indonesia | Prambanan, Sleman, Yogyakarta | Prambanan Temple ticket choice, transport from Yogyakarta, Ratu Boko combo, visitor rules, and Ramayana Ballet add-on guide | `travel-guide` | `prambanan-temple-ticket-transport-rules-guide-20260624` |
| `prod+dev` | Poland | Wieliczka, Lesser Poland | Tourist Route vs Miners’ Route, stairs, temperature, and luggage guide | `travel-guide` | `wieliczka-salt-mine-tourist-vs-miners-route-guide-2026-05-25` |
| `prod+dev` | Sweden | Stockholm / Djurgården | Vasa Museum ticket, bag rules, queue reality, and Vrak combo guide | `travel-guide` | `stockholm-vasa-museum-ticket-bag-queue-guide-2026-05-26` |
| `prod+dev` | Turkey | Istanbul / nationwide ministry museum route | MuseumPass Istanbul vs MuseumPass Türkiye validity, one-entry rule, and night-museum limits | `travel-guide` | `istanbul-museum-pass-vs-turkiye-pass-guide-2026-05-27` |
| `prod+dev` | Latvia | Jūrmala | Entry pass paid-zone boundary, train-vs-car arrival, and same-day permit timing guide | `travel-guide` | `jurmala-entry-pass-train-vs-car-guide-2026-05-28` |
| `prod+dev` | Lithuania | Klaipėda / Curonian Spit National Park, Neringa | Old vs new ferry terminal choice, local fee at Alksnynė, and Smiltynė-to-Nida bus chain guide | `travel-guide` | `neringa-ferry-local-fee-bus-guide-2026-04-23` |
| `prod+dev` | Chile | Torres del Paine National Park, Magallanes | Full Day vehicular pass vs Base Torres ticket, April cutoff times, and current route-status guide | `travel-guide` | `torres-del-paine-full-day-base-torres-guide-2026-05-29` |
| `prod+dev` | Morocco | Marrakech | Official online-only tickets, Wednesday museum closures, and last-entry guide | `travel-guide` | `jardin-majorelle-online-ticket-wednesday-guide-2026-05-30` |
| `prod+dev` | Malaysia | Penang, Penang Island | Express vs normal lane, 24-hour online cutoff, and one-way on-site-only guide | `travel-guide` | `penang-hill-express-lane-one-way-guide-2026-05-31` |
| `prod+dev` | Malaysia | Kuala Lumpur International Airport / KL Sentral / ERL airport rail corridor | KLIA Ekspres vs KLIA Transit ticket choice, KL Sentral-airport fare, 23:00 all-stops pattern, T1-T2 transfer fare, child ticket, and late-arrival schedule guide | `travel-guide` | `klia-ekspres-transit-ticket-terminal-transfer-guide-2026-06-14` |
| `prod+dev` | United States | Albuquerque, New Mexico | Balloon fiesta guide | `festival` | `albuquerque-balloon-fiesta-2026-guide-2026-03-21` |
| `prod+dev` | Mexico | Mexico City | Day of the Dead guide | `festival` | `day-of-the-dead-mexico-city-2026-guide-2026-04-11` |
| `prod+dev` | Japan | Kyoto | Gion Matsuri festival guide | `festival` | `gion-matsuri-kyoto-2026-guide-2026-03-06` |
| `prod+dev` | United States | New Orleans, Louisiana | Mardi Gras guide | `festival` | `mardi-gras-new-orleans-2026-travel-guide-2026-01-27` |
| `prod+dev` | United States | Washington, D.C. / National Mall | Washington Monument online reservation vs same-day walk-up ticket, security screening, closure, and timing guide | `travel-guide` | `washington-monument-ticket-walkup-security-guide-2026-06-12` |
| `prod+dev` | United States | New York Harbor / Liberty Island and Ellis Island | Statue City Cruises official ferry, reserve vs pedestal vs crown access, Battery vs Liberty State Park departure, security screening, locker, pass, and crown-stair guide | `travel-guide` | `statue-liberty-ellis-ferry-crown-security-guide-2026-06-12` |
| `prod+dev` | United States | Yosemite National Park / Yosemite Valley, Glacier Point, Mariposa Grove, and access roads | 2026 no timed entrance reservation, Standard vs Annual/America the Beautiful pass, cashless/nonresident fee, traffic, Valley shuttle/YARTS, parking, and road-condition planning guide | `travel-guide` | `yosemite-2026-no-reservation-fee-shuttle-road-guide-2026-06-12` |
| `prod+dev` | Germany | Munich | Oktoberfest guide | `festival` | `oktoberfest-munich-2026-guide-2026-04-03` |
| `prod+dev` | Brazil | Rio de Janeiro | Rio Carnival guide | `festival` | `rio-carnival-2026-travel-guide-2026-01-16` |
| `prod+dev` | Japan | Sapporo | Snow festival guide | `festival` | `sapporo-snow-festival-2026-travel-guide-2026-01-09` |
| `prod+dev` | Ireland | Dublin | St. Patrick's Festival guide | `festival` | `st-patricks-festival-dublin-2026-guide-2026-02-19` |
| `prod+dev` | Italy | Venice | Venice Carnival guide | `festival` | `venice-carnival-2026-travel-guide-2026-02-06` |
| `prod+dev` | Italy | Rome / Colosseum, Roman Forum, and Palatine access | Official timed and nominative Colosseum ticket choice, 24h vs Only Arena vs Full Experience Arena/Underground, ID/name-change rule, Forum-Palatine one-entry timing, transport, terrain, and visitor-rule guide | `travel-guide` | `colosseum-ticket-arena-forum-id-guide-2026-06-13` |
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
| `prod+dev` | United Kingdom | Wiltshire / Stonehenge and Salisbury access | English Heritage timed general admission vs Stone Circle Experience, visitor-centre shuttle/walk, Salisbury bus, parking, membership, dog, access, and solstice-check planning guide | `travel-guide` | `stonehenge-timed-ticket-shuttle-parking-guide-2026-06-13` |
| `prod+dev` | Thailand | Thailand | Digital Arrival Card guide | `travel-guide` | `thailand-digital-arrival-card-tdac-2026-guide-2026-04-17` |
| `prod+dev` | Japan | Tokyo | First-time city guide | `destination-guide` | `tokyo-first-time-travel-guide-2026-04-20` |
| `prod+dev` | France | Cannes | Film festival visitor guide | `festival` | `cannes-film-festival-2026-travel-guide-2026-04-22` |
| `prod+dev` | France | Paris / Louvre Museum, Cour Napoléon, Carrousel, Richelieu, and Porte des Lions access | Timed ticket and free-admission proof, EEA vs non-EEA rate, entrance choice, final-exit rule, bag-size/security/locker/photo rules, accessibility, map, and audio-guide planning | `travel-guide` | `louvre-ticket-entrance-bag-guide-2026-06-13` |
| `prod+dev` | New Zealand | New Zealand | NZeTA guide | `travel-guide` | `new-zealand-nzeta-2026-guide-cost-validity-transit-2026-04-23` |
| `prod+dev` | New Zealand | Fiordland National Park / Te Anau–Milford Sound | Milford Track 53.5 km one-way Great Walk, three-hut booking, Te Anau Downs–Glade Wharf and Sandfly Point–Milford Sound boat chain, season, fees, camping prohibition, and weather/river safety guide | `travel-guide` | `milford-track-hut-booking-one-way-transport-guide-20260711` |
| `prod+dev` | Singapore | Singapore | SG Arrival Card guide | `travel-guide` | `singapore-arrival-card-sgac-2026-guide-2026-04-24` |
| `prod+dev` | Singapore | Mandai / Night Safari | Night Safari time-slot, tram inclusion, Creatures of the Night seat booking, M2 Khatib Bus, parking, and low-light visitor-rule guide | `travel-guide` | `singapore-night-safari-tram-time-slot-guide-2026-06-10` |
| `prod+dev` | Singapore | Changi Airport / Jewel Changi | Canopy Park ticket, Rain Vortex timing, terminal link bridge/T4 shuttle, baggage storage, and private-event advisory guide | `travel-guide` | `singapore-jewel-changi-canopy-park-luggage-guide-2026-06-10` |
| `prod+dev` | Australia | Sydney | First-time city guide | `destination-guide` | `sydney-first-time-travel-guide-2026-04-25` |
| `prod+dev` | Australia | Uluṟu-Kata Tjuṯa National Park / Yulara and Alice Springs access | Park pass (AUD 38 adult 3-day / under-18 free), Uluṟu base/Mala/Kuniya walk choice, Kata Tjuṯa Valley of the Winds 36°C heat-closure rule, Waḻpa Gorge photo rule, permanent Uluṟu climb closure, monthly opening hours, and Yulara/Alice Springs access guide | `travel-guide` | `uluru-kata-tjuta-park-pass-walk-climb-closure-guide-20260703` |
| `prod+dev` | United Arab Emirates | Dubai | First-time city guide | `destination-guide` | `dubai-first-time-travel-guide-2026-04-26` |
| `prod+dev` | United Arab Emirates | Dubai / Museum of the Future and Emirates Towers access | AED 169 timed-entry ticket, free-entry proof, official-hours conflict, Emirates Towers Metro link, parking limits, bag/photo/food, family, and accessibility rules guide | `travel-guide` | `museum-of-the-future-dubai-ticket-metro-guide-2026-06-14` |
| `prod+dev` | United Arab Emirates | Abu Dhabi / Qasr Al Watan and Al Ras Al Akhdar Visitor Centre | Qasr Al Watan dated ticket, no-refund/no-re-entry rule, dress code, 500 x 350 mm bag security limit, Visitor Centre parking/free shuttle, photography limits, and Palace in Motion cutoff guide | `travel-guide` | `qasr-al-watan-ticket-security-dress-code-guide-2026-06-16` |
| `prod+dev` | Portugal | Lisbon | First-time city guide | `destination-guide` | `lisbon-first-time-travel-guide-2026-04-27` |
| `prod+dev` | Germany | Berlin | First-time city guide | `destination-guide` | `berlin-first-time-travel-guide-2026-04-28` |
| `prod+dev` | Taiwan | Taipei | First-time city guide | `destination-guide` | `taipei-first-time-travel-guide-2026-04-29` |
| `prod+dev` | Taiwan | Taipei / Maokong Gondola | Ticket choice, crystal-cabin surcharge, Monday maintenance exceptions, weather suspension rules, and Taipei Zoo access guide | `travel-guide` | `maokong-gondola-ticket-crystal-cabin-weather-guide-2026-06-10` |
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
| `prod+dev` | Slovenia | Bled–Gorje / Vintgar Gorge | Digital All-in-One Pass, time-slot entry, VINTGAR Shuttle and parking hub, 5.7 km one-way circular route, helmet, dog, drone, and swimming rules | `travel-guide` | `vintgar-gorge-timed-entry-one-way-shuttle-guide-20260711` |
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
| `prod+dev` | Namibia | Etosha National Park / Okaukuejo, Halali, Namutoni route | Etosha park fees, sunrise-sunset gates, self-drive rules, camp booking, and waterhole timing guide | `travel-guide` | `etosha-national-park-fees-gates-self-drive-guide-2026-07-20` |
| `prod+dev` | Mauritius | Pamplemousses / Sir Seewoosagur Ramgoolam Botanic Garden | Ticket categories, daily hours, guide fees, golf cart, wheelchair, parking, and living-collection visitor rules | `travel-guide` | `pamplemousses-botanical-garden-ticket-hours-guide-2026-07-21` |
| `prod+dev` | Bolivia | La Paz / El Alto metropolitan network | Mi Teleferico fare, transfer, hours, line-choice, smart-card, luggage, food, alcohol, and passenger-rule guide | `travel-guide` | `la-paz-mi-teleferico-fare-transfer-hours-guide-2026-07-22` |
| `prod+dev` | Andorra | National bus network / Andorra la Vella, valleys, Pas de la Casa | Bus fare zones, timed transfers, pass choice, line selection, ski-season services, and Bus Nocturn planning guide | `travel-guide` | `andorra-national-bus-fare-zones-night-bus-guide-2026-07-23` |
| `prod+dev` | Macao SAR | Airport / Taipa Ferry Terminal / Hengqin / LRT network | LRT, public bus fare, payment, and port-arrival planning guide | `travel-guide` | `macao-lrt-bus-fare-airport-hengqin-guide-2026-05-10` |
| `prod+dev` | Ghana | Cape Coast / Central Region | Cape Coast Castle ticket, guided tour, Door of No Return, and museum timing guide | `travel-guide` | `cape-coast-castle-ticket-guided-tour-guide-2026-05-10` |
| `prod+dev` | Moldova | Cricova / Cricova Winery | Tour reservation, package choice, surcharge, underground temperature, and holiday-rule guide | `travel-guide` | `cricova-winery-tour-reservation-guide-2026-05-29` |
| `prod+dev` | Kuwait | Kuwait City / Arabian Gulf Road waterfront | Kuwait Towers viewing sphere hours, official ticket portal, restaurant timing, and holiday recheck guide | `travel-guide` | `kuwait-towers-viewing-sphere-restaurant-timing-guide-2026-05-29` |
| `prod+dev` | Maldives | Velana International Airport / Male, Hulhumale, resort transfer network | Airport-Male ferry frequency, resort counters, seaplane cutoff, luggage storage, and baggage-rule guide | `travel-guide` | `maldives-velana-airport-transfer-ferry-seaplane-guide-2026-05-30` |
| `prod+dev` | Isle of Man | Douglas / Laxey / island heritage railway network | Go Explore vs Go Explore Heritage card, 2026 railway season, Laxey Wheel, activation, and exclusion guide | `travel-guide` | `isle-of-man-go-explore-heritage-railways-guide-2026-05-30` |
| `prod+dev` | Botswana | Kasane / Chobe Riverfront | Chobe Riverfront entry fees, vehicle fee, seasonal gate hours, and boat-vs-self-drive planning guide | `travel-guide` | `chobe-national-park-riverfront-fees-gate-hours-guide-2026-05-30` |
| `prod+dev` | Mozambique | Gorongosa National Park / Sofala Province | Conservation fee, seasonal gate hours, no self-drive safari rule, and Beira/Inchope access planning guide | `travel-guide` | `gorongosa-no-self-drive-fees-gate-times-guide-2026-05-30` |
| `prod+dev` | Dominican Republic | Santo Domingo Este / Faro a Colón | Visitor hours, free guide service, bag/photo rules, and admission-price recheck guide | `travel-guide` | `faro-a-colon-hours-guide-rules-2026-05-31` |
| `prod+dev` | Israel | Masada National Park / Dead Sea and Arad access | Cable car vs Snake Path vs Roman Ramp, heat-closure timing, last entry, and pass-exclusion guide | `travel-guide` | `masada-cable-car-snake-path-heat-guide-2026-05-31` |
| `prod+dev` | Laos | Luang Prabang / Kuang Si Waterfall | Open hours, foreign-vs-local ticket, shared-vs-private transfer, signed swimming pools, Bear Rescue Center, and local etiquette guide | `travel-guide` | `kuang-si-waterfall-hours-ticket-swimming-guide-2026-05-31` |
| `prod+dev` | El Salvador | San Juan Opico / Joya de Cerén Archaeological Park | Ticket categories, Tuesday-Sunday hours, free guide service, accessibility features, and Monday-hours conflict guide | `travel-guide` | `joya-de-ceren-ticket-hours-free-guide-2026-05-31` |
| `prod+dev` | Trinidad and Tobago | Port of Spain / Scarborough inter-island ferry route | Ticket class, online booking immutability, two-hour check-in, ID, baggage, and vehicle rules guide | `travel-guide` | `trinidad-tobago-interisland-ferry-ticket-checkin-guide-2026-05-31` |
| `prod+dev` | Madagascar | Andasibe / Analamazaotra and Mantadia | Analamazaotra vs Mantadia ticket, compulsory local guide, RN2/field-car access, circuit difficulty, and season planning guide | `travel-guide` | `andasibe-mantadia-ticket-guide-trail-choice-2026-05-31` |
| `prod+dev` | Eswatini | Ezulwini Valley / Mantenga Nature Reserve | Cultural Village performance times, gate-price categories, falls trail, and crocodile no-swim guide | `travel-guide` | `mantenga-cultural-village-falls-hours-ticket-guide-2026-05-31` |
| `prod+dev` | Uganda | Entebbe International Airport / Kampala-Entebbe Expressway | Toll class, cash vs Upesi card, discount-pass, 24/7 toll plaza, and expressway rule guide | `travel-guide` | `kampala-entebbe-expressway-toll-airport-guide-2026-05-31` |
| `prod+dev` | Guyana | Kaieteur National Park / Potaro River | Kaieteur Falls flight-dependent day trip, weather cancellation, 20-pound weight planning, no-rail viewpoint safety, and licensed-operator guide | `travel-guide` | `kaieteur-falls-flight-weather-viewpoint-guide-2026-05-31` |
| `prod+dev` | Zimbabwe | Victoria Falls National Park / Rainforest, Matabeleland North | Rainforest Main gate vs V.I.P Gate vs Moonlight viewing fees, A8 access, spray clothing, and cliff-edge safety guide | `travel-guide` | `victoria-falls-rainforest-main-gate-fees-guide-2026-06-01` |
| `prod+dev` | Samoa | Upolu-Savai‘i ferry route / Mulifanua and Salelologa | Ferry passenger fare, cash walk-on ticket, vehicle booking/check-in, VIP upgrade, and missed-sailing penalty guide | `travel-guide` | `samoa-upolu-savaii-ferry-ticket-vehicle-guide-2026-06-01` |
| `prod+dev` | Honduras | Copán Ruinas / Parque Arqueológico de Copán | Ticket category, tunnel add-on, museum choice, student free-entry scope, and filming rule guide | `travel-guide` | `copan-archaeological-park-ticket-tunnel-museum-guide-2026-06-02` |
| `prod+dev` | Palau | Koror / Rock Islands Southern Lagoon and Jellyfish Lake | Rock Island Use vs Jellyfish Lake permit, 10-day validity, voucher upgrade, designated-area, no-SCUBA, and lake-safety guide | `travel-guide` | `palau-rock-islands-jellyfish-lake-permit-guide-2026-06-02` |
| `prod+dev` | Saint Kitts and Nevis | Sandy Point / Brimstone Hill Fortress National Park | Ticket, local-ID category, restaurant wristband, daily hours, hill-route, and UNESCO context guide | `travel-guide` | `brimstone-hill-fortress-ticket-hours-guide-2026-06-02` |
| `prod+dev` | Suriname | Paramaribo / Historic Inner City and Waterkant | UNESCO historic inner city walking route, wooden heritage, season, transport, cash, and evening-return guide | `destination-guide` | `paramaribo-unesco-walking-route-guide-2026-06-03` |
| `prod+dev` | Ethiopia | Addis Ababa / Unity Park, Grand Palace compound | Unity Park Regular vs Special vs Photography ticket, Ethiopian-clock timing, ID category, payment, and visitor-security rules guide | `travel-guide` | `unity-park-addis-ababa-ticket-rules-guide-2026-06-04` |
| `prod+dev` | Kosovo | Mramor / Badovc Lake near Prishtina | BEAR SANCTUARY Prishtina ticket, official-hours conflict, guided tour, taxi, bus, and animal-welfare visitor guide | `travel-guide` | `bear-sanctuary-prishtina-ticket-hours-transport-guide-2026-06-04` |
| `prod+dev` | Kosovo | Prishtina International Airport / Prishtina route | Airport public transport timetable, official taxi price list, late-arrival, luggage, and pickup decision guide | `travel-guide` | `prishtina-airport-bus-taxi-transfer-guide-2026-06-04` |
| `prod+dev` | Bangladesh | Dhaka / MRT Line 6 | Ticket choice, MRT Pass price, top-up, discount, Friday timetable, and 16-station route planning guide | `travel-guide` | `dhaka-metro-line-6-ticket-pass-timetable-guide-2026-06-05` |
| `prod+dev` | Dominica | Laudat / Morne Trois Pitons National Park | Boiling Lake site pass, certified guide, 8:00-16:00 access window, closure, and trail-readiness guide | `travel-guide` | `dominica-boiling-lake-site-pass-guide-2026-06-06` |
| `prod+dev` | Antigua and Barbuda | English Harbour / Nelson's Dockyard National Park | Nelson's Dockyard posted hours, reserved Rum in the Ruins and Clarence House tour checks, commercial filming rule, and UNESCO route guide | `travel-guide` | `nelsons-dockyard-national-park-hours-tour-guide-2026-06-06` |
| `prod+dev` | Aruba | Santa Cruz / Parke Nacional Arikok | Conservation pass, San Fuego vs Vader Piet entrance-hour conflict, Conchi hike timing, and protected-area rules guide | `travel-guide` | `arikok-national-park-pass-entrance-rules-guide-2026-06-06` |
| `prod+dev` | Vanuatu | Tanna / Mount Yasur | Current volcano alert level, licensed-guide access, 4x4 rim approach, and Tanna overnight vs Port Vila day-trip planning guide | `travel-guide` | `mount-yasur-volcano-alert-guide-2026-06-06` |
| `prod+dev` | Saint Lucia | Soufrière / Gros Piton Nature Trail | Certified-guide requirement, 4-6 hour hike timing, 2-liter water packing, weather, and protected-landscape checks | `travel-guide` | `gros-piton-nature-trail-guide-required-hike-2026-06-07` |
| `prod+dev` | Cook Islands | Rarotonga / circular main road and Rarotonga International Airport | Public bus Clockwise vs Anti-Clockwise timetable, fare/pass, airport stop, luggage, and holiday-service guide | `travel-guide` | `rarotonga-bus-clockwise-fare-airport-guide-2026-06-07` |
| `prod+dev` | Cabo Verde | Cidade Velha / Ribeira Grande de Santiago | UNESCO lower-town walking route, São Filipe fort climb, memory-site pacing, and Praia access checks | `destination-guide` | `cidade-velha-unesco-walking-route-guide-2026-06-07` |
| `prod+dev` | Papua New Guinea | Kokoda Track / Owers Corner and Kokoda route | Trek Permit, licensed operator, short-walk options, training, insurance, and transport checks | `travel-guide` | `kokoda-track-permit-licensed-operator-guide-2026-06-07` |
| `prod+dev` | Faroe Islands | Mykines / Sørvágur ferry route | Route 36 ferry, mandatory guided outfield hike, hiking fee, puffin season, and lighthouse-path closure planning guide | `travel-guide` | `mykines-ferry-guided-hike-puffin-guide-2026-06-07` |
| `prod+dev` | Lesotho | Sani Pass / Mokhotlong district and Underberg-Himeville approach | Border hours, 4x4 top-section planning, M100 tourism levy, weather closure, and alternative-port decision guide | `travel-guide` | `sani-pass-border-4x4-levy-guide-2026-06-07` |
| `prod+dev` | Curaçao | Christoffelpark / Westpunt | Christoffel Mountain 10:00 climb cutoff, ticket categories, trail vs car-route, heat, weather, and pet-rule guide | `travel-guide` | `christoffel-mountain-10am-climb-ticket-route-guide-2026-06-07` |
| `prod+dev` | Gibraltar | Upper Rock Nature Reserve | Nature Reserve ticket, cable car refurbishment closure, walking/taxi-tour access, macaque safety, and seasonal cutoff guide | `travel-guide` | `gibraltar-upper-rock-nature-reserve-ticket-cable-car-closure-guide-2026-06-08` |
| `prod+dev` | British Virgin Islands | Virgin Gorda / The Greater Baths | The Greater Baths day pass, The Baths-Devil's Bay one-way boulder route, marine permit, safety flags, and winter-swell access guide | `travel-guide` | `greater-baths-day-pass-trail-guide-2026-06-08` |
| `prod+dev` | Jersey | St Helier / Elizabeth Castle | Castle Ferry vs causeway, 2026 ticket, tide, Heritage Pass, and access guide | `travel-guide` | `jersey-elizabeth-castle-ferry-tide-ticket-guide-2026-06-08` |
| `prod+dev` | Montserrat | Soufrière Hills Volcano / Plymouth and Zone V | Current MVO hazard level, no-public-access rule, DMCA certified-guide approval, Maritime Zones E/W transit, and safe viewpoint decision guide | `travel-guide` | `montserrat-soufriere-hills-exclusion-zone-guide-2026-06-08` |
| `prod+dev` | Bhutan | Paro / Paro Taktsang | SDF, certified-guide requirement, altitude, transport, and sacred-site planning guide | `travel-guide` | `paro-taktsang-hike-sdf-guide-2026-06-08` |
| `prod+dev` | Grenada | Molinere/Beauséjour Marine Protected Area | Underwater Sculpture Park MPA entry fee, payment portal, snorkel vs scuba vs boat choice, mooring, and protected-area rules guide | `travel-guide` | `grenada-underwater-sculpture-park-mpa-fee-snorkel-guide-2026-06-08` |
| `prod+dev` | Anguilla | Marigot / Blowing Point public ferry route | Public ferry schedule, on-site ticketing, passenger head fee, Anguilla port tax, passport, and weather-cancellation guide | `travel-guide` | `anguilla-marigot-blowing-point-ferry-guide-2026-06-08` |
| `prod+dev` | Nigeria | Lagos / Marina-Mile 2 Blue Line corridor | Blue Line Monday-Saturday schedule, Cowry Card loading/payment, station order, personal-account warning, and route-fit guide | `travel-guide` | `lagos-blue-line-cowry-card-train-schedule-guide-2026-06-09` |
| `prod+dev` | Malawi | Liwonde National Park / Shire River and Chimwala Camp | Self-drive access, 06:00-18:00 park hours, rainy-season road and 4x4 checks, boat-vs-game-drive choice, and 2025 fee recheck guide | `travel-guide` | `liwonde-national-park-self-drive-boat-fees-guide-2026-06-09` |
| `prod+dev` | Greenland | Ilulissat / Sermermiut and Ilulissat Icefjord | Site fee, Sermermiut boardwalk, red/yellow/blue route choice, coast safety, and Icefjord Centre ticket-separation guide | `travel-guide` | `ilulissat-icefjord-trail-site-fee-guide-2026-06-09` |
| `prod+dev` | Kyrgyzstan | Ala-Archa National Park / Chuy region | Entry fee, electric shuttle and private-vehicle rule, 2026 cableway, and day-hike choice guide | `travel-guide` | `ala-archa-national-park-shuttle-cableway-guide-2026-06-09` |
| `prod+dev` | Sierra Leone | Freetown / Western Area Peninsula National Park | Tacugama Chimpanzee Sanctuary tour slots, fee categories, payment, 4WD access, and birdwatching timing guide | `travel-guide` | `tacugama-chimpanzee-sanctuary-tour-guide-2026-06-09` |
| `prod+dev` | Pakistan | Lahore / Lahore Fort and Walled City | Daytime visit vs History by Night, official-hours conflict, booking-page confirmation, refund terms, and Food Street gathering-point guide | `travel-guide` | `lahore-fort-daytime-history-by-night-guide-2026-06-09` |
| `prod+dev` | Zambia | Kafue National Park / Busanga Plains and Lusaka-Livingstone access | 2025 fee recheck, Kafue Main Gate payment, 4x4 self-drive limits, Busanga seasonal access, and route-choice guide | `travel-guide` | `kafue-national-park-fees-self-drive-busanga-guide-2026-06-09` |
| `prod+dev` | Tonga | Vavaʻu / Haʻapai / Tongatapu whale-swim operator network | Whale swim July-October season, licensed operator choice, no-SCUBA rule, 4-client plus guide in-water limit, pod-rest timing, and marine-weather check guide | `travel-guide` | `tonga-whale-swim-licensed-operator-rules-guide-2026-06-09` |
| `prod+dev` | Algeria | Algiers / Metro Line 01 | Algiers Metro ticket, 60-minute validation, Metro+Tramway transfer, hours-conflict, and accessibility guide | `travel-guide` | `algiers-metro-ticket-hours-transfer-guide-2026-06-09` |
| `prod+dev` | Bahamas | Exuma Cays Land & Sea Park / Warderick Wells | ParkPay fee vs non-reservation rule, Warderick Wells VHF 09 mooring request, no-take restrictions, VAT, and waste/camping permit guide | `travel-guide` | `bahamas-exuma-cays-mooring-no-take-guide-2026-06-09` |
| `prod+dev` | South Korea | Seoul / Gyeongbokgung Palace and Gwanghwamun access | KRW 3,000 regular ticket vs hanbok free-entry rule, Tuesday closure/public-holiday exception, Integrated Palace Ticket, and subway/parking access guide | `travel-guide` | `gyeongbokgung-palace-hanbok-ticket-tuesday-guide-2026-06-11` |
| `prod+dev` | Spain | Granada / Alhambra and Generalife | Alhambra General vs Gardens/Night/Dobla de Oro ticket choice, Nasrid Palaces timed entry, ID, bag, stroller, route, and purchase-rule guide | `travel-guide` | `alhambra-general-ticket-nasrid-palaces-time-guide-2026-06-12` |
| `prod+dev` | Spain | Barcelona / Sagrada Família and Eixample access | Official online timed ticket, basic vs guided vs tower ticket choice, Nativity façade entrance, late-arrival rule, tower age/health/bag limits, security, dress, quiet-hour, app/audioguide, and accessibility planning guide | `travel-guide` | `sagrada-familia-ticket-tower-security-guide-2026-06-13` |

| `prod+dev` | France | Paris / Eiffel Tower and Champ de Mars access | Official ticket choice (stairs vs elevator, 2nd floor vs summit), 60-day booking timeline, ID/nominative rules, accessibility limits, weather closure, security, transport, and July 13 2026 exceptional closure guide | `travel-guide` | `eiffel-tower-ticket-stairs-vs-lift-guide-2026-06-22` |
| `prod+dev` | Myanmar | Bagan Archaeological Zone, Mandalay Region | Zone Pass, e-bike vs horse cart vs car transport, temple climbing restrictions, and visit planning guide | `travel-guide` | `bagan-zone-pass-transport-guide-20260623` |
| `prod+dev` | Mexico | Yucatán / Chichén Itzá | Federal INAH fee ($105 MXN) vs Yucatán CULTUR state surcharge ($592 MXN foreign/$205 MXN national), transport from Mérida/Cancún/Valladolid, permanent pyramid-climbing ban since 2006, and Noches de Kukulkán night show (Wed-Sun 19:00) guide | `travel-guide` | `chichen-itza-ticket-surcharge-visit-guide-20260623` |
| `prod+dev` | Italy | Pompeii / Campania | Pompeii ticket choice, entrance selection, and day-trip transport guide from Naples, Sorrento, and Salerno | `travel-guide` | `pompeii-ticket-entrance-transport-day-trip-guide-2026-06-24` |

| `prod+dev` | Cuba | Havana / nationwide Viazul network | Viazul intercity bus online booking vs counter, luggage 25 kg limit, route planning (Havana–Viñales, Havana–Varadero, Havana–Trinidad, Havana–Santiago de Cuba, Havana–Cienfuegos, Havana–Camagüey, Havana–Baracoa), departure points, and common booking mistakes guide | `travel-guide` | `cuba-viazul-bus-ticket-luggage-route-guide-2026-06-23` |
| `prod+dev` | Poland | Oświęcim / Auschwitz-Birkenau Memorial and Museum | Entry card online reservation, guided-tour vs self-guided choice, bag-size/dress-code/ID rules, month-by-month entrance hours, and dual-site shuttle logistics guide | `travel-guide` | `auschwitz-birkenau-entry-card-guide-2026-06-24` |
 
| `prod+dev` | Nicaragua | Masaya / Managua and Granada access | Night lava viewing, crater access timing, transport, and safety rules guide | `travel-guide` | `masaya-volcano-night-lava-crater-guide-2026-06-24` |

| `prod+dev` | Germany | Schwangau / Hohenschwangau, Bavaria | Neuschwanstein Castle online vs on-site ticket, timed guided tour, shuttle bus vs horse carriage vs walk uphill, Marienbrücke viewpoint access, bag/photo/animal rules, parking, B16 bridge renovation delay, and day-trip from Munich planning guide | `travel-guide` | `neuschwanstein-castle-ticket-transport-visit-guide-2026-06-24` |
| `prod+dev` | South Korea | Sokcho / Seoraksan National Park, Gangwon Province | Seorak Cable Car same-day walk-up ticket (₩16,000 adult, ₩12,000 child, no reservation, no one-way), trail choice (Ulsanbawi 3.8 km vs Biryong Falls 2.4 km vs Geumganggul vs Daecheongbong summit courses), seasonal entry cutoff times, fall foliage parking closure, winter trail controls, and Seoul-Sokcho express bus access guide | `travel-guide` | `seoraksan-cable-car-trail-seasonal-guide-2026-06-24` |
| `prod+dev` | Japan | Fujiyoshida / Fujinomiya / Gotemba / Subashiri (Yamanashi and Shizuoka) | Mount Fuji climbing guide: ¥4,000 mandatory hiking fee (2026 flat rate), 4-trail choice (Yoshida 6.8 km 4,000 daily cap vs Fujinomiya 4.3 km vs Subashiri 6.9 km vs Gotemba 10.5 km), asoview (Yamanashi) vs FUJI NAVI app (Shizuoka) pre-registration, mountain hut booking (¥8,000–¥15,000/night), bullet-climbing ban, gate hours 14:00–03:00, Tokyo-Shinjuku bus transport (¥3,800), gear gate-check, altitude sickness, volcano alert, and Ohachimeguri crater walk guide | `travel-guide` | `mount-fuji-climbing-fee-trail-hut-guide-2026-06-24` |
| `prod+dev` | Taiwan | Taipei / Shilin District, National Palace Museum Northern Branch | NPM Exhibition Hall I Tuesday-Sunday hours (09:00-17:00), ticket choice (NT$350 regular vs NT$150 discount/ROC citizen/ISIC vs free under-17/all nationalities), 2026 special Monday opening days (21 dates), mandatory NPM group audio tour system for 10+ (NT$50 from 2026-05-01), A3 bag-size cloakroom check rule, no-flash/no-tripod/no-selfie-stick photography, metro-bus access from Shilin/Jiannan Road/Dazhi stations, and Zhishan/Zhide free garden guide | `travel-guide` | `national-palace-museum-taipei-ticket-hours-guide-2026-06-30` |
| `prod+dev` | Italy | Florence / Piazzale degli Uffizi, Gallerie degli Uffizi | Uffizi Gallery timed ticket choice (advance €29/same-day €25/afternoon discount from 16:00 €16), PassePartout 5-day combo (€40 Uffizi+Pitti+Boboli, €58 incl. Vasari Corridor), free admission categories (under-18 any nationality, disabled+companion), reduced €2 ticket (EU 18-25 and select countries), first Sunday free entry with no reservation and suspended priority lanes, Monday closure, group rules (11+ people €70 extra, 6+ whisper headset mandatory), nominative ticket ID check, visitor rules (cloakroom, metal detector, no flash/selfie-stick/tripod, no food/drink, dress code, phone silent, no weapons), audioguide (€6 in 8 languages), and pre-visit notice check guide | `travel-guide` | `uffizi-gallery-ticket-free-sunday-guide-2026-06-30` |
| `prod+dev` | France | Versailles / Île-de-France | Versailles Palace Passport ticket choice (€35 standard/€32 EEA/€12 reduced) with timed entry, estate-of-Trianon-only alternative, Musical Fountains Show/Gardens seasonal calendar, free admission categories (under-18 all nationalities, EU under-26, disabled+companion), first Sunday free (Nov–Mar only), Paris Museum Pass rules (free timed Passport required, gardens not included on fountain days), RER C summer closure (Jul 15–Aug 22 2026 with SNCF N/U/P and bus 171 alternatives), and visitor rules (no food/drink, no flash/tripod/selfie-stick, free left luggage) guide | `travel-guide` | `versailles-palace-ticket-passport-fountains-guide-20260630` |
| `prod+dev` | Italy | Cinque Terre National Park / Monterosso, Vernazza, Corniglia, Manarola, Riomaggiore (Liguria) | Cinque Terre Treno Card (train+trails, €22–€35 adult 1-day by season) vs Trekking Card (trails only, €10–€15 adult 1-day), trail open/closed status (Corniglia–Manarola SVA 592-2 closed-landslide, Manarola–Volastra–Corniglia free detour), Via dell'Amore one-way timed-entry reservation rules (Riomaggiore→Manarola only, Mar–Oct 09:00–21:00), CETS Guest Card exception, Cinque Terre Express every 20 min with €5–€10 single tickets, paper ticket validation rules, winter Nov 2–Mar 12 free-trails season, and la Spezia–Levanto access planning guide | `travel-guide` | `cinque-terre-card-trail-rules-train-guide-20260701` |
| `prod+dev` | Russia | Moscow / Sheremetyevo, Domodedovo, and Vnukovo airports | Moscow Metro Troika wallet (67 RUB) vs Ediny ticket (80 RUB) vs Ediny day pass (1 day 375 RUB / 3 days 720 RUB) choice, Aeroexpress train (700 RUB, 46 min Belorussky-SVO / 45 min Paveletsky-DME) vs express bus (450 RUB) vs metro Line 8A direct to VKO (since 2024 train cancellation), Troika card purchase/cash top-up rules (foreign Visa/Mastercard do not work), station navigation by line color, modified SVO schedule June 25–July 13 2026, and 01:00 system close rule | `travel-guide` | `moscow-metro-troika-card-aeroexpress-guide-20260701` |
| `prod+dev` | Portugal | Sintra / Lisbon access | Pena Palace Essential Visit (€20) vs Park-only (€12) ticket choice, strict timed-entry slot booking (zero delay tolerance, 30-min park-to-palace walk), CP Lisbon–Sintra train + Scotturb 434 bus transport, hiking trail routes, and visitor rules with Chalet of Countess of Edla inclusion guide | `travel-guide` | `pena-palace-sintra-ticket-transport-guide-20260702` |

| `prod+dev` | Vietnam | Ha Long Bay / Quảng Ninh and Hải Phòng | Ha Long Bay environmental fee (70,000–750,000 VND by route), day vs overnight cruise choice, Ha Long vs Lan Ha vs Bai Tu Long bay comparison, Tuần Châu and Gia Luận port logistics, Hanoi–Ha Long transport (bus 2.5–3.5 hours, seaplane, private car), summer/winter operating hours, and typhoon-season cancellation guide | `travel-guide` | `halong-bay-cruise-entry-fee-transport-guide-20260702` |

| `prod+dev` | Indonesia | Ubud, Bali / Padangtegal | Sacred Monkey Forest Sanctuary ticket (Adult IDR 130,000 / Child IDR 100,000), visitor safety rules (no food/drink/plastic, no eye contact, calm-if-monkey-jumps), dress code (shoulders/knees covered), locker use for loose items, monkey-selfie supervised add-on (IDR 50,000), best arrival timing (9:00–10:00 AM or 3:00–4:30 PM), three active Hindu temple perimeter access, 14-year no-rabies study, Nyepi closure check, and Ubud transport (walking from centre, car from Seminyak/Canggu/Sanur) guide | `travel-guide` | `ubud-monkey-forest-ticket-rules-guide-20260702` |

| `prod+dev` | Thailand | Bangkok / Rattanakosin Island, Phra Nakhon | Grand Palace 500 THB foreign-visitor ticket (includes Wat Phra Kaew + Queen Sirikit Museum of Textiles), strict 12-item dress code enforced at Mani Noppharat Gate (no sleeveless/shorts/see-through/ripped/tight fabric, shoulders and knees covered), non-refundable single-entry policy, online booking up to 1 month ahead, audio guide 200 THB (8 languages, passport/credit card deposit), daily 8:30–15:30 ticket sales (grounds close 16:30), child under 120 cm free, Thai citizens free with ID, boat (BTS Saphan Taksin → Chao Phraya Express orange flag → Tha Chang N9), MRT Sanam Chai (15-min walk), tuk-tuk "Palace closed" scam awareness, Khon performance not included, Chakri Maha Prasat Throne Hall, nearby Wat Pho (300 THB, 10-min walk south), schedule page check for royal ceremony closures, contact +66-2-623-5500 ext 2171/2158 guide | `travel-guide` | `grand-palace-bangkok-ticket-dress-code-guide-20260702` |
| `prod+dev` | Haiti | Milot, Nord Department / Cap‑Haïtien | National History Park (Citadelle Henry/Sans‑Souci Palace/Ramiers) compulsory guide, ticket price, Milot access (4×4 moto/hike/horse), 970 m physical fitness climb, ISPAN visitor hours, Sans‑Souci and Ramiers ground-level stops, Labadee cruise connection, cash-only payment, English-guide availability, and UNESCO visitor-rule guide | `travel-guide` | `citadelle-laferriere-sans-souci-ticket-guide-20260712` |
| `prod+dev` | South Korea | Jeju Island / Hallasan National Park, Seogwipo‑si and Jeju‑si | Hallasan National Park free entry, trail choice (Seongpanak 9.6 km summit / Gwaneumsa 8.7 km summit / Eorimok 6.8 km no‑summit / Yeongsil 5.8 km no‑summit), summit gate control (Seongpanak 10:00 / Gwaneumsa 09:00), reservation required for summit trails, seasonal gear (crampons winter / rain gear summer), trailhead bus access (181/281/240/475), and visitor‑safety rules guide | `travel-guide` | `hallasan-jeju-trail-summit-gate-guide-20260712` |
| `prod+dev` | United States | Maui / Haleakalā National Park, Summit District | Haleakalā sunrise reservation guide: US$1 per-vehicle Recreation.gov reservation required 3:00–7:00 AM entry (60-day and 2-day releases at 7:00 AM HST, one per customer every 3 days, ID matching, no same-day/phone/gate sales, non-refundable), cashless Standard Pass US$30/3-day vs Park/Tri-Park/America the Beautiful pass choice, four summit overlooks, 2.5 h Kahului drive, no gas/EV charging inside park, fee-free-day exclusion, and visitor rules guide | `travel-guide` | `haleakala-sunrise-reservation-summit-guide-20260803` |

### `dev`

| Status | Country / Scope | City / Region | Information Angle | Category | Slug |
| --- | --- | --- | --- | --- | --- |
| `dev` | Cambodia | Siem Reap / Angkor Archaeological Park | Angkor Pass 1-day vs 3-day, sunrise entry, and dress code guide | `travel-guide` | `angkor-pass-ticket-sunrise-dress-code-guide-2026-06-01` |
| `dev` | South Korea | Incheon Airport and major KTX stations | KorailPassPlus pickup, top-up, and refund guide | `travel-guide` | `korail-pass-plus-pickup-top-up-refund-guide-2026-05-18` |
| `dev` | Norway | Oslo | Oslo Pass airport train, zone coverage, and activation guide | `travel-guide` | `oslo-pass-airport-train-zone-guide-2026-05-19` |
| `dev` | Bulgaria | Rila Monastery / Rila Mountains | Museum ticket, dress code, photography rule, and Sofia access guide | `travel-guide` | `rila-monastery-museum-ticket-dress-code-guide-2026-06-18` |

### `queued`

| Status | Country / Scope | City / Region | Information Angle | Category | Slug |
| --- | --- | --- | --- | --- | --- |
| `queued` | Hungary | Budapest | Széchenyi Bath locker, cabin, and swim-cap guide | `wellbeing-guide` | `szechenyi-bath-locker-cabin-swim-cap-guide-2026-05-13` |

Coverage distinction notes:
- United States overlap was resolved by content distinction: existing US rows cover festivals (Albuquerque Balloon Fiesta, Mardi Gras New Orleans), Washington Monument timed-entry reservation/walk-up security, Statue of Liberty ferry/pedestal/crown access, and Yosemite 2026 no-timed-reservation/fee/pass/shuttle/road planning. Haleakalā covers a named Maui national park sunrise visit with a US$1 per-vehicle sunrise reservation (3:00–7:00 AM entry), Recreation.gov 60-day/2-day release schedule, ID and one-per-3-days rules, cashless entrance-pass choices, four summit viewpoints with elevation, drive times and no-gas/no-EV rules, and fee-free-day exclusion — not a festival, monument, harbor ferry, or Yosemite park-access guide.
- Japan coverage is intentionally content-level, not country-level. Miyajima covers Hiroshima/Miyajima ferry access, visitor tax, Great Torii route timing, and Itsukushima Shrine admission, not Kyoto/Tokyo destination overview or Kyoto/Sapporo festival coverage.
- Himeji coverage differs because it covers Himeji Castle admission, 16:00 gate close, Koko-en combo ticket, and locker logistics, not prior Japan destination overview, festival, or Miyajima ferry-tax coverage.
- Nara coverage differs because it covers Tōdai-ji Great Buddha Hall seasonal hours, admission, audio guide logistics, and Nara deer safety, not prior Japan destination overview, festival, Miyajima ferry-tax, or Himeji Castle ticket coverage.
- Matsumoto coverage differs because it covers Matsumoto Castle e-ticket vs paper ticket pricing, 2026 Golden Week extended hours, steep-stair/shoe rules, lockers, and station access, not prior Japan destination overview, festival, Miyajima ferry-tax, Himeji Castle, or Nara deer-safety coverage.
- Kosovo overlap was resolved by content distinction: BEAR SANCTUARY covers a Mramor/Badovc Lake site visit with ticket, hours, guided-tour, taxi/bus, and animal-welfare rules, while Prishtina Airport transfer covers PRN public transport timetable, official airport taxi prices, late-arrival, luggage, and pickup decisions.
- Singapore overlap was resolved by content distinction: SG Arrival Card covers entry declaration rules for arriving travelers, while Night Safari covers a Mandai evening attraction visit with ticket timing, tram inclusion, Creatures of the Night seat booking, M2 Khatib Bus, parking, low-light behavior rules, and late-return decisions.
- Jewel Changi coverage differs because it covers a landside Changi Airport visit with Canopy Park ticket choice, Rain Vortex timing, terminal link bridges/T4 shuttle, 24-hour baggage storage, and private-event advisory checks, not SG Arrival Card entry declaration or Mandai Night Safari evening attraction planning.
- Taiwan overlap was resolved by content distinction: Taipei first-time covers a broad city introduction, while Maokong Gondola covers a named Wenshan attraction/transport line with ticket choice, crystal-cabin surcharge, Monday maintenance exceptions, weather-suspension thresholds, Taipei Zoo access, and cabin-use rules.
- National Palace Museum coverage differs because it covers a named Shilin District museum with Exhibition Hall I Tuesday-Sunday hours, NT$350/NT$150/free ticket categories including under-17 free admission for all nationalities, 21 special 2026 Monday opening dates, mandatory NPM group audio tour system for groups of 10+, A3 bag-size cloakroom rule, no-flash/no-tripod/no-selfie-stick photography rules, metro-bus access from three Taipei Metro stations, and Zhishan/Zhide free garden extensions, not a broad Taipei city introduction or a Maokong Gondola transport/attraction guide.
- South Korea overlap was resolved by content distinction: KorailPassPlus covers rail pass pickup, top-up, and refund decisions at Incheon Airport and major KTX stations, while Gyeongbokgung covers a named Seoul palace visit with KRW 3,000 admission, hanbok free-entry clothing criteria, Tuesday closure/public-holiday exception, Integrated Palace Ticket, and subway/parking access.
- Spain overlap was resolved by content distinction: San Fermin covers a Pamplona festival visit, Alhambra covers a named Granada monument visit with Alhambra General vs Gardens/Night/Dobla de Oro ticket choice, Nasrid Palaces timed entry, original ID/passport, 40 x 40 cm bag rule, route order, and purchase-policy decisions, while Sagrada Família covers a named Barcelona basilica visit with official online timed tickets, basic/guided/tower choice, Nativity façade entrance, late-arrival rule, tower health/age/bag restrictions, security/dress rules, quiet-hour, app/audioguide, and accessibility decisions.
- France overlap was resolved by content distinction: Cannes covers an organizer-led film festival visit, while Louvre covers a named Paris museum visit with timed ticket and free-admission proof, EEA vs non-EEA pricing, Pyramid/Carrousel/Richelieu/Porte des Lions entrance choice, final-exit rule, 55 x 35 x 20 cm bag limit, security/locker/photo rules, accessibility, maps, and audio-guide decisions.
- United States overlap was resolved by content distinction: Albuquerque Balloon Fiesta and Mardi Gras New Orleans cover festival travel; Washington Monument covers a named National Mall monument visit with online reservation vs free same-day walk-up ticket choice, 10:00 and 15:00 release timing, 8:45 lodge window, security-screening item rules, elevator flow, and weather/maintenance closure checks; Statue of Liberty covers New York Harbor ferry access to Liberty Island/Ellis Island, Statue City Cruises authorized-provider rules, reserve vs pedestal vs crown ticket choice, The Battery vs Liberty State Park departure, two-stage security, locker/deposit rules, pass exclusions, and the 162-stair crown decision; Yosemite covers a named national park visit with the 2026 no timed entrance reservation policy, entrance fee/pass and nonresident-fee decisions, cashless gates, Valley shuttle/YARTS movement, parking timing, roadwork/current-condition checks, and Mariposa Grove/Hetch Hetchy access limits.
- United Kingdom overlap was resolved by content distinction: UK ETA covers country-level entry authorization, fee/validity, and who-needs-it decisions, while Stonehenge covers a named Wiltshire site visit with English Heritage timed general admission vs Stone Circle Experience, visitor-centre shuttle/walk choice, Salisbury bus transfer, £4 parking, membership/companion rules, dog/access rules, and solstice recheck decisions.
- Italy overlap was resolved by content distinction: Venice Carnival covers an organizer-led seasonal festival visit; Rome Colosseum covers a named monument and archaeological-area visit with official timed and nominative ticket products, 24h vs arena vs underground decisions, ID/name-change rules, Forum-Palatine one-entry timing, access route, terrain, and visitor-conduct rules; Pompeii covers a different named archaeological site in Campania with nominative ticket types (Express vs Pompeii+ vs Pompeii Plus 3-day), time-slot entry, 20,000-visitor daily cap, three-entrance choice, Circumvesuviana/Trenitalia transport, bag/ID/group rules, and Tuesday satellite-site closures, not Venetian festival or Roman Colosseum ticket/access decisions; Cinque Terre covers a named Ligurian national park visit with Treno Card (train+trails) vs Trekking Card (trails only) choice, seasonal pricing calendar, open/closed trail status including a permanently closed landslide section, Via dell'Amore one-way timed-entry reservation, paper ticket validation rules, winter free-trails season, and village train-hopping logistics, not a Venetian festival, Roman monument ticket, Campania archaeological site, or Florence museum ticket.
- United Arab Emirates overlap was resolved by content distinction: Dubai first-time is a broad city introduction, while Museum of the Future covers a named Trade Centre attraction with AED 169 timed ticket, free-entry proof process, official-hours conflict handling, Emirates Towers Metro link, parking limits, bag/photo/food rules, family supervision, and accessibility checks.
- Qasr Al Watan coverage differs because it covers a named Abu Dhabi presidential palace visit with dated ticket validity, no-refund/no-re-entry rule, dress code, 500 x 350 mm bag security limit, Visitor Centre parking/free shuttle, photography limits, and Palace in Motion cutoff checks, not Dubai first-time planning or the Museum of the Future timed-ticket/Metro/bag guide.
- Malaysia overlap was resolved by content distinction: Penang Hill covers Penang Island hill railway express vs normal lane, 24-hour online cutoff, and one-way on-site-only ticket decisions, while KLIA Ekspres/Transit covers the Kuala Lumpur airport rail corridor with Ekspres vs Transit ticket choice, KL Sentral-airport fare, 23:00 all-stops pattern, T1-T2 transfer fare, child ticket handling, and late-arrival schedule checks.
- Eiffel Tower coverage differs because it covers a named Paris monument visit with four ticket types (stairs vs elevator, 2nd floor vs summit), 60-day advance booking, nominative e-tickets, ID requirements, accessibility restrictions for the top and stairs, weather-closure rules, security screening, transport options, and an exceptional July 13 2026 closure, not the Cannes film festival or the Louvre museum ticket/entrance/bag guide.
- Mexico overlap was resolved by content distinction: Mexico City Day of the Dead covers a seasonal festival attendance guide in Mexico City, while Chichén Itzá covers a named Yucatán archaeological zone visit with the two-part federal-fee/state-surcharge ticket system, permanent pyramid-climbing ban since 2006, transport-route decisions from Mérida/Cancún/Valladolid, and the Noches de Kukulkán evening video-mapping show booking, not a seasonal festival event or any prior Mexico travel coverage.
- Poland overlap was resolved by content distinction: Wieliczka covers a named salt mine with Tourist vs Miners' Route, stairs, temperature, and luggage decisions, while Auschwitz-Birkenau covers a named memorial museum in Oświęcim with entry card reservation, guided vs self-guided tour choice, bag-size/dress-code/ID enforcement, month-by-month entrance hours, dual-site shuttle logistics, and visitor-rule compliance, not a salt-mine route or ticket decision.
- Nicaragua coverage differs because it covers a named active volcano park visit with night lava viewing, crater access timing, transport logistics from Managua and Granada, and safety rules for gas and explosion risk, not any existing country, destination, festival, ticket/pass, or transport coverage in the registry.
- Germany coverage expanded with Neuschwanstein Castle, which differs because it covers a named Bavaria castle visit with online vs on-site ticket choice, timed guided-tour only entry, shuttle bus vs horse carriage vs walk uphill logistics, Marienbrücke viewpoint access timing, bag/photo rules, parking costs, B16 bridge renovation delay (May-Aug 2026), and Munich day-trip planning, not the Oktoberfest Munich festival or Berlin first-time destination overview.
- Indonesia overlap was resolved by content distinction: Borobudur covers a Magelang Buddhist temple with Ground vs Structure ticket, Upanat access, and sunrise-sunset timing, while Prambanan covers a different named Hindu temple complex in Yogyakarta with Prambanan-only vs Ratu Boko combo ticket choice, transport from Yogyakarta, visitor rules including no-interior-access and dress code, Candi Sewu inclusion, and Ramayana Ballet add-on decisions, not a Borobudur ticket/access/timing guide.
- South Korea overlap was resolved by content distinction: KorailPassPlus covers rail pass pickup/top-up/refund and Gyeongbokgung covers a Seoul palace ticket/hanbok/closure, while Seoraksan covers a named Gangwon Province national park visit with cable car same-day walk-up ticket (₩16,000 adult, no reservation), Ulsanbawi vs Biryong Falls trail choice, seasonal entry cutoff times, fall foliage parking closure, and Seoul-Sokcho express bus logistics, not a rail pass or Seoul palace visit.
- Japan overlap was resolved by content distinction: existing Japan rows cover city introductions (Kyoto, Tokyo), seasonal festivals (Gion Matsuri, Sapporo Snow Festival), and named shrine/temple/castle visits (Miyajima ferry/shrine, Himeji Castle ticket/hours, Nara Tōdai-ji/deer, Matsumoto Castle ticket/stairs). Mount Fuji covers a named mountain climbing expedition with a mandatory ¥4,000 hiking fee (2026 flat rate), dual-prefecture reservation systems (asoview vs FUJI NAVI app), 4-trail choice with daily climber cap (Yoshida 4,000), mountain hut booking, bullet-climbing prohibition, gate-hour restrictions, altitude sickness management, gear gate-check requirements, private-vehicle restriction dates, and volcano-alert safety, not a city overview, festival, or single-building monument visit.
- Italy overlap was resolved by content distinction: existing Italy rows cover a Venice seasonal festival, Rome Colosseum timed/nominative ticket and archaeological-area access, and Pompeii nominative ticket types with Campania archaeological site entry. Uffizi Gallery covers a named Florence museum visit with different ticket products (advance €29/same-day €25/afternoon €16, PassePartout 5-day combo, annual pass), free-Sunday access rules with suspended priority, free admission eligibility for under-18 all nationalities, EU 18-25 reduced €2 ticket, nominative ticket ID enforcement, cloakroom/metal-detector/dress-code/weapon rules, and group whisper-headset requirements, not a Venice festival, Roman monument ticket, or Campania archaeological site.
- Italy overlap was resolved by content distinction: existing Italy rows cover a Venice seasonal festival, Rome Colosseum timed/nominative ticket, Pompeii nominative ticket types, and Uffizi Gallery timed-ticket/free-Sunday. Cinque Terre covers a named Ligurian coastal national park visit with two card types (Treno Card train+trails vs Trekking Card trails only), seasonal pricing tiers that change by day, an open/closed trail matrix including a permanently closed landslide-affected section, Via dell'Amore one-way timed-entry reservation rules with Guest Card exceptions, paper train ticket validation and fines, winter free-trail season, and Cinque Terre Express 20-minute-frequency logistics, not a Venetian festival, Roman monument, Campania archaeological site, or Florence museum visit.
- France overlap expanded with Versailles Palace: existing France rows cover a Cannes film festival, Louvre museum ticket/entrance/bag/security, and Eiffel Tower stairs/elevator/summit/weather-closure. Versailles Palace covers a named Île-de-France palace-estate visit with Passport ticket choice including garden access on Musical Fountains Show/Gardens days, separate Trianon-only ticket, free admission rules, first-Sunday-free policy, Paris Museum Pass garden-exclusion rule, and the critical RER C summer closure transport decision, not a film festival, Paris museum entrance/security guide, or Eiffel Tower monument access guide.
- Russia coverage is new: Moscow Metro Troika card/Ediny ticket choice and Aeroexpress airport transfer guide covers a named city transport network with specific ticket/pass products (Troika wallet 67 RUB, Ediny 1-ride 80 RUB, Ediny day passes 375/720 RUB, Aeroexpress 700 RUB), three-airport route decisions including VKO train cancellation, foreign-card cash-only rule, June 25-July 13 2026 modified SVO schedule, and 01:00 system closure, not any existing registry coverage.
- Portugal overlap was resolved by content distinction: Lisbon first-time covers a broad city introduction, while Pena Palace covers a named Sintra monument visit with Essential Visit (€20) vs Park-only (€12) ticket choice, strict timed-entry slot booking with zero delay tolerance, 30-minute park-to-palace walking time, CP Lisbon–Sintra train + Scotturb 434 bus transport logistics, hiking trail options, Chalet of Countess of Edla inclusion, and visitor rules, not a generic city destination overview.
- Vietnam overlap was resolved by content distinction: Hue Imperial City covers a named central Vietnam palace/monument visit with e-ticket types, combo validity, and Ngo Mon entry, while Ha Long Bay covers a named northeast Vietnam bay destination with environmental fee system (70,000–750,000 VND by route), VHL1–VHL8 day-route choice vs overnight-route fees, Ha Long vs Lan Ha vs Bai Tu Long bay comparison, Tuần Châu and Gia Luận port logistics, Hanoi–Ha Long transport, seasonal operating hours, and typhoon cancellation decisions, not a Hue palace/museum ticket guide.
- Indonesia overlap was resolved by content distinction: Borobudur covers a Magelang (Central Java) Buddhist temple with Ground vs Structure ticket and Upanat sunrise-sunset timing, and Prambanan covers a Sleman/Yogyakarta (Central Java) Hindu temple complex with temple ticket choice, Ratu Boko combo, and Ramayana Ballet add-on. Ubud Monkey Forest covers a named Bali wildlife sanctuary and temple complex on a different island with a completely different attraction type: semi-wild macaque safety rules (no food/no plastic/no eye contact/calm-if-monkey-jumps), locker use, dress code at active Hindu temples, supervised monkey-selfie add-on, 14-year no-rabies study, Nyepi closure check, and visitor timing/walkability from Ubud centre, not a Central Java temple ticket, structure access, or sunrise-sunset guide.
- Thailand overlap was resolved by content distinction: Songkran covers a seasonal water festival visit in Bangkok with event logistics, while TDAC covers the Thailand Digital Arrival Card entry declaration process for arriving travelers. Grand Palace covers a named Bangkok monument/museum visit with the 500 THB foreign-visitor ticket, strict 12-item dress code enforced at Mani Noppharat Gate, non-refundable single-entry policy, online booking, audio guide deposit rules, child/free-entry categories, boat/MRT/tuk-tuk access planning, and royal ceremony closure recheck, not a seasonal festival or an arrival card declaration guide.
- Australia overlap was resolved by content distinction: Sydney first-time is a broad city introduction, while Uluṟu-Kata Tjuṯa covers a named Northern Territory national park visit with the park-pass decision, Uluṟu and Kata Tjuṯa walk choice, Valley of the Winds heat-closure rule, Waḻpa Gorge photo rule, permanent Uluṟu climb-closure rule, monthly opening hours, and Yulara/Alice Springs access planning, not an east-coast city overview.
- Slovenia overlap was resolved by content distinction: the existing Postojna row covers a named cave visit with reserved entry time, cave train, temperature, and combo-ticket choice, while Vintgar covers a different named protected gorge with a digital All-in-One Pass, time-slot capacity, Central VINTGAR LIP parking and shuttle transfer, a one-way 5.7 km return route, mandatory helmet, dog, drone, swimming, and route-direction rules. It is not a generic Bled or Slovenia destination guide.
- New Zealand overlap was resolved by content distinction: the existing NZeTA row covers country-level entry authorization, while Milford Track covers a named Fiordland Great Walk with a 53.5 km one-way route, three named DOC huts, Te Anau Downs–Glade Wharf and Sandfly Point–Milford Sound boat transfers, season-specific hut fees and booking rules, a camping prohibition, and route/weather/river-safety decisions. It is not an immigration or arrival-authorization guide.
- Haiti is a completely new country with no existing registry entry. The coverage signature — named fortress/palace UNESCO site, compulsory guide, 4×4/moto/hike mountain access, 970 m climb, cash-only payment, ISPAN management, Labadee cruise connection — does not overlap any existing guide in place, event type, route, ticket/pass/permit, rule, or traveler decision.

## Update Workflow

새 guide를 만들 때는 아래 순서를 지킨다.

1. 이 문서에서 이미 잡힌 coverage signature를 먼저 제외한다. Country / Scope는 메타데이터로 보고, City / Region, Information Angle, Category, Slug를 함께 읽어 특정 장소/행사/route/pass/permit/rule/traveller decision이 겹치는지 판단한다.
2. 공식 source pack을 먼저 만들고, time-sensitive fact를 재확인한다.
3. 새 글을 draft하거나 generated JSON에 넣는 단계에서는 필요하면 임시로 `queued` row를 추가할 수 있다.
4. DB insert 또는 upsert가 성공하면 registry status를 실제 DB 상태에 맞게 즉시 갱신한다.
5. generated JSON, write script, seed script, import script 같은 임시 artifact는 DB 반영과 검증이 끝난 뒤 제거한다.
6. status는 아래처럼 쓴다.
   - `queued`: generated 되었지만 dev/prod DB에는 아직 반영되지 않음
   - `dev`: dev dataset 또는 dev DB에 실제로 존재함
   - `prod+dev`: prod에도 실제로 반영됨
7. 기존 row와 같은 국가/지역이거나 broad type이 가까워 보이면 아래 template로 coverage distinction을 남긴다.

```md
Coverage distinction note:
- New coverage signature: ...
- Existing nearby coverage differs because ...
```

## New Row Template

아래 row를 복사해서 새 주제를 바로 추가한다. `status` 는 실제 DB 반영 상태에 맞게 `queued`, `dev`, `prod+dev` 중 하나를 넣는다.

```md
| `status` | Country / Scope | City / Region | Information Angle | `category` | `slug` |

Coverage distinction note, if close to an existing row:
- New coverage signature: ...
- Existing nearby coverage differs because ...
```
