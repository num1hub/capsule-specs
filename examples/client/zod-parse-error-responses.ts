import conflictResponse from "../api/conflict-response.sample.json";
import errorResponse from "../api/error-response.sample.json";
import forbiddenResponse from "../api/forbidden-response.sample.json";
import rateLimitResponse from "../api/rate-limit-response.sample.json";
import statsErrorResponse from "../api/stats-error-response.sample.json";
import unauthorizedResponse from "../api/unauthorized-response.sample.json";
import { simpleErrorResponseSchema } from "../../projections/zod/validator-api.js";

export const parsedErrorResponse = simpleErrorResponseSchema.parse(errorResponse);
export const parsedUnauthorizedResponse = simpleErrorResponseSchema.parse(unauthorizedResponse);
export const parsedForbiddenResponse = simpleErrorResponseSchema.parse(forbiddenResponse);
export const parsedConflictResponse = simpleErrorResponseSchema.parse(conflictResponse);
export const parsedRateLimitResponse = simpleErrorResponseSchema.parse(rateLimitResponse);
export const parsedStatsErrorResponse = simpleErrorResponseSchema.parse(statsErrorResponse);

export const errorResponseSummary = {
  generic: parsedErrorResponse.error,
  unauthorized: parsedUnauthorizedResponse.error,
  forbidden: parsedForbiddenResponse.error,
  conflict: parsedConflictResponse.error,
  rateLimit: parsedRateLimitResponse.error,
  statsComputation: parsedStatsErrorResponse.error
};

if (errorResponseSummary.forbidden !== "Owner role required") {
  throw new Error("parsed forbidden response drifted from the published sample");
}

if (errorResponseSummary.statsComputation !== "Stats computation failed") {
  throw new Error("parsed stats error response drifted from the published sample");
}
