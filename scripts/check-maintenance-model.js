#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const model = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_MAINTENANCE_MODEL.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-maintenance-model.schema.json'), 'utf8'));

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

assert(model.version === pkg.version, 'maintenance model version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-maintenance-model.schema.json', 'maintenance-model schema must declare expected public $id');
assert(model.primary_maintainer === 'egor-n1', 'maintenance model primary_maintainer must be egor-n1');
assert(Array.isArray(model.supported_channels) && model.supported_channels.length >= 3, 'maintenance model must define supported channels');
assert(Array.isArray(model.change_classes) && model.change_classes.length >= 4, 'maintenance model must define change classes');
assert(Array.isArray(model.required_evidence) && model.required_evidence.length >= 3, 'maintenance model must define required evidence');
assert(Array.isArray(model.operating_rules) && model.operating_rules.length >= 4, 'maintenance model must define operating rules');
assert(Array.isArray(model.non_claims) && model.non_claims.length >= 2, 'maintenance model must define non-claims');
assert(Array.isArray(model.review_commands) && model.review_commands.length >= 1, 'maintenance model must define review commands');

const ids = new Set();
for (const item of model.change_classes) {
  assert(typeof item.id === 'string' && item.id.length > 0, 'maintenance change class must define id');
  assert(!ids.has(item.id), `duplicate maintenance change class ${item.id}`);
  ids.add(item.id);
  assert(typeof item.summary === 'string' && item.summary.length > 0, `maintenance class ${item.id} must define summary`);
  assert(Array.isArray(item.strongest_surfaces) && item.strongest_surfaces.length >= 1, `maintenance class ${item.id} must define strongest_surfaces`);
  assert(Array.isArray(item.verify_commands) && item.verify_commands.length >= 1, `maintenance class ${item.id} must define verify_commands`);
  for (const rel of item.strongest_surfaces) {
    assert(exists(rel), `maintenance class ${item.id} references missing file ${rel}`);
  }
  for (const command of item.verify_commands) {
    assert(packageScripts.has(command), `maintenance class ${item.id} references unknown command ${command}`);
  }
}

for (const evidence of model.required_evidence) {
  assert(typeof evidence === 'string' && evidence.length > 0, 'maintenance model required_evidence entries must be non-empty strings');
  if (evidence.startsWith('npm run ')) {
    assert(packageScripts.has(evidence), `maintenance model references unknown command ${evidence}`);
  }
}

for (const command of model.review_commands) {
  assert(packageScripts.has(command), `maintenance model references unknown command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const maintainers = fs.readFileSync(path.join(repoRoot, 'MAINTAINERS.md'), 'utf8');
const contributing = fs.readFileSync(path.join(repoRoot, 'CONTRIBUTING.md'), 'utf8');
const community = fs.readFileSync(path.join(repoRoot, 'docs', 'community-health.md'), 'utf8');
const releasing = fs.readFileSync(path.join(repoRoot, 'RELEASING.md'), 'utf8');
const governance = fs.readFileSync(path.join(repoRoot, 'GOVERNANCE.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const releaseEvidence = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const verification = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'README.md must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(readme.includes('docs/maintainer-operations.md'), 'README.md must mention docs/maintainer-operations.md');
assert(quickstart.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'QUICKSTART.md must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(maintainers.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'MAINTAINERS.md must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(contributing.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'CONTRIBUTING.md must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(community.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'community-health doc must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(releasing.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'RELEASING.md must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(governance.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'GOVERNANCE.md must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(reviewerGuide.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'reviewer guide must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(releaseEvidence.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'release-evidence doc must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(verification.includes('check:maintenance-model'), 'verification doc must mention check:maintenance-model');
assert(capabilityDoc.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'capability-matrix doc must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(publicIndex.includes('maintainer-operations.md'), 'public contract index must mention docs/maintainer-operations.md');
assert(publicIndex.includes('../PUBLIC_MAINTENANCE_MODEL.json'), 'public contract index must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(publicIndex.includes('../schemas/public-maintenance-model.schema.json'), 'public contract index must mention public-maintenance schema');
assert(schemasReadme.includes('public-maintenance-model.schema.json'), 'schemas README must mention public-maintenance-model schema');

assert(catalogPaths.has('docs/maintainer-operations.md'), 'contract catalog must include docs/maintainer-operations.md');
assert(catalogPaths.has('PUBLIC_MAINTENANCE_MODEL.json'), 'contract catalog must include PUBLIC_MAINTENANCE_MODEL.json');
assert(catalogPaths.has('schemas/public-maintenance-model.schema.json'), 'contract catalog must include public-maintenance-model schema');
assert(catalogPaths.has('scripts/check-maintenance-model.js'), 'contract catalog must include maintenance-model verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked maintenance model, ${model.change_classes.length} change classes, and ${catalog.entries.length} catalog entries`);
