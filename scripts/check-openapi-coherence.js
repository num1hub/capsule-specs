#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));
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

function normalizeParameters(parameters = []) {
  return parameters.map((parameter) => ({
    name: parameter.name,
    in: parameter.in,
    required: Boolean(parameter.required),
    type: parameter.schema?.type ?? null,
    minimum: parameter.schema?.minimum ?? null,
    description: parameter.description ?? null
  }));
}

function getRequestSchemaRef(operation) {
  return operation?.requestBody?.content?.['application/json']?.schema?.$ref ?? null;
}

function getResponseSchemaRef(response) {
  return response?.content?.['application/json']?.schema?.$ref ?? null;
}

function hasBearerAuth(operation) {
  return Array.isArray(operation?.security) && operation.security.some((entry) => Object.prototype.hasOwnProperty.call(entry, 'bearerAuth'));
}

const pkg = readJson('package.json');
const routes = readJson('references/validator-routes.json');
const envelopeFamilies = readJson('references/validator-envelope-families.json');
const openapi = readJson('openapi/validate.openapi.json');

const requestSchemaRefsByFamilyId = {
  validateSingleRequest: '#/components/schemas/ValidateRequest',
  validateBatchRequest: '#/components/schemas/BatchValidateRequest',
  validateFixRequest: '#/components/schemas/FixRequest'
};

const responseSchemaRefsByFamilyId = {
  validatePassResponse: new Set(['#/components/schemas/ValidateResponse']),
  validateFailResponse: new Set(['#/components/schemas/ValidateResponse']),
  validateBatchResponse: new Set(['#/components/schemas/BatchValidationResponse']),
  validateFixResponse: new Set(['#/components/schemas/ValidateResponse']),
  gatesResponse: new Set(['#/components/schemas/GatesResponse']),
  statsResponse: new Set(['#/components/schemas/ValidationStatsResponse']),
  simpleErrorResponse: new Set(['#/components/schemas/ErrorResponse', '#/components/schemas/RateLimitErrorResponse'])
};

assert(routes.version === pkg.version, 'validator-routes version must match package.json version');
assert(envelopeFamilies.version === pkg.version, 'validator-envelope-families version must match package.json version');
assert(typeof openapi.info?.version === 'string' && openapi.info.version.length > 0, 'OpenAPI info.version must be present');

const routeMap = new Map(routes.routes.map((route) => [route.id, route]));
const responseFamilyMap = new Map(envelopeFamilies.response_families.map((family) => [family.id, family]));

for (const route of routes.routes) {
  const operation = openapi.paths?.[route.path]?.[route.method.toLowerCase()];

  assert(Boolean(operation), `OpenAPI must publish ${route.method} ${route.path}`);

  if (!operation) {
    continue;
  }

  assert(hasBearerAuth(operation) === route.requires_bearer_auth, `OpenAPI auth posture for ${route.id} must match validator-routes`);
  assert(Boolean(operation.requestBody) === route.request_body_required, `OpenAPI requestBody presence for ${route.id} must match validator-routes`);

  if (route.request_family_id) {
    const expectedRequestRef = requestSchemaRefsByFamilyId[route.request_family_id];
    assert(Boolean(expectedRequestRef), `validator-routes ${route.id} must use a published request-family OpenAPI mapping`);
    assert(route.request_body_required === true, `validator-routes ${route.id} must require a request body when request_family_id is present`);
    assert(getRequestSchemaRef(operation) === expectedRequestRef, `OpenAPI request schema for ${route.id} must match request family ${route.request_family_id}`);
    assert(operation.requestBody?.required === true, `OpenAPI requestBody for ${route.id} must stay required`);
  } else {
    assert(route.request_body_required === false, `validator-routes ${route.id} must not require a request body when request_family_id is absent`);
    assert(!operation.requestBody, `OpenAPI ${route.id} must not publish a request body`);
  }

  assert(
    sameArray(normalizeParameters(operation.parameters), route.query_parameters || []),
    `OpenAPI query parameters for ${route.id} must match validator-routes`
  );

  const openapiStatuses = Object.keys(operation.responses || {}).sort();
  const routeStatuses = route.response_statuses.map((responseStatus) => String(responseStatus.status)).sort();
  assert(sameArray(openapiStatuses, routeStatuses), `OpenAPI response statuses for ${route.id} must match validator-routes`);

  for (const responseStatus of route.response_statuses) {
    const openapiResponse = operation.responses?.[String(responseStatus.status)];
    assert(Boolean(openapiResponse), `OpenAPI ${route.id} must publish response status ${responseStatus.status}`);

    if (!openapiResponse) {
      continue;
    }

    assert(
      openapiResponse.description === responseStatus.description,
      `OpenAPI response description for ${route.id} status ${responseStatus.status} must match validator-routes`
    );

    const openapiRef = getResponseSchemaRef(openapiResponse);
    assert(Boolean(openapiRef), `OpenAPI ${route.id} status ${responseStatus.status} must publish an application/json schema ref`);

    for (const familyId of responseStatus.family_ids) {
      const allowedRefs = responseSchemaRefsByFamilyId[familyId];
      assert(Boolean(allowedRefs), `validator-routes ${route.id} status ${responseStatus.status} must reference published response family ${familyId}`);
      assert(
        allowedRefs?.has(openapiRef),
        `OpenAPI ${route.id} status ${responseStatus.status} schema ${openapiRef} must be compatible with response family ${familyId}`
      );
      assert(responseFamilyMap.has(familyId), `validator-routes ${route.id} status ${responseStatus.status} must reference a published response family object`);
    }
  }
}

