# Public Release Review

## Included materials

- community health files: `README`, `LICENSE`, `CONTRIBUTING`, `CODE_OF_CONDUCT`, `SECURITY`, `SUPPORT`
- community intake surfaces: `docs/community-health.md`, `docs/repo-validation-workflow.md`, issue templates, and the pull-request template
- repo-owned GitHub operations surfaces: `.github/labels.json`, `.github/milestones.json`, `docs/github-operations.md`, `.github/release.yml`, and `.github/dependabot.yml`
- root onboarding and governance files: `QUICKSTART`, `ONBOARDING`, `GOVERNANCE`, `MAINTAINERS`, `ROADMAP`, `CHANGELOG`
- repo ergonomics and legal files: `.editorconfig`, `package.json`, `tsconfig.build.json`, `RELEASING`, `NOTICE`, `CITATION.cff`
- GitHub-native maintenance files: `.github/dependabot.yml` and `.github/release.yml`
- public docs for the capsule law, validator, relation types, schema-family selection, field-level schema reference, API envelopes, integration guidance, package consumption, compatibility, examples, anchor governance, repository boundary, FAQ, and source materials
- projection doctrine, domain boundaries, generator-readiness guidance, and a machine-readable boundary map
- portability docs, archive-bundle schema and sample, and a machine-readable portability profile
- archive-bundle validation recipes for repo-local and installed-package consumers, plus a dedicated verifier
- intentionally schema-invalid archive-bundle fixtures, their human guide, package-consumer rejection recipes, and a dedicated verifier
- route reference and verification docs for navigating and auditing the public surface
- explicit versioning policy in `VERSIONING.md`
- machine-readable public contract catalog in `PUBLIC_CONTRACT_CATALOG.json` plus the companion guide in `docs/contract-catalog.md`
- machine-readable release evidence in `PUBLIC_RELEASE_METADATA.json` plus schema-backed release metadata
- machine-readable reviewer/program profile in `PUBLIC_PROJECT_PROFILE.json` plus a reviewer guide
- machine-readable evaluation packet in `PUBLIC_EVALUATION_PACKET.json` plus a concise external-review doc
- machine-readable failure model in `PUBLIC_FAILURE_MODEL.json` plus fail-closed public docs
- machine-readable example coverage in `PUBLIC_EXAMPLE_COVERAGE.json` plus a bounded example-coverage guide
- machine-readable maintenance model in `PUBLIC_MAINTENANCE_MODEL.json` plus a bounded maintainer-operations guide
- machine-readable change-control model in `PUBLIC_CHANGE_CONTROL_MODEL.json` plus a bounded change-control guide
- machine-readable ownership map in `PUBLIC_OWNERSHIP_MAP.json` plus an artifact-ownership guide
- machine-readable traceability matrix in `PUBLIC_TRACEABILITY_MATRIX.json` plus an end-to-end traceability guide
- machine-readable dependency graph in `PUBLIC_DEPENDENCY_GRAPH.json` plus a bounded dependency-and-reading-order guide
- machine-readable assurance case in `PUBLIC_ASSURANCE_CASE.json` plus a bounded public-claims and explicit-limits guide
- machine-readable update-coherence map in `PUBLIC_UPDATE_COHERENCE_MAP.json` plus a bounded sync-group and co-movement guide
- machine-readable limitations register in `PUBLIC_LIMITATIONS_REGISTER.json` plus a bounded deferred-scope and non-promise guide
- machine-readable evidence timeline in `PUBLIC_EVIDENCE_TIMELINE.json` plus a bounded active-maintenance and hardening guide
- machine-readable review scorecard in `PUBLIC_REVIEW_SCORECARD.json` plus a bounded reviewer-grade repo-maturity checklist
- machine-readable verification matrix in `PUBLIC_VERIFICATION_MATRIX.json` plus a bounded check-family coverage guide
- machine-readable audience paths in `PUBLIC_AUDIENCE_PATHS.json` plus a bounded role-specific entry-path guide
- machine-readable evidence-strength map in `PUBLIC_EVIDENCE_STRENGTH_MAP.json` plus a bounded stronger-source hierarchy guide
- machine-readable adoption-readiness map in `PUBLIC_ADOPTION_READINESS.json` plus a bounded ready-vs-deferred audience posture guide
- machine-readable freshness model in `PUBLIC_FRESHNESS_MODEL.json` plus a bounded freshness and stale-summary guide
- machine-readable ecosystem-value map in `PUBLIC_ECOSYSTEM_VALUE_MAP.json` plus a bounded external-utility and program-fit guide
- machine-readable decision log in `PUBLIC_DECISION_LOG.json` plus a bounded public-rationale and design-intent guide
- machine-readable evidence-gaps register in `PUBLIC_EVIDENCE_GAPS_REGISTER.json` plus a bounded still-open-proof and review-needs guide
- machine-readable program-fit map in `PUBLIC_PROGRAM_FIT_MAP.json` plus a bounded reviewer/program-credibility guide
- machine-readable publication-readiness map in `PUBLIC_PUBLICATION_READINESS.json` plus a bounded publication-state and public-release safety guide
- machine-readable capability matrix in `PUBLIC_CAPABILITY_MATRIX.json` plus a capability guide
- machine-readable schemas, including validator API envelope coverage
- public-safe TypeScript and Zod projection files for capsule and validator API contracts, bundle entrypoints, package-surface build config, package-surface verification, fresh-install verification, and both source-level and package-level CommonJS, ESM, and TypeScript consumer recipe examples
- source-level and installed-package TypeScript request-sample readers for the published single, batch, and fix validator envelopes, so request-side TypeScript consumers are no longer construction-only
- compact validator-route reference JSON with auth/query/status metadata, a shared TypeScript validator-route projection, a source-level TypeScript route-behavior reference recipe, and installed-package CommonJS, ESM, plus TypeScript live-client recipes for the published `validate`, `batch`, `fix`, `gates`, and `stats` validator routes, so package-backed route usage no longer stops at static sample parsing or language-specific live recipes
- package-consumer support-response recipes for `gates` and `stats`, plus fresh-install proof that the installed validator projection layer covers support payload parsing as well as `validate` request/response flows
- compact contract-reference JSON artifacts, their directory guide and human guide, CommonJS/ESM/TypeScript/Python package-consumer recipes, and a repo-local verifier
- compact validator-envelope-family reference JSON, a shared TypeScript envelope-family projection, their consumer recipes, and repo-local verifier
- single-file bundled schema artifacts, their human guide, package-consumer recipes, and repo-local verifier
- Ajv-based raw-schema consumer recipes, their human guide, and repo-local verifier
- intentionally schema-invalid capsule fixtures, their human guide, package-consumer rejection recipes, and repo-local verifier
- intentionally schema-invalid validator-envelope fixtures, their human guide, package-consumer rejection recipes, and repo-local verifier
- integrity-seal recomputation docs, repo-local and package-consumer seal recipes, compact integrity constants, and a dedicated verifier for published `G16` example and API hash correctness
- cross-language Python consumption docs, Python recipes for compact references, validator-envelope request/response flows, and public `G16` seal proofs, plus a dedicated verifier for repo-local and extracted packed-artifact execution
- synthetic example capsules, a linked graph example, and a known-ID catalog
- API request, response, error, and stats sample payloads for the validator HTTP surface
- client recipes and trust-model docs for external consumers, including live support-route coverage for `gates` and `stats`
- expanded curated raw public law-adjacent capsules for confidence-vector semantics, subtype meaning, and version lineage
- live validator OpenAPI reference

