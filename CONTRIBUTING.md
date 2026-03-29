# Contributing to N1Hub Capsule Specs

N1Hub accepts contributions through two coordinated tracks.

## Track 1: Documentation and repository pull requests

Use a normal GitHub pull request when you are changing public documentation, schemas, examples, issue templates, or other projection artifacts that stay inside the existing public boundary.

## Track 2: Source-of-truth capsule or contract changes

When a change affects architectural truth, validation law, or the underlying capsule model, open an issue first and describe the affected boundary and source material. This repository is intentionally projection-oriented, so changes to public files should remain aligned with the upstream source surfaces.

Use the repository issue templates where possible. They keep bug reports, integration questions, and contract-change proposals scoped to the public surface.
Active public work is grouped under the `v0.2.0 Better Integrator Surfaces` and `v0.3.0 Projection-Friendly References` milestones, with labels such as `area:*`, `kind:*`, and `contract` used to keep issue scope reviewable.
The repo-owned GitHub operating surface is documented in `.github/labels.json`, `.github/milestones.json`, and `docs/github-operations.md`.
The contributor-facing repo-only verification flow is documented in [`docs/repo-validation-workflow.md`](docs/repo-validation-workflow.md).
The package-consumer path for the public projection layer is documented in [`docs/npm-consumption.md`](docs/npm-consumption.md).

For the public maintainer workflow model, review [`PUBLIC_MAINTENANCE_MODEL.json`](PUBLIC_MAINTENANCE_MODEL.json) and [`docs/maintainer-operations.md`](docs/maintainer-operations.md).
For the public change-control model, review [`PUBLIC_CHANGE_CONTROL_MODEL.json`](PUBLIC_CHANGE_CONTROL_MODEL.json) and [`docs/change-control.md`](docs/change-control.md).
For the bounded contributor/reviewer/integrator entry paths, review [`PUBLIC_AUDIENCE_PATHS.json`](PUBLIC_AUDIENCE_PATHS.json) and [`docs/audience-paths.md`](docs/audience-paths.md).

## Projection note

Some reviewer and governance summary surfaces may be maintained through maintainer-side capsule projection workflows, especially on the public `dream` branch.

If you propose changes to files such as `PUBLIC_DECISION_LOG.json`, `PUBLIC_EVIDENCE_GAPS_REGISTER.json`, `PUBLIC_LIMITATIONS_REGISTER.json`, `PUBLIC_CAPABILITY_MATRIX.json`, `PUBLIC_ECOSYSTEM_VALUE_MAP.json`, `PUBLIC_PROGRAM_FIT_MAP.json`, `PUBLIC_REVIEW_SCORECARD.json`, or `PUBLIC_AUDIENCE_PATHS.json`, describe the intended semantic change and keep any downstream projected output aligned with the stronger public docs, schemas, examples, and verification surfaces.

## Required discipline

- explain the boundary you are changing
- link the pull request to an issue when the change is larger than a trivial typo or wording fix
- keep contract edits separate from broad rewrites
- include verification evidence for changed schemas or examples
- use the narrow command packet from [`docs/repo-validation-workflow.md`](docs/repo-validation-workflow.md) before the final `npm run verify:repo`
- run `npm run check:package-surface` when your change touches `package.json`, `tsconfig.build.json`, `projections/`, or the package-based client recipes
- update linked docs and examples when a public contract changes
- do not submit private vault material, secrets, or internal operator docs

## Good first contributions

- clarify wording in docs
- improve examples without widening the schema
- fix typos, formatting, and broken links
- propose narrower validator-facing examples
