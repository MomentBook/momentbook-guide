# 2026-04-14 festival guides research log

Batch goal
- create high-traffic festival travel guides for annual events using official or primary sources where possible
- seed multilingual articles into the dev `articles` collection only after the source set is strong enough

Storage rule
- all research notes for this batch should live in `/home/ubuntu/app/docs/momentbook-api/ai`
- only scripts, generated payloads, and DB writes should happen in `momentbook-api`

Candidate topics
- Rio Carnival, Brazil
- Sapporo Snow Festival, Japan
- Venice Carnival, Italy
- Oktoberfest Munich, Germany
- St. Patrick's Festival, Dublin, Ireland
- Gion Matsuri, Kyoto, Japan
- Albuquerque International Balloon Fiesta, USA
- Mardi Gras, New Orleans, USA
- Day of the Dead, Mexico

Why these topics
- recurring annual events with strong search demand
- destination + timing + itinerary intent is clear
- official or primary-source pages are available for practical planning
- they support SEO-friendly evergreen structures with yearly refresh potential

Primary source set by topic
- Rio Carnival
  - status: 2026 operational plan and opening confirmed
  - URLs:
    - https://en.prefeitura.rio/riotur/prefeitura-apresenta-o-plano-operacional-para-o-carnaval-de-rua-2026/
    - https://en.prefeitura.rio/noticias/rei-momo-recebe-chave-da-cidade-e-abre-oficialmente-o-carnaval-do-rio-2026/
    - https://riotur.rio/en/about-rio/
  - confirmed points:
    - 2026 street carnival plan extends through February 22
    - 458 street blocos are planned and more than 6 million revelers are expected
    - official opening ceremony was held on February 13, 2026
- Sapporo Snow Festival
  - status: 2026 dates confirmed
  - URLs:
    - https://www.sapporo.travel/en/event/event-list/sapporo_snow_festival/
    - https://visit.sapporo.travel/discover/snow/sapporo-snow-festival/
  - confirmed points:
    - festival dates are February 4 to 11, 2026
    - main areas are Odori, Tsudome, and Susukino
    - the event attracts more than two million visitors
- Venice Carnival
  - status: 2026 dates and opening sequence confirmed
  - URLs:
    - https://carnevale.venezia.it/en/news/2026/carnevale-di-venezia-2026-dal-mito-allo-sport-venezia-celebra-milano-cortina/
    - https://www.veneziaunica.it/en
  - confirmed points:
    - festival runs January 31 to February 17, 2026
    - opening weekend includes the Grand Carnival Ball and the Festa Veneziana water parade
    - official city pass and transport platform is Venezia Unica
- Oktoberfest Munich
  - status: 2026 dates and visitor logistics confirmed
  - URLs:
    - https://www.oktoberfest.de/en
    - https://www.oktoberfest.de/en/information/events/oktoberfest-tapping-and-opening-ceremony
    - https://www.oktoberfest.de/en/information/service-visitors
    - https://www.oktoberfest.de/en/beer-tents/beer-tent-opening-times
  - confirmed points:
    - 2026 dates are September 19 to October 4
    - tapping ceremony is at 12 noon on September 19
    - evenings and weekends are especially crowded and reservations matter
- St. Patrick's Festival Dublin
  - status: 2026 festival window and parade details confirmed
  - URLs:
    - https://stpatricksfestival.ie/st-patricks-day-parade/
    - https://stpatricksfestival.ie/practical-info/map-and-parade-route
  - confirmed points:
    - festival runs March 14 to 17, 2026
    - parade begins at 12pm on March 17
    - route runs from Parnell Square to the Cuffe Street and Kevin Street area
- Gion Matsuri Kyoto
  - status: annual official pattern confirmed; article should not claim unpublished 2026 updates
  - URLs:
    - https://kyoto.travel/en/travel-inspiration/gion-matsuri-festival/
    - https://global.kyoto.travel/en/faq/detail.php?faq_id=10119
  - confirmed points:
    - the festival is held annually from July 1 to 31
    - major procession highlights are July 17 and July 24
    - Yoiyama nights take place before the processions and are core visitor moments
- Albuquerque International Balloon Fiesta
  - status: 2026 dates confirmed; full PDF schedule still pending
  - URLs:
    - https://www.balloonfiesta.com/plan-your-visit/event-schedule/
    - https://www.balloonfiesta.com/plan-your-visit/get-involved/maps-directions/
    - https://www.balloonfiesta.com/plan-your-visit/get-involved/park-ride/
  - confirmed points:
    - 2026 event runs October 3 to 11
    - daily schedule framework is published by day
    - official site recommends Park and Ride because of congestion around Balloon Fiesta Park
- Mardi Gras New Orleans
  - status: 2026 Fat Tuesday date and season timing confirmed
  - URLs:
    - https://www.mardigrasneworleans.com/when-is-mardi-gras/future-mardi-gras-dates
    - https://www.neworleans.com/events/holidays-seasonal/mardi-gras/history-and-traditions/
  - confirmed points:
    - Fat Tuesday in 2026 is February 17
    - Carnival season starts on January 6 and builds toward Fat Tuesday
    - the article should lean on planning, traditions, and neighborhood strategy rather than unpublished parade specifics
- Day of the Dead in Mexico City
  - status: annual timing and cultural framing confirmed; do not invent a 2026 city program
  - URLs:
    - https://ich.unesco.org/en/RL/00054
    - https://mexicocity.cdmx.gob.mx/day-of-the-dead-ofrendas/?lang=en
    - https://www.gob.mx/sipinna/articulos/dia-de-muertos-una-conmemoracion-tradicional
  - confirmed points:
    - observances center on late October to early November
    - principal dates are November 1 and 2
    - official city travel material supports an ofrendas-focused planning angle

Research constraints
- do not invent 2026 dates if the official calendar is not yet published
- if a festival's exact dates are not confirmed, frame the guide around the annual season and planning window
- image selection should later favor place-specific, high-intent visuals aligned to the article topic

Next actions
- confirm exact official URLs and date certainty for each topic
- finalize the topic list for batch 1
- write the generator and seed scripts
- save the generated multilingual payload and seed into dev DB
