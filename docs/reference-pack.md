# Reference Pack

This guide covers the compact machine-readable reference artifacts under [`../references/`](../references/).

Use this layer when you want canonical enums, gate IDs, and validator option flags quickly without parsing the larger schema or prose surfaces first.

## What this layer publishes

- [`../references/contract-constants.json`](../references/contract-constants.json)
  Compact constants for:
  - the canonical five root keys
  - `metadata.type`, `metadata.subtype`, and `metadata.status` enums
  - `relation_type` enums
  - confidence-vector dimensions and bounds
  - validator option flags and gate-severity enum values
- [`../references/validation-gates.json`](../references/validation-gates.json)
  Compact ordered gate-family map and short summaries for `G01` through `G16`

## When to use it

Use the reference pack when you are building:

- UI pickers for capsule metadata enums
- lint rules that need canonical relation types
- tool-builder defaults for confidence-vector dimensions
- CLI hints, dashboards, or docs generators that need the ordered gate list

## What stays stronger than this layer

This pack is a convenience layer. It does not outrank:

- [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
- [`../schemas/neuro-concentrate.schema.json`](../schemas/neuro-concentrate.schema.json)
- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
- [`16-gates.md`](16-gates.md)
- [`../capsules/`](../capsules/)

If you need full artifact shape, use the schemas. If you need HTTP route semantics, use OpenAPI. If you need law-adjacent source material, use the curated raw capsules.

## Package subpaths

The package surface exports these files directly:

- `@num1hub/capsule-specs/references/contract-constants.json`
- `@num1hub/capsule-specs/references/validation-gates.json`

See also:

- [`npm-consumption.md`](npm-consumption.md)
- [`integration-guide.md`](integration-guide.md)
- [`../examples/client/cjs-package-contract-reference.cjs`](../examples/client/cjs-package-contract-reference.cjs)
- [`../examples/client/ts-package-contract-reference.ts`](../examples/client/ts-package-contract-reference.ts)
