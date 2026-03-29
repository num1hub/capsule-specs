# Archive Validation Recipes

This guide shows how to validate the published archive-bundle sample directly against the public archive-bundle schema.

Use this path when you want:

- a structural validation path for portability/export bundle payloads
- a public-safe replay-contract check without depending on private runtime code
- a copyable Ajv recipe from either a repo checkout or installed package exports
- a clear `Ajv2020 + ajv-formats` path for the archive contract's `date-time` fields

## What this path is good for

- validating [`../examples/archive/archive-bundle.sample.json`](../examples/archive/archive-bundle.sample.json) against [`../schemas/archive-bundle.schema.json`](../schemas/archive-bundle.schema.json)
- proving that the published portability contract is consumable by downstream validators and tooling
- confirming that installed package exports preserve the archive-bundle schema and sample payload as real consumer assets

## What this path does not prove

Archive-bundle schema validation is a structural contract check. It does not prove:

- a hosted export/import service exists
- every upstream replay workflow is public
- policy-pack, tenant-boundary, or validator replay behavior beyond the published shape

For those boundaries, [`archive-bundles.md`](archive-bundles.md), [`portability.md`](portability.md), and [`PUBLIC_PORTABILITY_PROFILE.json`](../PUBLIC_PORTABILITY_PROFILE.json) remain stronger.

## Repo-local Ajv recipe

Start with:

- [`../examples/client/ajv-validate-archive-bundle.mjs`](../examples/client/ajv-validate-archive-bundle.mjs)

Run it from a repo checkout after `npm install` (which brings in both `ajv` and `ajv-formats` as repo devDependencies):

```bash
node examples/client/ajv-validate-archive-bundle.mjs
```

That recipe validates the published archive-bundle sample directly against the public schema and checks a few high-signal replay fields so downstream consumers can see a realistic positive path.

## Package-consumer Ajv recipe

If you want the same path from an installed tarball or future package distribution, use:

- [`../examples/client/cjs-package-ajv-validate-archive-bundle.cjs`](../examples/client/cjs-package-ajv-validate-archive-bundle.cjs)
- [`../examples/client/esm-package-ajv-validate-archive-bundle.mjs`](../examples/client/esm-package-ajv-validate-archive-bundle.mjs)
- [`../examples/client/ts-package-ajv-validate-archive-bundle.ts`](../examples/client/ts-package-ajv-validate-archive-bundle.ts)

Install `ajv` and `ajv-formats` in the consumer project before running it.

That recipe consumes:

- `@num1hub/capsule-specs/schemas/archive-bundle.schema.json`
- `@num1hub/capsule-specs/examples/archive/archive-bundle.sample.json`

The fresh-install proof for that path lives in [`../scripts/check-package-install.js`](../scripts/check-package-install.js).

## Minimal decision rule

- choose the raw archive schema when you need a portable structural contract for export/import tooling
- choose the archive sample when you need a concrete payload shape to test parsers or validators
- choose portability docs and reviewer surfaces when policy and trust posture matter more than raw shape

## Verification

- `npm run check:archive-recipes`
- `npm run check:schema-recipes`
- `npm run check:package-install`
- `npm run check:portability`
