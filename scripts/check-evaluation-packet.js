#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const evaluationPacket = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_EVALUATION_PACKET.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-evaluation-packet.schema.json'), 'utf8'));

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

assert(evaluationPacket.version === pkg.version, 'evaluation packet version must match package.json version');
assert(schema.$id === 'https://github.com/num1hub/capsule-specs/schemas/public-evaluation-packet.schema.json', 'evaluation packet schema must declare expected public $id');
assert(evaluationPacket.repository_identity?.owner === 'num1hub', 'evaluation packet owner must be num1hub');
assert(evaluationPacket.repository_identity?.name === 'capsule-specs', 'evaluation packet name must be capsule-specs');
assert(evaluationPacket.repository_identity?.homepage === 'https://github.com/num1hub/capsule-specs', 'evaluation packet homepage must match the canonical public repo URL');
assert(evaluationPacket.repository_identity?.license === pkg.license, 'evaluation packet license must match package.json');
assert(evaluationPacket.repository_identity?.primary_maintainer === profile.repository_identity?.primary_maintainer, 'evaluation packet maintainer must match project profile');

assert(Array.isArray(evaluationPacket.evaluation_goals) && evaluationPacket.evaluation_goals.length >= 3, 'evaluation packet must define evaluation goals');
assert(Array.isArray(evaluationPacket.fast_review_path) && evaluationPacket.fast_review_path.length >= 5, 'evaluation packet must define fast review path');
assert(Array.isArray(evaluationPacket.review_commands) && evaluationPacket.review_commands.length >= 1, 'evaluation packet must define review commands');
assert(Array.isArray(evaluationPacket.public_value_claims) && evaluationPacket.public_value_claims.length >= 2, 'evaluation packet must define public value claims');
assert(Array.isArray(evaluationPacket.non_claims) && evaluationPacket.non_claims.length >= 2, 'evaluation packet must define non-claims');
assert(Array.isArray(evaluationPacket.residual_risk_surfaces) && evaluationPacket.residual_risk_surfaces.length >= 1, 'evaluation packet must define residual risk surfaces');

for (const relativePath of evaluationPacket.fast_review_path) {
  assert(exists(relativePath), `evaluation packet fast review path references missing file ${relativePath}`);
}

for (const group of Object.values(evaluationPacket.strongest_evidence || {})) {
  assert(Array.isArray(group) && group.length >= 1, 'each strongest_evidence group must contain at least one path');
  for (const relativePath of group) {
    assert(exists(relativePath), `evaluation packet strongest_evidence references missing file ${relativePath}`);
  }
}

for (const relativePath of evaluationPacket.residual_risk_surfaces) {
  assert(exists(relativePath), `evaluation packet residual_risk_surfaces references missing file ${relativePath}`);
}

