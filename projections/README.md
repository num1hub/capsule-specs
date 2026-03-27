# Type Projections

This directory publishes public-safe projection artifacts for downstream TypeScript and Zod consumers.

## Files

- `typescript/capsule.ts`
  Narrow TypeScript interfaces and literal unions for the capsule outer shape.
- `zod/capsule.ts`
  Narrow Zod projections for the same outer capsule contract.
- `../examples/client/ts-capsule-summary.ts`
  Minimal source-level consumer recipe using the published TypeScript projection.
- `../examples/client/zod-parse-capsule.ts`
  Minimal source-level consumer recipe using the published Zod projection.

## Boundaries

- These projections are convenience artifacts for tool-builders and integrators.
- The JSON Schemas in `schemas/` remain the canonical machine-readable contract surfaces.
- The live validator remains the stronger source of truth for edge-case semantics and admission behavior.

## Verification

Run `npm run check:type-projections` to typecheck the projection layer.
