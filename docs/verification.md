# Verification

The public repo is intentionally small, but it still has a real verification stack.

## Main entrypoint

Run:

```bash
npm run verify:repo
```

This executes all repository-local checks in the expected order.

## Checks

- `npm run audit:public-surface`
  Confirms every public file is covered by `SOURCE_MANIFEST.json` and validates JSON integrity.
- `npm run check:examples`
  Verifies the capsule example set, known-ID catalog, and graph-link assumptions.
- `npm run check:api-examples`
  Verifies validator request and response sample payloads and keeps them aligned with the capsule examples.
- `npm run check:api-schemas`
  Validates the published API example payloads against `schemas/validator-api-envelopes.schema.json`.
- `npm run check:example-coverage`
  Verifies `PUBLIC_EXAMPLE_COVERAGE.json`, capsule/API example coverage links, and surrounding example docs.
- `npm run check:boundary-map`
  Verifies `PUBLIC_BOUNDARY_MAP.json`, the new projection/boundary docs, and their contract-catalog coverage.
- `npm run check:client-recipes`
  Verifies curl and Node consumer snippets, route targeting, env-var assumptions, and Node syntax.
- `npm run check:community-health`
  Verifies contributor-facing docs, issue templates, support/security alignment, and intake-surface references.
- `npm run check:maintenance-model`
  Verifies `PUBLIC_MAINTENANCE_MODEL.json`, maintainer-facing docs, and public workflow/release posture references.
- `npm run check:change-control`
  Verifies `PUBLIC_CHANGE_CONTROL_MODEL.json`, change-control docs, and release/stability posture references.
- `npm run check:ownership-map`
  Verifies `PUBLIC_OWNERSHIP_MAP.json`, ownership/authority docs, and stronger-source hierarchy references.
- `npm run check:dependency-graph`
  Verifies `PUBLIC_DEPENDENCY_GRAPH.json`, dependency/reading-order docs, and reviewer-navigation references.
- `npm run check:assurance-case`
  Verifies `PUBLIC_ASSURANCE_CASE.json`, its bounded claims, strongest-evidence references, and reviewer-facing assurance docs.
- `npm run check:update-coherence`
  Verifies `PUBLIC_UPDATE_COHERENCE_MAP.json`, sync-group docs, and release / reviewer references for co-moving surfaces.
- `npm run check:limitations-register`
  Verifies `PUBLIC_LIMITATIONS_REGISTER.json`, deferred-scope and non-promise docs, and reviewer-facing limitation references.
- `npm run check:evidence-timeline`
  Verifies `PUBLIC_EVIDENCE_TIMELINE.json`, milestone commit references, active-maintenance docs, and reviewer-facing history references.
- `npm run check:review-scorecard`
  Verifies `PUBLIC_REVIEW_SCORECARD.json`, bounded reviewer criteria, and the surrounding reviewer / release references.
- `npm run check:verification-matrix`
  Verifies `PUBLIC_VERIFICATION_MATRIX.json`, command-family coverage, protected public surfaces, and reviewer-facing verification references.
- `npm run check:audience-paths`
  Verifies `PUBLIC_AUDIENCE_PATHS.json`, role-specific entry paths, and the surrounding onboarding / reviewer / integration references.
- `npm run check:evidence-strength`
  Verifies `PUBLIC_EVIDENCE_STRENGTH_MAP.json`, stronger-source hierarchy, and the surrounding trust / reviewer / compatibility references.
- `npm run check:adoption-readiness`
  Verifies `PUBLIC_ADOPTION_READINESS.json`, audience-specific readiness posture, prerequisites, deferred hosted-runtime expectations, and the surrounding reviewer / release / governance references.
- `npm run check:freshness`
  Verifies `PUBLIC_FRESHNESS_MODEL.json`, stale-summary triggers, freshness signals, and the surrounding reviewer / release / maintenance references.
- `npm run check:docs`
  Verifies Markdown links across the public documentation surface.
- `npm run check:catalog`
  Verifies `PUBLIC_CONTRACT_CATALOG.json` structure, version parity, and required entries.
- `npm run check:evaluation-packet`
  Verifies `PUBLIC_EVALUATION_PACKET.json`, its strongest-evidence references, and the surrounding review-path docs.
- `npm run check:failure-model`
  Verifies `PUBLIC_FAILURE_MODEL.json`, negative-path example references, and fail-closed review surfaces.
- `npm run check:traceability`
  Verifies `PUBLIC_TRACEABILITY_MATRIX.json`, its strongest-evidence links, and the surrounding reviewer-facing docs.
- `npm run check:portability`
  Verifies `PUBLIC_PORTABILITY_PROFILE.json`, the archive-bundle schema, the sample archive payload, and portability references across the public docs.
- `npm run check:project-profile`
  Verifies `PUBLIC_PROJECT_PROFILE.json` against real repo counts, maintainer identity, reviewer shortcuts, and verification surfaces.
