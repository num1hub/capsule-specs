import failResponse from "../api/validate-response.fail.json";
import { validateFailResponseSchema } from "../../projections/zod/validator-api.js";

export const parsedValidateFailResponse = validateFailResponseSchema.parse(failResponse);

export const validateFailResponseSummary = {
  valid: parsedValidateFailResponse.valid,
  firstGate: parsedValidateFailResponse.errors[0]?.gate,
  computedHash: parsedValidateFailResponse.computedHash
};

if (validateFailResponseSummary.valid) {
  throw new Error("parsed fail response must stay invalid");
}

if (validateFailResponseSummary.firstGate !== "G16") {
  throw new Error("parsed fail response must retain the documented G16 failure");
}
