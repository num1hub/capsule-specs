# FAQ

## Is this the full N1Hub application?

No. This repository is the public specification and reference surface only.

## What is a capsule?

A capsule is a five-element knowledge artifact with identity, payload, semantic summary, graph links, and a cryptographic seal.

## Where is the runtime?

The runtime lives outside this repository. This repository publishes the public-facing model, schema, examples, and validator boundary.

## Why are there raw capsules here?

The `capsules/` directory gives readers a small, inspectable source set that backs the human-readable docs.

## Why is there an intentionally invalid example?

To show the difference between structural correctness and trust. A capsule can look correct but still fail the final integrity-seal gate.

## How do I validate linked examples?

Use the known-ID catalog in `examples/example-known-ids.json` when your validator supports link-resolution inputs. The project-hub example is designed to demonstrate graph semantics, not just single-file shape.

## How should a reviewer inspect this repository quickly?

Start with `README.md`, `docs/reviewer-guide.md`, `PUBLIC_EVALUATION_PACKET.json`, `PUBLIC_ASSURANCE_CASE.json`, `PUBLIC_UPDATE_COHERENCE_MAP.json`, `PUBLIC_LIMITATIONS_REGISTER.json`, `PUBLIC_EVIDENCE_TIMELINE.json`, `PUBLIC_REVIEW_SCORECARD.json`, `PUBLIC_VERIFICATION_MATRIX.json`, `PUBLIC_AUDIENCE_PATHS.json`, `PUBLIC_EVIDENCE_STRENGTH_MAP.json`, `PUBLIC_ADOPTION_READINESS.json`, `PUBLIC_FRESHNESS_MODEL.json`, `PUBLIC_TRACEABILITY_MATRIX.json`, `PUBLIC_EXAMPLE_COVERAGE.json`, `PUBLIC_MAINTENANCE_MODEL.json`, `PUBLIC_CHANGE_CONTROL_MODEL.json`, `PUBLIC_OWNERSHIP_MAP.json`, `PUBLIC_DEPENDENCY_GRAPH.json`, `PUBLIC_FAILURE_MODEL.json`, `PUBLIC_PROJECT_PROFILE.json`, `PUBLIC_CAPABILITY_MATRIX.json`, and `PUBLIC_RELEASE_METADATA.json`. Those surfaces explain scope, health signals, supported outcomes, strongest evidence, explicit limits on public claims, deferred scope, active maintenance, bounded reviewer criteria, verification coverage, role-specific entry paths, stronger-source hierarchy, adoption readiness, freshness posture, and which reviewer/release surfaces must move together.
