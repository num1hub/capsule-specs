# Route Reference

This page maps each published validator route to the strongest public example surfaces in this repository.

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
- live client recipes: [`../examples/client/curl-validate-batch.sh`](../examples/client/curl-validate-batch.sh), [`../examples/client/node-validate-batch.mjs`](../examples/client/node-validate-batch.mjs), [`../examples/client/python-validate-batch.py`](../examples/client/python-validate-batch.py)

## `POST /api/validate/fix`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- request example: [`../examples/api/validate-request.fix.json`](../examples/api/validate-request.fix.json)
- response example: [`../examples/api/validate-response.fix.sample.json`](../examples/api/validate-response.fix.sample.json)
- live client recipes: [`../examples/client/curl-validate-fix.sh`](../examples/client/curl-validate-fix.sh), [`../examples/client/node-validate-fix.mjs`](../examples/client/node-validate-fix.mjs), [`../examples/client/python-validate-fix.py`](../examples/client/python-validate-fix.py)

## `GET /api/validate/stats`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- response example: [`../examples/api/stats-response.sample.json`](../examples/api/stats-response.sample.json)
- live client recipes: [`../examples/client/curl-get-stats.sh`](../examples/client/curl-get-stats.sh), [`../examples/client/node-get-stats.mjs`](../examples/client/node-get-stats.mjs), [`../examples/client/python-get-stats.py`](../examples/client/python-get-stats.py)

## `GET /api/validate/gates`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- response example: [`../examples/api/gates-response.sample.json`](../examples/api/gates-response.sample.json)
- live client recipes: [`../examples/client/curl-get-gates.sh`](../examples/client/curl-get-gates.sh), [`../examples/client/node-get-gates.mjs`](../examples/client/node-get-gates.mjs), [`../examples/client/python-get-gates.py`](../examples/client/python-get-gates.py)

## Shared error envelopes

- generic error example: [`../examples/api/error-response.sample.json`](../examples/api/error-response.sample.json)
- rate-limit example: [`../examples/api/rate-limit-response.sample.json`](../examples/api/rate-limit-response.sample.json)

## Notes

- the route contracts live in OpenAPI and remain stronger than prose summaries
- some response samples are illustrative rather than deployed HTTP captures
- the bounded cross-map between routes, payloads, and capsule examples lives in [`../PUBLIC_EXAMPLE_COVERAGE.json`](../PUBLIC_EXAMPLE_COVERAGE.json)
- consumer snippets live in [`client-recipes.md`](client-recipes.md) and [`../examples/client/`](../examples/client/), and they now cover all published validator routes
- when route behavior changes, update this map, the OpenAPI file, the API examples, and the contract catalog together
