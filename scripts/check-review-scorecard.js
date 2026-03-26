#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const scorecard = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_REVIEW_SCORECARD.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-review-scorecard.schema.json'), 'utf8'));

const requiredIds = [
  'public-boundary-explicit',
  'maintainer-identity-explicit',
  'provenance-and-release-evidence-machine-readable',
  'contracts-examples-and-negative-paths-reviewable',
  'consumer-and-integrator-surface-usable',
  'reviewer-shortcuts-and-summary-layers-present',
  'maintenance-governance-explicit',
  'active-maintenance-history-visible',
  'limits-and-non-claims-explicit',
  'single-verification-entrypoint-present',
  'verification-coverage-explicit',
  'audience-entry-paths-explicit',
  'strength-of-evidence-explicit',
  'adoption-readiness-explicit',
  'freshness-posture-explicit',
  'ecosystem-value-explicit',
  'evidence-gaps-explicit',
  'program-fit-explicit',
  'publication-readiness-explicit'
];

const allowedStatuses = new Set(['pass', 'bounded']);
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

assert(scorecard.version === pkg.version, 'review scorecard version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-review-scorecard.schema.json', 'review-scorecard schema must declare expected public $id');
assert(typeof scorecard.purpose === 'string' && scorecard.purpose.length > 0, 'review scorecard must define purpose');
assert(Array.isArray(scorecard.criteria) && scorecard.criteria.length >= requiredIds.length, 'review scorecard must define expected criteria set');
assert(Array.isArray(scorecard.important_limits) && scorecard.important_limits.length >= 2, 'review scorecard must define important limits');
assert(Array.isArray(scorecard.review_commands) && scorecard.review_commands.length >= 1, 'review scorecard must define review commands');

