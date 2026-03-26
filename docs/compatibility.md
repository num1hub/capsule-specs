# Compatibility

This repository is intentionally small, but not every artifact has the same stability promise.

## Stability classes

- **Reference docs**
  Human-readable and subject to editorial improvement. Wording may tighten over time without changing the underlying public contract.
- **Schemas**
  Intended to stay aligned with the live validator contract. Breaking changes should be deliberate, reviewable, and reflected in examples and changelog entries.
- **OpenAPI**
  Represents the public validator route family. It should track compatible route and envelope changes, not incidental implementation detail.
- **Examples**
  Public-safe teaching artifacts. New examples may be added over time, but existing examples should not drift casually because downstream tutorials may depend on them.
- **Raw capsules**
  Curated source snapshots. They are reference artifacts, not a promise that the whole upstream vault is public.

## Integrator advice

- Build against the schemas and OpenAPI first.
- Use the examples to understand shape and edge cases.
- Treat the validator as the final arbiter for nuanced semantics, especially around sealing, graph-link resolution, and safe auto-fix behavior.

## Change discipline

When a breaking public contract change is necessary, update all of these together:

- affected docs
- affected schemas or OpenAPI
- example payloads
- [`../PUBLIC_CONTRACT_CATALOG.json`](../PUBLIC_CONTRACT_CATALOG.json)
- [`../PUBLIC_CHANGE_CONTROL_MODEL.json`](../PUBLIC_CHANGE_CONTROL_MODEL.json)
- [`../VERSIONING.md`](../VERSIONING.md)
- [`CHANGELOG.md`](../CHANGELOG.md)
- [`PUBLIC_RELEASE_REVIEW.md`](../PUBLIC_RELEASE_REVIEW.md)

The bounded machine-readable summary of this posture lives in [`../PUBLIC_CHANGE_CONTROL_MODEL.json`](../PUBLIC_CHANGE_CONTROL_MODEL.json).
