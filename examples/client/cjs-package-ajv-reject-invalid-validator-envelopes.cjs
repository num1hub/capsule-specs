const Ajv2020 = require("ajv/dist/2020").default;

const capsuleSchema = require("@num1hub/capsule-specs/schemas/capsule-schema.json");
const neuroSchema = require("@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json");
const validatorSchema = require("@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json");
const invalidSingleRequest = require("@num1hub/capsule-specs/examples/api-invalid/validate-request.single.missing-capsule.json");
const invalidFailResponse = require("@num1hub/capsule-specs/examples/api-invalid/validate-response.fail.invalid-gate.json");

const ajv = new Ajv2020({ allErrors: true, strict: true });
ajv.addSchema(neuroSchema);
ajv.addSchema(capsuleSchema);
ajv.addSchema(validatorSchema);

const validateSingleRequest = ajv.getSchema(`${validatorSchema.$id}#/$defs/validateSingleRequest`);
const validateFailResponse = ajv.getSchema(`${validatorSchema.$id}#/$defs/validateFailResponse`);

if (!validateSingleRequest || !validateFailResponse) {
  throw new Error("validator envelope subschemas are not available");
}

const invalidFixtures = [
  {
    label: "missing-capsule",
    payload: invalidSingleRequest,
    validate: validateSingleRequest,
    predicate: (error) => error.keyword === "required" && error.params?.missingProperty === "capsule"
  },
  {
    label: "invalid-gate",
    payload: invalidFailResponse,
    validate: validateFailResponse,
    predicate: (error) => error.keyword === "pattern" && error.instancePath === "/errors/0/gate"
  }
];

for (const fixture of invalidFixtures) {
  const valid = fixture.validate(fixture.payload);
  const errors = fixture.validate.errors ?? [];
  if (valid) {
    throw new Error(`expected ${fixture.label} validator envelope fixture to fail schema validation`);
  }
  if (!errors.some(fixture.predicate)) {
    throw new Error(`expected ${fixture.label} validator envelope fixture to fail with the documented schema error`);
  }
}

console.log({
  rejectedFixtures: invalidFixtures.map((fixture) => fixture.label)
});
