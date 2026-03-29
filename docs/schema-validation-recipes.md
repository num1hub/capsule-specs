# Schema Validation Recipes

This guide shows how to validate published capsule and validator-envelope artifacts directly against the public JSON Schema surface.

Use this path when you want:

- raw JSON Schema validation without the TypeScript or Zod projection layer
- a codegen-friendly or polyglot-friendly contract path
- a fast structural check that stays subordinate to the stronger live validator for edge-case semantics

## What this path is good for

- validating capsule shape against [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
- validating request and response envelopes against [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
- validating archive portability payloads against [`../schemas/archive-bundle.schema.json`](../schemas/archive-bundle.schema.json)
- validating the client-recipe navigator itself against [`../schemas/client-recipe-index.schema.json`](../schemas/client-recipe-index.schema.json)
- wiring raw-schema tooling with a mainstream JSON Schema validator such as Ajv
- consuming the same schema artifacts either from a repo checkout or from package exports

## What this path does not prove

JSON Schema validation is a structural contract check. It does not replace validator-enforced rules such as:

- gate sequencing
- semantic-hash parity expectations
- non-draft outbound-link requirements
- known-ID resolution behavior
- integrity recomputation and live gate behavior

For those semantics, the live validator, OpenAPI surface, and validator-facing docs remain stronger.

## Repo-local Ajv recipes

Start with these copyable examples:

- [`../examples/client/ajv-validate-capsule.mjs`](../examples/client/ajv-validate-capsule.mjs)
- [`../examples/client/ajv-validate-client-recipe-index.mjs`](../examples/client/ajv-validate-client-recipe-index.mjs)
- [`../examples/client/ajv-validate-validator-envelope.mjs`](../examples/client/ajv-validate-validator-envelope.mjs)
- [`../examples/client/ajv-validate-archive-bundle.mjs`](../examples/client/ajv-validate-archive-bundle.mjs)
- [`../examples/client/ajv-validate-schema-bundles.mjs`](../examples/client/ajv-validate-schema-bundles.mjs)
- [`../examples/client/ajv-reject-invalid-archive-bundles.mjs`](../examples/client/ajv-reject-invalid-archive-bundles.mjs)
- [`../examples/client/ajv-reject-invalid-client-recipe-index.mjs`](../examples/client/ajv-reject-invalid-client-recipe-index.mjs)
- [`../examples/client/ajv-reject-invalid-capsules.mjs`](../examples/client/ajv-reject-invalid-capsules.mjs)
- [`../examples/client/ajv-reject-invalid-validator-envelopes.mjs`](../examples/client/ajv-reject-invalid-validator-envelopes.mjs)

They validate:

- a public example capsule against the capsule and neuro-concentrate schemas
- the published client-recipe navigator against its own JSON Schema contract
- validator request/response payloads against the validator envelope schema bundle
- the published archive-bundle sample against the public portability/export schema with `Ajv2020 + ajv-formats`
- the same capsule and validator-envelope payloads against single-file schema bundles when you want fewer imports and no manual multi-file `addSchema` choreography
- intentionally invalid archive-bundle fixtures against their documented structural rejection rules
- intentionally invalid client-recipe navigator fixtures against their documented structural rejection rules
- intentionally invalid capsule fixtures against their documented structural rejection rules
- intentionally invalid validator-envelope fixtures against their documented structural rejection rules

Run them from a repo checkout after `npm install`:

```bash
node examples/client/ajv-validate-capsule.mjs
node examples/client/ajv-validate-client-recipe-index.mjs
node examples/client/ajv-validate-validator-envelope.mjs
node examples/client/ajv-validate-archive-bundle.mjs
node examples/client/ajv-validate-schema-bundles.mjs
node examples/client/ajv-reject-invalid-archive-bundles.mjs
node examples/client/ajv-reject-invalid-client-recipe-index.mjs
node examples/client/ajv-reject-invalid-capsules.mjs
node examples/client/ajv-reject-invalid-validator-envelopes.mjs
```

For the underlying invalid fixtures and their intended failure reasons, see [`invalid-archive-bundle-examples.md`](invalid-archive-bundle-examples.md), [`invalid-client-recipe-index-examples.md`](invalid-client-recipe-index-examples.md), [`invalid-capsule-examples.md`](invalid-capsule-examples.md), [`invalid-api-envelope-examples.md`](invalid-api-envelope-examples.md), [`../examples/archive-invalid/README.md`](../examples/archive-invalid/README.md), [`../examples/client-invalid/README.md`](../examples/client-invalid/README.md), [`../examples/invalid/README.md`](../examples/invalid/README.md), and [`../examples/api-invalid/README.md`](../examples/api-invalid/README.md).

## Package-consumer Ajv recipes

If you want the same raw-schema path from an installed tarball or future package distribution, use:

- [`../examples/client/cjs-package-ajv-validate-contracts.cjs`](../examples/client/cjs-package-ajv-validate-contracts.cjs)
- [`../examples/client/cjs-package-ajv-reject-invalid-capsules.cjs`](../examples/client/cjs-package-ajv-reject-invalid-capsules.cjs)
- [`../examples/client/cjs-package-ajv-validate-client-recipe-index.cjs`](../examples/client/cjs-package-ajv-validate-client-recipe-index.cjs)
- [`../examples/client/cjs-package-ajv-reject-invalid-client-recipe-index.cjs`](../examples/client/cjs-package-ajv-reject-invalid-client-recipe-index.cjs)
- [`../examples/client/esm-package-ajv-validate-contracts.mjs`](../examples/client/esm-package-ajv-validate-contracts.mjs)
- [`../examples/client/esm-package-ajv-validate-archive-bundle.mjs`](../examples/client/esm-package-ajv-validate-archive-bundle.mjs)
- [`../examples/client/esm-package-ajv-validate-client-recipe-index.mjs`](../examples/client/esm-package-ajv-validate-client-recipe-index.mjs)
- [`../examples/client/esm-package-ajv-validate-schema-bundles.mjs`](../examples/client/esm-package-ajv-validate-schema-bundles.mjs)
- [`../examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs`](../examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs)
- [`../examples/client/esm-package-ajv-reject-invalid-client-recipe-index.mjs`](../examples/client/esm-package-ajv-reject-invalid-client-recipe-index.mjs)
- [`../examples/client/esm-package-ajv-reject-invalid-capsules.mjs`](../examples/client/esm-package-ajv-reject-invalid-capsules.mjs)
- [`../examples/client/esm-package-ajv-reject-invalid-validator-envelopes.mjs`](../examples/client/esm-package-ajv-reject-invalid-validator-envelopes.mjs)
- [`../examples/client/ts-package-ajv-validate-contracts.ts`](../examples/client/ts-package-ajv-validate-contracts.ts)
- [`../examples/client/ts-package-ajv-reject-invalid-capsules.ts`](../examples/client/ts-package-ajv-reject-invalid-capsules.ts)
- [`../examples/client/ts-package-ajv-validate-client-recipe-index.ts`](../examples/client/ts-package-ajv-validate-client-recipe-index.ts)
- [`../examples/client/ts-package-ajv-reject-invalid-client-recipe-index.ts`](../examples/client/ts-package-ajv-reject-invalid-client-recipe-index.ts)

Those recipes consume:

- `@num1hub/capsule-specs/schemas/capsule-schema.json`
- `@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json`
- `@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json`
- `@num1hub/capsule-specs/schemas/archive-bundle.schema.json`
- `@num1hub/capsule-specs/schemas/client-recipe-index.schema.json`
- `@num1hub/capsule-specs/schemas/capsule-schema.bundle.json`
- `@num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json`
- public example capsule and API payload files from package exports
- the public archive-bundle sample from package exports
- intentionally invalid archive-bundle fixtures from package exports
- intentionally invalid client-recipe navigator fixtures from package exports

The navigator-specific package recipes now prove that this raw-schema path remains copyable across CommonJS, ESM, and TypeScript package-consumer styles instead of stopping at one ESM-only example.

The fresh-install proof for that path lives in [`../scripts/check-package-install.js`](../scripts/check-package-install.js).

## Minimal decision rule

- choose raw schemas when you need a portable structural contract
- choose the archive schema when the contract you care about is portability/export replay shape
- choose schema bundles when you want that same contract as a single-file import
- choose the projection layer when you want typed ergonomics
- choose the live validator and OpenAPI docs when edge-case runtime behavior matters

## Verification

- `npm run check:schema-bundles`
- `npm run check:schema-recipes`
- `npm run check:archive-recipes`
- `npm run check:invalid-archive-examples`
- `npm run check:invalid-client-recipe-index-examples`
- `npm run check:invalid-examples`
- `npm run check:invalid-api-examples`
- `npm run check:package-install`
- `npm run check:api-schemas`
