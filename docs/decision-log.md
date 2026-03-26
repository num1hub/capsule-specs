# Decision Log

This repository publishes a bounded decision-log layer so external readers can see why the public specs surface is shaped the way it is.

The machine-readable form lives in [`../PUBLIC_DECISION_LOG.json`](../PUBLIC_DECISION_LOG.json).

## What this layer covers

- which major public-surface decisions are intentional
- which stronger surfaces justify those decisions
- which supporting surfaces deepen the rationale without outranking stronger contracts
- which non-goals keep the decision summaries bounded

## Why this matters

A reviewer or contributor should not have to guess why this repository is a narrow public projection instead of a runtime dump.

This layer makes the high-signal rationale explicit:

- why the repo is a specs surface instead of the full private runtime
- why capsules, schemas, OpenAPI, and validator behavior outrank reviewer summaries
- why examples are synthetic and public-safe
- why release discipline and provenance are part of the public trust posture

The strongest related surfaces include [`../PUBLIC_BOUNDARY_MAP.json`](../PUBLIC_BOUNDARY_MAP.json), [`../PUBLIC_ASSURANCE_CASE.json`](../PUBLIC_ASSURANCE_CASE.json), [`../PUBLIC_TRACEABILITY_MATRIX.json`](../PUBLIC_TRACEABILITY_MATRIX.json), [`../PUBLIC_EVIDENCE_TIMELINE.json`](../PUBLIC_EVIDENCE_TIMELINE.json), [`../PUBLIC_RELEASE_METADATA.json`](../PUBLIC_RELEASE_METADATA.json), and [`../PUBLIC_DECISION_LOG.json`](../PUBLIC_DECISION_LOG.json).

## Important boundary

The decision log is a bounded public rationale layer. It does not claim to expose every private historical discussion, internal alternative, or unpublished runtime decision from the upstream N1Hub repository.
