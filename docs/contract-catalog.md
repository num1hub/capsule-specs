# Contract Catalog

The machine-readable catalog for this repository lives at [`../PUBLIC_CONTRACT_CATALOG.json`](../PUBLIC_CONTRACT_CATALOG.json).

## Why it exists

The Markdown docs are optimized for people. The catalog is optimized for machines, reviewers, and future automation. It gives one stable place to see:

- which public files are part of the contract surface
- what kind of surface each file is
- how stable that surface should be treated
- who the intended audience is
- which verification commands protect it

## Stability levels

- `contract`
  A high-signal public contract surface. Changes here should be deliberate and reviewed carefully.
- `maintained`
  Publicly supported and expected to stay coherent, but still allowed to evolve in additive or editorial ways.
- `illustrative`
  Useful reference material that demonstrates a contract shape without claiming to be the strongest source of truth.

## Typical use cases

- grant and program reviewers can inspect the public surface quickly
- maintainers can track which artifacts need synchronized updates
- future tooling can read the catalog without scraping prose docs

## Important boundary

The catalog describes the public projection surface only. It does not claim to enumerate the full private upstream system.
