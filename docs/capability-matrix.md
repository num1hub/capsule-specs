# Capability Matrix

This repository publishes many artifacts, but readers often need a simpler answer: what can I actually do with this public surface today?

The machine-readable answer lives in [`../PUBLIC_CAPABILITY_MATRIX.json`](../PUBLIC_CAPABILITY_MATRIX.json).

## What the matrix describes

Each capability captures:

- who the capability is for
- what concrete outcome the public repo supports
- which artifacts are the strongest surfaces for that outcome
- which supporting artifacts deepen or contextualize it
- which verification commands protect the capability

## Example capability families

- inspect the capsule law
- validate public examples locally
- build a validator client from OpenAPI and schema-backed envelopes
- review repository maturity quickly
- follow the shortest external evaluation path
- inspect fail-closed public behavior
- assess example coverage
- inspect maintainer operations
- understand change control and deprecation
- understand artifact ownership and authority
- follow the public dependency graph
- review the bounded public assurance case
- inspect required public update-coherence groups
- inspect explicit deferred scope and public limitations
- inspect active maintenance and public hardening history
- apply a bounded review scorecard for external repo evaluation
- inspect verification coverage across public check families
- follow role-specific audience entry paths across reviewer, contributor, integrator, tool-builder, and maintainer surfaces
- inspect the stronger-source hierarchy across public contracts, summaries, and illustrative artifacts
- inspect bounded public adoption readiness across reviewer, contributor, integrator, tool-builder, maintainer, and deferred hosted-runtime expectations
- inspect freshness posture and stale-summary triggers across reviewer, release, governance, and adoption surfaces
- inspect explicit ecosystem value and external utility across reviewer, integrator, contributor, tool-builder, and OSS-support-program paths
- inspect bounded public design decisions and rationale across projection, trust, and release surfaces
- trace public claims end-to-end
- understand projection and domain boundaries
- review portability and archive trust posture
- contribute safely to the public surface
- trace provenance and release state

## Why this matters

Good OSS repositories are not only readable; they are usable. The capability matrix makes that usability explicit instead of forcing reviewers or integrators to infer it from a large tree of files.

## Relationship to other machine-readable files

- [`../PUBLIC_CONTRACT_CATALOG.json`](../PUBLIC_CONTRACT_CATALOG.json)
  Answers: which public artifacts exist, what kind they are, and how stable they are.
- [`../PUBLIC_RELEASE_METADATA.json`](../PUBLIC_RELEASE_METADATA.json)
  Answers: what was verified for the current release state.
- [`../PUBLIC_PROJECT_PROFILE.json`](../PUBLIC_PROJECT_PROFILE.json)
  Answers: what the repository is, who maintains it, and which high-level health signals it currently shows.
- [`../PUBLIC_EVALUATION_PACKET.json`](../PUBLIC_EVALUATION_PACKET.json)
  Answers: what an external reviewer should inspect first, which evidence is strongest, and which claims are intentionally not being made.
- [`../PUBLIC_FAILURE_MODEL.json`](../PUBLIC_FAILURE_MODEL.json)
  Answers: which high-signal negative paths and bounded rejection behaviors are explicitly documented on the public surface.
- [`../PUBLIC_EXAMPLE_COVERAGE.json`](../PUBLIC_EXAMPLE_COVERAGE.json)
  Answers: which public examples cover which capsule, route, graph-link, and negative-path surfaces.
- [`../PUBLIC_MAINTENANCE_MODEL.json`](../PUBLIC_MAINTENANCE_MODEL.json)
  Answers: how the public intake, review, and release workflow is bounded for maintainers and outside contributors.
- [`../PUBLIC_CHANGE_CONTROL_MODEL.json`](../PUBLIC_CHANGE_CONTROL_MODEL.json)
  Answers: how additive, deprecated, and breaking public changes should be classified and synchronized.
- [`../PUBLIC_OWNERSHIP_MAP.json`](../PUBLIC_OWNERSHIP_MAP.json)
  Answers: which public artifact families are maintained here and which stronger surfaces outrank them.
