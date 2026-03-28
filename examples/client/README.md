# Client Recipes

This directory contains minimal consumer-oriented examples for the published validator HTTP surface.

## Shell recipes

- `curl-validate-single.sh`
- `curl-validate-batch.sh`
- `curl-validate-fix.sh`

## Node recipes

- `node-validate-single.mjs`
- `node-validate-batch.mjs`

## Type-level recipes

- `ts-capsule-summary.ts`
- `zod-parse-capsule.ts`
- `ts-build-validate-request.ts`
- `zod-parse-validate-response.ts`

## Raw schema recipes

- `ajv-validate-capsule.mjs`
- `ajv-validate-validator-envelope.mjs`
- `esm-package-ajv-validate-contracts.mjs`

## Package recipes

- `cjs-package-capsule-summary.cjs`
- `cjs-package-contract-reference.cjs`
- `cjs-package-validate-response.cjs`
- `esm-package-capsule-summary.mjs`
- `esm-package-validate-response.mjs`
- `ts-package-contract-reference.ts`
- `ts-package-validate-request.ts`

## Notes

- These examples assume `N1HUB_BASE_URL` and `N1HUB_TOKEN` are set.
- They are intentionally small and public-safe.
- They demonstrate route usage, not deployment-specific infrastructure.
- The TypeScript recipes demonstrate source-level consumer usage of the published projection layer under `projections/`.
- The package recipes demonstrate CommonJS, ESM, and TypeScript consumption after `npm run build:projections` or from a packed artifact installed into a fresh project.
- The package recipes also cover compact JSON contract references in addition to projection exports and raw capsule assets.
- The raw-schema recipes demonstrate direct Ajv validation against published schema files and package-exported schema assets.
