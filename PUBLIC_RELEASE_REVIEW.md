# Public Release Review

## Included materials

- community health files: `README`, `LICENSE`, `CONTRIBUTING`, `CODE_OF_CONDUCT`, `SECURITY`, `SUPPORT`
- public docs for the capsule law, validator, relation types, and repository boundary
- machine-readable schemas
- synthetic example capsules
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

## Residual risks

- some source materials come from a public-oriented vault snapshot rather than from a standalone published repository
- JSON Schema files are public projections aligned to live validator behavior, but the validator remains the stronger source of truth for edge-case semantics
- `/home/n1/codex-workspace` still contains local hidden Codex state (`.codex/`, `.codexignore`), which is excluded via `.gitignore` and should remain out of any public commit
