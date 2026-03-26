# Trust Model

This repository publishes several kinds of artifacts, but they do not all carry the same authority.

## Strongest sources of truth

- the live validator behavior in the upstream N1Hub repository
- the published OpenAPI document
- the published JSON schemas

When there is ambiguity, these surfaces outrank prose summaries or illustrative examples.

## Secondary reference surfaces

- human-readable law docs
- route reference docs
- integration and compatibility guides
- client recipes

These should stay aligned to the stronger contract surfaces, but they are still explanatory layers.

## Illustrative surfaces

- API response samples
- negative-path examples
- release metadata summaries
- portability-profile summaries

These are useful for learning, testing, and reviews, but they should not be mistaken for deployed service telemetry.

The bounded machine-readable summary of these ownership and authority splits lives in [`../PUBLIC_OWNERSHIP_MAP.json`](../PUBLIC_OWNERSHIP_MAP.json).

The bounded machine-readable summary of the stronger-source hierarchy itself lives in [`../PUBLIC_EVIDENCE_STRENGTH_MAP.json`](../PUBLIC_EVIDENCE_STRENGTH_MAP.json).

## Practical rule

If you are:

- building a client
  Start with OpenAPI, schemas, and the request examples.
- validating semantics
  Prefer the live validator.
- reviewing repository maturity
  Use the contract catalog, release metadata, and release review together.
- evaluating portability posture
  Use the archive-bundle schema, archive sample, portability docs, and `PUBLIC_PORTABILITY_PROFILE.json` together.
