# Type Projections

This repository publishes a narrow projection layer for TypeScript and Zod consumers who want something more ergonomic than raw JSON Schema alone.

## Surfaces

- [`../projections/typescript/capsule.ts`](../projections/typescript/capsule.ts)
  Public-safe TypeScript interfaces and literal unions for the capsule outer shape.
- [`../projections/zod/capsule.ts`](../projections/zod/capsule.ts)
  Public-safe Zod projections for the same outer contract.
- [`../examples/client/ts-capsule-summary.ts`](../examples/client/ts-capsule-summary.ts)
  Minimal TypeScript consumer recipe for the published projection layer.
- [`../examples/client/zod-parse-capsule.ts`](../examples/client/zod-parse-capsule.ts)
  Minimal Zod parsing recipe for the same public-safe projection layer.
- [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
  The stronger machine-readable contract surface these projections are aligned to.

## Why this exists

JSON Schema is the canonical public machine-readable contract in this repository, but downstream consumers often need:

- TypeScript types for editors and static tooling
- Zod schemas for local validation and application-level parsing
- a narrow source-level projection that stays reviewable inside the public repo

## Important boundaries

- These files are convenience projections, not the sovereign validator.
- They intentionally cover the public outer capsule shape, not every private runtime rule.
- The live validator and the published JSON Schemas remain the stronger source of truth for edge-case semantics.

## Verification

Run `npm run check:type-projections`.
