#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const matrix = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_VERIFICATION_MATRIX.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-verification-matrix.schema.json'), 'utf8'));

const requiredIds = [
  'public-surface-coverage',
  'capsule-and-api-example-integrity',
  'coverage-and-negative-paths',
  'boundary-portability-and-limits',
  'community-and-maintainer-governance',
  'reviewer-and-summary-layers',
  'traceability-dependency-and-assurance',
  'docs-and-cross-surface-coherence',
  'release-state-and-maintenance-history'
];

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

assert(matrix.version === pkg.version, 'verification matrix version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-verification-matrix.schema.json', 'verification-matrix schema must declare expected public $id');
assert(typeof matrix.purpose === 'string' && matrix.purpose.length > 0, 'verification matrix must define purpose');
assert(Array.isArray(matrix.checks) && matrix.checks.length >= requiredIds.length, 'verification matrix must define expected check families');
assert(Array.isArray(matrix.review_commands) && matrix.review_commands.length >= 1, 'verification matrix must define review commands');

const ids = new Set();
for (const item of matrix.checks) {
  assert(typeof item.id === 'string' && item.id.length > 0, 'verification-matrix row must define id');
  assert(!ids.has(item.id), `duplicate verification-matrix row ${item.id}`);
  ids.add(item.id);
  assert(typeof item.summary === 'string' && item.summary.length > 0, `verification-matrix row ${item.id} must define summary`);
  assert(Array.isArray(item.commands) && item.commands.length >= 1, `verification-matrix row ${item.id} must define commands`);
  assert(Array.isArray(item.protects) && item.protects.length >= 1, `verification-matrix row ${item.id} must define protects`);
  assert(Array.isArray(item.strongest_surfaces) && item.strongest_surfaces.length >= 1, `verification-matrix row ${item.id} must define strongest_surfaces`);
  assert(Array.isArray(item.failure_modes_prevented) && item.failure_modes_prevented.length >= 1, `verification-matrix row ${item.id} must define failure_modes_prevented`);
  for (const command of item.commands) {
    assert(packageScripts.has(command), `verification-matrix row ${item.id} references unknown command ${command}`);
  }
  for (const rel of [...item.protects, ...item.strongest_surfaces]) {
    const normalized = rel.endsWith('/') ? rel.slice(0, -1) : rel;
    assert(exists(normalized), `verification-matrix row ${item.id} references missing file ${rel}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required verification-matrix row missing: ${requiredId}`);
}

for (const command of matrix.review_commands) {
  assert(packageScripts.has(command), `verification matrix references unknown review command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const evaluationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'evaluation-packet.md'), 'utf8');
const releaseEvidence = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const verification = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const faq = fs.readFileSync(path.join(repoRoot, 'docs', 'faq.md'), 'utf8');
const traceabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'traceability.md'), 'utf8');
const reviewScorecardDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'review-scorecard.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'README.md must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(readme.includes('docs/verification-matrix.md'), 'README.md must mention docs/verification-matrix.md');
assert(quickstart.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'QUICKSTART.md must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(reviewerGuide.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'reviewer guide must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(publicIndex.includes('verification-matrix.md'), 'public contract index must mention docs/verification-matrix.md');
assert(publicIndex.includes('../PUBLIC_VERIFICATION_MATRIX.json'), 'public contract index must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(publicIndex.includes('../schemas/public-verification-matrix.schema.json'), 'public contract index must mention public-verification-matrix schema');
assert(evaluationDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'evaluation packet doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(releaseEvidence.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'release-evidence doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(verification.includes('check:verification-matrix'), 'verification doc must mention check:verification-matrix');
assert(capabilityDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'capability-matrix doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(faq.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'FAQ must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(traceabilityDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'traceability doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(reviewScorecardDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'review-scorecard doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(schemasReadme.includes('public-verification-matrix.schema.json'), 'schemas README must mention public-verification-matrix schema');

assert(profile.health_signals?.machine_readable_verification_matrix_present === true, 'project profile must mark machine_readable_verification_matrix_present true');
assert(profile.reviewer_shortcuts?.verification_matrix === 'PUBLIC_VERIFICATION_MATRIX.json', 'project profile verification_matrix shortcut must point to PUBLIC_VERIFICATION_MATRIX.json');

assert(catalogPaths.has('docs/verification-matrix.md'), 'contract catalog must include docs/verification-matrix.md');
assert(catalogPaths.has('PUBLIC_VERIFICATION_MATRIX.json'), 'contract catalog must include PUBLIC_VERIFICATION_MATRIX.json');
assert(catalogPaths.has('schemas/public-verification-matrix.schema.json'), 'contract catalog must include public-verification-matrix schema');
assert(catalogPaths.has('scripts/check-verification-matrix.js'), 'contract catalog must include verification-matrix verifier');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:verification-matrix'), 'release metadata must include verification-matrix verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_VERIFICATION_MATRIX.json')), 'release metadata residual risks must mention PUBLIC_VERIFICATION_MATRIX.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked verification matrix, ${matrix.checks.length} check families, and ${catalog.entries.length} catalog entries`);
