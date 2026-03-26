#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(repoRoot, 'SOURCE_MANIFEST.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const manifestEntries = new Set(Object.keys(manifest));
const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));

for (const entry of catalog.entries) {
  assert(manifestEntries.has(entry.path), `catalog path missing from SOURCE_MANIFEST: ${entry.path}`);
  for (const command of entry.verify_commands) {
    assert(packageScripts.has(command), `catalog references unknown verify command: ${command}`);
  }
}

const publicIndex = readText('docs/public-contract-index.md');
const readme = readText('README.md');
const releaseReview = readText('PUBLIC_RELEASE_REVIEW.md');
const verificationDoc = readText('docs/verification.md');
const releaseEvidenceDoc = readText('docs/release-evidence.md');

const expectedPublicIndexLinks = [
  'contract-catalog.md',
  '../PUBLIC_CONTRACT_CATALOG.json',
  '../PUBLIC_BOUNDARY_MAP.json',
  '../PUBLIC_PORTABILITY_PROFILE.json',
  '../PUBLIC_EVALUATION_PACKET.json',
  '../PUBLIC_FAILURE_MODEL.json',
  '../PUBLIC_EXAMPLE_COVERAGE.json',
  '../PUBLIC_MAINTENANCE_MODEL.json',
  '../PUBLIC_CHANGE_CONTROL_MODEL.json',
  '../PUBLIC_OWNERSHIP_MAP.json',
  '../PUBLIC_TRACEABILITY_MATRIX.json',
  '../PUBLIC_DEPENDENCY_GRAPH.json',
  '../PUBLIC_ASSURANCE_CASE.json',
  '../PUBLIC_UPDATE_COHERENCE_MAP.json',
  '../PUBLIC_LIMITATIONS_REGISTER.json',
  '../PUBLIC_EVIDENCE_TIMELINE.json',
  '../PUBLIC_REVIEW_SCORECARD.json',
  'reviewer-guide.md',
  'evaluation-packet.md',
  'failure-model.md',
  'example-coverage.md',
  'maintainer-operations.md',
  'change-control.md',
  'artifact-ownership.md',
  'traceability.md',
  'dependency-graph.md',
  'assurance-case.md',
  'update-coherence.md',
  'limitations-register.md',
  'evidence-timeline.md',
  'review-scorecard.md',
  '../PUBLIC_PROJECT_PROFILE.json',
  'capability-matrix.md',
  '../PUBLIC_CAPABILITY_MATRIX.json',
  'release-evidence.md',
  '../PUBLIC_RELEASE_METADATA.json',
  'route-reference.md',
  'integration-guide.md',
  'projection-doctrine.md',
  'domain-boundaries.md',
  'generator-readiness.md',
  'portability.md',
  'archive-bundles.md',
  '../schemas/validator-api-envelopes.schema.json',
  '../schemas/archive-bundle.schema.json',
  '../schemas/public-boundary-map.schema.json',
  '../schemas/public-portability-profile.schema.json',
  '../schemas/public-evaluation-packet.schema.json',
  '../schemas/public-failure-model.schema.json',
  '../schemas/public-example-coverage.schema.json',
  '../schemas/public-maintenance-model.schema.json',
  '../schemas/public-change-control-model.schema.json',
  '../schemas/public-ownership-map.schema.json',
  '../schemas/public-traceability-matrix.schema.json',
  '../schemas/public-dependency-graph.schema.json',
  '../schemas/public-assurance-case.schema.json',
  '../schemas/public-update-coherence-map.schema.json',
  '../schemas/public-limitations-register.schema.json',
  '../schemas/public-evidence-timeline.schema.json',
  '../schemas/public-review-scorecard.schema.json',
  'community-health.md',
  'client-recipes.md',
  'trust-model.md'
];

for (const needle of expectedPublicIndexLinks) {
  assert(publicIndex.includes(needle), `docs/public-contract-index.md must reference ${needle}`);
}

