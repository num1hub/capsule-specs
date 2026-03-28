#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function sameArray(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

const pkg = readJson('package.json');
const capsuleSchema = readJson('schemas/capsule-schema.json');
const neuroSchema = readJson('schemas/neuro-concentrate.schema.json');
const validatorSchema = readJson('schemas/validator-api-envelopes.schema.json');
const constants = readJson('references/contract-constants.json');
const gates = readJson('references/validation-gates.json');
const envelopeFamilies = readJson('references/validator-envelope-families.json');
const routes = readJson('references/validator-routes.json');
const gatesDoc = readText('docs/16-gates.md');
const apiDoc = readText('docs/api-envelopes.md');
const referencePackDoc = readText('docs/reference-pack.md');
const routeDoc = readText('docs/route-reference.md');
const openapiDoc = readText('docs/openapi.md');
const openapi = readJson('openapi/validate.openapi.json');

const expectedRootKeys = capsuleSchema.required;
const expectedTypes = capsuleSchema.properties.metadata.properties.type.enum;
const expectedSubtypes = capsuleSchema.properties.metadata.properties.subtype.enum;
const expectedStatuses = capsuleSchema.properties.metadata.properties.status.enum;
const expectedSemanticHashPattern = capsuleSchema.properties.metadata.properties.semantic_hash.pattern;
const expectedRelationTypes = capsuleSchema.properties.recursive_layer.properties.links.items.properties.relation_type.enum;
const expectedConfidenceDimensions = neuroSchema.properties.confidence_vector.required;
const expectedValidationOptionFlags = Object.keys(validatorSchema['$defs'].validationOptions.properties);
const expectedGateSeverityEnum = validatorSchema['$defs'].gateDescriptor.properties.severity.enum;
const expectedIntegrityPattern = capsuleSchema.properties.integrity_sha3_512.pattern;
const expectedIntegrityPayloadRootKeys = expectedRootKeys.slice(0, 4);

const expectedFamilies = [
  {
    id: 'structural',
    label: 'Structural gates',
    gate_ids: ['G01', 'G02', 'G03', 'G04', 'G05', 'G06']
  },
  {
    id: 'neuro-semantic',
    label: 'Neuro and semantic gates',
    gate_ids: ['G07', 'G08', 'G09', 'G10', 'G11']
  },
  {
    id: 'topology-confidence',
    label: 'Topology and confidence gates',
    gate_ids: ['G12', 'G13', 'G14', 'G15']
  },
  {
    id: 'cryptographic',
    label: 'Cryptographic gate',
    gate_ids: ['G16']
  }
];

const expectedGates = [
  ['G01', 'structural', 'exactly five root keys'],
  ['G02', 'structural', 'required subfields present'],
  ['G03', 'structural', 'types, enums, and versions match the canonical contract'],
  ['G04', 'structural', 'provenance coverage is high enough and source metadata is present when required'],
  ['G05', 'structural', 'content type is recognized or at least structurally acceptable'],
  ['G06', 'structural', 'payload integrity rules are satisfied'],
  ['G07', 'neuro-semantic', 'summary length is within the allowed range'],
  ['G08', 'neuro-semantic', 'keywords count is within the allowed range'],
  ['G09', 'neuro-semantic', 'semantic hash format is valid'],
  ['G10', 'neuro-semantic', 'semantic hash parity holds between metadata and neuro layer'],
  ['G11', 'neuro-semantic', 'relation types are canonical'],
  ['G12', 'topology-confidence', 'linked target IDs resolve when known-ID validation is active'],
  ['G13', 'topology-confidence', 'non-draft capsules include at least one outbound link'],
  ['G14', 'topology-confidence', 'long capsules cannot claim unrealistically perfect coherence'],
  ['G15', 'topology-confidence', 'the confidence vector has the right shape and value bounds'],
  ['G16', 'cryptographic', '`integrity_sha3_512` matches the recomputed SHA3-512 hash over the canonicalized first four roots']
];

