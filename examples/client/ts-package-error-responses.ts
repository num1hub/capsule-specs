import conflictResponse from "@num1hub/capsule-specs/examples/api/conflict-response.sample.json" with { type: "json" };
import errorResponse from "@num1hub/capsule-specs/examples/api/error-response.sample.json" with { type: "json" };
import forbiddenResponse from "@num1hub/capsule-specs/examples/api/forbidden-response.sample.json" with { type: "json" };
import rateLimitResponse from "@num1hub/capsule-specs/examples/api/rate-limit-response.sample.json" with { type: "json" };
import unauthorizedResponse from "@num1hub/capsule-specs/examples/api/unauthorized-response.sample.json" with { type: "json" };
import type { SimpleErrorResponse } from "@num1hub/capsule-specs/typescript/validator-api";

export const genericErrorResponse: SimpleErrorResponse = errorResponse;
export const unauthorizedErrorResponse: SimpleErrorResponse = unauthorizedResponse;
export const forbiddenErrorResponse: SimpleErrorResponse = forbiddenResponse;
export const conflictErrorResponse: SimpleErrorResponse = conflictResponse;
export const rateLimitErrorResponse: SimpleErrorResponse = rateLimitResponse;

export const errorResponseSummary = {
  generic: genericErrorResponse.error,
  unauthorized: unauthorizedErrorResponse.error,
  forbidden: forbiddenErrorResponse.error,
  conflict: conflictErrorResponse.error,
  rateLimit: rateLimitErrorResponse.error
};

if (errorResponseSummary.forbidden !== "Owner role required") {
  throw new Error("typed package forbidden response drifted from the published sample");
}
