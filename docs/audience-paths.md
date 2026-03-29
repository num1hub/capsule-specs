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

It also preserves a clean split between:

- human-safe entry paths
  the shortest bounded reading lanes for people
- agent-facing entry paths
  the machine-readable starts, stronger surfaces, and verification commands that LLMs and automation should follow

## Golden path summary

Use the machine-readable file for the full starting points, strongest surfaces, and verification commands.
Use this section when you want the shortest human-safe lane first:

- reviewers:
  [`../README.md`](../README.md), [`reviewer-guide.md`](reviewer-guide.md),
  [`../PUBLIC_EVALUATION_PACKET.json`](../PUBLIC_EVALUATION_PACKET.json)
- integrators:
  [`../QUICKSTART.md`](../QUICKSTART.md), [`integration-guide.md`](integration-guide.md),
  [`api-envelopes.md`](api-envelopes.md), [`schema-family-reference.md`](schema-family-reference.md)
- contributors:
  [`../ONBOARDING.md`](../ONBOARDING.md), [`../CONTRIBUTING.md`](../CONTRIBUTING.md),
  [`repo-validation-workflow.md`](repo-validation-workflow.md)
- tool-builders:
  [`../QUICKSTART.md`](../QUICKSTART.md),
  [`schema-family-reference.md`](schema-family-reference.md),
  [`schema-bundles.md`](schema-bundles.md), [`reference-pack.md`](reference-pack.md)
- maintainers:
  [`../MAINTAINERS.md`](../MAINTAINERS.md), [`../GOVERNANCE.md`](../GOVERNANCE.md),
  [`maintainer-operations.md`](maintainer-operations.md)

## Public branch note

- `main` is the stable public branch.
- `dream` is the public exploration branch for larger still-public work.
- Neither branch is a private maintainer surface.

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