const expectedRoutes = [
  {
    id: 'validateSingle',
    method: 'POST',
    path: '/api/validate',
    requires_bearer_auth: true,
    request_body_required: true,
    request_family_id: 'validateSingleRequest',
    query_parameters: [],
    request_example: 'examples/api/validate-request.single.json',
    response_examples: ['examples/api/validate-response.pass.json', 'examples/api/validate-response.fail.json'],
    response_statuses: [
      {
        status: 200,
        description: 'Validation result',
        family_ids: ['validatePassResponse', 'validateFailResponse'],
        example_files: ['examples/api/validate-response.pass.json', 'examples/api/validate-response.fail.json']
      },
      {
        status: 400,
        description: 'Invalid validation payload',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/error-response.sample.json']
      },
      {
        status: 401,
        description: 'Authorization required',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/unauthorized-response.sample.json']
      },
      {
        status: 429,
        description: 'Rate limit exceeded',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/rate-limit-response.sample.json']
      }
    ]
  },
  {
    id: 'validateBatch',
    method: 'POST',
    path: '/api/validate/batch',
    requires_bearer_auth: true,
    request_body_required: true,
    request_family_id: 'validateBatchRequest',
    query_parameters: [],
    request_example: 'examples/api/validate-request.batch.json',
    response_examples: ['examples/api/validate-response.batch.json'],
    response_statuses: [
      {
        status: 200,
        description: 'Batch validation result',
        family_ids: ['validateBatchResponse'],
        example_files: ['examples/api/validate-response.batch.json']
      },
      {
        status: 400,
        description: 'Invalid batch payload',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/error-response.sample.json']
      },
      {
        status: 401,
        description: 'Authorization required',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/unauthorized-response.sample.json']
      },
      {
        status: 403,
        description: 'Owner role required',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/forbidden-response.sample.json']
      },
      {
        status: 429,
        description: 'Rate limit exceeded',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/rate-limit-response.sample.json']
      }
    ]
  },
  {
    id: 'validateFix',
    method: 'POST',
    path: '/api/validate/fix',
    requires_bearer_auth: true,
    request_body_required: true,
    request_family_id: 'validateFixRequest',
    query_parameters: [],
    request_example: 'examples/api/validate-request.fix.json',
    response_examples: ['examples/api/validate-response.fix.sample.json'],
    response_statuses: [
      {
        status: 200,
        description: 'Fixed payload with validation result',
        family_ids: ['validateFixResponse'],
        example_files: ['examples/api/validate-response.fix.sample.json']
      },
      {
        status: 400,
        description: 'Invalid fix payload',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/error-response.sample.json']
      },
      {
        status: 401,
        description: 'Authorization required',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/unauthorized-response.sample.json']
      },
      {
        status: 403,
        description: 'Owner role required',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/forbidden-response.sample.json']
      },
      {
        status: 429,
        description: 'Rate limit exceeded',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/rate-limit-response.sample.json']
      }
    ]
  },
  {
    id: 'getStats',
    method: 'GET',
    path: '/api/validate/stats',
    requires_bearer_auth: true,
    request_body_required: false,
    request_family_id: null,
    query_parameters: [
      {
        name: 'limit',
        in: 'query',
        required: false,
        type: 'integer',
        minimum: 1,
        description: 'Maximum number of validation log entries to aggregate. Defaults to 500.'
      }
    ],
    request_example: null,
    response_examples: ['examples/api/stats-response.sample.json'],
    response_statuses: [
      {
        status: 200,
        description: 'Validation stats payload',
        family_ids: ['statsResponse'],
        example_files: ['examples/api/stats-response.sample.json']
      },
      {
        status: 401,
        description: 'Authorization required',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/unauthorized-response.sample.json']
      },
      {
        status: 429,
        description: 'Rate limit exceeded',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/rate-limit-response.sample.json']
      },
      {
        status: 500,
        description: 'Stats computation failed',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/stats-error-response.sample.json']
      }
    ]
  },
  {
    id: 'getGates',
    method: 'GET',
    path: '/api/validate/gates',
    requires_bearer_auth: true,
    request_body_required: false,
    request_family_id: null,
    query_parameters: [],
    request_example: null,
    response_examples: ['examples/api/gates-response.sample.json'],
    response_statuses: [
      {
        status: 200,
        description: 'Gate metadata payload',
        family_ids: ['gatesResponse'],
        example_files: ['examples/api/gates-response.sample.json']
      },
      {
        status: 401,
        description: 'Authorization required',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/unauthorized-response.sample.json']
      },
      {
        status: 429,
        description: 'Rate limit exceeded',
        family_ids: ['simpleErrorResponse'],
        example_files: ['examples/api/rate-limit-response.sample.json']
      }
    ]
  }
];

const expectedRequestFamilies = [
  ['validateSingleRequest', ['validateSingle'], '#/$defs/validateSingleRequest', ['examples/api/validate-request.single.json']],
  ['validateBatchRequest', ['validateBatch'], '#/$defs/validateBatchRequest', ['examples/api/validate-request.batch.json']],
  ['validateFixRequest', ['validateFix'], '#/$defs/validateFixRequest', ['examples/api/validate-request.fix.json']]
];

