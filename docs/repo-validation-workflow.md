# Repo-Only Validation Workflow

This guide explains how to validate a contribution that stays inside the published `capsule-specs` surface.

Use this workflow when you are editing docs, schemas, examples, projections, intake files, or machine-readable summaries that already belong to this repository. Do not use it to justify changing upstream validator law or unpublished runtime behavior by guesswork.

## When this workflow applies

This is the right workflow for:

- docs and index changes
- schema commentary and schema-family docs
- example and API-payload refinements
- schema-invalid capsule, client-recipe navigator, or validator-envelope fixture refinements
- public-safe TypeScript or Zod projection updates
- package-export, build, or pack-surface updates for the published projection layer
- community-health and GitHub-surface maintenance
- release metadata, manifest, and contract-catalog updates

Open an issue first instead of relying only on this workflow when the change would:

- alter capsule law or validator semantics
- widen published repository scope
- depend on private runtime internals
- introduce a new public contract family that does not already belong here

## Step 1: Classify the change

Pick the narrowest change class before running commands.

### Docs, orientation, and discovery

Examples:

- `README.md`
- `docs/public-contract-index.md`
- `docs/schema-reference.md`
- `docs/schema-family-reference.md`

Start with:

```bash
npm run check:docs
npm run check:catalog
npm run check:surface
```

### Schemas, OpenAPI, and projections

Examples:

- `schemas/*.json`
- `openapi/validate.openapi.json`
- `projections/`
- `tsconfig.build.json`
- `package.json`
- `docs/api-envelopes.md`
- `docs/npm-consumption.md`

Start with:

```bash
npm run check:api-schemas
npm run check:type-projections
npm run check:openapi-coherence
npm run check:package-surface
npm run check:package-install
npm run check:catalog
npm run check:surface
```

### Examples and negative paths

Examples:

- `examples/*.capsule.json`
- `examples/api/*.json`
- `examples/api-invalid/*.json`
- `docs/examples.md`
- `docs/route-reference.md`
- `docs/invalid-api-envelope-examples.md`
- `docs/integrity-recipes.md`

Start with:

```bash
npm run check:examples
npm run check:api-examples
npm run check:invalid-examples
npm run check:invalid-api-examples
npm run check:integrity-recipes
npm run check:example-coverage
```

### Contributor, GitHub, and intake surfaces

Examples:

- `CONTRIBUTING.md`
- `docs/community-health.md`
- `.github/ISSUE_TEMPLATE/*`
- `.github/labels.json`
- `.github/milestones.json`

Start with:

```bash
npm run check:community-health
npm run check:github-operations
npm run check:maintenance-model
```

### Release, provenance, and machine-readable summaries

Examples:

- `SOURCE_MANIFEST.json`
- `PUBLIC_CONTRACT_CATALOG.json`
- `PUBLIC_RELEASE_METADATA.json`
- `PUBLIC_RELEASE_REVIEW.md`

Start with:

```bash
npm run audit:public-surface
npm run check:catalog
npm run check:release
```

## Step 2: Keep co-moving files aligned

When a repo-only change lands, update the surfaces that summarize it instead of leaving drift behind.

Common co-movement rules:

- new public file:
  add it to `SOURCE_MANIFEST.json` and `PUBLIC_CONTRACT_CATALOG.json`
- changed release-facing doc or contract:
  review `PUBLIC_RELEASE_METADATA.json` and `PUBLIC_RELEASE_REVIEW.md`
- changed contributor workflow or public intake posture:
  review `CONTRIBUTING.md`, `docs/community-health.md`, `docs/verification.md`, and `PUBLIC_MAINTENANCE_MODEL.json`
- changed discovery path:
  review `README.md`, `ONBOARDING.md`, `docs/public-contract-index.md`, and any audience-path or capability summaries that point to the changed surface
- changed package-export or pack-consumer path:
  review `docs/type-projections.md`, `docs/npm-consumption.md`, `examples/client/README.md`, `PUBLIC_CAPABILITY_MATRIX.json`, and `PUBLIC_TRACEABILITY_MATRIX.json`
  and re-run `npm run check:package-install` after `npm run check:package-surface`
- changed OpenAPI, compact validator routes, or compact validator envelope-family metadata:
  review `docs/openapi.md`, `docs/reference-pack.md`, `docs/api-envelopes.md`, `references/validator-routes.json`, `references/validator-envelope-families.json`, and re-run `npm run check:openapi-coherence` plus `npm run check:reference-pack`
- changed sealing, `integrity_sha3_512`, or validator response `computedHash` examples:
  review `docs/integrity-recipes.md`, `docs/reference-pack.md`, `examples/client/`, `examples/api/`, and re-run `npm run check:integrity-recipes`
- changed schema-invalid fixture layers for capsules, the client-recipe navigator, or validator envelopes:
  review `docs/schema-validation-recipes.md`, `docs/invalid-capsule-examples.md`, `docs/invalid-client-recipe-index-examples.md`, `docs/invalid-api-envelope-examples.md`, `examples/invalid/`, `examples/client-invalid/`, `examples/api-invalid/`, and re-run `npm run check:invalid-examples`, `npm run check:invalid-client-recipe-index-examples`, `npm run check:invalid-api-examples`, and `npm run check:schema-recipes`

## Step 3: Re-run the narrow checks

Do not jump directly to the full stack while the local edit loop is still narrow. Re-run the relevant command packet until the touched area is stable.

If a narrow check fails and the failure points at a stronger surface, fix the stronger surface rather than patching the summary layer around it.

## Step 4: Run the full repository pass

Before opening or updating a PR, always run:

```bash
npm run verify:repo
```

This is the repo-owned safety gate for the published public surface.

## Step 5: Run upstream validator checks when required

Repo-only validation is necessary, but sometimes it is not enough.

Also use the live validator from the upstream N1Hub repo when:

- a capsule example changed
- a validator-envelope example changed in a way that reflects capsule validity assumptions
- graph-linked examples changed
- a negative-path example changed

The most important examples are:

- `examples/example-project-hub.capsule.json`
- `examples/example-validator-invalid-g16.capsule.json`
- any new public capsule fixture

## Step 6: Write PR evidence like a maintainer

In your PR description or handoff note, record:

- the change class
- the commands you ran
- whether each command passed
- whether upstream validator checks were needed
- any residual risk or bounded non-goal

This repository is intentionally projection-oriented. Review quality depends on explicit evidence, not on “looks good” summaries.

## Minimal contributor checklist

- boundary stayed inside the published public surface
- changed docs, schemas, examples, and summaries moved together
- targeted checks passed
- `npm run verify:repo` passed
- upstream validator checks ran when example semantics changed
- release/provenance surfaces were refreshed when required

## What not to do

- do not treat `npm run verify:repo` as permission to invent upstream law
- do not edit summary JSON files without also checking the stronger source docs they point at
- do not change examples without checking coverage, failure-path, and route alignment
- do not change example seals or `computedHash` fields without re-running the dedicated integrity recipe checks
- do not widen scope by slipping private-runtime assumptions into public docs
