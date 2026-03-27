#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const map = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_OWNERSHIP_MAP.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-ownership-map.schema.json'), 'utf8'));

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

assert(map.version === pkg.version, 'ownership map version must match package.json version');
assert(schema.$id === 'https://github.com/num1hub/capsule-specs/schemas/public-ownership-map.schema.json', 'ownership schema must declare expected public $id');
assert(Array.isArray(map.ownership_groups) && map.ownership_groups.length >= 5, 'ownership map must define ownership groups');
assert(Array.isArray(map.non_claims) && map.non_claims.length >= 2, 'ownership map must define non-claims');
assert(Array.isArray(map.review_commands) && map.review_commands.length >= 1, 'ownership map must define review commands');

const ids = new Set();
for (const group of map.ownership_groups) {
  assert(typeof group.id === 'string' && group.id.length > 0, 'ownership group must define id');
  assert(!ids.has(group.id), `duplicate ownership group ${group.id}`);
  ids.add(group.id);
  assert(typeof group.summary === 'string' && group.summary.length > 0, `ownership group ${group.id} must define summary`);
  assert(typeof group.public_owner === 'string' && group.public_owner.length > 0, `ownership group ${group.id} must define public_owner`);
  assert(Array.isArray(group.stronger_sources) && group.stronger_sources.length >= 1, `ownership group ${group.id} must define stronger_sources`);
  assert(Array.isArray(group.owned_artifacts) && group.owned_artifacts.length >= 1, `ownership group ${group.id} must define owned_artifacts`);
  assert(typeof group.stability === 'string' && group.stability.length > 0, `ownership group ${group.id} must define stability`);
  assert(Array.isArray(group.verify_commands) && group.verify_commands.length >= 1, `ownership group ${group.id} must define verify_commands`);
  for (const rel of [...group.stronger_sources, ...group.owned_artifacts]) {
    assert(exists(rel), `ownership group ${group.id} references missing file ${rel}`);
  }
  for (const command of group.verify_commands) {
    assert(packageScripts.has(command), `ownership group ${group.id} references unknown command ${command}`);
  }
}

for (const command of map.review_commands) {
  assert(packageScripts.has(command), `ownership map references unknown review command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const trustModel = fs.readFileSync(path.join(repoRoot, 'docs', 'trust-model.md'), 'utf8');
const sourceMaterials = fs.readFileSync(path.join(repoRoot, 'docs', 'source-materials.md'), 'utf8');
const projectionDoctrine = fs.readFileSync(path.join(repoRoot, 'docs', 'projection-doctrine.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const releaseEvidence = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const verification = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const evaluationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'evaluation-packet.md'), 'utf8');
const faq = fs.readFileSync(path.join(repoRoot, 'docs', 'faq.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_OWNERSHIP_MAP.json'), 'README.md must mention PUBLIC_OWNERSHIP_MAP.json');
assert(readme.includes('docs/artifact-ownership.md'), 'README.md must mention docs/artifact-ownership.md');
assert(quickstart.includes('PUBLIC_OWNERSHIP_MAP.json'), 'QUICKSTART.md must mention PUBLIC_OWNERSHIP_MAP.json');
assert(trustModel.includes('PUBLIC_OWNERSHIP_MAP.json'), 'trust-model doc must mention PUBLIC_OWNERSHIP_MAP.json');
assert(sourceMaterials.includes('PUBLIC_OWNERSHIP_MAP.json'), 'source-materials doc must mention PUBLIC_OWNERSHIP_MAP.json');
assert(projectionDoctrine.includes('PUBLIC_OWNERSHIP_MAP.json'), 'projection-doctrine doc must mention PUBLIC_OWNERSHIP_MAP.json');
assert(reviewerGuide.includes('PUBLIC_OWNERSHIP_MAP.json'), 'reviewer guide must mention PUBLIC_OWNERSHIP_MAP.json');
assert(releaseEvidence.includes('PUBLIC_OWNERSHIP_MAP.json'), 'release-evidence doc must mention PUBLIC_OWNERSHIP_MAP.json');
assert(verification.includes('check:ownership-map'), 'verification doc must mention check:ownership-map');
assert(capabilityDoc.includes('PUBLIC_OWNERSHIP_MAP.json'), 'capability-matrix doc must mention PUBLIC_OWNERSHIP_MAP.json');
assert(evaluationDoc.includes('PUBLIC_OWNERSHIP_MAP.json'), 'evaluation-packet doc must mention PUBLIC_OWNERSHIP_MAP.json');
assert(faq.includes('PUBLIC_OWNERSHIP_MAP.json'), 'FAQ must mention PUBLIC_OWNERSHIP_MAP.json');
assert(publicIndex.includes('artifact-ownership.md'), 'public contract index must mention docs/artifact-ownership.md');
assert(publicIndex.includes('../PUBLIC_OWNERSHIP_MAP.json'), 'public contract index must mention PUBLIC_OWNERSHIP_MAP.json');
assert(publicIndex.includes('../schemas/public-ownership-map.schema.json'), 'public contract index must mention public-ownership schema');
assert(schemasReadme.includes('public-ownership-map.schema.json'), 'schemas README must mention public-ownership-map schema');

assert(catalogPaths.has('docs/artifact-ownership.md'), 'contract catalog must include docs/artifact-ownership.md');
assert(catalogPaths.has('PUBLIC_OWNERSHIP_MAP.json'), 'contract catalog must include PUBLIC_OWNERSHIP_MAP.json');
assert(catalogPaths.has('schemas/public-ownership-map.schema.json'), 'contract catalog must include public-ownership-map schema');
assert(catalogPaths.has('scripts/check-ownership-map.js'), 'contract catalog must include ownership-map verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ownership map, ${map.ownership_groups.length} ownership groups, and ${catalog.entries.length} catalog entries`);
