# Governance

This repository is a public projection surface, not the whole private working system.

## Source-of-truth rule

The files in this repository are public-safe artifacts derived from upstream source materials. When a public file and its upstream source diverge, the source material wins and the public projection should be updated deliberately.

## Scope rule

This repository exists to publish:

- the capsule law
- validator-facing docs and contracts
- schemas
- examples
- a small curated raw capsule set

It does not exist to publish private product doctrine, operator memory, secrets, or internal runtime control surfaces.

## Change rule

Prefer small, reviewable changes:

- docs and examples first
- schemas only when the public contract actually changes
- provenance updates whenever a new public artifact is added

## Review rule

Every serious change should keep these surfaces coherent:

- `README.md`
- `SOURCE_MANIFEST.json`
- `PUBLIC_RELEASE_REVIEW.md`
- `scripts/audit-public-surface.js`
- affected docs, examples, schemas, or raw capsules

## Release rule

Do not publish private or ambiguous material just because it is nearby in the upstream repository. The public boundary must stay intentional.
