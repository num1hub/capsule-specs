# Releasing

This repository is small, but releases should still be explicit and reviewable.

## Release checklist

1. Run `npm run verify:repo`.
2. If upstream validation is available, re-run validator checks on the example set.
3. Use `--ids-file examples/example-known-ids.json` when validating graph-linked examples such as `example-project-hub.capsule.json`.
4. Review [`VERSIONING.md`](VERSIONING.md) when a contract-facing change may alter release semantics.
5. Update [`CHANGELOG.md`](CHANGELOG.md).
6. Review [`PUBLIC_CONTRACT_CATALOG.json`](PUBLIC_CONTRACT_CATALOG.json) when a public surface was added, removed, or reclassified.
7. Review [`PUBLIC_RELEASE_METADATA.json`](PUBLIC_RELEASE_METADATA.json) when release evidence changed.
8. Review [`PUBLIC_RELEASE_REVIEW.md`](PUBLIC_RELEASE_REVIEW.md).
9. Review [`docs/verification.md`](docs/verification.md) if a repo-local check changed or a new check was added.
10. Review [`schemas/validator-api-envelopes.schema.json`](schemas/validator-api-envelopes.schema.json) when API example files or route envelope assumptions changed.
11. Keep [`NOTICE`](NOTICE) accurate when attribution or legal surface changed.
12. Recheck [`examples/client/`](examples/client/) and [`docs/client-recipes.md`](docs/client-recipes.md) when route or auth assumptions changed.
13. Review [`PUBLIC_MAINTENANCE_MODEL.json`](PUBLIC_MAINTENANCE_MODEL.json) when public maintainer workflow, change classes, or expected evidence changed.
14. Review [`PUBLIC_CHANGE_CONTROL_MODEL.json`](PUBLIC_CHANGE_CONTROL_MODEL.json) when additive, deprecated, or breaking public change posture changed.
15. Review [`CITATION.cff`](CITATION.cff) when the canonical public title, version, or reuse posture changed.
16. Review [`.github/release.yml`](.github/release.yml) when label taxonomy or release-note grouping changed.
17. Create a release tag and short release notes.

## Release posture

Prefer small releases that keep docs, schemas, examples, and provenance synchronized rather than occasional oversized dumps.
Prefer GitHub release notes that follow the repository label taxonomy instead of ad hoc changelog fragments.
