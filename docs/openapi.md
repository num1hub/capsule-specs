# OpenAPI Reference

The published validator OpenAPI document lives at [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json).

## Covered route family

The current OpenAPI surface documents the validator HTTP family:

- `POST /api/validate`
- `POST /api/validate/batch`
- `POST /api/validate/fix`
- `GET /api/validate/stats`
- `GET /api/validate/gates`

## Why this matters

OpenAPI makes the validator boundary easier to consume from outside the full application repository. It also gives reviewers a machine-readable contract instead of forcing them to infer request and response shapes from prose alone.

## Concrete payload examples

Use these when you want sample envelopes instead of just schema-level contract data:

- [`api-envelopes.md`](api-envelopes.md)
- [`../examples/api/`](../examples/api/)

## Important note

The OpenAPI document is a projection artifact from the live validator surface. The validator implementation remains the stronger source of truth for fine-grained runtime behavior.
