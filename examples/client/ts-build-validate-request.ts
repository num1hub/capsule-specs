import type { ValidateSingleRequest } from "../../projections/typescript/validator-api.js";

export const validateRequest: ValidateSingleRequest = {
  capsule: {
    metadata: {
      capsule_id: "capsule.example.public-validate-request.v1",
      type: "operations",
      subtype: "atomic",
      status: "draft",
      version: "1.0.0",
      semantic_hash: "public-safe-validator-request-typing-sample-layer-proof",
      name: "Public validate request"
    },
    core_payload: {
      content_type: "markdown",
      content: "# Public validate request\n\nThis example shows how a consumer can construct a typed validator request envelope."
    },
    neuro_concentrate: {
      summary: "Public-safe TypeScript recipe demonstrating how a consumer can construct a typed validator request envelope against the published public contract without importing private runtime code or inferring request shape from prose alone.",
      keywords: [
        "typescript",
        "validator",
        "request",
        "capsule",
        "projection",
        "schema"
      ],
      confidence_vector: {
        extraction: 1,
        synthesis: 0.98,
        linking: 0.95,
        provenance_coverage: 0.95,
        validation_score: 0.95,
        contradiction_pressure: 0.02
      },
      semantic_hash: "public-safe-validator-request-typing-sample-layer-proof"
    },
    recursive_layer: {
      links: []
    },
    integrity_sha3_512: "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
  },
  options: {
    skipG16: false,
    allowRefutes: false,
    existingIds: []
  },
  autoFix: false
};
