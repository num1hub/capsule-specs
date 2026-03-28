import validateSingleRequest from "../api/validate-request.single.json";
import { validateSingleRequestSchema } from "../../projections/zod/validator-api.js";

export const parsedValidateRequest = validateSingleRequestSchema.parse(validateSingleRequest);

export const validateRequestSummary = {
  capsuleId: parsedValidateRequest.capsule.metadata.capsule_id,
  autoFix: parsedValidateRequest.autoFix,
  existingIds: parsedValidateRequest.options.existingIds?.length ?? 0
};

if (validateRequestSummary.capsuleId !== "capsule.example.note.v1") {
  throw new Error("source-level Zod request recipe drifted from the published single validate example");
}
