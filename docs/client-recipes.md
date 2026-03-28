# Client Recipes

This page maps the public contract surface to concrete client-side usage patterns.

## Environment model

The example client snippets assume these environment variables:

- `N1HUB_BASE_URL`
  Base URL of the validator service, for example `https://example.n1hub.dev`
- `N1HUB_TOKEN`
  Bearer token for the validator HTTP surface

## cURL recipes

Ready-to-read examples live under [`../examples/client/`](../examples/client/):

- [`curl-validate-single.sh`](../examples/client/curl-validate-single.sh)
- [`curl-validate-batch.sh`](../examples/client/curl-validate-batch.sh)
- [`curl-validate-fix.sh`](../examples/client/curl-validate-fix.sh)
- [`curl-get-gates.sh`](../examples/client/curl-get-gates.sh)
- [`curl-get-stats.sh`](../examples/client/curl-get-stats.sh)

These scripts show the request method, route, auth header, and when applicable the local payload file to send.

## Node recipes

Minimal Node fetch-based examples also live under [`../examples/client/`](../examples/client/):

- [`node-validate-single.mjs`](../examples/client/node-validate-single.mjs)
- [`node-validate-batch.mjs`](../examples/client/node-validate-batch.mjs)
- [`node-validate-fix.mjs`](../examples/client/node-validate-fix.mjs)
- [`node-get-gates.mjs`](../examples/client/node-get-gates.mjs)
- [`node-get-stats.mjs`](../examples/client/node-get-stats.mjs)

They are intentionally small and avoid framework assumptions while covering all published validator routes.

## TypeScript and Zod recipes

Source-level consumer examples also live under [`../examples/client/`](../examples/client/):

- [`ts-capsule-summary.ts`](../examples/client/ts-capsule-summary.ts)
- [`zod-parse-capsule.ts`](../examples/client/zod-parse-capsule.ts)
- [`ts-envelope-family-reference.ts`](../examples/client/ts-envelope-family-reference.ts)
- [`ts-route-behavior-reference.ts`](../examples/client/ts-route-behavior-reference.ts)
- [`ts-build-validate-request.ts`](../examples/client/ts-build-validate-request.ts)
- [`ts-build-validate-batch-request.ts`](../examples/client/ts-build-validate-batch-request.ts)
- [`ts-build-validate-fix-request.ts`](../examples/client/ts-build-validate-fix-request.ts)
- [`ts-live-validator-client.ts`](../examples/client/ts-live-validator-client.ts)
- [`ts-parse-validate-requests.ts`](../examples/client/ts-parse-validate-requests.ts)
- [`zod-parse-validate-request.ts`](../examples/client/zod-parse-validate-request.ts)
- [`zod-parse-validate-batch-request.ts`](../examples/client/zod-parse-validate-batch-request.ts)
- [`zod-parse-validate-fix-request.ts`](../examples/client/zod-parse-validate-fix-request.ts)
- [`ts-parse-validate-responses.ts`](../examples/client/ts-parse-validate-responses.ts)
- [`ts-parse-error-responses.ts`](../examples/client/ts-parse-error-responses.ts)
- [`ts-parse-support-responses.ts`](../examples/client/ts-parse-support-responses.ts)
- [`zod-parse-validate-response.ts`](../examples/client/zod-parse-validate-response.ts)
- [`zod-parse-validate-fail-response.ts`](../examples/client/zod-parse-validate-fail-response.ts)
- [`zod-parse-validate-batch-response.ts`](../examples/client/zod-parse-validate-batch-response.ts)
- [`zod-parse-validate-fix-response.ts`](../examples/client/zod-parse-validate-fix-response.ts)
- [`zod-parse-error-responses.ts`](../examples/client/zod-parse-error-responses.ts)
- [`zod-parse-support-responses.ts`](../examples/client/zod-parse-support-responses.ts)

These recipes demonstrate how to consume the published projection layer under [`../projections/`](../projections/) when you want typed interfaces or Zod parsing in addition to raw JSON Schema, including single, batch, and fix `validate` request families, source-level TypeScript builders plus source-level typed reading of the published request samples, a typed live-client bridge for all published validator routes backed by the shared route projection, a typed validator envelope-family discovery path backed by the shared envelope-family projection, a typed validator route-behavior discovery path backed by the shared route projection and compact route pack, typed/parsing paths for the published pass, fail, batch, and fix response families, the published `gates` / `stats` support responses, and the bounded shared generic, unauthorized, conflict, and rate-limit error envelopes.

## Raw JSON Schema recipes

If you want direct structural validation against the published schemas, inspect:

