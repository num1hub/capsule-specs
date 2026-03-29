# Invalid Client Recipe Index Examples

This guide publishes a small set of intentionally invalid client-recipe navigator fixtures for consumers who need to see what the bounded navigator schema should reject before any verifier-only ownership or task-wiring checks are involved.

Use these files when you want:

- structural failure examples for the machine-readable client-recipe navigator
- regression fixtures for Ajv or other JSON Schema integrations that consume `examples/client/recipe-index.json`
- a clear distinction between schema-invalid navigator payloads and the structurally valid published navigator under `examples/client/`

## Why this exists

The published navigator under [`../examples/client/recipe-index.json`](../examples/client/recipe-index.json) is a positive teaching artifact. It is intended to remain structurally valid against [`../schemas/client-recipe-index.schema.json`](../schemas/client-recipe-index.schema.json).

Raw-schema consumers need a second layer: navigator fixtures that are rejected directly by the public schema so tools can prove both acceptance and rejection behavior without depending on repo-local verifier logic.

## Published invalid fixtures

- [`../examples/client-invalid/client-recipe-index.missing-files.json`](../examples/client-invalid/client-recipe-index.missing-files.json)
  Omits the required `files` field from a group definition.
- [`../examples/client-invalid/client-recipe-index.invalid-runtime.json`](../examples/client-invalid/client-recipe-index.invalid-runtime.json)
  Uses a non-canonical runtime value inside `task_entrypoints[0].runtimes[0]`.

These fixtures are intentionally small and teaching-oriented. They do not claim to cover every possible navigator-schema rejection or every verifier-only drift class around task ownership, runtime lanes, or doc linkage.

## Important distinction

- schema-invalid fixtures under [`../examples/client-invalid/`](../examples/client-invalid/)
  Should fail direct JSON Schema validation against the public navigator contract
- structurally valid navigator under [`../examples/client/recipe-index.json`](../examples/client/recipe-index.json)
  Should remain valid while documenting the bounded task/runtime navigation surface for client recipes

This distinction matters when you are deciding whether you need:

- a portable structural contract check for navigator-consuming tooling
- or the stronger repo-local verifier behavior behind [`../scripts/check-client-recipes.js`](../scripts/check-client-recipes.js)

## Copyable Ajv recipes

- [`../examples/client/ajv-reject-invalid-client-recipe-index.mjs`](../examples/client/ajv-reject-invalid-client-recipe-index.mjs)
- [`../examples/client/esm-package-ajv-reject-invalid-client-recipe-index.mjs`](../examples/client/esm-package-ajv-reject-invalid-client-recipe-index.mjs)
- [`schema-validation-recipes.md`](schema-validation-recipes.md)
- [`client-recipes.md`](client-recipes.md)

## Verification

- `npm run check:invalid-client-recipe-index-examples`
- `npm run check:schema-recipes`
- `npm run check:package-install`
