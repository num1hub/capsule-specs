# Projection Doctrine

This repository follows a simple rule: upstream capsule law and validator artifacts are stronger sources of truth, while the files in this repository are public projections curated for OSS use.

## Stronger sources

- public-safe architecture and governance capsules in `n1hub-repo-vault`
- live CapsuleOS law capsules in `n1hub.com`
- live validator docs and OpenAPI surfaces in `n1hub.com`

## What gets projected here

- human-readable law docs
- machine-readable schemas and OpenAPI
- public-safe examples and client recipes
- provenance, release evidence, and reviewer-facing summaries

## What stays out

- private operator state and working memory
- unpublished runtime packages and internal orchestration
- managed-cloud internals and hosted controls
- prompts, secrets, and private runtime tooling

## Projection rules

- publish the minimum high-signal boundary that outside readers can review and use
- keep provenance explicit in [`../SOURCE_MANIFEST.json`](../SOURCE_MANIFEST.json)
- keep discovery explicit in [`../PUBLIC_CONTRACT_CATALOG.json`](../PUBLIC_CONTRACT_CATALOG.json)
- keep published and deferred boundary choices explicit in [`../PUBLIC_BOUNDARY_MAP.json`](../PUBLIC_BOUNDARY_MAP.json)
- keep machine-readable summaries subordinate to stronger docs, schemas, OpenAPI, and raw capsule sources
- keep ownership and stronger-source hierarchy explicit in [`../PUBLIC_OWNERSHIP_MAP.json`](../PUBLIC_OWNERSHIP_MAP.json)
- verify the projected surface with `npm run verify:repo`

## Why this matters

The repository should read as a deliberate public reference surface, not as a bulk export of private repo state. Projection doctrine keeps the published files small, reviewable, and honest about what is and is not included.
