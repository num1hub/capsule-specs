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

These are useful for learning, testing, and reviews, but they should not be mistaken for deployed service telemetry.

## Practical rule

If you are:

- building a client
  Start with OpenAPI, schemas, and the request examples.
- validating semantics
  Prefer the live validator.
- reviewing repository maturity
  Use the contract catalog, release metadata, and release review together.
