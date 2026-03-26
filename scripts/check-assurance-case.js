#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const assurance = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_ASSURANCE_CASE.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-assurance-case.schema.json'), 'utf8'));

const requiredIds = [
  'bounded-public-scope',
  'reviewable-machine-readable-evidence',
  'fail-closed-and-bounded-negative-paths',
  'maintained-change-and-release-discipline'
];

const allowedAudiences = new Set(['contributors', 'integrators', 'tool-builders', 'reviewers']);
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

assert(assurance.version === pkg.version, 'assurance case version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-assurance-case.schema.json', 'assurance-case schema must declare expected public $id');
assert(typeof assurance.objective === 'string' && assurance.objective.length > 0, 'assurance case must define objective');
assert(Array.isArray(assurance.claims) && assurance.claims.length >= requiredIds.length, 'assurance case must define the expected claim set');
assert(Array.isArray(assurance.non_claims) && assurance.non_claims.length >= 2, 'assurance case must define non-claims');
assert(Array.isArray(assurance.review_commands) && assurance.review_commands.length >= 1, 'assurance case must define review commands');

const ids = new Set();
for (const claim of assurance.claims) {
  assert(typeof claim.id === 'string' && claim.id.length > 0, 'assurance claim must define id');
  assert(!ids.has(claim.id), `duplicate assurance claim ${claim.id}`);
  ids.add(claim.id);
  assert(typeof claim.claim === 'string' && claim.claim.length > 0, `assurance claim ${claim.id} must define claim`);
  assert(Array.isArray(claim.audiences) && claim.audiences.length >= 1, `assurance claim ${claim.id} must define audiences`);
  assert(Array.isArray(claim.strongest_surfaces) && claim.strongest_surfaces.length >= 1, `assurance claim ${claim.id} must define strongest_surfaces`);
  assert(Array.isArray(claim.supporting_surfaces) && claim.supporting_surfaces.length >= 1, `assurance claim ${claim.id} must define supporting_surfaces`);
  assert(Array.isArray(claim.bounded_by) && claim.bounded_by.length >= 1, `assurance claim ${claim.id} must define bounded_by`);
  assert(Array.isArray(claim.verify_commands) && claim.verify_commands.length >= 1, `assurance claim ${claim.id} must define verify_commands`);

  for (const audience of claim.audiences) {
    assert(allowedAudiences.has(audience), `assurance claim ${claim.id} has unsupported audience ${audience}`);
  }

  for (const relativePath of [...claim.strongest_surfaces, ...claim.supporting_surfaces, ...claim.bounded_by]) {
    assert(exists(relativePath), `assurance claim ${claim.id} references missing file ${relativePath}`);
  }

  for (const command of claim.verify_commands) {
    assert(packageScripts.has(command), `assurance claim ${claim.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required assurance claim missing: ${requiredId}`);
}

for (const command of assurance.review_commands) {
  assert(packageScripts.has(command), `assurance case references unknown review command ${command}`);
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
const projectProfile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));

assert(readme.includes('PUBLIC_ASSURANCE_CASE.json'), 'README.md must mention PUBLIC_ASSURANCE_CASE.json');
assert(readme.includes('docs/assurance-case.md'), 'README.md must mention docs/assurance-case.md');
assert(quickstart.includes('PUBLIC_ASSURANCE_CASE.json'), 'QUICKSTART.md must mention PUBLIC_ASSURANCE_CASE.json');
assert(reviewerGuide.includes('PUBLIC_ASSURANCE_CASE.json'), 'reviewer guide must mention PUBLIC_ASSURANCE_CASE.json');
assert(publicIndex.includes('assurance-case.md'), 'public contract index must mention docs/assurance-case.md');
assert(publicIndex.includes('../PUBLIC_ASSURANCE_CASE.json'), 'public contract index must mention PUBLIC_ASSURANCE_CASE.json');
assert(publicIndex.includes('../schemas/public-assurance-case.schema.json'), 'public contract index must mention public-assurance-case schema');
assert(evaluationDoc.includes('PUBLIC_ASSURANCE_CASE.json'), 'evaluation packet doc must mention PUBLIC_ASSURANCE_CASE.json');
assert(evaluationDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'evaluation packet doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(releaseEvidence.includes('PUBLIC_ASSURANCE_CASE.json'), 'release-evidence doc must mention PUBLIC_ASSURANCE_CASE.json');
assert(verification.includes('check:assurance-case'), 'verification doc must mention check:assurance-case');
assert(capabilityDoc.includes('PUBLIC_ASSURANCE_CASE.json'), 'capability-matrix doc must mention PUBLIC_ASSURANCE_CASE.json');
assert(faq.includes('PUBLIC_ASSURANCE_CASE.json'), 'FAQ must mention PUBLIC_ASSURANCE_CASE.json');

assert(projectProfile.health_signals?.machine_readable_assurance_case_present === true, 'project profile must mark machine_readable_assurance_case_present true');
assert(projectProfile.reviewer_shortcuts?.assurance_case === 'PUBLIC_ASSURANCE_CASE.json', 'project profile assurance_case shortcut must point to PUBLIC_ASSURANCE_CASE.json');

assert(catalogPaths.has('docs/assurance-case.md'), 'contract catalog must include docs/assurance-case.md');
assert(catalogPaths.has('PUBLIC_ASSURANCE_CASE.json'), 'contract catalog must include PUBLIC_ASSURANCE_CASE.json');
assert(catalogPaths.has('schemas/public-assurance-case.schema.json'), 'contract catalog must include public-assurance-case schema');
assert(catalogPaths.has('scripts/check-assurance-case.js'), 'contract catalog must include assurance-case verifier');
assert(catalogPaths.has('PUBLIC_LIMITATIONS_REGISTER.json'), 'contract catalog must include PUBLIC_LIMITATIONS_REGISTER.json');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:assurance-case'), 'release metadata must include assurance-case verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_ASSURANCE_CASE.json')), 'release metadata residual risks must mention PUBLIC_ASSURANCE_CASE.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked assurance case, ${assurance.claims.length} claims, and ${catalog.entries.length} catalog entries`);
