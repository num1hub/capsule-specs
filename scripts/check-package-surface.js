#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

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

const pkg = readJson('package.json');

const requiredExports = [
  '.',
  './typescript',
  './typescript/capsule',
  './typescript/validator-envelope-families',
  './typescript/validator-routes',
  './typescript/validator-api',
  './zod',
  './zod/capsule',
  './zod/validator-api',
  './schemas/*',
  './openapi/*',
  './references/*',
  './capsules/*',
  './examples/*'
];

assert(pkg.main === './dist/projections/index.js', 'package.json main must point to ./dist/projections/index.js');
assert(pkg.types === './dist/projections/index.d.ts', 'package.json types must point to ./dist/projections/index.d.ts');
assert(Array.isArray(pkg.files) && pkg.files.length > 0, 'package.json must define files for pack inclusion');
assert(typeof pkg.exports === 'object' && pkg.exports, 'package.json must define exports');

for (const exportKey of requiredExports) {
  assert(pkg.exports[exportKey], `package.json must define export ${exportKey}`);
}

const requiredBuiltFiles = [
  'dist/projections/index.js',
  'dist/projections/index.d.ts',
  'dist/projections/typescript/index.js',
  'dist/projections/typescript/index.d.ts',
  'dist/projections/typescript/capsule.js',
  'dist/projections/typescript/validator-envelope-families.js',
  'dist/projections/typescript/validator-envelope-families.d.ts',
  'dist/projections/typescript/validator-routes.js',
  'dist/projections/typescript/validator-routes.d.ts',
  'dist/projections/typescript/validator-api.js',
  'dist/projections/zod/index.js',
  'dist/projections/zod/index.d.ts',
  'dist/projections/zod/capsule.js',
  'dist/projections/zod/validator-api.js'
];

for (const relativePath of requiredBuiltFiles) {
  assert(fs.existsSync(path.join(repoRoot, relativePath)), `missing built projection file ${relativePath}`);
}

const rootExports = require('@num1hub/capsule-specs');
const typescriptProjection = require('@num1hub/capsule-specs/typescript');
const validatorEnvelopeProjection = require('@num1hub/capsule-specs/typescript/validator-envelope-families');
const zodProjection = require('@num1hub/capsule-specs/zod');
const validatorZod = require('@num1hub/capsule-specs/zod/validator-api');
const capsuleSchemaJson = require('@num1hub/capsule-specs/schemas/capsule-schema.json');
const archiveBundleSchemaJson = require('@num1hub/capsule-specs/schemas/archive-bundle.schema.json');
const capsuleBundleJson = require('@num1hub/capsule-specs/schemas/capsule-schema.bundle.json');
const neuroSchemaJson = require('@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json');
const validatorSchemaJson = require('@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json');
const validatorBundleJson = require('@num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json');
const openapi = require('@num1hub/capsule-specs/openapi/validate.openapi.json');
const contractConstants = require('@num1hub/capsule-specs/references/contract-constants.json');
const validationGates = require('@num1hub/capsule-specs/references/validation-gates.json');
const validatorEnvelopeFamilies = require('@num1hub/capsule-specs/references/validator-envelope-families.json');
const validatorRoutes = require('@num1hub/capsule-specs/references/validator-routes.json');
const rawConfidenceCapsule = require('@num1hub/capsule-specs/capsules/capsule.foundation.capsuleos.confidence-vector.v1.json');
const recipeIndex = require('@num1hub/capsule-specs/examples/client/recipe-index.json');
const singleRequestSample = require('@num1hub/capsule-specs/examples/api/validate-request.single.json');
const batchRequestSample = require('@num1hub/capsule-specs/examples/api/validate-request.batch.json');
const fixRequestSample = require('@num1hub/capsule-specs/examples/api/validate-request.fix.json');
const passResponseSample = require('@num1hub/capsule-specs/examples/api/validate-response.pass.json');
const failResponseSample = require('@num1hub/capsule-specs/examples/api/validate-response.fail.json');
const batchResponseSample = require('@num1hub/capsule-specs/examples/api/validate-response.batch.json');
const fixResponseSample = require('@num1hub/capsule-specs/examples/api/validate-response.fix.sample.json');
const gatesResponseSample = require('@num1hub/capsule-specs/examples/api/gates-response.sample.json');
const statsResponseSample = require('@num1hub/capsule-specs/examples/api/stats-response.sample.json');
const statsErrorResponseSample = require('@num1hub/capsule-specs/examples/api/stats-error-response.sample.json');
const errorResponseSample = require('@num1hub/capsule-specs/examples/api/error-response.sample.json');
const unauthorizedResponseSample = require('@num1hub/capsule-specs/examples/api/unauthorized-response.sample.json');
const forbiddenResponseSample = require('@num1hub/capsule-specs/examples/api/forbidden-response.sample.json');
const conflictResponseSample = require('@num1hub/capsule-specs/examples/api/conflict-response.sample.json');
const rateLimitResponseSample = require('@num1hub/capsule-specs/examples/api/rate-limit-response.sample.json');
const archiveBundleSample = require('@num1hub/capsule-specs/examples/archive/archive-bundle.sample.json');
const invalidArchiveCreatedAtBundle = require('@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-created-at.json');
const invalidArchiveContentClassBundle = require('@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-content-class.json');
const invalidRelationTypeCapsule = require('@num1hub/capsule-specs/examples/invalid/example-invalid-relation-type.capsule.json');
const invalidApiFailResponse = require('@num1hub/capsule-specs/examples/api-invalid/validate-response.fail.invalid-gate.json');
const exampleNote = require(path.join(repoRoot, 'examples', 'example-note.capsule.json'));

