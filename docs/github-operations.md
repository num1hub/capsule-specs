# GitHub Operations

This repository keeps a bounded GitHub-operations layer so outside contributors and reviewers can see how the live GitHub surface is governed.

The repo-owned configuration lives in:

- [`../.github/labels.json`](../.github/labels.json)
- [`../.github/milestones.json`](../.github/milestones.json)
- [`../.github/release.yml`](../.github/release.yml)
- [`../.github/dependabot.yml`](../.github/dependabot.yml)

## What this layer covers

- which labels are part of the maintained public taxonomy
- which milestones correspond to the active public roadmap waves
- how GitHub release notes are grouped
- how GitHub-native update hygiene is handled

## Why this matters

The GitHub issue surface should not depend entirely on mutable platform state.

If labels, milestones, or release grouping exist only in the live GitHub UI, then the public maintainer workflow becomes harder to review, harder to recreate, and easier to drift away from the repo's documented boundary.

Keeping the GitHub operating layer in versioned files makes the public issue surface more portable and reviewable.

## Boundaries

This layer does not claim that every GitHub setting is managed in-repo.
It only claims that the maintained public label taxonomy, active milestone set, release-note grouping, and update posture are explicit and reviewable.
