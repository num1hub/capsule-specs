# Domain Boundaries

This repository derives its boundary posture from the upstream domain-ownership doctrine, but it only publishes a narrow public subset of that larger map.

## Published boundaries

- **Capsule law and schema**
  The 5-element law, 16 gates, relation semantics, raw law capsules, and JSON Schema are published here because they define the strongest public contract for CapsuleOS.
- **Validator-facing API**
  Validator docs, OpenAPI, request and response envelopes, and API examples are published here because external readers need a stable way to understand validation behavior.
- **Projection and governance**
  Repository scope, projection doctrine, provenance, release evidence, and reviewer-facing summaries are published here because this repo is intentionally a projection surface rather than the full runtime.
- **Consumer integration**
  Public examples and client recipes are published here because they make the contract surface consumable without exposing private runtime internals.

## Deferred domains

These domains exist upstream, but they are intentionally not published as runtime surfaces in this public repo:

- **A2C**
  Candidate-capsule production and refinement remain outside the public specs surface.
- **Graph**
  Graph traversal and projection contracts are referenced conceptually, but the full graph runtime is not published here.
- **Projects**
  Project hierarchy semantics are part of the broader model, but not yet a standalone public runtime family in this repo.
- **Branching / diff**
  Overlay and merge semantics stay out of this narrow public specs release.
- **Symphony**
  Workflow orchestration remains an upstream domain, not a public runtime package here.
- **N-Infinity**
  Swarm execution coordination is outside the public surface.
- **Agents**
  Vault-steward and agent-control internals remain private.
- **Plugins**
  Extension governance exists upstream, but the plugin runtime surface is not part of this initial repo release.
- **Web / desktop / mobile**
  Delivery surfaces are product-facing runtime concerns, not part of this reference repository.
- **Hosted infra**
  Tenancy, quotas, rollout controls, and hosted operations remain outside this public repo.

## Boundary rules

- callers should integrate through published docs, schemas, OpenAPI, and examples rather than through private storage shapes
- published files should be enough for review and early integration, but not misrepresented as the complete product runtime
- when a deferred domain becomes public, it should arrive as an explicit boundary with docs, contracts, examples, and verification rather than as a partial leak

For the machine-readable form of this boundary statement, see [`../PUBLIC_BOUNDARY_MAP.json`](../PUBLIC_BOUNDARY_MAP.json). For the bounded reviewer-facing summary of deferred scope and non-promises, see [`limitations-register.md`](limitations-register.md) and [`../PUBLIC_LIMITATIONS_REGISTER.json`](../PUBLIC_LIMITATIONS_REGISTER.json).
