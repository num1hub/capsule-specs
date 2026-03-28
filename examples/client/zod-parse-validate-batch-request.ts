import validateBatchRequest from "../api/validate-request.batch.json";
import { validateBatchRequestSchema } from "../../projections/zod/validator-api.js";

export const parsedValidateBatchRequest = validateBatchRequestSchema.parse(validateBatchRequest);

export const validateBatchRequestSummary = {
  capsuleCount: parsedValidateBatchRequest.capsules.length,
  firstCapsuleId: parsedValidateBatchRequest.capsules[0]?.metadata.capsule_id,
  secondCapsuleId: parsedValidateBatchRequest.capsules[1]?.metadata.capsule_id
};

if (validateBatchRequestSummary.capsuleCount !== 2) {
  throw new Error("source-level Zod batch request recipe drifted from the published two-capsule batch sample");
}