assert(rootExports && rootExports.typescript && rootExports.zod, 'root package export must expose typescript and zod namespaces');
assert(Array.isArray(typescriptProjection.CAPSULE_TYPES), 'typescript export must expose CAPSULE_TYPES');
assert(
  typescriptProjection.publishedValidatorEnvelopeFamilyCounts?.requests === 3,
  'typescript export must expose validator envelope family counts'
);
assert(
  Array.isArray(validatorEnvelopeProjection.publishedValidatorResponseFamilyDefinitions) &&
    validatorEnvelopeProjection.publishedValidatorResponseFamilyDefinitions.length === 7,
  'typescript validator-envelope-families export must expose response family definitions'
);
assert(typescriptProjection.publishedValidatorRoutes?.validateSingle === '/api/validate', 'typescript export must expose published validator route constants');
assert(
  Array.isArray(typescriptProjection.publishedValidatorRouteDefinitions) &&
    typescriptProjection.publishedValidatorRouteDefinitions.length === 5,
  'typescript export must expose published validator route definitions'
);
assert(
  typescriptProjection.publishedValidatorRouteDefinitions.every((route) => route.requiresBearerAuth === true),
  'typescript export must expose route auth posture'
);
assert(
  typescriptProjection.publishedValidatorRouteDefinitions.find((route) => route.id === 'getStats')?.queryParameters?.[0]?.name === 'limit',
  'typescript export must expose compact stats query metadata'
);
assert(
  typescriptProjection.publishedValidatorRouteDefinitions
    .find((route) => route.id === 'validateSingle')
    ?.responseStatuses?.some((status) => status.status === 401),
  'typescript export must expose compact route status metadata'
);
assert(typeof zodProjection.capsuleSchema?.parse === 'function', 'zod export must expose capsuleSchema.parse');
assert(typeof validatorZod.validateSingleRequestSchema?.parse === 'function', 'validator zod export must expose validateSingleRequestSchema.parse');
assert(typeof validatorZod.validateBatchRequestSchema?.parse === 'function', 'validator zod export must expose validateBatchRequestSchema.parse');
assert(typeof validatorZod.validateFixRequestSchema?.parse === 'function', 'validator zod export must expose validateFixRequestSchema.parse');
assert(typeof validatorZod.validatePassResponseSchema?.parse === 'function', 'validator zod export must expose validatePassResponseSchema.parse');
assert(typeof validatorZod.validateFailResponseSchema?.parse === 'function', 'validator zod export must expose validateFailResponseSchema.parse');
assert(typeof validatorZod.validateBatchResponseSchema?.parse === 'function', 'validator zod export must expose validateBatchResponseSchema.parse');
assert(typeof validatorZod.validateFixResponseSchema?.parse === 'function', 'validator zod export must expose validateFixResponseSchema.parse');
assert(typeof validatorZod.simpleErrorResponseSchema?.parse === 'function', 'validator zod export must expose simpleErrorResponseSchema.parse');
assert(typeof validatorZod.gatesResponseSchema?.parse === 'function', 'validator zod export must expose gatesResponseSchema.parse');
assert(typeof validatorZod.statsResponseSchema?.parse === 'function', 'validator zod export must expose statsResponseSchema.parse');
assert(capsuleSchemaJson.$id === 'https://github.com/num1hub/capsule-specs/schemas/capsule-schema.json', 'capsule schema export must expose the public schema JSON');
assert(archiveBundleSchemaJson.$id === 'https://github.com/num1hub/capsule-specs/schemas/archive-bundle.schema.json', 'archive-bundle schema export must expose the public schema JSON');
assert(capsuleBundleJson.$id === 'https://github.com/num1hub/capsule-specs/schemas/capsule-schema.bundle.json', 'capsule bundle export must expose the public bundled schema JSON');
assert(neuroSchemaJson.$id === 'https://github.com/num1hub/capsule-specs/schemas/neuro-concentrate.schema.json', 'neuro schema export must expose the public schema JSON');
assert(validatorSchemaJson.$id === 'https://github.com/num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json', 'validator schema export must expose the public schema JSON');
assert(validatorBundleJson.$id === 'https://github.com/num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json', 'validator bundle export must expose the public bundled schema JSON');
assert(typeof openapi.openapi === 'string' && openapi.openapi.length > 0, 'OpenAPI export must expose a valid OpenAPI document');
assert(Array.isArray(contractConstants.relation_types) && contractConstants.relation_types.length === 9, 'reference export must expose canonical relation types');
assert(
  Array.isArray(validatorEnvelopeFamilies.request_families) && validatorEnvelopeFamilies.request_families.length === 3,
  'reference export must expose all published validator request families'
);
assert(
  Array.isArray(validatorEnvelopeFamilies.response_families) && validatorEnvelopeFamilies.response_families.length === 7,
  'reference export must expose all published validator response families'
);
assert(Array.isArray(validatorRoutes.routes) && validatorRoutes.routes.length === 5, 'reference export must expose all published validator routes');
assert(
  validatorRoutes.routes.every((route) => route.requires_bearer_auth === true),
  'reference export must expose validator route auth posture'
);
assert(
  validatorRoutes.routes.find((route) => route.id === 'getStats')?.query_parameters?.[0]?.name === 'limit',
  'reference export must expose compact stats query metadata'
);
assert(
  validatorRoutes.routes.find((route) => route.id === 'validateSingle')?.response_statuses?.some((status) => status.status === 401),
  'reference export must expose compact route status metadata'
);
assert(
  Array.isArray(contractConstants.validator?.integrity_payload_root_keys) &&
    contractConstants.validator.integrity_payload_root_keys.length === 4,
  'reference export must expose integrity payload root keys'
);
assert(contractConstants.validator?.integrity_canonicalization === 'sorted-key-json', 'reference export must expose integrity canonicalization');
assert(Array.isArray(validationGates.gates) && validationGates.gates.length === 16, 'reference export must expose all 16 validation gates');
assert(
  rawConfidenceCapsule.metadata?.capsule_id === 'capsule.foundation.capsuleos.confidence-vector.v1',
  'raw capsule export must expose the curated confidence-vector capsule'
);
assert(recipeIndex.directory === 'examples/client', 'package exports must expose the client recipe navigator');
assert(Array.isArray(recipeIndex.groups) && recipeIndex.groups.length === 8, 'package exports must expose all client recipe groups');
assert(
  Array.isArray(recipeIndex.task_entrypoints) && recipeIndex.task_entrypoints.length === 16,
  'package exports must expose all client recipe task entrypoints'
);
assert(
  recipeIndex.task_entrypoints.find((entry) => entry.id === 'package-recipe-navigation')?.recommended ===
    'cjs-package-client-recipe-index.cjs',
  'package exports must expose the package recipe-navigation task'
);
assert(
  recipeIndex.groups.find((group) => group.id === 'package-runtime')?.recommended_start === 'cjs-package-live-validator-client.cjs',
  'package exports must expose the package-runtime recommended start'
);
assert(
  invalidRelationTypeCapsule.metadata?.capsule_id === 'capsule.example.invalid-relation-type.v1',
  'package exports must expose nested invalid-example fixtures'
);
assert(
  invalidApiFailResponse.errors?.[0]?.gate === 'gate-16',
  'package exports must expose nested invalid API envelope fixtures'
);
assert(
  archiveBundleSample.bundleId === 'bundle.public-specs.demo.2026-03-26',
  'package exports must expose the archive-bundle sample payload'
);
assert(
  invalidArchiveCreatedAtBundle.bundleId === 'bundle.public-specs.invalid-created-at.2026-03-28',
  'package exports must expose nested invalid archive fixtures'
);
assert(
  invalidArchiveContentClassBundle.manifest?.[0]?.contentClass === 'logs',
  'package exports must expose nested invalid archive enum fixtures'
);

