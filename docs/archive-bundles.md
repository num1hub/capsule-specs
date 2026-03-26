# Archive Bundles

The upstream vault models portability through a typed archive bundle. This repository publishes a public-safe projection of that contract so integrators and reviewers can see the shape without exposing private hosted operations.

## Public bundle shape

The published bundle schema lives at [`../schemas/archive-bundle.schema.json`](../schemas/archive-bundle.schema.json).

The sample payload lives at [`../examples/archive/archive-bundle.sample.json`](../examples/archive/archive-bundle.sample.json).

## Key fields

- `bundleId`
  Stable identifier for the exported bundle.
- `sourcePolicyId`
  Lifecycle or export policy reference used when the bundle was created.
- `createdAt`
  Export timestamp.
- `sourceRegion`
  Region or locality label for the source environment.
- `tenantScope`
  Indicates whether the bundle is single-tenant, multi-tenant, or regional in scope.
- `compression`
  Declares the bundle compression mode.
- `encryption`
  Declares whether the exported bundle is plain, `age`-encrypted, or wrapped with KMS-envelope semantics.
- `exportEvidenceId`
  Links the bundle to a distinct export-evidence record.
- `manifest`
  Lists the exported entries, their checksums, sizes, content classes, and whether they were redacted.
- `replay`
  Declares the replay guard posture, including validator requirements and duplicate handling.

## Replay posture

The public sample emphasizes validator-aware replay:

- dry-run or validate-first modes should be possible before merge or replace replay
- replay should preserve version history and audit evidence rather than bypassing them
- bundles should fail closed when policy, checksum, or scope evidence is missing

## Important boundary

This repository publishes the archive-bundle contract and trust posture, not a hosted import/export product surface. The goal is reviewability and contract clarity, not a promise that every upstream runtime workflow is public.
