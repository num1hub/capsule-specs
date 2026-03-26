# Release Evidence

This repository keeps release evidence in both human-readable and machine-readable forms.

## Human-readable surfaces

- [`../CHANGELOG.md`](../CHANGELOG.md)
  Release history and additive change narrative.
- [`../PUBLIC_RELEASE_REVIEW.md`](../PUBLIC_RELEASE_REVIEW.md)
  Human-readable inclusion, exclusion, validation, and residual-risk summary.
- [`../VERSIONING.md`](../VERSIONING.md)
  Stability and change-class policy.

## Machine-readable surfaces

- [`../PUBLIC_RELEASE_METADATA.json`](../PUBLIC_RELEASE_METADATA.json)
  Structured release evidence for tooling, audits, and future automation.
- [`../PUBLIC_CONTRACT_CATALOG.json`](../PUBLIC_CONTRACT_CATALOG.json)
  Structured map of the public contract surface and its verification paths.
- [`../PUBLIC_PROJECT_PROFILE.json`](../PUBLIC_PROJECT_PROFILE.json)
  Machine-readable reviewer/program profile for fast external evaluation.
- [`../PUBLIC_EVALUATION_PACKET.json`](../PUBLIC_EVALUATION_PACKET.json)
  Machine-readable fast-review packet for bounded external evaluation.
- [`../PUBLIC_FAILURE_MODEL.json`](../PUBLIC_FAILURE_MODEL.json)
  Machine-readable summary of the public fail-closed and negative-evidence posture.
- [`../PUBLIC_EXAMPLE_COVERAGE.json`](../PUBLIC_EXAMPLE_COVERAGE.json)
  Machine-readable map of which public examples cover which capsule, route, and negative-path surfaces.
- [`../PUBLIC_MAINTENANCE_MODEL.json`](../PUBLIC_MAINTENANCE_MODEL.json)
  Machine-readable summary of the bounded public maintainer workflow and release posture.
- [`../PUBLIC_CHANGE_CONTROL_MODEL.json`](../PUBLIC_CHANGE_CONTROL_MODEL.json)
  Machine-readable summary of additive, deprecated, and breaking public change posture.
- [`../PUBLIC_OWNERSHIP_MAP.json`](../PUBLIC_OWNERSHIP_MAP.json)
  Machine-readable summary of which public artifact families are maintained here and which stronger surfaces outrank them.
- [`../PUBLIC_DEPENDENCY_GRAPH.json`](../PUBLIC_DEPENDENCY_GRAPH.json)
  Machine-readable summary of which public artifacts depend on which stronger surfaces and the shortest reading paths through the stack.
- [`../PUBLIC_ASSURANCE_CASE.json`](../PUBLIC_ASSURANCE_CASE.json)
  Machine-readable summary of bounded public claims, strongest evidence, and explicit review limits.
- [`../PUBLIC_UPDATE_COHERENCE_MAP.json`](../PUBLIC_UPDATE_COHERENCE_MAP.json)
  Machine-readable summary of which public surfaces must move together when release, reviewer, or contract layers change.
- [`../PUBLIC_LIMITATIONS_REGISTER.json`](../PUBLIC_LIMITATIONS_REGISTER.json)
  Machine-readable summary of deferred scope, non-promises, and bounded public limitations.
- [`../PUBLIC_EVIDENCE_TIMELINE.json`](../PUBLIC_EVIDENCE_TIMELINE.json)
  Machine-readable summary of the active-maintenance and public-hardening timeline for this public specs repository.
- [`../PUBLIC_REVIEW_SCORECARD.json`](../PUBLIC_REVIEW_SCORECARD.json)
  Machine-readable bounded review checklist for external repo-maturity assessment.
- [`../PUBLIC_VERIFICATION_MATRIX.json`](../PUBLIC_VERIFICATION_MATRIX.json)
  Machine-readable map of which verification families protect which public surfaces and failure classes.
- [`../PUBLIC_AUDIENCE_PATHS.json`](../PUBLIC_AUDIENCE_PATHS.json)
  Machine-readable map of the bounded role-specific entry paths through the public surface.
- [`../PUBLIC_EVIDENCE_STRENGTH_MAP.json`](../PUBLIC_EVIDENCE_STRENGTH_MAP.json)
  Machine-readable map of which public surfaces are strongest, secondary, or illustrative.
