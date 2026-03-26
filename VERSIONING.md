# Versioning

This repository uses semantic versioning for its public reference surface, but it is still in an early `0.x` phase.

## Current phase

- `0.x` means the repository is already useful and intentionally maintained
- it does **not** mean contract changes should be casual
- breaking changes still require explicit review, changelog entries, and example updates

## Change classes

- **Patch**
  Editorial clarifications, typo fixes, better examples that do not change contract meaning, and provenance-only maintenance.
- **Minor**
  Backward-compatible additions such as new examples, new docs, or additive schema / OpenAPI fields that do not break existing consumers.
- **Major**
  Any intentional breaking change to public schema expectations, validator-facing envelopes, route semantics, or core capsule law representations.

## Required release behavior

When the public contract changes, update all of these together:

- affected docs
- affected examples
- affected schemas or OpenAPI files
- [`CHANGELOG.md`](CHANGELOG.md)
- [`PUBLIC_CHANGE_CONTROL_MODEL.json`](PUBLIC_CHANGE_CONTROL_MODEL.json)
- [`PUBLIC_RELEASE_REVIEW.md`](PUBLIC_RELEASE_REVIEW.md)

## Stability reminder

Even in `0.x`, this repository should behave like a maintained public surface. That means reviewers should be able to see what changed, why it changed, and which artifacts were kept in sync.

The bounded machine-readable summary of this posture lives in [`PUBLIC_CHANGE_CONTROL_MODEL.json`](PUBLIC_CHANGE_CONTROL_MODEL.json).
