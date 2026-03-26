#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const limitations = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_LIMITATIONS_REGISTER.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-limitations-register.schema.json'), 'utf8'));

const requiredIds = [
  'deferred-runtime-domains',
  'bounded-reviewer-summaries',
  'no-hosted-service-guarantee',
  'public-sync-depends-on-maintainer-discipline'
];

const allowedClasses = new Set(['deferred-scope', 'summary-limit', 'service-limit', 'process-limit']);
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

assert(limitations.version === pkg.version, 'limitations register version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-limitations-register.schema.json', 'limitations-register schema must declare expected public $id');
assert(Array.isArray(limitations.limitations) && limitations.limitations.length >= requiredIds.length, 'limitations register must define expected limitation set');
assert(Array.isArray(limitations.non_claims) && limitations.non_claims.length >= 2, 'limitations register must define non-claims');
assert(Array.isArray(limitations.review_commands) && limitations.review_commands.length >= 1, 'limitations register must define review commands');

const ids = new Set();
for (const item of limitations.limitations) {
  assert(typeof item.id === 'string' && item.id.length > 0, 'limitation must define id');
  assert(!ids.has(item.id), `duplicate limitation ${item.id}`);
  ids.add(item.id);
  assert(allowedClasses.has(item.class), `limitation ${item.id} has unsupported class ${item.class}`);
  assert(typeof item.summary === 'string' && item.summary.length > 0, `limitation ${item.id} must define summary`);
  assert(typeof item.impact === 'string' && item.impact.length > 0, `limitation ${item.id} must define impact`);
  assert(Array.isArray(item.strongest_surfaces) && item.strongest_surfaces.length >= 1, `limitation ${item.id} must define strongest_surfaces`);
  assert(Array.isArray(item.verify_commands) && item.verify_commands.length >= 1, `limitation ${item.id} must define verify_commands`);
  for (const rel of item.strongest_surfaces) {
    assert(exists(rel), `limitation ${item.id} references missing file ${rel}`);
  }
  for (const command of item.verify_commands) {
    assert(packageScripts.has(command), `limitation ${item.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required limitation missing: ${requiredId}`);
}

for (const command of limitations.review_commands) {
  assert(packageScripts.has(command), `limitations register references unknown command ${command}`);
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
const scopeDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'repository-scope.md'), 'utf8');
const boundariesDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'domain-boundaries.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'README.md must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(readme.includes('docs/limitations-register.md'), 'README.md must mention docs/limitations-register.md');
assert(quickstart.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'QUICKSTART.md must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(reviewerGuide.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'reviewer guide must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(publicIndex.includes('limitations-register.md'), 'public contract index must mention docs/limitations-register.md');
assert(publicIndex.includes('../PUBLIC_LIMITATIONS_REGISTER.json'), 'public contract index must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(publicIndex.includes('../schemas/public-limitations-register.schema.json'), 'public contract index must mention public-limitations-register schema');
assert(evaluationDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'evaluation packet doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(releaseEvidence.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'release-evidence doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(verification.includes('check:limitations-register'), 'verification doc must mention check:limitations-register');
assert(capabilityDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'capability-matrix doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(faq.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'FAQ must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(scopeDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'repository-scope doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(boundariesDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'domain-boundaries doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(schemasReadme.includes('public-limitations-register.schema.json'), 'schemas README must mention public-limitations-register schema');

assert(profile.health_signals?.machine_readable_limitations_register_present === true, 'project profile must mark machine_readable_limitations_register_present true');
assert(profile.reviewer_shortcuts?.limitations_register === 'PUBLIC_LIMITATIONS_REGISTER.json', 'project profile limitations_register shortcut must point to PUBLIC_LIMITATIONS_REGISTER.json');

assert(catalogPaths.has('docs/limitations-register.md'), 'contract catalog must include docs/limitations-register.md');
assert(catalogPaths.has('PUBLIC_LIMITATIONS_REGISTER.json'), 'contract catalog must include PUBLIC_LIMITATIONS_REGISTER.json');
assert(catalogPaths.has('schemas/public-limitations-register.schema.json'), 'contract catalog must include public-limitations-register schema');
assert(catalogPaths.has('scripts/check-limitations-register.js'), 'contract catalog must include limitations-register verifier');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:limitations-register'), 'release metadata must include limitations-register verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_LIMITATIONS_REGISTER.json')), 'release metadata residual risks must mention PUBLIC_LIMITATIONS_REGISTER.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked limitations register, ${limitations.limitations.length} limitations, and ${catalog.entries.length} catalog entries`);
