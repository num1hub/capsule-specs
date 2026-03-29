# Invalid Client Recipe Navigator Fixtures

This directory contains intentionally schema-invalid client-recipe navigator examples for raw-schema consumers.

## Included fixtures

- `client-recipe-index.missing-files.json`
  Invalid because the group definition omits the required `files` field.
- `client-recipe-index.invalid-runtime.json`
  Invalid because `task_entrypoints[0].runtimes[0]` uses a value outside the published runtime enum.

## Important distinction

These files are not verifier failures and they are not alternative examples for `scripts/check-client-recipes.js`. They are bounded teaching fixtures for direct JSON Schema rejection tests against `schemas/client-recipe-index.schema.json`.

For the structurally valid public navigator, use [`../client/`](../client/).
