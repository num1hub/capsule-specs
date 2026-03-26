# N1Hub Specs

`N1Hub Specs` is the public reference surface for the capsule-first foundations behind N1Hub and CapsuleOS.

This repository is intentionally narrow. It does not try to expose the full private application or every internal workflow. Instead, it publishes the highest-signal public artifacts needed to understand the model:

- the 5-Element Law
- the 16 validation gates
- canonical relation types
- validator-facing docs and OpenAPI
- JSON schema and neuro-concentrate schema
- minimal example capsules
- a small curated capsule source set

## Why this repository exists

N1Hub is being built as a portable, validator-backed, open-core knowledge system. Public documentation, examples, and schema artifacts need their own clean home so contributors, integrators, and maintainers can understand the format without reading the whole private working repository.

This repository is that home.

## Start here

- [`QUICKSTART.md`](QUICKSTART.md) for the fastest safe orientation
- [`ONBOARDING.md`](ONBOARDING.md) for the full contributor path
- [`docs/overview.md`](docs/overview.md) for the public boundary
- [`docs/schema-reference.md`](docs/schema-reference.md) for field-level reference
- [`docs/api-envelopes.md`](docs/api-envelopes.md) for concrete validator request and response shapes
- [`docs/integration-guide.md`](docs/integration-guide.md) for the safest consumer path through schema, examples, and API envelopes
- [`docs/route-reference.md`](docs/route-reference.md) for per-route sample mapping
- [`docs/public-contract-index.md`](docs/public-contract-index.md) for a complete public surface map
- [`docs/contract-catalog.md`](docs/contract-catalog.md) for the machine-readable contract map
- [`docs/verification.md`](docs/verification.md) for the repo verification stack
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
  Machine-readable JSON Schema artifacts for capsules.
- `examples/`
  Minimal example capsules for documentation and validation.
- `examples/api/`
  Concrete validator request and response payload examples.
- `openapi/`
  OpenAPI reference for validator-facing HTTP surfaces.
- `capsules/`
  Curated raw public capsules used as source material for the public specs.

## Repository health

The repository is structured to look like a serious OSS-maintained surface rather than a one-off export:

- community files for contributions, conduct, support, and security
- issue and pull-request templates
- machine-readable provenance in [`SOURCE_MANIFEST.json`](SOURCE_MANIFEST.json)
- machine-readable contract discovery in [`PUBLIC_CONTRACT_CATALOG.json`](PUBLIC_CONTRACT_CATALOG.json)
- machine-readable release evidence in [`PUBLIC_RELEASE_METADATA.json`](PUBLIC_RELEASE_METADATA.json)
- a public-release review in [`PUBLIC_RELEASE_REVIEW.md`](PUBLIC_RELEASE_REVIEW.md)
- repo-local verification via `npm run verify:repo`
- local validator-backed example checks
- a repo-local audit script under [`scripts/audit-public-surface.js`](scripts/audit-public-surface.js)
- API payload examples under [`examples/api/`](examples/api/)
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
2. Read [`docs/5-element-law.md`](docs/5-element-law.md) and [`docs/16-gates.md`](docs/16-gates.md).
3. Inspect [`schemas/capsule-schema.json`](schemas/capsule-schema.json).
4. Compare the examples in [`examples/`](examples/) with the schema in [`schemas/`](schemas/).
5. Review the raw capsule sources in [`capsules/`](capsules/).
6. Run `npm run verify:repo` for the repository-local integrity checks.

## Source of truth

This repository is assembled from public-safe source materials curated out of the sovereign N1Hub vault and validator surfaces. Files here are projection artifacts for public use.

## Current status

This is the initial public projection of the N1Hub open-core specification surface. The current release focuses on schema, validator-facing contracts, examples, and repository health rather than on the full runtime codebase.
