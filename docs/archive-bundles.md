# Archive Bundles

The upstream vault models portability through a typed archive bundle. This repository publishes a public-safe projection of that contract so integrators and reviewers can see the shape without exposing private hosted operations.

## Public bundle shape

The published bundle schema lives at [`../schemas/archive-bundle.schema.json`](../schemas/archive-bundle.schema.json).

The sample payload lives at [`../examples/archive/archive-bundle.sample.json`](../examples/archive/archive-bundle.sample.json).

If you need an executable structural validation path instead of prose alone, also inspect:

- [`archive-validation-recipes.md`](archive-validation-recipes.md)
- [`invalid-archive-bundle-examples.md`](invalid-archive-bundle-examples.md)
- [`../examples/client/ajv-validate-archive-bundle.mjs`](../examples/client/ajv-validate-archive-bundle.mjs)
- [`../examples/client/cjs-package-ajv-validate-archive-bundle.cjs`](../examples/client/cjs-package-ajv-validate-archive-bundle.cjs)
- [`../examples/client/esm-package-ajv-validate-archive-bundle.mjs`](../examples/client/esm-package-ajv-validate-archive-bundle.mjs)
- [`../examples/client/ts-package-ajv-validate-archive-bundle.ts`](../examples/client/ts-package-ajv-validate-archive-bundle.ts)
- [`../examples/client/ajv-reject-invalid-archive-bundles.mjs`](../examples/client/ajv-reject-invalid-archive-bundles.mjs)
- [`../examples/client/cjs-package-ajv-reject-invalid-archive-bundles.cjs`](../examples/client/cjs-package-ajv-reject-invalid-archive-bundles.cjs)
- [`../examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs`](../examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs)
- [`../examples/client/ts-package-ajv-reject-invalid-archive-bundles.ts`](../examples/client/ts-package-ajv-reject-invalid-archive-bundles.ts)

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

If you need intentionally invalid archive fixtures for structural regression tests, use [`invalid-archive-bundle-examples.md`](invalid-archive-bundle-examples.md) and the sibling directory guide in [`../examples/archive-invalid/README.md`](../examples/archive-invalid/README.md). Those artifacts are bounded schema-level rejection targets, not proof of replay-policy or hosted import/export behavior.
