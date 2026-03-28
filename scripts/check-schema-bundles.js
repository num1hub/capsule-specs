#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildCapsuleSchemaBundle, buildValidatorApiSchemaBundle } = require('./lib/schema-bundles');

const repoRoot = path.resolve(__dirname, '..');
const capsuleBundlePath = path.join(repoRoot, 'schemas', 'capsule-schema.bundle.json');
const validatorBundlePath = path.join(repoRoot, 'schemas', 'validator-api-envelopes.bundle.json');
const docsPath = path.join(repoRoot, 'docs', 'schema-bundles.md');
const repoRecipePath = path.join(repoRoot, 'examples', 'client', 'ajv-validate-schema-bundles.mjs');
const packageRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-ajv-validate-schema-bundles.mjs');

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

const expectedCapsuleBundle = buildCapsuleSchemaBundle();
const expectedValidatorBundle = buildValidatorApiSchemaBundle();
const actualCapsuleBundle = readJson('schemas/capsule-schema.bundle.json');
const actualValidatorBundle = readJson('schemas/validator-api-envelopes.bundle.json');
const docs = readText('docs/schema-bundles.md');

assert(fs.existsSync(capsuleBundlePath), 'missing schemas/capsule-schema.bundle.json');
assert(fs.existsSync(validatorBundlePath), 'missing schemas/validator-api-envelopes.bundle.json');
assert(fs.existsSync(docsPath), 'missing docs/schema-bundles.md');
assert(fs.existsSync(repoRecipePath), 'missing repo-local schema bundle recipe');
assert(fs.existsSync(packageRecipePath), 'missing package schema bundle recipe');

assert(
  JSON.stringify(actualCapsuleBundle) === JSON.stringify(expectedCapsuleBundle),
  'schemas/capsule-schema.bundle.json must match the generated bundled schema'
);
assert(
  JSON.stringify(actualValidatorBundle) === JSON.stringify(expectedValidatorBundle),
  'schemas/validator-api-envelopes.bundle.json must match the generated bundled schema'
);

assert(docs.includes('capsule-schema.bundle.json'), 'docs/schema-bundles.md must mention capsule-schema.bundle.json');
assert(
  docs.includes('validator-api-envelopes.bundle.json'),
  'docs/schema-bundles.md must mention validator-api-envelopes.bundle.json'
);
assert(docs.includes('ajv-validate-schema-bundles.mjs'), 'docs/schema-bundles.md must mention ajv-validate-schema-bundles.mjs');
assert(
  docs.includes('esm-package-ajv-validate-schema-bundles.mjs'),
  'docs/schema-bundles.md must mention esm-package-ajv-validate-schema-bundles.mjs'
);
assert(docs.includes('single-file'), 'docs/schema-bundles.md must describe single-file schema consumption');
assert(docs.includes('raw schema'), 'docs/schema-bundles.md must contrast bundle schemas with raw schemas');

for (const filePath of [repoRecipePath, packageRecipePath]) {
  const syntaxResult = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  assert(
    syntaxResult.status === 0,
    `${path.basename(filePath)} must be syntactically valid: ${syntaxResult.stderr || syntaxResult.stdout}`
  );
}

const execResult = spawnSync(process.execPath, [repoRecipePath], { encoding: 'utf8' });
assert(execResult.status === 0, `ajv-validate-schema-bundles.mjs must execute successfully: ${execResult.stderr || execResult.stdout}`);

assert(
  actualCapsuleBundle.properties?.neuro_concentrate?.$ref === '#/$defs/neuroConcentrate',
  'capsule schema bundle must inline neuro_concentrate via #/$defs/neuroConcentrate'
);
assert(
  actualValidatorBundle.$defs?.validateSingleRequest?.properties?.capsule?.$ref === '#/$defs/capsule',
  'validator schema bundle must inline capsule request refs via #/$defs/capsule'
);
assert(
  actualValidatorBundle.$defs?.capsule?.properties?.neuro_concentrate?.$ref === '#/$defs/neuroConcentrate',
  'validator schema bundle must inline neuro_concentrate via #/$defs/neuroConcentrate'
);

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log('OK: checked committed schema bundles, bundle docs, and repo-local Ajv bundle recipe');
