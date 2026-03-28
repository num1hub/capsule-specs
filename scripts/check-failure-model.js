#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const failureModel = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_FAILURE_MODEL.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-failure-model.schema.json'), 'utf8'));

const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

assert(failureModel.version === pkg.version, 'failure-model version must match package.json version');
assert(schema.$id === 'https://github.com/num1hub/capsule-specs/schemas/public-failure-model.schema.json', 'failure-model schema must declare expected public $id');
assert(Array.isArray(failureModel.principles) && failureModel.principles.length >= 3, 'failure model must define principles');
assert(Array.isArray(failureModel.failure_classes) && failureModel.failure_classes.length >= 4, 'failure model must define failure classes');
assert(Array.isArray(failureModel.non_claims) && failureModel.non_claims.length >= 2, 'failure model must define non-claims');
assert(Array.isArray(failureModel.review_commands) && failureModel.review_commands.length >= 1, 'failure model must define review commands');

const ids = new Set();
for (const failureClass of failureModel.failure_classes) {
  assert(typeof failureClass.id === 'string' && failureClass.id.length > 0, 'failure class must define id');
  assert(!ids.has(failureClass.id), `duplicate failure class id ${failureClass.id}`);
  ids.add(failureClass.id);
  assert(typeof failureClass.summary === 'string' && failureClass.summary.length > 0, `failure class ${failureClass.id} must define summary`);
  assert(Array.isArray(failureClass.strongest_surfaces) && failureClass.strongest_surfaces.length >= 1, `failure class ${failureClass.id} must define strongest_surfaces`);
  assert(Array.isArray(failureClass.verify_commands) && failureClass.verify_commands.length >= 1, `failure class ${failureClass.id} must define verify_commands`);

  for (const relativePath of failureClass.strongest_surfaces) {
    assert(exists(relativePath), `failure class ${failureClass.id} references missing file ${relativePath}`);
  }
  for (const command of failureClass.verify_commands) {
    assert(packageScripts.has(command), `failure class ${failureClass.id} references unknown command ${command}`);
  }
}

for (const command of failureModel.review_commands) {
  assert(packageScripts.has(command), `failure model references unknown review command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const verificationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const apiExamplesReadme = fs.readFileSync(path.join(repoRoot, 'examples', 'api', 'README.md'), 'utf8');
const apiEnvelopesDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'api-envelopes.md'), 'utf8');
const openapiDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'openapi.md'), 'utf8');

assert(readme.includes('PUBLIC_FAILURE_MODEL.json'), 'README.md must mention PUBLIC_FAILURE_MODEL.json');
assert(readme.includes('docs/failure-model.md'), 'README.md must mention docs/failure-model.md');
assert(quickstart.includes('PUBLIC_FAILURE_MODEL.json'), 'QUICKSTART.md must mention PUBLIC_FAILURE_MODEL.json');
assert(publicIndex.includes('failure-model.md'), 'public contract index must mention failure-model.md');
assert(publicIndex.includes('../PUBLIC_FAILURE_MODEL.json'), 'public contract index must mention PUBLIC_FAILURE_MODEL.json');
assert(publicIndex.includes('../schemas/public-failure-model.schema.json'), 'public contract index must mention public-failure-model schema');
assert(verificationDoc.includes('check:failure-model'), 'verification doc must mention check:failure-model');
assert(capabilityDoc.includes('PUBLIC_FAILURE_MODEL.json'), 'capability-matrix doc must mention PUBLIC_FAILURE_MODEL.json');
assert(apiExamplesReadme.includes('unauthorized-response.sample.json'), 'API examples README must mention unauthorized-response.sample.json');
assert(apiExamplesReadme.includes('conflict-response.sample.json'), 'API examples README must mention conflict-response.sample.json');
assert(apiExamplesReadme.includes('stats-error-response.sample.json'), 'API examples README must mention stats-error-response.sample.json');
assert(apiEnvelopesDoc.includes('unauthorized-response.sample.json'), 'api-envelopes doc must mention unauthorized-response.sample.json');
assert(apiEnvelopesDoc.includes('conflict-response.sample.json'), 'api-envelopes doc must mention conflict-response.sample.json');
assert(apiEnvelopesDoc.includes('stats-error-response.sample.json'), 'api-envelopes doc must mention stats-error-response.sample.json');
assert(readme.includes('docs/failure-model.md'), 'README.md must mention docs/failure-model.md');
assert(openapiDoc.includes('failure-model.md'), 'openapi doc must mention failure-model.md');

assert(catalogPaths.has('docs/failure-model.md'), 'contract catalog must include docs/failure-model.md');
assert(catalogPaths.has('PUBLIC_FAILURE_MODEL.json'), 'contract catalog must include PUBLIC_FAILURE_MODEL.json');
assert(catalogPaths.has('schemas/public-failure-model.schema.json'), 'contract catalog must include public-failure-model schema');
assert(catalogPaths.has('scripts/check-failure-model.js'), 'contract catalog must include failure-model verifier');
assert(catalogPaths.has('examples/api/unauthorized-response.sample.json'), 'contract catalog must include unauthorized-response.sample.json');
assert(catalogPaths.has('examples/api/conflict-response.sample.json'), 'contract catalog must include conflict-response.sample.json');
assert(catalogPaths.has('examples/api/stats-error-response.sample.json'), 'contract catalog must include stats-error-response.sample.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked failure model, ${failureModel.failure_classes.length} failure classes, and ${catalog.entries.length} catalog entries`);
