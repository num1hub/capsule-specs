#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

const repoRoot = path.resolve(__dirname, '..');
const invalidDir = path.join(repoRoot, 'examples', 'archive-invalid');
const schemaPath = path.join(repoRoot, 'schemas', 'archive-bundle.schema.json');
const docsPath = path.join(repoRoot, 'docs', 'invalid-archive-bundle-examples.md');
const readmePath = path.join(invalidDir, 'README.md');
const repoRecipePath = path.join(repoRoot, 'examples', 'client', 'ajv-reject-invalid-archive-bundles.mjs');
const packageRecipePaths = [
  path.join(repoRoot, 'examples', 'client', 'cjs-package-ajv-reject-invalid-archive-bundles.cjs'),
  path.join(repoRoot, 'examples', 'client', 'esm-package-ajv-reject-invalid-archive-bundles.mjs'),
  path.join(repoRoot, 'examples', 'client', 'ts-package-ajv-reject-invalid-archive-bundles.ts')
];

const fixtures = [
  {
    path: 'examples/archive-invalid/archive-bundle.invalid-created-at.json',
    predicate: (error) => error.keyword === 'format' && error.instancePath === '/createdAt'
  },
  {
    path: 'examples/archive-invalid/archive-bundle.invalid-content-class.json',
    predicate: (error) => error.keyword === 'enum' && error.instancePath === '/manifest/0/contentClass'
  }
];

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const archiveSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const docs = fs.readFileSync(docsPath, 'utf8');
const readme = fs.readFileSync(readmePath, 'utf8');

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validateArchiveBundle = ajv.compile(archiveSchema);

assert(fs.existsSync(docsPath), 'missing docs/invalid-archive-bundle-examples.md');
assert(fs.existsSync(readmePath), 'missing examples/archive-invalid/README.md');
assert(fs.existsSync(repoRecipePath), 'missing repo-local invalid archive recipe');
for (const recipePath of packageRecipePaths) {
  assert(fs.existsSync(recipePath), `missing ${path.relative(repoRoot, recipePath)}`);
}

for (const fixture of fixtures) {
  const absolutePath = path.join(repoRoot, fixture.path);
  assert(fs.existsSync(absolutePath), `missing invalid archive fixture ${fixture.path}`);

  const payload = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  const valid = validateArchiveBundle(payload);
  const errors = validateArchiveBundle.errors ?? [];

  assert(valid === false, `${fixture.path} must fail archive-bundle schema validation`);
  assert(errors.some(fixture.predicate), `${fixture.path} must fail with the documented schema error`);
  assert(docs.includes(path.basename(fixture.path)), `docs/invalid-archive-bundle-examples.md must mention ${path.basename(fixture.path)}`);
  assert(readme.includes(path.basename(fixture.path)), `examples/archive-invalid/README.md must mention ${path.basename(fixture.path)}`);
}

assert(
  docs.includes('archive-bundle.sample.json'),
  'docs/invalid-archive-bundle-examples.md must distinguish invalid archive fixtures from the valid archive sample'
);
assert(
  readme.includes('../archive/'),
  'examples/archive-invalid/README.md must distinguish invalid archive fixtures from the valid archive sample'
);

assert(docs.includes('cjs-package-ajv-reject-invalid-archive-bundles.cjs'), 'docs/invalid-archive-bundle-examples.md must mention cjs-package-ajv-reject-invalid-archive-bundles.cjs');
assert(docs.includes('esm-package-ajv-reject-invalid-archive-bundles.mjs'), 'docs/invalid-archive-bundle-examples.md must mention esm-package-ajv-reject-invalid-archive-bundles.mjs');
assert(docs.includes('ts-package-ajv-reject-invalid-archive-bundles.ts'), 'docs/invalid-archive-bundle-examples.md must mention ts-package-ajv-reject-invalid-archive-bundles.ts');

for (const recipePath of [repoRecipePath, ...packageRecipePaths]) {
  const syntaxResult = spawnSync(process.execPath, ['--check', recipePath], { encoding: 'utf8' });
  assert(
    syntaxResult.status === 0,
    `${path.basename(recipePath)} must be syntactically valid: ${syntaxResult.stderr || syntaxResult.stdout}`
  );
}

const execResult = spawnSync(process.execPath, [repoRecipePath], { encoding: 'utf8' });
assert(
  execResult.status === 0,
  `ajv-reject-invalid-archive-bundles.mjs must execute successfully: ${execResult.stderr || execResult.stdout}`
);

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${fixtures.length} invalid archive bundle fixtures and their documented schema-failure expectations`);
