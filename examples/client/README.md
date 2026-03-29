# Client Recipes

This directory contains minimal consumer-oriented examples for the published validator HTTP surface.

If you do not know which file to open first, start with `recipe-index.json`. It is the machine-readable navigator for this directory and groups every non-Markdown artifact by runtime, consumption path, and common integration task.

Use `groups[*].recommended_start` when you already know the runtime lane you want. Use `task_entrypoints[*]` when you know the job to do but not yet the best file to open.

## Fast starts

- Live `POST /api/validate`: `curl-validate-single.sh`
- Live `POST /api/validate/batch`: `curl-validate-batch.sh`
- Live `POST /api/validate/fix`: `curl-validate-fix.sh`
- Live `GET /api/validate/gates` and `GET /api/validate/stats`: `curl-get-gates.sh` and `curl-get-stats.sh`
- Node live-client lane: `node-validate-single.mjs`
- Source-level TypeScript navigator lane: `ts-client-recipe-index.ts`
- Source-level request reading: `ts-parse-validate-requests.ts`
- Source-level response reading: `ts-parse-validate-responses.ts`
- Compact reference discovery: `ts-envelope-family-reference.ts`
- Direct OpenAPI reading and codegen: `ts-openapi-route-summary.ts` and `openapi-generate-validator-types.mjs`
- Raw-schema validation and rejection: `ajv-validate-capsule.mjs` and `ajv-reject-invalid-capsules.mjs`
- Python full-route bridge: `python-live-validator-client.py`
- Python navigator lane: `python-client-recipe-index.py`
- Installed-package runtime lane: `cjs-package-live-validator-client.cjs`
- Installed-package navigator lane: `cjs-package-client-recipe-index.cjs`
- Installed-package TypeScript lane: `ts-package-live-validator-client.ts`
- Integrity proof: `recompute-integrity-seal.mjs`

## Full inventory

## Shell recipes

- `curl-validate-single.sh`
- `curl-validate-batch.sh`
- `curl-validate-fix.sh`
- `curl-get-gates.sh`
- `curl-get-stats.sh`

## Node recipes

- `node-validate-single.mjs`
- `node-validate-batch.mjs`
- `node-validate-fix.mjs`
- `node-get-gates.mjs`
- `node-get-stats.mjs`

## Type-level recipes

- `ts-client-recipe-index.ts`
- `ts-capsule-summary.ts`
- `zod-parse-capsule.ts`
- `ts-openapi-route-summary.ts`
- `openapi-generate-validator-types.mjs`
- `ts-envelope-family-reference.ts`
- `ts-route-behavior-reference.ts`
- `ts-build-validate-request.ts`
- `ts-build-validate-batch-request.ts`
- `ts-build-validate-fix-request.ts`
- `ts-live-validator-client.ts`
- `ts-parse-validate-requests.ts`
- `zod-parse-validate-request.ts`
- `zod-parse-validate-batch-request.ts`
- `zod-parse-validate-fix-request.ts`
- `ts-parse-validate-responses.ts`
- `ts-parse-error-responses.ts`
- `ts-parse-support-responses.ts`
- `zod-parse-validate-response.ts`
- `zod-parse-validate-fail-response.ts`
- `zod-parse-validate-batch-response.ts`
- `zod-parse-validate-fix-response.ts`
- `zod-parse-error-responses.ts`
- `zod-parse-support-responses.ts`

## Raw schema recipes

- `ajv-validate-capsule.mjs`
- `ajv-validate-validator-envelope.mjs`
- `ajv-validate-archive-bundle.mjs`
- `ajv-validate-schema-bundles.mjs`
- `ajv-reject-invalid-archive-bundles.mjs`
- `ajv-reject-invalid-capsules.mjs`
- `ajv-reject-invalid-validator-envelopes.mjs`
- `esm-package-ajv-validate-contracts.mjs`
- `esm-package-ajv-validate-archive-bundle.mjs`
- `esm-package-ajv-validate-schema-bundles.mjs`
- `esm-package-ajv-reject-invalid-archive-bundles.mjs`
- `esm-package-ajv-reject-invalid-capsules.mjs`
- `esm-package-ajv-reject-invalid-validator-envelopes.mjs`

## Integrity recipes

- `recompute-integrity-seal.mjs`
- `esm-package-recompute-integrity-seal.mjs`

## Python recipes

- `python-client-recipe-index.py`
- `python-contract-reference.py`
- `python-openapi-reference.py`
- `python-live-validator-client.py`
- `python-recompute-integrity-seal.py`
- `python-validate-single.py`
- `python-validate-batch.py`
- `python-validate-fix.py`
- `python-get-gates.py`
- `python-get-stats.py`
- `python-parse-validate-responses.py`
- `python-parse-error-responses.py`
- `python-parse-support-responses.py`

