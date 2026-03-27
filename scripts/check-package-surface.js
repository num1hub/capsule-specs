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
const validatorSchemaJson = require('@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json');
const openapi = require('@num1hub/capsule-specs/openapi/validate.openapi.json');
const exampleNote = require(path.join(repoRoot, 'examples', 'example-note.capsule.json'));
const passResponse = require(path.join(repoRoot, 'examples', 'api', 'validate-response.pass.json'));

assert(rootExports && rootExports.typescript && rootExports.zod, 'root package export must expose typescript and zod namespaces');
assert(Array.isArray(typescriptProjection.CAPSULE_TYPES), 'typescript export must expose CAPSULE_TYPES');
assert(typeof zodProjection.capsuleSchema?.parse === 'function', 'zod export must expose capsuleSchema.parse');
assert(typeof validatorZod.validatePassResponseSchema?.parse === 'function', 'validator zod export must expose validatePassResponseSchema.parse');
assert(capsuleSchemaJson.$id === 'https://github.com/num1hub/capsule-specs/schemas/capsule-schema.json', 'capsule schema export must expose the public schema JSON');
assert(validatorSchemaJson.$id === 'https://github.com/num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json', 'validator schema export must expose the public schema JSON');
assert(typeof openapi.openapi === 'string' && openapi.openapi.length > 0, 'OpenAPI export must expose a valid OpenAPI document');

const parsedNote = zodProjection.capsuleSchema.parse(exampleNote);
const parsedPassResponse = validatorZod.validatePassResponseSchema.parse(passResponse);

assert(parsedNote.metadata.capsule_id === exampleNote.metadata.capsule_id, 'built package zod export must parse the example note capsule');
assert(parsedPassResponse.valid === true, 'built package zod export must parse the passing validator response');

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
  'schemas/capsule-schema.json',
  'schemas/validator-api-envelopes.schema.json',
  'openapi/validate.openapi.json'
]) {
  assert(packedFiles.has(relativePath), `npm pack surface must include ${relativePath}`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked package exports, ${requiredBuiltFiles.length} built files, and ${packedFiles.size} packed files`);
