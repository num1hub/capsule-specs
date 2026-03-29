# Change Control

This repository publishes a bounded change-control layer so contributors, integrators, and reviewers can see how public-surface changes should be classified and synchronized.

The machine-readable form lives in [`../PUBLIC_CHANGE_CONTROL_MODEL.json`](../PUBLIC_CHANGE_CONTROL_MODEL.json).
The bounded co-movement map for reviewer, release, contract, and teaching surfaces lives in [`update-coherence.md`](update-coherence.md) and [`../PUBLIC_UPDATE_COHERENCE_MAP.json`](../PUBLIC_UPDATE_COHERENCE_MAP.json).

## What this covers

- which kinds of public changes are treated as editorial, additive, deprecated, or breaking
- which docs, schemas, examples, and release surfaces must move together
- how deprecation should be made visible before removal when feasible
- which verification evidence is expected before a release-facing change is considered ready

## Highest-signal rules

- keep breaking public changes explicit and reviewer-visible
- update docs, schemas, examples, catalog, and release evidence together when contract meaning changes
- mark deprecations in human-readable and machine-readable surfaces before removing public artifacts when feasible
- avoid casual drift in examples, route semantics, and schema-backed envelopes
- treat `dream` as a public exploration branch, not as an exemption from review, coherence, or verification rules
- keep `VERSIONING.md`, `docs/compatibility.md`, and release evidence aligned with the real public posture

## Important boundary

This layer documents change-control expectations for the public specs surface only. It does not promise indefinite backward compatibility, a hosted migration service, or access to private internal upgrade tooling from the upstream N1Hub runtime.
