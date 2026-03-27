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

These scripts show the request method, route, auth header, and local payload file to send.

## Node recipes

Minimal Node fetch-based examples also live under [`../examples/client/`](../examples/client/):

- [`node-validate-single.mjs`](../examples/client/node-validate-single.mjs)
- [`node-validate-batch.mjs`](../examples/client/node-validate-batch.mjs)

They are intentionally small and avoid framework assumptions.

## TypeScript and Zod recipes

Source-level consumer examples also live under [`../examples/client/`](../examples/client/):

- [`ts-capsule-summary.ts`](../examples/client/ts-capsule-summary.ts)
- [`zod-parse-capsule.ts`](../examples/client/zod-parse-capsule.ts)
- [`ts-build-validate-request.ts`](../examples/client/ts-build-validate-request.ts)
- [`zod-parse-validate-response.ts`](../examples/client/zod-parse-validate-response.ts)

These recipes demonstrate how to consume the published projection layer under [`../projections/`](../projections/) when you want typed interfaces or Zod parsing in addition to raw JSON Schema.

## Route mapping

- `curl-validate-single.sh` and `node-validate-single.mjs`
  Use `POST /api/validate`
- `curl-validate-batch.sh` and `node-validate-batch.mjs`
  Use `POST /api/validate/batch`
- `curl-validate-fix.sh`
  Uses `POST /api/validate/fix`

## Why these recipes exist

The JSON request and response examples show contract shape. The client recipes show how a consumer actually sends those payloads. Together they reduce the gap between “the contract is documented” and “an external integrator can use it quickly.”
