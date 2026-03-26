# Maintainer Operations

This repository publishes a bounded maintainer-operations layer so outside contributors and reviewers can see how the public surface is actually maintained.

The machine-readable form lives in [`../PUBLIC_MAINTENANCE_MODEL.json`](../PUBLIC_MAINTENANCE_MODEL.json).
The bounded additive/deprecation/breaking-change posture lives in [`change-control.md`](change-control.md) and [`../PUBLIC_CHANGE_CONTROL_MODEL.json`](../PUBLIC_CHANGE_CONTROL_MODEL.json).

## What this covers

- who maintains the public surface
- which intake channels are supported
- how public-surface changes should be classified
- which verification evidence is expected before a release-facing change is considered ready
- which boundaries maintainers should protect during review

## Highest-signal operational rules

- keep the public boundary narrow and explicit
- keep `SOURCE_MANIFEST.json` and `PUBLIC_CONTRACT_CATALOG.json` synchronized with public-surface changes
- prefer small, reviewable releases over large dumps
- require verification evidence for schema, example, API, and release-surface changes
- route trust-sensitive reports through the security path instead of public issue intake

## Why this matters

External programs and contributors need more than docs. They need evidence that the repository is maintained intentionally and that changes move through explicit public-safe workflow rules.

## Important boundary

This layer documents maintainer posture for the public specs surface only. It does not claim a guaranteed SLA for issue response, nor does it expose private internal workflow details from the upstream N1Hub runtime.
