import * as validatorProjection from "@num1hub/capsule-specs/zod/validator-api";
import validateSingleRequest from "@num1hub/capsule-specs/examples/api/validate-request.single.json" with { type: "json" };
import validateBatchRequest from "@num1hub/capsule-specs/examples/api/validate-request.batch.json" with { type: "json" };
import validateFixRequest from "@num1hub/capsule-specs/examples/api/validate-request.fix.json" with { type: "json" };

const validateSingleRequestSchema =
  validatorProjection.validateSingleRequestSchema ??
  validatorProjection.default?.validateSingleRequestSchema;
const validateBatchRequestSchema =
  validatorProjection.validateBatchRequestSchema ??
  validatorProjection.default?.validateBatchRequestSchema;
const validateFixRequestSchema =
  validatorProjection.validateFixRequestSchema ??
  validatorProjection.default?.validateFixRequestSchema;

if (!validateSingleRequestSchema || !validateBatchRequestSchema || !validateFixRequestSchema) {
  throw new Error("expected ESM package exports to expose validate request schemas");
}

const parsedSingleRequest = validateSingleRequestSchema.parse(validateSingleRequest);
const parsedBatchRequest = validateBatchRequestSchema.parse(validateBatchRequest);
const parsedFixRequest = validateFixRequestSchema.parse(validateFixRequest);

const validateRequestSummary = {
  singleCapsuleId: parsedSingleRequest.capsule.metadata.capsule_id,
  batchCapsuleCount: parsedBatchRequest.capsules.length,
  fixCapsuleId: parsedFixRequest.capsule.metadata.capsule_id
};

if (validateRequestSummary.fixCapsuleId !== "capsule.example.validator-invalid-g16.v1") {
  throw new Error("package fix request recipe drifted from the published fix sample");
}

console.log(validateRequestSummary);
