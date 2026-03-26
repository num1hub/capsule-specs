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
const decisionLog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_DECISION_LOG.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-decision-log.schema.json'), 'utf8'));

const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));
const requiredIds = [
  'public-specs-surface-instead-of-full-runtime',
  'stronger-sources-outrank-summaries',
  'synthetic-public-safe-examples',
  'machine-readable-reviewer-layers',
  'portability-and-no-lock-in-via-public-contracts',
  'release-verified-projection-discipline'
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

assert(decisionLog.version === pkg.version, 'decision-log version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-decision-log.schema.json', 'decision-log schema must declare expected public $id');
assert(typeof decisionLog.purpose === 'string' && decisionLog.purpose.length > 0, 'decision log must define purpose');
assert(Array.isArray(decisionLog.decisions) && decisionLog.decisions.length >= requiredIds.length, 'decision log must define expected decisions');
assert(Array.isArray(decisionLog.non_claims) && decisionLog.non_claims.length >= 2, 'decision log must define non-claims');
assert(Array.isArray(decisionLog.review_commands) && decisionLog.review_commands.length >= 1, 'decision log must define review commands');

const ids = new Set();
for (const decision of decisionLog.decisions || []) {
  assert(typeof decision.id === 'string' && decision.id.length > 0, 'decision must define id');
  assert(!ids.has(decision.id), `duplicate decision id ${decision.id}`);
  ids.add(decision.id);
  assert(typeof decision.summary === 'string' && decision.summary.length > 0, `decision ${decision.id} must define summary`);
  assert(typeof decision.rationale === 'string' && decision.rationale.length > 0, `decision ${decision.id} must define rationale`);
  assert(Array.isArray(decision.strongest_surfaces) && decision.strongest_surfaces.length >= 1, `decision ${decision.id} must define strongest_surfaces`);
  assert(Array.isArray(decision.supporting_surfaces) && decision.supporting_surfaces.length >= 1, `decision ${decision.id} must define supporting_surfaces`);
  assert(Array.isArray(decision.verify_commands) && decision.verify_commands.length >= 1, `decision ${decision.id} must define verify_commands`);
  assert(Array.isArray(decision.bounded_non_goals) && decision.bounded_non_goals.length >= 1, `decision ${decision.id} must define bounded_non_goals`);

  for (const relativePath of [...decision.strongest_surfaces, ...decision.supporting_surfaces]) {
    assert(exists(relativePath), `decision ${decision.id} references missing file ${relativePath}`);
  }
  for (const command of decision.verify_commands) {
    assert(packageScripts.has(command), `decision ${decision.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required decision missing: ${requiredId}`);
}
for (const command of decisionLog.review_commands) {
  assert(packageScripts.has(command), `decision log references unknown review command ${command}`);
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

assert(readme.includes('PUBLIC_DECISION_LOG.json'), 'README.md must mention PUBLIC_DECISION_LOG.json');
assert(readme.includes('docs/decision-log.md'), 'README.md must mention docs/decision-log.md');
assert(quickstart.includes('PUBLIC_DECISION_LOG.json'), 'QUICKSTART.md must mention PUBLIC_DECISION_LOG.json');
assert(reviewerGuide.includes('PUBLIC_DECISION_LOG.json'), 'reviewer guide must mention PUBLIC_DECISION_LOG.json');
assert(evaluationDoc.includes('PUBLIC_DECISION_LOG.json'), 'evaluation-packet doc must mention PUBLIC_DECISION_LOG.json');
assert(releaseEvidence.includes('PUBLIC_DECISION_LOG.json'), 'release-evidence doc must mention PUBLIC_DECISION_LOG.json');
assert(verificationDoc.includes('check:decision-log'), 'verification doc must mention check:decision-log');
assert(publicIndex.includes('decision-log.md'), 'public contract index must mention docs/decision-log.md');
assert(publicIndex.includes('../PUBLIC_DECISION_LOG.json'), 'public contract index must mention PUBLIC_DECISION_LOG.json');
assert(publicIndex.includes('../schemas/public-decision-log.schema.json'), 'public contract index must mention public-decision-log schema');
assert(faq.includes('PUBLIC_DECISION_LOG.json'), 'FAQ must mention PUBLIC_DECISION_LOG.json');
assert(capabilityDoc.includes('PUBLIC_DECISION_LOG.json'), 'capability-matrix doc must mention PUBLIC_DECISION_LOG.json');

assert(projectProfile.purpose?.publishes?.includes('machine-readable public-decision summaries'), 'project profile must publish machine-readable public-decision summaries');
assert(projectProfile.health_signals?.machine_readable_decision_log_present === true, 'project profile must mark machine_readable_decision_log_present true');
assert(projectProfile.reviewer_shortcuts?.decision_log === 'PUBLIC_DECISION_LOG.json', 'project profile decision_log shortcut must point to PUBLIC_DECISION_LOG.json');
assert(projectProfile.program_readiness?.decision_rationale_explicit === true, 'project profile must mark decision_rationale_explicit true');

assert(evaluationPacket.fast_review_path.includes('PUBLIC_DECISION_LOG.json'), 'evaluation packet fast_review_path must include PUBLIC_DECISION_LOG.json');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/decision-log.md'), 'evaluation packet governance_and_review must include docs/decision-log.md');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_DECISION_LOG.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_DECISION_LOG.json');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('decision')), 'evaluation packet public_value_claims must mention decisions');

