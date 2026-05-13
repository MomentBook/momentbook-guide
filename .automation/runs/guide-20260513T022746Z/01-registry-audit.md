# Registry Audit

Run: guide-20260513T022746Z
Checked date: 2026-05-13

## Collision verdict

PASS for Zimbabwe / Victoria Falls / ZimParks Rainforest fee and spray-season planning.

Registry rows in `prod+dev`, `dev`, and `queued` were treated as reserved. The only queued row is Hungary / Budapest / Széchenyi Bath locker, cabin, and swim-cap guide. Zimbabwe is absent from the registry country/scope snapshot, and the current registry contains no Victoria Falls, Mosi-oa-Tunya, ZimParks, Rainforest gate, or Zambezi Falls article.

The source role also checked generated-artifact names and found no `zimbabwe|victoria falls|zimparks|rainforest|zambezi` collisions. The generated queue directory under `/home/ubuntu/app/momentbook-api/scripts/generated` was not present on the current dev host.

## Disallowed overlaps

Do not use already reserved countries/scopes unless explicitly justified. Avoid first-time city guides, annual festival guides, entry authorization / ETA / arrival card guides, generic airport-to-city logistics, generic transport pass guides, and already covered museum/palace/castle/national-park ticket patterns.

## Registry-safe reason

This guide uses a new country and a specific operational angle: Victoria Falls Rainforest gate-fee choice plus spray-season wet-visit planning. The angle is adjacent to other official-fee guides, but the country, site, source set, fee structure, and spray-season decision problem are not represented in the registry.
