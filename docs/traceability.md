# Traceability

This repository publishes a bounded traceability layer so external readers can see how the strongest public claims connect to concrete files and verification commands.

The machine-readable form lives in [`../PUBLIC_TRACEABILITY_MATRIX.json`](../PUBLIC_TRACEABILITY_MATRIX.json).

## What gets traced

Each trace connects:

- a public claim
- the strongest surfaces for that claim
- the supporting surfaces that deepen or contextualize it
- the verification commands that protect the claim from silent drift

## Highest-signal trace families

- capsule law and schema
- validator API and client-facing contracts
- negative evidence and fail-closed behavior
- example coverage across capsule and API fixtures
- projection boundaries and provenance
- reviewer and release evidence
- portability and archive trust
- maintainer intake and practical public usability

## Why this matters

Without an explicit traceability layer, a reviewer has to infer whether a claim is backed by a real contract stack or only by prose.

This repository avoids that by linking docs, schemas, examples, machine-readable summaries, and verification commands in one bounded public map.

The bounded dependency and reading-order summary lives in [`../PUBLIC_DEPENDENCY_GRAPH.json`](../PUBLIC_DEPENDENCY_GRAPH.json).

The bounded public assurance summary lives in [`../PUBLIC_ASSURANCE_CASE.json`](../PUBLIC_ASSURANCE_CASE.json).

The bounded co-movement summary lives in [`../PUBLIC_UPDATE_COHERENCE_MAP.json`](../PUBLIC_UPDATE_COHERENCE_MAP.json).

The bounded limitations summary lives in [`../PUBLIC_LIMITATIONS_REGISTER.json`](../PUBLIC_LIMITATIONS_REGISTER.json).

The bounded maintenance-evolution summary lives in [`../PUBLIC_EVIDENCE_TIMELINE.json`](../PUBLIC_EVIDENCE_TIMELINE.json).

The bounded reviewer-criteria summary lives in [`../PUBLIC_REVIEW_SCORECARD.json`](../PUBLIC_REVIEW_SCORECARD.json).

The bounded verification-coverage summary lives in [`../PUBLIC_VERIFICATION_MATRIX.json`](../PUBLIC_VERIFICATION_MATRIX.json).

The bounded role-specific navigation summary lives in [`../PUBLIC_AUDIENCE_PATHS.json`](../PUBLIC_AUDIENCE_PATHS.json).

The bounded stronger-source hierarchy summary lives in [`../PUBLIC_EVIDENCE_STRENGTH_MAP.json`](../PUBLIC_EVIDENCE_STRENGTH_MAP.json).

## Important boundary

The traceability matrix is a curated public summary. It does not claim to capture every private runtime dependency or every internal change path from the upstream N1Hub repository.
