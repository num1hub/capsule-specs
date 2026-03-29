# Release Evidence

This repository keeps release evidence in both human-readable and machine-readable forms.

## Human-readable surfaces

- [`../CHANGELOG.md`](../CHANGELOG.md)
  Release history and additive change narrative.
- [`../PUBLIC_RELEASE_REVIEW.md`](../PUBLIC_RELEASE_REVIEW.md)
  Human-readable inclusion, exclusion, validation, and residual-risk summary.
- [`../VERSIONING.md`](../VERSIONING.md)
  Stability and change-class policy.
- [`../CITATION.cff`](../CITATION.cff)
  Reuse and citation metadata for external reference.
- [`../.github/release.yml`](../.github/release.yml)
  GitHub-native release-note categorization aligned to the repository label taxonomy.
- [`../.github/dependabot.yml`](../.github/dependabot.yml)
  GitHub-native automated update posture for Actions and package metadata.
- [`../.github/labels.json`](../.github/labels.json)
  Repo-owned GitHub label taxonomy for the maintained public issue surface.
- [`../.github/milestones.json`](../.github/milestones.json)
  Repo-owned active GitHub milestones for the current public roadmap waves.

## Machine-readable surfaces

- [`../PUBLIC_RELEASE_METADATA.json`](../PUBLIC_RELEASE_METADATA.json)
  Structured release evidence for tooling, audits, and future automation.
- [`../PUBLIC_CONTRACT_CATALOG.json`](../PUBLIC_CONTRACT_CATALOG.json)
  Structured map of the public contract surface and its verification paths.
- [`../PUBLIC_PROJECT_PROFILE.json`](../PUBLIC_PROJECT_PROFILE.json)
  Machine-readable reviewer/program profile for fast external evaluation.
- [`../PUBLIC_REPOSITORY_IDENTITY.json`](../PUBLIC_REPOSITORY_IDENTITY.json)
  Machine-readable map of the canonical GitHub slug, package identity, release URL, and schema/example URL alignment rules.
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
  Machine-readable map of why this public surface remains coherent after publication without treating publication itself as proof of adoption, approval, or hosted-runtime maturity.
- [`../PUBLIC_TRACEABILITY_MATRIX.json`](../PUBLIC_TRACEABILITY_MATRIX.json)
  Machine-readable map from public claims to strongest surfaces and verification commands.
- [`../PUBLIC_CAPABILITY_MATRIX.json`](../PUBLIC_CAPABILITY_MATRIX.json)
  Machine-readable matrix of what the current public surface supports in practical terms.
- [`../PUBLIC_BOUNDARY_MAP.json`](../PUBLIC_BOUNDARY_MAP.json)
  Machine-readable summary of which domains are published here and which remain intentionally deferred.
- [`../PUBLIC_PORTABILITY_PROFILE.json`](../PUBLIC_PORTABILITY_PROFILE.json)
  Machine-readable summary of the public portability and archive trust posture.
- [`reference-pack.md`](reference-pack.md)
  Human-readable guide to the compact contract-reference layer for enums, gate IDs, and validator flags.
- [`schema-bundles.md`](schema-bundles.md)
  Human-readable guide to the single-file bundled schema layer for lower-friction consumers.
- [`schema-validation-recipes.md`](schema-validation-recipes.md)
  Human-readable guide to validating public capsules and validator-envelope payloads directly against the raw JSON Schema layer.
- [`archive-validation-recipes.md`](archive-validation-recipes.md)
  Human-readable guide to validating the published archive-bundle sample directly against the public portability/export schema.
- [`invalid-archive-bundle-examples.md`](invalid-archive-bundle-examples.md)
  Human-readable guide to intentionally schema-invalid archive-bundle fixtures and their documented structural rejection paths.
- [`invalid-capsule-examples.md`](invalid-capsule-examples.md)
  Human-readable guide to intentionally schema-invalid capsule fixtures and their documented structural rejection paths.
- [`invalid-api-envelope-examples.md`](invalid-api-envelope-examples.md)
  Human-readable guide to intentionally schema-invalid validator-envelope fixtures and their documented structural rejection paths.
