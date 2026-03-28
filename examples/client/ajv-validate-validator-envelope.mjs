import Ajv2020 from "ajv/dist/2020.js";

import capsuleSchema from "../../schemas/capsule-schema.json" with { type: "json" };
import neuroSchema from "../../schemas/neuro-concentrate.schema.json" with { type: "json" };
import validatorSchema from "../../schemas/validator-api-envelopes.schema.json" with { type: "json" };
import validateSingleRequest from "../api/validate-request.single.json" with { type: "json" };
import validatePassResponse from "../api/validate-response.pass.json" with { type: "json" };

const ajv = new Ajv2020({ allErrors: true, strict: true });

ajv.addSchema(neuroSchema);
ajv.addSchema(capsuleSchema);
ajv.addSchema(validatorSchema);

const validateRequest = ajv.compile({ $ref: `${validatorSchema.$id}#/$defs/validateSingleRequest` });
const validatePass = ajv.compile({ $ref: `${validatorSchema.$id}#/$defs/validatePassResponse` });

if (!validateRequest(validateSingleRequest)) {
  console.error(validateRequest.errors);
  process.exit(1);
}

if (!validatePass(validatePassResponse)) {
  console.error(validatePass.errors);
  process.exit(1);
}

console.log("AJV OK: validator request and pass-response payloads match the published envelope schema bundle");

