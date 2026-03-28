import type {
  ValidateBatchResponse,
  ValidateFailResponse,
  ValidateFixResponse,
  ValidatePassResponse
} from "@num1hub/capsule-specs/typescript/validator-api";

export const validatePassResponse: ValidatePassResponse = {
  valid: true,
  errors: [],
  warnings: [],
  computedHash:
    "eed9fad3b0adac495f2bc898adfb26e49da11672767c6d9002b1f4dfe339159323e626598d61a49c4a5dedf3366a80b391dcb395c8844427eb11682bcd9c1ba8",
  appliedFixes: []
};

export const validateFailResponse: ValidateFailResponse = {
  valid: false,
  errors: [
    {
      gate: "G16",
      path: "$.integrity_sha3_512",
      message: "integrity_sha3_512 does not match computed SHA3-512 digest for canonical payload."
    }
  ],
  warnings: [],
  computedHash:
    "7a3352892e1529f08f10afe7ff33861a433410c4072930933ab86903d46b10f33dc59676ca1bcd2694259d6448817cc4769ee91b4936446c38117880ca47c456"
};

export const validateBatchResponse: ValidateBatchResponse = {
  summary: {
    total: 2,
    valid: 1,
    invalid: 1,
    withWarnings: 0,
    totalErrors: 1,
    totalWarnings: 0
  },
  results: [
    {
      capsuleId: "capsule.example.note.v1",
      valid: true,
      errors: [],
      warnings: [],
      computedHash:
        "eed9fad3b0adac495f2bc898adfb26e49da11672767c6d9002b1f4dfe339159323e626598d61a49c4a5dedf3366a80b391dcb395c8844427eb11682bcd9c1ba8"
    },
    {
      capsuleId: "capsule.example.validator-invalid-g16.v1",
      valid: false,
      errors: [
        {
          gate: "G16",
          path: "$.integrity_sha3_512",
          message: "integrity_sha3_512 does not match computed SHA3-512 digest for canonical payload."
        }
      ],
      warnings: [],
      computedHash:
        "7a3352892e1529f08f10afe7ff33861a433410c4072930933ab86903d46b10f33dc59676ca1bcd2694259d6448817cc4769ee91b4936446c38117880ca47c456"
    }
  ]
};

export const validateFixResponse: ValidateFixResponse = {
  valid: true,
  errors: [],
  warnings: [],
  computedHash:
    "7a3352892e1529f08f10afe7ff33861a433410c4072930933ab86903d46b10f33dc59676ca1bcd2694259d6448817cc4769ee91b4936446c38117880ca47c456",
  fixedCapsule: {
    metadata: {
      capsule_id: "capsule.example.validator-invalid-g16.v1",
      version: "1.0.0",
      status: "draft",
      type: "foundation",
      subtype: "atomic",
      author: "egor-n1",
      created_at: "2026-03-26T12:00:00Z",
      updated_at: "2026-03-26T12:00:00Z",
      name: "Example Validator Invalid G16 Capsule",
      semantic_hash: "example-validator-invalid-g16-public-capsule-integrity-failure",
      source: {
        uri: "https://github.com/num1hub/capsule-specs/examples/example-validator-invalid-g16.capsule.json",
        type: "generated_public_example"
      }
    },
    core_payload: {
      content_type: "json",
      content:
        "{\n  \"purpose\": \"validator-negative-example\",\n  \"expectation\": \"fails G16 because the integrity hash is intentionally wrong\",\n  \"notes\": [\n    \"useful for tests and docs\",\n    \"structure is otherwise valid\"\n  ]\n}"
    },
    neuro_concentrate: {
      summary:
        "This example capsule is intentionally designed to fail gate G16 so the public repository can demonstrate the difference between a structurally correct capsule and a cryptographically sealed one. The outer shape, summary, keyword count, and confidence vector remain valid, which helps isolate the failure to the integrity field itself. That makes the file useful for documentation, demos, and negative-path tests that need a stable example of a sealing mismatch. Consumers should treat it as a teaching artifact only and should never use it as trusted graph input without recomputing the correct integrity hash first.",
      keywords: ["example", "validator", "invalid", "g16", "capsule", "negative-test", "public-specs"],
      confidence_vector: {
        extraction: 1,
        synthesis: 1,
        linking: 0.92,
        provenance_coverage: 1,
        validation_score: 0.2,
        contradiction_pressure: 0
      },
      semantic_hash: "example-validator-invalid-g16-public-capsule-integrity-failure"
    },
    recursive_layer: {
      links: [],
      epistemic_ledger: []
    },
    integrity_sha3_512:
      "7a3352892e1529f08f10afe7ff33861a433410c4072930933ab86903d46b10f33dc59676ca1bcd2694259d6448817cc4769ee91b4936446c38117880ca47c456"
  }
};

export const validateResponseSummary = {
  passValid: validatePassResponse.valid,
  failGate: validateFailResponse.errors[0]?.gate,
  batchInvalid: validateBatchResponse.summary.invalid,
  fixedCapsuleId: validateFixResponse.fixedCapsule.metadata.capsule_id
};

if (validateResponseSummary.batchInvalid !== 1) {
  throw new Error("typed package batch response drifted from the documented invalid count");
}
