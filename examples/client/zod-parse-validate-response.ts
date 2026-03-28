import passResponse from "../api/validate-response.pass.json";
import { validatePassResponseSchema } from "../../projections/zod/validator-api.js";

export const parsedValidateResponse = validatePassResponseSchema.parse(passResponse);

export const validatePassResponseSummary = {
  valid: parsedValidateResponse.valid,
  appliedFixCount: parsedValidateResponse.appliedFixes.length,
  warningCount: parsedValidateResponse.warnings.length
};

if (!validatePassResponseSummary.valid) {
  throw new Error("parsed pass response must stay valid");
}
