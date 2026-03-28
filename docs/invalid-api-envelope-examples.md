# Invalid API Envelope Examples

This guide publishes a small set of intentionally invalid validator API envelope fixtures for consumers who need to see what the raw JSON Schema layer should reject before any live validator behavior is involved.

Use these files when you want:

- structural failure examples for validator request and response envelopes
- regression fixtures for Ajv or other schema-validator integrations
- a clear distinction between schema-invalid API payloads and structurally valid negative validator responses such as `G16` failures

## Why this exists

The payloads under [`../examples/api/`](../examples/api/) are validator-facing teaching artifacts. They are intended to be structurally valid public examples, even when they describe negative validator outcomes.

Raw-schema consumers need a different teaching layer: envelope fixtures that are rejected directly by [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json) before any live route semantics or validator execution matter.

## Published invalid fixtures

- [`../examples/api-invalid/validate-request.single.missing-capsule.json`](../examples/api-invalid/validate-request.single.missing-capsule.json)
  Missing the required `capsule` field from the `validateSingleRequest` envelope.
- [`../examples/api-invalid/validate-response.fail.invalid-gate.json`](../examples/api-invalid/validate-response.fail.invalid-gate.json)
  Uses a non-canonical `gate` identifier inside a fail response error item.

These fixtures are intentionally small and teaching-oriented. They do not claim to cover every possible validator-envelope rejection or every runtime failure class.

## Important distinction

- schema-invalid fixtures under [`../examples/api-invalid/`](../examples/api-invalid/)
  Should fail direct JSON Schema validation against the public validator envelope bundle
- validator-negative fixture [`../examples/api/validate-response.fail.json`](../examples/api/validate-response.fail.json)
  Should remain structurally valid while documenting an isolated live-validator `G16` failure

This distinction matters when you are deciding whether you need:

- a portable structural contract check for HTTP envelope tooling
- or the stronger live validator behavior behind the public route contracts

## Copyable Ajv recipes

- [`../examples/client/ajv-reject-invalid-validator-envelopes.mjs`](../examples/client/ajv-reject-invalid-validator-envelopes.mjs)
- [`../examples/client/esm-package-ajv-reject-invalid-validator-envelopes.mjs`](../examples/client/esm-package-ajv-reject-invalid-validator-envelopes.mjs)
- [`schema-validation-recipes.md`](schema-validation-recipes.md)
- [`api-envelopes.md`](api-envelopes.md)

## Verification

- `npm run check:invalid-api-examples`
- `npm run check:schema-recipes`
- `npm run check:package-install`
