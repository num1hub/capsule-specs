import type { ValidateFixRequest } from "../../projections/typescript/validator-api.js";

export const validateFixRequest: ValidateFixRequest = {
  capsule: {
    metadata: {
      capsule_id: "capsule.example.public-fix-request.v1",
      type: "foundation",
      subtype: "atomic",
      status: "draft",
      version: "1.0.0",
      semantic_hash: "public-fix-request-capsule-contract-proof-layer",
      name: "Public fix request"
    },
    core_payload: {
      content_type: "json",
      content: "{\n  \"purpose\": \"validator-fix-demo\",\n  \"expectation\": \"the validator may recompute a correct integrity seal for this structurally valid capsule\"\n}"
    },
    neuro_concentrate: {
      summary: "Public-safe TypeScript recipe demonstrating how a consumer can construct a typed fix validator request envelope against the published contract when the strongest intended action is a repair-oriented validation flow rather than a read-only pass/fail check.",
      keywords: [
        "typescript",
        "validator",
        "fix",
        "request",
        "capsule",
        "projection"
      ],
      confidence_vector: {
        extraction: 1,
        synthesis: 0.98,
        linking: 0.95,
        provenance_coverage: 0.95,
        validation_score: 0.95,
        contradiction_pressure: 0.02
      },
      semantic_hash: "public-fix-request-capsule-contract-proof-layer"
    },
    recursive_layer: {
      links: []
    },
    integrity_sha3_512: "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  },
  options: {
    skipG16: false,
    allowRefutes: false
  }
};

export const fixRequestSummary = {
  capsuleId: validateFixRequest.capsule.metadata.capsule_id,
  skipG16: validateFixRequest.options.skipG16 ?? false,
  allowsRefutes: validateFixRequest.options.allowRefutes ?? false
};

if (fixRequestSummary.skipG16) {
  throw new Error("typed fix request example should keep G16 checking enabled");
}
