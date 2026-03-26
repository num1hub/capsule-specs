#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const coherence = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_UPDATE_COHERENCE_MAP.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-update-coherence-map.schema.json'), 'utf8'));

const requiredIds = [
  'front-door-and-reviewer-path',
  'contracts-examples-and-teaching',
  'release-provenance-and-sync-evidence',
  'governance-and-summary-layers'
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

assert(coherence.version === pkg.version, 'update-coherence map version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-update-coherence-map.schema.json', 'update-coherence schema must declare expected public $id');
assert(Array.isArray(coherence.sync_groups) && coherence.sync_groups.length >= requiredIds.length, 'update-coherence map must define expected sync groups');
assert(Array.isArray(coherence.non_claims) && coherence.non_claims.length >= 2, 'update-coherence map must define non-claims');
assert(Array.isArray(coherence.review_commands) && coherence.review_commands.length >= 1, 'update-coherence map must define review commands');

const ids = new Set();
for (const group of coherence.sync_groups) {
  assert(typeof group.id === 'string' && group.id.length > 0, 'sync group must define id');
  assert(!ids.has(group.id), `duplicate sync group ${group.id}`);
  ids.add(group.id);
  assert(typeof group.summary === 'string' && group.summary.length > 0, `sync group ${group.id} must define summary`);
  assert(Array.isArray(group.change_triggers) && group.change_triggers.length >= 1, `sync group ${group.id} must define change_triggers`);
  assert(Array.isArray(group.required_surfaces) && group.required_surfaces.length >= 1, `sync group ${group.id} must define required_surfaces`);
  assert(Array.isArray(group.verify_commands) && group.verify_commands.length >= 1, `sync group ${group.id} must define verify_commands`);

  for (const relativePath of group.required_surfaces) {
    assert(exists(relativePath), `sync group ${group.id} references missing file ${relativePath}`);
  }

  for (const command of group.verify_commands) {
    assert(packageScripts.has(command), `sync group ${group.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required sync group missing: ${requiredId}`);
}

for (const command of coherence.review_commands) {
  assert(packageScripts.has(command), `update-coherence map references unknown review command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const releaseEvidence = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const verification = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const evaluationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'evaluation-packet.md'), 'utf8');
const faq = fs.readFileSync(path.join(repoRoot, 'docs', 'faq.md'), 'utf8');
const maintainerOps = fs.readFileSync(path.join(repoRoot, 'docs', 'maintainer-operations.md'), 'utf8');
const changeControl = fs.readFileSync(path.join(repoRoot, 'docs', 'change-control.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'README.md must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(readme.includes('docs/update-coherence.md'), 'README.md must mention docs/update-coherence.md');
assert(readme.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'README.md must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(readme.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'README.md must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(readme.includes('PUBLIC_REVIEW_SCORECARD.json'), 'README.md must mention PUBLIC_REVIEW_SCORECARD.json');
assert(readme.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'README.md must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(readme.includes('PUBLIC_AUDIENCE_PATHS.json'), 'README.md must mention PUBLIC_AUDIENCE_PATHS.json');
assert(readme.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'README.md must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(quickstart.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'QUICKSTART.md must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(reviewerGuide.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'reviewer guide must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(publicIndex.includes('update-coherence.md'), 'public contract index must mention docs/update-coherence.md');
assert(publicIndex.includes('../PUBLIC_UPDATE_COHERENCE_MAP.json'), 'public contract index must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(publicIndex.includes('../schemas/public-update-coherence-map.schema.json'), 'public contract index must mention public-update-coherence schema');
assert(releaseEvidence.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'release-evidence doc must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(verification.includes('check:update-coherence'), 'verification doc must mention check:update-coherence');
assert(capabilityDoc.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'capability-matrix doc must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(evaluationDoc.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'evaluation packet doc must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(evaluationDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'evaluation packet doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(evaluationDoc.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'evaluation packet doc must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(evaluationDoc.includes('PUBLIC_REVIEW_SCORECARD.json'), 'evaluation packet doc must mention PUBLIC_REVIEW_SCORECARD.json');
assert(evaluationDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'evaluation packet doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(evaluationDoc.includes('PUBLIC_AUDIENCE_PATHS.json'), 'evaluation packet doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(evaluationDoc.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'evaluation packet doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(faq.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'FAQ must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(maintainerOps.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'maintainer-operations doc must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(maintainerOps.includes('PUBLIC_AUDIENCE_PATHS.json'), 'maintainer-operations doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(maintainerOps.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'maintainer-operations doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(changeControl.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'change-control doc must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(schemasReadme.includes('public-update-coherence-map.schema.json'), 'schemas README must mention public-update-coherence schema');

assert(profile.health_signals?.machine_readable_update_coherence_present === true, 'project profile must mark machine_readable_update_coherence_present true');
assert(profile.reviewer_shortcuts?.update_coherence === 'PUBLIC_UPDATE_COHERENCE_MAP.json', 'project profile update_coherence shortcut must point to PUBLIC_UPDATE_COHERENCE_MAP.json');

assert(catalogPaths.has('docs/update-coherence.md'), 'contract catalog must include docs/update-coherence.md');
assert(catalogPaths.has('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'contract catalog must include PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(catalogPaths.has('schemas/public-update-coherence-map.schema.json'), 'contract catalog must include public-update-coherence schema');
assert(catalogPaths.has('scripts/check-update-coherence.js'), 'contract catalog must include update-coherence verifier');
assert(catalogPaths.has('PUBLIC_LIMITATIONS_REGISTER.json'), 'contract catalog must include PUBLIC_LIMITATIONS_REGISTER.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_TIMELINE.json'), 'contract catalog must include PUBLIC_EVIDENCE_TIMELINE.json');
assert(catalogPaths.has('PUBLIC_REVIEW_SCORECARD.json'), 'contract catalog must include PUBLIC_REVIEW_SCORECARD.json');
assert(catalogPaths.has('PUBLIC_VERIFICATION_MATRIX.json'), 'contract catalog must include PUBLIC_VERIFICATION_MATRIX.json');
assert(catalogPaths.has('PUBLIC_AUDIENCE_PATHS.json'), 'contract catalog must include PUBLIC_AUDIENCE_PATHS.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'contract catalog must include PUBLIC_EVIDENCE_STRENGTH_MAP.json');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:update-coherence'), 'release metadata must include update-coherence verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_UPDATE_COHERENCE_MAP.json')), 'release metadata residual risks must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(
  coherence.sync_groups.some((group) => group.required_surfaces.includes('PUBLIC_EVIDENCE_TIMELINE.json')),
  'update-coherence map must include PUBLIC_EVIDENCE_TIMELINE.json in at least one sync group'
);
assert(
  coherence.sync_groups.some((group) => group.required_surfaces.includes('PUBLIC_REVIEW_SCORECARD.json')),
  'update-coherence map must include PUBLIC_REVIEW_SCORECARD.json in at least one sync group'
);
assert(
  coherence.sync_groups.some((group) => group.required_surfaces.includes('PUBLIC_VERIFICATION_MATRIX.json')),
  'update-coherence map must include PUBLIC_VERIFICATION_MATRIX.json in at least one sync group'
);
assert(
  coherence.sync_groups.some((group) => group.required_surfaces.includes('PUBLIC_AUDIENCE_PATHS.json')),
  'update-coherence map must include PUBLIC_AUDIENCE_PATHS.json in at least one sync group'
);
assert(
  coherence.sync_groups.some((group) => group.required_surfaces.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json')),
  'update-coherence map must include PUBLIC_EVIDENCE_STRENGTH_MAP.json in at least one sync group'
);

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked update-coherence map, ${coherence.sync_groups.length} sync groups, and ${catalog.entries.length} catalog entries`);