const expectedResponseFamilies = [
  ['validatePassResponse', ['validateSingle'], '#/$defs/validatePassResponse', ['examples/api/validate-response.pass.json']],
  ['validateFailResponse', ['validateSingle'], '#/$defs/validateFailResponse', ['examples/api/validate-response.fail.json']],
  ['validateBatchResponse', ['validateBatch'], '#/$defs/validateBatchResponse', ['examples/api/validate-response.batch.json']],
  ['validateFixResponse', ['validateFix'], '#/$defs/validateFixResponse', ['examples/api/validate-response.fix.sample.json']],
  ['gatesResponse', ['getGates'], '#/$defs/gatesResponse', ['examples/api/gates-response.sample.json']],
  ['statsResponse', ['getStats'], '#/$defs/statsResponse', ['examples/api/stats-response.sample.json']],
  [
    'simpleErrorResponse',
    ['validateSingle', 'validateBatch', 'validateFix', 'getStats', 'getGates'],
    '#/$defs/simpleErrorResponse',
    [
      'examples/api/error-response.sample.json',
      'examples/api/unauthorized-response.sample.json',
      'examples/api/forbidden-response.sample.json',
      'examples/api/conflict-response.sample.json',
      'examples/api/rate-limit-response.sample.json',
      'examples/api/stats-error-response.sample.json'
    ]
  ]
];

const expectedSharedDefinitions = [
  ['validationOptions', '#/$defs/validationOptions', ['validateSingleRequest', 'validateBatchRequest', 'validateFixRequest']],
  ['validatorIssue', '#/$defs/validatorIssue', ['validatePassResponse', 'validateFailResponse', 'validateBatchResponse', 'validateFixResponse']],
  ['warningItem', '#/$defs/warningItem', ['validatePassResponse', 'validateFailResponse', 'validateBatchResponse', 'validateFixResponse']],
  ['gateDescriptor', '#/$defs/gateDescriptor', ['gatesResponse']]
];

assert(constants.version === pkg.version, 'contract-constants version must match package.json version');
assert(gates.version === pkg.version, 'validation-gates version must match package.json version');
assert(envelopeFamilies.version === pkg.version, 'validator-envelope-families version must match package.json version');
assert(routes.version === pkg.version, 'validator-routes version must match package.json version');

assert(sameArray(constants.capsule_root_keys, expectedRootKeys), 'contract-constants capsule_root_keys must match schema required roots');
assert(sameArray(constants.metadata.type_enum, expectedTypes), 'contract-constants metadata.type_enum must match schema enum');
assert(sameArray(constants.metadata.subtype_enum, expectedSubtypes), 'contract-constants metadata.subtype_enum must match schema enum');
assert(sameArray(constants.metadata.status_enum, expectedStatuses), 'contract-constants metadata.status_enum must match schema enum');
assert(constants.metadata.semantic_hash_pattern === expectedSemanticHashPattern, 'contract-constants semantic_hash_pattern must match schema pattern');
assert(sameArray(constants.relation_types, expectedRelationTypes), 'contract-constants relation_types must match schema enum');
assert(sameArray(constants.confidence_vector.dimensions, expectedConfidenceDimensions), 'contract-constants confidence_vector dimensions must match neuro schema');
assert(constants.confidence_vector.minimum === 0, 'contract-constants confidence_vector minimum must be 0');
assert(constants.confidence_vector.maximum === 1, 'contract-constants confidence_vector maximum must be 1');
assert(sameArray(constants.validator.validation_option_flags, expectedValidationOptionFlags), 'contract-constants validation_option_flags must match validator schema');
assert(sameArray(constants.validator.gate_severity_enum, expectedGateSeverityEnum), 'contract-constants gate_severity_enum must match validator schema');
assert(sameArray(constants.validator.integrity_payload_root_keys, expectedIntegrityPayloadRootKeys), 'contract-constants integrity_payload_root_keys must match the first four capsule roots');
assert(constants.validator.integrity_canonicalization === 'sorted-key-json', 'contract-constants integrity_canonicalization must stay sorted-key-json');
assert(constants.validator.integrity_sha3_512_pattern === expectedIntegrityPattern, 'contract-constants integrity pattern must match capsule schema');

