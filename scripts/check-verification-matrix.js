#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const matrix = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_VERIFICATION_MATRIX.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-verification-matrix.schema.json'), 'utf8'));

const requiredIds = [
  'public-surface-coverage',
  'capsule-and-api-example-integrity',
  'coverage-and-negative-paths',
  'boundary-portability-and-limits',
  'community-and-maintainer-governance',
  'reviewer-and-summary-layers',
  'adoption-readiness-and-bounded-use',
  'traceability-dependency-and-assurance',
  'docs-and-cross-surface-coherence',
  'release-state-and-maintenance-history',
  'freshness-and-summary-currency',
  'ecosystem-value-and-program-utility',
  'evidence-gaps-and-bounded-maturity',
  'program-fit-and-reviewer-program-criteria',
  'publication-state-and-safety'
];

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

assert(matrix.version === pkg.version, 'verification matrix version must match package.json version');
assert(schema.$id === 'https://github.com/num1hub/capsule-specs/schemas/public-verification-matrix.schema.json', 'verification-matrix schema must declare expected public $id');
assert(typeof matrix.purpose === 'string' && matrix.purpose.length > 0, 'verification matrix must define purpose');
assert(Array.isArray(matrix.checks) && matrix.checks.length >= requiredIds.length, 'verification matrix must define expected check families');
assert(Array.isArray(matrix.review_commands) && matrix.review_commands.length >= 1, 'verification matrix must define review commands');

