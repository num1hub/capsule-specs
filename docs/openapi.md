# OpenAPI Reference

The published validator OpenAPI document lives at [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json).

If you need smaller machine-readable route and envelope-family maps instead of the full OpenAPI document, also inspect [`../references/validator-routes.json`](../references/validator-routes.json), [`../references/validator-envelope-families.json`](../references/validator-envelope-families.json), and the TypeScript convenience layers [`../projections/typescript/validator-routes.ts`](../projections/typescript/validator-routes.ts) and [`../projections/typescript/validator-envelope-families.ts`](../projections/typescript/validator-envelope-families.ts). The compact route layer now carries auth posture, bounded query-parameter metadata, and response-status-to-envelope mappings, but OpenAPI remains the stronger source for full route semantics.

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
- [`route-reference.md`](route-reference.md)
- [`../examples/api/`](../examples/api/)
- [`failure-model.md`](failure-model.md)

## Direct consumer recipes

Use these when you want to read the strongest published route contract directly instead of reconstructing behavior from compact summaries:

- [`../examples/client/ts-openapi-route-summary.ts`](../examples/client/ts-openapi-route-summary.ts)
- [`openapi-codegen-recipes.md`](openapi-codegen-recipes.md)
- [`../examples/client/cjs-package-openapi-reference.cjs`](../examples/client/cjs-package-openapi-reference.cjs)
- [`../examples/client/esm-package-openapi-reference.mjs`](../examples/client/esm-package-openapi-reference.mjs)
- [`../examples/client/ts-package-openapi-reference.ts`](../examples/client/ts-package-openapi-reference.ts)
- [`../examples/client/python-openapi-reference.py`](../examples/client/python-openapi-reference.py)

These recipes prove that consumers can inspect the published OpenAPI document directly from a repo checkout, a packed package artifact, or an extracted package tree to recover the validator route family, bearer-auth posture, bounded `stats` query metadata, and response-status coverage without depending on private runtime code or immediately dropping to the compact route map first. If you want generator-oriented output instead of route inspection, use [`openapi-codegen-recipes.md`](openapi-codegen-recipes.md) for the `openapi-typescript` path across repo-local, CommonJS, ESM, and TypeScript package-consumer styles.

## Important note

The OpenAPI document is a projection artifact from the live validator surface. The validator implementation remains the stronger source of truth for fine-grained runtime behavior.

## Recommended reading order for integrators

1. [`schema-family-reference.md`](schema-family-reference.md)
2. [`schema-reference.md`](schema-reference.md)
3. [`api-envelopes.md`](api-envelopes.md)
4. [`integration-guide.md`](integration-guide.md)
5. [`compatibility.md`](compatibility.md)
