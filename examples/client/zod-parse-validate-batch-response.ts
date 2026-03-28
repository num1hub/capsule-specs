import batchResponse from "../api/validate-response.batch.json";
import { validateBatchResponseSchema } from "../../projections/zod/validator-api.js";

export const parsedValidateBatchResponse = validateBatchResponseSchema.parse(batchResponse);

export const batchResponseSummary = {
  total: parsedValidateBatchResponse.summary.total,
  invalid: parsedValidateBatchResponse.summary.invalid,
  hasG16Failure: parsedValidateBatchResponse.results.some((result) =>
    result.errors.some((error) => error.gate === "G16")
  )
};

if (!batchResponseSummary.hasG16Failure) {
  throw new Error("parsed batch response must retain the documented G16 failure");
}
