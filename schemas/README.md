# Schemas

This directory contains public machine-readable schema artifacts.

Start with [`../docs/schema-family-reference.md`](../docs/schema-family-reference.md) if you need help choosing the right schema family. Use [`../docs/schema-reference.md`](../docs/schema-reference.md) once you already know which capsule or validator fields you care about.

## Capsule and validator contract schemas

- `capsule-schema.json`
  Public JSON Schema for the five-element outer capsule structure.
- `capsule-schema.bundle.json`
  Single-file bundle variant of the public capsule schema for consumers who want one import instead of a multi-file `$ref` graph.
- `neuro-concentrate.schema.json`
  Public JSON Schema for the semantic summary layer.
- `validator-api-envelopes.schema.json`
  JSON Schema bundle for validator request and response envelopes published under `examples/api/`.
- `validator-api-envelopes.bundle.json`
  Single-file bundle variant of the validator request and response envelope schema.
- `archive-bundle.schema.json`
  JSON Schema for the public archive-bundle portability contract.

## Repository and review summary schemas

- `public-contract-catalog.schema.json`
  JSON Schema for the machine-readable public contract catalog.
- `public-project-profile.schema.json`
  JSON Schema for the machine-readable reviewer/program profile file.
- `public-release-metadata.schema.json`
  JSON Schema for the machine-readable release-evidence file.
- `public-repository-identity.schema.json`
  JSON Schema for the machine-readable canonical repository identity file.
- `public-evaluation-packet.schema.json`
  JSON Schema for the machine-readable external evaluation packet.
- `public-review-scorecard.schema.json`
  JSON Schema for the machine-readable bounded external review scorecard.
- `public-verification-matrix.schema.json`
  JSON Schema for the machine-readable public verification coverage matrix.
- `public-evidence-timeline.schema.json`
  JSON Schema for the machine-readable public maintenance and hardening timeline.

## Boundary, trust, and maturity schemas

- `public-boundary-map.schema.json`
  JSON Schema for the machine-readable published-vs-deferred boundary map.
- `public-portability-profile.schema.json`
  JSON Schema for the machine-readable portability-profile file.
- `public-failure-model.schema.json`
  JSON Schema for the machine-readable fail-closed public failure model.
- `public-assurance-case.schema.json`
  JSON Schema for the machine-readable bounded public assurance case.
- `public-limitations-register.schema.json`
  JSON Schema for the machine-readable public limitations and deferred-scope register.
- `public-evidence-gaps-register.schema.json`
  JSON Schema for the machine-readable public evidence-gap and bounded-maturity posture.
- `public-program-fit-map.schema.json`
  JSON Schema for the machine-readable bounded reviewer/program-fit posture.
- `public-publication-readiness.schema.json`
  JSON Schema for the machine-readable bounded publication-state posture of the public GitHub surface.

## Workflow, audience, and navigation schemas

- `public-maintenance-model.schema.json`
  JSON Schema for the machine-readable public maintainer workflow model.
- `public-change-control-model.schema.json`
  JSON Schema for the machine-readable change-control and deprecation summary.
- `public-ownership-map.schema.json`
  JSON Schema for the machine-readable artifact ownership and authority summary.
- `public-dependency-graph.schema.json`
  JSON Schema for the machine-readable public dependency and reading-order summary.
- `public-update-coherence-map.schema.json`
  JSON Schema for the machine-readable public co-movement and sync-group map.
- `public-audience-paths.schema.json`
  JSON Schema for the machine-readable bounded role-specific audience paths.
- `public-adoption-readiness.schema.json`
  JSON Schema for the machine-readable public adoption-readiness posture across audience profiles.
- `public-freshness-model.schema.json`
  JSON Schema for the machine-readable public freshness and stale-summary posture.
- `public-ecosystem-value-map.schema.json`
  JSON Schema for the machine-readable public ecosystem-value and external-utility posture.
- `public-decision-log.schema.json`
  JSON Schema for the machine-readable public-decision log.
- `public-traceability-matrix.schema.json`
  JSON Schema for the machine-readable claim-to-evidence traceability matrix.
- `public-capability-matrix.schema.json`
  JSON Schema for the machine-readable capability matrix file.
- `public-evidence-strength-map.schema.json`
  JSON Schema for the machine-readable bounded stronger-source and evidence-strength hierarchy.
- `public-example-coverage.schema.json`
  JSON Schema for the machine-readable capsule/API example coverage map.

## Notes

- These schemas are projection artifacts aligned to the live validator surface.
- The live validator remains the stronger source of truth for edge-case semantics and admission behavior.
- If you want single-file schema artifacts for code generation, package consumption, or lower-friction Ajv wiring, start with [`../docs/schema-bundles.md`](../docs/schema-bundles.md).
- If you want copyable Ajv validation for the published archive-bundle portability sample, start with [`../docs/archive-validation-recipes.md`](../docs/archive-validation-recipes.md).
- If you need source-level consumer artifacts rather than raw JSON Schema alone, start with [`../docs/type-projections.md`](../docs/type-projections.md) and the published files under [`../projections/`](../projections/).
