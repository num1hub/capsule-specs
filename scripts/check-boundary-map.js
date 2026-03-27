#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const boundaryMap = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_BOUNDARY_MAP.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-boundary-map.schema.json'), 'utf8'));

const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));
const publishedIds = new Set();
const deferredIds = new Set();

const requiredPublishedIds = [
  'capsule-law',
  'validator-api',
  'projection-governance',
  'generator-readiness',
  'reviewer-evidence'
];

const requiredDeferredIds = [
  'a2c',
  'graph',
  'projects',
  'branching-diff',
  'symphony',
  'n-infinity',
  'agents',
  'plugins',
  'delivery-surfaces',
  'hosted-infra'
];

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function repoExists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function isWithinRepo(absolutePath) {
  const normalizedRepoRoot = `${repoRoot}${path.sep}`;
  return absolutePath === repoRoot || absolutePath.startsWith(normalizedRepoRoot);
}

assert(boundaryMap.version === pkg.version, 'boundary map version must match package.json version');
assert(
  schema.$id === 'https://github.com/num1hub/capsule-specs/schemas/public-boundary-map.schema.json',
  'boundary-map schema must declare the expected public $id'
);
assert(Array.isArray(boundaryMap.global_rules) && boundaryMap.global_rules.length >= 3, 'boundary map must define global rules');
assert(Array.isArray(boundaryMap.published_boundaries) && boundaryMap.published_boundaries.length >= requiredPublishedIds.length, 'boundary map must define published boundaries');
assert(Array.isArray(boundaryMap.deferred_domains) && boundaryMap.deferred_domains.length >= requiredDeferredIds.length, 'boundary map must define deferred domains');

for (const boundary of boundaryMap.published_boundaries || []) {
  assert(typeof boundary.id === 'string' && boundary.id.length > 0, 'each published boundary must have an id');
  assert(!publishedIds.has(boundary.id), `duplicate published boundary id ${boundary.id}`);
  publishedIds.add(boundary.id);
  assert(typeof boundary.summary === 'string' && boundary.summary.length > 0, `published boundary ${boundary.id} must define summary`);
  assert(Array.isArray(boundary.strongest_surfaces) && boundary.strongest_surfaces.length > 0, `published boundary ${boundary.id} must define strongest_surfaces`);
  assert(Array.isArray(boundary.source_capsules) && boundary.source_capsules.length > 0, `published boundary ${boundary.id} must define source_capsules`);
  assert(Array.isArray(boundary.verify_commands) && boundary.verify_commands.length > 0, `published boundary ${boundary.id} must define verify_commands`);

  for (const relativePath of boundary.strongest_surfaces) {
    assert(repoExists(relativePath), `published boundary ${boundary.id} references missing repo file ${relativePath}`);
  }

  for (const absolutePath of boundary.source_capsules) {
    assert(path.isAbsolute(absolutePath), `published boundary ${boundary.id} source path must be absolute: ${absolutePath}`);
    if (isWithinRepo(absolutePath)) {
      assert(fs.existsSync(absolutePath), `published boundary ${boundary.id} references missing repo-local source capsule ${absolutePath}`);
    }
  }

  for (const command of boundary.verify_commands) {
    assert(packageScripts.has(command), `published boundary ${boundary.id} references unknown verify command ${command}`);
  }
}

for (const deferredDomain of boundaryMap.deferred_domains || []) {
  assert(typeof deferredDomain.id === 'string' && deferredDomain.id.length > 0, 'each deferred domain must have an id');
  assert(!deferredIds.has(deferredDomain.id), `duplicate deferred domain id ${deferredDomain.id}`);
  deferredIds.add(deferredDomain.id);
  assert(deferredDomain.status === 'deferred', `deferred domain ${deferredDomain.id} must have status deferred`);
  assert(typeof deferredDomain.summary === 'string' && deferredDomain.summary.length > 0, `deferred domain ${deferredDomain.id} must define summary`);
  assert(typeof deferredDomain.reason === 'string' && deferredDomain.reason.length > 0, `deferred domain ${deferredDomain.id} must define reason`);
}

