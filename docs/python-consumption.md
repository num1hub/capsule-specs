# Python Consumption

This page describes the public JSON-first consumption path for Python users.

It is intentionally narrow:

- read compact reference JSON artifacts
- build validator-envelope requests for `validate`, `batch`, and `fix` flows from the published example payloads
- call the published `gates` and `stats` support routes from the same raw-JSON path
- parse validator pass/fail/batch/fix and support response envelopes from the published example payloads
- inspect curated raw capsule assets
- recompute `integrity_sha3_512` from the published `G16` rule
- consume the same assets from a repository checkout or an extracted packed artifact

It does not turn this repository into a PyPI package, a Python SDK, or a replacement for the stronger schema, OpenAPI, or live-validator surfaces.

## Repo checkout recipes

The shortest repo-relative Python examples live under [`../examples/client/`](../examples/client/):

- [`../examples/client/python-contract-reference.py`](../examples/client/python-contract-reference.py)
- [`../examples/client/python-recompute-integrity-seal.py`](../examples/client/python-recompute-integrity-seal.py)
- [`../examples/client/python-validate-single.py`](../examples/client/python-validate-single.py)
- [`../examples/client/python-validate-batch.py`](../examples/client/python-validate-batch.py)
- [`../examples/client/python-validate-fix.py`](../examples/client/python-validate-fix.py)
- [`../examples/client/python-get-gates.py`](../examples/client/python-get-gates.py)
- [`../examples/client/python-get-stats.py`](../examples/client/python-get-stats.py)
- [`../examples/client/python-parse-validate-responses.py`](../examples/client/python-parse-validate-responses.py)
- [`../examples/client/python-parse-support-responses.py`](../examples/client/python-parse-support-responses.py)

Run them from a checkout with:

```bash
python3 examples/client/python-contract-reference.py
python3 examples/client/python-recompute-integrity-seal.py
python3 examples/client/python-validate-single.py
python3 examples/client/python-validate-batch.py
python3 examples/client/python-validate-fix.py
python3 examples/client/python-get-gates.py
python3 examples/client/python-get-stats.py
python3 examples/client/python-parse-validate-responses.py
python3 examples/client/python-parse-support-responses.py
```

The first recipe reads the compact contract-reference JSON exports.
The second recipe recomputes `integrity_sha3_512` over the published four-root payload, verifies the positive note example, and computes the repaired hash for the intentional `G16` teaching example.
The validator-envelope request recipes load the published `validate`, `batch`, and `fix` request examples, print dry-run summaries by default, and can send those envelopes to a live validator when `N1HUB_BASE_URL` and `N1HUB_TOKEN` are set.
The support-route recipes read the published `gates` and `stats` samples by default and switch to live HTTP requests against the same routes when `N1HUB_BASE_URL` and `N1HUB_TOKEN` are set.
The response-parsing recipes load the published pass/fail/batch/fix and support-response examples so Python consumers can inspect bounded response families without guessing field layout from prose alone.

## Packed-artifact workflow

Python users do not need `npm install` to consume the JSON artifacts.
They can work from an extracted tarball or another unpacked release artifact.

Example flow:

```bash
npm pack
mkdir -p packed-artifact
tar -xzf num1hub-capsule-specs-0.1.0.tgz -C packed-artifact
python3 packed-artifact/package/examples/client/python-contract-reference.py
python3 packed-artifact/package/examples/client/python-recompute-integrity-seal.py
python3 packed-artifact/package/examples/client/python-validate-single.py
python3 packed-artifact/package/examples/client/python-validate-batch.py
python3 packed-artifact/package/examples/client/python-validate-fix.py
python3 packed-artifact/package/examples/client/python-get-gates.py
python3 packed-artifact/package/examples/client/python-get-stats.py
python3 packed-artifact/package/examples/client/python-parse-validate-responses.py
python3 packed-artifact/package/examples/client/python-parse-support-responses.py
```

Those scripts resolve the package root from their own location, so they still work after extraction as long as the `package/` layout is preserved.

## What this proves

- Python consumers can read `references/contract-constants.json` and `references/validation-gates.json` directly.
- Python consumers can load the published validator-envelope request examples for `POST /api/validate`, `POST /api/validate/batch`, and `POST /api/validate/fix` without inferring request shape from prose alone.
- Python consumers can call the published `GET /api/validate/gates` and `GET /api/validate/stats` routes or inspect their sample payloads from the same raw-JSON path.
- Python consumers can inspect the published pass/fail/batch/fix, gates, stats, unauthorized, conflict, generic-error, and rate-limit response families directly from raw JSON assets.
- Python consumers can recompute published integrity seals without calling private runtime helpers.
- The packed artifact includes enough public JSON and example material for cross-language consumption.

## Boundaries

- This is a raw-asset consumption path, not a Python package distribution promise.
- The recipes read published JSON artifacts and documented sealing rules; they do not expose the TypeScript or Zod projection layer as Python modules.
- The validator-envelope recipes are thin client examples, not a Python SDK, retry stack, or hosted-service guarantee.
- The recipes prove the published `G16` rule, validator-envelope request/response payload shapes, and packaged asset layout, not every edge-case behavior of the live validator.

## Related surfaces

- [`integrity-recipes.md`](integrity-recipes.md)
- [`reference-pack.md`](reference-pack.md)
- [`npm-consumption.md`](npm-consumption.md)
- [`client-recipes.md`](client-recipes.md)

## Verification

- `npm run check:python-recipes`
- `npm run check:package-surface`
- `npm run verify:repo`
