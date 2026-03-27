#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const evaluationPacket = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_EVALUATION_PACKET.json'), 'utf8'));
const audiencePaths = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_AUDIENCE_PATHS.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-audience-paths.schema.json'), 'utf8'));

const requiredIds = ['reviewers', 'integrators', 'contributors', 'tool-builders', 'maintainers'];
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

assert(audiencePaths.version === pkg.version, 'audience-paths version must match package.json version');
assert(schema.$id === 'https://github.com/num1hub/capsule-specs/schemas/public-audience-paths.schema.json', 'audience-paths schema must declare expected public $id');
assert(typeof audiencePaths.purpose === 'string' && audiencePaths.purpose.length > 0, 'audience paths must define purpose');
assert(Array.isArray(audiencePaths.audiences) && audiencePaths.audiences.length >= requiredIds.length, 'audience paths must define the expected audience set');
assert(Array.isArray(audiencePaths.review_commands) && audiencePaths.review_commands.length >= 1, 'audience paths must define review commands');

const ids = new Set();
for (const item of audiencePaths.audiences) {
  assert(typeof item.id === 'string' && item.id.length > 0, 'audience path must define id');
  assert(!ids.has(item.id), `duplicate audience path ${item.id}`);
  ids.add(item.id);
  assert(typeof item.summary === 'string' && item.summary.length > 0, `audience path ${item.id} must define summary`);
  assert(Array.isArray(item.starting_points) && item.starting_points.length >= 1, `audience path ${item.id} must define starting_points`);
  assert(Array.isArray(item.strongest_surfaces) && item.strongest_surfaces.length >= 1, `audience path ${item.id} must define strongest_surfaces`);
  assert(Array.isArray(item.verify_commands) && item.verify_commands.length >= 1, `audience path ${item.id} must define verify_commands`);
  assert(Array.isArray(item.completion_signals) && item.completion_signals.length >= 1, `audience path ${item.id} must define completion_signals`);
  assert(Array.isArray(item.bounded_non_goals) && item.bounded_non_goals.length >= 1, `audience path ${item.id} must define bounded_non_goals`);

  for (const relativePath of [...item.starting_points, ...item.strongest_surfaces]) {
    assert(exists(relativePath), `audience path ${item.id} references missing file ${relativePath}`);
  }

  for (const command of item.verify_commands) {
    assert(packageScripts.has(command), `audience path ${item.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required audience path missing: ${requiredId}`);
}

for (const command of audiencePaths.review_commands) {
  assert(packageScripts.has(command), `audience paths references unknown review command ${command}`);
}

const byId = new Map(audiencePaths.audiences.map((item) => [item.id, item]));
assert(byId.get('reviewers')?.starting_points.includes('docs/reviewer-guide.md'), 'reviewers path must start from docs/reviewer-guide.md');
assert(byId.get('reviewers')?.strongest_surfaces.includes('PUBLIC_REVIEW_SCORECARD.json'), 'reviewers path must include PUBLIC_REVIEW_SCORECARD.json');
assert(byId.get('reviewers')?.strongest_surfaces.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'reviewers path must include PUBLIC_VERIFICATION_MATRIX.json');
assert(byId.get('integrators')?.starting_points.includes('docs/integration-guide.md'), 'integrators path must start from docs/integration-guide.md');
assert(byId.get('integrators')?.strongest_surfaces.includes('schemas/validator-api-envelopes.schema.json'), 'integrators path must include validator-api-envelopes schema');
assert(byId.get('contributors')?.starting_points.includes('ONBOARDING.md'), 'contributors path must start from ONBOARDING.md');
assert(byId.get('contributors')?.starting_points.includes('CONTRIBUTING.md'), 'contributors path must include CONTRIBUTING.md');
assert(byId.get('tool-builders')?.strongest_surfaces.includes('PUBLIC_CONTRACT_CATALOG.json'), 'tool-builders path must include PUBLIC_CONTRACT_CATALOG.json');
assert(byId.get('maintainers')?.starting_points.includes('MAINTAINERS.md'), 'maintainers path must start from MAINTAINERS.md');
assert(byId.get('maintainers')?.strongest_surfaces.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'maintainers path must include PUBLIC_MAINTENANCE_MODEL.json');

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const onboarding = fs.readFileSync(path.join(repoRoot, 'ONBOARDING.md'), 'utf8');
const contributing = fs.readFileSync(path.join(repoRoot, 'CONTRIBUTING.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const evaluationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'evaluation-packet.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const integrationGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'integration-guide.md'), 'utf8');
const maintainerOps = fs.readFileSync(path.join(repoRoot, 'docs', 'maintainer-operations.md'), 'utf8');
const releaseEvidence = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const verification = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const faq = fs.readFileSync(path.join(repoRoot, 'docs', 'faq.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_AUDIENCE_PATHS.json'), 'README.md must mention PUBLIC_AUDIENCE_PATHS.json');
assert(readme.includes('docs/audience-paths.md'), 'README.md must mention docs/audience-paths.md');
assert(quickstart.includes('PUBLIC_AUDIENCE_PATHS.json'), 'QUICKSTART.md must mention PUBLIC_AUDIENCE_PATHS.json');
assert(onboarding.includes('docs/audience-paths.md'), 'ONBOARDING.md must mention docs/audience-paths.md');
assert(contributing.includes('PUBLIC_AUDIENCE_PATHS.json'), 'CONTRIBUTING.md must mention PUBLIC_AUDIENCE_PATHS.json');
assert(reviewerGuide.includes('PUBLIC_AUDIENCE_PATHS.json'), 'reviewer guide must mention PUBLIC_AUDIENCE_PATHS.json');
assert(evaluationDoc.includes('PUBLIC_AUDIENCE_PATHS.json'), 'evaluation-packet doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(publicIndex.includes('audience-paths.md'), 'public contract index must mention docs/audience-paths.md');
assert(publicIndex.includes('../PUBLIC_AUDIENCE_PATHS.json'), 'public contract index must mention PUBLIC_AUDIENCE_PATHS.json');
assert(publicIndex.includes('../schemas/public-audience-paths.schema.json'), 'public contract index must mention public-audience-paths schema');
assert(integrationGuide.includes('PUBLIC_AUDIENCE_PATHS.json'), 'integration-guide doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(maintainerOps.includes('PUBLIC_AUDIENCE_PATHS.json'), 'maintainer-operations doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(releaseEvidence.includes('PUBLIC_AUDIENCE_PATHS.json'), 'release-evidence doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(verification.includes('check:audience-paths'), 'verification doc must mention check:audience-paths');
assert(capabilityDoc.includes('PUBLIC_AUDIENCE_PATHS.json'), 'capability-matrix doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(faq.includes('PUBLIC_AUDIENCE_PATHS.json'), 'FAQ must mention PUBLIC_AUDIENCE_PATHS.json');
assert(schemasReadme.includes('public-audience-paths.schema.json'), 'schemas README must mention public-audience-paths schema');

assert(profile.health_signals?.machine_readable_audience_paths_present === true, 'project profile must mark machine_readable_audience_paths_present true');
assert(profile.reviewer_shortcuts?.audience_paths === 'PUBLIC_AUDIENCE_PATHS.json', 'project profile audience_paths shortcut must point to PUBLIC_AUDIENCE_PATHS.json');
assert(profile.program_readiness?.audience_paths_explicit === true, 'project profile must mark audience_paths_explicit true');

assert(evaluationPacket.fast_review_path.includes('PUBLIC_AUDIENCE_PATHS.json'), 'evaluation packet fast_review_path must include PUBLIC_AUDIENCE_PATHS.json');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/audience-paths.md'), 'evaluation packet governance_and_review must include docs/audience-paths.md');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_AUDIENCE_PATHS.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_AUDIENCE_PATHS.json');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('audience-specific')), 'evaluation packet public_value_claims must mention audience-specific paths');

assert(catalogPaths.has('docs/audience-paths.md'), 'contract catalog must include docs/audience-paths.md');
assert(catalogPaths.has('PUBLIC_AUDIENCE_PATHS.json'), 'contract catalog must include PUBLIC_AUDIENCE_PATHS.json');
assert(catalogPaths.has('schemas/public-audience-paths.schema.json'), 'contract catalog must include public-audience-paths schema');
assert(catalogPaths.has('scripts/check-audience-paths.js'), 'contract catalog must include audience-paths verifier');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:audience-paths'), 'release metadata must include audience-paths verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_AUDIENCE_PATHS.json')), 'release metadata residual risks must mention PUBLIC_AUDIENCE_PATHS.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked audience paths, ${audiencePaths.audiences.length} audiences, and ${catalog.entries.length} catalog entries`);
