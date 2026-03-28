# Route Reference

This page maps each published validator route to the strongest public example surfaces in this repository.

If you need the same route family as compact machine-readable data, use [`../references/validator-routes.json`](../references/validator-routes.json). If you need typed route constants and status metadata from the projection layer, use [`../projections/typescript/validator-routes.ts`](../projections/typescript/validator-routes.ts).

## `POST /api/validate`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- request example: [`../examples/api/validate-request.single.json`](../examples/api/validate-request.single.json)
- response example: [`../examples/api/validate-response.pass.json`](../examples/api/validate-response.pass.json)
- common failure example: [`../examples/api/validate-response.fail.json`](../examples/api/validate-response.fail.json)
- live client recipes: [`../examples/client/curl-validate-single.sh`](../examples/client/curl-validate-single.sh), [`../examples/client/node-validate-single.mjs`](../examples/client/node-validate-single.mjs), [`../examples/client/python-validate-single.py`](../examples/client/python-validate-single.py)

## `POST /api/validate/batch`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- request example: [`../examples/api/validate-request.batch.json`](../examples/api/validate-request.batch.json)
- response example: [`../examples/api/validate-response.batch.json`](../examples/api/validate-response.batch.json)
- owner-role failure example: [`../examples/api/forbidden-response.sample.json`](../examples/api/forbidden-response.sample.json)
- live client recipes: [`../examples/client/curl-validate-batch.sh`](../examples/client/curl-validate-batch.sh), [`../examples/client/node-validate-batch.mjs`](../examples/client/node-validate-batch.mjs), [`../examples/client/python-validate-batch.py`](../examples/client/python-validate-batch.py)

## `POST /api/validate/fix`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- request example: [`../examples/api/validate-request.fix.json`](../examples/api/validate-request.fix.json)
- response example: [`../examples/api/validate-response.fix.sample.json`](../examples/api/validate-response.fix.sample.json)
- owner-role failure example: [`../examples/api/forbidden-response.sample.json`](../examples/api/forbidden-response.sample.json)
- live client recipes: [`../examples/client/curl-validate-fix.sh`](../examples/client/curl-validate-fix.sh), [`../examples/client/node-validate-fix.mjs`](../examples/client/node-validate-fix.mjs), [`../examples/client/python-validate-fix.py`](../examples/client/python-validate-fix.py)

## `GET /api/validate/stats`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- bounded query parameter: optional `limit` integer with minimum `1`
- response example: [`../examples/api/stats-response.sample.json`](../examples/api/stats-response.sample.json)
- live client recipes: [`../examples/client/curl-get-stats.sh`](../examples/client/curl-get-stats.sh), [`../examples/client/node-get-stats.mjs`](../examples/client/node-get-stats.mjs), [`../examples/client/python-get-stats.py`](../examples/client/python-get-stats.py)

## `GET /api/validate/gates`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- response example: [`../examples/api/gates-response.sample.json`](../examples/api/gates-response.sample.json)
- live client recipes: [`../examples/client/curl-get-gates.sh`](../examples/client/curl-get-gates.sh), [`../examples/client/node-get-gates.mjs`](../examples/client/node-get-gates.mjs), [`../examples/client/python-get-gates.py`](../examples/client/python-get-gates.py)

## Shared error envelopes

- generic error example: [`../examples/api/error-response.sample.json`](../examples/api/error-response.sample.json)
- unauthorized example: [`../examples/api/unauthorized-response.sample.json`](../examples/api/unauthorized-response.sample.json)
- forbidden example: [`../examples/api/forbidden-response.sample.json`](../examples/api/forbidden-response.sample.json)
- conflict example: [`../examples/api/conflict-response.sample.json`](../examples/api/conflict-response.sample.json)
- rate-limit example: [`../examples/api/rate-limit-response.sample.json`](../examples/api/rate-limit-response.sample.json)
- source-level client recipes: [`../examples/client/ts-parse-error-responses.ts`](../examples/client/ts-parse-error-responses.ts), [`../examples/client/zod-parse-error-responses.ts`](../examples/client/zod-parse-error-responses.ts)
- installed-package client recipes: [`../examples/client/cjs-package-error-responses.cjs`](../examples/client/cjs-package-error-responses.cjs), [`../examples/client/esm-package-error-responses.mjs`](../examples/client/esm-package-error-responses.mjs), [`../examples/client/ts-package-error-responses.ts`](../examples/client/ts-package-error-responses.ts)

## Compact route behavior

The compact route pack in [`../references/validator-routes.json`](../references/validator-routes.json) now carries:

- bearer-auth posture for every published route
- request-family linkage for the three published `POST` envelopes
- bounded query-parameter metadata for `GET /api/validate/stats`
- response-status-to-envelope mappings, including where a public example exists and where the status is documented but currently has no dedicated route-specific sample

Use [`../examples/client/ts-route-behavior-reference.ts`](../examples/client/ts-route-behavior-reference.ts) if you want a minimal source-level TypeScript path for that route-behavior layer instead of reconstructing it from OpenAPI.

## Notes

- the route contracts live in OpenAPI and remain stronger than prose summaries
- some response samples are illustrative rather than deployed HTTP captures
- the bounded cross-map between routes, payloads, and capsule examples lives in [`../PUBLIC_EXAMPLE_COVERAGE.json`](../PUBLIC_EXAMPLE_COVERAGE.json)
- consumer snippets live in [`client-recipes.md`](client-recipes.md) and [`../examples/client/`](../examples/client/), and they now cover all published validator routes
- the compact route pack in [`../references/validator-routes.json`](../references/validator-routes.json) stays subordinate to the stronger OpenAPI document and the route-level docs on this page even when it carries auth, query, and response-status summary data
- when route behavior changes, update this map, the OpenAPI file, the API examples, and the contract catalog together
