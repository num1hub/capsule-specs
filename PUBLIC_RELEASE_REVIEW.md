# Public Release Review

## Included materials

- community health files: `README`, `LICENSE`, `CONTRIBUTING`, `CODE_OF_CONDUCT`, `SECURITY`, `SUPPORT`
- root onboarding and governance files: `QUICKSTART`, `ONBOARDING`, `GOVERNANCE`, `MAINTAINERS`, `ROADMAP`, `CHANGELOG`
- repo ergonomics files: `.editorconfig`, `package.json`, `RELEASING`
- public docs for the capsule law, validator, relation types, schema, API envelopes, integration guidance, compatibility, examples, anchor governance, repository boundary, FAQ, and source materials
- route reference and verification docs for navigating and auditing the public surface
- explicit versioning policy in `VERSIONING.md`
- machine-readable public contract catalog in `PUBLIC_CONTRACT_CATALOG.json` plus the companion guide in `docs/contract-catalog.md`
- machine-readable schemas
- synthetic example capsules, a linked graph example, and a known-ID catalog
- API request, response, error, and stats sample payloads for the validator HTTP surface
- raw public law capsules
- live validator OpenAPI reference

## Excluded materials

- `/home/n1/Project`
  Private product doctrine with proprietary and private metadata.
- private vault state, personal capsules, prompts, runtime internals, branch state, secrets, and operator memory
- broader repo-governance surfaces not needed for a minimal public specs surface

## Privacy and IP review

- no personal vault data copied
- no secrets or tokens copied
- no private operator docs copied
- public files were derived only from public-safe capsule or validator surfaces

## Validation results

Validated with the live validator from `/home/n1/n1hub.com` on 2026-03-26:

- `examples/example-note.capsule.json`: pass
- `examples/example-task.capsule.json`: pass
- `examples/example-validator-valid.capsule.json`: pass
- `examples/example-validator-invalid-g16.capsule.json`: expected fail on `G16`

Repository-local audit on 2026-03-26:

- `node scripts/audit-public-surface.js`: pass
- `node scripts/check-example-contracts.js`: pass
- `node scripts/check-api-examples.js`: pass
- `node scripts/check-doc-links.js`: pass
- `node scripts/check-contract-catalog.js`: pass
- `node scripts/check-surface-coherence.js`: pass
- manifest coverage: `81` files / `81` manifest entries

Upstream validator checks on 2026-03-26:

- `examples/example-note.capsule.json`: pass
- `examples/example-task.capsule.json`: pass
- `examples/example-validator-valid.capsule.json`: pass
- `examples/example-validator-invalid-g16.capsule.json`: expected fail on `G16`
- `examples/example-project-hub.capsule.json`: pass when validated with `--ids-file examples/example-known-ids.json`

## Residual risks

- some source materials come from a public-oriented vault snapshot rather than from a standalone published repository
- JSON Schema files are public projections aligned to live validator behavior, but the validator remains the stronger source of truth for edge-case semantics
- API response examples are illustrative contract samples, not recorded live HTTP captures from a deployed public service
- `/home/n1/codex-workspace` still contains local hidden Codex state (`.codex/`, `.codexignore`), which is excluded via `.gitignore` and should remain out of any public commit
