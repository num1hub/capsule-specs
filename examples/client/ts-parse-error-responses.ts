import conflictResponse from "../api/conflict-response.sample.json";
import errorResponse from "../api/error-response.sample.json";
import rateLimitResponse from "../api/rate-limit-response.sample.json";
import unauthorizedResponse from "../api/unauthorized-response.sample.json";
import type { SimpleErrorResponse } from "../../projections/typescript/validator-api.js";

export const typedErrorResponse: SimpleErrorResponse = errorResponse;
export const typedUnauthorizedResponse: SimpleErrorResponse = unauthorizedResponse;
export const typedConflictResponse: SimpleErrorResponse = conflictResponse;
export const typedRateLimitResponse: SimpleErrorResponse = rateLimitResponse;

export const errorResponseSummary = {
  generic: typedErrorResponse.error,
  unauthorized: typedUnauthorizedResponse.error,
  conflict: typedConflictResponse.error,
  rateLimit: typedRateLimitResponse.error
};

if (errorResponseSummary.unauthorized !== "Unauthorized") {
  throw new Error("typed unauthorized response drifted from the published sample");
}
