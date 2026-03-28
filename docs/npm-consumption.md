# Package Consumption

This repository carries a buildable package-consumer surface for downstream users who want to consume the public contract layer through package exports instead of file-relative imports.
The package metadata, subpath exports, and examples are part of the public repo contract even when a separate npm registry release is not assumed.

## What this covers

- built CommonJS projection artifacts under `dist/projections/`
- package exports for the root projection namespaces
- package exports for `typescript`, `zod`, and selected JSON artifacts
- package exports for compact contract reference JSON artifacts
- package exports for pass, fail, batch, and fix validator response-family parsing and typing through installed CommonJS, ESM, and TypeScript consumer recipes
- package exports for single, batch, and fix validator request-family typing through installed TypeScript consumer recipes
- package exports for bounded generic, unauthorized, conflict, and rate-limit error-envelope parsing through installed CommonJS, ESM, and TypeScript consumer recipes
- package exports for validator support-response parsing through installed CommonJS, ESM, and TypeScript consumer recipes
- package exports for raw JSON Schema validation with third-party validators such as Ajv
- package exports for archive-bundle schema validation against the published portability sample
- package exports for intentionally invalid archive-bundle fixtures used in structural rejection tests
- package exports for intentionally invalid capsule and validator-envelope fixtures used in structural rejection tests
- package exports for integrity-rule constants and copyable seal-recomputation recipes
- package exports for curated raw capsule source files
- extracted-artifact consumption of packaged JSON assets from Python recipes
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
- `@num1hub/capsule-specs/schemas/capsule-schema.bundle.json`
- `@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json`
- `@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json`
- `@num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json`
- `@num1hub/capsule-specs/schemas/archive-bundle.schema.json`
- `@num1hub/capsule-specs/openapi/validate.openapi.json`
- `@num1hub/capsule-specs/references/contract-constants.json`
- `@num1hub/capsule-specs/references/validation-gates.json`
- `@num1hub/capsule-specs/examples/example-validator-invalid-g16.capsule.json`
- `@num1hub/capsule-specs/capsules/capsule.foundation.capsuleos.confidence-vector.v1.json`
- `@num1hub/capsule-specs/capsules/capsule.foundation.capsuleos.versioning-protocol.v1.json`

## Repo checkout workflow

If you are working from a repository checkout rather than an already packed artifact:

1. run `npm install`
2. run `npm run build:projections`
3. consume the built exports through the package subpaths above

For a dry-run pack check, use `npm run check:package-surface`.
For a real install smoke test in fresh CommonJS, ESM, and TypeScript projects, use `npm run check:package-install`.
If you need the same packaged JSON artifacts from Python without package imports, use the extracted-artifact path in [`python-consumption.md`](python-consumption.md).
If you want a single-file schema path for Ajv, code generators, or polyglot tooling, start with [`schema-bundles.md`](schema-bundles.md).

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

## Minimal compact reference import example

```js
const contractConstants = require("@num1hub/capsule-specs/references/contract-constants.json");
const validationGates = require("@num1hub/capsule-specs/references/validation-gates.json");

console.log(contractConstants.relation_types);
console.log(validationGates.gates.map((gate) => gate.id));
console.log(contractConstants.validator.integrity_payload_root_keys);
console.log(contractConstants.validator.integrity_canonicalization);
```

## Minimal package-level integrity example

A copyable version of this example also lives at [`../examples/client/esm-package-recompute-integrity-seal.mjs`](../examples/client/esm-package-recompute-integrity-seal.mjs).

That recipe proves the installed package exports enough public material to recompute `integrity_sha3_512`, verify the positive note example, and repair the intentional `G16` teaching example without depending on unpublished runtime helpers.

## Minimal package-level support-response example

Copyable versions of this example also live at [`../examples/client/cjs-package-support-responses.cjs`](../examples/client/cjs-package-support-responses.cjs), [`../examples/client/esm-package-support-responses.mjs`](../examples/client/esm-package-support-responses.mjs), and [`../examples/client/ts-package-support-responses.ts`](../examples/client/ts-package-support-responses.ts).

```js
import * as validatorProjection from "@num1hub/capsule-specs/zod/validator-api";
import gatesResponse from "@num1hub/capsule-specs/examples/api/gates-response.sample.json" with { type: "json" };
import statsResponse from "@num1hub/capsule-specs/examples/api/stats-response.sample.json" with { type: "json" };

const gatesResponseSchema = validatorProjection.gatesResponseSchema ?? validatorProjection.default?.gatesResponseSchema;
const statsResponseSchema = validatorProjection.statsResponseSchema ?? validatorProjection.default?.statsResponseSchema;

console.log(gatesResponseSchema.parse(gatesResponse).gates.map((gate) => gate.id));
console.log(statsResponseSchema.parse(statsResponse).passRate);
```