assert(readme.includes('PUBLIC_CONTRACT_CATALOG.json'), 'README.md must mention PUBLIC_CONTRACT_CATALOG.json');
assert(readme.includes('PUBLIC_RELEASE_METADATA.json'), 'README.md must mention PUBLIC_RELEASE_METADATA.json');
assert(readme.includes('PUBLIC_PROJECT_PROFILE.json'), 'README.md must mention PUBLIC_PROJECT_PROFILE.json');
assert(readme.includes('PUBLIC_CAPABILITY_MATRIX.json'), 'README.md must mention PUBLIC_CAPABILITY_MATRIX.json');
assert(readme.includes('PUBLIC_BOUNDARY_MAP.json'), 'README.md must mention PUBLIC_BOUNDARY_MAP.json');
assert(readme.includes('PUBLIC_PORTABILITY_PROFILE.json'), 'README.md must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(readme.includes('PUBLIC_EVALUATION_PACKET.json'), 'README.md must mention PUBLIC_EVALUATION_PACKET.json');
assert(readme.includes('PUBLIC_FAILURE_MODEL.json'), 'README.md must mention PUBLIC_FAILURE_MODEL.json');
assert(readme.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'README.md must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(readme.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'README.md must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(readme.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'README.md must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(readme.includes('PUBLIC_OWNERSHIP_MAP.json'), 'README.md must mention PUBLIC_OWNERSHIP_MAP.json');
assert(readme.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'README.md must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(readme.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'README.md must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(readme.includes('PUBLIC_ASSURANCE_CASE.json'), 'README.md must mention PUBLIC_ASSURANCE_CASE.json');
assert(readme.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'README.md must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(readme.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'README.md must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(readme.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'README.md must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(readme.includes('PUBLIC_REVIEW_SCORECARD.json'), 'README.md must mention PUBLIC_REVIEW_SCORECARD.json');
assert(readme.includes('schemas/validator-api-envelopes.schema.json'), 'README.md must mention schemas/validator-api-envelopes.schema.json');
assert(readme.includes('docs/portability.md'), 'README.md must mention docs/portability.md');
assert(readme.includes('docs/archive-bundles.md'), 'README.md must mention docs/archive-bundles.md');
assert(readme.includes('docs/evaluation-packet.md'), 'README.md must mention docs/evaluation-packet.md');
assert(readme.includes('docs/failure-model.md'), 'README.md must mention docs/failure-model.md');
assert(readme.includes('docs/example-coverage.md'), 'README.md must mention docs/example-coverage.md');
assert(readme.includes('docs/maintainer-operations.md'), 'README.md must mention docs/maintainer-operations.md');
assert(readme.includes('docs/change-control.md'), 'README.md must mention docs/change-control.md');
assert(readme.includes('docs/artifact-ownership.md'), 'README.md must mention docs/artifact-ownership.md');
assert(readme.includes('docs/traceability.md'), 'README.md must mention docs/traceability.md');
assert(readme.includes('docs/dependency-graph.md'), 'README.md must mention docs/dependency-graph.md');
assert(readme.includes('docs/assurance-case.md'), 'README.md must mention docs/assurance-case.md');
assert(readme.includes('docs/update-coherence.md'), 'README.md must mention docs/update-coherence.md');
assert(readme.includes('docs/limitations-register.md'), 'README.md must mention docs/limitations-register.md');
assert(readme.includes('docs/evidence-timeline.md'), 'README.md must mention docs/evidence-timeline.md');
assert(readme.includes('docs/review-scorecard.md'), 'README.md must mention docs/review-scorecard.md');
assert(readme.includes('docs/community-health.md'), 'README.md must mention docs/community-health.md');
assert(readme.includes('docs/reviewer-guide.md'), 'README.md must mention docs/reviewer-guide.md');
assert(readme.includes('docs/capability-matrix.md'), 'README.md must mention docs/capability-matrix.md');
assert(readme.includes('docs/projection-doctrine.md'), 'README.md must mention docs/projection-doctrine.md');
assert(readme.includes('docs/domain-boundaries.md'), 'README.md must mention docs/domain-boundaries.md');
assert(readme.includes('docs/generator-readiness.md'), 'README.md must mention docs/generator-readiness.md');
assert(readme.includes('NOTICE'), 'README.md must mention NOTICE');
assert(readme.includes('examples/client/'), 'README.md must mention examples/client/');
assert(readme.includes('npm run verify:repo'), 'README.md must mention npm run verify:repo');
assert(releaseReview.includes('check-contract-catalog.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-contract-catalog.js');
assert(releaseReview.includes('check-release-metadata.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-release-metadata.js');
assert(releaseReview.includes('check-api-schemas.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-api-schemas.js');
assert(releaseReview.includes('check-example-coverage.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-example-coverage.js');
assert(releaseReview.includes('check-boundary-map.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-boundary-map.js');
assert(releaseReview.includes('check-client-recipes.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-client-recipes.js');
assert(releaseReview.includes('check-community-health.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-community-health.js');
assert(releaseReview.includes('check-maintenance-model.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-maintenance-model.js');
assert(releaseReview.includes('check-change-control.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-change-control.js');
assert(releaseReview.includes('check-ownership-map.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-ownership-map.js');
assert(releaseReview.includes('check-dependency-graph.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-dependency-graph.js');
assert(releaseReview.includes('check-assurance-case.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-assurance-case.js');
assert(releaseReview.includes('check-update-coherence.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-update-coherence.js');
assert(releaseReview.includes('check-limitations-register.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-limitations-register.js');
assert(releaseReview.includes('check-evidence-timeline.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-evidence-timeline.js');
assert(releaseReview.includes('check-review-scorecard.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-review-scorecard.js');
assert(releaseReview.includes('check-project-profile.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-project-profile.js');
assert(releaseReview.includes('check-capability-matrix.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-capability-matrix.js');
assert(releaseReview.includes('check-traceability-matrix.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-traceability-matrix.js');
assert(verificationDoc.includes('check:surface'), 'docs/verification.md must explain check:surface');
assert(verificationDoc.includes('check:release'), 'docs/verification.md must explain check:release');
assert(verificationDoc.includes('check:api-schemas'), 'docs/verification.md must explain check:api-schemas');
assert(verificationDoc.includes('check:example-coverage'), 'docs/verification.md must explain check:example-coverage');
assert(verificationDoc.includes('check:boundary-map'), 'docs/verification.md must explain check:boundary-map');
assert(verificationDoc.includes('check:evaluation-packet'), 'docs/verification.md must explain check:evaluation-packet');
assert(verificationDoc.includes('check:failure-model'), 'docs/verification.md must explain check:failure-model');
assert(verificationDoc.includes('check:traceability'), 'docs/verification.md must explain check:traceability');
assert(verificationDoc.includes('check:portability'), 'docs/verification.md must explain check:portability');
assert(verificationDoc.includes('check:client-recipes'), 'docs/verification.md must explain check:client-recipes');
assert(verificationDoc.includes('check:community-health'), 'docs/verification.md must explain check:community-health');
assert(verificationDoc.includes('check:maintenance-model'), 'docs/verification.md must explain check:maintenance-model');
assert(verificationDoc.includes('check:change-control'), 'docs/verification.md must explain check:change-control');
assert(verificationDoc.includes('check:ownership-map'), 'docs/verification.md must explain check:ownership-map');
assert(verificationDoc.includes('check:dependency-graph'), 'docs/verification.md must explain check:dependency-graph');
assert(verificationDoc.includes('check:assurance-case'), 'docs/verification.md must explain check:assurance-case');
assert(verificationDoc.includes('check:update-coherence'), 'docs/verification.md must explain check:update-coherence');
assert(verificationDoc.includes('check:limitations-register'), 'docs/verification.md must explain check:limitations-register');
assert(verificationDoc.includes('check:evidence-timeline'), 'docs/verification.md must explain check:evidence-timeline');
assert(verificationDoc.includes('check:review-scorecard'), 'docs/verification.md must explain check:review-scorecard');
assert(verificationDoc.includes('check:project-profile'), 'docs/verification.md must explain check:project-profile');
assert(verificationDoc.includes('check:capability-matrix'), 'docs/verification.md must explain check:capability-matrix');
assert(releaseEvidenceDoc.includes('PUBLIC_RELEASE_METADATA.json'), 'docs/release-evidence.md must mention PUBLIC_RELEASE_METADATA.json');
assert(releaseEvidenceDoc.includes('validator-api-envelopes.schema.json'), 'docs/release-evidence.md must mention validator-api-envelopes.schema.json');
assert(releaseEvidenceDoc.includes('community-health'), 'docs/release-evidence.md must mention community-health');
assert(releaseEvidenceDoc.includes('PUBLIC_PROJECT_PROFILE.json'), 'docs/release-evidence.md must mention PUBLIC_PROJECT_PROFILE.json');
assert(releaseEvidenceDoc.includes('PUBLIC_CAPABILITY_MATRIX.json'), 'docs/release-evidence.md must mention PUBLIC_CAPABILITY_MATRIX.json');
assert(releaseEvidenceDoc.includes('PUBLIC_BOUNDARY_MAP.json'), 'docs/release-evidence.md must mention PUBLIC_BOUNDARY_MAP.json');
assert(releaseEvidenceDoc.includes('PUBLIC_PORTABILITY_PROFILE.json'), 'docs/release-evidence.md must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(releaseEvidenceDoc.includes('PUBLIC_EVALUATION_PACKET.json'), 'docs/release-evidence.md must mention PUBLIC_EVALUATION_PACKET.json');
assert(releaseEvidenceDoc.includes('PUBLIC_FAILURE_MODEL.json'), 'docs/release-evidence.md must mention PUBLIC_FAILURE_MODEL.json');
assert(releaseEvidenceDoc.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'docs/release-evidence.md must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(releaseEvidenceDoc.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'docs/release-evidence.md must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(releaseEvidenceDoc.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'docs/release-evidence.md must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(releaseEvidenceDoc.includes('PUBLIC_OWNERSHIP_MAP.json'), 'docs/release-evidence.md must mention PUBLIC_OWNERSHIP_MAP.json');
assert(releaseEvidenceDoc.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'docs/release-evidence.md must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(releaseEvidenceDoc.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'docs/release-evidence.md must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(releaseEvidenceDoc.includes('PUBLIC_ASSURANCE_CASE.json'), 'docs/release-evidence.md must mention PUBLIC_ASSURANCE_CASE.json');
assert(releaseEvidenceDoc.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'docs/release-evidence.md must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(releaseEvidenceDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'docs/release-evidence.md must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(releaseEvidenceDoc.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'docs/release-evidence.md must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(releaseEvidenceDoc.includes('PUBLIC_REVIEW_SCORECARD.json'), 'docs/release-evidence.md must mention PUBLIC_REVIEW_SCORECARD.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked surface coherence for ${catalog.entries.length} catalog entries and ${packageScripts.size} package scripts`);
