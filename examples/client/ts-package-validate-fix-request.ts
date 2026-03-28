import type { ValidateFixRequest } from "@num1hub/capsule-specs/typescript/validator-api";

export const validateFixRequest: ValidateFixRequest = {
  capsule: {
    metadata: {
      capsule_id: "capsule.example.package-fix-request.v1",
      type: "foundation",
      subtype: "atomic",
      status: "draft",
      version: "1.0.0",
      semantic_hash: "package-fix-request-capsule-contract-proof-layer",
      name: "Package fix request"
    },
    core_payload: {
      content_type: "json",
      content:
        "{\n  \"purpose\": \"package-fix-validator-demo\",\n  \"expectation\": \"the validator may recompute a correct integrity seal from this installed-package TypeScript example\"\n}"
    },
    neuro_concentrate: {
      summary:
        "Installed-package TypeScript recipe demonstrating that the public package surface can type a fix validator request envelope for repair-oriented validation flows without depending on repo-relative projection imports.",
      keywords: ["typescript", "package", "validator", "fix", "request", "capsule"],
      confidence_vector: {
        extraction: 1,
        synthesis: 0.98,
        linking: 0.95,
        provenance_coverage: 0.95,
        validation_score: 0.95,
        contradiction_pressure: 0.02
      },
      semantic_hash: "package-fix-request-capsule-contract-proof-layer"
    },
    recursive_layer: {
      links: []
    },
    integrity_sha3_512:
      "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
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
  throw new Error("installed-package fix request example should keep G16 checking enabled");
}