const parsedNote = zodProjection.capsuleSchema.parse(exampleNote);
const parsedSingleRequest = validatorZod.validateSingleRequestSchema.parse(singleRequestSample);
const parsedBatchRequest = validatorZod.validateBatchRequestSchema.parse(batchRequestSample);
const parsedFixRequest = validatorZod.validateFixRequestSchema.parse(fixRequestSample);
const parsedPassResponse = validatorZod.validatePassResponseSchema.parse(passResponseSample);
const parsedFailResponse = validatorZod.validateFailResponseSchema.parse(failResponseSample);
const parsedBatchResponse = validatorZod.validateBatchResponseSchema.parse(batchResponseSample);
const parsedFixResponse = validatorZod.validateFixResponseSchema.parse(fixResponseSample);
const parsedErrorResponse = validatorZod.simpleErrorResponseSchema.parse(errorResponseSample);
const parsedUnauthorizedResponse = validatorZod.simpleErrorResponseSchema.parse(unauthorizedResponseSample);
const parsedForbiddenResponse = validatorZod.simpleErrorResponseSchema.parse(forbiddenResponseSample);
const parsedConflictResponse = validatorZod.simpleErrorResponseSchema.parse(conflictResponseSample);
const parsedRateLimitResponse = validatorZod.simpleErrorResponseSchema.parse(rateLimitResponseSample);
const parsedStatsErrorResponse = validatorZod.simpleErrorResponseSchema.parse(statsErrorResponseSample);
const parsedGatesResponse = validatorZod.gatesResponseSchema.parse(gatesResponseSample);
const parsedStatsResponse = validatorZod.statsResponseSchema.parse(statsResponseSample);

