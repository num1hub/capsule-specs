# Community Health

This repository is intentionally narrow, but it should still behave like a maintained public project.

## Main contributor channels

- GitHub issues
  Use for bugs, contract questions, documentation gaps, and small public-surface proposals.
- Pull requests
  Use for concrete edits to docs, schemas, examples, and other public-safe projection artifacts.
- Private security reporting
  Use the path described in [`../SECURITY.md`](../SECURITY.md) for trust-sensitive reports.

## Intake templates

The repository keeps explicit intake paths so outside contributors do not need to guess how to approach maintainers:

- bug reports
- feature requests
- integration questions
- contract change proposals
- pull request template

These templates keep issues scoped to the public projection surface instead of drifting into private runtime or product-doctrine requests.

The bounded public maintainer posture for intake, review, and release work is summarized in [`../PUBLIC_MAINTENANCE_MODEL.json`](../PUBLIC_MAINTENANCE_MODEL.json).

## Maintainer expectations

Maintainers should:

- keep issue templates aligned with the actual public scope
- keep `SUPPORT.md`, `SECURITY.md`, and `CONTRIBUTING.md` coherent
- route contract-impacting changes toward explicit verification evidence
- avoid accepting public issues that require leaking private vault state or operator-only details

## Good external participation

The most helpful external contributions are:

- docs clarifications
- schema commentary improvements
- better example payloads that stay public-safe
- API example refinements that stay consistent with OpenAPI and the live validator
- issue reports that isolate a public boundary clearly

## Boundary reminder

Healthy community intake depends on a clear boundary. This repository does not accept support requests for unpublished cloud behavior, private operator tooling, or internal vault stewardship logic.
