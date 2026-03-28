import conflictResponse from "../api/conflict-response.sample.json";
import errorResponse from "../api/error-response.sample.json";
import rateLimitResponse from "../api/rate-limit-response.sample.json";
import unauthorizedResponse from "../api/unauthorized-response.sample.json";
import { simpleErrorResponseSchema } from "../../projections/zod/validator-api.js";

export const parsedErrorResponse = simpleErrorResponseSchema.parse(errorResponse);
export const parsedUnauthorizedResponse = simpleErrorResponseSchema.parse(unauthorizedResponse);
export const parsedConflictResponse = simpleErrorResponseSchema.parse(conflictResponse);
export const parsedRateLimitResponse = simpleErrorResponseSchema.parse(rateLimitResponse);

export const errorResponseSummary = {
  generic: parsedErrorResponse.error,
  unauthorized: parsedUnauthorizedResponse.error,
  conflict: parsedConflictResponse.error,
  rateLimit: parsedRateLimitResponse.error
};

if (errorResponseSummary.rateLimit !== "Rate limit exceeded") {
  throw new Error("parsed rate-limit response drifted from the published sample");
}