assert(parsedNote.metadata.capsule_id === exampleNote.metadata.capsule_id, 'built package zod export must parse the example note capsule');
assert(parsedSingleRequest.capsule.metadata.capsule_id === 'capsule.example.note.v1', 'built package zod export must parse the single validator request sample');
assert(parsedBatchRequest.capsules.length === 2, 'built package zod export must parse the batch validator request sample');
assert(parsedFixRequest.capsule.metadata.capsule_id === 'capsule.example.validator-invalid-g16.v1', 'built package zod export must parse the fix validator request sample');
assert(parsedPassResponse.valid === true, 'built package zod export must parse the passing validator response');
assert(parsedFailResponse.errors[0]?.gate === 'G16', 'built package zod export must parse the failing validator response sample');
assert(parsedBatchResponse.summary.invalid === 1, 'built package zod export must parse the batch validator response sample');
assert(
  parsedFixResponse.fixedCapsule.metadata.capsule_id === 'capsule.example.validator-invalid-g16.v1',
  'built package zod export must parse the fix validator response sample'
);
assert(parsedErrorResponse.error === errorResponseSample.error, 'built package zod export must parse the generic error response sample');
assert(parsedUnauthorizedResponse.error === 'Unauthorized', 'built package zod export must parse the unauthorized error response sample');
assert(parsedForbiddenResponse.error === 'Owner role required', 'built package zod export must parse the forbidden error response sample');
assert(/conflict/i.test(parsedConflictResponse.error), 'built package zod export must parse the conflict error response sample');
assert(parsedRateLimitResponse.error === 'Rate limit exceeded', 'built package zod export must parse the rate-limit error response sample');
assert(parsedStatsErrorResponse.error === 'Stats computation failed', 'built package zod export must parse the stats-computation error response sample');
assert(parsedGatesResponse.gates.some((gate) => gate.id === 'G16'), 'built package zod export must parse the gates response sample');
assert(parsedStatsResponse.passRate === statsResponseSample.passRate, 'built package zod export must parse the stats response sample');
assert(
  validatorEnvelopeFamilies.response_families.find((family) => family.id === 'simpleErrorResponse')?.example_files?.includes('examples/api/stats-error-response.sample.json'),
  'reference export must include the dedicated stats-computation error sample in simpleErrorResponse'
);
assert(
  validatorRoutes.routes.find((route) => route.id === 'validateBatch')?.response_statuses?.find((status) => status.status === 403)?.example_files?.includes('examples/api/forbidden-response.sample.json'),
  'reference export must expose the bounded owner-role example for validateBatch'
);
assert(
  validatorRoutes.routes.find((route) => route.id === 'validateFix')?.response_statuses?.find((status) => status.status === 403)?.example_files?.includes('examples/api/forbidden-response.sample.json'),
  'reference export must expose the bounded owner-role example for validateFix'
);
assert(
  validatorRoutes.routes.find((route) => route.id === 'getStats')?.response_statuses?.find((status) => status.status === 500)?.example_files?.includes('examples/api/stats-error-response.sample.json'),
  'reference export must expose the bounded stats-computation failure example'
);
assert(
  typescriptProjection.publishedValidatorRouteDefinitions.find((route) => route.id === 'validateBatch')
    ?.responseStatuses?.find((status) => status.status === 403)?.exampleFiles?.includes('examples/api/forbidden-response.sample.json'),
  'typescript route projection must expose the bounded owner-role example for validateBatch'
);
assert(
  typescriptProjection.publishedValidatorRouteDefinitions.find((route) => route.id === 'validateFix')
    ?.responseStatuses?.find((status) => status.status === 403)?.exampleFiles?.includes('examples/api/forbidden-response.sample.json'),
  'typescript route projection must expose the bounded owner-role example for validateFix'
);
assert(
  typescriptProjection.publishedValidatorRouteDefinitions.find((route) => route.id === 'getStats')
    ?.responseStatuses?.find((status) => status.status === 500)?.exampleFiles?.includes('examples/api/stats-error-response.sample.json'),
  'typescript route projection must expose the bounded stats-computation failure example'
);

