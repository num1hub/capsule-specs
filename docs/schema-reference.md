# Schema Reference

This document is the field-level guide to the public capsule and validator-envelope schemas.

If you first need to decide which schema file to open, start with [`schema-family-reference.md`](schema-family-reference.md). If you need source-level consumer artifacts, continue with [`type-projections.md`](type-projections.md).

## Related machine-readable schemas

- [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
  Canonical public schema for the five-element capsule artifact.
- [`../schemas/neuro-concentrate.schema.json`](../schemas/neuro-concentrate.schema.json)
  Public schema for the semantic summary layer nested under `neuro_concentrate`.
- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
  Public schema bundle for validator request and response envelopes.
- [`../schemas/archive-bundle.schema.json`](../schemas/archive-bundle.schema.json)
  Public portability/export contract for archive bundles.
- [`type-projections.md`](type-projections.md)
  Public-safe TypeScript and Zod projections for consumers who need source-level artifacts alongside JSON Schema.

## Reading order

1. Read [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json) for the outer artifact contract.
2. Read [`../schemas/neuro-concentrate.schema.json`](../schemas/neuro-concentrate.schema.json) for the nested semantic layer.
3. Read [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json) for HTTP request and response shapes.
4. Use [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json) when route and transport-level semantics matter.

## Root capsule shape

Every public capsule contains exactly five top-level roots, and the top-level object is `additionalProperties: false`:

- `metadata`
- `core_payload`
- `neuro_concentrate`
- `recursive_layer`
- `integrity_sha3_512`

This means outside consumers should not expect sixth top-level roots to be preserved by the public contract.

## `metadata`

`metadata` is required and keeps identity, lifecycle, timestamps, and semantic hash material. It allows extra properties, so the public schema is intentionally strict about the common structural contract but not closed against every future metadata extension.

Required fields:

- `capsule_id`
  Non-empty string identity for the artifact.
- `type`
  Enum: `foundation`, `concept`, `operations`, `physical_object`, `project`.
- `subtype`
  Enum: `atomic`, `hub`.
- `status`
  Enum: `draft`, `active`, `frozen`, `archived`, `legacy`, `sovereign`, `quarantined`.
- `version`
  Semantic-version-like string matching `X.Y.Z`.
- `semantic_hash`
  Dash-separated lowercase token sequence matching the semantic identity used by the public neuro layer.

Common optional fields:

- `author`
  Human-readable author string when the public artifact needs authorship context.
- `created_at`
  Timestamp string. The public schema does not force a timestamp format, so consumers should not assume ISO parsing unless their own contract requires it.
- `updated_at`
  Timestamp string for later edits.
- `name`
  Human-readable label for browsing or review.
- `source`
  Nested provenance pointer object.

### `metadata.source`

`source` is optional, but when present it is `additionalProperties: false` and only permits:

- `uri`
  Upstream location or source pointer.
- `sha256`
  Upstream file hash when available.
- `type`
  Short source-type label.

This is one of the few nested public objects that is intentionally closed, so consumers should not depend on arbitrary extra keys under `source`.

## `core_payload`

`core_payload` is required and is intentionally open for domain-specific content. It allows extra properties.

Required fields:

- `content_type`
  String. Preferred public values are `markdown`, `json`, or `text`, but validator-compatible runtimes may allow more.
- `content`
  String payload body.

Optional common field:

- `truncation_note`
  String note explaining a public-safe truncation or projection cut.

The important contract boundary here is that the public schema fixes a small structural wrapper while leaving most payload semantics to the owning capsule type and validator behavior.

## `neuro_concentrate`

`neuro_concentrate` is required and delegates to [`../schemas/neuro-concentrate.schema.json`](../schemas/neuro-concentrate.schema.json). The nested object allows extra properties, but it requires four public fields:

- `summary`
  String. Validator policy expects roughly 70 to 160 words even though the JSON Schema itself does not count words.
- `keywords`
  Array of 5 to 15 non-empty strings.
- `confidence_vector`
  Closed object with exactly six dimensions:
  - `extraction`
  - `synthesis`
  - `linking`
  - `provenance_coverage`
  - `validation_score`
  - `contradiction_pressure`
- `semantic_hash`
  String matching the same dash-separated semantic-hash pattern used in `metadata.semantic_hash`.

The public expectation is semantic-hash parity between `metadata.semantic_hash` and `neuro_concentrate.semantic_hash`, even though that parity is validator behavior rather than a plain JSON Schema cross-field constraint.

## `recursive_layer`

`recursive_layer` is required and intentionally open for future nested graph context. It allows extra properties, but it requires:

- `links`
  Array of link objects.

Optional common field:

- `epistemic_ledger`
  Array with unconstrained item shape in the public contract.

### `recursive_layer.links[*]`

Each link object allows extra properties, but it requires:

- `target_id`
  Non-empty string identifier for the linked capsule.
- `relation_type`
  Enum: `supports`, `contradicts`, `extends`, `derived_from`, `depends_on`, `references`, `duplicates`, `implements`, `part_of`.

Use [`relation-types.md`](relation-types.md) when you need human-readable meaning for relation semantics. Use the schema when you need enum enforcement.

## `integrity_sha3_512`

`integrity_sha3_512` is required and must match a 128-character lowercase hex string.

The public contract treats this as the digest of the canonicalized first four roots. In other words, integrity is not a decorative checksum field. It is the final sealing boundary for the published artifact.

## Validator API envelope fields

The validator HTTP contract is published separately under [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json). The main public envelope families are:

- request families:
  - `validateSingleRequest`
  - `validateBatchRequest`
  - `validateFixRequest`
- response families:
  - `validatePassResponse`
  - `validateFailResponse`
  - `validateBatchResponse`
  - `validateFixResponse`
  - `gatesResponse`
  - `statsResponse`
  - `simpleErrorResponse`

Shared nested definitions include:

- `validationOptions`
  Public request flags such as `skipG16`, `allowRefutes`, and `existingIds`.
- `validatorIssue`
  Issue object with `gate`, `path`, and `message`.
- `warningItem`
  Currently open object shape for bounded warning payloads.
- `gateDescriptor`
  Public gate metadata with `id`, `name`, `description`, `severity`, and `autoFixable`.

Use [`api-envelopes.md`](api-envelopes.md) when you want the prose view of those envelopes. Use [`route-reference.md`](route-reference.md) and [`../examples/api/`](../examples/api/) when you want real request and response examples.

## Important contract boundaries

- `capsule-schema.json` is strongest for outer artifact shape, but the live validator remains stronger for edge-case semantics.
- `neuro-concentrate.schema.json` is strongest for the nested summary structure, but validator policy still adds word-count and parity expectations not fully expressible in plain JSON Schema.
- `validator-api-envelopes.schema.json` is strongest for public request and response object shape, but OpenAPI and live validator behavior remain stronger for route-level semantics and runtime-only details.
- `type-projections.md` and `projections/` are convenience layers. They do not outrank the schema files.
