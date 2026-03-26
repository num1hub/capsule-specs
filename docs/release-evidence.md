# Release Evidence

This repository keeps release evidence in both human-readable and machine-readable forms.

## Human-readable surfaces

- [`../CHANGELOG.md`](../CHANGELOG.md)
  Release history and additive change narrative.
- [`../PUBLIC_RELEASE_REVIEW.md`](../PUBLIC_RELEASE_REVIEW.md)
  Human-readable inclusion, exclusion, validation, and residual-risk summary.
- [`../VERSIONING.md`](../VERSIONING.md)
  Stability and change-class policy.

## Machine-readable surfaces

- [`../PUBLIC_RELEASE_METADATA.json`](../PUBLIC_RELEASE_METADATA.json)
  Structured release evidence for tooling, audits, and future automation.
- [`../PUBLIC_CONTRACT_CATALOG.json`](../PUBLIC_CONTRACT_CATALOG.json)
  Structured map of the public contract surface and its verification paths.
- [`../schemas/public-release-metadata.schema.json`](../schemas/public-release-metadata.schema.json)
  JSON Schema for the release-metadata file.

## Why this split exists

The Markdown review surfaces are optimized for people. The JSON surfaces are optimized for consistency checks, future generators, and external programs that want structured evidence instead of scraped prose.

## Release discipline

When the public surface changes, these files should move together:

- `CHANGELOG.md`
- `PUBLIC_RELEASE_REVIEW.md`
- `PUBLIC_RELEASE_METADATA.json`
- `PUBLIC_CONTRACT_CATALOG.json`

If they drift, the release evidence is incomplete even if the individual docs still read well.
