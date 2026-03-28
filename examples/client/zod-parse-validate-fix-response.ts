import fixResponse from "../api/validate-response.fix.sample.json";
import { validateFixResponseSchema } from "../../projections/zod/validator-api.js";

export const parsedValidateFixResponse = validateFixResponseSchema.parse(fixResponse);

export const fixResponseSummary = {
  valid: parsedValidateFixResponse.valid,
  fixedCapsuleId: parsedValidateFixResponse.fixedCapsule.metadata.capsule_id,
  computedHash: parsedValidateFixResponse.computedHash
};

if (!fixResponseSummary.valid) {
  throw new Error("parsed fix response must stay valid");
}
