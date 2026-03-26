# N1Hub Specs

`N1Hub Specs` is the public reference surface for the capsule-first foundations behind N1Hub and CapsuleOS.

This repository is intentionally narrow. It does not try to expose the full private application or every internal workflow. Instead, it publishes the highest-signal public artifacts needed to understand the model:

- the 5-Element Law
- the 16 validation gates
- canonical relation types
- validator-facing docs and OpenAPI
- JSON schema, validator API envelope schema, and neuro-concentrate schema
- minimal example capsules
- a small curated capsule source set

## Why this repository exists

N1Hub is being built as a portable, validator-backed, open-core knowledge system. Public documentation, examples, and schema artifacts need their own clean home so contributors, integrators, and maintainers can understand the format without reading the whole private working repository.

This repository is that home.

## Start here

- [`QUICKSTART.md`](QUICKSTART.md) for the fastest safe orientation
- [`ONBOARDING.md`](ONBOARDING.md) for the full contributor path
- [`docs/overview.md`](docs/overview.md) for the public boundary
- [`docs/projection-doctrine.md`](docs/projection-doctrine.md) for the files-as-projections rule
- [`docs/domain-boundaries.md`](docs/domain-boundaries.md) for published vs deferred domains
- [`docs/generator-readiness.md`](docs/generator-readiness.md) for the generator/projection model
- [`docs/portability.md`](docs/portability.md) for public portability and no-lock-in posture
- [`docs/archive-bundles.md`](docs/archive-bundles.md) for the archive export / replay contract
- [`docs/schema-reference.md`](docs/schema-reference.md) for field-level reference
- [`docs/api-envelopes.md`](docs/api-envelopes.md) for concrete validator request and response shapes
- [`docs/example-coverage.md`](docs/example-coverage.md) for the bounded map of what the public examples actually cover
- [`docs/maintainer-operations.md`](docs/maintainer-operations.md) for the bounded maintainer workflow and release posture
- [`docs/change-control.md`](docs/change-control.md) for the explicit public change, deprecation, and breaking-change posture
- [`docs/artifact-ownership.md`](docs/artifact-ownership.md) for the bounded ownership and stronger-source hierarchy across public artifact families
- [`docs/dependency-graph.md`](docs/dependency-graph.md) for the bounded map of which public artifacts depend on which stronger surfaces
- [`docs/assurance-case.md`](docs/assurance-case.md) for the bounded public claims, strongest evidence, and explicit limits
- [`docs/update-coherence.md`](docs/update-coherence.md) for the bounded sync groups that must move together when public artifacts change
- [`docs/limitations-register.md`](docs/limitations-register.md) for the bounded map of deferred scope, non-promises, and public limitations
- [`docs/evidence-timeline.md`](docs/evidence-timeline.md) for the bounded active-maintenance and public-hardening timeline
- [`docs/review-scorecard.md`](docs/review-scorecard.md) for the bounded reviewer-grade checklist across public repo criteria
- [`docs/verification-matrix.md`](docs/verification-matrix.md) for the bounded map of which check families protect which public surfaces
- [`docs/audience-paths.md`](docs/audience-paths.md) for the bounded role-specific entry paths through the public surface
- [`docs/evidence-strength.md`](docs/evidence-strength.md) for the bounded map of which public surfaces are strongest and which are only secondary or illustrative
- [`schemas/validator-api-envelopes.schema.json`](schemas/validator-api-envelopes.schema.json) for machine-readable validator envelope contracts
- [`docs/integration-guide.md`](docs/integration-guide.md) for the safest consumer path through schema, examples, and API envelopes
- [`docs/route-reference.md`](docs/route-reference.md) for per-route sample mapping
- [`docs/public-contract-index.md`](docs/public-contract-index.md) for a complete public surface map
- [`docs/contract-catalog.md`](docs/contract-catalog.md) for the machine-readable contract map
- [`docs/reviewer-guide.md`](docs/reviewer-guide.md) for the fastest evaluator/reviewer path through the repository
- [`docs/evaluation-packet.md`](docs/evaluation-packet.md) for the condensed external review path
- [`docs/failure-model.md`](docs/failure-model.md) for the fail-closed public trust posture
- [`docs/traceability.md`](docs/traceability.md) for the end-to-end claim-to-evidence map
- [`docs/capability-matrix.md`](docs/capability-matrix.md) for the concrete “what can I do with this repo?” view
- [`docs/verification.md`](docs/verification.md) for the repo verification stack
- [`docs/community-health.md`](docs/community-health.md) for contributor intake and maintainer-facing community boundaries
- [`docs/release-evidence.md`](docs/release-evidence.md) for human and machine-readable release evidence
- [`docs/source-materials.md`](docs/source-materials.md) for provenance and projection inputs
- [`docs/faq.md`](docs/faq.md) for the shortest answers to scope questions
- [`docs/compatibility.md`](docs/compatibility.md) for stability expectations
- [`VERSIONING.md`](VERSIONING.md) for release and contract-change policy
- [`ROADMAP.md`](ROADMAP.md) for the current evolution path