- `npm run check:capability-matrix`
  Verifies `PUBLIC_CAPABILITY_MATRIX.json` against real files, catalog coverage, reviewer references, and package-level verification commands.
- `npm run check:surface`
  Verifies cross-surface coherence between the catalog, manifest, package scripts, and human-readable index/review files.
- `npm run check:release`
  Verifies `PUBLIC_RELEASE_METADATA.json`, coverage counts, legal notice presence, and release-evidence consistency.

## Upstream validator checks

For the strongest contract evidence, also validate the example capsules with the live validator in the upstream N1Hub repo. That is especially important for:

- `example-project-hub.capsule.json` with `--ids-file`
- the intentional negative `G16` example
- any new example added to the public surface

## Release expectation

Serious public changes should not be considered complete until:

- `npm run verify:repo` passes
- changed examples or contracts are rechecked against the live validator where applicable
- `CHANGELOG.md`, `PUBLIC_RELEASE_REVIEW.md`, `PUBLIC_RELEASE_METADATA.json`, and `PUBLIC_CONTRACT_CATALOG.json` stay aligned
- `PUBLIC_PROJECT_PROFILE.json` stays aligned with the real repository shape and reviewer-facing docs
- `PUBLIC_CAPABILITY_MATRIX.json` stays aligned with the real public artifacts and supported user outcomes
- `PUBLIC_BOUNDARY_MAP.json` stays aligned with the published-vs-deferred boundary posture and its doctrine docs
- `PUBLIC_PORTABILITY_PROFILE.json` stays aligned with the portability docs, archive schema, and archive example surfaces
- `PUBLIC_EVALUATION_PACKET.json` stays aligned with reviewer docs, strongest-evidence references, and release-evidence surfaces
- `PUBLIC_FAILURE_MODEL.json` stays aligned with negative examples, fail-closed docs, and validator / portability trust surfaces
- `PUBLIC_EXAMPLE_COVERAGE.json` stays aligned with the real capsule examples, API examples, route docs, and failure-model surfaces it summarizes
- `PUBLIC_MAINTENANCE_MODEL.json` stays aligned with maintainer docs, community intake surfaces, release posture, and expected verification evidence
- `PUBLIC_CHANGE_CONTROL_MODEL.json` stays aligned with versioning, compatibility, release docs, reviewer docs, and public deprecation / breaking-change posture
- `PUBLIC_OWNERSHIP_MAP.json` stays aligned with trust-model docs, source-material docs, projection doctrine, reviewer docs, and the artifact families it classifies
- `PUBLIC_DEPENDENCY_GRAPH.json` stays aligned with reviewer docs, capability docs, traceability, release evidence, and the public artifact relationships it summarizes
- `PUBLIC_ASSURANCE_CASE.json` stays aligned with reviewer docs, release evidence, failure posture, traceability, and the bounded claims and limits it summarizes
- `PUBLIC_UPDATE_COHERENCE_MAP.json` stays aligned with maintenance docs, change-control docs, release evidence, reviewer docs, and the co-moving surface groups it summarizes
- `PUBLIC_LIMITATIONS_REGISTER.json` stays aligned with boundary docs, scope docs, assurance, release review, and the deferred / non-promised posture it summarizes
- `PUBLIC_EVIDENCE_TIMELINE.json` stays aligned with the real hardening milestones, release evidence, reviewer docs, and the active-maintenance history it summarizes
- `PUBLIC_REVIEW_SCORECARD.json` stays aligned with the real reviewer criteria, strongest evidence, release evidence, and bounded limits it summarizes
- `PUBLIC_VERIFICATION_MATRIX.json` stays aligned with the real check stack, protected artifacts, failure classes, and release evidence it summarizes
- `PUBLIC_AUDIENCE_PATHS.json` stays aligned with the real onboarding, reviewer, contributor, integrator, tool-builder, and maintainer entry paths it summarizes
- `PUBLIC_EVIDENCE_STRENGTH_MAP.json` stays aligned with the real stronger-source hierarchy across schemas, OpenAPI, examples, summaries, and release evidence
- `PUBLIC_ADOPTION_READINESS.json` stays aligned with the real ready vs deferred posture across reviewer, contributor, integrator, tool-builder, maintainer, and hosted-runtime expectations
- `PUBLIC_FRESHNESS_MODEL.json` stays aligned with the real freshness triggers, stale signals, release evidence, and summary layers it classifies
- `PUBLIC_TRACEABILITY_MATRIX.json` stays aligned with the real docs, schemas, examples, and verification commands it claims to connect
- API examples stay aligned with `schemas/validator-api-envelopes.schema.json`
- contributor-facing intake surfaces stay aligned with `docs/community-health.md`
- client recipes stay aligned with the API examples and route docs
