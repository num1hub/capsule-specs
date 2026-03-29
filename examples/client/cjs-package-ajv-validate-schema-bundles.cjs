const Ajv2020 = require("ajv/dist/2020").default;

const capsuleBundle = require("@num1hub/capsule-specs/schemas/capsule-schema.bundle.json");
const validatorBundle = require("@num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json");
const note = require("@num1hub/capsule-specs/examples/example-note.capsule.json");
const validateSingleRequest = require("@num1hub/capsule-specs/examples/api/validate-request.single.json");
const validatePassResponse = require("@num1hub/capsule-specs/examples/api/validate-response.pass.json");

const ajv = new Ajv2020({ allErrors: true, strict: true });

ajv.addSchema(capsuleBundle);
ajv.addSchema(validatorBundle);

const validateCapsule = ajv.getSchema(capsuleBundle.$id) ?? ajv.compile(capsuleBundle);
const validateRequest = ajv.compile({ $ref: `${validatorBundle.$id}#/$defs/validateSingleRequest` });
const validatePass = ajv.compile({ $ref: `${validatorBundle.$id}#/$defs/validatePassResponse` });

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
  requestKind: "single",
  validatedPassHashLength: validatePassResponse.computedHash.length
});