- [`../PUBLIC_ADOPTION_READINESS.json`](../PUBLIC_ADOPTION_READINESS.json)
  Machine-readable map of which public audience paths are ready today, which prerequisites apply, and which hosted-runtime expectations remain deferred.
- [`../PUBLIC_FRESHNESS_MODEL.json`](../PUBLIC_FRESHNESS_MODEL.json)
  Machine-readable map of which public summary layers go stale under which triggers and which release-facing evidence should refresh them.
- [`../PUBLIC_ECOSYSTEM_VALUE_MAP.json`](../PUBLIC_ECOSYSTEM_VALUE_MAP.json)
  Machine-readable map of why this public surface matters to external reviewers, integrators, tool-builders, contributors, and OSS-support programs.
- [`../PUBLIC_DECISION_LOG.json`](../PUBLIC_DECISION_LOG.json)
  Machine-readable map of the major public design decisions and the rationale behind this repository's bounded shape.
- [`../PUBLIC_EVIDENCE_GAPS_REGISTER.json`](../PUBLIC_EVIDENCE_GAPS_REGISTER.json)
  Machine-readable map of which important public-facing evidence is still intentionally incomplete and where review confidence should remain bounded.
- [`../PUBLIC_PROGRAM_FIT_MAP.json`](../PUBLIC_PROGRAM_FIT_MAP.json)
  Machine-readable map of why this public surface is reviewer/program-credible today without treating that as proof of support-program acceptance.
- [`../PUBLIC_PUBLICATION_READINESS.json`](../PUBLIC_PUBLICATION_READINESS.json)
  Machine-readable map of why this public surface is already ready for GitHub publication without treating publication itself as proof of adoption, approval, or hosted-runtime maturity.
- [`../PUBLIC_TRACEABILITY_MATRIX.json`](../PUBLIC_TRACEABILITY_MATRIX.json)
  Machine-readable map from public claims to strongest surfaces and verification commands.
- [`../PUBLIC_CAPABILITY_MATRIX.json`](../PUBLIC_CAPABILITY_MATRIX.json)
  Machine-readable matrix of what the current public surface supports in practical terms.
- [`../PUBLIC_BOUNDARY_MAP.json`](../PUBLIC_BOUNDARY_MAP.json)
  Machine-readable summary of which domains are published here and which remain intentionally deferred.
- [`../PUBLIC_PORTABILITY_PROFILE.json`](../PUBLIC_PORTABILITY_PROFILE.json)
  Machine-readable summary of the public portability and archive trust posture.
- [`../schemas/public-release-metadata.schema.json`](../schemas/public-release-metadata.schema.json)
  JSON Schema for the release-metadata file.
- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
  JSON Schema bundle for the public validator request and response envelope layer.

## Why this split exists

The Markdown review surfaces are optimized for people. The JSON surfaces are optimized for consistency checks, future generators, and external programs that want structured evidence instead of scraped prose.

The client recipes and trust-model docs do not replace release evidence, but they help reviewers understand whether the public surface is only documented or also realistically consumable.

The API envelope schema and its dedicated verification script strengthen that claim by keeping the public HTTP example layer machine-checkable.

The community-health doc and its dedicated verification script strengthen the repository's OSS maintainership surface by keeping contributor intake explicit and reviewable.

The reviewer guide and public project profile strengthen external evaluation by making repository maturity legible without scraping the whole tree.

The evaluation packet strengthens that path further by giving external reviewers one bounded summary of strongest evidence, review commands, and explicit non-claims.

The failure model strengthens trust review by making bounded negative paths explicit instead of leaving failure semantics implicit in scattered examples.

The example coverage layer strengthens reviewability by making the public fixture set legible as a bounded coverage pack instead of a random pile of sample files.

The maintenance model strengthens reviewability by making public maintainer workflow explicit instead of forcing outside readers to infer it from scattered community and release docs.

The change-control model strengthens release review by making additive, deprecated, and breaking public-change posture explicit instead of leaving it scattered across versioning and changelog prose.

The ownership map strengthens trust review by making artifact-family ownership and stronger-source hierarchy explicit instead of leaving authority splits implicit across multiple docs.

The dependency graph strengthens reviewer navigation by making reading order and public-surface dependency structure explicit instead of forcing reviewers to infer it from filenames alone.

