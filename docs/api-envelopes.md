# API Envelopes

This repository publishes the validator OpenAPI document and a small set of concrete API payload examples for integrators.

## Covered example files

- [`../examples/api/validate-request.single.json`](../examples/api/validate-request.single.json)
  Canonical single-capsule validation envelope.
- [`../examples/api/validate-request.batch.json`](../examples/api/validate-request.batch.json)
  Batch validation request with one valid and one intentionally invalid capsule.
- [`../examples/api/validate-response.pass.json`](../examples/api/validate-response.pass.json)
  Positive single-capsule validation response.
- [`../examples/api/validate-response.fail.json`](../examples/api/validate-response.fail.json)
  Negative single-capsule validation response showing an isolated `G16` failure.
- [`../examples/api/validate-response.batch.json`](../examples/api/validate-response.batch.json)
  Mixed batch response with one valid and one invalid result item.
- [`../examples/api/gates-response.sample.json`](../examples/api/gates-response.sample.json)
  Small sample response shape for `GET /api/validate/gates`.

## Envelope rules

- `POST /api/validate`
  Uses `{ capsule, options, autoFix }`.
- `POST /api/validate/batch`
  Uses `{ capsules, options }`.
- `POST /api/validate/fix`
  Uses `{ capsule, options, policy }`.

The public repo currently includes concrete examples for the first two request envelopes and for common response shapes. That keeps the reference surface useful without trying to mirror every internal runtime path.

## Why this matters

OpenAPI alone tells tooling what shapes exist. Example envelopes show human readers and downstream builders how those shapes feel in real use, especially when validator options or mixed batch outcomes are involved.
