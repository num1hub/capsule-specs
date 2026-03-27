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

## Notes

- These examples assume `N1HUB_BASE_URL` and `N1HUB_TOKEN` are set.
- They are intentionally small and public-safe.
- They demonstrate route usage, not deployment-specific infrastructure.
- The TypeScript recipes demonstrate source-level consumer usage of the published projection layer under `projections/`.
