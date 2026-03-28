#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const matrixPath = path.join(repoRoot, 'PUBLIC_CAPABILITY_MATRIX.json');
const schemaPath = path.join(repoRoot, 'schemas', 'public-capability-matrix.schema.json');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));

const requiredIds = [
  'inspect-capsule-law',
  'validate-public-examples-locally',
  'build-validator-client-from-public-contracts',
  'consume-compact-contract-references',
  'validate-with-raw-json-schema',
  'consume-source-level-type-projections',
  'understand-trust-boundaries',
  'review-repository-maturity-quickly',
  'follow-fast-external-evaluation-path',
  'inspect-fail-closed-public-behavior',
  'assess-example-coverage',
  'inspect-maintainer-operations',
  'understand-change-control-and-deprecation',
  'understand-artifact-ownership-and-authority',
  'follow-public-dependency-graph',
  'review-bounded-public-assurance-case',
  'inspect-required-public-sync-groups',
  'inspect-explicit-public-limitations',
  'inspect-active-maintenance-evolution',
  'apply-bounded-review-scorecard',
  'inspect-verification-coverage-across-check-families',
  'follow-role-specific-audience-paths',
  'inspect-evidence-strength-hierarchy',
  'assess-public-adoption-readiness',
  'inspect-freshness-and-staleness-posture',
  'inspect-ecosystem-value-and-external-utility',
  'inspect-public-evidence-gaps-and-review-needs',
  'assess-program-fit-for-oss-support-review',
  'assess-publication-state-and-safety',
  'trace-public-claims-end-to-end',
  'understand-projection-and-domain-boundaries',
  'evaluate-portability-and-import-trust',
  'contribute-safely-to-public-surface',
  'trace-provenance-and-release-state',
  'locate-high-signal-public-artifacts'
];

const expectedAudiences = new Set(['contributors', 'integrators', 'tool-builders', 'reviewers', 'maintainers']);
const expectedReadiness = new Set(['ready', 'illustrative', 'reviewable']);

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));
const ids = new Set();

assert(matrix.matrix_version === pkg.version, 'capability matrix version must match package.json version');
assert(schema.$id === 'https://github.com/num1hub/capsule-specs/schemas/public-capability-matrix.schema.json', 'capability matrix schema must declare the expected public $id');
assert(Array.isArray(matrix.capabilities) && matrix.capabilities.length >= requiredIds.length, 'capability matrix must contain the expected capability set');

