# Examples

The examples in [`../examples/`](../examples/) are intentionally small and public-safe.

## Included examples

- `example-note.capsule.json`
  Minimal note-shaped capsule.
- `example-task.capsule.json`
  Minimal task-shaped capsule.
- `example-validator-valid.capsule.json`
  Standalone validator-smoke example.
- `example-validator-invalid-g16.capsule.json`
  Intentional negative example that fails only on `G16`.

## Why there is a negative example

Public specs are stronger when they show both a passing case and a controlled failing case. The G16-negative example demonstrates the difference between a structurally correct capsule and a sealed, trusted one.

## Validation status

The three positive examples were validated with the live validator from the upstream N1Hub repository. The negative example is expected to fail because the integrity seal is intentionally wrong.