for (const family of envelopeFamilies.request_families) {
  const expectedRequestRef = requestSchemaRefsByFamilyId[family.id];
  assert(Boolean(expectedRequestRef), `validator-envelope-families request family ${family.id} must map to a published OpenAPI schema`);
  assert(Array.isArray(family.route_ids) && family.route_ids.length >= 1, `validator-envelope-families request family ${family.id} must declare route_ids`);

  for (const routeId of family.route_ids) {
    const route = routeMap.get(routeId);
    assert(Boolean(route), `validator-envelope-families request family ${family.id} references unknown route ${routeId}`);

    if (!route) {
      continue;
    }

    const operation = openapi.paths?.[route.path]?.[route.method.toLowerCase()];
    assert(route.request_family_id === family.id, `validator-envelope-families request family ${family.id} must match validator-routes route ${routeId}`);
    assert(getRequestSchemaRef(operation) === expectedRequestRef, `OpenAPI request schema for route ${routeId} must match request family ${family.id}`);
  }
}

for (const family of envelopeFamilies.response_families) {
  const allowedRefs = responseSchemaRefsByFamilyId[family.id];
  assert(Boolean(allowedRefs), `validator-envelope-families response family ${family.id} must map to published OpenAPI schemas`);
  assert(Array.isArray(family.route_ids) && family.route_ids.length >= 1, `validator-envelope-families response family ${family.id} must declare route_ids`);

  let routeStatusLinks = 0;

  for (const routeId of family.route_ids) {
    const route = routeMap.get(routeId);
    assert(Boolean(route), `validator-envelope-families response family ${family.id} references unknown route ${routeId}`);

    if (!route) {
      continue;
    }

    const operation = openapi.paths?.[route.path]?.[route.method.toLowerCase()];
    const matchingStatuses = route.response_statuses.filter((status) => status.family_ids.includes(family.id));

    assert(matchingStatuses.length >= 1, `validator-envelope-families response family ${family.id} must be referenced by validator-routes route ${routeId}`);

    for (const responseStatus of matchingStatuses) {
      const openapiResponse = operation?.responses?.[String(responseStatus.status)];
      const openapiRef = getResponseSchemaRef(openapiResponse);
      assert(
        allowedRefs.has(openapiRef),
        `OpenAPI response schema for route ${routeId} status ${responseStatus.status} must stay compatible with response family ${family.id}`
      );
      routeStatusLinks += 1;
    }
  }

  assert(routeStatusLinks >= 1, `validator-envelope-families response family ${family.id} must have at least one OpenAPI-backed route/status link`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(
  `OK: checked OpenAPI coherence for ${routes.routes.length} validator routes and ${envelopeFamilies.request_families.length + envelopeFamilies.response_families.length} validator envelope families`
);