These recipes prove that the installed package surface does not stop at `validate` request/response flows. It also carries the published `gates` and `stats` support-response payloads plus the public Zod and TypeScript validator-envelope projections needed to inspect those support routes without guessing shape from prose.

## Minimal package-level error-envelope example

Copyable versions of this example also live at [`../examples/client/cjs-package-error-responses.cjs`](../examples/client/cjs-package-error-responses.cjs), [`../examples/client/esm-package-error-responses.mjs`](../examples/client/esm-package-error-responses.mjs), and [`../examples/client/ts-package-error-responses.ts`](../examples/client/ts-package-error-responses.ts).

```js
import * as validatorProjection from "@num1hub/capsule-specs/zod/validator-api";
import genericError from "@num1hub/capsule-specs/examples/api/error-response.sample.json" with { type: "json" };
import unauthorizedError from "@num1hub/capsule-specs/examples/api/unauthorized-response.sample.json" with { type: "json" };

const simpleErrorResponseSchema =
  validatorProjection.simpleErrorResponseSchema ?? validatorProjection.default?.simpleErrorResponseSchema;

console.log(simpleErrorResponseSchema.parse(genericError).error);
console.log(simpleErrorResponseSchema.parse(unauthorizedError).error);
```

These recipes prove that the installed package surface also covers the bounded shared generic, unauthorized, conflict, and rate-limit error envelopes instead of leaving non-2xx parsing as prose-only or Python-only guidance.

## Minimal package-level validate-response family example

Copyable versions of this example also live at [`../examples/client/cjs-package-validate-response.cjs`](../examples/client/cjs-package-validate-response.cjs), [`../examples/client/esm-package-validate-response.mjs`](../examples/client/esm-package-validate-response.mjs), and [`../examples/client/ts-package-validate-responses.ts`](../examples/client/ts-package-validate-responses.ts).

```js
import * as validatorProjection from "@num1hub/capsule-specs/zod/validator-api";
import passResponse from "@num1hub/capsule-specs/examples/api/validate-response.pass.json" with { type: "json" };
import failResponse from "@num1hub/capsule-specs/examples/api/validate-response.fail.json" with { type: "json" };

const validatePassResponseSchema =
  validatorProjection.validatePassResponseSchema ?? validatorProjection.default?.validatePassResponseSchema;
const validateFailResponseSchema =
  validatorProjection.validateFailResponseSchema ?? validatorProjection.default?.validateFailResponseSchema;

console.log(validatePassResponseSchema.parse(passResponse).valid);
console.log(validateFailResponseSchema.parse(failResponse).errors[0]?.gate);
```

These recipes prove that the installed package surface covers the published pass, fail, batch, and fix validator response families instead of leaving installed-package response handling at the single positive-pass sample only.

## Minimal package-level Ajv schema example

A copyable version of this example also lives at [`../examples/client/esm-package-ajv-validate-contracts.mjs`](../examples/client/esm-package-ajv-validate-contracts.mjs).

```js
import Ajv2020 from "ajv/dist/2020.js";
import capsuleSchema from "@num1hub/capsule-specs/schemas/capsule-schema.json" with { type: "json" };
import neuroSchema from "@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json" with { type: "json" };
import note from "@num1hub/capsule-specs/examples/example-note.capsule.json" with { type: "json" };

const ajv = new Ajv2020({ allErrors: true, strict: true });
ajv.addSchema(neuroSchema);
const validateCapsule = ajv.compile(capsuleSchema);

if (!validateCapsule(note)) {
  throw new Error(JSON.stringify(validateCapsule.errors));
}
```

## Minimal package-level bundled-schema example

A copyable version of this example also lives at [`../examples/client/esm-package-ajv-validate-schema-bundles.mjs`](../examples/client/esm-package-ajv-validate-schema-bundles.mjs).

That recipe proves the installed package exports single-file schema bundle artifacts for both capsule validation and validator-envelope validation, so downstream consumers do not need to wire multi-file `$ref` graphs manually.

## Minimal package-level archive-schema example

A copyable version of this example also lives at [`../examples/client/esm-package-ajv-validate-archive-bundle.mjs`](../examples/client/esm-package-ajv-validate-archive-bundle.mjs).

That recipe proves the installed package exports the published archive-bundle schema and sample payload, so portability consumers can validate export/replay contract shape without reaching into private runtime code or a hosted service. Use `ajv/dist/2020.js` together with `ajv-formats` when consuming that path because the archive schema includes `date-time` fields.

## Minimal package-level invalid archive example

A copyable version of this example also lives at [`../examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs`](../examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs).

