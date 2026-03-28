# Example Coverage

This repository publishes a bounded coverage map for its public capsule examples and validator API payloads.

The machine-readable form lives in [`../PUBLIC_EXAMPLE_COVERAGE.json`](../PUBLIC_EXAMPLE_COVERAGE.json).

## What this answers

- which capsule examples exist
- which API payload examples exist
- which public surfaces they are meant to exercise
- where negative-path coverage exists
- which verification commands keep the example set from drifting

## Why this matters

Public examples are strongest when they are not random fixtures. This repository keeps them legible as a small coverage set for schema, validator, API, graph-link, and fail-closed behavior.

## Highest-signal coverage points

- `example-note.capsule.json`
  Minimal narrative capsule plus single-route happy-path coverage.
- `example-task.capsule.json`
  Minimal operational capsule for task-shaped payloads.
- `example-validator-valid.capsule.json`
  Standalone validator smoke capsule.
- `example-validator-invalid-g16.capsule.json`
  Negative integrity example for bounded G16 failure.
- `example-project-hub.capsule.json`
  Linked-graph example paired with `example-known-ids.json`.
- `examples/api/*.json`
  Concrete validator request, response, and bounded error envelopes.

## Important boundary

The coverage map is a curated public summary. It does not claim to enumerate every upstream private test fixture or every internal runtime scenario.

The structural invalid fixtures under [`../examples/invalid/`](../examples/invalid/) are complementary raw-schema teaching artifacts. They are intentionally outside the bounded top-level capsule coverage set summarized here.
