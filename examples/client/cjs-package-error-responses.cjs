const { simpleErrorResponseSchema } = require("@num1hub/capsule-specs/zod/validator-api");
const conflictResponse = require("@num1hub/capsule-specs/examples/api/conflict-response.sample.json");
const errorResponse = require("@num1hub/capsule-specs/examples/api/error-response.sample.json");
const rateLimitResponse = require("@num1hub/capsule-specs/examples/api/rate-limit-response.sample.json");
const unauthorizedResponse = require("@num1hub/capsule-specs/examples/api/unauthorized-response.sample.json");

const parsedResponses = [
  simpleErrorResponseSchema.parse(errorResponse),
  simpleErrorResponseSchema.parse(unauthorizedResponse),
  simpleErrorResponseSchema.parse(conflictResponse),
  simpleErrorResponseSchema.parse(rateLimitResponse)
];

if (parsedResponses[1].error !== "Unauthorized") {
  throw new Error("missing unauthorized package error response");
}

console.log({
  errorFamilies: parsedResponses.map((response) => response.error)
});