- [`../examples/client/ajv-validate-capsule.mjs`](../examples/client/ajv-validate-capsule.mjs)
- [`../examples/client/ajv-validate-validator-envelope.mjs`](../examples/client/ajv-validate-validator-envelope.mjs)
- [`../examples/client/ajv-validate-archive-bundle.mjs`](../examples/client/ajv-validate-archive-bundle.mjs)
- [`../examples/client/ajv-validate-schema-bundles.mjs`](../examples/client/ajv-validate-schema-bundles.mjs)
- [`../examples/client/ajv-reject-invalid-archive-bundles.mjs`](../examples/client/ajv-reject-invalid-archive-bundles.mjs)
- [`../examples/client/ajv-reject-invalid-capsules.mjs`](../examples/client/ajv-reject-invalid-capsules.mjs)
- [`../examples/client/ajv-reject-invalid-validator-envelopes.mjs`](../examples/client/ajv-reject-invalid-validator-envelopes.mjs)
- [`schema-bundles.md`](schema-bundles.md)
- [`schema-validation-recipes.md`](schema-validation-recipes.md)
- [`archive-validation-recipes.md`](archive-validation-recipes.md)
- [`invalid-archive-bundle-examples.md`](invalid-archive-bundle-examples.md)
- [`invalid-capsule-examples.md`](invalid-capsule-examples.md)
- [`invalid-api-envelope-examples.md`](invalid-api-envelope-examples.md)

These recipes demonstrate how to validate public examples against the raw JSON Schema layer with Ajv, how to validate the archive-bundle portability sample against its published export/replay contract, how to consume the same contracts as single-file schema bundles, and how to confirm that intentionally invalid archive, capsule, and validator-envelope fixtures are rejected for the documented structural reasons, without relying on the projection layer or live validator API calls.

## Integrity recipes

If you need the public `G16` sealing rule instead of only schema shape, inspect:

- [`../examples/client/recompute-integrity-seal.mjs`](../examples/client/recompute-integrity-seal.mjs)
- [`../examples/client/esm-package-recompute-integrity-seal.mjs`](../examples/client/esm-package-recompute-integrity-seal.mjs)
- [`integrity-recipes.md`](integrity-recipes.md)

These recipes demonstrate how to recompute `integrity_sha3_512` over the published four-root payload, verify that the positive examples are sealed correctly, and repair the intentional `G16` teaching example without depending on private runtime helpers.

## Python recipes

If you need a cross-language raw-asset consumption path outside the Node runtime, inspect:

- [`../examples/client/python-contract-reference.py`](../examples/client/python-contract-reference.py)
- [`../examples/client/python-recompute-integrity-seal.py`](../examples/client/python-recompute-integrity-seal.py)
- [`../examples/client/python-validate-single.py`](../examples/client/python-validate-single.py)
- [`../examples/client/python-validate-batch.py`](../examples/client/python-validate-batch.py)
- [`../examples/client/python-validate-fix.py`](../examples/client/python-validate-fix.py)
- [`../examples/client/python-get-gates.py`](../examples/client/python-get-gates.py)
- [`../examples/client/python-get-stats.py`](../examples/client/python-get-stats.py)
- [`../examples/client/python-parse-validate-responses.py`](../examples/client/python-parse-validate-responses.py)
- [`../examples/client/python-parse-support-responses.py`](../examples/client/python-parse-support-responses.py)
- [`python-consumption.md`](python-consumption.md)

These recipes demonstrate how Python consumers can read compact contract-reference JSON files, including the validator envelope-family map, inspect curated raw capsule assets, prepare validator-envelope request flows for `validate`, `batch`, and `fix`, call the published `gates` and `stats` support routes, parse published validator response families, and recompute `integrity_sha3_512` directly from the published four-root payload, both from a repo checkout and from an extracted packed artifact.

## Package recipes

If you want package-style consumption instead of file-relative source imports, also inspect:

