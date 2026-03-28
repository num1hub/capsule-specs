# Contract References

This directory contains compact machine-readable reference artifacts for consumers that need canonical enums, gate IDs, validator option flags, and published validator route constants without parsing the larger schema and prose surfaces first.

These files are convenience artifacts. They do not outrank the stronger source layers:

- `schemas/capsule-schema.json`
- `schemas/neuro-concentrate.schema.json`
- `schemas/validator-api-envelopes.schema.json`
- `docs/16-gates.md`
- the curated raw law-adjacent capsules in `capsules/`

## Files

- `contract-constants.json`
  Compact constants for root keys, metadata enums, relation types, confidence-vector dimensions, and validator option/severity enums.
- `validation-gates.json`
  Compact ordered gate-family map and gate summaries for `G01` through `G16`.
- `validator-routes.json`
  Compact published validator route map covering the `validate`, `batch`, `fix`, `stats`, and `gates` HTTP surfaces.

## Why this layer exists

Tool-builders often need a small stable reference surface for UI pickers, code generation defaults, CLI validation hints, and quick contract audits. This directory publishes that narrower surface without pretending it replaces the stronger schemas, OpenAPI, or live validator behavior.
