import conflictResponse from "../api/conflict-response.sample.json";
import errorResponse from "../api/error-response.sample.json";
import forbiddenResponse from "../api/forbidden-response.sample.json";
import rateLimitResponse from "../api/rate-limit-response.sample.json";
import unauthorizedResponse from "../api/unauthorized-response.sample.json";
import type { SimpleErrorResponse } from "../../projections/typescript/validator-api.js";

export const typedErrorResponse: SimpleErrorResponse = errorResponse;
export const typedUnauthorizedResponse: SimpleErrorResponse = unauthorizedResponse;
export const typedForbiddenResponse: SimpleErrorResponse = forbiddenResponse;
export const typedConflictResponse: SimpleErrorResponse = conflictResponse;
export const typedRateLimitResponse: SimpleErrorResponse = rateLimitResponse;

export const errorResponseSummary = {
  generic: typedErrorResponse.error,
  unauthorized: typedUnauthorizedResponse.error,
  forbidden: typedForbiddenResponse.error,
  conflict: typedConflictResponse.error,
  rateLimit: typedRateLimitResponse.error
};

if (errorResponseSummary.forbidden !== "Owner role required") {
  throw new Error("typed forbidden response drifted from the published sample");
}