- [`../examples/client/cjs-package-capsule-summary.cjs`](../examples/client/cjs-package-capsule-summary.cjs)
- [`../examples/client/cjs-package-contract-reference.cjs`](../examples/client/cjs-package-contract-reference.cjs)
- [`../examples/client/cjs-package-error-responses.cjs`](../examples/client/cjs-package-error-responses.cjs)
- [`../examples/client/cjs-package-validate-request.cjs`](../examples/client/cjs-package-validate-request.cjs)
- [`../examples/client/cjs-package-support-responses.cjs`](../examples/client/cjs-package-support-responses.cjs)
- [`../examples/client/cjs-package-validate-response.cjs`](../examples/client/cjs-package-validate-response.cjs)
- [`../examples/client/esm-package-capsule-summary.mjs`](../examples/client/esm-package-capsule-summary.mjs)
- [`../examples/client/esm-package-error-responses.mjs`](../examples/client/esm-package-error-responses.mjs)
- [`../examples/client/esm-package-validate-request.mjs`](../examples/client/esm-package-validate-request.mjs)
- [`../examples/client/esm-package-support-responses.mjs`](../examples/client/esm-package-support-responses.mjs)
- [`../examples/client/esm-package-ajv-validate-contracts.mjs`](../examples/client/esm-package-ajv-validate-contracts.mjs)
- [`../examples/client/esm-package-ajv-validate-archive-bundle.mjs`](../examples/client/esm-package-ajv-validate-archive-bundle.mjs)
- [`../examples/client/esm-package-ajv-validate-schema-bundles.mjs`](../examples/client/esm-package-ajv-validate-schema-bundles.mjs)
- [`../examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs`](../examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs)
- [`../examples/client/esm-package-ajv-reject-invalid-capsules.mjs`](../examples/client/esm-package-ajv-reject-invalid-capsules.mjs)
- [`../examples/client/esm-package-ajv-reject-invalid-validator-envelopes.mjs`](../examples/client/esm-package-ajv-reject-invalid-validator-envelopes.mjs)
- [`../examples/client/esm-package-validate-response.mjs`](../examples/client/esm-package-validate-response.mjs)
- [`../examples/client/ts-package-contract-reference.ts`](../examples/client/ts-package-contract-reference.ts)
- [`../examples/client/ts-package-error-responses.ts`](../examples/client/ts-package-error-responses.ts)
- [`../examples/client/ts-package-live-validator-client.ts`](../examples/client/ts-package-live-validator-client.ts)
- [`../examples/client/ts-package-support-responses.ts`](../examples/client/ts-package-support-responses.ts)
- [`../examples/client/ts-package-validate-responses.ts`](../examples/client/ts-package-validate-responses.ts)
- [`../examples/client/ts-package-validate-request.ts`](../examples/client/ts-package-validate-request.ts)
- [`../examples/client/ts-package-parse-validate-requests.ts`](../examples/client/ts-package-parse-validate-requests.ts)
- [`../examples/client/ts-package-validate-batch-request.ts`](../examples/client/ts-package-validate-batch-request.ts)
- [`../examples/client/ts-package-validate-fix-request.ts`](../examples/client/ts-package-validate-fix-request.ts)
- [`npm-consumption.md`](npm-consumption.md)

These recipes demonstrate the repo-owned package-export layer for CommonJS, ESM, and TypeScript consumers after `npm run build:projections` or from a locally packed artifact, including installed-package runtime parsing plus installed-package TypeScript typed construction and typed reading for the published single, batch, and fix validator request families, an installed-package typed live-client bridge for all published validator routes backed by the shared route projection, installed-package typed discovery of the published validator envelope-family map, installed-package parsing and typing for the published pass, fail, batch, and fix validator response families, the compact reference-pack JSON exports, installed-package parsing of `gates` and `stats` support responses, installed-package parsing and typing for the bounded shared generic, unauthorized, conflict, and rate-limit error envelopes, positive raw-schema Ajv consumption, archive-bundle schema validation, bundled single-file schema consumption, package-level rejection of intentionally invalid archive, capsule, and validator-envelope fixtures through package subpaths, and package-level recomputation of integrity seals for `G16`-sensitive flows. If you need the same public JSON artifacts from Python instead of Node imports, use the extracted-artifact path documented in [`python-consumption.md`](python-consumption.md).

## Route mapping

- `curl-validate-single.sh` and `node-validate-single.mjs`
  Use `POST /api/validate`
- `curl-validate-batch.sh` and `node-validate-batch.mjs`
  Use `POST /api/validate/batch`
- `curl-validate-fix.sh` and `node-validate-fix.mjs`
  Use `POST /api/validate/fix`
- `curl-get-gates.sh`, `node-get-gates.mjs`, and `python-get-gates.py`
  Use `GET /api/validate/gates`
- `curl-get-stats.sh`, `node-get-stats.mjs`, and `python-get-stats.py`
  Use `GET /api/validate/stats`
- `python-validate-single.py`, `python-validate-batch.py`, and `python-validate-fix.py`
  Mirror the three published POST validator routes from a cross-language raw-JSON path
- `python-parse-validate-responses.py` and `python-parse-support-responses.py`
  Inspect the published response families without requiring live credentials

## Why these recipes exist

The JSON request and response examples show contract shape. The client recipes show how a consumer actually sends or reads those payloads across every published validator route. Together they reduce the gap between “the contract is documented” and “an external integrator can use it quickly.”