- [`integrity-recipes.md`](integrity-recipes.md)
  Human-readable guide to the public `G16` sealing rule, recomputation recipes, and repair boundary.
- [`python-consumption.md`](python-consumption.md)
  Human-readable guide to cross-language Python consumption of compact references and public `G16` seal proofs from a repo checkout or extracted packed artifact.
- [`openapi-codegen-recipes.md`](openapi-codegen-recipes.md)
  Human-readable guide to repo-local and installed-package OpenAPI type generation through `openapi-typescript`.
- [`../capsules/README.md`](../capsules/README.md)
  Human-readable guide to the curated raw law-adjacent capsule source set.
- [`../references/README.md`](../references/README.md)
  Human-readable guide to the compact machine-readable contract references.
- [`../schemas/public-release-metadata.schema.json`](../schemas/public-release-metadata.schema.json)
  JSON Schema for the release-metadata file.
- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
  JSON Schema bundle for the public validator request and response envelope layer.
- [`../schemas/capsule-schema.bundle.json`](../schemas/capsule-schema.bundle.json)
  Single-file bundle artifact for capsule consumers who want fewer imports.
- [`../schemas/validator-api-envelopes.bundle.json`](../schemas/validator-api-envelopes.bundle.json)
  Single-file bundle artifact for validator-envelope consumers who want fewer imports.
- [`type-projections.md`](type-projections.md)
  Human-readable guide to the public-safe TypeScript and Zod projection layer.
- [`npm-consumption.md`](npm-consumption.md)
  Human-readable guide to the package-export and pack-ready consumer layer.
- [`../projections/typescript/capsule.ts`](../projections/typescript/capsule.ts)
  Public-safe TypeScript projection for the capsule outer contract.
- [`../projections/typescript/validator-api.ts`](../projections/typescript/validator-api.ts)
  Public-safe TypeScript projection for validator request and response envelopes.
- [`../projections/typescript/index.ts`](../projections/typescript/index.ts)
  Bundle entrypoint for the built TypeScript export surface.
- [`../projections/zod/capsule.ts`](../projections/zod/capsule.ts)
  Public-safe Zod projection for the same public outer contract.
- [`../projections/zod/validator-api.ts`](../projections/zod/validator-api.ts)
  Public-safe Zod projection for validator request and response envelopes.
- [`../projections/zod/index.ts`](../projections/zod/index.ts)
  Bundle entrypoint for the built Zod export surface.
- [`../projections/index.ts`](../projections/index.ts)
  Root namespace entrypoint for the built package-consumer layer.
- [`../tsconfig.build.json`](../tsconfig.build.json)
  Repo-owned build configuration for the consumable projection layer.
- [`../scripts/check-package-surface.js`](../scripts/check-package-surface.js)
  Repo-local verification of build output, package exports, and pack surface.
- [`../scripts/check-package-install.js`](../scripts/check-package-install.js)
  Repo-local verification that a packed artifact installs and runs in fresh CommonJS, ESM, and TypeScript consumer projects.
- [`../scripts/check-raw-capsules.js`](../scripts/check-raw-capsules.js)
  Repo-local verification that the curated raw capsule exports remain structurally aligned, package-consumable, and law-adjacent rather than drifting into an unbounded vault export.
- [`../scripts/check-reference-pack.js`](../scripts/check-reference-pack.js)
  Repo-local verification that the compact contract-reference exports stay aligned to stronger schemas, validator flags, and published gate summaries.
- [`../scripts/check-schema-bundles.js`](../scripts/check-schema-bundles.js)
  Repo-local verification that the committed single-file bundle schemas, their consumer recipes, and their human guide stay aligned to the stronger raw schema files.
- [`../scripts/check-schema-recipes.js`](../scripts/check-schema-recipes.js)
  Repo-local verification that the Ajv-based raw-schema consumer recipes stay executable and aligned to published schema exports.
- [`../scripts/check-archive-recipes.js`](../scripts/check-archive-recipes.js)
  Repo-local verification that the archive-bundle validation recipes stay executable and aligned to the published portability/export schema.
- [`../scripts/check-invalid-examples.js`](../scripts/check-invalid-examples.js)
  Repo-local verification that the published invalid schema fixtures stay rejected for the documented structural reasons.
