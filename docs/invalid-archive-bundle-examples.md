# Invalid Archive Bundle Examples

This guide publishes a small set of intentionally invalid archive-bundle fixtures for portability/export consumers who need to see what the raw archive schema should reject before any replay tooling or hosted workflow assumptions enter the picture.

Use these files when you want:

- structural failure examples for archive-bundle payloads
- regression fixtures for Ajv or other JSON Schema integrations
- a clear distinction between schema-invalid archive bundles and the structurally valid public sample under `examples/archive/`

## Why this exists

The payload under [`../examples/archive/archive-bundle.sample.json`](../examples/archive/archive-bundle.sample.json) is a positive teaching artifact. It is intended to remain structurally valid against [`../schemas/archive-bundle.schema.json`](../schemas/archive-bundle.schema.json).

Raw-schema consumers need a second layer: archive fixtures that are rejected directly by the public schema so portability tooling can prove both acceptance and rejection behavior without depending on unpublished runtime code.

## Published invalid fixtures

- [`../examples/archive-invalid/archive-bundle.invalid-created-at.json`](../examples/archive-invalid/archive-bundle.invalid-created-at.json)
  Uses a non-`date-time` `createdAt` value so consumers can prove format enforcement through `ajv-formats`.
- [`../examples/archive-invalid/archive-bundle.invalid-content-class.json`](../examples/archive-invalid/archive-bundle.invalid-content-class.json)
  Uses a non-canonical `contentClass` value inside `manifest[0]`.

These fixtures are intentionally small and teaching-oriented. They do not claim to cover every archive rejection class or every upstream replay-policy failure.

## Important distinction

- schema-invalid fixtures under [`../examples/archive-invalid/`](../examples/archive-invalid/)
  Should fail direct JSON Schema validation against the public archive-bundle contract
- structurally valid sample under [`../examples/archive/archive-bundle.sample.json`](../examples/archive/archive-bundle.sample.json)
  Should remain valid while documenting the bounded public portability/export shape

This distinction matters when you are deciding whether you need:

- a portable structural contract check for archive tooling
- or stronger trust and policy guidance from [`archive-bundles.md`](archive-bundles.md) and [`portability.md`](portability.md)

## Copyable Ajv recipes

- [`../examples/client/ajv-reject-invalid-archive-bundles.mjs`](../examples/client/ajv-reject-invalid-archive-bundles.mjs)
- [`../examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs`](../examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs)
- [`archive-validation-recipes.md`](archive-validation-recipes.md)
- [`schema-validation-recipes.md`](schema-validation-recipes.md)

## Verification

- `npm run check:invalid-archive-examples`
- `npm run check:schema-recipes`
- `npm run check:package-install`
