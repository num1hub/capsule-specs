# Schema Reference

This document summarizes the public capsule schema at a field level.

## Related machine-readable schemas

- [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
  Canonical public schema for the five-element capsule artifact.
- [`../schemas/neuro-concentrate.schema.json`](../schemas/neuro-concentrate.schema.json)
  Public schema for the semantic summary layer.
- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
  Public schema bundle for validator request and response envelopes.

## Root shape

Every capsule contains exactly five roots:

- `metadata`
- `core_payload`
- `neuro_concentrate`
- `recursive_layer`
- `integrity_sha3_512`

## Metadata

Required public structural fields:

- `capsule_id`
- `type`
- `subtype`
- `status`
- `version`
- `semantic_hash`

Common optional fields:

- `author`
- `created_at`
- `updated_at`
- `name`
- `source`

## Enumerations

### Types

- `foundation`
- `concept`
- `operations`
- `physical_object`
- `project`

### Subtypes

- `atomic`
- `hub`

### Status

- `draft`
- `active`
- `frozen`
- `archived`
- `legacy`
- `sovereign`
- `quarantined`

### Relation types

- `supports`
- `contradicts`
- `extends`
- `derived_from`
- `depends_on`
- `references`
- `duplicates`
- `implements`
- `part_of`

## Neuro concentrate

The neuro layer contains:

- `summary`
- `keywords`
- `confidence_vector`
- `semantic_hash`

The live validator expects:

- summary length between 70 and 160 words
- keyword count between 5 and 15
- six confidence dimensions in `[0,1]`
- semantic hash parity with `metadata.semantic_hash`

## Recursive layer

The recursive layer contains:

- `links`
- optional `epistemic_ledger`

Each link contains:

- `target_id`
- `relation_type`

## Integrity seal

`integrity_sha3_512` is the SHA3-512 digest of the canonicalized first four roots. It is the final trust boundary for the artifact.
