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
  Deepened further through a reusable Python live-validator client recipe backed by the published route pack and request examples under [`examples/client/python-live-validator-client.py`](examples/client/python-live-validator-client.py), so the cross-language path now has one full-route bridge instead of only point scripts.
  Deepened further through Python validator-envelope recipes for `validate`, `batch`, and `fix` flows under [`examples/client/`](examples/client/), keeping the cross-language path useful for HTTP consumers as well as raw-asset readers.
  Deepened further through Python response-family parsing recipes under [`examples/client/`](examples/client/), keeping the cross-language path useful for both request construction and bounded response handling.
  Deepened further by splitting the Python response-side path into dedicated validate, bounded error-envelope, and support-response recipes under [`examples/client/`](examples/client/), so cross-language consumers no longer have to read support-route and error-envelope handling through one overloaded script.
  Deepened further through cURL, Node, and Python live recipes for the published `gates` and `stats` support routes under [`examples/client/`](examples/client/), completing copyable client coverage across the full published validator route set.
  Deepened further through [`examples/client/node-validate-fix.mjs`](examples/client/node-validate-fix.mjs), closing the remaining Node route gap for the published `fix` flow so the Node live-route path now covers every published validator endpoint.
  Deepened further through installed-package CommonJS, ESM, and TypeScript support-response recipes for `gates` and `stats`, so the package-consumer layer now proves support-route payload handling instead of stopping at `validate` request/response flows.
  Deepened further through repo-relative TypeScript and Zod support-response recipes for `gates` and `stats`, so source-level projection consumers are no longer forced to infer support payload usage from package-only or Python-only examples.
  Deepened further through repo-relative TypeScript batch/fix request recipes and Zod batch/fix response recipes, so source-level projection consumers now have copyable coverage for all published validator envelope families rather than only the single-request path.
  Deepened further through repo-relative Zod request-family parsers plus installed-package CommonJS and ESM request-family parsers, so request-side projection consumers are no longer limited to TypeScript builders or raw Ajv validation for the published single, batch, and fix samples.
  Deepened further through repo-relative and installed-package TypeScript request-family sample parsers, so TypeScript consumers can now type the published single, batch, and fix request samples directly instead of treating TypeScript as construction-only on the request side.
  Deepened further through sample-driven source-level Zod pass/fail response parsers, so the repo-relative Zod path now covers the full published validate-response family without leaving the positive pass example as a synthetic object.
  Deepened further through installed-package TypeScript single/batch/fix request recipes, so the package-consumer layer now proves the full published validator request family instead of stopping at one single-request builder.
  Deepened further through repo-relative and installed-package error-envelope recipes for the shared public generic, unauthorized, conflict, and rate-limit response family, so bounded non-2xx handling is no longer proven only through raw JSON samples or Python parsing.
  Deepened further through a dedicated `403 owner role required` sample under [`examples/api/forbidden-response.sample.json`](examples/api/forbidden-response.sample.json), so the documented batch/fix owner-role rejection path now has concrete public evidence instead of an empty example slot.
  Deepened further through a dedicated `GET /api/validate/stats` `500` sample under [`examples/api/stats-error-response.sample.json`](examples/api/stats-error-response.sample.json) plus aligned TypeScript route metadata, so the documented support-route failure path no longer exists only as prose/OpenAPI status text or empty projection example slots.
  Deepened further through repo-relative TypeScript response-family recipes and installed-package CommonJS, ESM, and TypeScript validate-response coverage for the published pass, fail, batch, and fix samples, so public response handling no longer degrades to pass-only package parsing or Python-only full-family examples.
  Deepened further through repo-relative and installed-package TypeScript live-client recipes for the published `validate`, `batch`, `fix`, `gates`, and `stats` routes, so typed validator-route usage no longer stops at static sample parsing or shell/Node/Python-only live examples.
  Deepened further through bounded `GET /api/validate/stats?limit=...` coverage across the shell, Node, Python, and source-level/package TypeScript live-client recipes, so the compact route metadata and real consumer paths now match on the published stats query contract instead of drifting apart.
  Deepened further through a CommonJS package live-validator client recipe plus fresh-install verification, so the installed-package route bridge now stays symmetric across CommonJS, ESM, and TypeScript consumers instead of stopping at modern-module and typed paths.
  Deepened further through installed-package ESM compact-reference and live-client recipes, so modern JavaScript consumers can now consume the reference pack and the published validator route family without falling back to CommonJS or TypeScript-only examples.
  Deepened further through response-status, auth, and query metadata in the compact `validator-routes` layer plus a source-level TypeScript route-behavior reference recipe, so route-aware tooling no longer has to scrape OpenAPI just to reconstruct practical public route behavior.
  Deepened further through a compact `validator-routes` reference pack and a shared TypeScript validator-route projection, so route-aware tooling and live-client recipes no longer rely on copied HTTP path strings instead of one maintained public route surface.
  Deepened further through a compact `validator-envelope-families` reference pack and a shared TypeScript envelope-family projection, so request/response family discovery no longer depends on ad-hoc schema-def crawling or prose-only API-envelope reading.
  Deepened further through [`docs/schema-bundles.md`](docs/schema-bundles.md), the single-file schema bundle artifacts under [`schemas/`](schemas/), and the verifier in [`scripts/check-schema-bundles.js`](scripts/check-schema-bundles.js).
  Deepened further through [`docs/archive-validation-recipes.md`](docs/archive-validation-recipes.md), the archive-bundle Ajv recipes under [`examples/client/`](examples/client/), and the verifier in [`scripts/check-archive-recipes.js`](scripts/check-archive-recipes.js).
  Deepened further through [`docs/invalid-archive-bundle-examples.md`](docs/invalid-archive-bundle-examples.md), [`examples/archive-invalid/`](examples/archive-invalid/), and the verifier in [`scripts/check-invalid-archive-examples.js`](scripts/check-invalid-archive-examples.js).
