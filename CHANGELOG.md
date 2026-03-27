# Changelog

## Unreleased

- added citation metadata, Dependabot update hygiene, repo-owned GitHub label/milestone configs, release-note categorization, and release-identity synchronization to the live GitHub release
- added repo-local package metadata and a single `npm run verify:repo` entrypoint
- added release and provenance docs for source materials, FAQ, and release cadence
- added a graph-linked project-hub example plus a known-ID catalog for link-aware checks
- added example-contract checks and wired CI to run repository verification instead of a single audit step
- added validator API envelope docs and concrete request/response sample payloads
- added compatibility and public-contract index docs for integrator-facing discovery
- added explicit versioning policy, integration guide, and fix-route API samples
- added Markdown link verification to keep the public docs surface coherent
- added a machine-readable public contract catalog plus catalog verification
- added route-by-route validator reference, verification guide, and stronger surface-coherence checks
- added machine-readable release metadata, release schemas, and Apache-2 notice hygiene
- added consumer-facing client recipes, trust-model docs, and recipe verification
- added machine-readable validator API envelope schema coverage plus repo-local schema validation for public API examples
- added community-health docs, intake templates, and automated verification for contributor-facing surfaces
- added reviewer guide and machine-readable public project profile for external evaluation and program readiness
- added machine-readable public capability matrix and automated checks for practical repo usability
- added projection doctrine, domain-boundary guidance, generator-readiness docs, and a machine-readable public boundary map
- added portability docs, archive-bundle schema/sample, and a machine-readable portability profile
- added reviewer/program evaluation packet, schema, and verification for faster bounded external review
- added fail-closed public failure model, extra negative API examples, and verifier coverage for negative evidence
- added public traceability docs, a machine-readable traceability matrix, and verifier coverage for claim-to-evidence mapping
- added machine-readable example coverage, an example-coverage guide, and verifier coverage for capsule/API fixture mapping
- added machine-readable maintainer workflow modeling and verifier coverage for public intake/release posture
- added machine-readable public change-control modeling and verifier coverage for additive, deprecated, and breaking contract posture
- added machine-readable public artifact-ownership modeling and verifier coverage for stronger-source hierarchy across public families
- added machine-readable public dependency-graph modeling and verifier coverage for reading-order and dependency structure across public artifacts
- added machine-readable public assurance-case modeling and verifier coverage for bounded claims, strongest evidence, and explicit review limits
- added machine-readable public update-coherence modeling and verifier coverage for co-moving reviewer, release, contract, and teaching surfaces
- added machine-readable public limitations-register modeling and verifier coverage for deferred scope, non-promises, and bounded review limits
- added machine-readable public evidence-timeline modeling and verifier coverage for active maintenance and public-surface hardening history
- added machine-readable public review-scorecard modeling and verifier coverage for bounded external repo-evaluation criteria
- added machine-readable public verification-matrix modeling and verifier coverage for explicit check-family coverage across public surfaces
- added machine-readable public audience-paths modeling and verifier coverage for role-specific entry paths through the public surface
- added machine-readable public evidence-strength modeling and verifier coverage for stronger-source hierarchy across public surfaces
- added machine-readable public adoption-readiness modeling and verifier coverage for ready vs deferred public audience use
- added machine-readable public freshness modeling and verifier coverage for stale-summary triggers and release-aligned freshness posture
- added machine-readable public ecosystem-value modeling and verifier coverage for external utility, reviewer/program fit, and bounded OSS-support relevance
- added machine-readable public decision-log modeling and verifier coverage for projection rationale, trust choices, and bounded public design intent
- added machine-readable public evidence-gaps modeling and verifier coverage for still-open proof gaps, manual-review boundaries, and bounded maturity claims
- added machine-readable public program-fit modeling and verifier coverage for bounded OSS-support and reviewer-program criteria
- added machine-readable public publication-readiness modeling and verifier coverage for bounded pre-GitHub publication criteria
- added a public-safe TypeScript and Zod projection layer for the capsule outer contract plus repo-local typechecking and source-level consumer recipe examples
- expanded the public-safe TypeScript and Zod projection layer to cover validator API envelopes and added source-level request/response consumer recipes
- fixed the GitHub verification workflow to run `npm ci` before `npm run verify:repo`, so clean runners can resolve `zod` and `typescript` for projection-layer checks
- fixed the boundary-map verifier so external upstream source paths are treated as provenance pointers rather than required on-disk files inside GitHub runners
- fixed the GitHub verification workflow to fetch full history so evidence-timeline checks can resolve older milestone commits in clean runners
- fixed repository-identity verification to normalize equivalent GitHub remote forms instead of requiring one exact `origin` string in CI
- expanded the schema layer with a schema-family index, deeper field-level schema reference docs, and stronger schema discovery wiring across the public contract surfaces
- added a contributor-facing repo-only validation workflow guide and wired it through onboarding, contributor, community, and discovery surfaces
- updated GitHub-operations verification so `ROADMAP.md` stays aligned to active milestone waves instead of pinning closed issue numbers forever
- added a buildable and packable package-export layer for the public-safe projection surface, including npm-consumer docs and package-based client recipes
- added fresh-project tarball install verification plus ESM package recipes for the package-consumer layer, and clarified that local package checks do not imply npm registry publication
## 0.1.0 - 2026-03-26

Initial public open-core projection from N1Hub:

- added public docs for capsule law, gates, relation types, validator, scope, and anchor governance
- added JSON Schema artifacts for capsules and neuro concentrate
- added synthetic example capsules plus one intentional negative validator example
- added live validator OpenAPI reference
- added community health files and issue / PR templates
- added provenance and public release review artifacts