- [`../scripts/check-invalid-api-examples.js`](../scripts/check-invalid-api-examples.js)
  Repo-local verification that intentionally invalid validator-envelope fixtures stay rejected for the documented structural reasons.
- [`../scripts/check-integrity-recipes.js`](../scripts/check-integrity-recipes.js)
  Repo-local verification that the published example/API integrity hashes and seal-recomputation recipes stay aligned to the current public `G16` rule.
- [`../scripts/check-python-recipes.js`](../scripts/check-python-recipes.js)
  Repo-local verification that the Python recipes work both from a checkout and from extracted packed artifacts.
- [`../examples/client/ts-build-validate-request.ts`](../examples/client/ts-build-validate-request.ts)
  Minimal source-level TypeScript recipe for constructing a validator request envelope.
- [`../examples/client/ts-build-validate-batch-request.ts`](../examples/client/ts-build-validate-batch-request.ts)
  Minimal source-level TypeScript recipe for constructing a validator batch request envelope.
- [`../examples/client/ts-build-validate-fix-request.ts`](../examples/client/ts-build-validate-fix-request.ts)
  Minimal source-level TypeScript recipe for constructing a validator fix request envelope.
- [`../examples/client/ts-live-validator-client.ts`](../examples/client/ts-live-validator-client.ts)
  Minimal source-level TypeScript recipe for a typed `fetch` client that covers the published validator route family from repo-relative projection imports, including the bounded `stats` query path.
- [`../projections/typescript/validator-routes.ts`](../projections/typescript/validator-routes.ts)
  Shared TypeScript route constants and bounded route-behavior metadata for the published validator HTTP family, used by the typed live-client bridge and route-behavior reference recipes instead of copied route strings.
- [`../examples/client/ts-route-behavior-reference.ts`](../examples/client/ts-route-behavior-reference.ts)
  Minimal source-level TypeScript recipe for consuming the compact validator route-behavior layer with shared route constants, auth posture, query metadata, and response-status mappings.
- [`../examples/client/ts-parse-validate-requests.ts`](../examples/client/ts-parse-validate-requests.ts)
  Minimal source-level TypeScript recipe for typing the published single, batch, and fix validator request samples.
- [`../examples/client/zod-parse-validate-request.ts`](../examples/client/zod-parse-validate-request.ts)
  Minimal source-level Zod recipe for parsing the published single validator request envelope.
- [`../examples/client/zod-parse-validate-batch-request.ts`](../examples/client/zod-parse-validate-batch-request.ts)
  Minimal source-level Zod recipe for parsing the published batch validator request envelope.
- [`../examples/client/zod-parse-validate-fix-request.ts`](../examples/client/zod-parse-validate-fix-request.ts)
  Minimal source-level Zod recipe for parsing the published fix validator request envelope.
- [`../examples/client/ts-parse-validate-responses.ts`](../examples/client/ts-parse-validate-responses.ts)
  Minimal source-level TypeScript recipe for typing the published pass, fail, batch, and fix validator response families.
- [`../examples/client/ts-parse-error-responses.ts`](../examples/client/ts-parse-error-responses.ts)
  Minimal source-level TypeScript recipe for typing the published generic, unauthorized, forbidden, conflict, and rate-limit error envelopes plus the route-specific stats-computation failure sample.
- [`../examples/client/ts-parse-support-responses.ts`](../examples/client/ts-parse-support-responses.ts)
  Minimal source-level TypeScript recipe for typing the published `gates` and `stats` support-response payloads.
- [`../examples/client/zod-parse-validate-response.ts`](../examples/client/zod-parse-validate-response.ts)
  Minimal source-level Zod recipe for parsing the published pass validator response envelope.
- [`../examples/client/zod-parse-validate-fail-response.ts`](../examples/client/zod-parse-validate-fail-response.ts)
  Minimal source-level Zod recipe for parsing the published fail validator response envelope.
- [`../examples/client/zod-parse-validate-batch-response.ts`](../examples/client/zod-parse-validate-batch-response.ts)
  Minimal source-level Zod recipe for parsing a validator batch response envelope.
