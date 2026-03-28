# Package Consumption

This repository carries a buildable package-consumer surface for downstream users who want to consume the public contract layer through package exports instead of file-relative imports.
The package metadata, subpath exports, and examples are part of the public repo contract even when a separate npm registry release is not assumed.

## What this covers

- built CommonJS projection artifacts under `dist/projections/`
- package exports for the root projection namespaces
- package exports for `typescript`, `zod`, and selected JSON artifacts
- package exports for curated raw capsule source files
- pack-time inclusion of the built projection layer
- fresh-project install checks for CommonJS, ESM, and TypeScript consumers

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
- `@num1hub/capsule-specs/capsules/capsule.foundation.capsuleos.confidence-vector.v1.json`
- `@num1hub/capsule-specs/capsules/capsule.foundation.capsuleos.versioning-protocol.v1.json`

## Repo checkout workflow

If you are working from a repository checkout rather than an already packed artifact:

1. run `npm install`
2. run `npm run build:projections`
3. consume the built exports through the package subpaths above

For a dry-run pack check, use `npm run check:package-surface`.
For a real install smoke test in fresh CommonJS, ESM, and TypeScript projects, use `npm run check:package-install`.

## Minimal CommonJS example

```js
const { capsuleSchema } = require("@num1hub/capsule-specs/zod");
const note = require("@num1hub/capsule-specs/examples/example-note.capsule.json");

const parsed = capsuleSchema.parse(note);
console.log(parsed.metadata.capsule_id);
```

## Minimal raw capsule import example

```js
const confidenceVectorCapsule = require("@num1hub/capsule-specs/capsules/capsule.foundation.capsuleos.confidence-vector.v1.json");

console.log(confidenceVectorCapsule.metadata.capsule_id);
```

## Minimal ESM example

```js
import * as zodProjection from "@num1hub/capsule-specs/zod";
import note from "@num1hub/capsule-specs/examples/example-note.capsule.json" with { type: "json" };

const capsuleSchema = zodProjection.capsuleSchema ?? zodProjection.default?.capsuleSchema;
const parsed = capsuleSchema.parse(note);
console.log(parsed.metadata.capsule_id);
```

## Minimal TypeScript type-resolution example

A copyable version of this example also lives at [`../examples/client/ts-package-validate-request.ts`](../examples/client/ts-package-validate-request.ts).

```ts
import { CAPSULE_TYPES, type Capsule } from "@num1hub/capsule-specs/typescript/capsule";
import type { ValidateSingleRequest } from "@num1hub/capsule-specs/typescript/validator-api";

const capsule: Capsule = {
  metadata: {
    capsule_id: "capsule.example.fresh-typescript-consumer.v1",
    type: CAPSULE_TYPES[1],
    subtype: "atomic",
    status: "active",
    version: "1.0.0",
    semantic_hash: "fresh-typescript-consumer-capsule-contract-layer"
  },
  core_payload: { content_type: "markdown", content: "Type-safe package consumer." },
  neuro_concentrate: {
    summary: "TypeScript package consumer example.",
    keywords: ["typescript", "package", "consumer", "capsule", "validator"],
    confidence_vector: {
      extraction: 1,
      synthesis: 0.99,
      linking: 0.95,
      provenance_coverage: 0.95,
      validation_score: 0.95,
      contradiction_pressure: 0.01
    },
    semantic_hash: "fresh-typescript-consumer-capsule-contract-layer"
  },
  recursive_layer: { links: [] },
  integrity_sha3_512: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
};

const request: ValidateSingleRequest = { capsule, options: { skipG16: true }, autoFix: false };
```

## Important boundaries

- This package-consumer layer is a convenience surface over the stronger public schemas and OpenAPI artifacts.
- The build output is derived from the maintained source projections in `projections/`.
- The TypeScript package recipe is typechecked through the repo-local self-package path map and rechecked from a fresh installed tarball.
- The package surface does not turn this repository into a complete SDK.
- The raw capsule exports are curated reference assets, not a promise that the whole upstream vault is available as a package surface.
- The package surface is verified through local tarball install, subpath consumption, and TypeScript type-resolution checks, not through an implied npm registry promise.
- The live validator and the published JSON Schema/OpenAPI surfaces remain stronger sources for edge-case semantics.

## Verification

- `npm run build:projections`
- `npm run check:package-surface`
- `npm run check:package-install`