assert(Array.isArray(gates.families) && sameArray(gates.families, expectedFamilies), 'validation-gates families must match the expected gate-family map');
assert(Array.isArray(gates.gates) && gates.gates.length === expectedGates.length, 'validation-gates must publish all 16 gates');
assert(Array.isArray(envelopeFamilies.request_families) && envelopeFamilies.request_families.length === expectedRequestFamilies.length, 'validator-envelope-families must publish all request families');
assert(Array.isArray(envelopeFamilies.response_families) && envelopeFamilies.response_families.length === expectedResponseFamilies.length, 'validator-envelope-families must publish all response families');
assert(Array.isArray(envelopeFamilies.shared_definitions) && envelopeFamilies.shared_definitions.length === expectedSharedDefinitions.length, 'validator-envelope-families must publish all shared definitions');
assert(Array.isArray(routes.routes) && routes.routes.length === expectedRoutes.length, 'validator-routes must publish all 5 routes');
assert(referencePackDoc.includes('validator-envelope-families.json'), 'docs/reference-pack.md must mention validator-envelope-families.json');
assert(referencePackDoc.includes('response status'), 'docs/reference-pack.md must describe validator route response-status coverage');
assert(apiDoc.includes('validator-envelope-families.json'), 'docs/api-envelopes.md must mention validator-envelope-families.json');
assert(apiDoc.includes('response-status-to-envelope'), 'docs/api-envelopes.md must describe compact route response-status coverage');

for (const [index, [id, family, summary]] of expectedGates.entries()) {
  const gate = gates.gates[index];
  assert(gate.id === id, `validation-gates gate ${index} must have id ${id}`);
  assert(gate.family === family, `validation-gates ${id} must belong to ${family}`);
  assert(gate.summary === summary, `validation-gates ${id} summary must match expected public summary`);
  assert(gatesDoc.includes(`- \`${id}\`: ${summary}`), `docs/16-gates.md must contain ${id} summary`);
}

const coveredGateIds = new Set(gates.gates.map((gate) => gate.id));
for (const family of gates.families) {
  for (const gateId of family.gate_ids) {
    assert(coveredGateIds.has(gateId), `validation-gates family ${family.id} references unknown gate ${gateId}`);
  }
}

const publishedRequestFamilyIds = new Set(expectedRequestFamilies.map(([id]) => id));
const publishedResponseFamilyIds = new Set(expectedResponseFamilies.map(([id]) => id));

for (const [index, expectedRoute] of expectedRoutes.entries()) {
  const route = routes.routes[index];
  const operation = openapi.paths?.[expectedRoute.path]?.[expectedRoute.method.toLowerCase()];

  assert(route.id === expectedRoute.id, `validator-routes route ${index} must have id ${expectedRoute.id}`);
  assert(route.method === expectedRoute.method, `validator-routes ${expectedRoute.id} must use ${expectedRoute.method}`);
  assert(route.path === expectedRoute.path, `validator-routes ${expectedRoute.id} must use path ${expectedRoute.path}`);
  assert(route.requires_bearer_auth === expectedRoute.requires_bearer_auth, `validator-routes ${expectedRoute.id} must publish bearer-auth posture`);
  assert(route.request_body_required === expectedRoute.request_body_required, `validator-routes ${expectedRoute.id} must publish request-body requirement`);
  assert(route.request_family_id === expectedRoute.request_family_id, `validator-routes ${expectedRoute.id} request family must match expected public family`);
  if (expectedRoute.request_example) {
    assert(route.request_example === expectedRoute.request_example, `validator-routes ${expectedRoute.id} request example must match expected public example`);
  }
  assert(sameArray(route.query_parameters, expectedRoute.query_parameters), `validator-routes ${expectedRoute.id} query parameters must match expected public metadata`);
  assert(sameArray(route.response_examples, expectedRoute.response_examples), `validator-routes ${expectedRoute.id} response examples must match expected public examples`);
  assert(sameArray(route.response_statuses, expectedRoute.response_statuses), `validator-routes ${expectedRoute.id} response status map must match expected public metadata`);
  assert(Boolean(operation), `OpenAPI must publish ${expectedRoute.method} ${expectedRoute.path}`);
  assert(routeDoc.includes(`## \`${expectedRoute.method} ${expectedRoute.path}\``), `docs/route-reference.md must include ${expectedRoute.method} ${expectedRoute.path}`);
  assert(openapiDoc.includes(`- \`${expectedRoute.method} ${expectedRoute.path}\``), `docs/openapi.md must include ${expectedRoute.method} ${expectedRoute.path}`);
  assert(routeDoc.includes('Compact route behavior'), 'docs/route-reference.md must describe the compact route behavior layer');
  if (expectedRoute.request_family_id) {
    assert(publishedRequestFamilyIds.has(expectedRoute.request_family_id), `validator-routes ${expectedRoute.id} request family must exist in validator-envelope-families`);
  }

  const openapiQueryParameters = (operation.parameters || []).map((parameter) => ({
    name: parameter.name,
    in: parameter.in,
    required: Boolean(parameter.required),
    type: parameter.schema?.type ?? null,
    minimum: parameter.schema?.minimum ?? null,
    description: parameter.description
  }));

  assert(sameArray(openapiQueryParameters, expectedRoute.query_parameters), `OpenAPI query parameters for ${expectedRoute.id} must match compact route metadata`);
  assert(Array.isArray(operation.security) && operation.security.some((entry) => entry.bearerAuth), `OpenAPI ${expectedRoute.id} must require bearerAuth`);
  if (expectedRoute.request_body_required) {
    assert(operation.requestBody?.required === true, `OpenAPI ${expectedRoute.id} requestBody must stay required`);
  } else {
    assert(!operation.requestBody, `OpenAPI ${expectedRoute.id} must not require a request body`);
  }

  for (const responseStatus of route.response_statuses) {
    const openapiResponse = operation.responses?.[String(responseStatus.status)];
    assert(Boolean(openapiResponse), `OpenAPI ${expectedRoute.id} must publish response status ${responseStatus.status}`);
    assert(
      openapiResponse.description === responseStatus.description,
      `validator-routes ${expectedRoute.id} status ${responseStatus.status} description must match OpenAPI`
    );
    for (const familyId of responseStatus.family_ids) {
      assert(
        publishedResponseFamilyIds.has(familyId),
        `validator-routes ${expectedRoute.id} status ${responseStatus.status} must reference published response family ${familyId}`
      );
    }
  }
}