for (const requiredId of requiredPublishedIds) {
  assert(publishedIds.has(requiredId), `required published boundary missing: ${requiredId}`);
}

for (const requiredId of requiredDeferredIds) {
  assert(deferredIds.has(requiredId), `required deferred domain missing: ${requiredId}`);
}

assert(catalogPaths.has('PUBLIC_BOUNDARY_MAP.json'), 'contract catalog must include PUBLIC_BOUNDARY_MAP.json');
assert(catalogPaths.has('PUBLIC_LIMITATIONS_REGISTER.json'), 'contract catalog must include PUBLIC_LIMITATIONS_REGISTER.json');
assert(catalogPaths.has('docs/projection-doctrine.md'), 'contract catalog must include docs/projection-doctrine.md');
assert(catalogPaths.has('docs/domain-boundaries.md'), 'contract catalog must include docs/domain-boundaries.md');
assert(catalogPaths.has('docs/limitations-register.md'), 'contract catalog must include docs/limitations-register.md');
assert(catalogPaths.has('docs/generator-readiness.md'), 'contract catalog must include docs/generator-readiness.md');
assert(catalogPaths.has('schemas/public-boundary-map.schema.json'), 'contract catalog must include schemas/public-boundary-map.schema.json');
assert(catalogPaths.has('scripts/check-boundary-map.js'), 'contract catalog must include scripts/check-boundary-map.js');

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const sourceMaterials = fs.readFileSync(path.join(repoRoot, 'docs', 'source-materials.md'), 'utf8');
const boundaryDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'domain-boundaries.md'), 'utf8');
const generatorDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'generator-readiness.md'), 'utf8');
const scopeDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'repository-scope.md'), 'utf8');

assert(readme.includes('PUBLIC_BOUNDARY_MAP.json'), 'README.md must mention PUBLIC_BOUNDARY_MAP.json');
assert(readme.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'README.md must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(readme.includes('docs/projection-doctrine.md'), 'README.md must mention docs/projection-doctrine.md');
assert(readme.includes('docs/domain-boundaries.md'), 'README.md must mention docs/domain-boundaries.md');
assert(readme.includes('docs/generator-readiness.md'), 'README.md must mention docs/generator-readiness.md');
assert(publicIndex.includes('projection-doctrine.md'), 'public contract index must mention projection-doctrine.md');
assert(publicIndex.includes('domain-boundaries.md'), 'public contract index must mention domain-boundaries.md');
assert(publicIndex.includes('generator-readiness.md'), 'public contract index must mention generator-readiness.md');
assert(publicIndex.includes('../PUBLIC_BOUNDARY_MAP.json'), 'public contract index must mention PUBLIC_BOUNDARY_MAP.json');
assert(publicIndex.includes('../schemas/public-boundary-map.schema.json'), 'public contract index must mention schemas/public-boundary-map.schema.json');
assert(reviewerGuide.includes('PUBLIC_BOUNDARY_MAP.json'), 'reviewer guide must mention PUBLIC_BOUNDARY_MAP.json');
assert(sourceMaterials.includes('capsules-as-projections'), 'source-materials doc must mention capsules-as-projections');
assert(sourceMaterials.includes('generator-readiness'), 'source-materials doc must mention generator-readiness');
assert(boundaryDoc.includes('PUBLIC_BOUNDARY_MAP.json'), 'domain-boundaries doc must mention PUBLIC_BOUNDARY_MAP.json');
assert(boundaryDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'domain-boundaries doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(scopeDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'repository-scope doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(generatorDoc.includes('capsule.contract.generator-projection-index.v1'), 'generator-readiness doc must mention generator projection index');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${boundaryMap.published_boundaries.length} published boundaries and ${boundaryMap.deferred_domains.length} deferred domains`);