That recipe proves the installed package exports intentionally invalid archive fixtures under `examples/archive-invalid/` so portability consumers can keep schema-level rejection tests next to the positive archive sample instead of inventing their own negative fixtures first.

## Minimal package-level Ajv negative example

A copyable version of this example also lives at [`../examples/client/esm-package-ajv-reject-invalid-capsules.mjs`](../examples/client/esm-package-ajv-reject-invalid-capsules.mjs).

That recipe proves the installed package exports not only valid schemas and examples, but also the intentionally invalid capsule fixtures under `examples/invalid/` that raw-schema consumers can use for regression tests.

A package-level validator-envelope variant also lives at [`../examples/client/esm-package-ajv-reject-invalid-validator-envelopes.mjs`](../examples/client/esm-package-ajv-reject-invalid-validator-envelopes.mjs).

That recipe proves the installed package exports intentionally invalid validator-envelope fixtures under `examples/api-invalid/` for raw-schema regression tests at the HTTP-contract layer.

## Cross-language packed-artifact example

The packaged artifact also supports a raw-asset path outside the Node runtime. See:

- [`python-consumption.md`](python-consumption.md)
- [`../examples/client/python-contract-reference.py`](../examples/client/python-contract-reference.py)
- [`../examples/client/python-recompute-integrity-seal.py`](../examples/client/python-recompute-integrity-seal.py)

Those recipes prove that extracted package contents include enough public JSON assets for Python consumers to read the compact reference pack and recompute public `G16` seals without depending on Node subpath imports or a PyPI distribution.

## Minimal ESM example

```js
import * as zodProjection from "@num1hub/capsule-specs/zod";
import note from "@num1hub/capsule-specs/examples/example-note.capsule.json" with { type: "json" };

const capsuleSchema = zodProjection.capsuleSchema ?? zodProjection.default?.capsuleSchema;
const parsed = capsuleSchema.parse(note);
console.log(parsed.metadata.capsule_id);
```

## Minimal TypeScript type-resolution example

A copyable single-request version of this example also lives at [`../examples/client/ts-package-validate-request.ts`](../examples/client/ts-package-validate-request.ts). Batch and fix request-family variants live at [`../examples/client/ts-package-validate-batch-request.ts`](../examples/client/ts-package-validate-batch-request.ts) and [`../examples/client/ts-package-validate-fix-request.ts`](../examples/client/ts-package-validate-fix-request.ts). A compact-reference variant lives at [`../examples/client/ts-package-contract-reference.ts`](../examples/client/ts-package-contract-reference.ts).

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

These recipes prove that the installed package surface does not stop at one typed request example. It also covers single, batch, and fix validator request-family construction from TypeScript consumers without falling back to repo-relative projection imports.

## Important boundaries

- This package-consumer layer is a convenience surface over the stronger public schemas and OpenAPI artifacts.
- The build output is derived from the maintained source projections in `projections/`.
- The TypeScript package recipe is typechecked through the repo-local self-package path map and rechecked from a fresh installed tarball.
- The TypeScript package request recipes prove installed-package typing for the single, batch, and fix validator request families, not live validator execution.
- The package surface does not turn this repository into a complete SDK.
- The package surface is compatible with raw-schema validators, but those validators still only prove structural contract conformance, not live gate semantics.
- The package support-response recipes prove installed-package parsing and typing for the published `gates` and `stats` payloads, not live-route availability or hosted-service behavior.
- The package error-envelope recipes prove installed-package parsing and typing for the bounded shared generic, unauthorized, conflict, and rate-limit payloads, not a promise about every private runtime error variant.
- The package validate-response recipes prove installed-package parsing and typing for the published pass, fail, batch, and fix families, not live validator execution or hosted-service availability.
- The Python path uses extracted packaged files and raw JSON assets; it does not expose the Node exports as Python modules or imply a PyPI release.
- The reference-pack exports are convenience JSON layers for compact tooling use, not stronger replacements for the schemas, raw capsules, or validator/OpenAPI surfaces they summarize.
- The raw capsule exports are curated reference assets, not a promise that the whole upstream vault is available as a package surface.
- The package surface is verified through local tarball install, subpath consumption, and TypeScript type-resolution checks, not through an implied npm registry promise.
- The live validator and the published JSON Schema/OpenAPI surfaces remain stronger sources for edge-case semantics.

## Verification

- `npm run build:projections`
- `npm run check:package-surface`
- `npm run check:package-install`
- `npm run check:reference-pack`
- `npm run check:schema-bundles`
- `npm run check:schema-recipes`
- `npm run check:archive-recipes`
- `npm run check:invalid-archive-examples`
- `npm run check:invalid-examples`
- `npm run check:invalid-api-examples`
- `npm run check:integrity-recipes`
- `npm run check:python-recipes`
