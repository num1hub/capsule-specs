# Onboarding

Welcome to the public N1Hub specification surface.

## Step 1: Learn the shape

- Read [`README.md`](README.md) for the repository map.
- Read [`QUICKSTART.md`](QUICKSTART.md) if you need the shortest entry path.
- Read [`docs/repository-scope.md`](docs/repository-scope.md) to understand what is intentionally excluded.

## Step 2: Understand the rules

- Read [`CONTRIBUTING.md`](CONTRIBUTING.md), [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md), and [`SECURITY.md`](SECURITY.md).
- Read [`GOVERNANCE.md`](GOVERNANCE.md) to understand source-of-truth and review expectations.

## Step 3: Understand the public technical surface

- Read [`docs/schema-reference.md`](docs/schema-reference.md).
- Read [`docs/validator.md`](docs/validator.md) and [`docs/openapi.md`](docs/openapi.md).
- Read [`docs/api-envelopes.md`](docs/api-envelopes.md) and [`docs/compatibility.md`](docs/compatibility.md).
- Read [`docs/source-materials.md`](docs/source-materials.md) so projection provenance stays explicit.
- Compare the raw capsules in [`capsules/`](capsules/) with the machine-readable schemas in [`schemas/`](schemas/).
- Inspect [`docs/examples.md`](docs/examples.md) and [`examples/example-known-ids.json`](examples/example-known-ids.json) before changing graph-linked examples.

## Step 4: Understand maintainership and roadmap

- Read [`MAINTAINERS.md`](MAINTAINERS.md).
- Read [`ROADMAP.md`](ROADMAP.md).
- Read [`CHANGELOG.md`](CHANGELOG.md).

## Step 5: Make the right kind of change

- Use small pull requests for docs, examples, schema corrections, and public-surface improvements.
- Open an issue first when a change would alter the capsule law, validator semantics, or public repository scope.
- Run `npm run verify:repo` and refresh [`PUBLIC_RELEASE_REVIEW.md`](PUBLIC_RELEASE_REVIEW.md) before proposing a release-facing change.
