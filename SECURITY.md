# Security Policy

## Reporting

Report vulnerabilities privately to the maintainers. Do not publish exploit details until maintainers acknowledge the report and agree on disclosure timing.
Do not use public issues, pull requests, wiki pages, or other public repo surfaces for trust-sensitive exploit detail.

## Scope

Security reports may cover published schemas, example capsules, validator-facing contracts, OpenAPI surfaces, or integrity-sealing defects in projected artifacts.

## Seal failure policy

If a projected artifact fails cryptographic sealing or semantic-hash parity checks, treat the result as a build integrity incident. Stop promotion, preserve evidence, and regenerate from source truth before any public release continues.

## Response expectations

Maintainers will triage severity, confirm reproducibility, contain exposure, publish fixes, and document remediation steps. Contributors must avoid leaking secrets, private datasets, or exploit payloads in public issues.
