# Package Consumption

This repository carries a buildable package-consumer surface for downstream users who want to consume the public contract layer through package exports instead of file-relative imports.
The package metadata, subpath exports, and examples are part of the public repo contract even when a separate npm registry release is not assumed.

## What this covers

- built CommonJS projection artifacts under `dist/projections/`
- package exports for the root projection namespaces
- package exports for `typescript`, `zod`, and selected JSON artifacts
- pack-time inclusion of the built projection layer
- fresh-project install checks for both CommonJS and ESM consumers

## Registry note

This document describes the package surface defined by `package.json` and verified through `npm pack` plus fresh-project install checks.
It does not claim that every tagged GitHub release is automatically published to the npm registry.

## Intended entrypoints

After installing from a local tarball, release artifact, or repository checkout, use these package subpaths:

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
For a real install smoke test in fresh CommonJS and ESM projects, use `npm run check:package-install`.

## Minimal CommonJS example

```js
const { capsuleSchema } = require("@num1hub/capsule-specs/zod");
const note = require("@num1hub/capsule-specs/examples/example-note.capsule.json");

const parsed = capsuleSchema.parse(note);
console.log(parsed.metadata.capsule_id);
```

## Minimal ESM example

```js
import * as zodProjection from "@num1hub/capsule-specs/zod";
import note from "@num1hub/capsule-specs/examples/example-note.capsule.json" with { type: "json" };

const capsuleSchema = zodProjection.capsuleSchema ?? zodProjection.default?.capsuleSchema;
const parsed = capsuleSchema.parse(note);
console.log(parsed.metadata.capsule_id);
```

## Important boundaries

- This package-consumer layer is a convenience surface over the stronger public schemas and OpenAPI artifacts.
- The build output is derived from the maintained source projections in `projections/`.
- The package surface does not turn this repository into a complete SDK.
- The package surface is verified through local tarball install and subpath consumption, not through an implied npm registry promise.
- The live validator and the published JSON Schema/OpenAPI surfaces remain stronger sources for edge-case semantics.

## Verification

- `npm run build:projections`
- `npm run check:package-surface`
- `npm run check:package-install`