const ids = new Set();
for (const item of matrix.checks) {
  assert(typeof item.id === 'string' && item.id.length > 0, 'verification-matrix row must define id');
  assert(!ids.has(item.id), `duplicate verification-matrix row ${item.id}`);
  ids.add(item.id);
  assert(typeof item.summary === 'string' && item.summary.length > 0, `verification-matrix row ${item.id} must define summary`);
  assert(Array.isArray(item.commands) && item.commands.length >= 1, `verification-matrix row ${item.id} must define commands`);
  assert(Array.isArray(item.protects) && item.protects.length >= 1, `verification-matrix row ${item.id} must define protects`);
  assert(Array.isArray(item.strongest_surfaces) && item.strongest_surfaces.length >= 1, `verification-matrix row ${item.id} must define strongest_surfaces`);
  assert(Array.isArray(item.failure_modes_prevented) && item.failure_modes_prevented.length >= 1, `verification-matrix row ${item.id} must define failure_modes_prevented`);
  for (const command of item.commands) {
    assert(packageScripts.has(command), `verification-matrix row ${item.id} references unknown command ${command}`);
  }
  for (const rel of [...item.protects, ...item.strongest_surfaces]) {
    const normalized = rel.endsWith('/') ? rel.slice(0, -1) : rel;
    assert(exists(normalized), `verification-matrix row ${item.id} references missing file ${rel}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required verification-matrix row missing: ${requiredId}`);
}

for (const command of matrix.review_commands) {
  assert(packageScripts.has(command), `verification matrix references unknown review command ${command}`);
}

const reviewerLayer = matrix.checks.find((item) => item.id === 'reviewer-and-summary-layers');
assert(reviewerLayer, 'verification matrix must define reviewer-and-summary-layers row');
assert(reviewerLayer.commands.includes('npm run check:audience-paths'), 'reviewer-and-summary-layers row must include npm run check:audience-paths');
assert(reviewerLayer.protects.includes('PUBLIC_AUDIENCE_PATHS.json'), 'reviewer-and-summary-layers row must protect PUBLIC_AUDIENCE_PATHS.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_AUDIENCE_PATHS.json'), 'reviewer-and-summary-layers row must reference PUBLIC_AUDIENCE_PATHS.json');
assert(reviewerLayer.commands.includes('npm run check:evidence-strength'), 'reviewer-and-summary-layers row must include npm run check:evidence-strength');
assert(reviewerLayer.protects.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'reviewer-and-summary-layers row must protect PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'reviewer-and-summary-layers row must reference PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(reviewerLayer.commands.includes('npm run check:freshness'), 'reviewer-and-summary-layers row must include npm run check:freshness');
assert(reviewerLayer.protects.includes('PUBLIC_FRESHNESS_MODEL.json'), 'reviewer-and-summary-layers row must protect PUBLIC_FRESHNESS_MODEL.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_FRESHNESS_MODEL.json'), 'reviewer-and-summary-layers row must reference PUBLIC_FRESHNESS_MODEL.json');
assert(reviewerLayer.failure_modes_prevented.some((item) => item.includes('freshness')), 'reviewer-and-summary-layers row must mention freshness failure prevention');
assert(reviewerLayer.commands.includes('npm run check:ecosystem-value'), 'reviewer-and-summary-layers row must include npm run check:ecosystem-value');
assert(reviewerLayer.protects.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'reviewer-and-summary-layers row must protect PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'reviewer-and-summary-layers row must reference PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(reviewerLayer.failure_modes_prevented.some((item) => item.includes('ecosystem value')), 'reviewer-and-summary-layers row must mention ecosystem value failure prevention');
assert(reviewerLayer.commands.includes('npm run check:evidence-gaps'), 'reviewer-and-summary-layers row must include npm run check:evidence-gaps');
assert(reviewerLayer.protects.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'reviewer-and-summary-layers row must protect PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'reviewer-and-summary-layers row must reference PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(reviewerLayer.failure_modes_prevented.some((item) => item.includes('evidence gaps')), 'reviewer-and-summary-layers row must mention evidence gaps failure prevention');
assert(reviewerLayer.commands.includes('npm run check:program-fit'), 'reviewer-and-summary-layers row must include npm run check:program-fit');
assert(reviewerLayer.protects.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'reviewer-and-summary-layers row must protect PUBLIC_PROGRAM_FIT_MAP.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'reviewer-and-summary-layers row must reference PUBLIC_PROGRAM_FIT_MAP.json');
assert(reviewerLayer.failure_modes_prevented.some((item) => item.includes('program-fit')), 'reviewer-and-summary-layers row must mention program-fit failure prevention');
assert(reviewerLayer.commands.includes('npm run check:publication-readiness'), 'reviewer-and-summary-layers row must include npm run check:publication-readiness');
assert(reviewerLayer.protects.includes('PUBLIC_PUBLICATION_READINESS.json'), 'reviewer-and-summary-layers row must protect PUBLIC_PUBLICATION_READINESS.json');
assert(reviewerLayer.strongest_surfaces.includes('PUBLIC_PUBLICATION_READINESS.json'), 'reviewer-and-summary-layers row must reference PUBLIC_PUBLICATION_READINESS.json');
assert(reviewerLayer.failure_modes_prevented.some((item) => item.includes('publication-readiness')), 'reviewer-and-summary-layers row must mention publication-readiness failure prevention');
const freshnessLayer = matrix.checks.find((item) => item.id === 'freshness-and-summary-currency');
assert(freshnessLayer, 'verification matrix must define freshness-and-summary-currency row');
assert(freshnessLayer.commands.includes('npm run check:freshness'), 'freshness-and-summary-currency row must include npm run check:freshness');
assert(freshnessLayer.protects.includes('PUBLIC_FRESHNESS_MODEL.json'), 'freshness-and-summary-currency row must protect PUBLIC_FRESHNESS_MODEL.json');
assert(freshnessLayer.strongest_surfaces.includes('PUBLIC_FRESHNESS_MODEL.json'), 'freshness-and-summary-currency row must reference PUBLIC_FRESHNESS_MODEL.json');
const ecosystemLayer = matrix.checks.find((item) => item.id === 'ecosystem-value-and-program-utility');
assert(ecosystemLayer, 'verification matrix must define ecosystem-value-and-program-utility row');
assert(ecosystemLayer.commands.includes('npm run check:ecosystem-value'), 'ecosystem-value-and-program-utility row must include npm run check:ecosystem-value');
assert(ecosystemLayer.protects.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'ecosystem-value-and-program-utility row must protect PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(ecosystemLayer.strongest_surfaces.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'ecosystem-value-and-program-utility row must reference PUBLIC_ECOSYSTEM_VALUE_MAP.json');
const docsLayer = matrix.checks.find((item) => item.id === 'docs-and-cross-surface-coherence');
assert(docsLayer, 'verification matrix must define docs-and-cross-surface-coherence row');
assert(docsLayer.commands.includes('npm run check:openapi-coherence'), 'docs-and-cross-surface-coherence row must include npm run check:openapi-coherence');
assert(docsLayer.protects.includes('openapi/validate.openapi.json'), 'docs-and-cross-surface-coherence row must protect openapi/validate.openapi.json');
assert(docsLayer.protects.includes('references/validator-routes.json'), 'docs-and-cross-surface-coherence row must protect references/validator-routes.json');
assert(docsLayer.protects.includes('references/validator-envelope-families.json'), 'docs-and-cross-surface-coherence row must protect references/validator-envelope-families.json');
assert(docsLayer.strongest_surfaces.includes('docs/openapi.md'), 'docs-and-cross-surface-coherence row must reference docs/openapi.md');
assert(docsLayer.strongest_surfaces.includes('docs/reference-pack.md'), 'docs-and-cross-surface-coherence row must reference docs/reference-pack.md');
assert(docsLayer.failure_modes_prevented.some((item) => item.includes('OpenAPI')), 'docs-and-cross-surface-coherence row must mention OpenAPI drift prevention');

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

assert(readme.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'README.md must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(readme.includes('docs/verification-matrix.md'), 'README.md must mention docs/verification-matrix.md');
assert(quickstart.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'QUICKSTART.md must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(reviewerGuide.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'reviewer guide must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(publicIndex.includes('verification-matrix.md'), 'public contract index must mention docs/verification-matrix.md');
assert(publicIndex.includes('../PUBLIC_VERIFICATION_MATRIX.json'), 'public contract index must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(publicIndex.includes('../schemas/public-verification-matrix.schema.json'), 'public contract index must mention public-verification-matrix schema');
assert(evaluationDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'evaluation packet doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(releaseEvidence.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'release-evidence doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(verification.includes('check:verification-matrix'), 'verification doc must mention check:verification-matrix');
assert(capabilityDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'capability-matrix doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(faq.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'FAQ must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(traceabilityDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'traceability doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(reviewScorecardDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'review-scorecard doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(reviewerGuide.includes('PUBLIC_AUDIENCE_PATHS.json'), 'reviewer guide must mention PUBLIC_AUDIENCE_PATHS.json');
assert(evaluationDoc.includes('PUBLIC_AUDIENCE_PATHS.json'), 'evaluation packet doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(capabilityDoc.includes('PUBLIC_AUDIENCE_PATHS.json'), 'capability-matrix doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(reviewerGuide.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'reviewer guide must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(evaluationDoc.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'evaluation packet doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(capabilityDoc.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'capability-matrix doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(reviewerGuide.includes('PUBLIC_FRESHNESS_MODEL.json'), 'reviewer guide must mention PUBLIC_FRESHNESS_MODEL.json');
assert(reviewerGuide.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'reviewer guide must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(reviewerGuide.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'reviewer guide must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(evaluationDoc.includes('PUBLIC_FRESHNESS_MODEL.json'), 'evaluation packet doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(evaluationDoc.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'evaluation packet doc must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(evaluationDoc.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'evaluation packet doc must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(evaluationDoc.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'evaluation packet doc must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(evaluationDoc.includes('PUBLIC_PUBLICATION_READINESS.json'), 'evaluation packet doc must mention PUBLIC_PUBLICATION_READINESS.json');
assert(capabilityDoc.includes('PUBLIC_FRESHNESS_MODEL.json'), 'capability-matrix doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(capabilityDoc.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'capability-matrix doc must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(capabilityDoc.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'capability-matrix doc must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(capabilityDoc.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'capability-matrix doc must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(capabilityDoc.includes('PUBLIC_PUBLICATION_READINESS.json'), 'capability-matrix doc must mention PUBLIC_PUBLICATION_READINESS.json');
assert(schemasReadme.includes('public-verification-matrix.schema.json'), 'schemas README must mention public-verification-matrix schema');

assert(profile.health_signals?.machine_readable_verification_matrix_present === true, 'project profile must mark machine_readable_verification_matrix_present true');
assert(profile.reviewer_shortcuts?.verification_matrix === 'PUBLIC_VERIFICATION_MATRIX.json', 'project profile verification_matrix shortcut must point to PUBLIC_VERIFICATION_MATRIX.json');

assert(catalogPaths.has('docs/verification-matrix.md'), 'contract catalog must include docs/verification-matrix.md');
assert(catalogPaths.has('PUBLIC_VERIFICATION_MATRIX.json'), 'contract catalog must include PUBLIC_VERIFICATION_MATRIX.json');
assert(catalogPaths.has('PUBLIC_AUDIENCE_PATHS.json'), 'contract catalog must include PUBLIC_AUDIENCE_PATHS.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'contract catalog must include PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(catalogPaths.has('PUBLIC_FRESHNESS_MODEL.json'), 'contract catalog must include PUBLIC_FRESHNESS_MODEL.json');
assert(catalogPaths.has('docs/freshness.md'), 'contract catalog must include docs/freshness.md');
assert(catalogPaths.has('schemas/public-freshness-model.schema.json'), 'contract catalog must include public-freshness-model schema');
assert(catalogPaths.has('scripts/check-freshness.js'), 'contract catalog must include freshness verifier');
assert(catalogPaths.has('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'contract catalog must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(catalogPaths.has('docs/ecosystem-value.md'), 'contract catalog must include docs/ecosystem-value.md');
assert(catalogPaths.has('schemas/public-ecosystem-value-map.schema.json'), 'contract catalog must include public-ecosystem-value schema');
assert(catalogPaths.has('scripts/check-ecosystem-value.js'), 'contract catalog must include ecosystem-value verifier');
assert(catalogPaths.has('scripts/check-openapi-coherence.js'), 'contract catalog must include OpenAPI coherence verifier');
assert(catalogPaths.has('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'contract catalog must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(catalogPaths.has('docs/evidence-gaps.md'), 'contract catalog must include docs/evidence-gaps.md');
assert(catalogPaths.has('schemas/public-evidence-gaps-register.schema.json'), 'contract catalog must include public-evidence-gaps schema');
assert(catalogPaths.has('scripts/check-evidence-gaps.js'), 'contract catalog must include evidence-gaps verifier');
assert(catalogPaths.has('PUBLIC_PROGRAM_FIT_MAP.json'), 'contract catalog must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(catalogPaths.has('docs/program-fit.md'), 'contract catalog must include docs/program-fit.md');
assert(catalogPaths.has('schemas/public-program-fit-map.schema.json'), 'contract catalog must include public-program-fit schema');
assert(catalogPaths.has('scripts/check-program-fit.js'), 'contract catalog must include program-fit verifier');
assert(catalogPaths.has('PUBLIC_PUBLICATION_READINESS.json'), 'contract catalog must include PUBLIC_PUBLICATION_READINESS.json');
assert(catalogPaths.has('docs/publication-readiness.md'), 'contract catalog must include docs/publication-readiness.md');
assert(catalogPaths.has('schemas/public-publication-readiness.schema.json'), 'contract catalog must include public-publication-readiness schema');
assert(catalogPaths.has('scripts/check-publication-readiness.js'), 'contract catalog must include publication-readiness verifier');
assert(catalogPaths.has('schemas/public-verification-matrix.schema.json'), 'contract catalog must include public-verification-matrix schema');
assert(catalogPaths.has('scripts/check-verification-matrix.js'), 'contract catalog must include verification-matrix verifier');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:verification-matrix'), 'release metadata must include verification-matrix verification');
assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:openapi-coherence'), 'release metadata must include OpenAPI coherence verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_VERIFICATION_MATRIX.json')), 'release metadata residual risks must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:freshness'), 'release metadata must include freshness verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_FRESHNESS_MODEL.json')), 'release metadata residual risks must mention PUBLIC_FRESHNESS_MODEL.json');
assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:ecosystem-value'), 'release metadata must include ecosystem-value verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json')), 'release metadata residual risks must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:evidence-gaps'), 'release metadata must include evidence-gaps verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')), 'release metadata residual risks must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:program-fit'), 'release metadata must include program-fit verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_PROGRAM_FIT_MAP.json')), 'release metadata residual risks must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:publication-readiness'), 'release metadata must include publication-readiness verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_PUBLICATION_READINESS.json')), 'release metadata residual risks must mention PUBLIC_PUBLICATION_READINESS.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked verification matrix, ${matrix.checks.length} check families, and ${catalog.entries.length} catalog entries`);
