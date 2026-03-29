# Generator Readiness

The upstream vault treats `capsule.contract.generator-projection-index.v1` as the authoritative dispatch table for generation. This public repo does not publish the full generator corpus, but it does expose the public doctrine needed to understand how projection works.

## Upstream consumption model

1. load the projection-index capsule
2. enumerate contracts from the declared corpus
3. dispatch by `generator_hint`
4. refine placement with `group`, `surface`, `sdk`, and `aggregate` tags
5. emit only artifacts that the projection index recognizes
6. fail fast when hints, coverage, or release evidence are inconsistent

## Important tag families

- `generator_hint:*`
  selects the primary emitter role
- `group:*`
  clusters related contracts for package or route-family placement
- `surface:*`
  distinguishes public APIs, extension APIs, internal boundaries, and storage schemas
- `sdk:*`
  marks which generated SDK or compiler profile should include an artifact
- `aggregate:*`
  makes child contracts discoverable from family indexes

## What this public repo exposes

- projection doctrine in [`projection-doctrine.md`](projection-doctrine.md)
- boundary posture in [`domain-boundaries.md`](domain-boundaries.md) and [`../PUBLIC_BOUNDARY_MAP.json`](../PUBLIC_BOUNDARY_MAP.json)
- current public artifact discovery in [`../PUBLIC_CONTRACT_CATALOG.json`](../PUBLIC_CONTRACT_CATALOG.json)
- schema, OpenAPI, examples, client recipes, and release evidence that external consumers can review today
- a concrete public OpenAPI code-generation path in [`openapi-codegen-recipes.md`](openapi-codegen-recipes.md) for tool-builders who want generated TypeScript declarations from the strongest published HTTP contract across repo-local plus CommonJS, ESM, and TypeScript package-consumer styles

## What this public repo does not expose

- the full upstream generator corpus
- private emitter internals
- unpublished runtime packages
- hosted or operator-only generation workflows

## Why this matters

Generator readiness is part of the public trust posture. Outside reviewers should be able to see that projection is governed by explicit rules, not by ad hoc file copying or undocumented compiler behavior.
