# NPM Consumption

This repository now carries a package-consumer surface for downstream users who want to consume the public contract layer through package exports instead of file-relative imports.

## What this covers

- built CommonJS projection artifacts under `dist/projections/`
- package exports for the root projection namespaces
- package exports for `typescript`, `zod`, and selected JSON artifacts
- pack-time inclusion of the built projection layer

## Intended entrypoints

After installing or packing the repository, use these package subpaths:

- `@num1hub/capsule-specs`
  Root namespace export with `typescript` and `zod` sub-namespaces.
- `@num1hub/capsule-specs/typescript`
  Public-safe TypeScript projection bundle.
- `@num1hub/capsule-specs/zod`
  Public-safe Zod projection bundle.
- `@num1hub/capsule-specs/typescript/capsule`
- `@num1hub/capsule-specs/typescript/validator-api`
- `@num1hub/capsule-specs/zod/capsule`
- `@num1hub/capsule-specs/zod/validator-api`
- `@num1hub/capsule-specs/schemas/capsule-schema.json`
- `@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json`
- `@num1hub/capsule-specs/openapi/validate.openapi.json`

## Repo checkout workflow

If you are working from a repository checkout rather than an already packed artifact:

1. run `npm install`
2. run `npm run build:projections`
3. consume the built exports through the package subpaths above

For a dry-run pack check, use `npm run check:package-surface`.

## Minimal CommonJS example

```js
const { capsuleSchema } = require("@num1hub/capsule-specs/zod");
const note = require("@num1hub/capsule-specs/examples/example-note.capsule.json");

const parsed = capsuleSchema.parse(note);
console.log(parsed.metadata.capsule_id);
```

## Important boundaries

- This package-consumer layer is a convenience surface over the stronger public schemas and OpenAPI artifacts.
- The build output is derived from the maintained source projections in `projections/`.
- The package surface does not turn this repository into a complete SDK.
- The live validator and the published JSON Schema/OpenAPI surfaces remain stronger sources for edge-case semantics.

## Verification

- `npm run build:projections`
- `npm run check:package-surface`

