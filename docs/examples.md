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
- `invalid/`
  Intentionally schema-invalid capsule fixtures for raw-schema consumers.

## Why there is a negative example

Public specs are stronger when they show both a passing case and a controlled failing case. The G16-negative example demonstrates the difference between a structurally correct capsule and a sealed, trusted one.

For schema-invalid fixtures that should fail before live validator semantics matter, see [`invalid-capsule-examples.md`](invalid-capsule-examples.md) and [`../examples/invalid/README.md`](../examples/invalid/README.md).

## Validation status

The three positive examples were validated with the live validator from the upstream N1Hub repository. The negative example is expected to fail because the integrity seal is intentionally wrong.

The project-hub example is also intended to pass, but only when validation is given a known-ID catalog so the link targets can resolve. In the upstream validator that means passing `--ids-file examples/example-known-ids.json`.

For the bounded machine-readable map of what each capsule and API example covers, see [`../PUBLIC_EXAMPLE_COVERAGE.json`](../PUBLIC_EXAMPLE_COVERAGE.json) and [`example-coverage.md`](example-coverage.md).

## API payload examples

The sibling directory [`../examples/api/`](../examples/api/) contains public-safe validator request and response payloads. Those examples complement the capsule examples here by showing how the same artifacts appear at the HTTP boundary.

The sibling directory [`../examples/archive/`](../examples/archive/) contains a public-safe archive-bundle sample for portability and import-trust review.

## Curated raw capsule sources

The sibling directory [`../capsules/`](../capsules/) contains a small curated raw capsule set that backs the public law surface more directly than the synthetic examples do.

That set now includes:

- the 5-Element Law
- the 16 Validation Gates
- canonical relation types
- the schema capsule
- the confidence-vector capsule
- the versioning protocol capsule
- the `atomic` and `hub` subtype capsules

Use those files when you want inspectable upstream-style source material for law-adjacent semantics such as subtype meaning, confidence-vector structure, or immutable version lineage.