## Repository layout

- `docs/`
  Public human-readable reference docs.
- `schemas/`
  Machine-readable JSON Schema artifacts for capsules and validator API envelopes.
- `examples/`
  Minimal example capsules for documentation and validation.
- `examples/api/`
  Concrete validator request and response payload examples.
- `examples/client/`
  Minimal curl and Node recipes for external consumers.
- `openapi/`
  OpenAPI reference for validator-facing HTTP surfaces.
- `capsules/`
  Curated raw public capsules used as source material for the public specs.

## Repository health

The repository is structured to look like a serious OSS-maintained surface rather than a one-off export:

- community files for contributions, conduct, support, and security
- issue and pull-request templates
- explicit community-health guidance and intake verification
- machine-readable provenance in [`SOURCE_MANIFEST.json`](SOURCE_MANIFEST.json)
- machine-readable contract discovery in [`PUBLIC_CONTRACT_CATALOG.json`](PUBLIC_CONTRACT_CATALOG.json)
- machine-readable release evidence in [`PUBLIC_RELEASE_METADATA.json`](PUBLIC_RELEASE_METADATA.json)
- machine-readable reviewer/program profile in [`PUBLIC_PROJECT_PROFILE.json`](PUBLIC_PROJECT_PROFILE.json)
- machine-readable evaluation packet in [`PUBLIC_EVALUATION_PACKET.json`](PUBLIC_EVALUATION_PACKET.json)
- machine-readable failure model in [`PUBLIC_FAILURE_MODEL.json`](PUBLIC_FAILURE_MODEL.json)
- machine-readable example coverage in [`PUBLIC_EXAMPLE_COVERAGE.json`](PUBLIC_EXAMPLE_COVERAGE.json)
- machine-readable maintenance model in [`PUBLIC_MAINTENANCE_MODEL.json`](PUBLIC_MAINTENANCE_MODEL.json)
- machine-readable change-control model in [`PUBLIC_CHANGE_CONTROL_MODEL.json`](PUBLIC_CHANGE_CONTROL_MODEL.json)
- machine-readable ownership map in [`PUBLIC_OWNERSHIP_MAP.json`](PUBLIC_OWNERSHIP_MAP.json)
- machine-readable dependency graph in [`PUBLIC_DEPENDENCY_GRAPH.json`](PUBLIC_DEPENDENCY_GRAPH.json)
- machine-readable assurance case in [`PUBLIC_ASSURANCE_CASE.json`](PUBLIC_ASSURANCE_CASE.json)
- machine-readable update-coherence map in [`PUBLIC_UPDATE_COHERENCE_MAP.json`](PUBLIC_UPDATE_COHERENCE_MAP.json)
- machine-readable limitations register in [`PUBLIC_LIMITATIONS_REGISTER.json`](PUBLIC_LIMITATIONS_REGISTER.json)
- machine-readable evidence timeline in [`PUBLIC_EVIDENCE_TIMELINE.json`](PUBLIC_EVIDENCE_TIMELINE.json)
- machine-readable review scorecard in [`PUBLIC_REVIEW_SCORECARD.json`](PUBLIC_REVIEW_SCORECARD.json)
- machine-readable verification matrix in [`PUBLIC_VERIFICATION_MATRIX.json`](PUBLIC_VERIFICATION_MATRIX.json)
- machine-readable audience paths in [`PUBLIC_AUDIENCE_PATHS.json`](PUBLIC_AUDIENCE_PATHS.json)
- machine-readable evidence-strength map in [`PUBLIC_EVIDENCE_STRENGTH_MAP.json`](PUBLIC_EVIDENCE_STRENGTH_MAP.json)
- machine-readable traceability matrix in [`PUBLIC_TRACEABILITY_MATRIX.json`](PUBLIC_TRACEABILITY_MATRIX.json)
- machine-readable capability matrix in [`PUBLIC_CAPABILITY_MATRIX.json`](PUBLIC_CAPABILITY_MATRIX.json)
- machine-readable boundary map in [`PUBLIC_BOUNDARY_MAP.json`](PUBLIC_BOUNDARY_MAP.json)
- machine-readable portability profile in [`PUBLIC_PORTABILITY_PROFILE.json`](PUBLIC_PORTABILITY_PROFILE.json)
- a public-release review in [`PUBLIC_RELEASE_REVIEW.md`](PUBLIC_RELEASE_REVIEW.md)
- repo-local verification via `npm run verify:repo`
- local validator-backed example checks
- machine-readable validator API envelope schemas backed by repo-local validation
- a repo-local audit script under [`scripts/audit-public-surface.js`](scripts/audit-public-surface.js)
- API payload examples under [`examples/api/`](examples/api/)
- consumer recipes under [`examples/client/`](examples/client/)
- route-level reference docs under [`docs/route-reference.md`](docs/route-reference.md)
- a release checklist in [`RELEASING.md`](RELEASING.md)
- Apache-2 attribution guidance in [`NOTICE`](NOTICE)