- [`../examples/client/zod-parse-validate-fix-response.ts`](../examples/client/zod-parse-validate-fix-response.ts)
  Minimal source-level Zod recipe for parsing a validator fix response envelope.
- [`../examples/client/zod-parse-error-responses.ts`](../examples/client/zod-parse-error-responses.ts)
  Minimal source-level Zod recipe for parsing the published generic, unauthorized, forbidden, conflict, and rate-limit error envelopes plus the route-specific stats-computation failure sample.
- [`../examples/client/zod-parse-support-responses.ts`](../examples/client/zod-parse-support-responses.ts)
  Minimal source-level Zod recipe for parsing the published `gates` and `stats` support-response payloads.
- [`../examples/client/cjs-package-capsule-summary.cjs`](../examples/client/cjs-package-capsule-summary.cjs)
  Minimal package-consumer recipe for the built capsule projection exports.
- [`../examples/client/cjs-package-error-responses.cjs`](../examples/client/cjs-package-error-responses.cjs)
  Minimal CommonJS package-consumer recipe for parsing the published generic, unauthorized, forbidden, conflict, and rate-limit error envelopes plus the route-specific stats-computation failure sample from installed package exports.
- [`../examples/client/cjs-package-live-validator-client.cjs`](../examples/client/cjs-package-live-validator-client.cjs)
  Minimal CommonJS package-consumer recipe for a validator live client that covers the published route family through installed package exports, including the bounded `stats` query path.
- [`../examples/client/cjs-package-validate-request.cjs`](../examples/client/cjs-package-validate-request.cjs)
  Minimal CommonJS package-consumer recipe for parsing the published single, batch, and fix validator request families from installed package exports.
- [`../examples/client/cjs-package-support-responses.cjs`](../examples/client/cjs-package-support-responses.cjs)
  Minimal CommonJS package-consumer recipe for parsing the published `gates` and `stats` support responses from installed package exports.
- [`../examples/client/cjs-package-validate-response.cjs`](../examples/client/cjs-package-validate-response.cjs)
  Minimal CommonJS package-consumer recipe for parsing the published pass, fail, batch, and fix validator response families from installed package exports.
- [`../examples/client/esm-package-capsule-summary.mjs`](../examples/client/esm-package-capsule-summary.mjs)
  Minimal ESM package-consumer recipe for the built capsule projection exports.
- [`../examples/client/esm-package-contract-reference.mjs`](../examples/client/esm-package-contract-reference.mjs)
  Minimal ESM package-consumer recipe for compact contract-reference exports plus the shared validator-route and envelope-family projection helpers.
- [`../examples/client/esm-package-error-responses.mjs`](../examples/client/esm-package-error-responses.mjs)
  Minimal ESM package-consumer recipe for parsing the published generic, unauthorized, forbidden, conflict, and rate-limit error envelopes plus the route-specific stats-computation failure sample from installed package exports.
- [`../examples/client/esm-package-live-validator-client.mjs`](../examples/client/esm-package-live-validator-client.mjs)
  Minimal ESM package-consumer recipe for a `fetch` client that covers the published validator route family through installed package exports, including the bounded `stats` query path.
- [`../examples/client/esm-package-validate-request.mjs`](../examples/client/esm-package-validate-request.mjs)
  Minimal ESM package-consumer recipe for parsing the published single, batch, and fix validator request families from installed package exports.
- [`../examples/client/esm-package-support-responses.mjs`](../examples/client/esm-package-support-responses.mjs)
  Minimal ESM package-consumer recipe for parsing the published `gates` and `stats` support responses from installed package exports.
- [`../examples/client/esm-package-validate-response.mjs`](../examples/client/esm-package-validate-response.mjs)
  Minimal ESM package-consumer recipe for parsing the published pass, fail, batch, and fix validator response families from installed package exports.
- [`../examples/client/cjs-package-contract-reference.cjs`](../examples/client/cjs-package-contract-reference.cjs)
  Minimal CommonJS package-consumer recipe for compact contract-reference exports.
- [`../examples/client/ajv-validate-capsule.mjs`](../examples/client/ajv-validate-capsule.mjs)
  Minimal repo-local Ajv recipe for validating a public capsule against the published capsule schema.
