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
- `npm run check:docs`
  Verifies Markdown links across the public documentation surface.
- `npm run check:catalog`
  Verifies `PUBLIC_CONTRACT_CATALOG.json` structure, version parity, and required entries.
- `npm run check:surface`
  Verifies cross-surface coherence between the catalog, manifest, package scripts, and human-readable index/review files.

## Upstream validator checks

For the strongest contract evidence, also validate the example capsules with the live validator in the upstream N1Hub repo. That is especially important for:

- `example-project-hub.capsule.json` with `--ids-file`
- the intentional negative `G16` example
- any new example added to the public surface

## Release expectation

Serious public changes should not be considered complete until:

- `npm run verify:repo` passes
- changed examples or contracts are rechecked against the live validator where applicable
- `CHANGELOG.md`, `PUBLIC_RELEASE_REVIEW.md`, and `PUBLIC_CONTRACT_CATALOG.json` stay aligned
