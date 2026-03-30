# Maintainer Operations

This repository publishes a bounded maintainer-operations layer so outside contributors and reviewers can see how the public surface is actually maintained.

The machine-readable form lives in [`../PUBLIC_MAINTENANCE_MODEL.json`](../PUBLIC_MAINTENANCE_MODEL.json).
The bounded additive/deprecation/breaking-change posture lives in [`change-control.md`](change-control.md) and [`../PUBLIC_CHANGE_CONTROL_MODEL.json`](../PUBLIC_CHANGE_CONTROL_MODEL.json).
The bounded co-movement expectations live in [`update-coherence.md`](update-coherence.md) and [`../PUBLIC_UPDATE_COHERENCE_MAP.json`](../PUBLIC_UPDATE_COHERENCE_MAP.json).
The bounded role-specific public navigation layer lives in [`audience-paths.md`](audience-paths.md) and [`../PUBLIC_AUDIENCE_PATHS.json`](../PUBLIC_AUDIENCE_PATHS.json).
The bounded stronger-source hierarchy lives in [`evidence-strength.md`](evidence-strength.md) and [`../PUBLIC_EVIDENCE_STRENGTH_MAP.json`](../PUBLIC_EVIDENCE_STRENGTH_MAP.json).
The bounded ready vs deferred public audience posture lives in [`adoption-readiness.md`](adoption-readiness.md) and [`../PUBLIC_ADOPTION_READINESS.json`](../PUBLIC_ADOPTION_READINESS.json).
The bounded freshness and stale-summary posture lives in [`freshness.md`](freshness.md) and [`../PUBLIC_FRESHNESS_MODEL.json`](../PUBLIC_FRESHNESS_MODEL.json).
The repo-owned GitHub operations layer lives in [`github-operations.md`](github-operations.md), [`../.github/labels.json`](../.github/labels.json), and [`../.github/milestones.json`](../.github/milestones.json).

## What this covers

- who maintains the public surface
- which intake channels are supported
- how public-surface changes should be classified
- which verification evidence is expected before a release-facing change is considered ready
- which boundaries maintainers should protect during review

## Highest-signal operational rules

- keep the public boundary narrow and explicit
- treat `main` as the stable public branch and `dream` as the public exploration branch for larger still-public work
- do not treat `dream` as a private vault or as a bypass around public-boundary, provenance, or verification rules
- keep `SOURCE_MANIFEST.json` and `PUBLIC_CONTRACT_CATALOG.json` synchronized with public-surface changes
- keep `PUBLIC_EVIDENCE_STRENGTH_MAP.json` aligned with trust, compatibility, reviewer, and release-evidence surfaces when stronger-source hierarchy changes
- keep `PUBLIC_ADOPTION_READINESS.json` aligned with audience paths, limitations, release evidence, and maintainer posture when adoption readiness or deferred expectations change
- keep `PUBLIC_FRESHNESS_MODEL.json` aligned with release evidence, evidence timeline, summary layers, and stale-signal triggers when freshness posture changes
- prefer small, reviewable releases over large dumps
- require verification evidence for schema, example, API, and release-surface changes
- route trust-sensitive reports through the security path instead of public issue intake

## Why this matters

External programs and contributors need more than docs. They need evidence that the repository is maintained intentionally and that changes move through explicit public-safe workflow rules.

## Public branch note

- `main` is the stable public branch for release-facing and reviewer-facing changes.
- `dream` is a public exploration branch, not a private maintainer surface.
- Private operator material and maintainer-only exports stay outside tracked public files.

## Projection workflow note

Some reviewer and governance summary surfaces may be maintained through maintainer-local capsule projection workflows, especially on the public `dream` branch.

Today that projection-active summary set includes:

- `PUBLIC_DECISION_LOG.json`
- `PUBLIC_EVIDENCE_GAPS_REGISTER.json`
- `PUBLIC_LIMITATIONS_REGISTER.json`
- `PUBLIC_CAPABILITY_MATRIX.json`
- `PUBLIC_ECOSYSTEM_VALUE_MAP.json`
- `PUBLIC_PROGRAM_FIT_MAP.json`
- `PUBLIC_REVIEW_SCORECARD.json`
- `PUBLIC_AUDIENCE_PATHS.json`
- `PUBLIC_ASSURANCE_CASE.json`
- `PUBLIC_DEPENDENCY_GRAPH.json`
- `PUBLIC_TRACEABILITY_MATRIX.json`
- `PUBLIC_EVIDENCE_STRENGTH_MAP.json`
- `PUBLIC_UPDATE_COHERENCE_MAP.json`
- `PUBLIC_ADOPTION_READINESS.json`
- `PUBLIC_FRESHNESS_MODEL.json`
- `PUBLIC_MAINTENANCE_MODEL.json`
- `PUBLIC_CHANGE_CONTROL_MODEL.json`
- `PUBLIC_OWNERSHIP_MAP.json`
- `PUBLIC_BOUNDARY_MAP.json`
- `PUBLIC_PORTABILITY_PROFILE.json`
- `PUBLIC_PUBLICATION_READINESS.json`
- `PUBLIC_FAILURE_MODEL.json`

Treat those files as public outputs whose semantic changes must stay aligned with the stronger public docs, schemas, examples, release evidence, and verification surfaces.

## Important boundary

This layer documents maintainer posture for the public specs surface only. It does not claim a guaranteed SLA for issue response, nor does it expose private internal workflow details from the upstream N1Hub runtime.
