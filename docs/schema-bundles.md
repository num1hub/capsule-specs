# Schema Bundles

This guide covers the single-file bundled schema layer for consumers who want public JSON Schemas without multi-file `$ref` wiring.

Use this path when you want:

- one-file schema imports for Ajv or code-generation tooling
- a simpler package-consumer path than manually adding `capsule-schema.json` plus `neuro-concentrate.schema.json`
- a public-safe contract layer that stays subordinate to the stronger raw schema, OpenAPI, and live-validator surfaces

## Published bundle files

- [`../schemas/capsule-schema.bundle.json`](../schemas/capsule-schema.bundle.json)
  Single-file bundle for the five-element capsule contract with the neuro-concentrate sub-schema inlined under `$defs`.
- [`../schemas/validator-api-envelopes.bundle.json`](../schemas/validator-api-envelopes.bundle.json)
  Single-file bundle for validator request and response envelopes with the capsule and neuro-concentrate contracts inlined under `$defs`.

## When to choose bundles instead of raw schemas

Choose the bundled schema files when you want a single artifact per contract family.

- choose raw schemas when your tooling already supports multi-file `$ref` resolution cleanly
- choose bundled schemas when you want fewer imports and less setup
- choose TypeScript or Zod projections when you want typed ergonomics instead of raw schema work
- choose OpenAPI and validator docs when runtime route behavior matters more than pure object shape

## Repo-local consumer recipes

Start with:

- [`../examples/client/ajv-validate-schema-bundles.mjs`](../examples/client/ajv-validate-schema-bundles.mjs)
- [`schema-validation-recipes.md`](schema-validation-recipes.md)

That recipe validates:

- a public capsule example against `capsule-schema.bundle.json`
- a validator request example against `validator-api-envelopes.bundle.json`
- a validator pass-response example against `validator-api-envelopes.bundle.json`

## Package-consumer recipe

If you want the same single-file path from an installed tarball or future registry publication, use:

- [`../examples/client/esm-package-ajv-validate-schema-bundles.mjs`](../examples/client/esm-package-ajv-validate-schema-bundles.mjs)
- [`npm-consumption.md`](npm-consumption.md)

That recipe consumes:

- `@num1hub/capsule-specs/schemas/capsule-schema.bundle.json`
- `@num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json`
- published example capsule and API payload files from package exports

The fresh-install proof for that path lives in [`../scripts/check-package-install.js`](../scripts/check-package-install.js).

## Important boundaries

- The single-file bundles are convenience artifacts, not stronger sources than the canonical raw schemas.
- The bundle files exist to simplify consumer wiring, not to redefine validator semantics.
- The live validator, OpenAPI surface, and validator-facing docs remain stronger for edge-case runtime behavior.

## Verification

- `npm run build:schema-bundles`
- `npm run check:schema-bundles`
- `npm run check:schema-recipes`
- `npm run check:package-install`
- `npm run check:package-surface`
