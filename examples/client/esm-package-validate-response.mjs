import * as validatorProjection from "@num1hub/capsule-specs/zod/validator-api";
import response from "@num1hub/capsule-specs/examples/api/validate-response.pass.json" with { type: "json" };

const validatePassResponseSchema =
  validatorProjection.validatePassResponseSchema ??
  validatorProjection.default?.validatePassResponseSchema;

if (!validatePassResponseSchema) {
  throw new Error("expected ESM package exports to expose validatePassResponseSchema");
}

const parsed = validatePassResponseSchema.parse(response);
console.log(parsed.valid);
