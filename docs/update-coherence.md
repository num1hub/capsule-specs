# Update Coherence

This repository publishes a bounded update-coherence layer so maintainers, reviewers, and contributors can see which public surfaces must move together when specific kinds of changes land.

The machine-readable form lives in [`../PUBLIC_UPDATE_COHERENCE_MAP.json`](../PUBLIC_UPDATE_COHERENCE_MAP.json).

## What this covers

- which public artifact groups are expected to co-move
- which change triggers require those groups to be rechecked
- which verification commands protect each co-moving group from silent drift
- which reviewer-facing summaries depend on release, provenance, and contract surfaces staying aligned

## Highest-signal rules

- do not treat reviewer-facing JSON summaries as self-sufficient; update the stronger source surfaces with them
- when schema, OpenAPI, or example meaning changes, update the teaching and release layers in the same workstream
- when review-path artifacts change, keep front-door, reviewer, and assurance layers in sync
- when files are added or removed, keep provenance, catalog, release evidence, and update-coherence groups aligned

## Important boundary

This layer describes co-movement expectations for the public specs surface only. It does not claim to describe every internal build dependency or private rollout procedure in the upstream N1Hub runtime.