- [`../PUBLIC_DEPENDENCY_GRAPH.json`](../PUBLIC_DEPENDENCY_GRAPH.json)
  Answers: which public artifacts depend on which stronger surfaces and the shortest reading paths through the repo.
- [`../PUBLIC_ASSURANCE_CASE.json`](../PUBLIC_ASSURANCE_CASE.json)
  Answers: which bounded public claims are being made, which stronger evidence supports them, and which limits keep them honest.
- [`../PUBLIC_UPDATE_COHERENCE_MAP.json`](../PUBLIC_UPDATE_COHERENCE_MAP.json)
  Answers: which public surfaces must co-move when reviewer, release, contract, or teaching layers change.
- [`../PUBLIC_LIMITATIONS_REGISTER.json`](../PUBLIC_LIMITATIONS_REGISTER.json)
  Answers: which important domains remain deferred, which guarantees are not being made, and where the public specs surface intentionally stops.
- [`../PUBLIC_EVIDENCE_TIMELINE.json`](../PUBLIC_EVIDENCE_TIMELINE.json)
  Answers: which major public-surface hardening milestones already happened and how active maintenance is made legible to reviewers.
- [`../PUBLIC_REVIEW_SCORECARD.json`](../PUBLIC_REVIEW_SCORECARD.json)
  Answers: which bounded reviewer criteria the repo currently satisfies and which strongest surfaces support each criterion.
- [`../PUBLIC_VERIFICATION_MATRIX.json`](../PUBLIC_VERIFICATION_MATRIX.json)
  Answers: which check families protect which public surfaces and what kinds of failure they are intended to catch.
- [`../PUBLIC_AUDIENCE_PATHS.json`](../PUBLIC_AUDIENCE_PATHS.json)
  Answers: which bounded entry path is correct for each public audience instead of assuming one generic repo walkthrough fits everyone.
- [`../PUBLIC_EVIDENCE_STRENGTH_MAP.json`](../PUBLIC_EVIDENCE_STRENGTH_MAP.json)
  Answers: which public surfaces are strongest, which are secondary, and which are illustrative before a reader treats a summary as authoritative.
- [`../PUBLIC_ADOPTION_READINESS.json`](../PUBLIC_ADOPTION_READINESS.json)
  Answers: which public audiences can adopt which parts of the public surface today, under which prerequisites, and where adoption remains intentionally deferred.
- [`../PUBLIC_FRESHNESS_MODEL.json`](../PUBLIC_FRESHNESS_MODEL.json)
  Answers: which public summary layers go stale under which triggers, which signals expose drift, and which release-facing evidence should refresh them.
- [`../PUBLIC_ECOSYSTEM_VALUE_MAP.json`](../PUBLIC_ECOSYSTEM_VALUE_MAP.json)
  Answers: why the public surface matters to external reviewers, integrators, tool-builders, contributors, and OSS-support programs without relying on vague aspiration.
- [`../PUBLIC_DECISION_LOG.json`](../PUBLIC_DECISION_LOG.json)
  Answers: which major public design decisions are intentional and which stronger surfaces justify them.
- [`../PUBLIC_TRACEABILITY_MATRIX.json`](../PUBLIC_TRACEABILITY_MATRIX.json)
  Answers: how the strongest public claims connect to docs, schemas, examples, and verification commands.
- [`../PUBLIC_BOUNDARY_MAP.json`](../PUBLIC_BOUNDARY_MAP.json)
  Answers: which boundaries are published in this repo and which ones remain intentionally deferred.
- [`../PUBLIC_PORTABILITY_PROFILE.json`](../PUBLIC_PORTABILITY_PROFILE.json)
  Answers: how the public surface describes portability, archive trust, and non-promised hosted behavior.
- [`../PUBLIC_CAPABILITY_MATRIX.json`](../PUBLIC_CAPABILITY_MATRIX.json)
  Answers: what an outside reader can concretely do with the public surface.
