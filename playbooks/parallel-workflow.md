# Parallel Workflow For Guide Operations

Use this playbook when more than one agent or run may work on guide content at
the same time.

## Ownership Unit

The ownership unit is `translationGroupId`.

- One write owner per `translationGroupId`.
- Other agents may read the group but must not edit it.
- DB rows, payload files, review patches, and registry entries for the same
  group follow the same ownership rule.

## Safe Parallel Work

Parallelize only when inputs are frozen and ownership is disjoint:

- official source checks by independent source
- localization groups after the English master and fact parity map are frozen
- QA checks after all localized records exist
- post-publish review by disjoint `translationGroupId` or language set

Do not parallelize DB writes, production replication, registry updates, or git
persistence.

## Standard Order

For new guide publication:

1. Choose a registry-safe topic.
2. Build and freeze the source pack.
3. Write and freeze the English master.
4. Write the fact parity map.
5. Localize all 9 supported languages.
6. Run QA and the automated quality gate.
7. Upsert dev DB and verify.
8. Replicate the verified group to production when required.
9. Update the registry from verified DB state.

For repair or review:

1. Export the current dev and production records.
2. Build a content-only patch.
3. Validate the patched preview.
4. Apply to dev and verify.
5. Apply the same patch to production and verify.
6. Update durable review state.

## Date Rule

Do not distribute `publishedAt` across artificial dates. Published guide records
use the actual DB write timestamp, shared across the 9 records in the group, and
must not be in the future.

For content-only repairs, preserve existing `publishedAt` unless the user
explicitly asks for a date repair and the DB policy allows it.

## Handoff Minimum

Each handoff should name:

- owner
- `translationGroupId`
- source pack path or export path
- frozen inputs
- output path
- quality gate result
- stop reason or residual risk
