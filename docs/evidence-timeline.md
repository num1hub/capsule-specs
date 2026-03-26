# Evidence Timeline

This repository publishes a bounded evidence timeline so external reviewers can see active maintenance and public-surface hardening without reconstructing the story from raw git history alone.

The machine-readable form lives in [`../PUBLIC_EVIDENCE_TIMELINE.json`](../PUBLIC_EVIDENCE_TIMELINE.json).

## What the timeline answers

- which major public-surface hardening milestones already happened
- which commit introduced each milestone
- which files are the strongest evidence for that milestone
- which verification commands protect the current state of those surfaces

## Why this matters

Programs and reviewers often look for evidence of active maintenance, not just a polished snapshot.

The public project profile and release metadata show the current state. The evidence timeline adds a bounded history of how that state was assembled, so outside readers do not need to infer maintenance discipline from a long raw commit list.

The release-evidence layer summarizes the current bounded public state in [`../PUBLIC_RELEASE_METADATA.json`](../PUBLIC_RELEASE_METADATA.json).

The update-coherence layer summarizes which public surfaces must move together in [`../PUBLIC_UPDATE_COHERENCE_MAP.json`](../PUBLIC_UPDATE_COHERENCE_MAP.json).

The limitations layer summarizes what this timeline does not claim in [`../PUBLIC_LIMITATIONS_REGISTER.json`](../PUBLIC_LIMITATIONS_REGISTER.json).

The freshness layer summarizes which reviewer and release summaries become stale under which triggers in [`../PUBLIC_FRESHNESS_MODEL.json`](../PUBLIC_FRESHNESS_MODEL.json).

## Important boundary

This timeline is a curated public summary of the hardening path for this public specs repository. It does not claim to capture every upstream private-repo change, every internal experiment, or every possible historical detail from the sovereign N1Hub working tree.
