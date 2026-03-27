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
const evidenceGaps = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-evidence-gaps-register.schema.json'), 'utf8'));

const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));
const requiredIds = [
  'no-live-public-service-evidence-yet',
  'no-external-adoption-metrics-yet',
  'no-independent-contributor-history-yet',
  'no-cross-version-stability-history-yet',
  'no-third-party-client-interoperability-evidence-yet',
  'no-long-horizon-freshness-history-yet'
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

assert(evidenceGaps.version === pkg.version, 'evidence-gaps version must match package.json version');
assert(schema.$id === 'https://github.com/num1hub/capsule-specs/schemas/public-evidence-gaps-register.schema.json', 'evidence-gaps schema must declare expected public $id');
assert(typeof evidenceGaps.purpose === 'string' && evidenceGaps.purpose.length > 0, 'evidence gaps register must define purpose');
assert(Array.isArray(evidenceGaps.gap_families) && evidenceGaps.gap_families.length >= requiredIds.length, 'evidence gaps register must define expected gap families');
assert(Array.isArray(evidenceGaps.non_claims) && evidenceGaps.non_claims.length >= 2, 'evidence gaps register must define non-claims');
assert(Array.isArray(evidenceGaps.review_commands) && evidenceGaps.review_commands.length >= 1, 'evidence gaps register must define review commands');

const ids = new Set();
for (const gap of evidenceGaps.gap_families || []) {
  assert(typeof gap.id === 'string' && gap.id.length > 0, 'evidence gap must define id');
  assert(!ids.has(gap.id), `duplicate evidence gap id ${gap.id}`);
  ids.add(gap.id);
  assert(typeof gap.summary === 'string' && gap.summary.length > 0, `gap ${gap.id} must define summary`);
  assert(typeof gap.why_gap_exists === 'string' && gap.why_gap_exists.length > 0, `gap ${gap.id} must define why_gap_exists`);
  assert(Array.isArray(gap.strongest_current_surfaces) && gap.strongest_current_surfaces.length >= 1, `gap ${gap.id} must define strongest_current_surfaces`);
  assert(Array.isArray(gap.missing_or_manual_evidence) && gap.missing_or_manual_evidence.length >= 1, `gap ${gap.id} must define missing_or_manual_evidence`);
  assert(Array.isArray(gap.next_public_hardening_steps) && gap.next_public_hardening_steps.length >= 1, `gap ${gap.id} must define next_public_hardening_steps`);
  assert(Array.isArray(gap.verify_commands) && gap.verify_commands.length >= 1, `gap ${gap.id} must define verify_commands`);
  assert(Array.isArray(gap.bounded_non_claims) && gap.bounded_non_claims.length >= 1, `gap ${gap.id} must define bounded_non_claims`);

  for (const relativePath of gap.strongest_current_surfaces) {
    assert(exists(relativePath), `gap ${gap.id} references missing file ${relativePath}`);
  }
  for (const command of gap.verify_commands) {
    assert(packageScripts.has(command), `gap ${gap.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required evidence gap missing: ${requiredId}`);
}
for (const command of evidenceGaps.review_commands) {
  assert(packageScripts.has(command), `evidence gaps register references unknown review command ${command}`);
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

assert(readme.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'README.md must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(readme.includes('docs/evidence-gaps.md'), 'README.md must mention docs/evidence-gaps.md');
assert(quickstart.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'QUICKSTART.md must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(reviewerGuide.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'reviewer guide must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(evaluationDoc.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'evaluation-packet doc must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(releaseEvidence.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'release-evidence doc must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(verificationDoc.includes('check:evidence-gaps'), 'verification doc must mention check:evidence-gaps');
assert(publicIndex.includes('evidence-gaps.md'), 'public contract index must mention docs/evidence-gaps.md');
assert(publicIndex.includes('../PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'public contract index must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(publicIndex.includes('../schemas/public-evidence-gaps-register.schema.json'), 'public contract index must mention public-evidence-gaps schema');
assert(faq.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'FAQ must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(capabilityDoc.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'capability-matrix doc must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');

assert(projectProfile.purpose?.publishes?.includes('machine-readable public-evidence-gap summaries'), 'project profile must publish machine-readable public-evidence-gap summaries');
assert(projectProfile.health_signals?.machine_readable_evidence_gaps_present === true, 'project profile must mark machine_readable_evidence_gaps_present true');
assert(projectProfile.reviewer_shortcuts?.evidence_gaps === 'PUBLIC_EVIDENCE_GAPS_REGISTER.json', 'project profile evidence_gaps shortcut must point to PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(projectProfile.program_readiness?.evidence_gaps_explicit === true, 'project profile must mark evidence_gaps_explicit true');

assert(evaluationPacket.fast_review_path.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'evaluation packet fast_review_path must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/evidence-gaps.md'), 'evaluation packet governance_and_review must include docs/evidence-gaps.md');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('evidence gaps')), 'evaluation packet public_value_claims must mention evidence gaps');
assert(Array.isArray(evaluationPacket.residual_risk_surfaces) && evaluationPacket.residual_risk_surfaces.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'evaluation packet residual_risk_surfaces must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');

assert(capabilityMatrix.capabilities.some((item) => item.id === 'inspect-public-evidence-gaps-and-review-needs'), 'capability matrix must include inspect-public-evidence-gaps-and-review-needs');
assert(dependencyGraph.nodes.some((item) => item.id === 'public-evidence-gaps'), 'dependency graph must include public-evidence-gaps node');
assert(dependencyGraph.reading_paths.some((item) => item.id === 'reviewer-fast-path' && item.steps.includes('public-evidence-gaps')), 'reviewer-fast-path must include public-evidence-gaps');
assert(dependencyGraph.reading_paths.some((item) => item.id === 'contributor-governance-path' && item.steps.includes('public-evidence-gaps')), 'contributor-governance-path must include public-evidence-gaps');

assert(traceability.traces.some((item) => item.id === 'explicit-public-evidence-gaps'), 'traceability matrix must include explicit-public-evidence-gaps');
assert(assuranceCase.claims.some((item) => item.strongest_surfaces?.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json') || item.supporting_surfaces?.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'assurance case must reference PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(maintenanceModel.required_evidence.includes('updated PUBLIC_EVIDENCE_GAPS_REGISTER.json when a public evidence gap, manual-review boundary, or maturity caveat changed materially'), 'maintenance model must require evidence-gaps updates');
assert(maintenanceModel.operating_rules.some((item) => item.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'maintenance model operating_rules must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(changeControl.required_release_sync.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'change-control model must require release sync for PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(updateCoherence.sync_groups.some((group) => Array.isArray(group.required_surfaces) && group.required_surfaces.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'update-coherence map must require PUBLIC_EVIDENCE_GAPS_REGISTER.json in at least one sync group');
assert(reviewScorecard.criteria.some((item) => item.id === 'evidence-gaps-explicit'), 'review scorecard must include evidence-gaps-explicit');

const reviewerLayer = verificationMatrix.checks.find((item) => item.id === 'reviewer-and-summary-layers');
assert(reviewerLayer, 'verification matrix must define reviewer-and-summary-layers row');
assert(reviewerLayer.commands.includes('npm run check:evidence-gaps'), 'reviewer-and-summary-layers row must include npm run check:evidence-gaps');
assert(reviewerLayer.protects.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'reviewer-and-summary-layers row must protect PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'reviewer-and-summary-layers row must reference PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(reviewerLayer.failure_modes_prevented.some((item) => item.includes('evidence gaps')), 'reviewer-and-summary-layers row must mention evidence-gap failure prevention');
assert(verificationMatrix.checks.some((item) => item.id === 'evidence-gaps-and-bounded-maturity'), 'verification matrix must include evidence-gaps-and-bounded-maturity row');

assert(audiencePaths.audiences.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'audience paths reviewers entry must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(audiencePaths.audiences.some((item) => item.id === 'contributors' && item.strongest_surfaces.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'audience paths contributors entry must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(audiencePaths.audiences.some((item) => item.id === 'maintainers' && item.strongest_surfaces.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'audience paths maintainers entry must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(adoptionReadiness.profiles.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'adoption readiness reviewers profile must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(adoptionReadiness.profiles.some((item) => item.id === 'contributors' && item.strongest_surfaces.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'adoption readiness contributors profile must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(adoptionReadiness.profiles.some((item) => item.id === 'maintainers' && item.strongest_surfaces.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'adoption readiness maintainers profile must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:evidence-gaps'), 'release metadata must include evidence-gaps verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'release metadata residual risks must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');

assert(catalogPaths.has('docs/evidence-gaps.md'), 'contract catalog must include docs/evidence-gaps.md');
assert(catalogPaths.has('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'contract catalog must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(catalogPaths.has('schemas/public-evidence-gaps-register.schema.json'), 'contract catalog must include public-evidence-gaps schema');
assert(catalogPaths.has('scripts/check-evidence-gaps.js'), 'contract catalog must include evidence-gaps verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked evidence gaps, ${evidenceGaps.gap_families.length} gaps, and ${catalog.entries.length} catalog entries`);
