# Artifact Ownership

This repository publishes a bounded ownership and authority layer so outside contributors and reviewers can see which public artifact families are maintained here and which upstream surfaces remain stronger sources of truth.

The machine-readable form lives in [`../PUBLIC_OWNERSHIP_MAP.json`](../PUBLIC_OWNERSHIP_MAP.json).

## What this covers

- which public artifact families are actually maintained in this repository
- which stronger upstream surfaces outrank local public projections when ambiguity appears
- which artifacts are contract-grade, maintained, or illustrative within each family
- which verification commands protect each family

## Highest-signal rules

- treat public machine-readable summaries as subordinate to stronger contract surfaces
- treat the live validator and published schemas as stronger than explanatory prose for runtime semantics
- treat curated raw law capsules as stronger than derivative summaries about the law
- keep reviewer-oriented JSON summaries aligned to the stronger docs, schemas, OpenAPI, and release-evidence surfaces they summarize

## Important boundary

This layer documents ownership and authority for the public specs surface only. It does not expose private internal team structure, unpublished runtime module ownership, or private operational escalation paths from the upstream N1Hub runtime.
