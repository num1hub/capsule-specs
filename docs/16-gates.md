# The 16 Validation Gates

Before a capsule is trusted, the validator checks it against sixteen gates.

## Structural gates

- `G01`: exactly five root keys
- `G02`: required subfields present
- `G03`: types, enums, and versions match the canonical contract
- `G04`: provenance coverage is high enough and source metadata is present when required
- `G05`: content type is recognized or at least structurally acceptable
- `G06`: payload integrity rules are satisfied

## Neuro and semantic gates

- `G07`: summary length is within the allowed range
- `G08`: keywords count is within the allowed range
- `G09`: semantic hash format is valid
- `G10`: semantic hash parity holds between metadata and neuro layer
- `G11`: relation types are canonical

## Topology and confidence gates

- `G12`: linked target IDs resolve when known-ID validation is active
- `G13`: non-draft capsules include at least one outbound link
- `G14`: long capsules cannot claim unrealistically perfect coherence
- `G15`: the confidence vector has the right shape and value bounds

## Cryptographic gate

- `G16`: `integrity_sha3_512` matches the recomputed SHA3-512 hash over the canonicalized first four roots

## Auto-fix boundaries

The live validator can safely repair only a narrow subset of issues:

- semantic hash parity
- deprecated `refutes` alias normalization
- confidence vector shape normalization
- optional recomputation of the integrity seal after safe fixes

See also:

- [`validator.md`](validator.md)
- [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)
