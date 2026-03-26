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
const reviewScorecard = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_REVIEW_SCORECARD.json'), 'utf8'));
const verificationMatrix = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_VERIFICATION_MATRIX.json'), 'utf8'));
const audiencePaths = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_AUDIENCE_PATHS.json'), 'utf8'));
const adoptionReadiness = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_ADOPTION_READINESS.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const programFit = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROGRAM_FIT_MAP.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-program-fit-map.schema.json'), 'utf8'));

const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));
const requiredIds = [
  'maintainer-owned-public-surface',
  'reviewer-readable-contract-and-governance-surface',
  'machine-readable-verification-and-release-evidence',
  'ecosystem-utility-and-consumability',
  'active-hardening-and-change-discipline',
  'explicit-limits-and-honest-maturity-posture'
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

assert(programFit.version === pkg.version, 'program-fit version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-program-fit-map.schema.json', 'program-fit schema must declare expected public $id');
assert(typeof programFit.purpose === 'string' && programFit.purpose.length > 0, 'program-fit map must define purpose');
assert(Array.isArray(programFit.fit_families) && programFit.fit_families.length >= requiredIds.length, 'program-fit map must define expected fit families');
assert(Array.isArray(programFit.non_claims) && programFit.non_claims.length >= 2, 'program-fit map must define non-claims');
assert(Array.isArray(programFit.review_commands) && programFit.review_commands.length >= 1, 'program-fit map must define review commands');

const ids = new Set();
for (const fit of programFit.fit_families || []) {
  assert(typeof fit.id === 'string' && fit.id.length > 0, 'program-fit family must define id');
  assert(!ids.has(fit.id), `duplicate program-fit id ${fit.id}`);
  ids.add(fit.id);
  assert(typeof fit.summary === 'string' && fit.summary.length > 0, `fit family ${fit.id} must define summary`);
  assert(typeof fit.why_it_matters === 'string' && fit.why_it_matters.length > 0, `fit family ${fit.id} must define why_it_matters`);
  assert(Array.isArray(fit.strongest_current_surfaces) && fit.strongest_current_surfaces.length >= 1, `fit family ${fit.id} must define strongest_current_surfaces`);
  assert(Array.isArray(fit.bounded_fit_claims) && fit.bounded_fit_claims.length >= 1, `fit family ${fit.id} must define bounded_fit_claims`);
  assert(Array.isArray(fit.review_commands) && fit.review_commands.length >= 1, `fit family ${fit.id} must define review_commands`);
  assert(Array.isArray(fit.bounded_non_claims) && fit.bounded_non_claims.length >= 1, `fit family ${fit.id} must define bounded_non_claims`);

  for (const relativePath of fit.strongest_current_surfaces) {
    assert(exists(relativePath), `fit family ${fit.id} references missing file ${relativePath}`);
  }
  for (const command of fit.review_commands) {
    assert(packageScripts.has(command), `fit family ${fit.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required program-fit family missing: ${requiredId}`);
}
for (const command of programFit.review_commands) {
  assert(packageScripts.has(command), `program-fit map references unknown review command ${command}`);
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

assert(readme.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'README.md must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(readme.includes('docs/program-fit.md'), 'README.md must mention docs/program-fit.md');
assert(quickstart.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'QUICKSTART.md must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(reviewerGuide.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'reviewer guide must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(evaluationDoc.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'evaluation-packet doc must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(releaseEvidence.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'release-evidence doc must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(verificationDoc.includes('check:program-fit'), 'verification doc must mention check:program-fit');
assert(publicIndex.includes('program-fit.md'), 'public contract index must mention docs/program-fit.md');
assert(publicIndex.includes('../PUBLIC_PROGRAM_FIT_MAP.json'), 'public contract index must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(publicIndex.includes('../schemas/public-program-fit-map.schema.json'), 'public contract index must mention public-program-fit schema');
assert(faq.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'FAQ must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(capabilityDoc.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'capability-matrix doc must mention PUBLIC_PROGRAM_FIT_MAP.json');

assert(projectProfile.purpose?.publishes?.includes('machine-readable public-program-fit summaries'), 'project profile publishes must include machine-readable public-program-fit summaries');
assert(projectProfile.health_signals?.machine_readable_program_fit_present === true, 'project profile must mark machine_readable_program_fit_present true');
assert(projectProfile.reviewer_shortcuts?.program_fit_map === 'PUBLIC_PROGRAM_FIT_MAP.json', 'project profile program_fit_map shortcut must point to PUBLIC_PROGRAM_FIT_MAP.json');
assert(projectProfile.program_readiness?.program_fit_explicit === true, 'project profile must mark program_fit_explicit true');

assert(evaluationPacket.fast_review_path.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'evaluation packet fast_review_path must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/program-fit.md'), 'evaluation packet governance_and_review must include docs/program-fit.md');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('program-fit')), 'evaluation packet public_value_claims must mention program-fit');
assert(Array.isArray(evaluationPacket.residual_risk_surfaces) && evaluationPacket.residual_risk_surfaces.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'evaluation packet residual_risk_surfaces must include PUBLIC_PROGRAM_FIT_MAP.json');

assert(capabilityMatrix.capabilities.some((item) => item.id === 'assess-program-fit-for-oss-support-review'), 'capability matrix must include assess-program-fit-for-oss-support-review');
assert(dependencyGraph.nodes.some((item) => item.id === 'public-program-fit'), 'dependency graph must include public-program-fit node');
assert(dependencyGraph.reading_paths.some((item) => item.id === 'reviewer-fast-path' && item.steps.includes('public-program-fit')), 'reviewer-fast-path must include public-program-fit');
assert(dependencyGraph.reading_paths.some((item) => item.id === 'contributor-governance-path' && item.steps.includes('public-program-fit')), 'contributor-governance-path must include public-program-fit');

assert(traceability.traces.some((item) => item.id === 'bounded-program-fit-for-reviewers-and-programs'), 'traceability matrix must include bounded-program-fit-for-reviewers-and-programs');
assert(reviewScorecard.criteria.some((item) => item.id === 'program-fit-explicit'), 'review scorecard must include program-fit-explicit');
assert(verificationMatrix.checks.some((item) => item.id === 'program-fit-and-reviewer-program-criteria'), 'verification matrix must include program-fit-and-reviewer-program-criteria');

assert(audiencePaths.audiences.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_PROGRAM_FIT_MAP.json')), 'audience paths reviewers entry must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(audiencePaths.audiences.some((item) => item.id === 'maintainers' && item.strongest_surfaces.includes('PUBLIC_PROGRAM_FIT_MAP.json')), 'audience paths maintainers entry must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(adoptionReadiness.profiles.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_PROGRAM_FIT_MAP.json')), 'adoption readiness reviewers profile must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(adoptionReadiness.profiles.some((item) => item.id === 'maintainers' && item.strongest_surfaces.includes('PUBLIC_PROGRAM_FIT_MAP.json')), 'adoption readiness maintainers profile must include PUBLIC_PROGRAM_FIT_MAP.json');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:program-fit'), 'release metadata must include program-fit verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_PROGRAM_FIT_MAP.json')), 'release metadata residual risks must mention PUBLIC_PROGRAM_FIT_MAP.json');

assert(catalogPaths.has('docs/program-fit.md'), 'contract catalog must include docs/program-fit.md');
assert(catalogPaths.has('PUBLIC_PROGRAM_FIT_MAP.json'), 'contract catalog must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(catalogPaths.has('schemas/public-program-fit-map.schema.json'), 'contract catalog must include public-program-fit schema');
assert(catalogPaths.has('scripts/check-program-fit.js'), 'contract catalog must include program-fit verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked program fit, ${programFit.fit_families.length} fit families, and ${catalog.entries.length} catalog entries`);
