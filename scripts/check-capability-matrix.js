#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const matrixPath = path.join(repoRoot, 'PUBLIC_CAPABILITY_MATRIX.json');
const schemaPath = path.join(repoRoot, 'schemas', 'public-capability-matrix.schema.json');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));

const requiredIds = [
  'inspect-capsule-law',
  'validate-public-examples-locally',
  'build-validator-client-from-public-contracts',
  'understand-trust-boundaries',
  'review-repository-maturity-quickly',
  'follow-fast-external-evaluation-path',
  'inspect-fail-closed-public-behavior',
  'assess-example-coverage',
  'trace-public-claims-end-to-end',
  'understand-projection-and-domain-boundaries',
  'evaluate-portability-and-import-trust',
  'contribute-safely-to-public-surface',
  'trace-provenance-and-release-state',
  'locate-high-signal-public-artifacts'
];

const expectedAudiences = new Set(['contributors', 'integrators', 'tool-builders', 'reviewers']);
const expectedReadiness = new Set(['ready', 'illustrative', 'reviewable']);

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));
const ids = new Set();

assert(matrix.matrix_version === pkg.version, 'capability matrix version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-capability-matrix.schema.json', 'capability matrix schema must declare the expected public $id');
assert(Array.isArray(matrix.capabilities) && matrix.capabilities.length >= requiredIds.length, 'capability matrix must contain the expected capability set');

for (const capability of matrix.capabilities || []) {
  assert(typeof capability.id === 'string' && capability.id.length > 0, 'each capability must have an id');
  assert(!ids.has(capability.id), `duplicate capability id ${capability.id}`);
  ids.add(capability.id);

  assert(expectedAudiences.has(capability.audience), `capability ${capability.id} has unsupported audience ${capability.audience}`);
  assert(expectedReadiness.has(capability.readiness), `capability ${capability.id} has unsupported readiness ${capability.readiness}`);
  assert(typeof capability.outcome === 'string' && capability.outcome.length > 0, `capability ${capability.id} must define outcome`);
  assert(Array.isArray(capability.strongest_surfaces) && capability.strongest_surfaces.length > 0, `capability ${capability.id} must define strongest_surfaces`);
  assert(Array.isArray(capability.supporting_surfaces) && capability.supporting_surfaces.length > 0, `capability ${capability.id} must define supporting_surfaces`);
  assert(Array.isArray(capability.verify_commands) && capability.verify_commands.length > 0, `capability ${capability.id} must define verify_commands`);

  for (const relativePath of [...capability.strongest_surfaces, ...capability.supporting_surfaces]) {
    assert(exists(relativePath), `capability ${capability.id} references missing file ${relativePath}`);
  }

  for (const command of capability.verify_commands) {
    assert(packageScripts.has(command), `capability ${capability.id} references unknown verify command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required capability missing: ${requiredId}`);
}

assert(catalogPaths.has('PUBLIC_CAPABILITY_MATRIX.json'), 'contract catalog must include PUBLIC_CAPABILITY_MATRIX.json');
assert(catalogPaths.has('PUBLIC_BOUNDARY_MAP.json'), 'contract catalog must include PUBLIC_BOUNDARY_MAP.json');
assert(catalogPaths.has('PUBLIC_PORTABILITY_PROFILE.json'), 'contract catalog must include PUBLIC_PORTABILITY_PROFILE.json');
assert(catalogPaths.has('PUBLIC_EVALUATION_PACKET.json'), 'contract catalog must include PUBLIC_EVALUATION_PACKET.json');
assert(catalogPaths.has('PUBLIC_FAILURE_MODEL.json'), 'contract catalog must include PUBLIC_FAILURE_MODEL.json');
assert(catalogPaths.has('PUBLIC_EXAMPLE_COVERAGE.json'), 'contract catalog must include PUBLIC_EXAMPLE_COVERAGE.json');
assert(catalogPaths.has('PUBLIC_TRACEABILITY_MATRIX.json'), 'contract catalog must include PUBLIC_TRACEABILITY_MATRIX.json');
assert(catalogPaths.has('docs/capability-matrix.md'), 'contract catalog must include docs/capability-matrix.md');
assert(catalogPaths.has('docs/example-coverage.md'), 'contract catalog must include docs/example-coverage.md');
assert(catalogPaths.has('docs/traceability.md'), 'contract catalog must include docs/traceability.md');
assert(catalogPaths.has('schemas/public-capability-matrix.schema.json'), 'contract catalog must include schemas/public-capability-matrix.schema.json');
assert(catalogPaths.has('schemas/public-example-coverage.schema.json'), 'contract catalog must include schemas/public-example-coverage.schema.json');
assert(catalogPaths.has('schemas/public-traceability-matrix.schema.json'), 'contract catalog must include schemas/public-traceability-matrix.schema.json');
assert(catalogPaths.has('scripts/check-capability-matrix.js'), 'contract catalog must include scripts/check-capability-matrix.js');

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');

assert(readme.includes('PUBLIC_CAPABILITY_MATRIX.json'), 'README.md must mention PUBLIC_CAPABILITY_MATRIX.json');
assert(readme.includes('PUBLIC_BOUNDARY_MAP.json'), 'README.md must mention PUBLIC_BOUNDARY_MAP.json');
assert(readme.includes('PUBLIC_PORTABILITY_PROFILE.json'), 'README.md must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(readme.includes('PUBLIC_EVALUATION_PACKET.json'), 'README.md must mention PUBLIC_EVALUATION_PACKET.json');
assert(readme.includes('PUBLIC_FAILURE_MODEL.json'), 'README.md must mention PUBLIC_FAILURE_MODEL.json');
assert(readme.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'README.md must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(readme.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'README.md must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(reviewerGuide.includes('PUBLIC_CAPABILITY_MATRIX.json'), 'reviewer guide must mention PUBLIC_CAPABILITY_MATRIX.json');
assert(capabilityDoc.includes('PUBLIC_CAPABILITY_MATRIX.json'), 'capability matrix doc must mention PUBLIC_CAPABILITY_MATRIX.json');
assert(capabilityDoc.includes('PUBLIC_BOUNDARY_MAP.json'), 'capability matrix doc must mention PUBLIC_BOUNDARY_MAP.json');
assert(capabilityDoc.includes('PUBLIC_PORTABILITY_PROFILE.json'), 'capability matrix doc must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(capabilityDoc.includes('PUBLIC_EVALUATION_PACKET.json'), 'capability matrix doc must mention PUBLIC_EVALUATION_PACKET.json');
assert(capabilityDoc.includes('PUBLIC_FAILURE_MODEL.json'), 'capability matrix doc must mention PUBLIC_FAILURE_MODEL.json');
assert(capabilityDoc.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'capability matrix doc must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(capabilityDoc.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'capability matrix doc must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(capabilityDoc.includes('PUBLIC_PROJECT_PROFILE.json'), 'capability matrix doc must mention PUBLIC_PROJECT_PROFILE.json');
assert(capabilityDoc.includes('PUBLIC_RELEASE_METADATA.json'), 'capability matrix doc must mention PUBLIC_RELEASE_METADATA.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${matrix.capabilities.length} capabilities against ${packageScripts.size} package scripts and ${catalog.entries.length} catalog entries`);
