# Integration Guide

This guide shows the safest path for building against the public N1Hub specification surface.

## 1. Start with the contract, not with guesses

- read [`schema-family-reference.md`](schema-family-reference.md)
- read [`schema-reference.md`](schema-reference.md)
- inspect [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
- inspect [`schema-bundles.md`](schema-bundles.md) if you prefer one-file schema artifacts for code generation, Ajv wiring, or polyglot tooling
- inspect [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
- inspect [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)

The schema family guide helps you choose the right level first. The schemas and OpenAPI artifacts should then shape your parser, validator client, and payload expectations.

If you need compact enums, gate IDs, or validator option flags for UI pickers, code generators, or CLI hints, also inspect:

- [`reference-pack.md`](reference-pack.md)
- [`../references/contract-constants.json`](../references/contract-constants.json)
- [`../references/validation-gates.json`](../references/validation-gates.json)

If you want a raw JSON Schema validation path instead of the projection layer or the live validator API, also inspect:

- [`schema-validation-recipes.md`](schema-validation-recipes.md)
- [`archive-validation-recipes.md`](archive-validation-recipes.md)
- [`invalid-archive-bundle-examples.md`](invalid-archive-bundle-examples.md)
- [`invalid-capsule-examples.md`](invalid-capsule-examples.md)
- [`invalid-api-envelope-examples.md`](invalid-api-envelope-examples.md)
- [`../examples/client/ajv-validate-capsule.mjs`](../examples/client/ajv-validate-capsule.mjs)
- [`../examples/client/ajv-validate-validator-envelope.mjs`](../examples/client/ajv-validate-validator-envelope.mjs)
- [`../examples/client/ajv-validate-archive-bundle.mjs`](../examples/client/ajv-validate-archive-bundle.mjs)
- [`../examples/client/ajv-reject-invalid-archive-bundles.mjs`](../examples/client/ajv-reject-invalid-archive-bundles.mjs)
- [`../examples/client/ajv-validate-schema-bundles.mjs`](../examples/client/ajv-validate-schema-bundles.mjs)
- [`../examples/client/ajv-reject-invalid-capsules.mjs`](../examples/client/ajv-reject-invalid-capsules.mjs)
- [`../examples/client/ajv-reject-invalid-validator-envelopes.mjs`](../examples/client/ajv-reject-invalid-validator-envelopes.mjs)

If you need the exact public sealing rule for `integrity_sha3_512`, also inspect:

- [`integrity-recipes.md`](integrity-recipes.md)
- [`../examples/client/recompute-integrity-seal.mjs`](../examples/client/recompute-integrity-seal.mjs)
- [`../references/contract-constants.json`](../references/contract-constants.json)

If you want the same compact references and public `G16` proof path from Python instead of Node or TypeScript, also inspect:

- [`python-consumption.md`](python-consumption.md)
- [`../examples/client/python-contract-reference.py`](../examples/client/python-contract-reference.py)
- [`../examples/client/python-recompute-integrity-seal.py`](../examples/client/python-recompute-integrity-seal.py)
- [`../examples/client/python-validate-single.py`](../examples/client/python-validate-single.py)
- [`../examples/client/python-validate-batch.py`](../examples/client/python-validate-batch.py)
- [`../examples/client/python-validate-fix.py`](../examples/client/python-validate-fix.py)
- [`../examples/client/python-get-gates.py`](../examples/client/python-get-gates.py)
- [`../examples/client/python-get-stats.py`](../examples/client/python-get-stats.py)
- [`../examples/client/python-parse-validate-responses.py`](../examples/client/python-parse-validate-responses.py)
- [`../examples/client/python-parse-support-responses.py`](../examples/client/python-parse-support-responses.py)

## 2. Add source-level projections where helpful

If your toolchain uses TypeScript or Zod directly, also inspect:

- [`type-projections.md`](type-projections.md)
- [`npm-consumption.md`](npm-consumption.md)
- [`../projections/typescript/capsule.ts`](../projections/typescript/capsule.ts)
- [`../projections/zod/capsule.ts`](../projections/zod/capsule.ts)
- [`../projections/typescript/validator-api.ts`](../projections/typescript/validator-api.ts)
- [`../projections/zod/validator-api.ts`](../projections/zod/validator-api.ts)
- [`../projections/typescript/index.ts`](../projections/typescript/index.ts)
- [`../projections/zod/index.ts`](../projections/zod/index.ts)
- [`../examples/client/ts-package-validate-request.ts`](../examples/client/ts-package-validate-request.ts)
- [`../examples/client/ts-package-validate-batch-request.ts`](../examples/client/ts-package-validate-batch-request.ts)
- [`../examples/client/ts-package-validate-fix-request.ts`](../examples/client/ts-package-validate-fix-request.ts)
- [`../examples/client/zod-parse-validate-request.ts`](../examples/client/zod-parse-validate-request.ts)
- [`../examples/client/zod-parse-validate-batch-request.ts`](../examples/client/zod-parse-validate-batch-request.ts)
- [`../examples/client/zod-parse-validate-fix-request.ts`](../examples/client/zod-parse-validate-fix-request.ts)
- [`../examples/client/ts-build-validate-batch-request.ts`](../examples/client/ts-build-validate-batch-request.ts)
- [`../examples/client/ts-build-validate-fix-request.ts`](../examples/client/ts-build-validate-fix-request.ts)
- [`../examples/client/ts-parse-validate-responses.ts`](../examples/client/ts-parse-validate-responses.ts)
- [`../examples/client/cjs-package-validate-request.cjs`](../examples/client/cjs-package-validate-request.cjs)
- [`../examples/client/esm-package-validate-request.mjs`](../examples/client/esm-package-validate-request.mjs)
- [`../examples/client/esm-package-error-responses.mjs`](../examples/client/esm-package-error-responses.mjs)
- [`../examples/client/esm-package-support-responses.mjs`](../examples/client/esm-package-support-responses.mjs)
- [`../examples/client/esm-package-validate-response.mjs`](../examples/client/esm-package-validate-response.mjs)
- [`../examples/client/ts-package-error-responses.ts`](../examples/client/ts-package-error-responses.ts)
- [`../examples/client/ts-package-support-responses.ts`](../examples/client/ts-package-support-responses.ts)
- [`../examples/client/ts-package-validate-responses.ts`](../examples/client/ts-package-validate-responses.ts)
- [`../examples/client/zod-parse-validate-response.ts`](../examples/client/zod-parse-validate-response.ts)
- [`../examples/client/zod-parse-validate-fail-response.ts`](../examples/client/zod-parse-validate-fail-response.ts)
- [`../examples/client/zod-parse-validate-batch-response.ts`](../examples/client/zod-parse-validate-batch-response.ts)
- [`../examples/client/zod-parse-validate-fix-response.ts`](../examples/client/zod-parse-validate-fix-response.ts)
- [`../examples/client/ts-parse-error-responses.ts`](../examples/client/ts-parse-error-responses.ts)
- [`../examples/client/ts-parse-support-responses.ts`](../examples/client/ts-parse-support-responses.ts)
- [`../examples/client/zod-parse-error-responses.ts`](../examples/client/zod-parse-error-responses.ts)
- [`../examples/client/zod-parse-support-responses.ts`](../examples/client/zod-parse-support-responses.ts)

These are convenience projections for consumer ergonomics, not replacements for the stronger schema and validator surfaces.
If you want repo-relative source-level request construction or response parsing instead of package imports, start with the TypeScript request builders plus the Zod single/batch/fix request parsers under [`../examples/client/`](../examples/client/).
If you need installed-package typed request construction for the published single, batch, and fix validator request families, start with [`../examples/client/ts-package-validate-request.ts`](../examples/client/ts-package-validate-request.ts), [`../examples/client/ts-package-validate-batch-request.ts`](../examples/client/ts-package-validate-batch-request.ts), and [`../examples/client/ts-package-validate-fix-request.ts`](../examples/client/ts-package-validate-fix-request.ts).
If you need installed-package runtime parsing for those published request samples instead of TypeScript-only builders, start with [`../examples/client/cjs-package-validate-request.cjs`](../examples/client/cjs-package-validate-request.cjs) and [`../examples/client/esm-package-validate-request.mjs`](../examples/client/esm-package-validate-request.mjs).
If you need typed repo-relative handling for the published pass, fail, batch, and fix response families, start with [`../examples/client/ts-parse-validate-responses.ts`](../examples/client/ts-parse-validate-responses.ts).
If you need repo-relative Zod parsing for that same published pass/fail/batch/fix response family instead of TypeScript-only narrowing, start with [`../examples/client/zod-parse-validate-response.ts`](../examples/client/zod-parse-validate-response.ts), [`../examples/client/zod-parse-validate-fail-response.ts`](../examples/client/zod-parse-validate-fail-response.ts), [`../examples/client/zod-parse-validate-batch-response.ts`](../examples/client/zod-parse-validate-batch-response.ts), and [`../examples/client/zod-parse-validate-fix-response.ts`](../examples/client/zod-parse-validate-fix-response.ts).
If you need bounded generic, unauthorized, conflict, or rate-limit envelope handling, start with the new error-response recipes under [`../examples/client/`](../examples/client/).
If you want package-style consumption from a checkout or packed artifact, use the package subpaths documented in [`npm-consumption.md`](npm-consumption.md).
If you need the installed-package validate-response family instead of only the positive pass sample, start with [`../examples/client/cjs-package-validate-response.cjs`](../examples/client/cjs-package-validate-response.cjs), [`../examples/client/esm-package-validate-response.mjs`](../examples/client/esm-package-validate-response.mjs), and [`../examples/client/ts-package-validate-responses.ts`](../examples/client/ts-package-validate-responses.ts).
If you need the published `gates` and `stats` support responses from that installed-package path instead of repo-local example files, start with the package support-response recipes under [`../examples/client/`](../examples/client/).
If you need the same bounded shared error envelopes from that installed-package path, start with the package error-response recipes under [`../examples/client/`](../examples/client/).
If you want a fresh-project smoke test instead of a repo-local self-reference, run `npm run check:package-install`.
That check confirms CommonJS runtime usage, ESM runtime usage, installed-package validator request-family typing, installed-package validate-response, support-response, and error-envelope parsing, raw-schema and bundled-schema Ajv usage, and TypeScript type resolution from an installed tarball.
It also confirms packaged structural rejection recipes for intentionally invalid archive, capsule, and validator-envelope fixtures.
For cross-language raw-asset consumption outside the Node runtime, the same tarball can also be unpacked and consumed through the Python recipes documented in [`python-consumption.md`](python-consumption.md), including dry-run/live validator-envelope request flows, live `gates` and `stats` support-route reads, and response-family parsing.
If you want a smaller package surface than the full schemas, the package also exports compact JSON references under `@num1hub/capsule-specs/references/*`.

If your integration path touches portability, export review, or replay-contract tooling instead of validator HTTP routes, also inspect:

- [`archive-bundles.md`](archive-bundles.md)
- [`archive-validation-recipes.md`](archive-validation-recipes.md)
- [`invalid-archive-bundle-examples.md`](invalid-archive-bundle-examples.md)
- [`../schemas/archive-bundle.schema.json`](../schemas/archive-bundle.schema.json)
- [`../examples/archive/archive-bundle.sample.json`](../examples/archive/archive-bundle.sample.json)
- [`../examples/archive-invalid/README.md`](../examples/archive-invalid/README.md)

## 3. Learn the minimal capsule shape

Start with:

- [`../examples/example-note.capsule.json`](../examples/example-note.capsule.json)
- [`../examples/example-task.capsule.json`](../examples/example-task.capsule.json)

These are the smallest public-safe examples that still satisfy the five-element model.

## 4. Learn the failure path early

Read:

- [`invalid-archive-bundle-examples.md`](invalid-archive-bundle-examples.md)
- [`../examples/example-validator-invalid-g16.capsule.json`](../examples/example-validator-invalid-g16.capsule.json)
- [`invalid-capsule-examples.md`](invalid-capsule-examples.md)
- [`invalid-api-envelope-examples.md`](invalid-api-envelope-examples.md)
- [`16-gates.md`](16-gates.md)

This helps you distinguish structural schema rejection from trust- and sealing-level rejection across archive bundles, capsules, and validator HTTP envelopes.

## 5. Learn graph-aware validation

If you need linked examples, use:

- [`../examples/example-project-hub.capsule.json`](../examples/example-project-hub.capsule.json)
- [`../examples/example-known-ids.json`](../examples/example-known-ids.json)

The linked example passes only when known-ID resolution is active.

## 6. Learn the HTTP envelopes

Read:

- [`api-envelopes.md`](api-envelopes.md)
- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
- [`../examples/api/`](../examples/api/)
- [`../examples/api-invalid/`](../examples/api-invalid/)
- [`client-recipes.md`](client-recipes.md)

These show how the public examples appear at the validator HTTP boundary for `validate`, `batch`, `fix`, `gates`, and `stats` flows, plus which intentionally invalid envelope shapes should be rejected directly by the raw schema layer.

## 7. Respect the stronger source of truth

This repository is a public projection surface. When edge-case semantics matter:

- prefer the live validator over prose-only inference
- prefer the schema and OpenAPI artifacts over informal assumptions
- check [`compatibility.md`](compatibility.md), [`trust-model.md`](trust-model.md), and [`../VERSIONING.md`](../VERSIONING.md) before depending on a detail

If you want the bounded integrator-specific reading order instead of the general repo path, inspect [`../PUBLIC_AUDIENCE_PATHS.json`](../PUBLIC_AUDIENCE_PATHS.json).

If you want the bounded integrator adoption posture instead of inferring readiness from examples alone, inspect [`../PUBLIC_ADOPTION_READINESS.json`](../PUBLIC_ADOPTION_READINESS.json).

If you want to know when integrator-facing summaries have gone stale relative to current release evidence, inspect [`../PUBLIC_FRESHNESS_MODEL.json`](../PUBLIC_FRESHNESS_MODEL.json).
