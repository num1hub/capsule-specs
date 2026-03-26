#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const projectProfile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const evaluationPacket = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_EVALUATION_PACKET.json'), 'utf8'));
const capabilityMatrix = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CAPABILITY_MATRIX.json'), 'utf8'));
const dependencyGraph = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_DEPENDENCY_GRAPH.json'), 'utf8'));
const traceability = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_TRACEABILITY_MATRIX.json'), 'utf8'));
const assuranceCase = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_ASSURANCE_CASE.json'), 'utf8'));
const maintenanceModel = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_MAINTENANCE_MODEL.json'), 'utf8'));
const changeControl = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CHANGE_CONTROL_MODEL.json'), 'utf8'));
const updateCoherence = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_UPDATE_COHERENCE_MAP.json'), 'utf8'));
const reviewScorecard = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_REVIEW_SCORECARD.json'), 'utf8'));
const verificationMatrix = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_VERIFICATION_MATRIX.json'), 'utf8'));
const audiencePaths = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_AUDIENCE_PATHS.json'), 'utf8'));
const adoptionReadiness = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_ADOPTION_READINESS.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const ecosystemValue = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-ecosystem-value-map.schema.json'), 'utf8'));

const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));
const requiredIds = [
  'contract-foundation-for-tool-builders',
  'reviewer-grade-machine-readable-evidence',
  'validator-integration-utility',
  'portability-and-no-lock-in-posture',
  'maintained-open-core-projection-discipline',
  'program-and-ecosystem-readiness'
];

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

assert(ecosystemValue.version === pkg.version, 'ecosystem-value map version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-ecosystem-value-map.schema.json', 'ecosystem-value schema must declare expected public $id');
assert(typeof ecosystemValue.purpose === 'string' && ecosystemValue.purpose.length > 0, 'ecosystem-value map must define purpose');
assert(Array.isArray(ecosystemValue.value_families) && ecosystemValue.value_families.length >= requiredIds.length, 'ecosystem-value map must define expected value families');
assert(Array.isArray(ecosystemValue.non_claims) && ecosystemValue.non_claims.length >= 2, 'ecosystem-value map must define non-claims');
assert(Array.isArray(ecosystemValue.review_commands) && ecosystemValue.review_commands.length >= 1, 'ecosystem-value map must define review commands');

