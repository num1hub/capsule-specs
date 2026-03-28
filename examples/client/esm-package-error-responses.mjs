import * as validatorProjection from "@num1hub/capsule-specs/zod/validator-api";
import conflictResponse from "@num1hub/capsule-specs/examples/api/conflict-response.sample.json" with { type: "json" };
import errorResponse from "@num1hub/capsule-specs/examples/api/error-response.sample.json" with { type: "json" };
import forbiddenResponse from "@num1hub/capsule-specs/examples/api/forbidden-response.sample.json" with { type: "json" };
import rateLimitResponse from "@num1hub/capsule-specs/examples/api/rate-limit-response.sample.json" with { type: "json" };
import unauthorizedResponse from "@num1hub/capsule-specs/examples/api/unauthorized-response.sample.json" with { type: "json" };

const simpleErrorResponseSchema =
  validatorProjection.simpleErrorResponseSchema ?? validatorProjection.default?.simpleErrorResponseSchema;

if (!simpleErrorResponseSchema) {
  throw new Error("expected ESM package exports to expose simpleErrorResponseSchema");
}

const parsedResponses = [
  simpleErrorResponseSchema.parse(errorResponse),
  simpleErrorResponseSchema.parse(unauthorizedResponse),
  simpleErrorResponseSchema.parse(forbiddenResponse),
  simpleErrorResponseSchema.parse(conflictResponse),
  simpleErrorResponseSchema.parse(rateLimitResponse)
];

if (parsedResponses[2].error !== "Owner role required") {
  throw new Error("missing forbidden package error response");
}

console.log({
  errorFamilies: parsedResponses.map((response) => response.error)
});
