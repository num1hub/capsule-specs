# Client Recipes

This directory contains minimal consumer-oriented examples for the published validator HTTP surface.

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

- `ts-capsule-summary.ts`
- `zod-parse-capsule.ts`
- `ts-build-validate-request.ts`
- `ts-build-validate-batch-request.ts`
- `ts-build-validate-fix-request.ts`
- `ts-parse-validate-responses.ts`
- `ts-parse-error-responses.ts`
- `ts-parse-support-responses.ts`
- `zod-parse-validate-response.ts`
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

- `python-contract-reference.py`
- `python-recompute-integrity-seal.py`
- `python-validate-single.py`
- `python-validate-batch.py`
- `python-validate-fix.py`
- `python-get-gates.py`
- `python-get-stats.py`
- `python-parse-validate-responses.py`
- `python-parse-support-responses.py`

## Package recipes

- `cjs-package-capsule-summary.cjs`
- `cjs-package-contract-reference.cjs`
- `cjs-package-error-responses.cjs`
- `cjs-package-support-responses.cjs`
- `cjs-package-validate-response.cjs`
- `esm-package-capsule-summary.mjs`
- `esm-package-error-responses.mjs`
- `esm-package-support-responses.mjs`
- `esm-package-validate-response.mjs`
- `ts-package-contract-reference.ts`
- `ts-package-error-responses.ts`
- `ts-package-support-responses.ts`
- `ts-package-validate-responses.ts`
- `ts-package-validate-request.ts`

## Notes

- These examples assume `N1HUB_BASE_URL` and `N1HUB_TOKEN` are set.
- They are intentionally small and public-safe.
- They demonstrate route usage, not deployment-specific infrastructure.
- The TypeScript recipes demonstrate source-level consumer usage of the published projection layer under `projections/`.
- The source-level TypeScript and Zod recipes now cover single, batch, and fix `validate` envelopes, typed/parsing paths for the full pass/fail/batch/fix response family, the published `gates` / `stats` support responses, and the bounded shared generic, unauthorized, conflict, and rate-limit error envelopes.
- The package recipes demonstrate CommonJS, ESM, and TypeScript consumption after `npm run build:projections` or from a packed artifact installed into a fresh project.
- The package recipes also cover compact JSON contract references, validator pass/fail/batch/fix response families, validator support responses, shared error envelopes, and raw capsule assets in addition to projection exports.
- The raw-schema recipes demonstrate direct Ajv validation against published schema files, the archive-bundle portability schema, single-file schema bundles, package-exported schema assets, and intentionally invalid archive, capsule, and validator-envelope fixtures.
- The integrity recipes demonstrate how to recompute `integrity_sha3_512` over the published four-root payload and how to repair the intentional `G16` teaching example without private runtime helpers.
- The shell, Node, and Python live-route recipes together now cover all published validator routes: `validate`, `batch`, `fix`, `gates`, and `stats`.
- The Python recipes demonstrate non-Node consumption of compact JSON references, validator-envelope request/response flows, live support-route reads, and public seal proofs from a repo checkout or extracted packed artifact.
