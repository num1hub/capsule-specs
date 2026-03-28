# Archive Examples

This directory contains public-safe archive portability examples.

## Files

- `archive-bundle.sample.json`
  Synthetic sample of the published archive-bundle contract.

## Purpose

Use these files to:

- understand the public export / replay contract shape
- test parsers or validators for archive-bundle payloads
- review portability posture without depending on private runtime state

For copyable validation paths, also inspect:

- [`../client/ajv-validate-archive-bundle.mjs`](../client/ajv-validate-archive-bundle.mjs)
- [`../client/esm-package-ajv-validate-archive-bundle.mjs`](../client/esm-package-ajv-validate-archive-bundle.mjs)
- [`../../docs/archive-validation-recipes.md`](../../docs/archive-validation-recipes.md)
