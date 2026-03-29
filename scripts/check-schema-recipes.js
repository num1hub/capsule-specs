#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const clientDir = path.join(repoRoot, 'examples', 'client');

const repoLocalRecipes = [
  'ajv-validate-capsule.mjs',
  'ajv-validate-validator-envelope.mjs',
  'ajv-validate-archive-bundle.mjs',
  'ajv-validate-client-recipe-index.mjs',
  'ajv-validate-schema-bundles.mjs',
  'ajv-reject-invalid-archive-bundles.mjs',
  'ajv-reject-invalid-capsules.mjs',
  'ajv-reject-invalid-validator-envelopes.mjs'
];

const packageRecipes = [
  'esm-package-ajv-validate-contracts.mjs',
  'esm-package-ajv-validate-archive-bundle.mjs',
  'esm-package-ajv-validate-client-recipe-index.mjs',
  'esm-package-ajv-validate-schema-bundles.mjs',
  'esm-package-ajv-reject-invalid-archive-bundles.mjs',
  'esm-package-ajv-reject-invalid-capsules.mjs',
  'esm-package-ajv-reject-invalid-validator-envelopes.mjs'
];

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

for (const fileName of [...repoLocalRecipes, ...packageRecipes]) {
  assert(fs.existsSync(path.join(clientDir, fileName)), `missing schema recipe ${fileName}`);
}

for (const fileName of repoLocalRecipes) {
  const filePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.includes('ajv/dist/2020.js'), `${fileName} must use Ajv draft-2020 support`);
  if (fileName === 'ajv-validate-archive-bundle.mjs' || fileName === 'ajv-reject-invalid-archive-bundles.mjs') {
    assert(content.includes('ajv-formats'), `${fileName} must import ajv-formats for schema format support`);
  }
  const syntaxResult = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  assert(syntaxResult.status === 0, `${fileName} must be syntactically valid: ${syntaxResult.stderr || syntaxResult.stdout}`);
  const execResult = spawnSync(process.execPath, [filePath], { encoding: 'utf8' });
  assert(execResult.status === 0, `${fileName} must execute successfully: ${execResult.stderr || execResult.stdout}`);
}

const expectedPackageImports = {
  'esm-package-ajv-validate-contracts.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json',
    '@num1hub/capsule-specs/examples/example-note.capsule.json',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json'
  ],
  'esm-package-ajv-validate-archive-bundle.mjs': [
    'ajv/dist/2020.js',
    'ajv-formats',
    '@num1hub/capsule-specs/schemas/archive-bundle.schema.json',
    '@num1hub/capsule-specs/examples/archive/archive-bundle.sample.json'
  ],
  'esm-package-ajv-validate-client-recipe-index.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/client-recipe-index.schema.json',
    '@num1hub/capsule-specs/examples/client/recipe-index.json'
  ],
  'esm-package-ajv-reject-invalid-archive-bundles.mjs': [
    'ajv/dist/2020.js',
    'ajv-formats',
    '@num1hub/capsule-specs/schemas/archive-bundle.schema.json',
    '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-created-at.json',
    '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-content-class.json'
  ],
  'esm-package-ajv-validate-schema-bundles.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.bundle.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json',
    '@num1hub/capsule-specs/examples/example-note.capsule.json',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json'
  ],
  'esm-package-ajv-reject-invalid-capsules.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/examples/invalid/example-invalid-missing-neuro-concentrate.capsule.json',
    '@num1hub/capsule-specs/examples/invalid/example-invalid-relation-type.capsule.json'
  ],
  'esm-package-ajv-reject-invalid-validator-envelopes.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json',
    '@num1hub/capsule-specs/examples/api-invalid/validate-request.single.missing-capsule.json',
    '@num1hub/capsule-specs/examples/api-invalid/validate-response.fail.invalid-gate.json'
  ]
};

for (const fileName of packageRecipes) {
  const recipePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(recipePath, 'utf8');
  for (const importPath of expectedPackageImports[fileName]) {
    assert(content.includes(importPath), `${fileName} must import ${importPath}`);
  }
  const syntaxResult = spawnSync(process.execPath, ['--check', recipePath], { encoding: 'utf8' });
  assert(
    syntaxResult.status === 0,
    `${fileName} must be syntactically valid: ${syntaxResult.stderr || syntaxResult.stdout}`
  );
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${repoLocalRecipes.length} repo-local Ajv schema recipes and ${packageRecipes.length} package-consumer schema recipes`);
