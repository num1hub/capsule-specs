# Integration Guide

This guide shows the safest path for building against the public N1Hub specification surface.

## 1. Start with the contract, not with guesses

- read [`schema-reference.md`](schema-reference.md)
- inspect [`../schemas/capsule-schema.json`](../schemas/capsule-schema.json)
- inspect [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
- inspect [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json)

The schemas and OpenAPI artifacts should shape your parser, validator client, and payload expectations.

## 2. Learn the minimal capsule shape

Start with:

- [`../examples/example-note.capsule.json`](../examples/example-note.capsule.json)
- [`../examples/example-task.capsule.json`](../examples/example-task.capsule.json)

These are the smallest public-safe examples that still satisfy the five-element model.

## 3. Learn the failure path early

Read:

- [`../examples/example-validator-invalid-g16.capsule.json`](../examples/example-validator-invalid-g16.capsule.json)
- [`16-gates.md`](16-gates.md)

This helps you distinguish structural validity from trust and sealing.

## 4. Learn graph-aware validation

If you need linked examples, use:

- [`../examples/example-project-hub.capsule.json`](../examples/example-project-hub.capsule.json)
- [`../examples/example-known-ids.json`](../examples/example-known-ids.json)

The linked example passes only when known-ID resolution is active.

## 5. Learn the HTTP envelopes

Read:

- [`api-envelopes.md`](api-envelopes.md)
- [`../schemas/validator-api-envelopes.schema.json`](../schemas/validator-api-envelopes.schema.json)
- [`../examples/api/`](../examples/api/)
- [`client-recipes.md`](client-recipes.md)

These show how the public examples appear at the validator HTTP boundary for `validate`, `batch`, and `fix` flows.

## 6. Respect the stronger source of truth

This repository is a public projection surface. When edge-case semantics matter:

- prefer the live validator over prose-only inference
- prefer the schema and OpenAPI artifacts over informal assumptions
- check [`compatibility.md`](compatibility.md), [`trust-model.md`](trust-model.md), and [`../VERSIONING.md`](../VERSIONING.md) before depending on a detail