The assurance case strengthens bounded external evaluation by collecting public claims, strongest evidence, and explicit limits into one reviewer-facing machine-readable layer.

The update-coherence map strengthens release discipline by making the expected co-movement groups explicit instead of leaving reviewer and release sync as an implicit maintainer habit.

The limitations register strengthens trust review by making deferred scope and non-promised behavior explicit instead of forcing reviewers to infer the repo's limits from scattered caveats.

The evidence timeline strengthens maintenance review by making the public hardening path explicit instead of forcing reviewers to infer activity and sequencing from raw git output alone.

The review scorecard strengthens reviewer discipline by making repo-maturity criteria explicit instead of leaving external evaluation to scattered impressions.

The verification matrix strengthens release discipline by making check coverage explicit instead of leaving verification depth implicit behind one top-level command.

The audience-paths layer strengthens release discipline by making role-specific navigation explicit instead of leaving reviewer, contributor, integrator, and maintainer entry order to folklore.

The evidence-strength layer strengthens release discipline by making stronger-source hierarchy explicit instead of letting reviewers or integrators over-trust summary layers.

The adoption-readiness layer strengthens release discipline by making ready vs deferred public audience posture explicit instead of leaving adoption claims implicit across reviewer, contributor, and integration docs.

The freshness layer strengthens release discipline by making stale-summary triggers explicit instead of leaving reviewers to infer freshness from timestamps, counts, or git history alone.

The ecosystem-value layer strengthens release discipline by making external utility explicit instead of leaving reviewers or programs to infer why the public surface matters from raw counts, filenames, or maintainer intent alone.

The decision-log layer strengthens release discipline by making public design intent explicit instead of leaving projection rationale, trust choices, and scope posture to implicit maintainer folklore.
The evidence-gaps layer strengthens release discipline by making still-open proof gaps explicit instead of letting a polished public surface imply maturity it cannot yet prove.
The traceability matrix strengthens reviewability by making claim-to-evidence and claim-to-verification links explicit instead of leaving them implicit across multiple files.

The capability matrix strengthens practical evaluation by showing what an outside reader can actually do with the current published surface.

The boundary map strengthens scope review by making the published-vs-deferred split explicit rather than implicit.

The portability profile strengthens trust review by making the public export/import posture explicit without pretending the full hosted lifecycle runtime is public.

## Release discipline

When the public surface changes, these files should move together:

- `CHANGELOG.md`
- `PUBLIC_RELEASE_REVIEW.md`
- `PUBLIC_RELEASE_METADATA.json`
- `PUBLIC_CONTRACT_CATALOG.json`
- `PUBLIC_PROJECT_PROFILE.json`
- `PUBLIC_EVALUATION_PACKET.json`
- `PUBLIC_FAILURE_MODEL.json`
- `PUBLIC_EXAMPLE_COVERAGE.json`
- `PUBLIC_MAINTENANCE_MODEL.json`
- `PUBLIC_CHANGE_CONTROL_MODEL.json`
- `PUBLIC_OWNERSHIP_MAP.json`
- `PUBLIC_DEPENDENCY_GRAPH.json`
- `PUBLIC_ASSURANCE_CASE.json`
- `PUBLIC_UPDATE_COHERENCE_MAP.json`
- `PUBLIC_LIMITATIONS_REGISTER.json`
- `PUBLIC_EVIDENCE_TIMELINE.json`
- `PUBLIC_REVIEW_SCORECARD.json`
- `PUBLIC_VERIFICATION_MATRIX.json`
- `PUBLIC_AUDIENCE_PATHS.json`
- `PUBLIC_EVIDENCE_STRENGTH_MAP.json`
- `PUBLIC_ADOPTION_READINESS.json`
- `PUBLIC_FRESHNESS_MODEL.json`
- `PUBLIC_ECOSYSTEM_VALUE_MAP.json`
- `PUBLIC_DECISION_LOG.json`
- `PUBLIC_EVIDENCE_GAPS_REGISTER.json`
- `PUBLIC_TRACEABILITY_MATRIX.json`
- `PUBLIC_CAPABILITY_MATRIX.json`
- `PUBLIC_BOUNDARY_MAP.json`
- `PUBLIC_PORTABILITY_PROFILE.json`

If they drift, the release evidence is incomplete even if the individual docs still read well.