## Excluded materials

- `/home/n1/Project`
  Private product doctrine with proprietary and private metadata.
- private vault state, personal capsules, prompts, runtime internals, branch state, secrets, and operator memory
- broader repo-governance surfaces not needed for a minimal public specs surface

## Privacy and IP review

- no personal vault data copied
- no secrets or tokens copied
- no private operator docs copied
- public files were derived only from public-safe capsule or validator surfaces

## Validation results

Validated with the live validator from `/home/n1/n1hub.com` on 2026-03-26:

- `examples/example-note.capsule.json`: pass
- `examples/example-task.capsule.json`: pass
- `examples/example-validator-valid.capsule.json`: pass
- `examples/example-validator-invalid-g16.capsule.json`: expected fail on `G16`

Repository-local audit on 2026-03-28:

- `node scripts/audit-public-surface.js`: pass
- `node scripts/check-example-contracts.js`: pass
- `node scripts/check-api-examples.js`: pass
- `node scripts/check-api-schemas.js`: pass
- `tsc --noEmit --pretty false`: pass
- `node scripts/check-package-surface.js`: pass
- `node scripts/check-package-install.js`: pass
- `node scripts/check-raw-capsules.js`: pass
- `node scripts/check-reference-pack.js`: pass
- `node scripts/check-schema-bundles.js`: pass
- `node scripts/check-schema-recipes.js`: pass
- `node scripts/check-archive-recipes.js`: pass
- `node scripts/check-invalid-archive-examples.js`: pass
- `node scripts/check-invalid-examples.js`: pass
- `node scripts/check-invalid-api-examples.js`: pass
- `node scripts/check-integrity-recipes.js`: pass
- `node scripts/check-python-recipes.js`: pass
- `node scripts/check-example-coverage.js`: pass
- `node scripts/check-boundary-map.js`: pass
- `node scripts/check-client-recipes.js`: pass
- `node scripts/check-community-health.js`: pass
- `node scripts/check-github-operations.js`: pass
- `node scripts/check-maintenance-model.js`: pass
- `node scripts/check-change-control.js`: pass
- `node scripts/check-ownership-map.js`: pass
- `node scripts/check-dependency-graph.js`: pass
- `node scripts/check-assurance-case.js`: pass
- `node scripts/check-update-coherence.js`: pass
- `node scripts/check-limitations-register.js`: pass
- `node scripts/check-evidence-timeline.js`: pass
- `node scripts/check-review-scorecard.js`: pass
- `node scripts/check-verification-matrix.js`: pass
- `node scripts/check-audience-paths.js`: pass
- `node scripts/check-evidence-strength.js`: pass
- `node scripts/check-adoption-readiness.js`: pass
- `node scripts/check-freshness.js`: pass
- `node scripts/check-ecosystem-value.js`: pass
- `node scripts/check-decision-log.js`: pass
- `node scripts/check-evidence-gaps.js`: pass
- `node scripts/check-program-fit.js`: pass
- `node scripts/check-publication-readiness.js`: pass
- `node scripts/check-repository-identity.js`: pass
- `node scripts/check-project-profile.js`: pass
- `node scripts/check-capability-matrix.js`: pass
- `node scripts/check-evaluation-packet.js`: pass
- `node scripts/check-failure-model.js`: pass
- `node scripts/check-traceability-matrix.js`: pass
- `node scripts/check-portability-profile.js`: pass
- `node scripts/check-doc-links.js`: pass
- `node scripts/check-contract-catalog.js`: pass
- `node scripts/check-surface-coherence.js`: pass
- `node scripts/check-release-metadata.js`: pass
- manifest coverage: `362` files / `362` manifest entries

