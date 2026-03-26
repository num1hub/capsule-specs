#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const strengthMap = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-evidence-strength-map.schema.json'), 'utf8'));

const requiredIds = [
  'capsule-law-and-shape',
  'validator-http-and-envelopes',
  'examples-and-negative-evidence',
  'reviewer-and-release-summaries',
  'governance-and-maintenance',
  'projection-and-portability'
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

assert(strengthMap.version === pkg.version, 'evidence-strength map version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-evidence-strength-map.schema.json', 'evidence-strength schema must declare expected public $id');
assert(typeof strengthMap.purpose === 'string' && strengthMap.purpose.length > 0, 'evidence-strength map must define purpose');
assert(Array.isArray(strengthMap.families) && strengthMap.families.length >= requiredIds.length, 'evidence-strength map must define expected families');
assert(Array.isArray(strengthMap.review_commands) && strengthMap.review_commands.length >= 1, 'evidence-strength map must define review commands');

const ids = new Set();
for (const family of strengthMap.families) {
  assert(typeof family.id === 'string' && family.id.length > 0, 'evidence-strength family must define id');
  assert(!ids.has(family.id), `duplicate evidence-strength family ${family.id}`);
  ids.add(family.id);
  assert(typeof family.summary === 'string' && family.summary.length > 0, `family ${family.id} must define summary`);
  assert(Array.isArray(family.strongest_surfaces) && family.strongest_surfaces.length >= 1, `family ${family.id} must define strongest_surfaces`);
  assert(Array.isArray(family.secondary_surfaces) && family.secondary_surfaces.length >= 1, `family ${family.id} must define secondary_surfaces`);
  assert(Array.isArray(family.illustrative_surfaces) && family.illustrative_surfaces.length >= 1, `family ${family.id} must define illustrative_surfaces`);
  assert(Array.isArray(family.preferred_for) && family.preferred_for.length >= 1, `family ${family.id} must define preferred_for`);
  assert(Array.isArray(family.not_authoritative_for) && family.not_authoritative_for.length >= 1, `family ${family.id} must define not_authoritative_for`);
  assert(Array.isArray(family.verify_commands) && family.verify_commands.length >= 1, `family ${family.id} must define verify_commands`);

  for (const relativePath of [...family.strongest_surfaces, ...family.secondary_surfaces, ...family.illustrative_surfaces]) {
    assert(exists(relativePath), `family ${family.id} references missing file ${relativePath}`);
  }

  for (const command of family.verify_commands) {
    assert(packageScripts.has(command), `family ${family.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required evidence-strength family missing: ${requiredId}`);
}

for (const command of strengthMap.review_commands) {
  assert(packageScripts.has(command), `evidence-strength map references unknown review command ${command}`);
}

const trustModel = fs.readFileSync(path.join(repoRoot, 'docs', 'trust-model.md'), 'utf8');
const compatibility = fs.readFileSync(path.join(repoRoot, 'docs', 'compatibility.md'), 'utf8');
const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const evaluationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'evaluation-packet.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const releaseEvidence = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const verification = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const faq = fs.readFileSync(path.join(repoRoot, 'docs', 'faq.md'), 'utf8');
const traceabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'traceability.md'), 'utf8');
const reviewScorecardDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'review-scorecard.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(trustModel.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'trust-model doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(compatibility.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'compatibility doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(readme.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'README.md must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(readme.includes('docs/evidence-strength.md'), 'README.md must mention docs/evidence-strength.md');
assert(quickstart.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'QUICKSTART.md must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(reviewerGuide.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'reviewer guide must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(evaluationDoc.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'evaluation packet doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(publicIndex.includes('evidence-strength.md'), 'public contract index must mention docs/evidence-strength.md');
assert(publicIndex.includes('../PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'public contract index must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(publicIndex.includes('../schemas/public-evidence-strength-map.schema.json'), 'public contract index must mention public-evidence-strength-map schema');
assert(releaseEvidence.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'release-evidence doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(verification.includes('check:evidence-strength'), 'verification doc must mention check:evidence-strength');
assert(capabilityDoc.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'capability-matrix doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(faq.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'FAQ must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(traceabilityDoc.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'traceability doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(reviewScorecardDoc.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'review-scorecard doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(schemasReadme.includes('public-evidence-strength-map.schema.json'), 'schemas README must mention public-evidence-strength-map schema');

assert(profile.health_signals?.machine_readable_evidence_strength_map_present === true, 'project profile must mark machine_readable_evidence_strength_map_present true');
assert(profile.reviewer_shortcuts?.evidence_strength_map === 'PUBLIC_EVIDENCE_STRENGTH_MAP.json', 'project profile evidence_strength_map shortcut must point to PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(profile.program_readiness?.evidence_strength_hierarchy_explicit === true, 'project profile must mark evidence_strength_hierarchy_explicit true');

assert(catalogPaths.has('docs/evidence-strength.md'), 'contract catalog must include docs/evidence-strength.md');
assert(catalogPaths.has('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'contract catalog must include PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(catalogPaths.has('schemas/public-evidence-strength-map.schema.json'), 'contract catalog must include public-evidence-strength-map schema');
assert(catalogPaths.has('scripts/check-evidence-strength.js'), 'contract catalog must include evidence-strength verifier');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:evidence-strength'), 'release metadata must include evidence-strength verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json')), 'release metadata residual risks must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked evidence-strength map, ${strengthMap.families.length} families, and ${catalog.entries.length} catalog entries`);
