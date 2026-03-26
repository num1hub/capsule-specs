# Limitations Register

This repository publishes a bounded limitations register so reviewers, contributors, and integrators can see which important surfaces are intentionally deferred, which guarantees are not being made, and where the public specs surface deliberately stops.

The machine-readable form lives in [`../PUBLIC_LIMITATIONS_REGISTER.json`](../PUBLIC_LIMITATIONS_REGISTER.json).

## What this covers

- which important upstream domains remain intentionally outside this public repo
- which public summaries are bounded and must not be mistaken for stronger runtime guarantees
- which integrator or reviewer expectations are explicitly not promised here
- which verification commands protect the limitations layer from drifting into vague or stale caveats

## Highest-signal rules

- publish limitations as concrete, reviewable statements instead of hiding them in scattered prose
- keep limitations aligned with the boundary map, assurance case, release review, and reviewer path
- prefer explicit deferred scope over accidental under-documentation
- do not let reviewer-facing summaries imply runtime guarantees that the public surface does not actually publish

## Important boundary

This limitations register is a public-facing summary for the specs repository only. It does not describe every private upstream limitation or every future roadmap possibility in the wider N1Hub runtime.
