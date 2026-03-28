# Integration Guide

This guide shows the safest path for building against the public N1Hub specification surface.

## 1. Start with the contract, not with guesses

- read [`schema-family-reference.md`](schema-family-reference.md)
- read [`schema-reference.md`](schema-reference.md)
- inspect [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
- inspect [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
- inspect [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)

The schema family guide helps you choose the right level first. The schemas and OpenAPI artifacts should then shape your parser, validator client, and payload expectations.

If you need compact enums, gate IDs, or validator option flags for UI pickers, code generators, or CLI hints, also inspect:

- [`reference-pack.md`](reference-pack.md)
- [`../references/contract-constants.json`](../references/contract-constants.json)
- [`../references/validation-gates.json`](../references/validation-gates.json)

If you want a raw JSON Schema validation path instead of the projection layer or the live validator API, also inspect:

- [`schema-validation-recipes.md`](schema-validation-recipes.md)
- [`../examples/client/ajv-validate-capsule.mjs`](../examples/client/ajv-validate-capsule.mjs)
- [`../examples/client/ajv-validate-validator-envelope.mjs`](../examples/client/ajv-validate-validator-envelope.mjs)

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

These are convenience projections for consumer ergonomics, not replacements for the stronger schema and validator surfaces.
If you want package-style consumption from a checkout or packed artifact, use the package subpaths documented in [`npm-consumption.md`](npm-consumption.md).
If you want a fresh-project smoke test instead of a repo-local self-reference, run `npm run check:package-install`.
That check confirms CommonJS runtime usage, ESM runtime usage, raw-schema Ajv usage, and TypeScript type resolution from an installed tarball.
If you want a smaller package surface than the full schemas, the package also exports compact JSON references under `@num1hub/capsule-specs/references/*`.

## 3. Learn the minimal capsule shape

Start with:

- [`../examples/example-note.capsule.json`](../examples/example-note.capsule.json)
- [`../examples/example-task.capsule.json`](../examples/example-task.capsule.json)

These are the smallest public-safe examples that still satisfy the five-element model.

## 4. Learn the failure path early

Read:

- [`../examples/example-validator-invalid-g16.capsule.json`](../examples/example-validator-invalid-g16.capsule.json)
- [`16-gates.md`](16-gates.md)

This helps you distinguish structural validity from trust and sealing.

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
- [`client-recipes.md`](client-recipes.md)

These show how the public examples appear at the validator HTTP boundary for `validate`, `batch`, and `fix` flows.

## 7. Respect the stronger source of truth

This repository is a public projection surface. When edge-case semantics matter:

- prefer the live validator over prose-only inference
- prefer the schema and OpenAPI artifacts over informal assumptions
- check [`compatibility.md`](compatibility.md), [`trust-model.md`](trust-model.md), and [`../VERSIONING.md`](../VERSIONING.md) before depending on a detail

If you want the bounded integrator-specific reading order instead of the general repo path, inspect [`../PUBLIC_AUDIENCE_PATHS.json`](../PUBLIC_AUDIENCE_PATHS.json).

If you want the bounded integrator adoption posture instead of inferring readiness from examples alone, inspect [`../PUBLIC_ADOPTION_READINESS.json`](../PUBLIC_ADOPTION_READINESS.json).

If you want to know when integrator-facing summaries have gone stale relative to current release evidence, inspect [`../PUBLIC_FRESHNESS_MODEL.json`](../PUBLIC_FRESHNESS_MODEL.json).
