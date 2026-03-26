# Open Core Plan

## Purpose

Create a small, public-safe repository that explains the capsule model, publishes validator-facing reference material, and gives outside contributors enough schema, examples, and docs to understand the open-core surface of N1Hub.

## Audience

- open-source contributors
- integrators and tool builders
- people evaluating N1Hub and CapsuleOS
- programs reviewing OSS-maintainer eligibility

## Selected source surfaces

- `/home/n1/n1hub-repo-vault/root/capsule.foundation.n1hub-monorepo.v1.json`
- `/home/n1/n1hub-repo-vault/governance/capsule.governance.readme.v1.json`
- `/home/n1/n1hub-repo-vault/governance/capsule.governance.quickstart.v1.json`
- `/home/n1/n1hub-repo-vault/governance/capsule.governance.contributing.v1.json`
- `/home/n1/n1hub-repo-vault/governance/capsule.governance.code-of-conduct.v1.json`
- `/home/n1/n1hub-repo-vault/governance/capsule.governance.security.v1.json`
- `/home/n1/n1hub-repo-vault/governance/capsule.governance.validator-doc.v1.json`
- `/home/n1/n1hub-repo-vault/governance/capsule.governance.terminology.v1.json`
- `/home/n1/n1hub-repo-vault/governance/capsule.governance.anchors-spec.v1.json`
- `/home/n1/n1hub.com/data/capsules/capsule.foundation.capsuleos.5-element-law.v1.json`
- `/home/n1/n1hub.com/data/capsules/capsule.foundation.capsuleos.16-gates.v1.json`
- `/home/n1/n1hub.com/data/capsules/capsule.foundation.capsuleos.relation-types.v1.json`
- `/home/n1/n1hub.com/data/capsules/capsule.foundation.capsuleos-schema.v1.json`
- `/home/n1/n1hub.com/docs/validator.md`
- `/home/n1/n1hub.com/docs/openapi/validate.openapi.json`

## Generated or adapted targets

- community files for healthy public contribution flow
- root onboarding, governance, maintainer, roadmap, and changelog files
- public docs derived from capsules and validator docs
- JSON Schema artifacts
- synthetic examples for validation and education, including one linked multi-capsule graph example
- source-material, FAQ, and release-process docs so the public surface stays auditable and operable
- repo-local package metadata and verification scripts for reviewable maintainer workflows
- provenance and release-review artifacts

## Explicit exclusions

- private product doctrine from `/home/n1/Project`
- private vault state and personal capsules
- prompts, agent runtime internals, and internal operator docs
- branch state, auth material, secrets, or local working memory

## Risk notes

- some upstream public vault capsules carry future-facing timestamps; this repository uses them as source material, not as historical claims
- docs are intentionally narrower than the upstream vault so the public repo stays focused and reviewable