## Package recipes

- `cjs-package-capsule-summary.cjs`
- `cjs-package-client-recipe-index.cjs`
- `cjs-package-contract-reference.cjs`
- `cjs-package-openapi-codegen.cjs`
- `cjs-package-openapi-reference.cjs`
- `cjs-package-error-responses.cjs`
- `cjs-package-live-validator-client.cjs`
- `cjs-package-validate-request.cjs`
- `cjs-package-support-responses.cjs`
- `cjs-package-validate-response.cjs`
- `esm-package-capsule-summary.mjs`
- `esm-package-client-recipe-index.mjs`
- `esm-package-contract-reference.mjs`
- `esm-package-openapi-codegen.mjs`
- `esm-package-openapi-reference.mjs`
- `esm-package-error-responses.mjs`
- `esm-package-live-validator-client.mjs`
- `esm-package-validate-request.mjs`
- `esm-package-support-responses.mjs`
- `esm-package-validate-response.mjs`
- `ts-package-contract-reference.ts`
- `ts-package-client-recipe-index.ts`
- `ts-package-openapi-codegen.ts`
- `ts-package-openapi-reference.ts`
- `ts-package-error-responses.ts`
- `ts-package-live-validator-client.ts`
- `ts-package-support-responses.ts`
- `ts-package-validate-responses.ts`
- `ts-package-validate-request.ts`
- `ts-package-parse-validate-requests.ts`
- `ts-package-validate-batch-request.ts`
- `ts-package-validate-fix-request.ts`

## Notes

- These examples assume `N1HUB_BASE_URL` and `N1HUB_TOKEN` are set.
- They are intentionally small and public-safe.
- They demonstrate route usage, not deployment-specific infrastructure.
- The TypeScript recipes demonstrate source-level consumer usage of the published projection layer under `projections/`, direct strongest-surface OpenAPI reading from `openapi/validate.openapi.json`, and repo-local OpenAPI type generation through `openapi-typescript`.
- The source-level TypeScript and Zod recipes now cover the published client-recipe navigator as typed contract data, single, batch, and fix `validate` envelopes, request-family building plus sample-driven typed/parsing paths, a direct OpenAPI route-summary path, a direct OpenAPI code-generation path, a compact typed envelope-family reference layer, a compact typed route-behavior reference layer, a typed live-client bridge for all published validator routes backed by shared route constants plus the bounded `stats` query path, the full published pass/fail/batch/fix response family, the published `gates` / `stats` support responses, and the bounded shared generic, unauthorized, forbidden, conflict, and rate-limit error envelopes plus the route-specific stats-computation failure sample.
- The package recipes demonstrate CommonJS, ESM, and TypeScript consumption after `npm run build:projections` or from a packed artifact installed into a fresh project.
- The package recipes and the source-level TypeScript navigator include direct consumption of `examples/client/recipe-index.json`, so installed-package and typed repo-local consumers can recover runtime-lane starts and task entrypoints without first reading the repo checkout.
- The package recipes also cover direct installed-package OpenAPI reading and OpenAPI type generation across CommonJS, ESM, and TypeScript consumer styles, runtime request-family parsing, TypeScript typed reading plus typed single/batch/fix request construction, installed-package CommonJS, ESM, and TypeScript live-client bridges for all published validator routes backed by shared route constants plus the bounded `stats` query path, validator pass/fail/batch/fix response families, compact JSON contract references including the validator envelope-family map and route-behavior summaries, validator support responses, shared error envelopes plus the route-specific stats-computation failure sample, and raw capsule assets in addition to projection exports.
- The raw-schema recipes demonstrate direct Ajv validation against published schema files, the archive-bundle portability schema, single-file schema bundles, package-exported schema assets, and intentionally invalid archive, capsule, and validator-envelope fixtures.
- The integrity recipes demonstrate how to recompute `integrity_sha3_512` over the published four-root payload and how to repair the intentional `G16` teaching example without private runtime helpers.
- The shell, Node, and Python live-route recipes together now cover all published validator routes: `validate`, `batch`, `fix`, `gates`, and `stats`, including the bounded `limit` query path on `stats`.
- The Python recipes demonstrate non-Node consumption of the published client-recipe navigator, compact JSON references, the strongest-source OpenAPI document, the published validator envelope-family map, a reusable live-client bridge backed by the published route pack, validator-envelope request flows, validate/error/support response parsing including the route-specific stats-computation failure sample, live support-route reads, and public seal proofs from a repo checkout or extracted packed artifact.
