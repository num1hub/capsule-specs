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
const rawConfidenceCapsule = require('@num1hub/capsule-specs/capsules/capsule.foundation.capsuleos.confidence-vector.v1.json');
const gatesResponseSample = require('@num1hub/capsule-specs/examples/api/gates-response.sample.json');
const statsResponseSample = require('@num1hub/capsule-specs/examples/api/stats-response.sample.json');
const archiveBundleSample = require('@num1hub/capsule-specs/examples/archive/archive-bundle.sample.json');
const invalidArchiveCreatedAtBundle = require('@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-created-at.json');
const invalidArchiveContentClassBundle = require('@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-content-class.json');
const invalidRelationTypeCapsule = require('@num1hub/capsule-specs/examples/invalid/example-invalid-relation-type.capsule.json');
const invalidApiFailResponse = require('@num1hub/capsule-specs/examples/api-invalid/validate-response.fail.invalid-gate.json');
const exampleNote = require(path.join(repoRoot, 'examples', 'example-note.capsule.json'));
const passResponse = require(path.join(repoRoot, 'examples', 'api', 'validate-response.pass.json'));

assert(rootExports && rootExports.typescript && rootExports.zod, 'root package export must expose typescript and zod namespaces');
assert(Array.isArray(typescriptProjection.CAPSULE_TYPES), 'typescript export must expose CAPSULE_TYPES');
assert(typeof zodProjection.capsuleSchema?.parse === 'function', 'zod export must expose capsuleSchema.parse');
assert(typeof validatorZod.validatePassResponseSchema?.parse === 'function', 'validator zod export must expose validatePassResponseSchema.parse');
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
const parsedPassResponse = validatorZod.validatePassResponseSchema.parse(passResponse);
const parsedGatesResponse = validatorZod.gatesResponseSchema.parse(gatesResponseSample);
const parsedStatsResponse = validatorZod.statsResponseSchema.parse(statsResponseSample);

assert(parsedNote.metadata.capsule_id === exampleNote.metadata.capsule_id, 'built package zod export must parse the example note capsule');
assert(parsedPassResponse.valid === true, 'built package zod export must parse the passing validator response');
assert(parsedGatesResponse.gates.some((gate) => gate.id === 'G16'), 'built package zod export must parse the gates response sample');
assert(parsedStatsResponse.passRate === statsResponseSample.passRate, 'built package zod export must parse the stats response sample');

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
  'examples/client/cjs-package-support-responses.cjs',
  'examples/client/esm-package-ajv-validate-contracts.mjs',
  'examples/client/esm-package-ajv-validate-archive-bundle.mjs',
  'examples/client/esm-package-ajv-validate-schema-bundles.mjs',
  'examples/client/esm-package-ajv-reject-invalid-archive-bundles.mjs',
  'examples/client/esm-package-ajv-reject-invalid-capsules.mjs',
  'examples/client/esm-package-ajv-reject-invalid-validator-envelopes.mjs',
  'examples/client/recompute-integrity-seal.mjs',
  'examples/client/esm-package-recompute-integrity-seal.mjs',
  'examples/client/python-contract-reference.py',
  'examples/client/python-recompute-integrity-seal.py',
  'examples/client/python-validate-single.py',
  'examples/client/python-validate-batch.py',
  'examples/client/python-validate-fix.py',
  'examples/client/python-get-gates.py',
  'examples/client/python-get-stats.py',
  'examples/client/python-parse-validate-responses.py',
  'examples/client/python-parse-support-responses.py',
  'examples/client/esm-package-capsule-summary.mjs',
  'examples/client/esm-package-support-responses.mjs',
  'examples/client/esm-package-validate-response.mjs',
  'examples/client/ts-package-contract-reference.ts',
  'examples/client/ts-package-support-responses.ts',
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
