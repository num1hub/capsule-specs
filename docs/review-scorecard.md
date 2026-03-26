# Review Scorecard

This repository publishes a bounded review scorecard so external reviewers can assess the public surface against explicit criteria instead of relying on intuition or raw repository size.

The machine-readable form lives in [`../PUBLIC_REVIEW_SCORECARD.json`](../PUBLIC_REVIEW_SCORECARD.json).

## What the scorecard answers

- whether the public boundary is explicit
- whether maintainer ownership is explicit
- whether provenance and release evidence are machine-readable
- whether public examples, contracts, and negative paths are reviewable
- whether reviewer-facing summaries and shortcuts are strong enough for fast external evaluation
- whether active maintenance is visible through bounded public evidence

## Why this matters

The project profile and evaluation packet explain what the repository is. The review scorecard adds a bounded checklist of reviewer-grade criteria and the strongest evidence for each criterion.

This is not a certification badge and not a claim about the full private N1Hub runtime. It is a structured public checklist for the public specs surface only.

The maintenance timeline behind the current review posture lives in [`../PUBLIC_EVIDENCE_TIMELINE.json`](../PUBLIC_EVIDENCE_TIMELINE.json).

The explicit limits on the scorecard live in [`../PUBLIC_LIMITATIONS_REGISTER.json`](../PUBLIC_LIMITATIONS_REGISTER.json).

The verification coverage behind the scorecard lives in [`../PUBLIC_VERIFICATION_MATRIX.json`](../PUBLIC_VERIFICATION_MATRIX.json).

## Important boundary

The scorecard is a bounded public reviewer aid. It does not replace the stronger docs, schemas, examples, release evidence, or raw git history it references.
