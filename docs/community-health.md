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

## Label and milestone discipline

The GitHub issue surface uses a small bounded taxonomy rather than free-form labels:

- `contract` for deliberate public contract changes
- `area:*` labels for boundary families such as schemas, validator, docs, examples, governance, and GitHub-facing repo operations
- `kind:*` labels for integration-facing or release-facing work

Active roadmap work is currently grouped into the `v0.2.0 Better Integrator Surfaces` and `v0.3.0 Projection-Friendly References` milestones so contributors can see which public wave is open now.
The repository also keeps GitHub-native hygiene explicit through `CITATION.cff`, `.github/dependabot.yml`, and `.github/release.yml` rather than leaving reuse, update posture, and release-note grouping implicit.

The bounded public maintainer posture for intake, review, and release work is summarized in [`../PUBLIC_MAINTENANCE_MODEL.json`](../PUBLIC_MAINTENANCE_MODEL.json).
The bounded contributor and maintainer adoption posture is summarized in [`../PUBLIC_ADOPTION_READINESS.json`](../PUBLIC_ADOPTION_READINESS.json).
The bounded freshness posture for contributor-facing and maintainer-facing summary layers is summarized in [`../PUBLIC_FRESHNESS_MODEL.json`](../PUBLIC_FRESHNESS_MODEL.json).
The bounded public change, deprecation, and breaking-change posture is summarized in [`../PUBLIC_CHANGE_CONTROL_MODEL.json`](../PUBLIC_CHANGE_CONTROL_MODEL.json).

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
It also does not use GitHub Discussions or the repository wiki as maintained support surfaces.
