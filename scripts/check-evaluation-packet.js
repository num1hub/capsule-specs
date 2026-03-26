#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const evaluationPacket = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_EVALUATION_PACKET.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-evaluation-packet.schema.json'), 'utf8'));

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

assert(evaluationPacket.version === pkg.version, 'evaluation packet version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-evaluation-packet.schema.json', 'evaluation packet schema must declare expected public $id');
assert(evaluationPacket.repository_identity?.owner === 'n1hub', 'evaluation packet owner must be n1hub');
assert(evaluationPacket.repository_identity?.name === 'specs', 'evaluation packet name must be specs');
assert(evaluationPacket.repository_identity?.homepage === 'https://github.com/n1hub/specs', 'evaluation packet homepage must match the intended public repo URL');
assert(evaluationPacket.repository_identity?.license === pkg.license, 'evaluation packet license must match package.json');
assert(evaluationPacket.repository_identity?.primary_maintainer === profile.repository_identity?.primary_maintainer, 'evaluation packet maintainer must match project profile');

assert(Array.isArray(evaluationPacket.evaluation_goals) && evaluationPacket.evaluation_goals.length >= 3, 'evaluation packet must define evaluation goals');
assert(Array.isArray(evaluationPacket.fast_review_path) && evaluationPacket.fast_review_path.length >= 5, 'evaluation packet must define fast review path');
assert(Array.isArray(evaluationPacket.review_commands) && evaluationPacket.review_commands.length >= 1, 'evaluation packet must define review commands');
assert(Array.isArray(evaluationPacket.public_value_claims) && evaluationPacket.public_value_claims.length >= 2, 'evaluation packet must define public value claims');
assert(Array.isArray(evaluationPacket.non_claims) && evaluationPacket.non_claims.length >= 2, 'evaluation packet must define non-claims');
assert(Array.isArray(evaluationPacket.residual_risk_surfaces) && evaluationPacket.residual_risk_surfaces.length >= 1, 'evaluation packet must define residual risk surfaces');

for (const relativePath of evaluationPacket.fast_review_path) {
  assert(exists(relativePath), `evaluation packet fast review path references missing file ${relativePath}`);
}

for (const group of Object.values(evaluationPacket.strongest_evidence || {})) {
  assert(Array.isArray(group) && group.length >= 1, 'each strongest_evidence group must contain at least one path');
  for (const relativePath of group) {
    assert(exists(relativePath), `evaluation packet strongest_evidence references missing file ${relativePath}`);
  }
}

for (const relativePath of evaluationPacket.residual_risk_surfaces) {
  assert(exists(relativePath), `evaluation packet residual_risk_surfaces references missing file ${relativePath}`);
}

for (const command of evaluationPacket.review_commands) {
  assert(packageScripts.has(command), `evaluation packet references unknown review command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const evaluationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'evaluation-packet.md'), 'utf8');
const faqDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'faq.md'), 'utf8');
const releaseEvidenceDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');

assert(readme.includes('PUBLIC_EVALUATION_PACKET.json'), 'README.md must mention PUBLIC_EVALUATION_PACKET.json');
assert(readme.includes('docs/evaluation-packet.md'), 'README.md must mention docs/evaluation-packet.md');
assert(reviewerGuide.includes('PUBLIC_EVALUATION_PACKET.json'), 'reviewer guide must mention PUBLIC_EVALUATION_PACKET.json');
assert(evaluationDoc.includes('PUBLIC_EVALUATION_PACKET.json'), 'evaluation-packet doc must mention PUBLIC_EVALUATION_PACKET.json');
assert(evaluationDoc.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'evaluation-packet doc must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(evaluationDoc.includes('PUBLIC_OWNERSHIP_MAP.json'), 'evaluation-packet doc must mention PUBLIC_OWNERSHIP_MAP.json');
assert(evaluationDoc.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'evaluation-packet doc must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(faqDoc.includes('PUBLIC_EVALUATION_PACKET.json'), 'FAQ must mention PUBLIC_EVALUATION_PACKET.json');
assert(releaseEvidenceDoc.includes('PUBLIC_EVALUATION_PACKET.json'), 'release-evidence doc must mention PUBLIC_EVALUATION_PACKET.json');
assert(capabilityDoc.includes('PUBLIC_EVALUATION_PACKET.json'), 'capability-matrix doc must mention PUBLIC_EVALUATION_PACKET.json');
assert(quickstart.includes('PUBLIC_EVALUATION_PACKET.json'), 'QUICKSTART.md must mention PUBLIC_EVALUATION_PACKET.json');

assert(catalogPaths.has('PUBLIC_EVALUATION_PACKET.json'), 'contract catalog must include PUBLIC_EVALUATION_PACKET.json');
assert(catalogPaths.has('docs/evaluation-packet.md'), 'contract catalog must include docs/evaluation-packet.md');
assert(catalogPaths.has('schemas/public-evaluation-packet.schema.json'), 'contract catalog must include public-evaluation-packet schema');
assert(catalogPaths.has('scripts/check-evaluation-packet.js'), 'contract catalog must include evaluation-packet verifier');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:evaluation-packet'), 'release metadata must include evaluation-packet verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_EVALUATION_PACKET.json')), 'release metadata residual risks must mention PUBLIC_EVALUATION_PACKET.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked evaluation packet, ${evaluationPacket.fast_review_path.length} fast-review paths, and ${catalog.entries.length} catalog entries`);
