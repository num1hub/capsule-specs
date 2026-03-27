# Schemas

This directory contains public machine-readable schema artifacts.

## Files

- `capsule-schema.json`
  Public JSON Schema for the five-element outer capsule structure.
- `neuro-concentrate.schema.json`
  Public JSON Schema for the semantic summary layer.
- `public-contract-catalog.schema.json`
  JSON Schema for the machine-readable public contract catalog.
- `public-release-metadata.schema.json`
  JSON Schema for the machine-readable release-evidence file.
- `validator-api-envelopes.schema.json`
  JSON Schema bundle for validator request and response envelopes published under `examples/api/`.
- `archive-bundle.schema.json`
  JSON Schema for the public archive-bundle portability contract.
- `public-project-profile.schema.json`
  JSON Schema for the machine-readable reviewer/program profile file.
- `public-capability-matrix.schema.json`
  JSON Schema for the machine-readable capability matrix file.
- `public-portability-profile.schema.json`
  JSON Schema for the machine-readable portability-profile file.
- `public-evaluation-packet.schema.json`
  JSON Schema for the machine-readable external evaluation packet.
- `public-failure-model.schema.json`
  JSON Schema for the machine-readable fail-closed public failure model.
- `public-example-coverage.schema.json`
  JSON Schema for the machine-readable capsule/API example coverage map.
- `public-maintenance-model.schema.json`
  JSON Schema for the machine-readable public maintainer workflow model.
- `public-change-control-model.schema.json`
  JSON Schema for the machine-readable change-control and deprecation summary.
- `public-ownership-map.schema.json`
  JSON Schema for the machine-readable artifact ownership and authority summary.
- `public-dependency-graph.schema.json`
  JSON Schema for the machine-readable public dependency and reading-order summary.
- `public-assurance-case.schema.json`
  JSON Schema for the machine-readable bounded public assurance case.
- `public-update-coherence-map.schema.json`
  JSON Schema for the machine-readable public co-movement and sync-group map.
- `public-limitations-register.schema.json`
  JSON Schema for the machine-readable public limitations and deferred-scope register.
- `public-evidence-timeline.schema.json`
  JSON Schema for the machine-readable public maintenance and hardening timeline.
- `public-review-scorecard.schema.json`
  JSON Schema for the machine-readable bounded external review scorecard.
- `public-verification-matrix.schema.json`
  JSON Schema for the machine-readable public verification coverage matrix.
- `public-audience-paths.schema.json`
  JSON Schema for the machine-readable bounded role-specific audience paths.
- `public-evidence-strength-map.schema.json`
  JSON Schema for the machine-readable bounded stronger-source and evidence-strength hierarchy.
- `public-adoption-readiness.schema.json`
  JSON Schema for the machine-readable public adoption-readiness posture across audience profiles.
- `public-freshness-model.schema.json`
  JSON Schema for the machine-readable public freshness and stale-summary posture.
- `public-ecosystem-value-map.schema.json`
  JSON Schema for the machine-readable public ecosystem-value and external-utility posture.
- `public-evidence-gaps-register.schema.json`
  JSON Schema for the machine-readable public evidence-gap and bounded-maturity posture.
- `public-program-fit-map.schema.json`
  JSON Schema for the machine-readable bounded reviewer/program-fit posture.
- `public-publication-readiness.schema.json`
  JSON Schema for the machine-readable bounded publication-state posture of the public GitHub surface.
- `public-traceability-matrix.schema.json`
  JSON Schema for the machine-readable claim-to-evidence traceability matrix.

## Notes

- These schemas are projection artifacts aligned to the live validator surface.
- The live validator remains the stronger source of truth for edge-case semantics and admission behavior.
- If you need source-level consumer artifacts rather than raw JSON Schema alone, start with [`../docs/type-projections.md`](../docs/type-projections.md) and the published files under [`../projections/`](../projections/).
