# Repository Identity

This repository is canonically published as [`num1hub/capsule-specs`](https://github.com/num1hub/capsule-specs).

The machine-readable form lives in [`../PUBLIC_REPOSITORY_IDENTITY.json`](../PUBLIC_REPOSITORY_IDENTITY.json), and the schema lives in [`../schemas/public-repository-identity.schema.json`](../schemas/public-repository-identity.schema.json).

## What this layer protects

- the canonical GitHub owner, repository name, and slug
- the canonical HTTPS remote URL
- the public project homepage used for external discovery
- the package identity exposed by `package.json`
- the latest public release tag and release URL
- the requirement that schema `$id` values and example URIs align to the real public repo

## Why this matters

Once a specs repository is live, identity drift becomes a real trust problem.

If package metadata, schema IDs, example URIs, or reviewer summaries still point to an old slug, outside readers can no longer tell which public surface is canonical. That weakens contributor trust, tooling integration, release evidence, and OSS-support review quality.

This layer keeps the real published identity explicit and reviewable.

Equivalent GitHub remote forms still count as the same public identity during verification. For example, CI may expose an authenticated HTTPS remote or a GitHub SSH-style remote even when the canonical public reference is the plain HTTPS URL.

## Important boundary

The repository-identity layer is an integrity aid. It does not claim package-registry publication, trademark exclusivity, or adoption. It only claims that the public repo identity, package metadata, schema IDs, example URIs, and release references are intentionally aligned to the live GitHub surface.