const ids = new Set();
for (const family of ecosystemValue.value_families || []) {
  assert(typeof family.id === 'string' && family.id.length > 0, 'ecosystem-value family must define id');
  assert(!ids.has(family.id), `duplicate ecosystem-value family ${family.id}`);
  ids.add(family.id);
  assert(typeof family.summary === 'string' && family.summary.length > 0, `ecosystem-value family ${family.id} must define summary`);
  assert(Array.isArray(family.beneficiaries) && family.beneficiaries.length >= 1, `ecosystem-value family ${family.id} must define beneficiaries`);
  assert(Array.isArray(family.strongest_surfaces) && family.strongest_surfaces.length >= 1, `ecosystem-value family ${family.id} must define strongest_surfaces`);
  assert(Array.isArray(family.supporting_surfaces) && family.supporting_surfaces.length >= 1, `ecosystem-value family ${family.id} must define supporting_surfaces`);
  assert(Array.isArray(family.verify_commands) && family.verify_commands.length >= 1, `ecosystem-value family ${family.id} must define verify_commands`);
  assert(Array.isArray(family.bounded_non_goals) && family.bounded_non_goals.length >= 1, `ecosystem-value family ${family.id} must define bounded_non_goals`);

  for (const relativePath of [...family.strongest_surfaces, ...family.supporting_surfaces]) {
    assert(exists(relativePath), `ecosystem-value family ${family.id} references missing file ${relativePath}`);
  }
  for (const command of family.verify_commands) {
    assert(packageScripts.has(command), `ecosystem-value family ${family.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required ecosystem-value family missing: ${requiredId}`);
}
for (const command of ecosystemValue.review_commands) {
  assert(packageScripts.has(command), `ecosystem-value map references unknown review command ${command}`);
}

const readme = readText('README.md');
const quickstart = readText('QUICKSTART.md');
const reviewerGuide = readText('docs/reviewer-guide.md');
const evaluationDoc = readText('docs/evaluation-packet.md');
const releaseEvidence = readText('docs/release-evidence.md');
const verificationDoc = readText('docs/verification.md');
const publicIndex = readText('docs/public-contract-index.md');
const faq = readText('docs/faq.md');
const capabilityDoc = readText('docs/capability-matrix.md');

assert(readme.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'README.md must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(readme.includes('docs/ecosystem-value.md'), 'README.md must mention docs/ecosystem-value.md');
assert(quickstart.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'QUICKSTART.md must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(reviewerGuide.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'reviewer guide must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(evaluationDoc.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'evaluation-packet doc must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(releaseEvidence.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'release-evidence doc must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(verificationDoc.includes('check:ecosystem-value'), 'verification doc must mention check:ecosystem-value');
assert(publicIndex.includes('ecosystem-value.md'), 'public contract index must mention docs/ecosystem-value.md');
assert(publicIndex.includes('../PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'public contract index must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(publicIndex.includes('../schemas/public-ecosystem-value-map.schema.json'), 'public contract index must mention public-ecosystem-value schema');
assert(faq.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'FAQ must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(capabilityDoc.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'capability-matrix doc must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');

assert(projectProfile.purpose?.publishes?.includes('machine-readable ecosystem-value summaries'), 'project profile must publish machine-readable ecosystem-value summaries');
assert(projectProfile.health_signals?.machine_readable_ecosystem_value_present === true, 'project profile must mark machine_readable_ecosystem_value_present true');
assert(projectProfile.reviewer_shortcuts?.ecosystem_value_map === 'PUBLIC_ECOSYSTEM_VALUE_MAP.json', 'project profile ecosystem_value_map shortcut must point to PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(projectProfile.program_readiness?.ecosystem_value_explicit === true, 'project profile must mark ecosystem_value_explicit true');

assert(evaluationPacket.fast_review_path.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'evaluation packet fast_review_path must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/ecosystem-value.md'), 'evaluation packet governance_and_review must include docs/ecosystem-value.md');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('ecosystem')), 'evaluation packet public_value_claims must mention ecosystem');

assert(capabilityMatrix.capabilities.some((item) => item.id === 'inspect-ecosystem-value-and-external-utility'), 'capability matrix must include inspect-ecosystem-value-and-external-utility');
assert(dependencyGraph.nodes.some((item) => item.id === 'ecosystem-value-and-program-fit'), 'dependency graph must include ecosystem-value-and-program-fit node');
assert(dependencyGraph.reading_paths.some((item) => item.id === 'reviewer-fast-path' && item.steps.includes('ecosystem-value-and-program-fit')), 'reviewer-fast-path must include ecosystem-value-and-program-fit');
assert(dependencyGraph.reading_paths.some((item) => item.id === 'integrator-contract-path' && item.steps.includes('ecosystem-value-and-program-fit')), 'integrator-contract-path must include ecosystem-value-and-program-fit');
assert(dependencyGraph.reading_paths.some((item) => item.id === 'contributor-governance-path' && item.steps.includes('ecosystem-value-and-program-fit')), 'contributor-governance-path must include ecosystem-value-and-program-fit');

assert(traceability.traces.some((item) => item.id === 'ecosystem-value-and-external-utility'), 'traceability matrix must include ecosystem-value-and-external-utility');
assert(assuranceCase.claims.some((item) => item.strongest_surfaces?.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json') || item.supporting_surfaces?.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json')), 'assurance case must reference PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(maintenanceModel.required_evidence.includes('updated PUBLIC_ECOSYSTEM_VALUE_MAP.json when external value posture or beneficiary-facing utility changed'), 'maintenance model must require ecosystem-value updates');
assert(maintenanceModel.operating_rules.some((item) => item.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json')), 'maintenance model operating_rules must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(changeControl.required_release_sync.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'change-control model must require release sync for PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(updateCoherence.sync_groups.some((group) => Array.isArray(group.required_surfaces) && group.required_surfaces.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json')), 'update-coherence map must require PUBLIC_ECOSYSTEM_VALUE_MAP.json in at least one sync group');
assert(reviewScorecard.criteria.some((item) => item.id === 'ecosystem-value-explicit'), 'review scorecard must include ecosystem-value-explicit');

const reviewerLayer = verificationMatrix.checks.find((item) => item.id === 'reviewer-and-summary-layers');
assert(reviewerLayer, 'verification matrix must define reviewer-and-summary-layers row');
assert(reviewerLayer.commands.includes('npm run check:ecosystem-value'), 'reviewer-and-summary-layers row must include npm run check:ecosystem-value');
assert(reviewerLayer.protects.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'reviewer-and-summary-layers row must protect PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'reviewer-and-summary-layers row must reference PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(reviewerLayer.failure_modes_prevented.some((item) => item.includes('ecosystem value')), 'reviewer-and-summary-layers row must mention ecosystem value failure prevention');
assert(verificationMatrix.checks.some((item) => item.id === 'ecosystem-value-and-program-utility'), 'verification matrix must include ecosystem-value-and-program-utility row');

assert(audiencePaths.audiences.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json')), 'audience paths reviewers entry must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(audiencePaths.audiences.some((item) => item.id === 'tool-builders' && item.strongest_surfaces.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json')), 'audience paths tool-builders entry must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(adoptionReadiness.profiles.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json')), 'adoption readiness reviewers profile must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(adoptionReadiness.profiles.some((item) => item.id === 'tool-builders' && item.strongest_surfaces.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json')), 'adoption readiness tool-builders profile must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:ecosystem-value'), 'release metadata must include ecosystem-value verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json')), 'release metadata residual risks must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');

assert(catalogPaths.has('docs/ecosystem-value.md'), 'contract catalog must include docs/ecosystem-value.md');
assert(catalogPaths.has('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'contract catalog must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(catalogPaths.has('schemas/public-ecosystem-value-map.schema.json'), 'contract catalog must include public-ecosystem-value schema');
assert(catalogPaths.has('scripts/check-ecosystem-value.js'), 'contract catalog must include ecosystem-value verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ecosystem-value map, ${ecosystemValue.value_families.length} value families, and ${catalog.entries.length} catalog entries`);
