# Portability

This repository treats portability as a governed capability, not as a casual file-copy promise.

## Public portability principles

- export and replay should preserve provenance rather than erase it
- archive replay should go through validator-aware paths instead of direct disk mutation
- tenant scope, policy posture, and checksum evidence should stay visible across export and import
- portability should fail closed when trust evidence is missing
- public docs should explain portability without encouraging trust-free archive exchange

## What this repo publishes

- a public explanation of portability and import trust
- an archive-bundle schema and sample payload
- a machine-readable portability profile for reviewers and tool builders

## What this repo does not claim

- a deployed hosted export or import service
- one-click replay across arbitrary environments
- trust-free bundle exchange without policy or validator checks
- the full private lifecycle and tenancy runtime

## Strongest public surfaces

- [`archive-bundles.md`](archive-bundles.md)
- [`../schemas/archive-bundle.schema.json`](../schemas/archive-bundle.schema.json)
- [`../examples/archive/archive-bundle.sample.json`](../examples/archive/archive-bundle.sample.json)
- [`../PUBLIC_PORTABILITY_PROFILE.json`](../PUBLIC_PORTABILITY_PROFILE.json)

## Why this matters

Portability is part of the trust story. A portable system is not only able to export data; it also needs enough evidence and replay discipline that users do not trade lock-in for silent corruption or opaque import behavior.
