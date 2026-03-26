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

## Important note

The OpenAPI document is a projection artifact from the live validator surface. The validator implementation remains the stronger source of truth for fine-grained runtime behavior.
