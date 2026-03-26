# Releasing

This repository is small, but releases should still be explicit and reviewable.

## Release checklist

1. Run `npm run verify:repo`.
2. If upstream validation is available, re-run validator checks on the example set.
3. Use `--ids-file examples/example-known-ids.json` when validating graph-linked examples such as `example-project-hub.capsule.json`.
4. Update [`CHANGELOG.md`](CHANGELOG.md).
5. Review [`PUBLIC_RELEASE_REVIEW.md`](PUBLIC_RELEASE_REVIEW.md).
6. Create a release tag and short release notes.

## Release posture

Prefer small releases that keep docs, schemas, examples, and provenance synchronized rather than occasional oversized dumps.
