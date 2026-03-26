# The 5-Element Law

The 5-Element Law defines the immutable root structure of every capsule in CapsuleOS.

## The five required roots

1. `metadata`
   Identity, lifecycle state, authorship, timestamps, and semantic hash.
2. `core_payload`
   The primary human-readable or machine-readable content.
3. `neuro_concentrate`
   A compact semantic summary with keywords, confidence vector, and semantic hash parity.
4. `recursive_layer`
   Outbound links and optional epistemic tracking.
5. `integrity_sha3_512`
   The cryptographic seal over the first four roots after canonicalization.

## Why the law exists

The law makes capsules self-descriptive, computable, and verifiable. It prevents partial or ad hoc record shapes from entering trusted graph state.

## Practical effect

- every capsule has one predictable outer shape
- validators can enforce admission deterministically
- examples, schemas, and tooling all share the same geometry
- cryptographic sealing has a stable target

See also:

- [`16-gates.md`](16-gates.md)
- [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
- [`validator.md`](validator.md)
