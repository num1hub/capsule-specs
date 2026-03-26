# Examples

This directory contains minimal public-safe example capsules.

Use them to:

- understand the five-element outer structure
- test parsers and renderers
- compare valid and invalid sealing outcomes
- inspect a tiny linked capsule graph
- inspect validator HTTP request and response envelopes
- build tutorials or integration demos without touching private vault data
- follow a stable public contract map before depending on edge-case behavior

## Files

- `example-note.capsule.json`
  Smallest narrative example.
- `example-task.capsule.json`
  Minimal operational example.
- `example-validator-valid.capsule.json`
  Standalone positive smoke example.
- `example-validator-invalid-g16.capsule.json`
  Negative seal example.
- `example-project-hub.capsule.json`
  Graph-linked example that references the note, task, and validator examples.
- `example-known-ids.json`
  JSON-array known-ID catalog for link-aware validation.
- `api/`
  Validator HTTP payload examples for integrators and client builders.
- `client/`
  Minimal curl and Node recipes for external consumers.
- `archive/`
  Public-safe archive-bundle sample for portability review.
