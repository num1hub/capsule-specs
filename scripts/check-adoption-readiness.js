#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const evaluationPacket = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_EVALUATION_PACKET.json'), 'utf8'));
const capabilities = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CAPABILITY_MATRIX.json'), 'utf8'));
const dependencyGraph = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_DEPENDENCY_GRAPH.json'), 'utf8'));
const traceability = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_TRACEABILITY_MATRIX.json'), 'utf8'));
const maintenance = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_MAINTENANCE_MODEL.json'), 'utf8'));
const changeControl = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CHANGE_CONTROL_MODEL.json'), 'utf8'));
const updateCoherence = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_UPDATE_COHERENCE_MAP.json'), 'utf8'));
const scorecard = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_REVIEW_SCORECARD.json'), 'utf8'));
const verificationMatrix = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_VERIFICATION_MATRIX.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const audiencePaths = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_AUDIENCE_PATHS.json'), 'utf8'));
const assuranceCase = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_ASSURANCE_CASE.json'), 'utf8'));
const adoption = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_ADOPTION_READINESS.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-adoption-readiness.schema.json'), 'utf8'));

const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));
const requiredProfiles = [
  'reviewers',
  'integrators',
  'contributors',
  'tool-builders',
  'maintainers',
  'hosted-service-consumers'
];
const validReadiness = new Set(['ready', 'partial', 'deferred']);

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

assert(adoption.version === pkg.version, 'adoption-readiness version must match package.json version');
assert(
  schema.$id === 'https://github.com/num1hub/capsule-specs/schemas/public-adoption-readiness.schema.json',
  'adoption-readiness schema must declare expected public $id'
);
assert(typeof adoption.purpose === 'string' && adoption.purpose.length > 0, 'adoption-readiness must define purpose');
assert(Array.isArray(adoption.profiles) && adoption.profiles.length >= requiredProfiles.length, 'adoption-readiness must define expected profiles');
assert(Array.isArray(adoption.review_commands) && adoption.review_commands.length >= 1, 'adoption-readiness must define review commands');

