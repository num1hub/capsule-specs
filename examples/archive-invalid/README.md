# Invalid Archive Bundle Fixtures

This directory contains intentionally schema-invalid archive-bundle examples for raw-schema portability consumers.

## Included fixtures

- `archive-bundle.invalid-created-at.json`
  Invalid because `createdAt` does not satisfy the public `date-time` format.
- `archive-bundle.invalid-content-class.json`
  Invalid because `manifest[0].contentClass` does not use one of the published enum values.

## Important distinction

These files are not runtime traces and they are not negative proofs about a hosted import/export service. They are bounded teaching fixtures for direct JSON Schema rejection tests.

For the structurally valid public archive sample, use [`../archive/`](../archive/).
