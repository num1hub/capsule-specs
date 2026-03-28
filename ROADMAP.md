# Roadmap

This roadmap describes the delivered and next useful waves for the public N1Hub specification surface.

Wave 2 and Wave 3 are already delivered. Wave 4 is the next deliberate expansion layer.

## Wave 1: Public foundation

- publish the core docs
- publish JSON Schema and neuro-concentrate schema
- publish validator-facing OpenAPI
- publish a minimal example set
- publish provenance and release-review artifacts

## Wave 2: Better integrator surfaces

- add clearer field-by-field schema commentary
  Delivered in [`docs/schema-reference.md`](docs/schema-reference.md).
- add more example capsules for project and hub patterns
- expand compatibility notes for downstream tool builders
- deepen docs around validator request and response envelopes
  Delivered through [`docs/api-envelopes.md`](docs/api-envelopes.md), [`docs/openapi.md`](docs/openapi.md), and the validator API example pack.
- add more API sample payloads as public routes stabilize
- keep docs link integrity and public contract discoverability automated

## Wave 3: Projection-friendly references

- publish and expand TypeScript and Zod projections where public-safe
  Delivered in [`projections/`](projections/), [`docs/type-projections.md`](docs/type-projections.md), and the buildable package-export path documented in [`docs/npm-consumption.md`](docs/npm-consumption.md).
- add generated reference indexes for route families and schema families
  Delivered in [`docs/route-reference.md`](docs/route-reference.md) and [`docs/schema-family-reference.md`](docs/schema-family-reference.md).
- add contributor-facing validation workflows for this repo alone
  Delivered in [`docs/repo-validation-workflow.md`](docs/repo-validation-workflow.md).
- verify the package layer from a fresh consumer project instead of relying only on repo-local self-reference
  Delivered in [`scripts/check-package-install.js`](scripts/check-package-install.js), [`docs/npm-consumption.md`](docs/npm-consumption.md), and the package recipes under [`examples/client/`](examples/client/).

## Wave 4: Broader open-core references

- expand the curated raw capsule set
  Started through the law-adjacent raw capsule additions under [`capsules/`](capsules/) and the guarded repo-local verifier in [`scripts/check-raw-capsules.js`](scripts/check-raw-capsules.js).
- publish more contract families when they are ready for a stable public boundary
  Started through the compact contract-reference layer under [`references/`](references/), the guide in [`docs/reference-pack.md`](docs/reference-pack.md), and the verifier in [`scripts/check-reference-pack.js`](scripts/check-reference-pack.js).
- improve onboarding for external contributors and integrators
  Started through [`docs/schema-validation-recipes.md`](docs/schema-validation-recipes.md), the Ajv consumer recipes under [`examples/client/`](examples/client/), and the verifier in [`scripts/check-schema-recipes.js`](scripts/check-schema-recipes.js).
  Deepened further through [`docs/invalid-capsule-examples.md`](docs/invalid-capsule-examples.md), [`examples/invalid/`](examples/invalid/), and the verifier in [`scripts/check-invalid-examples.js`](scripts/check-invalid-examples.js).
  Deepened further through [`docs/invalid-api-envelope-examples.md`](docs/invalid-api-envelope-examples.md), [`examples/api-invalid/`](examples/api-invalid/), and the verifier in [`scripts/check-invalid-api-examples.js`](scripts/check-invalid-api-examples.js).
  Deepened further through [`docs/integrity-recipes.md`](docs/integrity-recipes.md), the sealing recipes under [`examples/client/`](examples/client/), and the verifier in [`scripts/check-integrity-recipes.js`](scripts/check-integrity-recipes.js).
  Deepened further through [`docs/python-consumption.md`](docs/python-consumption.md), the Python consumer recipes under [`examples/client/`](examples/client/), and the verifier in [`scripts/check-python-recipes.js`](scripts/check-python-recipes.js).
  Deepened further through Python validator-envelope recipes for `validate`, `batch`, and `fix` flows under [`examples/client/`](examples/client/), keeping the cross-language path useful for HTTP consumers as well as raw-asset readers.
  Deepened further through Python response-family parsing recipes under [`examples/client/`](examples/client/), keeping the cross-language path useful for both request construction and bounded response handling.
  Deepened further through cURL, Node, and Python live recipes for the published `gates` and `stats` support routes under [`examples/client/`](examples/client/), completing copyable client coverage across the full published validator route set.
  Deepened further through [`docs/schema-bundles.md`](docs/schema-bundles.md), the single-file schema bundle artifacts under [`schemas/`](schemas/), and the verifier in [`scripts/check-schema-bundles.js`](scripts/check-schema-bundles.js).
  Deepened further through [`docs/archive-validation-recipes.md`](docs/archive-validation-recipes.md), the archive-bundle Ajv recipes under [`examples/client/`](examples/client/), and the verifier in [`scripts/check-archive-recipes.js`](scripts/check-archive-recipes.js).
  Deepened further through [`docs/invalid-archive-bundle-examples.md`](docs/invalid-archive-bundle-examples.md), [`examples/archive-invalid/`](examples/archive-invalid/), and the verifier in [`scripts/check-invalid-archive-examples.js`](scripts/check-invalid-archive-examples.js).
