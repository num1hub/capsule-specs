# Reference Pack

This guide covers the compact machine-readable reference artifacts under [`../references/`](../references/).

Use this layer when you want canonical enums, gate IDs, validator option flags, and published validator route constants quickly without parsing the larger schema or prose surfaces first.

## What this layer publishes

- [`../references/contract-constants.json`](../references/contract-constants.json)
  Compact constants for:
  - the canonical five root keys
  - the four-root integrity payload scope and canonicalization rule used for `G16`
  - `metadata.type`, `metadata.subtype`, and `metadata.status` enums
  - `relation_type` enums
  - confidence-vector dimensions and bounds
  - validator option flags and gate-severity enum values
- [`../references/validation-gates.json`](../references/validation-gates.json)
  Compact ordered gate-family map and short summaries for `G01` through `G16`
- [`../references/validator-envelope-families.json`](../references/validator-envelope-families.json)
  Compact request-family, response-family, and shared-definition map for the published validator envelope layer
- [`../references/validator-routes.json`](../references/validator-routes.json)
  Compact published validator route map covering `POST /api/validate`, `POST /api/validate/batch`, `POST /api/validate/fix`, `GET /api/validate/stats`, and `GET /api/validate/gates`, including bearer-auth posture, request-family linkage, bounded query-parameter metadata, and response status mappings with explicit public example files for the currently documented non-2xx statuses

## When to use it

Use the reference pack when you are building:

- UI pickers for capsule metadata enums
- lint rules that need canonical relation types
- tool-builder defaults for confidence-vector dimensions
- integrity-seal recomputation helpers that need the bounded root scope without parsing the full prose stack
- CLI hints, dashboards, or docs generators that need the ordered gate list
- SDK generators or contract explorers that need the published validator request/response family map without walking schema defs by hand
- HTTP clients or route mappers that need published validator paths, auth/query expectations, and response status mappings without scraping OpenAPI first

## What stays stronger than this layer

This pack is a convenience layer. It does not outrank:

- [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
- [`../schemas/neuro-concentrate.schema.json`](../schemas/neuro-concentrate.schema.json)
- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
- [`16-gates.md`](16-gates.md)
- [`../capsules/`](../capsules/)

If you need full artifact shape, use the schemas. If you need HTTP route semantics, use OpenAPI. If you need law-adjacent source material, use the curated raw capsules.

The compact validator-route and envelope-family layers are also checked directly against the stronger OpenAPI artifact through [`../scripts/check-openapi-coherence.js`](../scripts/check-openapi-coherence.js), so route-family discovery does not drift away from the published HTTP contract.

## Package subpaths

The package surface exports these files directly:

- `@num1hub/capsule-specs/references/contract-constants.json`
- `@num1hub/capsule-specs/references/validation-gates.json`
- `@num1hub/capsule-specs/references/validator-envelope-families.json`
- `@num1hub/capsule-specs/references/validator-routes.json`

See also:

- [`npm-consumption.md`](npm-consumption.md)
- [`integration-guide.md`](integration-guide.md)
- [`integrity-recipes.md`](integrity-recipes.md)
- [`python-consumption.md`](python-consumption.md)
- [`../examples/client/cjs-package-contract-reference.cjs`](../examples/client/cjs-package-contract-reference.cjs)
- [`../examples/client/esm-package-contract-reference.mjs`](../examples/client/esm-package-contract-reference.mjs)
- [`../examples/client/ts-package-contract-reference.ts`](../examples/client/ts-package-contract-reference.ts)
- [`../examples/client/ts-route-behavior-reference.ts`](../examples/client/ts-route-behavior-reference.ts)
- [`../examples/client/ts-envelope-family-reference.ts`](../examples/client/ts-envelope-family-reference.ts)
- [`../examples/client/python-contract-reference.py`](../examples/client/python-contract-reference.py)
