#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const model = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CHANGE_CONTROL_MODEL.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-change-control-model.schema.json'), 'utf8'));

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

assert(model.version === pkg.version, 'change-control model version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-change-control-model.schema.json', 'change-control schema must declare expected public $id');
assert(model.stability_phase === '0.x', 'change-control model stability_phase must be 0.x');
assert(Array.isArray(model.change_classes) && model.change_classes.length >= 4, 'change-control model must define change classes');
assert(Array.isArray(model.deprecation_rules) && model.deprecation_rules.length >= 2, 'change-control model must define deprecation rules');
assert(Array.isArray(model.required_release_sync) && model.required_release_sync.length >= 4, 'change-control model must define required release sync items');
assert(Array.isArray(model.non_claims) && model.non_claims.length >= 2, 'change-control model must define non-claims');
assert(Array.isArray(model.review_commands) && model.review_commands.length >= 1, 'change-control model must define review commands');

const ids = new Set();
for (const item of [...model.change_classes, ...model.deprecation_rules]) {
  assert(typeof item.id === 'string' && item.id.length > 0, 'change-control rule must define id');
  assert(!ids.has(item.id), `duplicate change-control rule ${item.id}`);
  ids.add(item.id);
  assert(typeof item.summary === 'string' && item.summary.length > 0, `change-control rule ${item.id} must define summary`);
  assert(Array.isArray(item.strongest_surfaces) && item.strongest_surfaces.length >= 1, `change-control rule ${item.id} must define strongest_surfaces`);
  assert(Array.isArray(item.verify_commands) && item.verify_commands.length >= 1, `change-control rule ${item.id} must define verify_commands`);
  for (const rel of item.strongest_surfaces) {
    assert(exists(rel), `change-control rule ${item.id} references missing file ${rel}`);
  }
  for (const command of item.verify_commands) {
    assert(packageScripts.has(command), `change-control rule ${item.id} references unknown command ${command}`);
  }
}

for (const command of model.review_commands) {
  assert(packageScripts.has(command), `change-control model references unknown command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const versioning = fs.readFileSync(path.join(repoRoot, 'VERSIONING.md'), 'utf8');
const compatibility = fs.readFileSync(path.join(repoRoot, 'docs', 'compatibility.md'), 'utf8');
const releasing = fs.readFileSync(path.join(repoRoot, 'RELEASING.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const releaseEvidence = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const verification = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const faq = fs.readFileSync(path.join(repoRoot, 'docs', 'faq.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'README.md must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(readme.includes('docs/change-control.md'), 'README.md must mention docs/change-control.md');
assert(quickstart.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'QUICKSTART.md must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(versioning.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'VERSIONING.md must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(compatibility.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'compatibility doc must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(releasing.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'RELEASING.md must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(reviewerGuide.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'reviewer guide must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(releaseEvidence.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'release-evidence doc must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(verification.includes('check:change-control'), 'verification doc must mention check:change-control');
assert(publicIndex.includes('change-control.md'), 'public contract index must mention docs/change-control.md');
assert(publicIndex.includes('../PUBLIC_CHANGE_CONTROL_MODEL.json'), 'public contract index must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(publicIndex.includes('../schemas/public-change-control-model.schema.json'), 'public contract index must mention public-change-control schema');
assert(capabilityDoc.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'capability-matrix doc must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(faq.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'FAQ must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(schemasReadme.includes('public-change-control-model.schema.json'), 'schemas README must mention public-change-control-model schema');

assert(catalogPaths.has('docs/change-control.md'), 'contract catalog must include docs/change-control.md');
assert(catalogPaths.has('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'contract catalog must include PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(catalogPaths.has('schemas/public-change-control-model.schema.json'), 'contract catalog must include public-change-control-model schema');
assert(catalogPaths.has('scripts/check-change-control.js'), 'contract catalog must include change-control verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked change-control model, ${model.change_classes.length} change classes, ${model.deprecation_rules.length} deprecation rules, and ${catalog.entries.length} catalog entries`);
