# Validator Reference

The Capsule Validator is the integrity guardrail for N1Hub and CapsuleOS.

## Responsibilities

The validator owns:

- the 5-Element Law
- the 16 validation gates
- safe auto-fix behavior
- HTTP validation routes
- CLI validation entrypoints
- audit and CI validation surfaces

## Public API surfaces

- single-capsule validation
- batch validation
- auto-fix
- gate metadata
- validation stats

## Law

Capsule-shaped data becomes trusted only through validator-owned schemas, helpers, routes, and checks. Other domains may emit candidates, but validator sovereignty decides admissibility.

## Gates at a glance

| Gate | Meaning |
| --- | --- |
| `G01` | exactly five root keys |
| `G02` | required fields present |
| `G03` | type and enum correctness |
| `G04` | provenance coverage |
| `G05` | content type discipline |
| `G06` | payload integrity |
| `G07` | summary length |
| `G08` | keyword count |
| `G09` | semantic hash format |
| `G10` | semantic hash parity |
| `G11` | canonical relation types |
| `G12` | target existence |
| `G13` | outbound link requirement |
| `G14` | coherence trap |
| `G15` | confidence vector shape |
| `G16` | integrity seal |

## OpenAPI

The published OpenAPI reference lives at [`../openapi/validate.openapi.json`](../openapi/validate.openapi.json).
