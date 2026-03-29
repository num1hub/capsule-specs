const Ajv2020 = require("ajv/dist/2020").default;

const capsuleSchema = require("@num1hub/capsule-specs/schemas/capsule-schema.json");
const neuroSchema = require("@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json");
const validatorSchema = require("@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json");
const note = require("@num1hub/capsule-specs/examples/example-note.capsule.json");
const validateSingleRequest = require("@num1hub/capsule-specs/examples/api/validate-request.single.json");
const validatePassResponse = require("@num1hub/capsule-specs/examples/api/validate-response.pass.json");

const ajv = new Ajv2020({ allErrors: true, strict: true });

ajv.addSchema(neuroSchema);
ajv.addSchema(capsuleSchema);
ajv.addSchema(validatorSchema);

const validateCapsule = ajv.getSchema(capsuleSchema.$id) ?? ajv.compile(capsuleSchema);
const validateRequest = ajv.compile({ $ref: `${validatorSchema.$id}#/$defs/validateSingleRequest` });
const validatePass = ajv.compile({ $ref: `${validatorSchema.$id}#/$defs/validatePassResponse` });

if (!validateCapsule(note)) {
  throw new Error(JSON.stringify(validateCapsule.errors));
}

if (!validateRequest(validateSingleRequest)) {
  throw new Error(JSON.stringify(validateRequest.errors));
}

if (!validatePass(validatePassResponse)) {
  throw new Error(JSON.stringify(validatePass.errors));
}

console.log({
  validatedCapsuleId: note.metadata.capsule_id,
  validatedRequestKind: "single",
  validatedPassHashLength: validatePassResponse.computedHash.length
});
