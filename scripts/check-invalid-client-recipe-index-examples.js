#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const Ajv2020 = require('ajv/dist/2020');

const repoRoot = path.resolve(__dirname, '..');
const invalidDir = path.join(repoRoot, 'examples', 'client-invalid');
const schemaPath = path.join(repoRoot, 'schemas', 'client-recipe-index.schema.json');
const docsPath = path.join(repoRoot, 'docs', 'invalid-client-recipe-index-examples.md');
const readmePath = path.join(invalidDir, 'README.md');
const repoRecipePath = path.join(repoRoot, 'examples', 'client', 'ajv-reject-invalid-client-recipe-index.mjs');
const packageRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-ajv-reject-invalid-client-recipe-index.mjs');

const fixtures = [
  {
    path: 'examples/client-invalid/client-recipe-index.missing-files.json',
    predicate: (error) =>
      error.keyword === 'required' &&
      error.instancePath === '/groups/0' &&
      error.params?.missingProperty === 'files'
  },
  {
    path: 'examples/client-invalid/client-recipe-index.invalid-runtime.json',
    predicate: (error) => error.keyword === 'enum' && error.instancePath === '/task_entrypoints/0/runtimes/0'
  }
];

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const clientRecipeIndexSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const docs = fs.readFileSync(docsPath, 'utf8');
const readme = fs.readFileSync(readmePath, 'utf8');

const ajv = new Ajv2020({ allErrors: true, strict: true });
const validateClientRecipeIndex = ajv.compile(clientRecipeIndexSchema);

assert(fs.existsSync(docsPath), 'missing docs/invalid-client-recipe-index-examples.md');
assert(fs.existsSync(readmePath), 'missing examples/client-invalid/README.md');
assert(fs.existsSync(repoRecipePath), 'missing repo-local invalid client-recipe-index recipe');
assert(fs.existsSync(packageRecipePath), 'missing package invalid client-recipe-index recipe');

for (const fixture of fixtures) {
  const absolutePath = path.join(repoRoot, fixture.path);
  assert(fs.existsSync(absolutePath), `missing invalid client-recipe-index fixture ${fixture.path}`);

  const payload = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  const valid = validateClientRecipeIndex(payload);
  const errors = validateClientRecipeIndex.errors ?? [];

  assert(valid === false, `${fixture.path} must fail client-recipe-index schema validation`);
  assert(errors.some(fixture.predicate), `${fixture.path} must fail with the documented schema error`);
  assert(
    docs.includes(path.basename(fixture.path)),
    `docs/invalid-client-recipe-index-examples.md must mention ${path.basename(fixture.path)}`
  );
  assert(
    readme.includes(path.basename(fixture.path)),
    `examples/client-invalid/README.md must mention ${path.basename(fixture.path)}`
  );
}

assert(
  docs.includes('examples/client/recipe-index.json'),
  'docs/invalid-client-recipe-index-examples.md must distinguish invalid fixtures from the valid published navigator'
);
assert(
  readme.includes('../client/'),
  'examples/client-invalid/README.md must distinguish invalid fixtures from the valid navigator directory'
);

for (const recipePath of [repoRecipePath, packageRecipePath]) {
  const syntaxResult = spawnSync(process.execPath, ['--check', recipePath], { encoding: 'utf8' });
  assert(
    syntaxResult.status === 0,
    `${path.basename(recipePath)} must be syntactically valid: ${syntaxResult.stderr || syntaxResult.stdout}`
  );
}

const execResult = spawnSync(process.execPath, [repoRecipePath], { encoding: 'utf8' });
assert(
  execResult.status === 0,
  `ajv-reject-invalid-client-recipe-index.mjs must execute successfully: ${execResult.stderr || execResult.stdout}`
);

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${fixtures.length} invalid client-recipe navigator fixtures and their documented schema-failure expectations`);
