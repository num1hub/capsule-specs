import Ajv2020 from "ajv/dist/2020.js";

import capsuleSchema from "@num1hub/capsule-specs/schemas/capsule-schema.json" with { type: "json" };
import neuroSchema from "@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json" with { type: "json" };
import validatorSchema from "@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json" with { type: "json" };
import note from "@num1hub/capsule-specs/examples/example-note.capsule.json" with { type: "json" };
import validateSingleRequest from "@num1hub/capsule-specs/examples/api/validate-request.single.json" with { type: "json" };
import validatePassResponse from "@num1hub/capsule-specs/examples/api/validate-response.pass.json" with { type: "json" };

const ajv = new Ajv2020({ allErrors: true, strict: true });

ajv.addSchema(neuroSchema);
ajv.addSchema(capsuleSchema);
ajv.addSchema(validatorSchema);

const validateCapsule = ajv.getSchema(capsuleSchema.$id) ?? ajv.compile(capsuleSchema);
const validateRequest = ajv.compile({ $ref: `${validatorSchema.$id}#/$defs/validateSingleRequest` });
const validatePass = ajv.compile({ $ref: `${validatorSchema.$id}#/$defs/validatePassResponse` });

if (!validateCapsule(note)) {
  console.error(validateCapsule.errors);
  process.exit(1);
}

if (!validateRequest(validateSingleRequest)) {
  console.error(validateRequest.errors);
  process.exit(1);
}

if (!validatePass(validatePassResponse)) {
  console.error(validatePass.errors);
  process.exit(1);
}

console.log("AJV OK: installed package schema exports validate capsule and validator-envelope examples");

