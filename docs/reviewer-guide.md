# Reviewer Guide

Use this guide when you need to assess the repository quickly as a reviewer, grant program, or external evaluator.

## Fast path

1. Read [`../README.md`](../README.md)
   Understand what the repository publishes and what it intentionally excludes.
2. Read [`../PUBLIC_PROJECT_PROFILE.json`](../PUBLIC_PROJECT_PROFILE.json)
   Get a machine-readable snapshot of maintainer ownership, public-surface counts, and health signals.
3. Read [`../PUBLIC_EVALUATION_PACKET.json`](../PUBLIC_EVALUATION_PACKET.json)
   Use the condensed external-review packet when you need the shortest bounded summary of scope, strongest evidence, and review commands.
4. Read [`../PUBLIC_BOUNDARY_MAP.json`](../PUBLIC_BOUNDARY_MAP.json)
   See which boundaries are published here and which ones remain intentionally deferred.
5. Read [`../PUBLIC_CAPABILITY_MATRIX.json`](../PUBLIC_CAPABILITY_MATRIX.json)
   See what an outside reader can concretely do with the public surface right now.
6. Read [`public-contract-index.md`](public-contract-index.md)
   Jump to the highest-signal public artifacts without browsing the whole tree.
7. Read [`../PUBLIC_TRACEABILITY_MATRIX.json`](../PUBLIC_TRACEABILITY_MATRIX.json)
   Confirm that key public claims are tied to concrete docs, schemas, examples, and verification commands.
8. Read [`../PUBLIC_EXAMPLE_COVERAGE.json`](../PUBLIC_EXAMPLE_COVERAGE.json)
   Confirm that the public example set covers schema, validator routes, graph links, and bounded negative paths.
9. Read [`../PUBLIC_MAINTENANCE_MODEL.json`](../PUBLIC_MAINTENANCE_MODEL.json)
   Confirm that the public intake, review, and release posture is explicit rather than inferred.
10. Read [`../PUBLIC_CHANGE_CONTROL_MODEL.json`](../PUBLIC_CHANGE_CONTROL_MODEL.json)
   Confirm that additive, deprecated, and breaking public changes are described explicitly instead of being inferred from changelog noise.
11. Read [`../PUBLIC_OWNERSHIP_MAP.json`](../PUBLIC_OWNERSHIP_MAP.json)
   Confirm which public artifact families are actually maintained here and which stronger surfaces outrank reviewer-facing summaries or examples.
12. Read [`../PUBLIC_DEPENDENCY_GRAPH.json`](../PUBLIC_DEPENDENCY_GRAPH.json)
   Confirm the shortest safe reading path through the public stack and which reviewer-facing summaries depend on stronger contract surfaces.
13. Read [`../PUBLIC_ASSURANCE_CASE.json`](../PUBLIC_ASSURANCE_CASE.json)
   Confirm the bounded public claims, strongest evidence, explicit limits, and non-claims in one reviewer-facing surface.
14. Read [`release-evidence.md`](release-evidence.md)
   See how provenance, release review, and verification evidence fit together.
15. Read [`../PUBLIC_FAILURE_MODEL.json`](../PUBLIC_FAILURE_MODEL.json)
   Confirm that the public surface documents bounded negative paths instead of only happy-path behavior.
16. Read [`../PUBLIC_PORTABILITY_PROFILE.json`](../PUBLIC_PORTABILITY_PROFILE.json)
   Confirm that portability and archive trust are described as governed public contracts rather than as vague product claims.
17. Read [`community-health.md`](community-health.md)
   Confirm that contributor intake and maintainer expectations are explicit.

## Strongest signals

If you only have a few minutes, inspect these surfaces first:

- [`../PUBLIC_PROJECT_PROFILE.json`](../PUBLIC_PROJECT_PROFILE.json)
- [`../PUBLIC_EVALUATION_PACKET.json`](../PUBLIC_EVALUATION_PACKET.json)
- [`../PUBLIC_TRACEABILITY_MATRIX.json`](../PUBLIC_TRACEABILITY_MATRIX.json)
- [`../PUBLIC_FAILURE_MODEL.json`](../PUBLIC_FAILURE_MODEL.json)
- [`../PUBLIC_EXAMPLE_COVERAGE.json`](../PUBLIC_EXAMPLE_COVERAGE.json)
- [`../PUBLIC_MAINTENANCE_MODEL.json`](../PUBLIC_MAINTENANCE_MODEL.json)
- [`../PUBLIC_CHANGE_CONTROL_MODEL.json`](../PUBLIC_CHANGE_CONTROL_MODEL.json)
- [`../PUBLIC_OWNERSHIP_MAP.json`](../PUBLIC_OWNERSHIP_MAP.json)
- [`../PUBLIC_DEPENDENCY_GRAPH.json`](../PUBLIC_DEPENDENCY_GRAPH.json)
- [`../PUBLIC_ASSURANCE_CASE.json`](../PUBLIC_ASSURANCE_CASE.json)
- [`../PUBLIC_BOUNDARY_MAP.json`](../PUBLIC_BOUNDARY_MAP.json)
- [`../PUBLIC_CAPABILITY_MATRIX.json`](../PUBLIC_CAPABILITY_MATRIX.json)
- [`../PUBLIC_PORTABILITY_PROFILE.json`](../PUBLIC_PORTABILITY_PROFILE.json)
- [`../PUBLIC_CONTRACT_CATALOG.json`](../PUBLIC_CONTRACT_CATALOG.json)
- [`../PUBLIC_RELEASE_METADATA.json`](../PUBLIC_RELEASE_METADATA.json)
- [`../PUBLIC_RELEASE_REVIEW.md`](../PUBLIC_RELEASE_REVIEW.md)
- [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
- [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)

## What to verify

- the repository has a clear public boundary
- the repository explains both published and deferred boundaries explicitly
- the maintainer identity is explicit
- docs, schemas, examples, and release evidence are all present
- repo-local verification is not symbolic; it is wired to actual files
- the public surface is usable by both humans and tools

## Practical interpretation

This repository should read as a deliberately maintained public contract surface, not as a bulk export of a private repo. The best indicators are:

- strong front-door docs
- machine-readable provenance
- machine-readable contract discovery
- release metadata and review evidence
- explicit projection doctrine and domain-boundary posture
- explicit capability coverage for consumers and reviewers
- contributor intake templates
- client-facing examples and schema-backed API envelopes

## Important boundary

This guide helps reviewers assess the public projection surface only. It does not claim to expose the full private N1Hub runtime or all internal development history.
