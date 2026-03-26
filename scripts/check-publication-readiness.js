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
const publicationReadiness = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PUBLICATION_READINESS.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-publication-readiness.schema.json'), 'utf8'));

const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));
const requiredIds = [
  'front-door-and-community-surface-ready',
  'legal-boundary-and-scope-safety-ready',
  'contract-example-and-schema-surface-ready',
  'reviewer-and-release-summaries-ready',
  'verification-and-pre-publish-safety-ready',
  'post-publication-signals-still-deferred'
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

assert(publicationReadiness.version === pkg.version, 'publication-readiness version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-publication-readiness.schema.json', 'publication-readiness schema must declare expected public $id');
assert(typeof publicationReadiness.purpose === 'string' && publicationReadiness.purpose.length > 0, 'publication-readiness map must define purpose');
assert(Array.isArray(publicationReadiness.readiness_families) && publicationReadiness.readiness_families.length >= requiredIds.length, 'publication-readiness map must define expected readiness families');
assert(Array.isArray(publicationReadiness.non_claims) && publicationReadiness.non_claims.length >= 2, 'publication-readiness map must define non-claims');
assert(Array.isArray(publicationReadiness.review_commands) && publicationReadiness.review_commands.length >= 1, 'publication-readiness map must define review commands');

const ids = new Set();
for (const family of publicationReadiness.readiness_families || []) {
  assert(typeof family.id === 'string' && family.id.length > 0, 'publication-readiness family must define id');
  assert(!ids.has(family.id), `duplicate publication-readiness id ${family.id}`);
  ids.add(family.id);
  assert(family.status === 'ready' || family.status === 'deferred', `publication-readiness family ${family.id} must define supported status`);
  assert(typeof family.summary === 'string' && family.summary.length > 0, `publication-readiness family ${family.id} must define summary`);
  assert(typeof family.why_it_matters === 'string' && family.why_it_matters.length > 0, `publication-readiness family ${family.id} must define why_it_matters`);
  assert(Array.isArray(family.strongest_current_surfaces) && family.strongest_current_surfaces.length >= 1, `publication-readiness family ${family.id} must define strongest_current_surfaces`);
  assert(Array.isArray(family.publish_checks) && family.publish_checks.length >= 1, `publication-readiness family ${family.id} must define publish_checks`);
  assert(Array.isArray(family.bounded_non_claims) && family.bounded_non_claims.length >= 1, `publication-readiness family ${family.id} must define bounded_non_claims`);

  for (const relativePath of family.strongest_current_surfaces) {
    assert(exists(relativePath), `publication-readiness family ${family.id} references missing file ${relativePath}`);
  }
  for (const command of family.publish_checks) {
    assert(packageScripts.has(command), `publication-readiness family ${family.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required publication-readiness family missing: ${requiredId}`);
}
for (const command of publicationReadiness.review_commands) {
  assert(packageScripts.has(command), `publication-readiness map references unknown review command ${command}`);
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

assert(readme.includes('PUBLIC_PUBLICATION_READINESS.json'), 'README.md must mention PUBLIC_PUBLICATION_READINESS.json');
assert(readme.includes('docs/publication-readiness.md'), 'README.md must mention docs/publication-readiness.md');
assert(quickstart.includes('PUBLIC_PUBLICATION_READINESS.json'), 'QUICKSTART.md must mention PUBLIC_PUBLICATION_READINESS.json');
assert(reviewerGuide.includes('PUBLIC_PUBLICATION_READINESS.json'), 'reviewer guide must mention PUBLIC_PUBLICATION_READINESS.json');
assert(evaluationDoc.includes('PUBLIC_PUBLICATION_READINESS.json'), 'evaluation-packet doc must mention PUBLIC_PUBLICATION_READINESS.json');
assert(releaseEvidence.includes('PUBLIC_PUBLICATION_READINESS.json'), 'release-evidence doc must mention PUBLIC_PUBLICATION_READINESS.json');
assert(verificationDoc.includes('check:publication-readiness'), 'verification doc must mention check:publication-readiness');
assert(publicIndex.includes('publication-readiness.md'), 'public contract index must mention docs/publication-readiness.md');
assert(publicIndex.includes('../PUBLIC_PUBLICATION_READINESS.json'), 'public contract index must mention PUBLIC_PUBLICATION_READINESS.json');
assert(publicIndex.includes('../schemas/public-publication-readiness.schema.json'), 'public contract index must mention public-publication-readiness schema');
assert(faq.includes('PUBLIC_PUBLICATION_READINESS.json'), 'FAQ must mention PUBLIC_PUBLICATION_READINESS.json');
assert(capabilityDoc.includes('PUBLIC_PUBLICATION_READINESS.json'), 'capability-matrix doc must mention PUBLIC_PUBLICATION_READINESS.json');

assert(projectProfile.purpose?.publishes?.includes('machine-readable publication-readiness summaries'), 'project profile publishes must include machine-readable publication-readiness summaries');
assert(projectProfile.health_signals?.machine_readable_publication_readiness_present === true, 'project profile must mark machine_readable_publication_readiness_present true');
assert(projectProfile.reviewer_shortcuts?.publication_readiness === 'PUBLIC_PUBLICATION_READINESS.json', 'project profile publication_readiness shortcut must point to PUBLIC_PUBLICATION_READINESS.json');
assert(projectProfile.program_readiness?.publication_readiness_explicit === true, 'project profile must mark publication_readiness_explicit true');

assert(evaluationPacket.fast_review_path.includes('PUBLIC_PUBLICATION_READINESS.json'), 'evaluation packet fast_review_path must include PUBLIC_PUBLICATION_READINESS.json');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/publication-readiness.md'), 'evaluation packet governance_and_review must include docs/publication-readiness.md');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_PUBLICATION_READINESS.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_PUBLICATION_READINESS.json');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('publication readiness')), 'evaluation packet public_value_claims must mention publication readiness');
assert(Array.isArray(evaluationPacket.residual_risk_surfaces) && evaluationPacket.residual_risk_surfaces.includes('PUBLIC_PUBLICATION_READINESS.json'), 'evaluation packet residual_risk_surfaces must include PUBLIC_PUBLICATION_READINESS.json');

