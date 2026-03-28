# Invalid Capsule Examples

This directory contains intentionally schema-invalid capsule fixtures for raw-schema consumers.

## Files

- `example-invalid-missing-neuro-concentrate.capsule.json`
  Missing the required `neuro_concentrate` root.
- `example-invalid-relation-type.capsule.json`
  Uses a non-canonical `relation_type` value inside `recursive_layer.links`.

## Boundary

These examples are meant to fail direct JSON Schema validation.

They are different from `../example-validator-invalid-g16.capsule.json`, which remains structurally valid and is intended to fail only at the stronger live-validator layer at Gate `G16`.
