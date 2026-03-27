# Type Projections

This directory publishes public-safe projection artifacts for downstream TypeScript and Zod consumers.

## Files

- `typescript/capsule.ts`
  Narrow TypeScript interfaces and literal unions for the capsule outer shape.
- `typescript/validator-api.ts`
  Public-safe TypeScript interfaces for validator request and response envelopes.
- `zod/capsule.ts`
  Narrow Zod projections for the same outer capsule contract.
- `zod/validator-api.ts`
  Public-safe Zod projections for validator request and response envelopes.
- `../examples/client/ts-capsule-summary.ts`
  Minimal source-level consumer recipe using the published TypeScript projection.
- `../examples/client/zod-parse-capsule.ts`
  Minimal source-level consumer recipe using the published Zod projection.
- `../examples/client/ts-build-validate-request.ts`
  Minimal source-level consumer recipe for a typed validator request envelope.
- `../examples/client/zod-parse-validate-response.ts`
  Minimal source-level consumer recipe for parsing a validator response envelope.

## Boundaries

- These projections are convenience artifacts for tool-builders and integrators.
- The JSON Schemas in `schemas/` remain the canonical machine-readable contract surfaces.
- The live validator remains the stronger source of truth for edge-case semantics and admission behavior.

## Verification

Run `npm run check:type-projections` to typecheck the projection layer.
