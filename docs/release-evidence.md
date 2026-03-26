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
- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
  JSON Schema bundle for the public validator request and response envelope layer.

## Why this split exists

The Markdown review surfaces are optimized for people. The JSON surfaces are optimized for consistency checks, future generators, and external programs that want structured evidence instead of scraped prose.

The client recipes and trust-model docs do not replace release evidence, but they help reviewers understand whether the public surface is only documented or also realistically consumable.

The API envelope schema and its dedicated verification script strengthen that claim by keeping the public HTTP example layer machine-checkable.

The community-health doc and its dedicated verification script strengthen the repository's OSS maintainership surface by keeping contributor intake explicit and reviewable.

## Release discipline

When the public surface changes, these files should move together:

- `CHANGELOG.md`
- `PUBLIC_RELEASE_REVIEW.md`
- `PUBLIC_RELEASE_METADATA.json`
- `PUBLIC_CONTRACT_CATALOG.json`

If they drift, the release evidence is incomplete even if the individual docs still read well.
