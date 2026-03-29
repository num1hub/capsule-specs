# Schema Family Reference

This document tells you which schema family to use before you start reading individual fields.

Use this file when you need the right abstraction level quickly. Use [`schema-reference.md`](schema-reference.md) after you already know which family you need.

## Family 1: capsule artifact shape

Use this family when you need to read, validate, or generate a capsule artifact itself.

- [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
  Canonical outer contract for the five-element capsule artifact.
- [`../schemas/neuro-concentrate.schema.json`](../schemas/neuro-concentrate.schema.json)
  Nested semantic-summary contract referenced by `capsule-schema.json`.
- [`../schemas/capsule-schema.bundle.json`](../schemas/capsule-schema.bundle.json)
  Single-file bundle variant of the capsule contract for consumers who want fewer imports.
- [`schema-reference.md`](schema-reference.md)
  Field-level explanation of both the outer capsule shape and the nested neuro layer.
- [`../projections/typescript/capsule.ts`](../projections/typescript/capsule.ts)
  Source-level TypeScript convenience projection.
- [`../projections/zod/capsule.ts`](../projections/zod/capsule.ts)
  Source-level Zod convenience projection.

Choose this family when you are building:

- a capsule parser
- a capsule writer
- a validator input generator
- source-level tooling that needs the public artifact shape
- code-generation or polyglot tooling that prefers one-file schema imports via [`schema-bundles.md`](schema-bundles.md)

## Family 2: validator transport and HTTP envelopes

Use this family when you need public validator request and response shapes rather than raw capsule structure alone.

- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
  Canonical public schema bundle for validator request and response envelopes.
- [`../schemas/validator-api-envelopes.bundle.json`](../schemas/validator-api-envelopes.bundle.json)
  Single-file bundle variant for validator request and response envelopes.
- [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
  Route-level HTTP contract for the published validator family.
- [`api-envelopes.md`](api-envelopes.md)
  Human-readable envelope guide.
- [`route-reference.md`](route-reference.md)
  Route-by-route sample map.
- [`../projections/typescript/validator-api.ts`](../projections/typescript/validator-api.ts)
  Source-level TypeScript projection for the public validator envelopes.
- [`../projections/zod/validator-api.ts`](../projections/zod/validator-api.ts)
  Source-level Zod projection for the same public envelopes.

Choose this family when you are building:

- a validator client
- API tests
- a request/response parser
- transport-level integration code
- code-generation or polyglot tooling that wants one-file envelope imports via [`schema-bundles.md`](schema-bundles.md)

## Family 3: portability and archive contracts

Use this family when you need the bounded public export/import posture instead of validator transport.

- [`../schemas/archive-bundle.schema.json`](../schemas/archive-bundle.schema.json)
  Public archive-bundle contract.
- [`archive-bundles.md`](archive-bundles.md)
  Human-readable guide to archive structure and replay intent.
- [`portability.md`](portability.md)
  Public no-lock-in posture and portability boundaries.
- [`../PUBLIC_PORTABILITY_PROFILE.json`](../PUBLIC_PORTABILITY_PROFILE.json)
  Machine-readable portability summary.

Choose this family when you are building:

- archive exporters
- replay tooling
- trust review around portability claims

## Family 4: machine-readable repo governance summaries

Use this family when you are not consuming capsule data directly, but instead need machine-readable summaries of the public repo surface itself.

Core repo summary schemas:

- [`../schemas/public-contract-catalog.schema.json`](../schemas/public-contract-catalog.schema.json)
- [`../schemas/public-release-metadata.schema.json`](../schemas/public-release-metadata.schema.json)
- [`../schemas/public-project-profile.schema.json`](../schemas/public-project-profile.schema.json)
- [`../schemas/public-repository-identity.schema.json`](../schemas/public-repository-identity.schema.json)

Reviewer and release posture schemas:

- [`../schemas/public-evaluation-packet.schema.json`](../schemas/public-evaluation-packet.schema.json)
- [`../schemas/public-review-scorecard.schema.json`](../schemas/public-review-scorecard.schema.json)
- [`../schemas/public-verification-matrix.schema.json`](../schemas/public-verification-matrix.schema.json)
- [`../schemas/public-evidence-timeline.schema.json`](../schemas/public-evidence-timeline.schema.json)

Boundary, trust, and maturity schemas:

- [`../schemas/public-boundary-map.schema.json`](../schemas/public-boundary-map.schema.json)
- [`../schemas/public-assurance-case.schema.json`](../schemas/public-assurance-case.schema.json)
- [`../schemas/public-failure-model.schema.json`](../schemas/public-failure-model.schema.json)
- [`../schemas/public-limitations-register.schema.json`](../schemas/public-limitations-register.schema.json)
- [`../schemas/public-evidence-gaps-register.schema.json`](../schemas/public-evidence-gaps-register.schema.json)
- [`../schemas/public-program-fit-map.schema.json`](../schemas/public-program-fit-map.schema.json)
- [`../schemas/public-publication-readiness.schema.json`](../schemas/public-publication-readiness.schema.json)

Workflow, audience, and adoption schemas:

- [`../schemas/public-maintenance-model.schema.json`](../schemas/public-maintenance-model.schema.json)
- [`../schemas/public-change-control-model.schema.json`](../schemas/public-change-control-model.schema.json)
- [`../schemas/public-ownership-map.schema.json`](../schemas/public-ownership-map.schema.json)
- [`../schemas/public-dependency-graph.schema.json`](../schemas/public-dependency-graph.schema.json)
- [`../schemas/public-update-coherence-map.schema.json`](../schemas/public-update-coherence-map.schema.json)
- [`../schemas/public-audience-paths.schema.json`](../schemas/public-audience-paths.schema.json)
- [`../schemas/public-adoption-readiness.schema.json`](../schemas/public-adoption-readiness.schema.json)
- [`../schemas/public-freshness-model.schema.json`](../schemas/public-freshness-model.schema.json)
- [`../schemas/public-ecosystem-value-map.schema.json`](../schemas/public-ecosystem-value-map.schema.json)
- [`../schemas/public-decision-log.schema.json`](../schemas/public-decision-log.schema.json)
- [`../schemas/public-traceability-matrix.schema.json`](../schemas/public-traceability-matrix.schema.json)
- [`../schemas/public-capability-matrix.schema.json`](../schemas/public-capability-matrix.schema.json)
- [`../schemas/public-evidence-strength-map.schema.json`](../schemas/public-evidence-strength-map.schema.json)
- [`../schemas/public-example-coverage.schema.json`](../schemas/public-example-coverage.schema.json)

Choose this family when you are building:

- external review automation
- release audits
- contract catalogs
- maintainer-facing dashboards for the public repo

## Family 5: client recipe navigation contract

Use this family when you need a bounded machine-readable map of the published consumer snippets rather than the capsule, validator, or archive payload contracts themselves.

- [`../examples/client/recipe-index.json`](../examples/client/recipe-index.json)
  Machine-readable runtime-lane and task-entrypoint navigator for the published client recipes.
- [`../schemas/client-recipe-index.schema.json`](../schemas/client-recipe-index.schema.json)
  JSON Schema for the published client-recipe navigator itself.
- [`client-recipes.md`](client-recipes.md)
  Human-readable guide to the same runtime lanes, task entrypoints, and example families.
- [`../projections/typescript/client-recipe-index.ts`](../projections/typescript/client-recipe-index.ts)
  Source-level TypeScript projection for the navigator ids, counts, and typed JSON shape.

Choose this family when you are building:

- tooling that chooses the right public recipe automatically
- IDE or UI affordances that surface recommended starts per runtime lane
- docs automation that needs a bounded contract for snippet discovery
- package or repo consumers that want to validate recipe discovery before execution

## Which family is strongest for what

- Use `capsule-schema.json` when the question is about capsule outer shape.
- Use `capsule-schema.bundle.json` when you need the same outer shape as a single-file schema artifact.
- Use `neuro-concentrate.schema.json` when the question is about the semantic-summary subobject.
- Use `validator-api-envelopes.schema.json` when the question is about public validator request or response object shape.
- Use `validator-api-envelopes.bundle.json` when you need the same public validator request or response object shape as a single-file schema artifact.
- Use `validate.openapi.json` when the question is about routes, methods, or HTTP-level transport semantics.
- Use `archive-bundle.schema.json` when the question is about portability/export bundle shape.
- Use `client-recipe-index.schema.json` when the question is about the bounded shape of the published client-recipe navigator.
- Use the `public-*.schema.json` family when the question is about this repository's own machine-readable review, release, provenance, or governance summaries.

## What not to do

- Do not start from prose if you already know you need a machine-readable contract.
- Do not treat the TypeScript or Zod projections as stronger than the JSON Schema files.
- Do not use repo-governance schemas when what you really need is capsule or validator transport shape.
- Do not use the client-recipe navigator schema as proof of validator runtime behavior; it only describes snippet discovery and task routing.
- Do not use the public schemas as proof of private runtime behavior that is intentionally out of scope here.
