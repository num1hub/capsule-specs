# Invalid Capsule Examples

This guide publishes a small set of intentionally invalid capsule fixtures for consumers who need to see what the raw JSON Schema layer should reject.

Use these files when you want:

- structural failure examples for JSON Schema tooling
- regression fixtures for Ajv or other schema-validator integrations
- a clear distinction between schema-invalid capsules and validator-only failures such as `G16`

## Why this exists

The top-level example capsules in [`../examples/`](../examples/) are mainly validator-facing teaching artifacts. Most of them are meant to pass, and the intentional negative `G16` example remains structurally valid even though the live validator should reject it.

Raw-schema consumers need a different teaching layer: examples that are rejected before any live gate semantics or integrity recomputation are involved.

## Published invalid fixtures

- [`../examples/invalid/example-invalid-missing-neuro-concentrate.capsule.json`](../examples/invalid/example-invalid-missing-neuro-concentrate.capsule.json)
  Missing the required `neuro_concentrate` root.
- [`../examples/invalid/example-invalid-relation-type.capsule.json`](../examples/invalid/example-invalid-relation-type.capsule.json)
  Uses a non-canonical `relation_type` value inside `recursive_layer.links`.

The relation-type fixture keeps a correct integrity seal so the failure remains isolated to the documented enum violation instead of drifting into an accidental `G16` mismatch.

These fixtures are intentionally small and teaching-oriented. They do not claim to cover every possible schema rejection or every validator-only failure class.

## Important distinction

- schema-invalid fixtures under [`../examples/invalid/`](../examples/invalid/)
  Should fail direct JSON Schema validation
- validator-negative fixture [`../examples/example-validator-invalid-g16.capsule.json`](../examples/example-validator-invalid-g16.capsule.json)
  Should pass structural validation but fail the live validator on `G16`

This distinction matters when you are deciding whether you need:

- a portable structural contract check
- or the stronger live validator behavior

## Copyable Ajv recipes

- [`../examples/client/ajv-reject-invalid-capsules.mjs`](../examples/client/ajv-reject-invalid-capsules.mjs)
- [`../examples/client/esm-package-ajv-reject-invalid-capsules.mjs`](../examples/client/esm-package-ajv-reject-invalid-capsules.mjs)
- [`schema-validation-recipes.md`](schema-validation-recipes.md)
- [`integrity-recipes.md`](integrity-recipes.md)

## Verification

- `npm run check:invalid-examples`
- `npm run check:schema-recipes`
- `npm run check:package-install`
