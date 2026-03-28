import type { ValidateBatchRequest } from "../../projections/typescript/validator-api.js";

export const validateBatchRequest: ValidateBatchRequest = {
  capsules: [
    {
      metadata: {
        capsule_id: "capsule.example.public-batch-request.note.v1",
        type: "operations",
        subtype: "atomic",
        status: "draft",
        version: "1.0.0",
        semantic_hash: "public-batch-request-note-capsule-contract-proof",
        name: "Public batch request note"
      },
      core_payload: {
        content_type: "markdown",
        content: "# Public batch request note\n\nThis example shows one typed capsule inside a public batch validator request."
      },
      neuro_concentrate: {
        summary: "Public-safe TypeScript recipe demonstrating how a consumer can construct one capsule inside a typed batch validator request envelope against the published public contract without depending on private runtime code.",
        keywords: [
          "typescript",
          "validator",
          "batch",
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
        semantic_hash: "public-batch-request-note-capsule-contract-proof"
      },
      recursive_layer: {
        links: []
      },
      integrity_sha3_512: "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
    },
    {
      metadata: {
        capsule_id: "capsule.example.public-batch-request.invalid-g16.v1",
        type: "foundation",
        subtype: "atomic",
        status: "draft",
        version: "1.0.0",
        semantic_hash: "public-batch-request-invalid-g16-capsule-contract-proof",
        name: "Public batch request invalid G16"
      },
      core_payload: {
        content_type: "json",
        content: "{\n  \"purpose\": \"batch-validator-demo\",\n  \"expectation\": \"this second capsule is structurally valid but intentionally sealed with a wrong hash\"\n}"
      },
      neuro_concentrate: {
        summary: "Public-safe TypeScript recipe demonstrating that a typed batch validator request can carry more than one capsule, including a structurally valid capsule that is intentionally prepared to fail G16 during a stronger validator check.",
        keywords: [
          "typescript",
          "validator",
          "batch",
          "request",
          "g16",
          "projection"
        ],
        confidence_vector: {
          extraction: 1,
          synthesis: 0.97,
          linking: 0.94,
          provenance_coverage: 0.94,
          validation_score: 0.9,
          contradiction_pressure: 0.03
        },
        semantic_hash: "public-batch-request-invalid-g16-capsule-contract-proof"
      },
      recursive_layer: {
        links: []
      },
      integrity_sha3_512: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    }
  ],
  options: {
    skipG16: false,
    allowRefutes: false
  }
};

export const batchRequestSummary = {
  capsuleCount: validateBatchRequest.capsules.length,
  firstCapsuleId: validateBatchRequest.capsules[0]?.metadata.capsule_id,
  includesSecondCapsule: validateBatchRequest.capsules[1]?.metadata.capsule_id === "capsule.example.public-batch-request.invalid-g16.v1"
};

if (!batchRequestSummary.includesSecondCapsule) {
  throw new Error("typed batch request lost the second capsule example");
}
