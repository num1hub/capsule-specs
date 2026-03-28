# Integrity Recipes

This guide covers the public-safe path for recomputing `integrity_sha3_512` without depending on unpublished runtime helpers.

## What this layer covers

Use this layer when you need to:

- verify that a published example capsule is sealed correctly
- repair the intentional `G16` teaching example locally
- reproduce the public sealing rule in your own scripts or tests

## Public sealing rule

The published integrity rule is:

1. take only the first four capsule roots:
   `metadata`, `core_payload`, `neuro_concentrate`, `recursive_layer`
2. serialize that payload as sorted-key canonical JSON
3. compute a lowercase hex `SHA3-512` digest over that canonical string
4. store the result in `integrity_sha3_512`

This recipe layer is bounded. It covers the public sealing rule only. It does not replace the stronger live validator for full gate enforcement, target-ID resolution, or auto-fix policy.

## Repo-local recipe

- [`../examples/client/recompute-integrity-seal.mjs`](../examples/client/recompute-integrity-seal.mjs)

This recipe:

- recomputes the seal for the published note example
- proves the note example is sealed correctly
- recomputes the expected seal for the intentional `G16`-negative example
- shows how to build a repaired copy without mutating the teaching fixture

## Package-consumer recipe

- [`../examples/client/esm-package-recompute-integrity-seal.mjs`](../examples/client/esm-package-recompute-integrity-seal.mjs)

This recipe uses only the installed package exports and compact reference constants. It is the shortest proof that a downstream consumer can recompute public seals from the packaged artifact alone.

## Related examples

- [`../examples/example-note.capsule.json`](../examples/example-note.capsule.json)
  Published positive capsule example with a correct integrity seal.
- [`../examples/example-validator-invalid-g16.capsule.json`](../examples/example-validator-invalid-g16.capsule.json)
  Structurally valid capsule that intentionally fails `G16`.
- [`../examples/api/validate-response.fail.json`](../examples/api/validate-response.fail.json)
  Published validator-facing failure envelope showing the expected recomputed hash for the negative `G16` example.
- [`../examples/api/validate-response.fix.sample.json`](../examples/api/validate-response.fix.sample.json)
  Published validator-facing fix envelope showing the corrected seal.

## Stronger sources

This recipe surface does not outrank:

- [`16-gates.md`](16-gates.md)
- [`schema-reference.md`](schema-reference.md)
- [`validator.md`](validator.md)
- [`../references/contract-constants.json`](../references/contract-constants.json)

## Verification

- `npm run check:integrity-recipes`
- `npm run check:examples`
- `npm run check:api-examples`
- `npm run check:package-install`
