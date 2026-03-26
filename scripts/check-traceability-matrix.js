#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const traceability = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_TRACEABILITY_MATRIX.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-traceability-matrix.schema.json'), 'utf8'));

const requiredIds = [
  'law-and-schema-contract',
  'validator-api-and-client-contract',
  'negative-evidence-and-fail-closed',
  'projection-boundaries-and-provenance',
  'reviewer-and-release-evidence',
  'portability-and-archive-contracts',
  'maintainer-intake-and-practical-usability',
  'change-control-and-release-discipline',
  'artifact-ownership-and-authority',
  'dependency-order-and-reading-path',
  'bounded-public-assurance-and-limits',
  'co-moving-review-and-release-surfaces',
  'explicit-limitations-and-deferred-scope',
  'active-maintenance-and-public-hardening-history'
];

const allowedAudiences = new Set(['contributors', 'integrators', 'tool-builders', 'reviewers']);
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

assert(traceability.version === pkg.version, 'traceability matrix version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-traceability-matrix.schema.json', 'traceability schema must declare expected public $id');
assert(Array.isArray(traceability.traces) && traceability.traces.length >= requiredIds.length, 'traceability matrix must contain the expected trace set');
assert(Array.isArray(traceability.non_claims) && traceability.non_claims.length >= 2, 'traceability matrix must define non-claims');
assert(Array.isArray(traceability.review_commands) && traceability.review_commands.length >= 1, 'traceability matrix must define review commands');

const ids = new Set();
for (const trace of traceability.traces) {
  assert(typeof trace.id === 'string' && trace.id.length > 0, 'trace must define id');
  assert(!ids.has(trace.id), `duplicate traceability id ${trace.id}`);
  ids.add(trace.id);
  assert(typeof trace.claim === 'string' && trace.claim.length > 0, `trace ${trace.id} must define claim`);
  assert(Array.isArray(trace.audiences) && trace.audiences.length >= 1, `trace ${trace.id} must define audiences`);
  assert(Array.isArray(trace.strongest_surfaces) && trace.strongest_surfaces.length >= 1, `trace ${trace.id} must define strongest_surfaces`);
  assert(Array.isArray(trace.supporting_surfaces) && trace.supporting_surfaces.length >= 1, `trace ${trace.id} must define supporting_surfaces`);
  assert(Array.isArray(trace.verify_commands) && trace.verify_commands.length >= 1, `trace ${trace.id} must define verify_commands`);

  for (const audience of trace.audiences) {
    assert(allowedAudiences.has(audience), `trace ${trace.id} has unsupported audience ${audience}`);
  }

  for (const relativePath of [...trace.strongest_surfaces, ...trace.supporting_surfaces]) {
    assert(exists(relativePath), `trace ${trace.id} references missing file ${relativePath}`);
  }

  for (const command of trace.verify_commands) {
    assert(packageScripts.has(command), `trace ${trace.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required trace missing: ${requiredId}`);
}

for (const command of traceability.review_commands) {
  assert(packageScripts.has(command), `traceability matrix references unknown review command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const releaseEvidence = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const verification = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const faq = fs.readFileSync(path.join(repoRoot, 'docs', 'faq.md'), 'utf8');
const evaluationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'evaluation-packet.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'README.md must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(readme.includes('docs/traceability.md'), 'README.md must mention docs/traceability.md');
assert(quickstart.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'QUICKSTART.md must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(publicIndex.includes('traceability.md'), 'public contract index must mention docs/traceability.md');
assert(publicIndex.includes('../PUBLIC_TRACEABILITY_MATRIX.json'), 'public contract index must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(publicIndex.includes('../schemas/public-traceability-matrix.schema.json'), 'public contract index must mention public-traceability schema');
assert(reviewerGuide.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'reviewer guide must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(releaseEvidence.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'release-evidence doc must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(verification.includes('check:traceability'), 'verification doc must mention check:traceability');
assert(capabilityDoc.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'capability-matrix doc must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(faq.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'FAQ must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(evaluationDoc.includes('PUBLIC_TRACEABILITY_MATRIX.json'), 'evaluation-packet doc must mention PUBLIC_TRACEABILITY_MATRIX.json');
assert(evaluationDoc.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'evaluation-packet doc must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(evaluationDoc.includes('PUBLIC_ASSURANCE_CASE.json'), 'evaluation-packet doc must mention PUBLIC_ASSURANCE_CASE.json');
assert(evaluationDoc.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'evaluation-packet doc must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(evaluationDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'evaluation-packet doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(evaluationDoc.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'evaluation-packet doc must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(evaluationDoc.includes('PUBLIC_OWNERSHIP_MAP.json'), 'evaluation-packet doc must mention PUBLIC_OWNERSHIP_MAP.json');
const traceabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'traceability.md'), 'utf8');
assert(traceabilityDoc.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'traceability doc must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(traceabilityDoc.includes('PUBLIC_ASSURANCE_CASE.json'), 'traceability doc must mention PUBLIC_ASSURANCE_CASE.json');
assert(traceabilityDoc.includes('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'traceability doc must mention PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(traceabilityDoc.includes('PUBLIC_LIMITATIONS_REGISTER.json'), 'traceability doc must mention PUBLIC_LIMITATIONS_REGISTER.json');
assert(traceabilityDoc.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'traceability doc must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(schemasReadme.includes('public-traceability-matrix.schema.json'), 'schemas README must mention public-traceability schema');

assert(catalogPaths.has('docs/traceability.md'), 'contract catalog must include docs/traceability.md');
assert(catalogPaths.has('PUBLIC_TRACEABILITY_MATRIX.json'), 'contract catalog must include PUBLIC_TRACEABILITY_MATRIX.json');
assert(catalogPaths.has('schemas/public-traceability-matrix.schema.json'), 'contract catalog must include public-traceability schema');
assert(catalogPaths.has('scripts/check-traceability-matrix.js'), 'contract catalog must include traceability verifier');
assert(catalogPaths.has('PUBLIC_ASSURANCE_CASE.json'), 'contract catalog must include PUBLIC_ASSURANCE_CASE.json');
assert(catalogPaths.has('PUBLIC_UPDATE_COHERENCE_MAP.json'), 'contract catalog must include PUBLIC_UPDATE_COHERENCE_MAP.json');
assert(catalogPaths.has('PUBLIC_LIMITATIONS_REGISTER.json'), 'contract catalog must include PUBLIC_LIMITATIONS_REGISTER.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_TIMELINE.json'), 'contract catalog must include PUBLIC_EVIDENCE_TIMELINE.json');
assert(catalogPaths.has('docs/evidence-timeline.md'), 'contract catalog must include docs/evidence-timeline.md');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked traceability matrix, ${traceability.traces.length} traces, and ${catalog.entries.length} catalog entries`);