assert(capabilityMatrix.capabilities.some((item) => item.id === 'inspect-bounded-public-design-decisions'), 'capability matrix must include inspect-bounded-public-design-decisions');
assert(dependencyGraph.nodes.some((item) => item.id === 'public-decision-rationale'), 'dependency graph must include public-decision-rationale node');
assert(dependencyGraph.reading_paths.some((item) => item.id === 'reviewer-fast-path' && item.steps.includes('public-decision-rationale')), 'reviewer-fast-path must include public-decision-rationale');
assert(dependencyGraph.reading_paths.some((item) => item.id === 'contributor-governance-path' && item.steps.includes('public-decision-rationale')), 'contributor-governance-path must include public-decision-rationale');

assert(traceability.traces.some((item) => item.id === 'bounded-public-decisions-and-rationale'), 'traceability matrix must include bounded-public-decisions-and-rationale');
assert(assuranceCase.claims.some((item) => item.strongest_surfaces?.includes('PUBLIC_DECISION_LOG.json') || item.supporting_surfaces?.includes('PUBLIC_DECISION_LOG.json')), 'assurance case must reference PUBLIC_DECISION_LOG.json');
assert(maintenanceModel.required_evidence.includes('updated PUBLIC_DECISION_LOG.json when public design rationale, projection intent, or trust-sensitive public decisions changed'), 'maintenance model must require decision-log updates');
assert(maintenanceModel.operating_rules.some((item) => item.includes('PUBLIC_DECISION_LOG.json')), 'maintenance model operating_rules must mention PUBLIC_DECISION_LOG.json');
assert(changeControl.required_release_sync.includes('PUBLIC_DECISION_LOG.json'), 'change-control model must require release sync for PUBLIC_DECISION_LOG.json');
assert(updateCoherence.sync_groups.some((group) => Array.isArray(group.required_surfaces) && group.required_surfaces.includes('PUBLIC_DECISION_LOG.json')), 'update-coherence map must require PUBLIC_DECISION_LOG.json in at least one sync group');
assert(reviewScorecard.criteria.some((item) => item.id === 'decision-rationale-explicit'), 'review scorecard must include decision-rationale-explicit');

const reviewerLayer = verificationMatrix.checks.find((item) => item.id === 'reviewer-and-summary-layers');
assert(reviewerLayer, 'verification matrix must define reviewer-and-summary-layers row');
assert(reviewerLayer.commands.includes('npm run check:decision-log'), 'reviewer-and-summary-layers row must include npm run check:decision-log');
assert(reviewerLayer.protects.includes('PUBLIC_DECISION_LOG.json'), 'reviewer-and-summary-layers row must protect PUBLIC_DECISION_LOG.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_DECISION_LOG.json'), 'reviewer-and-summary-layers row must reference PUBLIC_DECISION_LOG.json');
assert(reviewerLayer.failure_modes_prevented.some((item) => item.includes('decision rationale')), 'reviewer-and-summary-layers row must mention decision rationale failure prevention');
assert(verificationMatrix.checks.some((item) => item.id === 'decision-rationale-and-public-intent'), 'verification matrix must include decision-rationale-and-public-intent row');

assert(audiencePaths.audiences.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_DECISION_LOG.json')), 'audience paths reviewers entry must include PUBLIC_DECISION_LOG.json');
assert(audiencePaths.audiences.some((item) => item.id === 'contributors' && item.strongest_surfaces.includes('PUBLIC_DECISION_LOG.json')), 'audience paths contributors entry must include PUBLIC_DECISION_LOG.json');
assert(adoptionReadiness.profiles.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_DECISION_LOG.json')), 'adoption readiness reviewers profile must include PUBLIC_DECISION_LOG.json');
assert(adoptionReadiness.profiles.some((item) => item.id === 'contributors' && item.strongest_surfaces.includes('PUBLIC_DECISION_LOG.json')), 'adoption readiness contributors profile must include PUBLIC_DECISION_LOG.json');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:decision-log'), 'release metadata must include decision-log verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_DECISION_LOG.json')), 'release metadata residual risks must mention PUBLIC_DECISION_LOG.json');

assert(catalogPaths.has('docs/decision-log.md'), 'contract catalog must include docs/decision-log.md');
assert(catalogPaths.has('PUBLIC_DECISION_LOG.json'), 'contract catalog must include PUBLIC_DECISION_LOG.json');
assert(catalogPaths.has('schemas/public-decision-log.schema.json'), 'contract catalog must include public-decision-log schema');
assert(catalogPaths.has('scripts/check-decision-log.js'), 'contract catalog must include decision-log verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked decision log, ${decisionLog.decisions.length} decisions, and ${catalog.entries.length} catalog entries`);
