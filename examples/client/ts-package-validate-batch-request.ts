import type { ValidateBatchRequest } from "@num1hub/capsule-specs/typescript/validator-api";

export const validateBatchRequest: ValidateBatchRequest = {
  capsules: [
    {
      metadata: {
        capsule_id: "capsule.example.package-batch-request.note.v1",
        type: "operations",
        subtype: "atomic",
        status: "draft",
        version: "1.0.0",
        semantic_hash: "package-batch-request-note-capsule-contract-proof",
        name: "Package batch request note"
      },
      core_payload: {
        content_type: "markdown",
        content:
          "# Package batch request note\n\nThis installed-package TypeScript example keeps the batch request family copyable outside repo-relative imports."
      },
      neuro_concentrate: {
        summary:
          "Installed-package TypeScript recipe demonstrating that the public package surface can type a batch validator request with more than one capsule without falling back to repo-relative projection imports.",
        keywords: ["typescript", "package", "validator", "batch", "request", "capsule"],
        confidence_vector: {
          extraction: 1,
          synthesis: 0.98,
          linking: 0.95,
          provenance_coverage: 0.95,
          validation_score: 0.95,
          contradiction_pressure: 0.02
        },
        semantic_hash: "package-batch-request-note-capsule-contract-proof"
      },
      recursive_layer: {
        links: []
      },
      integrity_sha3_512:
        "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
    },
    {
      metadata: {
        capsule_id: "capsule.example.package-batch-request.invalid-g16.v1",
        type: "foundation",
        subtype: "atomic",
        status: "draft",
        version: "1.0.0",
        semantic_hash: "package-batch-request-invalid-g16-capsule-contract-proof",
        name: "Package batch request invalid G16"
      },
      core_payload: {
        content_type: "json",
        content:
          "{\n  \"purpose\": \"package-batch-validator-demo\",\n  \"expectation\": \"the second capsule stays structurally valid but intentionally fails a stronger G16 check\"\n}"
      },
      neuro_concentrate: {
        summary:
          "Installed-package TypeScript recipe demonstrating that the typed batch request family can carry an intentionally G16-invalid capsule alongside a normal capsule while staying inside the published validator request contract.",
        keywords: ["typescript", "package", "validator", "batch", "g16", "request"],
        confidence_vector: {
          extraction: 1,
          synthesis: 0.97,
          linking: 0.94,
          provenance_coverage: 0.94,
          validation_score: 0.9,
          contradiction_pressure: 0.03
        },
        semantic_hash: "package-batch-request-invalid-g16-capsule-contract-proof"
      },
      recursive_layer: {
        links: []
      },
      integrity_sha3_512:
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
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
  includesSecondCapsule:
    validateBatchRequest.capsules[1]?.metadata.capsule_id ===
    "capsule.example.package-batch-request.invalid-g16.v1"
};

if (!batchRequestSummary.includesSecondCapsule) {
  throw new Error("installed-package batch request lost the second capsule example");
}
