# Invalid API Envelope Fixtures

This directory contains intentionally schema-invalid validator API envelope examples for raw-schema consumers.

## Included fixtures

- `validate-request.single.missing-capsule.json`
  Invalid because the single-validate request envelope is missing the required `capsule` field.
- `validate-response.fail.invalid-gate.json`
  Invalid because the fail-response error item uses a `gate` value that does not match the public `GNN` pattern.

## Important distinction

These files are not runtime traces and they are not alternative negative-path examples for the live validator. They are bounded teaching fixtures for direct JSON Schema rejection tests.

For structurally valid validator response examples, including a negative `G16` response that should still pass the public envelope schema, use [`../api/`](../api/).
