import validateFixRequest from "../api/validate-request.fix.json";
import { validateFixRequestSchema } from "../../projections/zod/validator-api.js";

export const parsedValidateFixRequest = validateFixRequestSchema.parse(validateFixRequest);

export const validateFixRequestSummary = {
  capsuleId: parsedValidateFixRequest.capsule.metadata.capsule_id,
  skipG16: parsedValidateFixRequest.options.skipG16 ?? false
};

if (validateFixRequestSummary.capsuleId !== "capsule.example.validator-invalid-g16.v1") {
  throw new Error("source-level Zod fix request recipe drifted from the published fix sample");
}
