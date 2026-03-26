# Route Reference

This page maps each published validator route to the strongest public example surfaces in this repository.

## `POST /api/validate`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- request example: [`../examples/api/validate-request.single.json`](../examples/api/validate-request.single.json)
- response example: [`../examples/api/validate-response.pass.json`](../examples/api/validate-response.pass.json)
- common failure example: [`../examples/api/validate-response.fail.json`](../examples/api/validate-response.fail.json)

## `POST /api/validate/batch`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- request example: [`../examples/api/validate-request.batch.json`](../examples/api/validate-request.batch.json)
- response example: [`../examples/api/validate-response.batch.json`](../examples/api/validate-response.batch.json)

## `POST /api/validate/fix`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- request example: [`../examples/api/validate-request.fix.json`](../examples/api/validate-request.fix.json)
- response example: [`../examples/api/validate-response.fix.sample.json`](../examples/api/validate-response.fix.sample.json)

## `GET /api/validate/stats`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- response example: [`../examples/api/stats-response.sample.json`](../examples/api/stats-response.sample.json)

## `GET /api/validate/gates`

- contract: [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
- response example: [`../examples/api/gates-response.sample.json`](../examples/api/gates-response.sample.json)

## Shared error envelopes

- generic error example: [`../examples/api/error-response.sample.json`](../examples/api/error-response.sample.json)
- rate-limit example: [`../examples/api/rate-limit-response.sample.json`](../examples/api/rate-limit-response.sample.json)

## Notes

- the route contracts live in OpenAPI and remain stronger than prose summaries
- some response samples are illustrative rather than deployed HTTP captures
- when route behavior changes, update this map, the OpenAPI file, the API examples, and the contract catalog together
