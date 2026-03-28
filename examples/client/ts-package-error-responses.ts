import type { SimpleErrorResponse } from "@num1hub/capsule-specs/typescript/validator-api";

export const genericErrorResponse: SimpleErrorResponse = {
  error: "Invalid validation payload"
};

export const unauthorizedErrorResponse: SimpleErrorResponse = {
  error: "Unauthorized"
};

export const conflictErrorResponse: SimpleErrorResponse = {
  error: "Validation request conflicts with current state"
};

export const rateLimitErrorResponse: SimpleErrorResponse = {
  error: "Rate limit exceeded"
};

export const errorResponseSummary = {
  generic: genericErrorResponse.error,
  unauthorized: unauthorizedErrorResponse.error,
  conflict: conflictErrorResponse.error,
  rateLimit: rateLimitErrorResponse.error
};

if (errorResponseSummary.conflict !== "Validation request conflicts with current state") {
  throw new Error("typed package conflict response drifted from the bounded public message");
}
