const {
  validateBatchResponseSchema,
  validateFailResponseSchema,
  validateFixResponseSchema,
  validatePassResponseSchema
} = require("@num1hub/capsule-specs/zod/validator-api");
const passResponse = require("@num1hub/capsule-specs/examples/api/validate-response.pass.json");
const failResponse = require("@num1hub/capsule-specs/examples/api/validate-response.fail.json");
const batchResponse = require("@num1hub/capsule-specs/examples/api/validate-response.batch.json");
const fixResponse = require("@num1hub/capsule-specs/examples/api/validate-response.fix.sample.json");

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

if (validateResponseSummary.failGate !== "G16") {
  throw new Error("package fail response drifted from the documented G16 example");
}

console.log(validateResponseSummary);
