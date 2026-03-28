import Ajv2020 from 'ajv/dist/2020.js';
import capsuleSchema from '../../schemas/capsule-schema.json' with { type: 'json' };
import neuroSchema from '../../schemas/neuro-concentrate.schema.json' with { type: 'json' };
import validatorSchema from '../../schemas/validator-api-envelopes.schema.json' with { type: 'json' };
import invalidSingleRequest from '../api-invalid/validate-request.single.missing-capsule.json' with { type: 'json' };
import invalidFailResponse from '../api-invalid/validate-response.fail.invalid-gate.json' with { type: 'json' };

const ajv = new Ajv2020({ allErrors: true, strict: true });
ajv.addSchema(neuroSchema);
ajv.addSchema(capsuleSchema);
ajv.addSchema(validatorSchema);

const validateSingleRequest = ajv.getSchema(`${validatorSchema.$id}#/$defs/validateSingleRequest`);
const validateFailResponse = ajv.getSchema(`${validatorSchema.$id}#/$defs/validateFailResponse`);

if (!validateSingleRequest || !validateFailResponse) {
  throw new Error('validator envelope subschemas are not available');
}

const singleRequestValid = validateSingleRequest(invalidSingleRequest);
if (singleRequestValid !== false) {
  throw new Error('missing-capsule request should fail schema validation');
}

if (!(validateSingleRequest.errors ?? []).some((error) => error.keyword === 'required' && error.params?.missingProperty === 'capsule')) {
  throw new Error('missing-capsule request should fail because capsule is required');
}

const failResponseValid = validateFailResponse(invalidFailResponse);
if (failResponseValid !== false) {
  throw new Error('invalid-gate fail response should fail schema validation');
}

if (
  !(validateFailResponse.errors ?? []).some(
    (error) => error.keyword === 'pattern' && error.instancePath === '/errors/0/gate'
  )
) {
  throw new Error('invalid-gate fail response should fail because the gate field does not match the public pattern');
}

console.log('OK: rejected invalid validator envelope fixtures from repo-local schema files');
