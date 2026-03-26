#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const catalogPath = path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json');
const packageJsonPath = path.join(repoRoot, 'package.json');

const allowedKinds = new Set([
  'orientation',
  'governance',
  'law-doc',
  'validator-doc',
  'openapi',
  'api-doc',
  'integration-doc',
  'schema',
  'example',
  'support-artifact',
  'api-example',
  'provenance',
  'release-review',
  'index'
]);

const allowedStability = new Set(['contract', 'maintained', 'illustrative']);

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

assert(typeof catalog.catalog_version === 'string', 'catalog_version must be a string');
assert(catalog.catalog_version === pkg.version, 'catalog_version must match package.json version');
assert(Array.isArray(catalog.entries) && catalog.entries.length >= 10, 'catalog must contain at least 10 entries');

const ids = new Set();
const paths = new Set();

for (const entry of catalog.entries) {
  assert(typeof entry.id === 'string' && entry.id.length > 0, 'every catalog entry must have an id');
  assert(!ids.has(entry.id), `duplicate catalog id ${entry.id}`);
  ids.add(entry.id);

  assert(typeof entry.path === 'string' && entry.path.length > 0, `catalog entry ${entry.id} must have a path`);
  assert(!paths.has(entry.path), `duplicate catalog path ${entry.path}`);
  paths.add(entry.path);
  assert(fs.existsSync(path.join(repoRoot, entry.path)), `catalog path does not exist: ${entry.path}`);

  assert(allowedKinds.has(entry.kind), `catalog entry ${entry.id} has unsupported kind ${entry.kind}`);
  assert(allowedStability.has(entry.stability), `catalog entry ${entry.id} has unsupported stability ${entry.stability}`);
  assert(Array.isArray(entry.audiences) && entry.audiences.length > 0, `catalog entry ${entry.id} must declare audiences`);
  assert(Array.isArray(entry.verify_commands) && entry.verify_commands.length > 0, `catalog entry ${entry.id} must declare verify_commands`);

  for (const command of entry.verify_commands) {
    assert(typeof command === 'string' && command.startsWith('npm run '), `catalog entry ${entry.id} has invalid verify command ${command}`);
  }
}

const requiredIds = [
  'repo.readme',
  'repo.versioning',
  'validator.openapi',
  'schema.capsule',
  'examples.note',
  'governance.manifest',
  'governance.contract-index'
];

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required catalog entry missing: ${requiredId}`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${catalog.entries.length} contract catalog entries`);
