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

## Repository layout

- `docs/`
  Public human-readable reference docs.
- `schemas/`
  Machine-readable JSON Schema artifacts for capsules.
- `examples/`
  Minimal example capsules for documentation and validation.
- `openapi/`
  OpenAPI reference for validator-facing HTTP surfaces.
- `capsules/`
  Curated raw public capsules used as source material for the public specs.

## Scope

This repository is a public specification and reference surface. It is not the complete N1Hub runtime, not a private vault dump, and not a release of internal operator tooling.

## Maintainer

Primary maintainer: `egor-n1`

## Quick start

1. Read [`docs/overview.md`](docs/overview.md).
2. Read [`docs/5-element-law.md`](docs/5-element-law.md) and [`docs/16-gates.md`](docs/16-gates.md).
3. Inspect [`schemas/capsule-schema.json`](schemas/capsule-schema.json).
4. Validate the example capsules against the published rules.

## Source of truth

This repository is assembled from public-safe source materials curated out of the sovereign N1Hub vault and validator surfaces. Files here are projection artifacts for public use.
