# Audience Paths

This repository publishes many high-signal artifacts, but different readers still need different entry paths.

The machine-readable form lives in [`../PUBLIC_AUDIENCE_PATHS.json`](../PUBLIC_AUDIENCE_PATHS.json).

## What this layer answers

- where a reviewer should start
- where an integrator should start
- where a contributor should start
- where a tool-builder should start
- where a maintainer should start
- which files are strongest for each audience
- which verification commands keep each path honest

## Why this exists

`README.md`, `QUICKSTART.md`, and `docs/reviewer-guide.md` already provide useful entrypoints, but they do not answer one narrower question on their own: which path is correct for a specific public audience?

This layer makes that answer explicit instead of forcing outside readers to infer the right path from folder layout, document names, or maintainer intuition.

## Relationship to other public surfaces

- [`../PUBLIC_DEPENDENCY_GRAPH.json`](../PUBLIC_DEPENDENCY_GRAPH.json)
  Explains reading order and stronger-surface dependencies across the public stack.
- [`../PUBLIC_EVALUATION_PACKET.json`](../PUBLIC_EVALUATION_PACKET.json)
  Gives the shortest reviewer/program path through the public surface.
- [`../PUBLIC_CAPABILITY_MATRIX.json`](../PUBLIC_CAPABILITY_MATRIX.json)
  Explains what concrete outcomes the public repo currently supports.
- [`../PUBLIC_VERIFICATION_MATRIX.json`](../PUBLIC_VERIFICATION_MATRIX.json)
  Explains which check families protect the public review and maintenance surfaces.
- [`../PUBLIC_REVIEW_SCORECARD.json`](../PUBLIC_REVIEW_SCORECARD.json)
  Explains which reviewer-facing maturity criteria the repo satisfies.

## Important boundary

These audience paths are bounded public navigation aids. They do not replace the stronger docs, schemas, examples, release evidence, or live validator behavior that the individual paths reference.
