import { CAPSULE_TYPES, type Capsule } from "@num1hub/capsule-specs/typescript/capsule";
import type { ValidateSingleRequest } from "@num1hub/capsule-specs/typescript/validator-api";

export const capsule: Capsule = {
  metadata: {
    capsule_id: "capsule.example.fresh-typescript-consumer.v1",
    type: CAPSULE_TYPES[1],
    subtype: "atomic",
    status: "active",
    version: "1.0.0",
    semantic_hash: "fresh-typescript-consumer-capsule-contract-layer",
    name: "Fresh TypeScript consumer example"
  },
  core_payload: {
    content_type: "markdown",
    content: "# Fresh TypeScript consumer\n\nThis example checks installed package type resolution."
  },
  neuro_concentrate: {
    summary:
      "Fresh TypeScript consumer example proving that installed package subpaths resolve their public capsule and validator API types in a clean project.",
    keywords: ["typescript", "package", "consumer", "capsule", "validator"],
    confidence_vector: {
      extraction: 1,
      synthesis: 0.99,
      linking: 0.95,
      provenance_coverage: 0.95,
      validation_score: 0.95,
      contradiction_pressure: 0.01
    },
    semantic_hash: "fresh-typescript-consumer-capsule-contract-layer"
  },
  recursive_layer: {
    links: [{ target_id: "capsule.example.upstream-contract.v1", relation_type: "references" }]
  },
  integrity_sha3_512:
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
};

export const validateRequest: ValidateSingleRequest = {
  capsule,
  options: { skipG16: true },
  autoFix: false
};