const seen = new Set();
for (const profileEntry of adoption.profiles || []) {
  assert(typeof profileEntry.id === 'string' && profileEntry.id.length > 0, 'adoption profile must define id');
  assert(!seen.has(profileEntry.id), `duplicate adoption profile ${profileEntry.id}`);
  seen.add(profileEntry.id);

  assert(validReadiness.has(profileEntry.readiness), `adoption profile ${profileEntry.id} has unsupported readiness ${profileEntry.readiness}`);
  assert(typeof profileEntry.summary === 'string' && profileEntry.summary.length > 0, `adoption profile ${profileEntry.id} must define summary`);
  assert(Array.isArray(profileEntry.can_do_now) && profileEntry.can_do_now.length >= 1, `adoption profile ${profileEntry.id} must define can_do_now`);
  assert(Array.isArray(profileEntry.prerequisites) && profileEntry.prerequisites.length >= 1, `adoption profile ${profileEntry.id} must define prerequisites`);
  assert(Array.isArray(profileEntry.strongest_surfaces) && profileEntry.strongest_surfaces.length >= 1, `adoption profile ${profileEntry.id} must define strongest_surfaces`);
  assert(Array.isArray(profileEntry.bounded_non_goals) && profileEntry.bounded_non_goals.length >= 1, `adoption profile ${profileEntry.id} must define bounded_non_goals`);
  assert(Array.isArray(profileEntry.verify_commands) && profileEntry.verify_commands.length >= 1, `adoption profile ${profileEntry.id} must define verify_commands`);

  for (const relativePath of profileEntry.strongest_surfaces) {
    assert(exists(relativePath), `adoption profile ${profileEntry.id} references missing file ${relativePath}`);
  }

  for (const command of [...profileEntry.verify_commands, ...adoption.review_commands]) {
    assert(packageScripts.has(command), `adoption profile ${profileEntry.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredProfiles) {
  assert(seen.has(requiredId), `required adoption profile missing: ${requiredId}`);
}

const reviewerProfile = adoption.profiles.find((item) => item.id === 'reviewers');
const integratorProfile = adoption.profiles.find((item) => item.id === 'integrators');
const maintainerProfile = adoption.profiles.find((item) => item.id === 'maintainers');
const hostedProfile = adoption.profiles.find((item) => item.id === 'hosted-service-consumers');

assert(reviewerProfile?.readiness === 'ready', 'reviewers adoption profile must be ready');
assert(integratorProfile?.readiness === 'ready', 'integrators adoption profile must be ready');
assert(maintainerProfile?.readiness === 'ready', 'maintainers adoption profile must be ready');
assert(hostedProfile?.readiness === 'deferred', 'hosted-service-consumers adoption profile must be deferred');
assert(hostedProfile?.bounded_non_goals.some((item) => item.includes('hosted validator')), 'hosted-service-consumers profile must explicitly reject hosted-validator claims');

const readme = readText('README.md');
const quickstart = readText('QUICKSTART.md');
const reviewerGuide = readText('docs/reviewer-guide.md');
const evaluationDoc = readText('docs/evaluation-packet.md');
const releaseEvidence = readText('docs/release-evidence.md');
const verificationDoc = readText('docs/verification.md');
const publicIndex = readText('docs/public-contract-index.md');
const integrationGuide = readText('docs/integration-guide.md');
const communityHealth = readText('docs/community-health.md');
const maintainerOps = readText('docs/maintainer-operations.md');
const faq = readText('docs/faq.md');
const capabilityDoc = readText('docs/capability-matrix.md');
const schemasReadme = readText('schemas/README.md');

assert(readme.includes('PUBLIC_ADOPTION_READINESS.json'), 'README.md must mention PUBLIC_ADOPTION_READINESS.json');
assert(readme.includes('docs/adoption-readiness.md'), 'README.md must mention docs/adoption-readiness.md');
assert(quickstart.includes('PUBLIC_ADOPTION_READINESS.json'), 'QUICKSTART.md must mention PUBLIC_ADOPTION_READINESS.json');
assert(reviewerGuide.includes('PUBLIC_ADOPTION_READINESS.json'), 'reviewer guide must mention PUBLIC_ADOPTION_READINESS.json');
assert(evaluationDoc.includes('PUBLIC_ADOPTION_READINESS.json'), 'evaluation-packet doc must mention PUBLIC_ADOPTION_READINESS.json');
assert(releaseEvidence.includes('PUBLIC_ADOPTION_READINESS.json'), 'release-evidence doc must mention PUBLIC_ADOPTION_READINESS.json');
assert(verificationDoc.includes('check:adoption-readiness'), 'verification doc must mention check:adoption-readiness');
assert(publicIndex.includes('adoption-readiness.md'), 'public contract index must mention docs/adoption-readiness.md');
assert(publicIndex.includes('../PUBLIC_ADOPTION_READINESS.json'), 'public contract index must mention PUBLIC_ADOPTION_READINESS.json');
assert(publicIndex.includes('../schemas/public-adoption-readiness.schema.json'), 'public contract index must mention public-adoption-readiness schema');
assert(integrationGuide.includes('PUBLIC_ADOPTION_READINESS.json'), 'integration guide must mention PUBLIC_ADOPTION_READINESS.json');
assert(communityHealth.includes('PUBLIC_ADOPTION_READINESS.json'), 'community-health doc must mention PUBLIC_ADOPTION_READINESS.json');
assert(maintainerOps.includes('PUBLIC_ADOPTION_READINESS.json'), 'maintainer-operations doc must mention PUBLIC_ADOPTION_READINESS.json');
assert(maintainerOps.includes('PUBLIC_FRESHNESS_MODEL.json'), 'maintainer-operations doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(faq.includes('PUBLIC_ADOPTION_READINESS.json'), 'FAQ must mention PUBLIC_ADOPTION_READINESS.json');
assert(faq.includes('PUBLIC_FRESHNESS_MODEL.json'), 'FAQ must mention PUBLIC_FRESHNESS_MODEL.json');
assert(capabilityDoc.includes('PUBLIC_ADOPTION_READINESS.json'), 'capability-matrix doc must mention PUBLIC_ADOPTION_READINESS.json');
assert(capabilityDoc.includes('PUBLIC_FRESHNESS_MODEL.json'), 'capability-matrix doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(schemasReadme.includes('public-adoption-readiness.schema.json'), 'schemas README must mention public-adoption-readiness schema');

assert(profile.purpose?.publishes?.includes('machine-readable adoption-readiness summaries'), 'project profile must publish machine-readable adoption-readiness summaries');
assert(profile.health_signals?.machine_readable_adoption_readiness_present === true, 'project profile must mark machine_readable_adoption_readiness_present true');
assert(profile.reviewer_shortcuts?.adoption_readiness === 'PUBLIC_ADOPTION_READINESS.json', 'project profile adoption_readiness shortcut must point to PUBLIC_ADOPTION_READINESS.json');
assert(profile.program_readiness?.public_adoption_readiness_explicit === true, 'project profile must mark public_adoption_readiness_explicit true');

assert(evaluationPacket.fast_review_path.includes('PUBLIC_ADOPTION_READINESS.json'), 'evaluation packet fast_review_path must include PUBLIC_ADOPTION_READINESS.json');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/adoption-readiness.md'), 'evaluation packet governance_and_review must include docs/adoption-readiness.md');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_ADOPTION_READINESS.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_ADOPTION_READINESS.json');
assert(
  evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('adoption readiness')),
  'evaluation packet public_value_claims must mention adoption readiness'
);

assert(capabilities.capabilities.some((item) => item.id === 'assess-public-adoption-readiness'), 'capability matrix must include assess-public-adoption-readiness');
assert(dependencyGraph.nodes.some((item) => item.id === 'adoption-readiness'), 'dependency graph must include adoption-readiness node');
assert(
  dependencyGraph.reading_paths.some((item) => item.id === 'reviewer-fast-path' && item.steps.includes('adoption-readiness')),
  'reviewer-fast-path must include adoption-readiness'
);
assert(
  dependencyGraph.reading_paths.some((item) => item.id === 'integrator-contract-path' && item.steps.includes('adoption-readiness')),
  'integrator-contract-path must include adoption-readiness'
);
assert(
  dependencyGraph.reading_paths.some((item) => item.id === 'contributor-governance-path' && item.steps.includes('adoption-readiness')),
  'contributor-governance-path must include adoption-readiness'
);

assert(traceability.traces.some((item) => item.id === 'adoption-readiness-and-prerequisites'), 'traceability matrix must include adoption-readiness-and-prerequisites');
assert(
  assuranceCase.claims.some((item) => item.supporting_surfaces?.includes('PUBLIC_ADOPTION_READINESS.json') || item.strongest_surfaces?.includes('PUBLIC_ADOPTION_READINESS.json')),
  'assurance case must reference PUBLIC_ADOPTION_READINESS.json'
);
assert(maintenance.required_evidence.includes('updated PUBLIC_ADOPTION_READINESS.json when audience readiness, prerequisites, or deferred adoption posture changed'), 'maintenance model must require adoption-readiness updates');
assert(
  maintenance.operating_rules.some((item) => item.includes('PUBLIC_ADOPTION_READINESS.json')),
  'maintenance model operating_rules must mention PUBLIC_ADOPTION_READINESS.json'
);
assert(changeControl.required_release_sync.includes('PUBLIC_ADOPTION_READINESS.json'), 'change-control model must require release sync for PUBLIC_ADOPTION_READINESS.json');
assert(
  updateCoherence.sync_groups.some((group) => Array.isArray(group.required_surfaces) && group.required_surfaces.includes('PUBLIC_ADOPTION_READINESS.json')),
  'update-coherence map must require PUBLIC_ADOPTION_READINESS.json in at least one sync group'
);
assert(scorecard.criteria.some((item) => item.id === 'adoption-readiness-explicit'), 'review scorecard must include adoption-readiness-explicit');

const reviewerLayer = verificationMatrix.checks.find((item) => item.id === 'reviewer-and-summary-layers');
assert(reviewerLayer, 'verification matrix must define reviewer-and-summary-layers row');
assert(reviewerLayer.commands.includes('npm run check:adoption-readiness'), 'reviewer-and-summary-layers row must include npm run check:adoption-readiness');
assert(reviewerLayer.protects.includes('PUBLIC_ADOPTION_READINESS.json'), 'reviewer-and-summary-layers row must protect PUBLIC_ADOPTION_READINESS.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_ADOPTION_READINESS.json'), 'reviewer-and-summary-layers row must reference PUBLIC_ADOPTION_READINESS.json');
assert(reviewerLayer.failure_modes_prevented.some((item) => item.includes('adoption readiness')), 'reviewer-and-summary-layers row must mention adoption readiness failure prevention');

assert(
  audiencePaths.audiences.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_ADOPTION_READINESS.json')),
  'audience paths reviewers entry must include PUBLIC_ADOPTION_READINESS.json'
);
assert(
  audiencePaths.audiences.some((item) => item.id === 'integrators' && item.strongest_surfaces.includes('PUBLIC_ADOPTION_READINESS.json')),
  'audience paths integrators entry must include PUBLIC_ADOPTION_READINESS.json'
);
assert(
  audiencePaths.audiences.some((item) => item.id === 'maintainers' && item.strongest_surfaces.includes('PUBLIC_ADOPTION_READINESS.json')),
  'audience paths maintainers entry must include PUBLIC_ADOPTION_READINESS.json'
);
assert(
  audiencePaths.audiences.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'audience paths reviewers entry must include PUBLIC_FRESHNESS_MODEL.json'
);
assert(
  audiencePaths.audiences.some((item) => item.id === 'maintainers' && item.strongest_surfaces.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'audience paths maintainers entry must include PUBLIC_FRESHNESS_MODEL.json'
);

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:adoption-readiness'), 'release metadata must include adoption-readiness verification');
assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:freshness'), 'release metadata must include freshness verification');
assert(
  releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_ADOPTION_READINESS.json')),
  'release metadata residual risks must mention PUBLIC_ADOPTION_READINESS.json'
);
assert(
  releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'release metadata residual risks must mention PUBLIC_FRESHNESS_MODEL.json'
);

assert(catalogPaths.has('docs/adoption-readiness.md'), 'contract catalog must include docs/adoption-readiness.md');
assert(catalogPaths.has('PUBLIC_ADOPTION_READINESS.json'), 'contract catalog must include PUBLIC_ADOPTION_READINESS.json');
assert(catalogPaths.has('schemas/public-adoption-readiness.schema.json'), 'contract catalog must include public-adoption-readiness schema');
assert(catalogPaths.has('scripts/check-adoption-readiness.js'), 'contract catalog must include adoption-readiness verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked adoption readiness, ${adoption.profiles.length} profiles, and ${catalog.entries.length} catalog entries`);