for (const [index, [id, routeIds, schemaRef, exampleFiles]] of expectedRequestFamilies.entries()) {
  const family = envelopeFamilies.request_families[index];
  assert(family.id === id, `validator-envelope-families request family ${index} must have id ${id}`);
  assert(sameArray(family.route_ids, routeIds), `validator-envelope-families ${id} route_ids must match expected route ids`);
  assert(family.schema_ref === schemaRef, `validator-envelope-families ${id} schema_ref must match expected schema ref`);
  assert(sameArray(family.example_files, exampleFiles), `validator-envelope-families ${id} example files must match expected examples`);
  assert(Boolean(validatorSchema.$defs?.[id]), `validator schema must publish ${id}`);
  assert(apiDoc.includes(`\`${id}\``), `docs/api-envelopes.md must mention ${id}`);
}

for (const [index, [id, routeIds, schemaRef, exampleFiles]] of expectedResponseFamilies.entries()) {
  const family = envelopeFamilies.response_families[index];
  assert(family.id === id, `validator-envelope-families response family ${index} must have id ${id}`);
  assert(sameArray(family.route_ids, routeIds), `validator-envelope-families ${id} route_ids must match expected route ids`);
  assert(family.schema_ref === schemaRef, `validator-envelope-families ${id} schema_ref must match expected schema ref`);
  assert(sameArray(family.example_files, exampleFiles), `validator-envelope-families ${id} example files must match expected examples`);
  assert(Boolean(validatorSchema.$defs?.[id]), `validator schema must publish ${id}`);
  assert(apiDoc.includes(`\`${id}\``), `docs/api-envelopes.md must mention ${id}`);
}

for (const [index, [id, schemaRef, usedBy]] of expectedSharedDefinitions.entries()) {
  const definition = envelopeFamilies.shared_definitions[index];
  assert(definition.id === id, `validator-envelope-families shared definition ${index} must have id ${id}`);
  assert(definition.schema_ref === schemaRef, `validator-envelope-families ${id} schema_ref must match expected schema ref`);
  assert(sameArray(definition.used_by, usedBy), `validator-envelope-families ${id} used_by must match expected family ids`);
  assert(Boolean(validatorSchema.$defs?.[id]), `validator schema must publish ${id}`);
  assert(apiDoc.includes(`\`${id}\``), `docs/api-envelopes.md must mention shared definition ${id}`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(
  `OK: checked reference pack constants, ${routes.routes.length} validator routes with status maps, ${gates.gates.length} validation gates, and ${envelopeFamilies.request_families.length + envelopeFamilies.response_families.length} validator envelope families`
);
