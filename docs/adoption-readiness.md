# Adoption Readiness

This repository publishes a bounded adoption-readiness layer so outside readers can see what the public specs surface is ready for today, which prerequisites apply, and which use cases remain intentionally deferred.

The machine-readable form lives in [`../PUBLIC_ADOPTION_READINESS.json`](../PUBLIC_ADOPTION_READINESS.json).

## What this adds

- explicit `ready`, `partial`, and `deferred` posture for the main public audience profiles
- concrete prerequisites for each adoption path instead of vague "start here" prose
- bounded non-goals so public readers do not mistake the specs repo for a hosted runtime or full upstream product export
- a synchronized view across audience paths, capabilities, limitations, release evidence, and stronger-source hierarchy

## Strongest related surfaces

- [`audience-paths.md`](audience-paths.md) and [`../PUBLIC_AUDIENCE_PATHS.json`](../PUBLIC_AUDIENCE_PATHS.json)
  These show who should read what first.
- [`capability-matrix.md`](capability-matrix.md) and [`../PUBLIC_CAPABILITY_MATRIX.json`](../PUBLIC_CAPABILITY_MATRIX.json)
  These show what an outside reader can practically do.
- [`limitations-register.md`](limitations-register.md) and [`../PUBLIC_LIMITATIONS_REGISTER.json`](../PUBLIC_LIMITATIONS_REGISTER.json)
  These show what is intentionally not being promised.
- [`evidence-strength.md`](evidence-strength.md) and [`../PUBLIC_EVIDENCE_STRENGTH_MAP.json`](../PUBLIC_EVIDENCE_STRENGTH_MAP.json)
  These show which public surfaces remain strongest when adoption claims and shortcuts disagree.
- [`freshness.md`](freshness.md) and [`../PUBLIC_FRESHNESS_MODEL.json`](../PUBLIC_FRESHNESS_MODEL.json)
  These show when readiness summaries go stale and which release-facing evidence should refresh them.
- [`release-evidence.md`](release-evidence.md) and [`../PUBLIC_RELEASE_METADATA.json`](../PUBLIC_RELEASE_METADATA.json)
  These show whether the public readiness posture is still aligned with the current verified release state.

## Why this matters

Audience paths answer "where should I start?" and the capability matrix answers "what can I do here?". Adoption readiness answers a different question: "what is this public surface actually ready for right now, under which prerequisites, and where are the hard boundaries?".

That distinction matters for serious OSS review. A public repository can be easy to browse while still being unclear about whether it is ready for external review, integration, contribution, or operational adoption. This layer makes that bounded readiness posture explicit.

## Important boundary

This layer applies only to the public specs repository. It does not claim a public hosted validator, a full product runtime, or publication of private N1Hub operating surfaces.
