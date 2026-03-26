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
- `example-project-hub.capsule.json`
  Linked graph example that references the public note, task, and validator-smoke capsules.
- `example-known-ids.json`
  JSON-array known-ID catalog used for link-aware validation of graph examples.

## Why there is a negative example

Public specs are stronger when they show both a passing case and a controlled failing case. The G16-negative example demonstrates the difference between a structurally correct capsule and a sealed, trusted one.

## Validation status

The three positive examples were validated with the live validator from the upstream N1Hub repository. The negative example is expected to fail because the integrity seal is intentionally wrong.

The project-hub example is also intended to pass, but only when validation is given a known-ID catalog so the link targets can resolve. In the upstream validator that means passing `--ids-file examples/example-known-ids.json`.

## API payload examples

The sibling directory [`../examples/api/`](../examples/api/) contains public-safe validator request and response payloads. Those examples complement the capsule examples here by showing how the same artifacts appear at the HTTP boundary.