for (const capability of matrix.capabilities || []) {
  assert(typeof capability.id === 'string' && capability.id.length > 0, 'each capability must have an id');
  assert(!ids.has(capability.id), `duplicate capability id ${capability.id}`);
  ids.add(capability.id);

  assert(expectedAudiences.has(capability.audience), `capability ${capability.id} has unsupported audience ${capability.audience}`);
  assert(expectedReadiness.has(capability.readiness), `capability ${capability.id} has unsupported readiness ${capability.readiness}`);
  assert(typeof capability.outcome === 'string' && capability.outcome.length > 0, `capability ${capability.id} must define outcome`);
  assert(Array.isArray(capability.strongest_surfaces) && capability.strongest_surfaces.length > 0, `capability ${capability.id} must define strongest_surfaces`);
  assert(Array.isArray(capability.supporting_surfaces) && capability.supporting_surfaces.length > 0, `capability ${capability.id} must define supporting_surfaces`);
  assert(Array.isArray(capability.verify_commands) && capability.verify_commands.length > 0, `capability ${capability.id} must define verify_commands`);

  for (const relativePath of [...capability.strongest_surfaces, ...capability.supporting_surfaces]) {
    assert(exists(relativePath), `capability ${capability.id} references missing file ${relativePath}`);
  }

  for (const command of capability.verify_commands) {
    assert(packageScripts.has(command), `capability ${capability.id} references unknown verify command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required capability missing: ${requiredId}`);
}

assert(catalogPaths.has('PUBLIC_CAPABILITY_MATRIX.json'), 'contract catalog must include PUBLIC_CAPABILITY_MATRIX.json');
assert(catalogPaths.has('PUBLIC_BOUNDARY_MAP.json'), 'contract catalog must include PUBLIC_BOUNDARY_MAP.json');
assert(catalogPaths.has('PUBLIC_PORTABILITY_PROFILE.json'), 'contract catalog must include PUBLIC_PORTABILITY_PROFILE.json');
assert(catalogPaths.has('PUBLIC_EVALUATION_PACKET.json'), 'contract catalog must include PUBLIC_EVALUATION_PACKET.json');
assert(catalogPaths.has('PUBLIC_FAILURE_MODEL.json'), 'contract catalog must include PUBLIC_FAILURE_MODEL.json');
assert(catalogPaths.has('PUBLIC_EXAMPLE_COVERAGE.json'), 'contract catalog must include PUBLIC_EXAMPLE_COVERAGE.json');
assert(catalogPaths.has('PUBLIC_MAINTENANCE_MODEL.json'), 'contract catalog must include PUBLIC_MAINTENANCE_MODEL.json');
assert(catalogPaths.has('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'contract catalog must include PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(catalogPaths.has('PUBLIC_OWNERSHIP_MAP.json'), 'contract catalog must include PUBLIC_OWNERSHIP_MAP.json');
assert(catalogPaths.has('PUBLIC_TRACEABILITY_MATRIX.json'), 'contract catalog must include PUBLIC_TRACEABILITY_MATRIX.json');
assert(catalogPaths.has('PUBLIC_DEPENDENCY_GRAPH.json'), 'contract catalog must include PUBLIC_DEPENDENCY_GRAPH.json');
assert(catalogPaths.has('PUBLIC_ASSURANCE_CASE.json'), 'contract catalog must include PUBLIC_ASSURANCE_CASE.json');
assert(catalogPaths.has('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'contract catalog must include PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(catalogPaths.has('PUBLIC_LIMITATIONS_REGISTER.json'), 'contract catalog must include PUBLIC_LIMITATIONS_REGISTER.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_TIMELINE.json'), 'contract catalog must include PUBLIC_EVIDENCE_TIMELINE.json');
assert(catalogPaths.has('PUBLIC_REVIEW_SCORECARD.json'), 'contract catalog must include PUBLIC_REVIEW_SCORECARD.json');
assert(catalogPaths.has('PUBLIC_VERIFICATION_MATRIX.json'), 'contract catalog must include PUBLIC_VERIFICATION_MATRIX.json');
assert(catalogPaths.has('PUBLIC_AUDIENCE_PATHS.json'), 'contract catalog must include PUBLIC_AUDIENCE_PATHS.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'contract catalog must include PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(catalogPaths.has('PUBLIC_ADOPTION_READINESS.json'), 'contract catalog must include PUBLIC_ADOPTION_READINESS.json');
assert(catalogPaths.has('PUBLIC_FRESHNESS_MODEL.json'), 'contract catalog must include PUBLIC_FRESHNESS_MODEL.json');
assert(catalogPaths.has('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'contract catalog must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'contract catalog must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(catalogPaths.has('PUBLIC_PROGRAM_FIT_MAP.json'), 'contract catalog must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(catalogPaths.has('PUBLIC_PUBLICATION_READINESS.json'), 'contract catalog must include PUBLIC_PUBLICATION_READINESS.json');
assert(catalogPaths.has('docs/capability-matrix.md'), 'contract catalog must include docs/capability-matrix.md');
assert(catalogPaths.has('docs/example-coverage.md'), 'contract catalog must include docs/example-coverage.md');
assert(catalogPaths.has('docs/maintainer-operations.md'), 'contract catalog must include docs/maintainer-operations.md');
assert(catalogPaths.has('docs/change-control.md'), 'contract catalog must include docs/change-control.md');
assert(catalogPaths.has('docs/artifact-ownership.md'), 'contract catalog must include docs/artifact-ownership.md');
assert(catalogPaths.has('docs/traceability.md'), 'contract catalog must include docs/traceability.md');
assert(catalogPaths.has('docs/dependency-graph.md'), 'contract catalog must include docs/dependency-graph.md');
assert(catalogPaths.has('docs/assurance-case.md'), 'contract catalog must include docs/assurance-case.md');
assert(catalogPaths.has('docs/update-coherence.md'), 'contract catalog must include docs/update-coherence.md');
assert(catalogPaths.has('docs/limitations-register.md'), 'contract catalog must include docs/limitations-register.md');
assert(catalogPaths.has('docs/evidence-timeline.md'), 'contract catalog must include docs/evidence-timeline.md');
assert(catalogPaths.has('docs/review-scorecard.md'), 'contract catalog must include docs/review-scorecard.md');
assert(catalogPaths.has('docs/verification-matrix.md'), 'contract catalog must include docs/verification-matrix.md');
assert(catalogPaths.has('docs/audience-paths.md'), 'contract catalog must include docs/audience-paths.md');
assert(catalogPaths.has('docs/evidence-strength.md'), 'contract catalog must include docs/evidence-strength.md');
assert(catalogPaths.has('docs/adoption-readiness.md'), 'contract catalog must include docs/adoption-readiness.md');
assert(catalogPaths.has('docs/freshness.md'), 'contract catalog must include docs/freshness.md');
assert(catalogPaths.has('docs/ecosystem-value.md'), 'contract catalog must include docs/ecosystem-value.md');
assert(catalogPaths.has('docs/evidence-gaps.md'), 'contract catalog must include docs/evidence-gaps.md');
assert(catalogPaths.has('docs/program-fit.md'), 'contract catalog must include docs/program-fit.md');
assert(catalogPaths.has('docs/publication-readiness.md'), 'contract catalog must include docs/publication-readiness.md');
assert(catalogPaths.has('schemas/public-capability-matrix.schema.json'), 'contract catalog must include schemas/public-capability-matrix.schema.json');
assert(catalogPaths.has('schemas/public-example-coverage.schema.json'), 'contract catalog must include schemas/public-example-coverage.schema.json');
assert(catalogPaths.has('schemas/public-maintenance-model.schema.json'), 'contract catalog must include schemas/public-maintenance-model.schema.json');
assert(catalogPaths.has('schemas/public-change-control-model.schema.json'), 'contract catalog must include schemas/public-change-control-model.schema.json');
assert(catalogPaths.has('schemas/public-ownership-map.schema.json'), 'contract catalog must include schemas/public-ownership-map.schema.json');
assert(catalogPaths.has('schemas/public-traceability-matrix.schema.json'), 'contract catalog must include schemas/public-traceability-matrix.schema.json');
assert(catalogPaths.has('schemas/public-dependency-graph.schema.json'), 'contract catalog must include schemas/public-dependency-graph.schema.json');
assert(catalogPaths.has('schemas/public-assurance-case.schema.json'), 'contract catalog must include schemas/public-assurance-case.schema.json');
assert(catalogPaths.has('schemas/public-update-coherence-map.schema.json'), 'contract catalog must include schemas/public-update-coherence-map.schema.json');
assert(catalogPaths.has('schemas/public-limitations-register.schema.json'), 'contract catalog must include schemas/public-limitations-register.schema.json');
assert(catalogPaths.has('schemas/public-evidence-timeline.schema.json'), 'contract catalog must include schemas/public-evidence-timeline.schema.json');
assert(catalogPaths.has('schemas/public-review-scorecard.schema.json'), 'contract catalog must include schemas/public-review-scorecard.schema.json');
assert(catalogPaths.has('schemas/public-verification-matrix.schema.json'), 'contract catalog must include schemas/public-verification-matrix.schema.json');
assert(catalogPaths.has('schemas/public-audience-paths.schema.json'), 'contract catalog must include schemas/public-audience-paths.schema.json');
assert(catalogPaths.has('schemas/public-evidence-strength-map.schema.json'), 'contract catalog must include schemas/public-evidence-strength-map.schema.json');
assert(catalogPaths.has('schemas/public-adoption-readiness.schema.json'), 'contract catalog must include schemas/public-adoption-readiness.schema.json');
assert(catalogPaths.has('schemas/public-freshness-model.schema.json'), 'contract catalog must include schemas/public-freshness-model.schema.json');
assert(catalogPaths.has('schemas/public-ecosystem-value-map.schema.json'), 'contract catalog must include schemas/public-ecosystem-value-map.schema.json');
assert(catalogPaths.has('schemas/public-evidence-gaps-register.schema.json'), 'contract catalog must include schemas/public-evidence-gaps-register.schema.json');
assert(catalogPaths.has('schemas/public-program-fit-map.schema.json'), 'contract catalog must include schemas/public-program-fit-map.schema.json');
assert(catalogPaths.has('schemas/public-publication-readiness.schema.json'), 'contract catalog must include schemas/public-publication-readiness.schema.json');
assert(catalogPaths.has('projections/typescript/validator-api.ts'), 'contract catalog must include the validator API TypeScript projection');
assert(catalogPaths.has('projections/zod/validator-api.ts'), 'contract catalog must include the validator API Zod projection');
assert(catalogPaths.has('examples/client/ts-build-validate-request.ts'), 'contract catalog must include the typed validator request recipe');
assert(catalogPaths.has('examples/client/zod-parse-validate-response.ts'), 'contract catalog must include the Zod validator response recipe');
assert(catalogPaths.has('scripts/check-capability-matrix.js'), 'contract catalog must include scripts/check-capability-matrix.js');
assert(catalogPaths.has('scripts/check-freshness.js'), 'contract catalog must include scripts/check-freshness.js');
assert(catalogPaths.has('scripts/check-ecosystem-value.js'), 'contract catalog must include scripts/check-ecosystem-value.js');
assert(catalogPaths.has('scripts/check-evidence-gaps.js'), 'contract catalog must include scripts/check-evidence-gaps.js');
assert(catalogPaths.has('scripts/check-program-fit.js'), 'contract catalog must include scripts/check-program-fit.js');
assert(catalogPaths.has('scripts/check-publication-readiness.js'), 'contract catalog must include scripts/check-publication-readiness.js');

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');

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
assert(readme.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'README.md must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(readme.includes('PUBLIC_AUDIENCE_PATHS.json'), 'README.md must mention PUBLIC_AUDIENCE_PATHS.json');
assert(readme.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'README.md must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(readme.includes('PUBLIC_ADOPTION_READINESS.json'), 'README.md must mention PUBLIC_ADOPTION_READINESS.json');
assert(readme.includes('PUBLIC_FRESHNESS_MODEL.json'), 'README.md must mention PUBLIC_FRESHNESS_MODEL.json');
assert(readme.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'README.md must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(readme.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'README.md must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(readme.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'README.md must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(readme.includes('PUBLIC_PUBLICATION_READINESS.json'), 'README.md must mention PUBLIC_PUBLICATION_READINESS.json');
assert(reviewerGuide.includes('PUBLIC_CAPABILITY_MATRIX.json'), 'reviewer guide must mention PUBLIC_CAPABILITY_MATRIX.json');
assert(capabilityDoc.includes('PUBLIC_CAPABILITY_MATRIX.json'), 'capability matrix doc must mention PUBLIC_CAPABILITY_MATRIX.json');
assert(capabilityDoc.includes('PUBLIC_BOUNDARY_MAP.json'), 'capability matrix doc must mention PUBLIC_BOUNDARY_MAP.json');
assert(capabilityDoc.includes('PUBLIC_PORTABILITY_PROFILE.json'), 'capability matrix doc must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(capabilityDoc.includes('PUBLIC_EVALUATION_PACKET.json'), 'capability matrix doc must mention PUBLIC_EVALUATION_PACKET.json');
assert(capabilityDoc.includes('PUBLIC_FAILURE_MODEL.json'), 'capability matrix doc must mention PUBLIC_FAILURE_MODEL.json');
assert(capabilityDoc.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'capability matrix doc must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(capabilityDoc.includes('PUBLIC_MAINTENANCE_MODEL.json'), 'capability matrix doc must mention PUBLIC_MAINTENANCE_MODEL.json');
assert(capabilityDoc.includes('PUBLIC_CHANGE_CONTROL_MODEL.json'), 'capability matrix doc must mention PUBLIC_CHANGE_CONTROL_MODEL.json');
assert(capabilityDoc.includes('PUBLIC_OWNERSHIP_MAP.json'), 'capability matrix doc must mention PUBLIC_OWNERSHIP_MAP.json');
assert(capabilityDoc.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'capability matrix doc must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(capabilityDoc.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'capability matrix doc must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(capabilityDoc.includes('PUBLIC_ASSURANCE_CASE.json'), 'capability matrix doc must mention PUBLIC_ASSURANCE_CASE.json');
assert(capabilityDoc.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'capability matrix doc must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(capabilityDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'capability matrix doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(capabilityDoc.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'capability matrix doc must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(capabilityDoc.includes('PUBLIC_REVIEW_SCORECARD.json'), 'capability matrix doc must mention PUBLIC_REVIEW_SCORECARD.json');
assert(capabilityDoc.includes('PUBLIC_VERIFICATION_MATRIX.json'), 'capability matrix doc must mention PUBLIC_VERIFICATION_MATRIX.json');
assert(capabilityDoc.includes('PUBLIC_AUDIENCE_PATHS.json'), 'capability matrix doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(capabilityDoc.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'capability matrix doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(capabilityDoc.includes('PUBLIC_ADOPTION_READINESS.json'), 'capability matrix doc must mention PUBLIC_ADOPTION_READINESS.json');
assert(capabilityDoc.includes('PUBLIC_FRESHNESS_MODEL.json'), 'capability matrix doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(capabilityDoc.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'capability matrix doc must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(capabilityDoc.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'capability matrix doc must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(capabilityDoc.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'capability matrix doc must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(capabilityDoc.includes('PUBLIC_PUBLICATION_READINESS.json'), 'capability matrix doc must mention PUBLIC_PUBLICATION_READINESS.json');
assert(capabilityDoc.includes('PUBLIC_PROJECT_PROFILE.json'), 'capability matrix doc must mention PUBLIC_PROJECT_PROFILE.json');
assert(capabilityDoc.includes('PUBLIC_RELEASE_METADATA.json'), 'capability matrix doc must mention PUBLIC_RELEASE_METADATA.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${matrix.capabilities.length} capabilities against ${packageScripts.size} package scripts and ${catalog.entries.length} catalog entries`);
