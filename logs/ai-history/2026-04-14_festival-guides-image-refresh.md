# 2026-04-14 festival guides image refresh

Goal
- tighten the lead images for the April 2026 festival batch
- fix parser-unsafe image URLs so API `coverImage.url` is stable

Canonical docs location
- `/home/ubuntu/app/docs/momentbook-api/ai`

Reviewed batch
- `sapporo-snow-festival-2026-travel-guide-2026-01-09`
- `rio-carnival-2026-travel-guide-2026-01-16`
- `mardi-gras-new-orleans-2026-travel-guide-2026-01-27`
- `venice-carnival-2026-travel-guide-2026-02-06`
- `st-patricks-festival-dublin-2026-guide-2026-02-19`
- `gion-matsuri-kyoto-2026-guide-2026-03-06`
- `albuquerque-balloon-fiesta-2026-guide-2026-03-21`
- `oktoberfest-munich-2026-guide-2026-04-03`
- `day-of-the-dead-mexico-city-2026-guide-2026-04-11`

Changed image set
- Sapporo
  - lead image changed to `SAPPORO_SNOW_FESTIVAL_2010_-_panoramio_-_t-konno.jpg`
  - reason: wider Odori festival scene, stronger hero framing
- Rio Carnival
  - lead image changed to `Carnival_in_Río_de_Janeiro_at_Sambadrome_(54730163556).jpg`
  - reason: better Sambadrome parade shot and parser-safe percent-encoded URL
- Venice Carnival
  - lead image changed to `Venice_carnival_mask_(2993907860).jpg`
  - reason: sharper close-up mask image for stronger carnival click appeal
- St. Patrick's Festival Dublin
  - lead image changed to `St._Patrick's_Day_Parade_In_Dublin_-_March_2011_(5534408947).jpg`
  - reason: wider parade scene with stronger street-energy framing
- Albuquerque Balloon Fiesta
  - lead image changed to `Albuquerque_balloon_fiesta.JPG`
  - reason: cleaner wide balloon field image
- Oktoberfest Munich
  - lead image changed to `Oktoberfest_Munich_1978_Beer_Tent.jpg`
  - reason: clearer beer-tent atmosphere for first-time visitor intent

Retained image set
- Mardi Gras New Orleans
  - retained `Zulu_Parade_-_New_Orleans_Mardi_Gras_2025.jpg`
  - reason: already high-resolution and highly topical
- Gion Matsuri Kyoto
  - retained `Gion-Matsuri-parade-001.jpg`
  - reason: best semantic match for the existing parade-focused alt text
- Day of the Dead Mexico City
  - retained `Day_of_the_Dead_traditional_altar.jpg`
  - reason: already location-specific and culturally aligned

Implementation notes
- updated the generated payload first so future transfer work keeps the same lead-image set
- updated DB article bodies for the changed slugs across all supported languages
- preserved existing localized alt text by changing only the first image URL

Execution result
- refresh script: `/home/ubuntu/app/momentbook-api/scripts/refresh-festival-guide-images-2026-04.js`
- payload backup: `/home/ubuntu/app/momentbook-api/scripts/generated/festival-guide-image-refresh-backup-2026-04.json`
- changed slugs: 6
- changed article records: 54

Verification
- `rio-carnival-2026-travel-guide-2026-01-16` now returns a full `coverImage.url` instead of a truncated URL
- `sapporo-snow-festival-2026-travel-guide-2026-01-09`, `oktoberfest-munich-2026-guide-2026-04-03`, `st-patricks-festival-dublin-2026-guide-2026-02-19`, and `albuquerque-balloon-fiesta-2026-guide-2026-03-21` all return the refreshed `coverImage.url` through the public API
- generated payload was updated to the same image set, so later dev-to-prod transfer work will reuse the refined image choices
