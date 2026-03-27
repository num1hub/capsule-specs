# API Envelopes

This repository publishes the validator OpenAPI document and a small set of concrete API payload examples for integrators.

The request and response examples are also covered by [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json), which gives tooling a machine-readable contract bundle for the public envelope layer.

If you need source-level consumer artifacts instead of raw JSON Schema alone, also inspect:

- [`type-projections.md`](type-projections.md)
- [`../projections/typescript/validator-api.ts`](../projections/typescript/validator-api.ts)
- [`../projections/zod/validator-api.ts`](../projections/zod/validator-api.ts)

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
- [`../examples/api/validate-request.fix.json`](../examples/api/validate-request.fix.json)
  Fix-route request envelope using the intentionally invalid `G16` capsule.
- [`../examples/api/validate-response.fix.sample.json`](../examples/api/validate-response.fix.sample.json)
  Illustrative fix-route response showing the corrected capsule payload.
- [`../examples/api/gates-response.sample.json`](../examples/api/gates-response.sample.json)
  Small sample response shape for `GET /api/validate/gates`.
- [`../examples/api/stats-response.sample.json`](../examples/api/stats-response.sample.json)
  Small sample response shape for `GET /api/validate/stats`.
- [`../examples/api/error-response.sample.json`](../examples/api/error-response.sample.json)
  Shared generic error envelope example.
- [`../examples/api/unauthorized-response.sample.json`](../examples/api/unauthorized-response.sample.json)
  Small bounded unauthorized example for rejection-path review.
- [`../examples/api/conflict-response.sample.json`](../examples/api/conflict-response.sample.json)
  Small bounded conflict example for rejection-path review.
- [`../examples/api/rate-limit-response.sample.json`](../examples/api/rate-limit-response.sample.json)
  Shared rate-limit envelope example.

## Envelope rules

- `POST /api/validate`
  Uses `{ capsule, options, autoFix }`.
- `POST /api/validate/batch`
  Uses `{ capsules, options }`.
- `POST /api/validate/fix`
  The current public example surface uses `{ capsule, options }`.
  Policy variants may exist upstream, but the public repository only schema-covers the documented example envelope.

The public repo currently includes concrete examples for the first two request envelopes and for common response shapes. That keeps the reference surface useful without trying to mirror every internal runtime path.

The `fix` response sample is intentionally illustrative: it is derived from the published OpenAPI contract and from local validator behavior on the public negative `G16` example, not from a deployed public HTTP trace.

For the higher-level fail-closed summary across validator, OpenAPI, and portability surfaces, see [`failure-model.md`](failure-model.md).

## Why this matters

OpenAPI alone tells tooling what shapes exist. Example envelopes show human readers and downstream builders how those shapes feel in real use, especially when validator options or mixed batch outcomes are involved.

The dedicated API envelope schema keeps these example files machine-readable without forcing consumers to infer shape rules from prose alone.

The published validator API projections strengthen that path further by giving TypeScript and Zod consumers a public-safe source-level envelope layer that stays subordinate to the stronger JSON Schema and OpenAPI surfaces.
