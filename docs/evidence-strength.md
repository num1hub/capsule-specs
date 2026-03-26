# Evidence Strength

This repository publishes many public artifacts, but they do not all carry the same authority.

The machine-readable form lives in [`../PUBLIC_EVIDENCE_STRENGTH_MAP.json`](../PUBLIC_EVIDENCE_STRENGTH_MAP.json).

## What this layer answers

- which public surfaces are strongest for each contract family
- which public surfaces are secondary teaching or explanation layers
- which public surfaces are illustrative only
- which kinds of decisions should begin from which artifacts
- which surfaces should never be treated as authoritative on their own

## Why this exists

`docs/trust-model.md` already explains the basic hierarchy, but external reviewers and integrators still have to reconstruct the concrete stronger-source map across schemas, OpenAPI, examples, summaries, release evidence, and public docs.

This layer makes that hierarchy explicit and machine-readable instead of leaving readers to infer authority from filenames, format, or maintainer habit.

## Relationship to other public surfaces

- [`../PUBLIC_OWNERSHIP_MAP.json`](../PUBLIC_OWNERSHIP_MAP.json)
  Answers: which public artifact families are maintained here and which stronger sources outrank them.
- [`../PUBLIC_TRACEABILITY_MATRIX.json`](../PUBLIC_TRACEABILITY_MATRIX.json)
  Answers: how bounded public claims connect to stronger evidence and verification commands.
- [`../PUBLIC_VERIFICATION_MATRIX.json`](../PUBLIC_VERIFICATION_MATRIX.json)
  Answers: which check families protect the public evidence surfaces.
- [`../PUBLIC_AUDIENCE_PATHS.json`](../PUBLIC_AUDIENCE_PATHS.json)
  Answers: which entry path is safest for each public audience.

## Important boundary

This is a bounded public evidence-strength summary. It does not replace the stronger schemas, OpenAPI, examples, release evidence, or live validator behavior it references.
