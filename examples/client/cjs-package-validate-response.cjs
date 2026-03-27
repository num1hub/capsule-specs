const { validatePassResponseSchema } = require("@num1hub/capsule-specs/zod/validator-api");
const response = require("../api/validate-response.pass.json");

const parsed = validatePassResponseSchema.parse(response);

console.log({
  valid: parsed.valid,
  appliedFixes: parsed.appliedFixes.length,
  warnings: parsed.warnings.length
});
