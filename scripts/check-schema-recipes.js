#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const clientDir = path.join(repoRoot, 'examples', 'client');

const repoLocalRecipes = [
  'ajv-validate-capsule.mjs',
  'ajv-validate-validator-envelope.mjs'
];

const packageRecipe = 'esm-package-ajv-validate-contracts.mjs';

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

for (const fileName of [...repoLocalRecipes, packageRecipe]) {
  assert(fs.existsSync(path.join(clientDir, fileName)), `missing schema recipe ${fileName}`);
}

for (const fileName of repoLocalRecipes) {
  const filePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.includes('ajv/dist/2020.js'), `${fileName} must use Ajv draft-2020 support`);
  const syntaxResult = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  assert(syntaxResult.status === 0, `${fileName} must be syntactically valid: ${syntaxResult.stderr || syntaxResult.stdout}`);
  const execResult = spawnSync(process.execPath, [filePath], { encoding: 'utf8' });
  assert(execResult.status === 0, `${fileName} must execute successfully: ${execResult.stderr || execResult.stdout}`);
}

const packageRecipePath = path.join(clientDir, packageRecipe);
const packageRecipeContent = fs.readFileSync(packageRecipePath, 'utf8');

for (const importPath of [
  'ajv/dist/2020.js',
  '@num1hub/capsule-specs/schemas/capsule-schema.json',
  '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
  '@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json',
  '@num1hub/capsule-specs/examples/example-note.capsule.json',
  '@num1hub/capsule-specs/examples/api/validate-request.single.json',
  '@num1hub/capsule-specs/examples/api/validate-response.pass.json'
]) {
  assert(packageRecipeContent.includes(importPath), `${packageRecipe} must import ${importPath}`);
}

const packageSyntaxResult = spawnSync(process.execPath, ['--check', packageRecipePath], { encoding: 'utf8' });
assert(
  packageSyntaxResult.status === 0,
  `${packageRecipe} must be syntactically valid: ${packageSyntaxResult.stderr || packageSyntaxResult.stdout}`
);

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${repoLocalRecipes.length} repo-local Ajv schema recipes and 1 package-consumer schema recipe`);
