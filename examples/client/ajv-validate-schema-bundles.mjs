import Ajv2020 from "ajv/dist/2020.js";

import capsuleBundle from "../../schemas/capsule-schema.bundle.json" with { type: "json" };
import validatorBundle from "../../schemas/validator-api-envelopes.bundle.json" with { type: "json" };
import note from "../example-note.capsule.json" with { type: "json" };
import validateSingleRequest from "../api/validate-request.single.json" with { type: "json" };
import validatePassResponse from "../api/validate-response.pass.json" with { type: "json" };

const ajv = new Ajv2020({ allErrors: true, strict: true });

ajv.addSchema(capsuleBundle);
ajv.addSchema(validatorBundle);

const validateCapsule = ajv.getSchema(capsuleBundle.$id) ?? ajv.compile(capsuleBundle);
const validateRequest = ajv.compile({ $ref: `${validatorBundle.$id}#/$defs/validateSingleRequest` });
const validatePass = ajv.compile({ $ref: `${validatorBundle.$id}#/$defs/validatePassResponse` });

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

console.log("AJV OK: single-file schema bundles validate published capsule and validator-envelope examples");
