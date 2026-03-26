# Quickstart

Use this guide when you want the shortest safe entry into the repository.

## 1. Understand the repository

- Read [`README.md`](README.md) for the public boundary and current scope.
- Read [`docs/overview.md`](docs/overview.md) for the purpose of this repository.

## 2. Learn the core law

- Read [`docs/5-element-law.md`](docs/5-element-law.md).
- Read [`docs/16-gates.md`](docs/16-gates.md).
- Read [`docs/relation-types.md`](docs/relation-types.md).

## 3. Learn the machine-facing surfaces

- Inspect [`schemas/capsule-schema.json`](schemas/capsule-schema.json).
- Inspect [`schemas/neuro-concentrate.schema.json`](schemas/neuro-concentrate.schema.json).
- Inspect [`schemas/validator-api-envelopes.schema.json`](schemas/validator-api-envelopes.schema.json).
- Inspect [`openapi/validate.openapi.json`](openapi/validate.openapi.json).
- Read [`docs/api-envelopes.md`](docs/api-envelopes.md) and the payloads under [`examples/api/`](examples/api/).
- Read [`docs/integration-guide.md`](docs/integration-guide.md) before wiring a real client or parser.
- Skim [`PUBLIC_CONTRACT_CATALOG.json`](PUBLIC_CONTRACT_CATALOG.json) if you need a machine-readable map of stable surfaces.
- Read [`docs/route-reference.md`](docs/route-reference.md) if you want a route-by-route validator view.
- Inspect [`PUBLIC_RELEASE_METADATA.json`](PUBLIC_RELEASE_METADATA.json) if you want machine-readable release evidence.
- Inspect [`PUBLIC_PORTABILITY_PROFILE.json`](PUBLIC_PORTABILITY_PROFILE.json) if you want the public portability and archive-trust summary.
- Read [`docs/client-recipes.md`](docs/client-recipes.md) if you want to call the validator quickly from curl or Node.

## 4. Inspect examples

- Read [`docs/examples.md`](docs/examples.md).
- Open the examples under [`examples/`](examples/).
- Inspect [`examples/archive/`](examples/archive/) if you need the public archive-bundle example.

## 5. Contribute safely

- Read [`CONTRIBUTING.md`](CONTRIBUTING.md).
- Read [`SECURITY.md`](SECURITY.md) before reporting trust-sensitive problems.
- Run `npm run verify:repo` before publishing a serious change to the public surface.
- Read [`docs/verification.md`](docs/verification.md) if you need to understand what each repo-local check protects.
- Read [`NOTICE`](NOTICE) if you need the Apache-2 attribution surface for redistribution.
- Read [`docs/trust-model.md`](docs/trust-model.md) if you need the source-of-truth hierarchy before integrating.
- Read [`docs/portability.md`](docs/portability.md) if you need the public portability/no-lock-in posture.
