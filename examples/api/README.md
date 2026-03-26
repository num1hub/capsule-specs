# API Examples

This directory contains concrete JSON payloads for the validator HTTP surface.

## Included examples

- `validate-request.single.json`
  Single-capsule request envelope.
- `validate-request.batch.json`
  Batch request envelope with mixed validity inputs.
- `validate-response.pass.json`
  Positive single-capsule response.
- `validate-response.fail.json`
  Negative single-capsule response that isolates `G16`.
- `validate-response.batch.json`
  Mixed batch response sample.
- `validate-request.fix.json`
  Fix-route request envelope using the public negative `G16` example.
- `validate-response.fix.sample.json`
  Illustrative fix-route response showing the corrected capsule payload.
- `gates-response.sample.json`
  Small response example for the gate-definition route.
- `stats-response.sample.json`
  Small response example for validator statistics.
- `error-response.sample.json`
  Shared generic error envelope.
- `rate-limit-response.sample.json`
  Shared rate-limit envelope.

## Usage

Use these files to:

- understand validator request and response envelopes quickly
- prototype integrations without opening the full private runtime repo
- test serializers and API clients against public-safe payloads
- compare direct validation, batch validation, and fix-route shapes side by side
