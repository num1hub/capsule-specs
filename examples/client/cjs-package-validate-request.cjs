const {
  validateSingleRequestSchema,
  validateBatchRequestSchema,
  validateFixRequestSchema
} = require("@num1hub/capsule-specs/zod/validator-api");
const validateSingleRequest = require("@num1hub/capsule-specs/examples/api/validate-request.single.json");
const validateBatchRequest = require("@num1hub/capsule-specs/examples/api/validate-request.batch.json");
const validateFixRequest = require("@num1hub/capsule-specs/examples/api/validate-request.fix.json");

const parsedSingleRequest = validateSingleRequestSchema.parse(validateSingleRequest);
const parsedBatchRequest = validateBatchRequestSchema.parse(validateBatchRequest);
const parsedFixRequest = validateFixRequestSchema.parse(validateFixRequest);

const validateRequestSummary = {
  singleCapsuleId: parsedSingleRequest.capsule.metadata.capsule_id,
  batchCapsuleCount: parsedBatchRequest.capsules.length,
  fixCapsuleId: parsedFixRequest.capsule.metadata.capsule_id
};

if (validateRequestSummary.batchCapsuleCount !== 2) {
  throw new Error("package batch request recipe drifted from the published two-capsule sample");
}

console.log(validateRequestSummary);