const ids = new Set();
for (const criterion of scorecard.criteria) {
  assert(typeof criterion.id === 'string' && criterion.id.length > 0, 'review-scorecard criterion must define id');
  assert(!ids.has(criterion.id), `duplicate review-scorecard criterion ${criterion.id}`);
  ids.add(criterion.id);
  assert(typeof criterion.question === 'string' && criterion.question.length > 0, `criterion ${criterion.id} must define question`);
  assert(allowedStatuses.has(criterion.status), `criterion ${criterion.id} has unsupported status ${criterion.status}`);
  assert(typeof criterion.summary === 'string' && criterion.summary.length > 0, `criterion ${criterion.id} must define summary`);
  assert(Array.isArray(criterion.strongest_surfaces) && criterion.strongest_surfaces.length >= 1, `criterion ${criterion.id} must define strongest_surfaces`);
  assert(Array.isArray(criterion.review_commands) && criterion.review_commands.length >= 1, `criterion ${criterion.id} must define review_commands`);
  for (const relativePath of criterion.strongest_surfaces) {
    assert(exists(relativePath), `criterion ${criterion.id} references missing file ${relativePath}`);
  }
  for (const command of criterion.review_commands) {
    assert(packageScripts.has(command), `criterion ${criterion.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required review-scorecard criterion missing: ${requiredId}`);
}

for (const command of scorecard.review_commands) {
  assert(packageScripts.has(command), `review scorecard references unknown review command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const evaluationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'evaluation-packet.md'), 'utf8');
const releaseEvidence = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const verification = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const faq = fs.readFileSync(path.join(repoRoot, 'docs', 'faq.md'), 'utf8');
const traceabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'traceability.md'), 'utf8');
const reviewScorecardDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'review-scorecard.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_REVIEW_SCORECARD.json'), 'README.md must mention PUBLIC_REVIEW_SCORECARD.json');
assert(readme.includes('docs/review-scorecard.md'), 'README.md must mention docs/review-scorecard.md');
assert(quickstart.includes('PUBLIC_REVIEW_SCORECARD.json'), 'QUICKSTART.md must mention PUBLIC_REVIEW_SCORECARD.json');
assert(reviewerGuide.includes('PUBLIC_REVIEW_SCORECARD.json'), 'reviewer guide must mention PUBLIC_REVIEW_SCORECARD.json');
assert(publicIndex.includes('review-scorecard.md'), 'public contract index must mention docs/review-scorecard.md');
assert(publicIndex.includes('../PUBLIC_REVIEW_SCORECARD.json'), 'public contract index must mention PUBLIC_REVIEW_SCORECARD.json');
assert(publicIndex.includes('../schemas/public-review-scorecard.schema.json'), 'public contract index must mention public-review-scorecard schema');
assert(evaluationDoc.includes('PUBLIC_REVIEW_SCORECARD.json'), 'evaluation packet doc must mention PUBLIC_REVIEW_SCORECARD.json');
assert(releaseEvidence.includes('PUBLIC_REVIEW_SCORECARD.json'), 'release-evidence doc must mention PUBLIC_REVIEW_SCORECARD.json');
assert(verification.includes('check:review-scorecard'), 'verification doc must mention check:review-scorecard');
assert(capabilityDoc.includes('PUBLIC_REVIEW_SCORECARD.json'), 'capability-matrix doc must mention PUBLIC_REVIEW_SCORECARD.json');
assert(faq.includes('PUBLIC_REVIEW_SCORECARD.json'), 'FAQ must mention PUBLIC_REVIEW_SCORECARD.json');
assert(traceabilityDoc.includes('PUBLIC_REVIEW_SCORECARD.json'), 'traceability doc must mention PUBLIC_REVIEW_SCORECARD.json');
assert(reviewScorecardDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'review-scorecard doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(reviewScorecardDoc.includes('PUBLIC_AUDIENCE_PATHS.json'), 'review-scorecard doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(reviewScorecardDoc.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'review-scorecard doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(schemasReadme.includes('public-review-scorecard.schema.json'), 'schemas README must mention public-review-scorecard schema');

assert(profile.health_signals?.machine_readable_review_scorecard_present === true, 'project profile must mark machine_readable_review_scorecard_present true');
assert(profile.reviewer_shortcuts?.review_scorecard === 'PUBLIC_REVIEW_SCORECARD.json', 'project profile review_scorecard shortcut must point to PUBLIC_REVIEW_SCORECARD.json');

assert(catalogPaths.has('docs/review-scorecard.md'), 'contract catalog must include docs/review-scorecard.md');
assert(catalogPaths.has('PUBLIC_REVIEW_SCORECARD.json'), 'contract catalog must include PUBLIC_REVIEW_SCORECARD.json');
assert(catalogPaths.has('schemas/public-review-scorecard.schema.json'), 'contract catalog must include public-review-scorecard schema');
assert(catalogPaths.has('scripts/check-review-scorecard.js'), 'contract catalog must include review-scorecard verifier');
assert(catalogPaths.has('PUBLIC_VERIFICATION_MATRIX.json'), 'contract catalog must include PUBLIC_VERIFICATION_MATRIX.json');
assert(catalogPaths.has('PUBLIC_AUDIENCE_PATHS.json'), 'contract catalog must include PUBLIC_AUDIENCE_PATHS.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'contract catalog must include PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(catalogPaths.has('PUBLIC_ADOPTION_READINESS.json'), 'contract catalog must include PUBLIC_ADOPTION_READINESS.json');
assert(catalogPaths.has('PUBLIC_FRESHNESS_MODEL.json'), 'contract catalog must include PUBLIC_FRESHNESS_MODEL.json');
assert(catalogPaths.has('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'contract catalog must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'contract catalog must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(catalogPaths.has('PUBLIC_PROGRAM_FIT_MAP.json'), 'contract catalog must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(catalogPaths.has('PUBLIC_PUBLICATION_READINESS.json'), 'contract catalog must include PUBLIC_PUBLICATION_READINESS.json');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:review-scorecard'), 'release metadata must include review-scorecard verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_REVIEW_SCORECARD.json')), 'release metadata residual risks must mention PUBLIC_REVIEW_SCORECARD.json');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'release metadata residual risks must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_PROGRAM_FIT_MAP.json')), 'release metadata residual risks must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_PUBLICATION_READINESS.json')), 'release metadata residual risks must mention PUBLIC_PUBLICATION_READINESS.json');

const verificationCriterion = scorecard.criteria.find((criterion) => criterion.id === 'verification-coverage-explicit');
assert(verificationCriterion, 'review scorecard must define verification-coverage-explicit criterion');
assert(verificationCriterion.strongest_surfaces.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'verification-coverage-explicit must reference PUBLIC_VERIFICATION_MATRIX.json');
const audienceCriterion = scorecard.criteria.find((criterion) => criterion.id === 'audience-entry-paths-explicit');
assert(audienceCriterion, 'review scorecard must define audience-entry-paths-explicit criterion');
assert(audienceCriterion.strongest_surfaces.includes('PUBLIC_AUDIENCE_PATHS.json'), 'audience-entry-paths-explicit must reference PUBLIC_AUDIENCE_PATHS.json');
const strengthCriterion = scorecard.criteria.find((criterion) => criterion.id === 'strength-of-evidence-explicit');
assert(strengthCriterion, 'review scorecard must define strength-of-evidence-explicit criterion');
assert(strengthCriterion.strongest_surfaces.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'strength-of-evidence-explicit must reference PUBLIC_EVIDENCE_STRENGTH_MAP.json');
const adoptionCriterion = scorecard.criteria.find((criterion) => criterion.id === 'adoption-readiness-explicit');
assert(adoptionCriterion, 'review scorecard must define adoption-readiness-explicit criterion');
assert(adoptionCriterion.strongest_surfaces.includes('PUBLIC_ADOPTION_READINESS.json'), 'adoption-readiness-explicit must reference PUBLIC_ADOPTION_READINESS.json');
const freshnessCriterion = scorecard.criteria.find((criterion) => criterion.id === 'freshness-posture-explicit');
assert(freshnessCriterion, 'review scorecard must define freshness-posture-explicit criterion');
assert(freshnessCriterion.strongest_surfaces.includes('PUBLIC_FRESHNESS_MODEL.json'), 'freshness-posture-explicit must reference PUBLIC_FRESHNESS_MODEL.json');
const ecosystemCriterion = scorecard.criteria.find((criterion) => criterion.id === 'ecosystem-value-explicit');
assert(ecosystemCriterion, 'review scorecard must define ecosystem-value-explicit criterion');
assert(ecosystemCriterion.strongest_surfaces.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'ecosystem-value-explicit must reference PUBLIC_ECOSYSTEM_VALUE_MAP.json');
const evidenceGapsCriterion = scorecard.criteria.find((criterion) => criterion.id === 'evidence-gaps-explicit');
assert(evidenceGapsCriterion, 'review scorecard must define evidence-gaps-explicit criterion');
assert(evidenceGapsCriterion.strongest_surfaces.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'evidence-gaps-explicit must reference PUBLIC_EVIDENCE_GAPS_REGISTER.json');
const programFitCriterion = scorecard.criteria.find((criterion) => criterion.id === 'program-fit-explicit');
assert(programFitCriterion, 'review scorecard must define program-fit-explicit criterion');
assert(programFitCriterion.strongest_surfaces.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'program-fit-explicit must reference PUBLIC_PROGRAM_FIT_MAP.json');
const publicationReadinessCriterion = scorecard.criteria.find((criterion) => criterion.id === 'publication-readiness-explicit');
assert(publicationReadinessCriterion, 'review scorecard must define publication-readiness-explicit criterion');
assert(publicationReadinessCriterion.strongest_surfaces.includes('PUBLIC_PUBLICATION_READINESS.json'), 'publication-readiness-explicit must reference PUBLIC_PUBLICATION_READINESS.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked review scorecard, ${scorecard.criteria.length} criteria, and ${catalog.entries.length} catalog entries`);