for (const command of evaluationPacket.review_commands) {
  assert(packageScripts.has(command), `evaluation packet references unknown review command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const evaluationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'evaluation-packet.md'), 'utf8');
const faqDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'faq.md'), 'utf8');
const releaseEvidenceDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');

assert(readme.includes('PUBLIC_EVALUATION_PACKET.json'), 'README.md must mention PUBLIC_EVALUATION_PACKET.json');
assert(readme.includes('docs/evaluation-packet.md'), 'README.md must mention docs/evaluation-packet.md');
assert(reviewerGuide.includes('PUBLIC_EVALUATION_PACKET.json'), 'reviewer guide must mention PUBLIC_EVALUATION_PACKET.json');
assert(evaluationDoc.includes('PUBLIC_EVALUATION_PACKET.json'), 'evaluation-packet doc must mention PUBLIC_EVALUATION_PACKET.json');
assert(evaluationDoc.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'evaluation-packet doc must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(evaluationDoc.includes('PUBLIC_OWNERSHIP_MAP.json'), 'evaluation-packet doc must mention PUBLIC_OWNERSHIP_MAP.json');
assert(evaluationDoc.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'evaluation-packet doc must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(evaluationDoc.includes('PUBLIC_ASSURANCE_CASE.json'), 'evaluation-packet doc must mention PUBLIC_ASSURANCE_CASE.json');
assert(evaluationDoc.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'evaluation-packet doc must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(evaluationDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'evaluation-packet doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(evaluationDoc.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'evaluation-packet doc must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(evaluationDoc.includes('PUBLIC_REVIEW_SCORECARD.json'), 'evaluation-packet doc must mention PUBLIC_REVIEW_SCORECARD.json');
assert(evaluationDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'evaluation-packet doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(evaluationDoc.includes('PUBLIC_AUDIENCE_PATHS.json'), 'evaluation-packet doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(evaluationDoc.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'evaluation-packet doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(evaluationDoc.includes('PUBLIC_FRESHNESS_MODEL.json'), 'evaluation-packet doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(evaluationDoc.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'evaluation-packet doc must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(evaluationDoc.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'evaluation-packet doc must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(evaluationDoc.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'evaluation-packet doc must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(evaluationDoc.includes('PUBLIC_PUBLICATION_READINESS.json'), 'evaluation-packet doc must mention PUBLIC_PUBLICATION_READINESS.json');
assert(faqDoc.includes('PUBLIC_EVALUATION_PACKET.json'), 'FAQ must mention PUBLIC_EVALUATION_PACKET.json');
assert(releaseEvidenceDoc.includes('PUBLIC_EVALUATION_PACKET.json'), 'release-evidence doc must mention PUBLIC_EVALUATION_PACKET.json');
assert(releaseEvidenceDoc.includes('PUBLIC_FRESHNESS_MODEL.json'), 'release-evidence doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(releaseEvidenceDoc.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'release-evidence doc must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(releaseEvidenceDoc.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'release-evidence doc must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(releaseEvidenceDoc.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'release-evidence doc must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(releaseEvidenceDoc.includes('PUBLIC_PUBLICATION_READINESS.json'), 'release-evidence doc must mention PUBLIC_PUBLICATION_READINESS.json');
assert(capabilityDoc.includes('PUBLIC_EVALUATION_PACKET.json'), 'capability-matrix doc must mention PUBLIC_EVALUATION_PACKET.json');
assert(quickstart.includes('PUBLIC_EVALUATION_PACKET.json'), 'QUICKSTART.md must mention PUBLIC_EVALUATION_PACKET.json');
assert(readme.includes('PUBLIC_REPOSITORY_IDENTITY.json'), 'README.md must mention PUBLIC_REPOSITORY_IDENTITY.json');
assert(reviewerGuide.includes('PUBLIC_REPOSITORY_IDENTITY.json'), 'reviewer guide must mention PUBLIC_REPOSITORY_IDENTITY.json');
assert(evaluationDoc.includes('docs/repository-identity.md'), 'evaluation-packet doc must mention docs/repository-identity.md');
assert(releaseEvidenceDoc.includes('PUBLIC_REPOSITORY_IDENTITY.json'), 'release-evidence doc must mention PUBLIC_REPOSITORY_IDENTITY.json');
assert(quickstart.includes('PUBLIC_REPOSITORY_IDENTITY.json'), 'QUICKSTART.md must mention PUBLIC_REPOSITORY_IDENTITY.json');

assert(catalogPaths.has('PUBLIC_EVALUATION_PACKET.json'), 'contract catalog must include PUBLIC_EVALUATION_PACKET.json');
assert(catalogPaths.has('PUBLIC_ASSURANCE_CASE.json'), 'contract catalog must include PUBLIC_ASSURANCE_CASE.json');
assert(catalogPaths.has('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'contract catalog must include PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(catalogPaths.has('PUBLIC_LIMITATIONS_REGISTER.json'), 'contract catalog must include PUBLIC_LIMITATIONS_REGISTER.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_TIMELINE.json'), 'contract catalog must include PUBLIC_EVIDENCE_TIMELINE.json');
assert(catalogPaths.has('PUBLIC_REVIEW_SCORECARD.json'), 'contract catalog must include PUBLIC_REVIEW_SCORECARD.json');
assert(catalogPaths.has('PUBLIC_VERIFICATION_MATRIX.json'), 'contract catalog must include PUBLIC_VERIFICATION_MATRIX.json');
assert(catalogPaths.has('PUBLIC_AUDIENCE_PATHS.json'), 'contract catalog must include PUBLIC_AUDIENCE_PATHS.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'contract catalog must include PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(catalogPaths.has('PUBLIC_FRESHNESS_MODEL.json'), 'contract catalog must include PUBLIC_FRESHNESS_MODEL.json');
assert(catalogPaths.has('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'contract catalog must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'contract catalog must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(catalogPaths.has('PUBLIC_PROGRAM_FIT_MAP.json'), 'contract catalog must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(catalogPaths.has('PUBLIC_PUBLICATION_READINESS.json'), 'contract catalog must include PUBLIC_PUBLICATION_READINESS.json');
assert(catalogPaths.has('PUBLIC_REPOSITORY_IDENTITY.json'), 'contract catalog must include PUBLIC_REPOSITORY_IDENTITY.json');
assert(catalogPaths.has('docs/evaluation-packet.md'), 'contract catalog must include docs/evaluation-packet.md');
assert(catalogPaths.has('docs/evidence-timeline.md'), 'contract catalog must include docs/evidence-timeline.md');
assert(catalogPaths.has('docs/review-scorecard.md'), 'contract catalog must include docs/review-scorecard.md');
assert(catalogPaths.has('docs/verification-matrix.md'), 'contract catalog must include docs/verification-matrix.md');
assert(catalogPaths.has('docs/audience-paths.md'), 'contract catalog must include docs/audience-paths.md');
assert(catalogPaths.has('docs/evidence-strength.md'), 'contract catalog must include docs/evidence-strength.md');
assert(catalogPaths.has('docs/freshness.md'), 'contract catalog must include docs/freshness.md');
assert(catalogPaths.has('docs/ecosystem-value.md'), 'contract catalog must include docs/ecosystem-value.md');
assert(catalogPaths.has('docs/evidence-gaps.md'), 'contract catalog must include docs/evidence-gaps.md');
assert(catalogPaths.has('docs/program-fit.md'), 'contract catalog must include docs/program-fit.md');
assert(catalogPaths.has('docs/publication-readiness.md'), 'contract catalog must include docs/publication-readiness.md');
assert(catalogPaths.has('docs/repository-identity.md'), 'contract catalog must include docs/repository-identity.md');
assert(catalogPaths.has('schemas/public-evaluation-packet.schema.json'), 'contract catalog must include public-evaluation-packet schema');
assert(catalogPaths.has('schemas/public-freshness-model.schema.json'), 'contract catalog must include public-freshness-model schema');
assert(catalogPaths.has('schemas/public-ecosystem-value-map.schema.json'), 'contract catalog must include public-ecosystem-value schema');
assert(catalogPaths.has('schemas/public-evidence-gaps-register.schema.json'), 'contract catalog must include public-evidence-gaps schema');
assert(catalogPaths.has('schemas/public-program-fit-map.schema.json'), 'contract catalog must include public-program-fit schema');
assert(catalogPaths.has('schemas/public-publication-readiness.schema.json'), 'contract catalog must include public-publication-readiness schema');
assert(catalogPaths.has('schemas/public-repository-identity.schema.json'), 'contract catalog must include public-repository-identity schema');
assert(catalogPaths.has('scripts/check-evaluation-packet.js'), 'contract catalog must include evaluation-packet verifier');
assert(catalogPaths.has('scripts/check-freshness.js'), 'contract catalog must include freshness verifier');
assert(catalogPaths.has('scripts/check-ecosystem-value.js'), 'contract catalog must include ecosystem-value verifier');
assert(catalogPaths.has('scripts/check-evidence-gaps.js'), 'contract catalog must include evidence-gaps verifier');
assert(catalogPaths.has('scripts/check-program-fit.js'), 'contract catalog must include program-fit verifier');
assert(catalogPaths.has('scripts/check-publication-readiness.js'), 'contract catalog must include publication-readiness verifier');
assert(catalogPaths.has('scripts/check-repository-identity.js'), 'contract catalog must include repository-identity verifier');

assert(releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:evaluation-packet'), 'release metadata must include evaluation-packet verification');
assert(releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_EVALUATION_PACKET.json')), 'release metadata residual risks must mention PUBLIC_EVALUATION_PACKET.json');
assert(evaluationPacket.fast_review_path.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'evaluation packet fast_review_path must include PUBLIC_EVIDENCE_TIMELINE.json');
assert(evaluationPacket.fast_review_path.includes('PUBLIC_REVIEW_SCORECARD.json'), 'evaluation packet fast_review_path must include PUBLIC_REVIEW_SCORECARD.json');
assert(evaluationPacket.fast_review_path.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'evaluation packet fast_review_path must include PUBLIC_VERIFICATION_MATRIX.json');
assert(evaluationPacket.fast_review_path.includes('PUBLIC_AUDIENCE_PATHS.json'), 'evaluation packet fast_review_path must include PUBLIC_AUDIENCE_PATHS.json');
assert(evaluationPacket.fast_review_path.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'evaluation packet fast_review_path must include PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(evaluationPacket.fast_review_path.includes('PUBLIC_FRESHNESS_MODEL.json'), 'evaluation packet fast_review_path must include PUBLIC_FRESHNESS_MODEL.json');
assert(evaluationPacket.fast_review_path.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'evaluation packet fast_review_path must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(evaluationPacket.fast_review_path.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'evaluation packet fast_review_path must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(evaluationPacket.fast_review_path.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'evaluation packet fast_review_path must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(evaluationPacket.fast_review_path.includes('PUBLIC_PUBLICATION_READINESS.json'), 'evaluation packet fast_review_path must include PUBLIC_PUBLICATION_READINESS.json');
assert(evaluationPacket.fast_review_path.includes('PUBLIC_REPOSITORY_IDENTITY.json'), 'evaluation packet fast_review_path must include PUBLIC_REPOSITORY_IDENTITY.json');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_EVIDENCE_TIMELINE.json');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_REVIEW_SCORECARD.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_REVIEW_SCORECARD.json');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_VERIFICATION_MATRIX.json');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_AUDIENCE_PATHS.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_AUDIENCE_PATHS.json');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_FRESHNESS_MODEL.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_FRESHNESS_MODEL.json');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_PUBLICATION_READINESS.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_PUBLICATION_READINESS.json');
assert(evaluationPacket.strongest_evidence?.machine_readable_evidence?.includes('PUBLIC_REPOSITORY_IDENTITY.json'), 'evaluation packet machine_readable_evidence must include PUBLIC_REPOSITORY_IDENTITY.json');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/evidence-timeline.md'), 'evaluation packet governance_and_review must include docs/evidence-timeline.md');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/review-scorecard.md'), 'evaluation packet governance_and_review must include docs/review-scorecard.md');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/verification-matrix.md'), 'evaluation packet governance_and_review must include docs/verification-matrix.md');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/audience-paths.md'), 'evaluation packet governance_and_review must include docs/audience-paths.md');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/evidence-strength.md'), 'evaluation packet governance_and_review must include docs/evidence-strength.md');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/freshness.md'), 'evaluation packet governance_and_review must include docs/freshness.md');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/ecosystem-value.md'), 'evaluation packet governance_and_review must include docs/ecosystem-value.md');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/evidence-gaps.md'), 'evaluation packet governance_and_review must include docs/evidence-gaps.md');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/program-fit.md'), 'evaluation packet governance_and_review must include docs/program-fit.md');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/publication-readiness.md'), 'evaluation packet governance_and_review must include docs/publication-readiness.md');
assert(evaluationPacket.strongest_evidence?.governance_and_review?.includes('docs/repository-identity.md'), 'evaluation packet governance_and_review must include docs/repository-identity.md');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('active maintenance')), 'evaluation packet public_value_claims must mention active maintenance');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('review scorecard')), 'evaluation packet public_value_claims must mention review scorecard');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('verification coverage')), 'evaluation packet public_value_claims must mention verification coverage');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('audience-specific')), 'evaluation packet public_value_claims must mention audience-specific paths');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('stronger-source hierarchy')), 'evaluation packet public_value_claims must mention stronger-source hierarchy');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('freshness')), 'evaluation packet public_value_claims must mention freshness');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('ecosystem')), 'evaluation packet public_value_claims must mention ecosystem');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('evidence gaps')), 'evaluation packet public_value_claims must mention evidence gaps');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('program-fit')), 'evaluation packet public_value_claims must mention program-fit');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('publication readiness')), 'evaluation packet public_value_claims must mention publication readiness');
assert(evaluationPacket.public_value_claims.some((claim) => typeof claim === 'string' && claim.toLowerCase().includes('canonical public-repo identity')), 'evaluation packet public_value_claims must mention canonical public-repo identity');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked evaluation packet, ${evaluationPacket.fast_review_path.length} fast-review paths, and ${catalog.entries.length} catalog entries`);
