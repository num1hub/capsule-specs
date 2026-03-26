#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const evaluation = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_EVALUATION_PACKET.json'), 'utf8'));
const capabilityMatrix = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CAPABILITY_MATRIX.json'), 'utf8'));
const dependencyGraph = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_DEPENDENCY_GRAPH.json'), 'utf8'));
const traceability = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_TRACEABILITY_MATRIX.json'), 'utf8'));
const assuranceCase = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_ASSURANCE_CASE.json'), 'utf8'));
const maintenance = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_MAINTENANCE_MODEL.json'), 'utf8'));
const changeControl = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CHANGE_CONTROL_MODEL.json'), 'utf8'));
const updateCoherence = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_UPDATE_COHERENCE_MAP.json'), 'utf8'));
const reviewScorecard = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_REVIEW_SCORECARD.json'), 'utf8'));
const verificationMatrix = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_VERIFICATION_MATRIX.json'), 'utf8'));
const audiencePaths = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_AUDIENCE_PATHS.json'), 'utf8'));
const adoptionReadiness = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_ADOPTION_READINESS.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const freshness = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_FRESHNESS_MODEL.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-freshness-model.schema.json'), 'utf8'));

const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));
const requiredIds = [
  'repo-shape-and-release-counts',
  'reviewer-and-summary-layers',
  'contracts-examples-and-api',
  'governance-and-change-posture',
  'audience-and-adoption-posture',
  'maintenance-history-and-freshness-evidence'
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

assert(freshness.version === pkg.version, 'freshness model version must match package.json version');
assert(
  schema.$id === 'https://github.com/n1hub/specs/schemas/public-freshness-model.schema.json',
  'freshness schema must declare expected public $id'
);
assert(typeof freshness.purpose === 'string' && freshness.purpose.length > 0, 'freshness model must define purpose');
assert(Array.isArray(freshness.surfaces) && freshness.surfaces.length >= requiredIds.length, 'freshness model must define expected surfaces');
assert(Array.isArray(freshness.review_commands) && freshness.review_commands.length >= 1, 'freshness model must define review commands');

const ids = new Set();
for (const item of freshness.surfaces || []) {
  assert(typeof item.id === 'string' && item.id.length > 0, 'freshness surface must define id');
  assert(!ids.has(item.id), `duplicate freshness surface ${item.id}`);
  ids.add(item.id);
  assert(typeof item.summary === 'string' && item.summary.length > 0, `freshness surface ${item.id} must define summary`);
  assert(Array.isArray(item.refresh_when) && item.refresh_when.length >= 1, `freshness surface ${item.id} must define refresh_when`);
  assert(Array.isArray(item.strongest_surfaces) && item.strongest_surfaces.length >= 1, `freshness surface ${item.id} must define strongest_surfaces`);
  assert(Array.isArray(item.stale_signals) && item.stale_signals.length >= 1, `freshness surface ${item.id} must define stale_signals`);
  assert(Array.isArray(item.verify_commands) && item.verify_commands.length >= 1, `freshness surface ${item.id} must define verify_commands`);
  for (const relativePath of item.strongest_surfaces) {
    assert(exists(relativePath), `freshness surface ${item.id} references missing file ${relativePath}`);
  }
  for (const command of item.verify_commands) {
    assert(packageScripts.has(command), `freshness surface ${item.id} references unknown command ${command}`);
  }
}

for (const id of requiredIds) {
  assert(ids.has(id), `required freshness surface missing: ${id}`);
}

for (const command of freshness.review_commands) {
  assert(packageScripts.has(command), `freshness model references unknown review command ${command}`);
}

const readme = readText('README.md');
const quickstart = readText('QUICKSTART.md');
const reviewerGuide = readText('docs/reviewer-guide.md');
const evaluationDoc = readText('docs/evaluation-packet.md');
const releaseEvidence = readText('docs/release-evidence.md');
const verificationDoc = readText('docs/verification.md');
const publicIndex = readText('docs/public-contract-index.md');
const faq = readText('docs/faq.md');
const maintainerOps = readText('docs/maintainer-operations.md');
const capabilityDoc = readText('docs/capability-matrix.md');
const evidenceTimelineDoc = readText('docs/evidence-timeline.md');
const adoptionDoc = readText('docs/adoption-readiness.md');
const schemasReadme = readText('schemas/README.md');

assert(readme.includes('PUBLIC_FRESHNESS_MODEL.json'), 'README.md must mention PUBLIC_FRESHNESS_MODEL.json');
assert(readme.includes('docs/freshness.md'), 'README.md must mention docs/freshness.md');
assert(quickstart.includes('PUBLIC_FRESHNESS_MODEL.json'), 'QUICKSTART.md must mention PUBLIC_FRESHNESS_MODEL.json');
assert(reviewerGuide.includes('PUBLIC_FRESHNESS_MODEL.json'), 'reviewer guide must mention PUBLIC_FRESHNESS_MODEL.json');
assert(evaluationDoc.includes('PUBLIC_FRESHNESS_MODEL.json'), 'evaluation-packet doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(releaseEvidence.includes('PUBLIC_FRESHNESS_MODEL.json'), 'release-evidence doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(verificationDoc.includes('check:freshness'), 'verification doc must mention check:freshness');
assert(publicIndex.includes('freshness.md'), 'public contract index must mention docs/freshness.md');
assert(publicIndex.includes('../PUBLIC_FRESHNESS_MODEL.json'), 'public contract index must mention PUBLIC_FRESHNESS_MODEL.json');
assert(publicIndex.includes('../schemas/public-freshness-model.schema.json'), 'public contract index must mention public-freshness-model schema');
assert(faq.includes('PUBLIC_FRESHNESS_MODEL.json'), 'FAQ must mention PUBLIC_FRESHNESS_MODEL.json');
assert(maintainerOps.includes('PUBLIC_FRESHNESS_MODEL.json'), 'maintainer-operations doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(capabilityDoc.includes('PUBLIC_FRESHNESS_MODEL.json'), 'capability-matrix doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(evidenceTimelineDoc.includes('PUBLIC_FRESHNESS_MODEL.json'), 'evidence-timeline doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(adoptionDoc.includes('PUBLIC_FRESHNESS_MODEL.json'), 'adoption-readiness doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(schemasReadme.includes('public-freshness-model.schema.json'), 'schemas README must mention public-freshness-model schema');

assert(profile.purpose?.publishes?.includes('machine-readable freshness summaries'), 'project profile must publish machine-readable freshness summaries');
assert(profile.health_signals?.machine_readable_freshness_model_present === true, 'project profile must mark machine_readable_freshness_model_present true');
assert(profile.reviewer_shortcuts?.freshness_model === 'PUBLIC_FRESHNESS_MODEL.json', 'project profile freshness_model shortcut must point to PUBLIC_FRESHNESS_MODEL.json');
assert(profile.program_readiness?.freshness_posture_explicit === true, 'project profile must mark freshness_posture_explicit true');

assert(evaluation.fast_review_path.includes('PUBLIC_FRESHNESS_MODEL.json'), 'evaluation packet fast_review_path must include PUBLIC_FRESHNESS_MODEL.json');
assert(evaluation.strongest_evidence?.governance_and_review?.includes('docs/freshness.md'), 'evaluation packet governance_and_review must include docs/freshness.md');
assert(evaluation.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_FRESHNESS_MODEL.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_FRESHNESS_MODEL.json');
assert(
  evaluation.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('freshness')),
  'evaluation packet public_value_claims must mention freshness'
);

assert(capabilityMatrix.capabilities.some((item) => item.id === 'inspect-freshness-and-staleness-posture'), 'capability matrix must include inspect-freshness-and-staleness-posture');
assert(dependencyGraph.nodes.some((item) => item.id === 'freshness-and-staleness'), 'dependency graph must include freshness-and-staleness node');
assert(
  dependencyGraph.reading_paths.some((item) => item.id === 'reviewer-fast-path' && item.steps.includes('freshness-and-staleness')),
  'reviewer-fast-path must include freshness-and-staleness'
);
assert(
  dependencyGraph.reading_paths.some((item) => item.id === 'integrator-contract-path' && item.steps.includes('freshness-and-staleness')),
  'integrator-contract-path must include freshness-and-staleness'
);
assert(
  dependencyGraph.reading_paths.some((item) => item.id === 'contributor-governance-path' && item.steps.includes('freshness-and-staleness')),
  'contributor-governance-path must include freshness-and-staleness'
);

assert(traceability.traces.some((item) => item.id === 'freshness-and-stale-signals'), 'traceability matrix must include freshness-and-stale-signals');
assert(
  assuranceCase.claims.some((item) => item.strongest_surfaces?.includes('PUBLIC_FRESHNESS_MODEL.json') || item.supporting_surfaces?.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'assurance case must reference PUBLIC_FRESHNESS_MODEL.json'
);

assert(maintenance.required_evidence.includes('updated PUBLIC_FRESHNESS_MODEL.json when freshness triggers or stale signals changed'), 'maintenance model must require freshness-model updates');
assert(
  maintenance.operating_rules.some((item) => item.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'maintenance model operating_rules must mention PUBLIC_FRESHNESS_MODEL.json'
);

assert(changeControl.required_release_sync.includes('PUBLIC_FRESHNESS_MODEL.json'), 'change-control model must require release sync for PUBLIC_FRESHNESS_MODEL.json');
assert(
  updateCoherence.sync_groups.some((group) => group.required_surfaces.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'update-coherence map must require PUBLIC_FRESHNESS_MODEL.json in at least one sync group'
);

assert(reviewScorecard.criteria.some((item) => item.id === 'freshness-posture-explicit'), 'review scorecard must include freshness-posture-explicit');

const reviewerLayer = verificationMatrix.checks.find((item) => item.id === 'reviewer-and-summary-layers');
assert(reviewerLayer, 'verification matrix must define reviewer-and-summary-layers row');
assert(reviewerLayer.commands.includes('npm run check:freshness'), 'reviewer-and-summary-layers row must include npm run check:freshness');
assert(reviewerLayer.protects.includes('PUBLIC_FRESHNESS_MODEL.json'), 'reviewer-and-summary-layers row must protect PUBLIC_FRESHNESS_MODEL.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_FRESHNESS_MODEL.json'), 'reviewer-and-summary-layers row must reference PUBLIC_FRESHNESS_MODEL.json');
assert(reviewerLayer.failure_modes_prevented.some((item) => item.includes('stale')), 'reviewer-and-summary-layers row must mention stale summary prevention');
assert(verificationMatrix.checks.some((item) => item.id === 'freshness-and-summary-currency'), 'verification matrix must include freshness-and-summary-currency row');

assert(
  audiencePaths.audiences.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'audience paths reviewers entry must include PUBLIC_FRESHNESS_MODEL.json'
);
assert(
  audiencePaths.audiences.some((item) => item.id === 'maintainers' && item.strongest_surfaces.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'audience paths maintainers entry must include PUBLIC_FRESHNESS_MODEL.json'
);

assert(
  adoptionReadiness.profiles.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'adoption readiness reviewers profile must include PUBLIC_FRESHNESS_MODEL.json'
);
assert(
  adoptionReadiness.profiles.some((item) => item.id === 'maintainers' && item.strongest_surfaces.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'adoption readiness maintainers profile must include PUBLIC_FRESHNESS_MODEL.json'
);

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:freshness'), 'release metadata must include freshness verification');
assert(
  releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'release metadata residual risks must mention PUBLIC_FRESHNESS_MODEL.json'
);

assert(catalogPaths.has('docs/freshness.md'), 'contract catalog must include docs/freshness.md');
assert(catalogPaths.has('PUBLIC_FRESHNESS_MODEL.json'), 'contract catalog must include PUBLIC_FRESHNESS_MODEL.json');
assert(catalogPaths.has('schemas/public-freshness-model.schema.json'), 'contract catalog must include public-freshness-model schema');
assert(catalogPaths.has('scripts/check-freshness.js'), 'contract catalog must include freshness verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked freshness model, ${freshness.surfaces.length} surfaces, and ${catalog.entries.length} catalog entries`);