assert(capabilityMatrix.capabilities.some((item) => item.id === 'assess-pre-publish-publication-readiness'), 'capability matrix must include assess-pre-publish-publication-readiness');
assert(dependencyGraph.nodes.some((item) => item.id === 'publication-readiness'), 'dependency graph must include publication-readiness node');
assert(dependencyGraph.reading_paths.some((item) => item.id === 'reviewer-fast-path' && item.steps.includes('publication-readiness')), 'reviewer-fast-path must include publication-readiness');
assert(dependencyGraph.reading_paths.some((item) => item.id === 'contributor-governance-path' && item.steps.includes('publication-readiness')), 'contributor-governance-path must include publication-readiness');

assert(traceability.traces.some((item) => item.id === 'bounded-publication-readiness-and-pre-publish-safety'), 'traceability matrix must include bounded-publication-readiness-and-pre-publish-safety');
assert(reviewScorecard.criteria.some((item) => item.id === 'publication-readiness-explicit'), 'review scorecard must include publication-readiness-explicit');
assert(verificationMatrix.checks.some((item) => item.id === 'publication-readiness-and-pre-publish-safety'), 'verification matrix must include publication-readiness-and-pre-publish-safety');

assert(audiencePaths.audiences.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_PUBLICATION_READINESS.json')), 'audience paths reviewers entry must include PUBLIC_PUBLICATION_READINESS.json');
assert(audiencePaths.audiences.some((item) => item.id === 'maintainers' && item.strongest_surfaces.includes('PUBLIC_PUBLICATION_READINESS.json')), 'audience paths maintainers entry must include PUBLIC_PUBLICATION_READINESS.json');
assert(adoptionReadiness.profiles.some((item) => item.id === 'reviewers' && item.strongest_surfaces.includes('PUBLIC_PUBLICATION_READINESS.json')), 'adoption readiness reviewers profile must include PUBLIC_PUBLICATION_READINESS.json');
assert(adoptionReadiness.profiles.some((item) => item.id === 'maintainers' && item.strongest_surfaces.includes('PUBLIC_PUBLICATION_READINESS.json')), 'adoption readiness maintainers profile must include PUBLIC_PUBLICATION_READINESS.json');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:publication-readiness'), 'release metadata must include publication-readiness verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_PUBLICATION_READINESS.json')), 'release metadata residual risks must mention PUBLIC_PUBLICATION_READINESS.json');

assert(catalogPaths.has('docs/publication-readiness.md'), 'contract catalog must include docs/publication-readiness.md');
assert(catalogPaths.has('PUBLIC_PUBLICATION_READINESS.json'), 'contract catalog must include PUBLIC_PUBLICATION_READINESS.json');
assert(catalogPaths.has('schemas/public-publication-readiness.schema.json'), 'contract catalog must include public-publication-readiness schema');
assert(catalogPaths.has('scripts/check-publication-readiness.js'), 'contract catalog must include publication-readiness verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked publication readiness, ${publicationReadiness.readiness_families.length} readiness families, and ${catalog.entries.length} catalog entries`);
