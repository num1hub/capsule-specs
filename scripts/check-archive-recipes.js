#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const docsPath = path.join(repoRoot, 'docs', 'archive-validation-recipes.md');
const repoRecipePath = path.join(repoRoot, 'examples', 'client', 'ajv-validate-archive-bundle.mjs');
const packageRecipePaths = [
  path.join(repoRoot, 'examples', 'client', 'cjs-package-ajv-validate-archive-bundle.cjs'),
  path.join(repoRoot, 'examples', 'client', 'esm-package-ajv-validate-archive-bundle.mjs'),
  path.join(repoRoot, 'examples', 'client', 'ts-package-ajv-validate-archive-bundle.ts')
];

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

assert(fs.existsSync(docsPath), 'missing docs/archive-validation-recipes.md');
assert(fs.existsSync(repoRecipePath), 'missing examples/client/ajv-validate-archive-bundle.mjs');
for (const recipePath of packageRecipePaths) {
  assert(fs.existsSync(recipePath), `missing ${path.relative(repoRoot, recipePath)}`);
}

const docs = readText('docs/archive-validation-recipes.md');
assert(docs.includes('archive-bundle.schema.json'), 'docs/archive-validation-recipes.md must mention archive-bundle.schema.json');
assert(docs.includes('archive-bundle.sample.json'), 'docs/archive-validation-recipes.md must mention archive-bundle.sample.json');
assert(docs.includes('ajv-validate-archive-bundle.mjs'), 'docs/archive-validation-recipes.md must mention ajv-validate-archive-bundle.mjs');
assert(
  docs.includes('cjs-package-ajv-validate-archive-bundle.cjs'),
  'docs/archive-validation-recipes.md must mention cjs-package-ajv-validate-archive-bundle.cjs'
);
assert(
  docs.includes('esm-package-ajv-validate-archive-bundle.mjs'),
  'docs/archive-validation-recipes.md must mention esm-package-ajv-validate-archive-bundle.mjs'
);
assert(
  docs.includes('ts-package-ajv-validate-archive-bundle.ts'),
  'docs/archive-validation-recipes.md must mention ts-package-ajv-validate-archive-bundle.ts'
);
assert(docs.includes('Ajv'), 'docs/archive-validation-recipes.md must mention Ajv');
assert(docs.includes('ajv-formats'), 'docs/archive-validation-recipes.md must mention ajv-formats');
assert(docs.includes('installed package'), 'docs/archive-validation-recipes.md must mention installed package usage');

for (const filePath of [repoRecipePath, ...packageRecipePaths]) {
  const syntaxResult = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  assert(
    syntaxResult.status === 0,
    `${path.basename(filePath)} must be syntactically valid: ${syntaxResult.stderr || syntaxResult.stdout}`
  );
}

const execResult = spawnSync(process.execPath, [repoRecipePath], { encoding: 'utf8' });
assert(execResult.status === 0, `ajv-validate-archive-bundle.mjs must execute successfully: ${execResult.stderr || execResult.stdout}`);

const repoRecipe = readText('examples/client/ajv-validate-archive-bundle.mjs');
const packageRecipes = [
  readText('examples/client/cjs-package-ajv-validate-archive-bundle.cjs'),
  readText('examples/client/esm-package-ajv-validate-archive-bundle.mjs'),
  readText('examples/client/ts-package-ajv-validate-archive-bundle.ts')
];

assert(repoRecipe.includes('../../schemas/archive-bundle.schema.json'), 'repo archive recipe must import ../../schemas/archive-bundle.schema.json');
assert(repoRecipe.includes('../archive/archive-bundle.sample.json'), 'repo archive recipe must import ../archive/archive-bundle.sample.json');
assert(repoRecipe.includes('ajv-formats'), 'repo archive recipe must import ajv-formats');
for (const packageRecipe of packageRecipes) {
  assert(packageRecipe.includes('@num1hub/capsule-specs/schemas/archive-bundle.schema.json'), 'package archive recipe must import the package archive schema export');
  assert(packageRecipe.includes('@num1hub/capsule-specs/examples/archive/archive-bundle.sample.json'), 'package archive recipe must import the package archive sample export');
  assert(packageRecipe.includes('ajv-formats'), 'package archive recipe must import ajv-formats');
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log('OK: checked archive validation recipes, docs, and repo-local Ajv execution');
