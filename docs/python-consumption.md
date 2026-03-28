# Python Consumption

This page describes the public JSON-first consumption path for Python users.

It is intentionally narrow:

- read compact reference JSON artifacts
- inspect curated raw capsule assets
- recompute `integrity_sha3_512` from the published `G16` rule
- consume the same assets from a repository checkout or an extracted packed artifact

It does not turn this repository into a PyPI package, a Python SDK, or a replacement for the stronger schema, OpenAPI, or live-validator surfaces.

## Repo checkout recipes

The shortest repo-relative Python examples live under [`../examples/client/`](../examples/client/):

- [`../examples/client/python-contract-reference.py`](../examples/client/python-contract-reference.py)
- [`../examples/client/python-recompute-integrity-seal.py`](../examples/client/python-recompute-integrity-seal.py)

Run them from a checkout with:

```bash
python3 examples/client/python-contract-reference.py
python3 examples/client/python-recompute-integrity-seal.py
```

The first recipe reads the compact contract-reference JSON exports.
The second recipe recomputes `integrity_sha3_512` over the published four-root payload, verifies the positive note example, and computes the repaired hash for the intentional `G16` teaching example.

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
```

Those scripts resolve the package root from their own location, so they still work after extraction as long as the `package/` layout is preserved.

## What this proves

- Python consumers can read `references/contract-constants.json` and `references/validation-gates.json` directly.
- Python consumers can recompute published integrity seals without calling private runtime helpers.
- The packed artifact includes enough public JSON and example material for cross-language consumption.

## Boundaries

- This is a raw-asset consumption path, not a Python package distribution promise.
- The recipes read published JSON artifacts and documented sealing rules; they do not expose the TypeScript or Zod projection layer as Python modules.
- The recipes prove the published `G16` rule and packaged asset layout, not every edge-case behavior of the live validator.

## Related surfaces

- [`integrity-recipes.md`](integrity-recipes.md)
- [`reference-pack.md`](reference-pack.md)
- [`npm-consumption.md`](npm-consumption.md)
- [`client-recipes.md`](client-recipes.md)

## Verification

- `npm run check:python-recipes`
- `npm run check:package-surface`
- `npm run verify:repo`