- [`../examples/client/ajv-validate-validator-envelope.mjs`](../examples/client/ajv-validate-validator-envelope.mjs)
  Minimal repo-local Ajv recipe for validating public validator request/response payloads against the envelope schema bundle.
- [`../examples/client/ajv-reject-invalid-capsules.mjs`](../examples/client/ajv-reject-invalid-capsules.mjs)
  Minimal repo-local Ajv recipe for rejecting intentionally invalid capsule fixtures against the published capsule schema.
- [`../examples/client/esm-package-ajv-validate-contracts.mjs`](../examples/client/esm-package-ajv-validate-contracts.mjs)
  Minimal package-consumer Ajv recipe for validating installed schema exports and packaged example payloads.
- [`../examples/client/esm-package-ajv-reject-invalid-capsules.mjs`](../examples/client/esm-package-ajv-reject-invalid-capsules.mjs)
  Minimal package-consumer Ajv recipe for rejecting installed invalid schema fixtures from package exports.
- [`../examples/client/recompute-integrity-seal.mjs`](../examples/client/recompute-integrity-seal.mjs)
  Minimal repo-local recipe for recomputing `integrity_sha3_512` and repairing the intentional `G16` teaching example without mutating it in place.
- [`../examples/client/esm-package-recompute-integrity-seal.mjs`](../examples/client/esm-package-recompute-integrity-seal.mjs)
  Minimal package-consumer recipe for recomputing `integrity_sha3_512` from the installed artifact and compact reference constants.
- [`../examples/client/python-contract-reference.py`](../examples/client/python-contract-reference.py)
  Minimal Python recipe for reading compact contract references and a curated raw capsule asset from published JSON files.
- [`../examples/client/python-live-validator-client.py`](../examples/client/python-live-validator-client.py)
  Minimal reusable Python client bridge for the full published validator route family, backed by the compact route pack and bounded stats-query metadata.
- [`../examples/client/python-recompute-integrity-seal.py`](../examples/client/python-recompute-integrity-seal.py)
  Minimal Python recipe for recomputing public `G16` seals from published examples and compact reference constants.
- [`../examples/client/python-validate-single.py`](../examples/client/python-validate-single.py)
  Minimal Python recipe for preparing or sending the published `POST /api/validate` example envelope.
- [`../examples/client/python-validate-batch.py`](../examples/client/python-validate-batch.py)
  Minimal Python recipe for preparing or sending the published `POST /api/validate/batch` example envelope.
- [`../examples/client/python-validate-fix.py`](../examples/client/python-validate-fix.py)
  Minimal Python recipe for preparing or sending the published `POST /api/validate/fix` example envelope.
- [`../examples/client/node-validate-fix.mjs`](../examples/client/node-validate-fix.mjs)
  Minimal Node recipe for sending the published `POST /api/validate/fix` example envelope.
- [`../examples/client/python-get-gates.py`](../examples/client/python-get-gates.py)
  Minimal Python recipe for reading the published `GET /api/validate/gates` support route from sample data or a live validator.
- [`../examples/client/python-get-stats.py`](../examples/client/python-get-stats.py)
  Minimal Python recipe for reading the published `GET /api/validate/stats` support route from sample data or a live validator, including the bounded `limit` query path.
- [`../examples/client/python-parse-validate-responses.py`](../examples/client/python-parse-validate-responses.py)
  Minimal Python recipe for parsing the published pass, fail, batch, and fix validator response families.
- [`../examples/client/python-parse-error-responses.py`](../examples/client/python-parse-error-responses.py)
  Minimal Python recipe for parsing the published generic, unauthorized, forbidden, conflict, and rate-limit error envelopes plus the route-specific stats-computation failure sample.
- [`../examples/client/python-parse-support-responses.py`](../examples/client/python-parse-support-responses.py)
  Minimal Python recipe for parsing the published `gates` and `stats` support-response families.
- [`../examples/client/ts-package-contract-reference.ts`](../examples/client/ts-package-contract-reference.ts)
  Minimal TypeScript package-consumer recipe for compact contract-reference exports.
- [`../examples/client/ts-package-error-responses.ts`](../examples/client/ts-package-error-responses.ts)
  Minimal TypeScript package-consumer recipe for sample-driven typed generic, unauthorized, forbidden, conflict, and rate-limit error-envelope handling plus the route-specific stats-computation failure sample through installed package exports.
