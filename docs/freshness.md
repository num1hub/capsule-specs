# Freshness

This repository publishes a bounded freshness layer so outside readers can see which public surfaces become stale under which triggers, which artifacts should refresh together, and how maintainers make summary drift visible instead of implicit.

The machine-readable form lives in [`../PUBLIC_FRESHNESS_MODEL.json`](../PUBLIC_FRESHNESS_MODEL.json).

## What this adds

- explicit freshness triggers for reviewer, release, governance, example, and adoption surfaces
- explicit stale signals instead of relying on maintainers to notice drift by intuition
- a bounded link between release evidence, maintenance history, and machine-readable summary layers
- one place to see which surfaces need refresh when repo shape, contracts, or audience posture change

## Strongest related surfaces

- [`release-evidence.md`](release-evidence.md) and [`../PUBLIC_RELEASE_METADATA.json`](../PUBLIC_RELEASE_METADATA.json)
  These show the current verified release state.
- [`evidence-timeline.md`](evidence-timeline.md) and [`../PUBLIC_EVIDENCE_TIMELINE.json`](../PUBLIC_EVIDENCE_TIMELINE.json)
  These show how hardening and maintenance moved over time.
- [`update-coherence.md`](update-coherence.md) and [`../PUBLIC_UPDATE_COHERENCE_MAP.json`](../PUBLIC_UPDATE_COHERENCE_MAP.json)
  These show which surfaces should move together.
- [`evidence-strength.md`](evidence-strength.md) and [`../PUBLIC_EVIDENCE_STRENGTH_MAP.json`](../PUBLIC_EVIDENCE_STRENGTH_MAP.json)
  These show which public surfaces remain strongest when a summary becomes stale.
- [`adoption-readiness.md`](adoption-readiness.md) and [`../PUBLIC_ADOPTION_READINESS.json`](../PUBLIC_ADOPTION_READINESS.json)
  These show which audience paths are ready now and which expectations remain deferred.

## Why this matters

Active maintenance is not only about having commits or checks. Reviewers also need to know whether a public summary can go stale, what should refresh it, and where the stronger source still lives when that summary lags.

This layer makes that bounded freshness posture explicit instead of leaving it spread across release metadata, changelog, reviewer guides, and maintainer memory.

## Important boundary

This layer applies only to the public specs repository. It does not claim that every public surface changes on a fixed cadence, and it does not expose private upstream workflow or internal runtime rollout timing.
