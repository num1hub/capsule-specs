# Verification Matrix

This repository publishes a bounded verification matrix so reviewers can see which check families protect which public surfaces instead of treating `npm run verify:repo` as a black box.

The machine-readable form lives in [`../PUBLIC_VERIFICATION_MATRIX.json`](../PUBLIC_VERIFICATION_MATRIX.json).

## What the matrix answers

- which verification commands belong together
- which public surfaces each check family protects
- which failure classes each check family is meant to catch
- how repository-local verification maps to release and reviewer trust

## Why this matters

The verification guide explains each command one by one. The verification matrix adds a bounded crosswalk between command families, protected artifacts, and failure modes so external reviewers can assess the seriousness of the check stack quickly.

The review scorecard depends on this bounded verification view in [`../PUBLIC_REVIEW_SCORECARD.json`](../PUBLIC_REVIEW_SCORECARD.json).

The current release evidence depends on the same check stack in [`../PUBLIC_RELEASE_METADATA.json`](../PUBLIC_RELEASE_METADATA.json).

## Important boundary

The matrix is a bounded public summary of repository-local verification coverage. It does not replace the stronger check scripts, release evidence, or live upstream validator behavior.