## Scope

This repository is a public specification and reference surface. It is not the complete N1Hub runtime, not a private vault dump, and not a release of internal operator tooling.

## Maintainer

Primary maintainer: `egor-n1`

Maintainer and review policy:

- [`MAINTAINERS.md`](MAINTAINERS.md)
- [`GOVERNANCE.md`](GOVERNANCE.md)

## Quick start

1. Read [`docs/overview.md`](docs/overview.md).
2. Read [`docs/projection-doctrine.md`](docs/projection-doctrine.md) and [`docs/domain-boundaries.md`](docs/domain-boundaries.md).
3. Read [`docs/5-element-law.md`](docs/5-element-law.md) and [`docs/16-gates.md`](docs/16-gates.md).
4. Read [`docs/portability.md`](docs/portability.md) if you need the public portability / archive trust posture.
5. Inspect [`schemas/capsule-schema.json`](schemas/capsule-schema.json).
6. Inspect [`schemas/validator-api-envelopes.schema.json`](schemas/validator-api-envelopes.schema.json) if you need request and response contracts for the validator HTTP surface.
7. Inspect [`PUBLIC_TRACEABILITY_MATRIX.json`](PUBLIC_TRACEABILITY_MATRIX.json) if you want the bounded map from public claims to files and verification commands.
8. Inspect [`PUBLIC_EXAMPLE_COVERAGE.json`](PUBLIC_EXAMPLE_COVERAGE.json) if you want the bounded map from examples to covered routes, law surfaces, and negative paths.
9. Inspect [`PUBLIC_MAINTENANCE_MODEL.json`](PUBLIC_MAINTENANCE_MODEL.json) if you want the bounded model for issue intake, review rules, and release posture.
10. Inspect [`PUBLIC_CHANGE_CONTROL_MODEL.json`](PUBLIC_CHANGE_CONTROL_MODEL.json) if you want the bounded model for additive, deprecated, and breaking public changes.
11. Inspect [`PUBLIC_OWNERSHIP_MAP.json`](PUBLIC_OWNERSHIP_MAP.json) if you want the bounded map of which artifact families are maintained here and which stronger surfaces outrank them.
12. Inspect [`PUBLIC_DEPENDENCY_GRAPH.json`](PUBLIC_DEPENDENCY_GRAPH.json) if you want the bounded map of which public artifacts depend on which stronger surfaces and in what order they are easiest to read.
13. Inspect [`PUBLIC_ASSURANCE_CASE.json`](PUBLIC_ASSURANCE_CASE.json) if you want the bounded public claims, strongest evidence, and explicit non-claims in one reviewer-facing surface.
14. Inspect [`PUBLIC_UPDATE_COHERENCE_MAP.json`](PUBLIC_UPDATE_COHERENCE_MAP.json) if you want the bounded sync groups that must move together when release, reviewer, or contract surfaces change.
15. Inspect [`PUBLIC_LIMITATIONS_REGISTER.json`](PUBLIC_LIMITATIONS_REGISTER.json) if you want the bounded map of deferred domains, non-promises, and public review limits.
16. Inspect [`PUBLIC_EVIDENCE_TIMELINE.json`](PUBLIC_EVIDENCE_TIMELINE.json) if you want the bounded map of how this public surface hardened over time.
17. Inspect [`PUBLIC_REVIEW_SCORECARD.json`](PUBLIC_REVIEW_SCORECARD.json) if you want the bounded reviewer-grade checklist for public repository maturity.
18. Inspect [`PUBLIC_VERIFICATION_MATRIX.json`](PUBLIC_VERIFICATION_MATRIX.json) if you want the bounded map of which verification families protect which public surfaces.
19. Inspect [`PUBLIC_AUDIENCE_PATHS.json`](PUBLIC_AUDIENCE_PATHS.json) if you want the bounded role-specific entry paths for reviewers, integrators, contributors, tool-builders, and maintainers.
20. Inspect [`PUBLIC_EVIDENCE_STRENGTH_MAP.json`](PUBLIC_EVIDENCE_STRENGTH_MAP.json) if you want the bounded map of which public artifacts are strongest, secondary, or illustrative.
21. Compare the examples in [`examples/`](examples/) with the schema in [`schemas/`](schemas/).
22. Review the raw capsule sources in [`capsules/`](capsules/).
23. Run `npm run verify:repo` for the repository-local integrity checks.

## Source of truth

This repository is assembled from public-safe source materials curated out of the sovereign N1Hub vault and validator surfaces. Files here are projection artifacts for public use; the boundary rules are summarized in [`PUBLIC_BOUNDARY_MAP.json`](PUBLIC_BOUNDARY_MAP.json).

## Current status

This is the initial public projection of the N1Hub open-core specification surface. The current release focuses on schema, validator-facing contracts, examples, and repository health rather than on the full runtime codebase.
