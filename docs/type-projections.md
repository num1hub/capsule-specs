# Type Projections

This repository publishes a narrow projection layer for TypeScript and Zod consumers who want something more ergonomic than raw JSON Schema alone.

## Surfaces

- [`../projections/typescript/capsule.ts`](../projections/typescript/capsule.ts)
  Public-safe TypeScript interfaces and literal unions for the capsule outer shape.
- [`../projections/typescript/validator-api.ts`](../projections/typescript/validator-api.ts)
  Public-safe TypeScript interfaces for validator request and response envelopes.
- [`../projections/typescript/index.ts`](../projections/typescript/index.ts)
  Bundle entrypoint for the public-safe TypeScript surface.
- [`../projections/zod/capsule.ts`](../projections/zod/capsule.ts)
  Public-safe Zod projections for the same outer contract.
- [`../projections/zod/validator-api.ts`](../projections/zod/validator-api.ts)
  Public-safe Zod projections for validator envelope parsing and validation.
- [`../projections/zod/index.ts`](../projections/zod/index.ts)
  Bundle entrypoint for the public-safe Zod surface.
- [`npm-consumption.md`](npm-consumption.md)
  Consumer guide for the built package-export surface.
- [`../examples/client/ts-capsule-summary.ts`](../examples/client/ts-capsule-summary.ts)
  Minimal TypeScript consumer recipe for the published projection layer.
- [`../examples/client/zod-parse-capsule.ts`](../examples/client/zod-parse-capsule.ts)
  Minimal Zod parsing recipe for the same public-safe projection layer.
- [`../examples/client/ts-build-validate-request.ts`](../examples/client/ts-build-validate-request.ts)
  Minimal TypeScript recipe for building a validator request envelope from the published API projection.
- [`../examples/client/ts-build-validate-batch-request.ts`](../examples/client/ts-build-validate-batch-request.ts)
  Minimal TypeScript recipe for building a validator batch request envelope from the published API projection.
- [`../examples/client/ts-build-validate-fix-request.ts`](../examples/client/ts-build-validate-fix-request.ts)
  Minimal TypeScript recipe for building a validator fix request envelope from the published API projection.
- [`../examples/client/ts-parse-validate-responses.ts`](../examples/client/ts-parse-validate-responses.ts)
  Minimal TypeScript recipe for typing the published pass, fail, batch, and fix validator response families through the public projection layer.
- [`../examples/client/ts-parse-error-responses.ts`](../examples/client/ts-parse-error-responses.ts)
  Minimal TypeScript recipe for typing the published generic, unauthorized, conflict, and rate-limit error envelopes through the public projection layer.
- [`../examples/client/ts-parse-support-responses.ts`](../examples/client/ts-parse-support-responses.ts)
  Minimal TypeScript recipe for typing the published `gates` and `stats` support responses through the public projection layer.
- [`../examples/client/zod-parse-validate-response.ts`](../examples/client/zod-parse-validate-response.ts)
  Minimal Zod recipe for parsing a validator response envelope through the public projection layer.
- [`../examples/client/zod-parse-validate-batch-response.ts`](../examples/client/zod-parse-validate-batch-response.ts)
  Minimal Zod recipe for parsing a validator batch response envelope through the public projection layer.
- [`../examples/client/zod-parse-validate-fix-response.ts`](../examples/client/zod-parse-validate-fix-response.ts)
  Minimal Zod recipe for parsing a validator fix response envelope through the public projection layer.
- [`../examples/client/zod-parse-error-responses.ts`](../examples/client/zod-parse-error-responses.ts)
  Minimal Zod recipe for parsing the published generic, unauthorized, conflict, and rate-limit error envelopes through the public projection layer.
- [`../examples/client/zod-parse-support-responses.ts`](../examples/client/zod-parse-support-responses.ts)
  Minimal Zod recipe for parsing the published `gates` and `stats` support responses through the public projection layer.
- [`../examples/client/cjs-package-capsule-summary.cjs`](../examples/client/cjs-package-capsule-summary.cjs)
  Minimal CommonJS recipe that consumes the built package exports.
- [`../examples/client/cjs-package-validate-response.cjs`](../examples/client/cjs-package-validate-response.cjs)
  Minimal CommonJS recipe that consumes the built validator API package exports for the published pass, fail, batch, and fix response families.
- [`../examples/client/esm-package-capsule-summary.mjs`](../examples/client/esm-package-capsule-summary.mjs)
  Minimal ESM recipe that consumes the built capsule package exports.
- [`../examples/client/esm-package-validate-response.mjs`](../examples/client/esm-package-validate-response.mjs)
  Minimal ESM recipe that consumes the built validator API package exports for the published pass, fail, batch, and fix response families.
- [`../examples/client/ts-package-validate-request.ts`](../examples/client/ts-package-validate-request.ts)
  Minimal TypeScript package-consumer recipe for typed single-request construction through the published capsule and validator API package subpaths.
- [`../examples/client/ts-package-validate-batch-request.ts`](../examples/client/ts-package-validate-batch-request.ts)
  Minimal TypeScript package-consumer recipe for typed batch-request construction through installed package exports.
- [`../examples/client/ts-package-validate-fix-request.ts`](../examples/client/ts-package-validate-fix-request.ts)
  Minimal TypeScript package-consumer recipe for typed fix-request construction through installed package exports.
- [`../examples/client/ts-package-validate-responses.ts`](../examples/client/ts-package-validate-responses.ts)
  Minimal TypeScript package-consumer recipe for typed pass, fail, batch, and fix validator response-family handling through installed package exports.
- [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
  The stronger machine-readable contract surface these projections are aligned to.
- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
  The stronger machine-readable contract surface for validator request and response envelopes.

## Why this exists

JSON Schema is the canonical public machine-readable contract in this repository, but downstream consumers often need:

- TypeScript types for editors and static tooling
- Zod schemas for local validation and application-level parsing
- a narrow source-level projection that stays reviewable inside the public repo
- a public-safe source-level envelope layer for validator clients that do not want to hand-roll request and response shapes
- a source-level path for batch and fix validator envelopes that stays aligned to the published sample payload families
- an installed-package TypeScript path for single, batch, and fix validator request-family typing without repo-relative imports
- a source-level path for typed validate-response families that stays aligned to the published pass, fail, batch, and fix samples
- a source-level path for bounded shared error-envelope typing and parsing that stays aligned to the published sample payloads
- a source-level path for support-response typing and parsing that stays aligned to the published sample payloads

## Important boundaries

- These files are convenience projections, not the sovereign validator.
- They intentionally cover the public outer capsule shape and documented validator envelope layer, not every private runtime rule.
- The live validator and the published JSON Schemas remain the stronger source of truth for edge-case semantics.
- The built package-consumer layer is convenience packaging around the same maintained source projections.
- The package-style TypeScript recipe is typechecked repo-locally and its install path is checked from a fresh TypeScript consumer so package-level type resolution is not left as an untested assumption.

## Verification

Run `npm run check:type-projections`.
Run `npm run check:package-surface` to build and validate the package-export layer.
Run `npm run check:package-install` to verify that the packed artifact installs and runs in fresh CommonJS, ESM, and TypeScript consumer projects.
