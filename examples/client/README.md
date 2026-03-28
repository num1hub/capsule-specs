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
- `ajv-reject-invalid-capsules.mjs`
- `ajv-reject-invalid-validator-envelopes.mjs`
- `esm-package-ajv-validate-contracts.mjs`
- `esm-package-ajv-reject-invalid-capsules.mjs`
- `esm-package-ajv-reject-invalid-validator-envelopes.mjs`

## Integrity recipes

- `recompute-integrity-seal.mjs`
- `esm-package-recompute-integrity-seal.mjs`

## Python recipes

- `python-contract-reference.py`
- `python-recompute-integrity-seal.py`

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
- The raw-schema recipes demonstrate direct Ajv validation against published schema files, package-exported schema assets, and intentionally invalid capsule and validator-envelope fixtures.
- The integrity recipes demonstrate how to recompute `integrity_sha3_512` over the published four-root payload and how to repair the intentional `G16` teaching example without private runtime helpers.
- The Python recipes demonstrate non-Node consumption of compact JSON references and public seal proofs from a repo checkout or extracted packed artifact.