- [`../examples/client/ts-package-live-validator-client.ts`](../examples/client/ts-package-live-validator-client.ts)
  Minimal TypeScript package-consumer recipe for a typed `fetch` client that covers the published validator route family through installed package exports, including the bounded `stats` query path.
- [`../references/validator-routes.json`](../references/validator-routes.json)
  Compact machine-readable route map for the published validator HTTP family, including bearer-auth posture, bounded query-parameter metadata, and response-status mappings, kept aligned to OpenAPI and route docs through the reference-pack verifier.
- [`../examples/client/ts-package-support-responses.ts`](../examples/client/ts-package-support-responses.ts)
  Minimal TypeScript package-consumer recipe for typed `gates` and `stats` support-response handling through installed package exports.
- [`../examples/client/ts-package-validate-responses.ts`](../examples/client/ts-package-validate-responses.ts)
  Minimal TypeScript package-consumer recipe for typed pass, fail, batch, and fix validator response-family handling through installed package exports.
- [`../examples/client/ts-package-validate-request.ts`](../examples/client/ts-package-validate-request.ts)
  Minimal TypeScript package-consumer recipe for typed single-request construction through the built capsule and validator API exports.
- [`../examples/client/ts-package-parse-validate-requests.ts`](../examples/client/ts-package-parse-validate-requests.ts)
  Minimal TypeScript package-consumer recipe for typing the published single, batch, and fix validator request samples through installed package exports.
- [`../examples/client/ts-package-validate-batch-request.ts`](../examples/client/ts-package-validate-batch-request.ts)
  Minimal TypeScript package-consumer recipe for typed batch-request construction through installed package exports.
- [`../examples/client/ts-package-validate-fix-request.ts`](../examples/client/ts-package-validate-fix-request.ts)
  Minimal TypeScript package-consumer recipe for typed fix-request construction through installed package exports.

## Why this split exists

The Markdown review surfaces are optimized for people. The JSON surfaces are optimized for consistency checks, future generators, and external programs that want structured evidence instead of scraped prose.

The citation file, release-note config, and Dependabot config do not replace release evidence, but they make the public GitHub surface more usable as a maintained long-lived repository instead of a one-time export.

The client recipes and trust-model docs do not replace release evidence, but they help reviewers understand whether the public surface is only documented or also realistically consumable across the full published validator route set, including the bounded `GET /api/validate/stats?limit=...` path, plus the installed-package support-response layer for `gates` and `stats` and the bounded shared error-envelope layer for generic, unauthorized, forbidden, conflict, and rate-limit handling.

The API envelope schema and its dedicated verification script strengthen that claim by keeping the public HTTP example layer machine-checkable.

The type-projection layer strengthens consumer ergonomics by giving TypeScript and Zod users source-level artifacts without asking them to reverse-engineer the public capsule shape from prose or private runtime code.

The validator API projection layer strengthens that path further by giving tool-builders and integrators a public-safe source-level request/response layer for single, batch, and fix `validate` envelopes, source-level Zod request parsing for those published request samples, direct repo/package/Python OpenAPI route-reading recipes, source-level and installed-package CommonJS, ESM, and TypeScript live-client bridges for the published validator route family including the bounded `stats` query path, sample-driven Zod parsing for the published pass/fail/batch/fix response families, `gates` / `stats` support responses, and the bounded shared generic, unauthorized, forbidden, conflict, and rate-limit error envelopes plus the route-specific stats-computation failure sample while staying subordinate to the stronger envelope schemas, OpenAPI, curated API examples, and live validator behavior.

The package-consumer layer strengthens that path further by making the maintained projection surface buildable, exportable, dry-run packable, and install-verified in fresh CommonJS, ESM, and TypeScript consumer projects instead of leaving it only as raw source files inside the repository tree, while now covering installed-package request parsing and TypeScript request typing for the published single, batch, and fix families plus the full published validate-response family instead of request-side raw Ajv/typing-only proofs and a positive-pass sample only.

