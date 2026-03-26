# Failure Model

This repository publishes a small but explicit fail-closed model for the public validator and portability surfaces.

## Core rule

Public contracts should explain both successful and rejected behavior in machine-checkable form.

## What fail-closed means here

- malformed validator input is rejected with bounded errors
- invalid integrity seals remain visible as contract failures rather than silent fixes
- unauthorized or conflicting requests return typed rejections rather than unhandled errors
- archive replay should stop when trust evidence is missing instead of attempting partial import
- broken OpenAPI completeness or reference integrity should block publication instead of drifting silently

## Strongest public surfaces

- [`../examples/example-validator-invalid-g16.capsule.json`](../examples/example-validator-invalid-g16.capsule.json)
- [`../examples/api/validate-response.fail.json`](../examples/api/validate-response.fail.json)
- [`../examples/api/error-response.sample.json`](../examples/api/error-response.sample.json)
- [`../examples/api/unauthorized-response.sample.json`](../examples/api/unauthorized-response.sample.json)
- [`../examples/api/conflict-response.sample.json`](../examples/api/conflict-response.sample.json)
- [`portability.md`](portability.md)
- [`../PUBLIC_FAILURE_MODEL.json`](../PUBLIC_FAILURE_MODEL.json)

## Important boundary

This repo does not claim to publish every negative case from the private runtime. It publishes a high-signal public subset that makes the validator and portability trust posture legible to reviewers and integrators.