Upstream validator checks on 2026-03-26:

- `examples/example-note.capsule.json`: pass
- `examples/example-task.capsule.json`: pass
- `examples/example-validator-valid.capsule.json`: pass
- `examples/example-validator-invalid-g16.capsule.json`: expected fail on `G16`
- `examples/example-project-hub.capsule.json`: pass when validated with `--ids-file examples/example-known-ids.json`

## Residual risks

- some source materials come from a public-oriented vault snapshot rather than from a standalone published repository
- JSON Schema files are public projections aligned to live validator behavior, but the validator remains the stronger source of truth for edge-case semantics
- API response examples are illustrative contract samples, not recorded live HTTP captures from a deployed public service
- validator API envelope schemas are public projections aligned to OpenAPI and curated examples, but the live validator remains the stronger source of truth for runtime-only behavior
- client recipes assume a compatible deployed validator base URL and bearer-token auth model rather than representing a guaranteed hosted endpoint
- `/home/n1/codex-workspace` still contains local hidden Codex state (`.codex/`, `.codexignore`), which is excluded via `.gitignore` and should remain out of any public commit
- `PUBLIC_PROJECT_PROFILE.json` and `PUBLIC_CAPABILITY_MATRIX.json` are intentionally concise summaries and must stay subordinate to the stronger source docs, schemas, OpenAPI, and release evidence
- `PUBLIC_BOUNDARY_MAP.json` is a curated summary of published vs deferred domains and must stay subordinate to the stronger scope, doctrine, and source-material surfaces
- `PUBLIC_PORTABILITY_PROFILE.json` and the archive-bundle sample are public contract summaries, not proof of a deployed hosted export/import service
- `PUBLIC_EVALUATION_PACKET.json` is a reviewer shortcut layer and must stay subordinate to the stronger docs, schemas, release evidence, and machine-readable source surfaces
- `PUBLIC_FAILURE_MODEL.json` is a bounded negative-evidence summary and must stay subordinate to the stronger examples, validator docs, OpenAPI, and portability surfaces
- `PUBLIC_EXAMPLE_COVERAGE.json` is a curated fixture-coverage summary and must stay subordinate to the stronger example files, route docs, and validator-backed checks it references
- `docs/invalid-capsule-examples.md`, `examples/invalid/`, and `scripts/check-invalid-examples.js` are a bounded structural-rejection teaching layer and must stay subordinate to the stronger published schemas, validator docs, and live validator behavior they complement
- `docs/invalid-api-envelope-examples.md`, `examples/api-invalid/`, and `scripts/check-invalid-api-examples.js` are a bounded structural-rejection teaching layer for validator HTTP envelopes and must stay subordinate to the stronger published schemas, OpenAPI, validator docs, and live validator behavior they complement
- `docs/integrity-recipes.md`, the seal-recomputation recipes under `examples/client/`, `references/contract-constants.json`, and `scripts/check-integrity-recipes.js` are a bounded public proof of the published `G16` sealing rule and example/API hash correctness, not a full replacement for live validator edge-case behavior
- `docs/python-consumption.md`, the Python recipes under `examples/client/`, and `scripts/check-python-recipes.js` are a bounded raw-asset and extracted-artifact consumer path for compact references and public `G16` seal proofs, not a Python SDK or PyPI distribution promise
- `PUBLIC_MAINTENANCE_MODEL.json` is a bounded workflow summary and must stay subordinate to the stronger maintainer docs, community intake surfaces, release docs, and verification evidence it references
- `PUBLIC_CHANGE_CONTROL_MODEL.json` is a bounded change-control summary and must stay subordinate to the stronger versioning, compatibility, changelog, and release-evidence surfaces it references
- `PUBLIC_OWNERSHIP_MAP.json` is a bounded ownership-and-authority summary and must stay subordinate to the stronger docs, schemas, provenance, and contract surfaces it references
- `PUBLIC_TRACEABILITY_MATRIX.json` is a curated reviewer-facing map and must stay subordinate to the stronger docs, schemas, examples, and verification artifacts it references
- `PUBLIC_DEPENDENCY_GRAPH.json` is a bounded dependency-and-reading-order summary and must stay subordinate to the stronger docs, schemas, provenance, and release-evidence surfaces it references
- `PUBLIC_ASSURANCE_CASE.json` is a bounded reviewer-facing assurance summary and must stay subordinate to the stronger docs, schemas, examples, provenance, failure-model, and release-evidence surfaces it references
- `PUBLIC_UPDATE_COHERENCE_MAP.json` is a bounded sync-group summary and must stay subordinate to the stronger release, provenance, contract, maintainer, and reviewer surfaces it references
- `PUBLIC_LIMITATIONS_REGISTER.json` is a bounded deferred-scope and non-promise summary and must stay subordinate to the stronger boundary, assurance, scope, and release surfaces it references
- `PUBLIC_EVIDENCE_TIMELINE.json` is a bounded maintenance-history summary and must stay subordinate to the stronger changelog, release-evidence, reviewer, and git-history surfaces it references
- `PUBLIC_REVIEW_SCORECARD.json` is a bounded reviewer checklist and must stay subordinate to the stronger docs, schemas, examples, release evidence, and git-backed maintenance history it references
- `PUBLIC_VERIFICATION_MATRIX.json` is a bounded verification-coverage summary and must stay subordinate to the stronger check scripts, release evidence, and live validator behavior it references
- `PUBLIC_AUDIENCE_PATHS.json` is a bounded role-specific navigation summary and must stay subordinate to the stronger onboarding, reviewer, maintainer, integration, and release surfaces it references
- `PUBLIC_ADOPTION_READINESS.json` is a bounded audience-readiness summary and must stay subordinate to the stronger audience-path, limitations, evidence-strength, and release-evidence surfaces it references
- `PUBLIC_FRESHNESS_MODEL.json` is a bounded freshness summary and must stay subordinate to stronger release evidence, audience paths, reviewer docs, and maintenance-history surfaces it references
- `PUBLIC_ECOSYSTEM_VALUE_MAP.json` is a bounded external-utility summary and must stay subordinate to stronger contracts, capability evidence, reviewer docs, adoption posture, and release evidence surfaces it references
- `PUBLIC_DECISION_LOG.json` is a bounded rationale summary and must stay subordinate to stronger boundary, assurance, provenance, release-evidence, and trust-model surfaces it references
- `PUBLIC_EVIDENCE_GAPS_REGISTER.json` is a bounded maturity-gap summary and must stay subordinate to stronger release evidence, limitations, freshness, adoption, and ecosystem-value surfaces it references
- `PUBLIC_PROGRAM_FIT_MAP.json` is a bounded reviewer/program-fit summary and must stay subordinate to stronger project-profile, evaluation, verification, ecosystem-value, evidence-gap, and release-evidence surfaces it references
- `PUBLIC_PUBLICATION_READINESS.json` is a bounded publication-state and public-release-safety summary and must stay subordinate to stronger front-door, boundary, verification, evidence-gap, and release-evidence surfaces it references
- `projections/typescript/capsule.ts`, `projections/typescript/validator-api.ts`, `projections/zod/capsule.ts`, `projections/zod/validator-api.ts`, and the source-level client recipe examples are public-safe convenience projections and must stay subordinate to the stronger JSON Schema, OpenAPI, curated API examples, and live validator behavior they align to
- `docs/npm-consumption.md`, `package.json`, `tsconfig.build.json`, `scripts/check-package-install.js`, the built projection bundles, and the package-based client recipes are a convenience distribution layer and must stay subordinate to the stronger source projections, JSON Schemas, OpenAPI, curated examples, and live validator behavior they package
- `docs/schema-bundles.md`, `schemas/capsule-schema.bundle.json`, `schemas/validator-api-envelopes.bundle.json`, the bundled-schema recipes under `examples/client/`, and `scripts/check-schema-bundles.js` are a bounded convenience layer for lower-friction single-file schema consumption and must stay subordinate to the stronger raw schema files, OpenAPI artifacts, and live validator behavior they simplify
- `docs/archive-validation-recipes.md`, the archive-bundle Ajv recipes under `examples/client/`, and `scripts/check-archive-recipes.js` are a bounded portability-contract teaching layer and must stay subordinate to the stronger archive schema, portability docs, and non-hosted trust posture they simplify
- `docs/invalid-archive-bundle-examples.md`, `examples/archive-invalid/`, and `scripts/check-invalid-archive-examples.js` are a bounded structural portability teaching layer and must stay subordinate to the stronger archive schema, valid archive sample, portability docs, and non-hosted trust posture they complement
