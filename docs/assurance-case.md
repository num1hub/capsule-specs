# Assurance Case

This repository publishes a bounded assurance case so reviewers, programs, and contributors can see which public claims are being made, which stronger surfaces support those claims, and which limits keep the public projection honest.

The machine-readable form lives in [`../PUBLIC_ASSURANCE_CASE.json`](../PUBLIC_ASSURANCE_CASE.json).

## What this covers

- the strongest public claims this repository is willing to make
- the strongest docs, schemas, examples, and release artifacts that support those claims
- the explicit limits and bounded-by surfaces that keep those claims from drifting into marketing language
- the verification commands that protect the assurance layer from silent drift

## Highest-signal rules

- make only bounded claims that can be tied to concrete public evidence
- keep reviewer-facing assurance subordinate to stronger contract, provenance, and release-evidence surfaces
- publish explicit limits instead of relying on optimistic interpretation
- update the assurance case whenever the public review path, failure posture, or release discipline changes materially

## Important boundary

This assurance case is a reviewer-facing summary for the public specs surface only. It does not claim to model the full private N1Hub runtime, all upstream implementation behavior, or every internal operational guarantee.
