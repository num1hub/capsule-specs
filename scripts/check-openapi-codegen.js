#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8'
  });

  if (result.status !== 0) {
    const detail = result.stderr || result.stdout || 'unknown error';
    throw new Error(`${command} ${args.join(' ')} failed in ${cwd}: ${detail}`);
  }

  return result.stdout;
}

const recipePath = path.join(repoRoot, 'examples', 'client', 'openapi-generate-validator-types.mjs');
const packageRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-openapi-codegen.mjs');
const guidePath = path.join(repoRoot, 'docs', 'openapi-codegen-recipes.md');
const openapiGuidePath = path.join(repoRoot, 'docs', 'openapi.md');
const clientRecipesPath = path.join(repoRoot, 'docs', 'client-recipes.md');
const npmGuidePath = path.join(repoRoot, 'docs', 'npm-consumption.md');
const generatorReadinessPath = path.join(repoRoot, 'docs', 'generator-readiness.md');
const packageJsonPath = path.join(repoRoot, 'package.json');

try {
  assert(fs.existsSync(recipePath), 'missing repo-local OpenAPI codegen recipe');
  assert(fs.existsSync(packageRecipePath), 'missing installed-package OpenAPI codegen recipe');
  assert(fs.existsSync(guidePath), 'missing OpenAPI codegen guide');

  const guide = fs.readFileSync(guidePath, 'utf8');
  const openapiGuide = fs.readFileSync(openapiGuidePath, 'utf8');
  const clientRecipes = fs.readFileSync(clientRecipesPath, 'utf8');
  const npmGuide = fs.readFileSync(npmGuidePath, 'utf8');
  const generatorReadiness = fs.readFileSync(generatorReadinessPath, 'utf8');
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  assert(pkg.devDependencies?.['openapi-typescript'], 'package.json must declare openapi-typescript as a devDependency');
  assert(guide.includes('openapi-typescript'), 'OpenAPI codegen guide must mention openapi-typescript');
  assert(guide.includes('openapi-generate-validator-types.mjs'), 'OpenAPI codegen guide must mention the repo-local recipe');
  assert(guide.includes('esm-package-openapi-codegen.mjs'), 'OpenAPI codegen guide must mention the package recipe');
  assert(openapiGuide.includes('openapi-codegen-recipes.md'), 'docs/openapi.md must link to openapi-codegen-recipes.md');
  assert(clientRecipes.includes('openapi-generate-validator-types.mjs'), 'docs/client-recipes.md must mention the repo-local OpenAPI codegen recipe');
  assert(clientRecipes.includes('esm-package-openapi-codegen.mjs'), 'docs/client-recipes.md must mention the package OpenAPI codegen recipe');
  assert(npmGuide.includes('esm-package-openapi-codegen.mjs'), 'docs/npm-consumption.md must mention the package OpenAPI codegen recipe');
  assert(generatorReadiness.includes('openapi-codegen-recipes.md'), 'docs/generator-readiness.md must mention the concrete public OpenAPI codegen path');

  run(process.execPath, [recipePath], repoRoot);

  console.log('OK: checked OpenAPI codegen guide, 2 codegen recipes, and repo-local openapi-typescript execution');
} catch (error) {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
}

if (process.exitCode) {
  process.exit(process.exitCode);
}
