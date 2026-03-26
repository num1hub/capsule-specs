# Dependency Graph

This repository publishes a bounded dependency graph so contributors, integrators, and reviewers can see which public artifacts depend on which stronger surfaces and in what order the public stack is easiest to read.

The machine-readable form lives in [`../PUBLIC_DEPENDENCY_GRAPH.json`](../PUBLIC_DEPENDENCY_GRAPH.json).

## What this covers

- which public artifacts are foundational, derived, or reviewer-facing
- which artifacts depend on other public surfaces
- which reading paths are shortest for contributors, integrators, and reviewers
- which verification commands protect the graph from silent drift

## Highest-signal rules

- start with foundational contract surfaces before reviewer-facing summaries
- treat machine-readable summaries as downstream from stronger docs, schemas, OpenAPI, and provenance
- keep reading paths honest when new public artifacts are added
- keep derived public guidance visibly connected to the stronger contract surfaces it depends on

## Important boundary

This graph documents dependency and reading-order relationships for the public specs surface only. It does not claim to model every private runtime dependency or every internal build path in the upstream N1Hub repository.
