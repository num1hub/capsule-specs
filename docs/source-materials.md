# Source Materials

This repository is assembled from public-safe source surfaces rather than from a wholesale vault export.

## Main upstream sources

- public-oriented capsule vault materials from `n1hub-repo-vault`
- live CapsuleOS law and validator surfaces from `n1hub.com`

## Main source classes in this repository

- public governance capsules that explain README, quickstart, contribution, security, and onboarding posture
- public architecture capsules for capsules-as-projections and domain ownership
- public generator-readiness doctrine and projection-index semantics
- public portability source materials for archive bundles, import trust, and lifecycle posture
- live law capsules for the five-element contract, relation types, and 16 gates
- live validator docs and OpenAPI material
- synthetic public examples derived from safe example fixtures rather than copied from private vault state
- synthetic archive example derived from the public archive-bundle fixture rather than from hosted runtime state
- API request and response examples derived from the published OpenAPI contract plus live validator outputs on the public example set
- validator API envelope schemas derived from the public OpenAPI, the API examples, and the published capsule schema

## Projection strategy

- docs are derived into a narrower public style
- projection doctrine and boundary posture are derived from upstream architecture and governance capsules
- raw law capsules are copied as reference artifacts
- examples are synthetic and public-safe
- provenance is tracked in [`../SOURCE_MANIFEST.json`](../SOURCE_MANIFEST.json)
- public contract discovery is tracked in [`../PUBLIC_CONTRACT_CATALOG.json`](../PUBLIC_CONTRACT_CATALOG.json)
- repo-local verification meaning is tracked in [`verification.md`](verification.md)
- machine-readable release evidence is tracked in [`../PUBLIC_RELEASE_METADATA.json`](../PUBLIC_RELEASE_METADATA.json)
- machine-readable published-vs-deferred boundaries are tracked in [`../PUBLIC_BOUNDARY_MAP.json`](../PUBLIC_BOUNDARY_MAP.json)
- machine-readable API envelope coverage is tracked in [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
- machine-readable portability posture is tracked in [`../PUBLIC_PORTABILITY_PROFILE.json`](../PUBLIC_PORTABILITY_PROFILE.json)
- machine-readable artifact ownership and authority hierarchy is tracked in [`../PUBLIC_OWNERSHIP_MAP.json`](../PUBLIC_OWNERSHIP_MAP.json)
- machine-readable stronger-source and evidence-strength hierarchy is tracked in [`../PUBLIC_EVIDENCE_STRENGTH_MAP.json`](../PUBLIC_EVIDENCE_STRENGTH_MAP.json)
- consumer snippets derive from the public API example payloads rather than from private runtime secrets or internal deploy tooling
- absolute upstream source paths in provenance and boundary maps are external reference pointers to stronger source surfaces; they are useful for local review, but a clean CI runner is not expected to contain those upstream repos on disk

## Why this matters

The repository should be auditable. Readers should be able to see both the public projection and the source class behind it.
