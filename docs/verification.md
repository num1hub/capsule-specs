# Verification

The public repo is intentionally small, but it still has a real verification stack.

## Main entrypoint

Run:

```bash
npm run verify:repo
```

This executes all repository-local checks in the expected order.

## Checks

- `npm run audit:public-surface`
  Confirms every public file is covered by `SOURCE_MANIFEST.json` and validates JSON integrity.
- `npm run check:examples`
  Verifies the capsule example set, known-ID catalog, and graph-link assumptions.
- `npm run check:api-examples`
  Verifies validator request and response sample payloads and keeps them aligned with the capsule examples.
- `npm run check:api-schemas`
  Validates the published API example payloads against `schemas/validator-api-envelopes.schema.json`.
- `npm run check:client-recipes`
  Verifies curl and Node consumer snippets, route targeting, env-var assumptions, and Node syntax.
- `npm run check:community-health`
  Verifies contributor-facing docs, issue templates, support/security alignment, and intake-surface references.
- `npm run check:docs`
  Verifies Markdown links across the public documentation surface.
- `npm run check:catalog`
  Verifies `PUBLIC_CONTRACT_CATALOG.json` structure, version parity, and required entries.
- `npm run check:project-profile`
  Verifies `PUBLIC_PROJECT_PROFILE.json` against real repo counts, maintainer identity, reviewer shortcuts, and verification surfaces.
- `npm run check:surface`
  Verifies cross-surface coherence between the catalog, manifest, package scripts, and human-readable index/review files.
- `npm run check:release`
  Verifies `PUBLIC_RELEASE_METADATA.json`, coverage counts, legal notice presence, and release-evidence consistency.

## Upstream validator checks

For the strongest contract evidence, also validate the example capsules with the live validator in the upstream N1Hub repo. That is especially important for:

- `example-project-hub.capsule.json` with `--ids-file`
- the intentional negative `G16` example
- any new example added to the public surface

## Release expectation

Serious public changes should not be considered complete until:

- `npm run verify:repo` passes
- changed examples or contracts are rechecked against the live validator where applicable
- `CHANGELOG.md`, `PUBLIC_RELEASE_REVIEW.md`, `PUBLIC_RELEASE_METADATA.json`, and `PUBLIC_CONTRACT_CATALOG.json` stay aligned
- `PUBLIC_PROJECT_PROFILE.json` stays aligned with the real repository shape and reviewer-facing docs
- API examples stay aligned with `schemas/validator-api-envelopes.schema.json`
- contributor-facing intake surfaces stay aligned with `docs/community-health.md`
- client recipes stay aligned with the API examples and route docs