const packResult = spawnSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
  cwd: repoRoot,
  encoding: 'utf8'
});

assert(packResult.status === 0, `npm pack --dry-run must pass: ${packResult.stderr || packResult.stdout}`);

let packOutput = [];
try {
  packOutput = JSON.parse(packResult.stdout);
} catch (error) {
  assert(false, `npm pack --dry-run --json must emit valid JSON: ${error.message}`);
}

const packedFiles = new Set((packOutput[0]?.files || []).map((entry) => entry.path));

for (const relativePath of [
  'dist/projections/index.js',
  'dist/projections/typescript/capsule.js',
  'dist/projections/zod/validator-api.js',
  'docs/npm-consumption.md',
  'docs/archive-validation-recipes.md',
  'docs/invalid-archive-bundle-examples.md',
  'docs/schema-bundles.md',
  'docs/schema-validation-recipes.md',
  'docs/invalid-capsule-examples.md',
  'docs/invalid-api-envelope-examples.md',
  'docs/integrity-recipes.md',
  'docs/python-consumption.md',
  'schemas/capsule-schema.json',
  'schemas/archive-bundle.schema.json',
  'schemas/capsule-schema.bundle.json',
  'schemas/neuro-concentrate.schema.json',
  'schemas/validator-api-envelopes.schema.json',
  'schemas/validator-api-envelopes.bundle.json',
  'openapi/validate.openapi.json',
  'references/contract-constants.json',
  'references/validation-gates.json',
  'references/validator-envelope-families.json',
  'references/validator-routes.json',
  'capsules/capsule.foundation.capsuleos.confidence-vector.v1.json',
  'docs/reference-pack.md',
  'examples/client/ajv-validate-capsule.mjs',
  'examples/client/ajv-validate-validator-envelope.mjs',
  'examples/client/ajv-validate-archive-bundle.mjs',
  'examples/client/ajv-validate-schema-bundles.mjs',
  'examples/client/ajv-reject-invalid-archive-bundles.mjs',
  'examples/client/ajv-reject-invalid-capsules.mjs',
  'examples/client/ajv-reject-invalid-validator-envelopes.mjs',
  'examples/client/cjs-package-contract-reference.cjs',
  'examples/client/cjs-package-error-responses.cjs',
  'examples/client/cjs-package-live-validator-client.cjs',
  'examples/client/cjs-package-openapi-codegen.cjs',
  'examples/client/cjs-package-openapi-reference.cjs',
  'examples/client/cjs-package-validate-request.cjs',
  'examples/client/cjs-package-support-responses.cjs',
  'examples/client/esm-package-contract-reference.mjs',
  'examples/client/esm-package-ajv-validate-contracts.mjs',
  'examples/client/esm-package-ajv-validate-archive-bundle.mjs',
  'examples/client/esm-package-ajv-validate-schema-bundles.mjs',
  'examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs',
  'examples/client/esm-package-ajv-reject-invalid-capsules.mjs',
  'examples/client/esm-package-ajv-reject-invalid-validator-envelopes.mjs',
  'examples/client/esm-package-live-validator-client.mjs',
  'examples/client/esm-package-openapi-codegen.mjs',
  'examples/client/esm-package-openapi-reference.mjs',
  'examples/client/recompute-integrity-seal.mjs',
  'examples/client/esm-package-recompute-integrity-seal.mjs',
  'examples/client/esm-package-error-responses.mjs',
  'examples/client/esm-package-validate-request.mjs',
  'examples/client/python-contract-reference.py',
  'examples/client/python-live-validator-client.py',
  'examples/client/python-recompute-integrity-seal.py',
  'examples/client/python-validate-single.py',
  'examples/client/python-validate-batch.py',
  'examples/client/python-validate-fix.py',
  'examples/client/python-get-gates.py',
  'examples/client/python-get-stats.py',
  'examples/client/python-parse-validate-responses.py',
  'examples/client/python-parse-error-responses.py',
  'examples/client/python-parse-support-responses.py',
  'examples/api/stats-error-response.sample.json',
  'examples/client/esm-package-capsule-summary.mjs',
  'examples/client/esm-package-support-responses.mjs',
  'examples/client/esm-package-validate-response.mjs',
  'examples/client/zod-parse-validate-response.ts',
  'examples/client/zod-parse-validate-fail-response.ts',
  'examples/client/zod-parse-validate-batch-response.ts',
  'examples/client/zod-parse-validate-fix-response.ts',
  'examples/client/zod-parse-validate-request.ts',
  'examples/client/zod-parse-validate-batch-request.ts',
  'examples/client/zod-parse-validate-fix-request.ts',
  'examples/client/ts-parse-validate-requests.ts',
  'examples/client/ts-live-validator-client.ts',
  'examples/client/ts-package-contract-reference.ts',
  'examples/client/ts-envelope-family-reference.ts',
  'examples/client/ts-route-behavior-reference.ts',
  'examples/client/ts-package-error-responses.ts',
  'examples/client/ts-package-live-validator-client.ts',
  'examples/client/ts-package-openapi-codegen.ts',
  'examples/client/ts-package-openapi-reference.ts',
  'examples/client/ts-package-parse-validate-requests.ts',
  'examples/client/ts-package-validate-batch-request.ts',
  'examples/client/ts-package-validate-fix-request.ts',
  'examples/client/ts-package-validate-responses.ts',
  'examples/client/ts-package-support-responses.ts',
  'examples/client/ts-package-validate-request.ts',
  'examples/invalid/README.md',
  'examples/invalid/example-invalid-missing-neuro-concentrate.capsule.json',
  'examples/invalid/example-invalid-relation-type.capsule.json',
  'examples/api-invalid/README.md',
  'examples/api-invalid/validate-request.single.missing-capsule.json',
  'examples/api-invalid/validate-response.fail.invalid-gate.json',
  'examples/archive-invalid/README.md',
  'examples/archive-invalid/archive-bundle.invalid-created-at.json',
  'examples/archive-invalid/archive-bundle.invalid-content-class.json'
]) {
  assert(packedFiles.has(relativePath), `npm pack surface must include ${relativePath}`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked package exports, ${requiredBuiltFiles.length} built files, and ${packedFiles.size} packed files`);