The compact reference-pack layer strengthens that path further by giving tool-builders a smaller package-consumable surface for enums, gate IDs, validator option flags, and published validator route behavior summaries without forcing them to parse the larger schemas or prose docs first, now with copyable CommonJS, ESM, TypeScript, and Python consumer paths.

The schema-bundle layer strengthens that path further by giving code generators, Ajv consumers, and polyglot tooling a single-file schema path that stays subordinate to the stronger raw schema files instead of forcing every downstream consumer to wire the same multi-file `$ref` graph manually.

The raw-schema recipe layer strengthens that path further by proving that downstream consumers can validate public capsules and validator-envelope payloads directly against the published JSON Schemas, both from a repo checkout and from installed package exports, without depending on the projection layer.

The archive-validation layer strengthens that path further by proving that portability consumers can validate the published archive-bundle sample directly against the public export/replay schema, both from a repo checkout and from installed package exports, without mistaking the specs repo for a hosted import/export runtime.

The invalid-archive layer strengthens that path further by proving that portability consumers can also keep documented schema-level rejection fixtures for archive bundles, both from a repo checkout and from installed package exports, instead of seeing only the happy-path portability sample.

The invalid-fixture layer strengthens that path further by proving that downstream consumers can also test documented structural rejection cases for both capsules and validator HTTP envelopes instead of seeing only happy-path schema examples or live-validator-only failures.

The integrity-recipe layer strengthens that path further by proving that published example capsules and validator response envelopes stay aligned to the current public sealing rule instead of treating their `integrity_sha3_512` or `computedHash` fields as unverified folklore.

The Python-consumption layer strengthens that path further by proving the same compact reference, validator-envelope request/response, live support-route, and `G16` integrity flows are consumable outside the Node runtime from raw packaged assets, without overclaiming a Python SDK or PyPI distribution.

The curated raw capsule layer strengthens that path further by publishing a small, verifier-backed set of stronger law-adjacent source artifacts for confidence-vector semantics, subtype meaning, and version-lineage posture without pretending the whole upstream capsule corpus is public.

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
- `references/README.md`
- `capsules/README.md`
- `docs/type-projections.md`
- `docs/npm-consumption.md`
- `docs/reference-pack.md`
- `docs/python-consumption.md`
- `docs/openapi-codegen-recipes.md`
- `docs/source-materials.md`
- `tsconfig.build.json`
- `scripts/check-package-surface.js`
- `scripts/check-package-install.js`
- `scripts/check-reference-pack.js`
- `scripts/check-python-recipes.js`
- `scripts/check-raw-capsules.js`
- `projections/index.ts`
- `projections/typescript/index.ts`
- `projections/typescript/capsule.ts`
- `projections/typescript/validator-api.ts`
- `projections/zod/index.ts`
- `projections/zod/capsule.ts`
- `projections/zod/validator-api.ts`
- `examples/client/cjs-package-capsule-summary.cjs`
- `examples/client/cjs-package-validate-request.cjs`
- `examples/client/cjs-package-validate-response.cjs`
- `examples/client/esm-package-capsule-summary.mjs`
- `examples/client/esm-package-validate-request.mjs`
- `examples/client/esm-package-validate-response.mjs`
- `examples/client/cjs-package-contract-reference.cjs`
- `examples/client/esm-package-contract-reference.mjs`
- `examples/client/ts-package-contract-reference.ts`
- `examples/client/esm-package-live-validator-client.mjs`
- `examples/client/python-contract-reference.py`
- `examples/client/python-recompute-integrity-seal.py`
- `examples/client/zod-parse-validate-request.ts`
- `examples/client/zod-parse-validate-batch-request.ts`
- `examples/client/zod-parse-validate-fix-request.ts`
- `examples/client/ts-package-validate-request.ts`
- `examples/client/ts-package-validate-batch-request.ts`
- `examples/client/ts-package-validate-fix-request.ts`
- `examples/client/ts-build-validate-request.ts`
- `examples/client/ts-parse-support-responses.ts`
- `examples/client/zod-parse-validate-response.ts`
- `examples/client/zod-parse-validate-fail-response.ts`
- `examples/client/zod-parse-support-responses.ts`

If they drift, the release evidence is incomplete even if the individual docs still read well.
