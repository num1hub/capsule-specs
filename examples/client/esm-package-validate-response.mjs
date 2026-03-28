import * as validatorProjection from "@num1hub/capsule-specs/zod/validator-api";
import passResponse from "@num1hub/capsule-specs/examples/api/validate-response.pass.json" with { type: "json" };
import failResponse from "@num1hub/capsule-specs/examples/api/validate-response.fail.json" with { type: "json" };
import batchResponse from "@num1hub/capsule-specs/examples/api/validate-response.batch.json" with { type: "json" };
import fixResponse from "@num1hub/capsule-specs/examples/api/validate-response.fix.sample.json" with { type: "json" };

const validatePassResponseSchema =
  validatorProjection.validatePassResponseSchema ??
  validatorProjection.default?.validatePassResponseSchema;
const validateFailResponseSchema =
  validatorProjection.validateFailResponseSchema ??
  validatorProjection.default?.validateFailResponseSchema;
const validateBatchResponseSchema =
  validatorProjection.validateBatchResponseSchema ??
  validatorProjection.default?.validateBatchResponseSchema;
const validateFixResponseSchema =
  validatorProjection.validateFixResponseSchema ??
  validatorProjection.default?.validateFixResponseSchema;

if (!validatePassResponseSchema || !validateFailResponseSchema || !validateBatchResponseSchema || !validateFixResponseSchema) {
  throw new Error("expected ESM package exports to expose validatePassResponseSchema");
}

const parsedPassResponse = validatePassResponseSchema.parse(passResponse);
const parsedFailResponse = validateFailResponseSchema.parse(failResponse);
const parsedBatchResponse = validateBatchResponseSchema.parse(batchResponse);
const parsedFixResponse = validateFixResponseSchema.parse(fixResponse);

const validateResponseSummary = {
  passValid: parsedPassResponse.valid,
  failGate: parsedFailResponse.errors[0]?.gate,
  batchInvalid: parsedBatchResponse.summary.invalid,
  fixedCapsuleId: parsedFixResponse.fixedCapsule.metadata.capsule_id
};

if (validateResponseSummary.fixedCapsuleId !== "capsule.example.validator-invalid-g16.v1") {
  throw new Error("package fix response drifted from the published repaired capsule id");
}

console.log(validateResponseSummary);
