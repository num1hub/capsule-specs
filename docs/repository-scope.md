# Repository Scope

This repository is the public specification surface for N1Hub and CapsuleOS.

## In scope

- public docs
- schemas
- examples
- validator-facing contracts
- raw public-safe capsules that back the docs
- machine-readable boundary and release evidence

## Out of scope

- private working vaults
- managed-cloud internals
- personal operator memory
- unpublished product doctrine
- internal agent runtime prompts and control planes

## Why the scope is narrow

Narrow scope keeps the repository reviewable and useful. The goal is to provide a clean OSS surface that outsiders can understand quickly and that maintainers can evolve without leaking private operational material.

See [`domain-boundaries.md`](domain-boundaries.md) and [`../PUBLIC_BOUNDARY_MAP.json`](../PUBLIC_BOUNDARY_MAP.json) for the explicit published-vs-deferred boundary map.
