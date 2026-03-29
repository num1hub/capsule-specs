# OpenAPI Codegen Recipes

This guide covers direct type generation from the published OpenAPI document with `openapi-typescript`.

Use this path when you want generated route-level TypeScript types from the strongest published HTTP contract instead of relying only on hand-maintained projections or compact route summaries.

## Why this exists

The repository already publishes:

- the stronger OpenAPI contract at [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- compact route summaries under [`../references/validator-routes.json`](../references/validator-routes.json)
- maintained TypeScript and Zod convenience projections under [`../projections/`](../projections/)

Those layers answer different needs. The codegen recipes here prove that external tool-builders can point a standard OpenAPI code generator at the published validator contract and recover route keys, query metadata, and response typing without private runtime access.

## Repo-local recipe

Use [`../examples/client/openapi-generate-validator-types.mjs`](../examples/client/openapi-generate-validator-types.mjs) when you want to generate TypeScript declarations directly from the repo checkout.

That recipe:

- runs `openapi-typescript` against [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- emits a temporary `.d.ts` file
- asserts that the generated output still covers:
  - all 5 published validator routes
  - the bounded `limit` query parameter on `GET /api/validate/stats`
  - generated references to `ValidateResponse` and `RateLimitErrorResponse`

## Installed-package recipes

Use these when you want the same path from an installed or packed artifact:

- [`../examples/client/cjs-package-openapi-codegen.cjs`](../examples/client/cjs-package-openapi-codegen.cjs)
- [`../examples/client/esm-package-openapi-codegen.mjs`](../examples/client/esm-package-openapi-codegen.mjs)
- [`../examples/client/ts-package-openapi-codegen.ts`](../examples/client/ts-package-openapi-codegen.ts)

Together these recipes prove three public-safe package-consumer patterns:

- CommonJS can resolve the packaged OpenAPI path directly with `require.resolve(...)`
- ESM can import the packaged OpenAPI JSON and feed it into `openapi-typescript`
- TypeScript can resolve the packaged OpenAPI path with `createRequire(import.meta.url)` and still keep the generator wiring copyable and typed

All three installed-package recipes assert that generated output still covers:

- all 5 published validator routes
- the bounded `limit` query parameter on `GET /api/validate/stats`
- generated references to `ValidateResponse` and `RateLimitErrorResponse`

## Verification

- `npm run check:openapi-codegen`
- `npm run check:package-install`

The first command verifies the repo-local recipe and docs. The second command proves that the packed artifact still supports installed-package OpenAPI codegen from a fresh consumer project.

## Important note

This is a convenience consumer path over the stronger OpenAPI artifact. It does not outrank:

- [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- [`openapi.md`](openapi.md)
- live validator behavior

If route semantics or runtime edge cases matter more than generated TypeScript declarations, return to the stronger OpenAPI and validator-facing docs first.
