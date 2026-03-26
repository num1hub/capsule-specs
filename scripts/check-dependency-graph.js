#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const graph = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_DEPENDENCY_GRAPH.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-dependency-graph.schema.json'), 'utf8'));

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

assert(graph.version === pkg.version, 'dependency graph version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-dependency-graph.schema.json', 'dependency-graph schema must declare expected public $id');
assert(Array.isArray(graph.nodes) && graph.nodes.length >= 8, 'dependency graph must define nodes');
assert(Array.isArray(graph.reading_paths) && graph.reading_paths.length >= 3, 'dependency graph must define reading paths');
assert(Array.isArray(graph.non_claims) && graph.non_claims.length >= 2, 'dependency graph must define non-claims');
assert(Array.isArray(graph.review_commands) && graph.review_commands.length >= 1, 'dependency graph must define review commands');

const ids = new Set();
for (const node of graph.nodes) {
  assert(typeof node.id === 'string' && node.id.length > 0, 'dependency node must define id');
  assert(!ids.has(node.id), `duplicate dependency node ${node.id}`);
  ids.add(node.id);
  assert(typeof node.path === 'string' && node.path.length > 0, `dependency node ${node.id} must define path`);
  assert(exists(node.path), `dependency node ${node.id} references missing file ${node.path}`);
  assert(typeof node.role === 'string' && node.role.length > 0, `dependency node ${node.id} must define role`);
  assert(Array.isArray(node.depends_on), `dependency node ${node.id} must define depends_on`);
  assert(Array.isArray(node.verify_commands) && node.verify_commands.length >= 1, `dependency node ${node.id} must define verify_commands`);
  for (const command of node.verify_commands) {
    assert(packageScripts.has(command), `dependency node ${node.id} references unknown command ${command}`);
  }
}

for (const node of graph.nodes) {
  for (const dep of node.depends_on) {
    assert(ids.has(dep), `dependency node ${node.id} references unknown dependency ${dep}`);
    assert(dep !== node.id, `dependency node ${node.id} cannot depend on itself`);
  }
}

for (const pathDef of graph.reading_paths) {
  assert(typeof pathDef.id === 'string' && pathDef.id.length > 0, 'reading path must define id');
  assert(typeof pathDef.audience === 'string' && pathDef.audience.length > 0, `reading path ${pathDef.id} must define audience`);
  assert(Array.isArray(pathDef.steps) && pathDef.steps.length >= 3, `reading path ${pathDef.id} must define steps`);
  for (const step of pathDef.steps) {
    assert(ids.has(step), `reading path ${pathDef.id} references unknown node ${step}`);
  }
}

assert(ids.has('maintenance-evolution'), 'dependency graph must include maintenance-evolution node');
assert(ids.has('review-scorecard'), 'dependency graph must include review-scorecard node');
assert(ids.has('verification-coverage'), 'dependency graph must include verification-coverage node');
assert(ids.has('audience-entry-paths'), 'dependency graph must include audience-entry-paths node');
assert(ids.has('evidence-strength'), 'dependency graph must include evidence-strength node');
assert(ids.has('adoption-readiness'), 'dependency graph must include adoption-readiness node');
assert(ids.has('freshness-and-staleness'), 'dependency graph must include freshness-and-staleness node');
assert(ids.has('ecosystem-value-and-program-fit'), 'dependency graph must include ecosystem-value-and-program-fit node');
assert(ids.has('public-evidence-gaps'), 'dependency graph must include public-evidence-gaps node');
assert(ids.has('public-program-fit'), 'dependency graph must include public-program-fit node');
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'reviewer-fast-path' && pathDef.steps.includes('maintenance-evolution')),
  'reviewer-fast-path must include maintenance-evolution'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'reviewer-fast-path' && pathDef.steps.includes('review-scorecard')),
  'reviewer-fast-path must include review-scorecard'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'reviewer-fast-path' && pathDef.steps.includes('verification-coverage')),
  'reviewer-fast-path must include verification-coverage'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'reviewer-fast-path' && pathDef.steps.includes('audience-entry-paths')),
  'reviewer-fast-path must include audience-entry-paths'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'reviewer-fast-path' && pathDef.steps.includes('evidence-strength')),
  'reviewer-fast-path must include evidence-strength'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'reviewer-fast-path' && pathDef.steps.includes('adoption-readiness')),
  'reviewer-fast-path must include adoption-readiness'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'reviewer-fast-path' && pathDef.steps.includes('freshness-and-staleness')),
  'reviewer-fast-path must include freshness-and-staleness'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'reviewer-fast-path' && pathDef.steps.includes('ecosystem-value-and-program-fit')),
  'reviewer-fast-path must include ecosystem-value-and-program-fit'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'reviewer-fast-path' && pathDef.steps.includes('public-evidence-gaps')),
  'reviewer-fast-path must include public-evidence-gaps'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'reviewer-fast-path' && pathDef.steps.includes('public-program-fit')),
  'reviewer-fast-path must include public-program-fit'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'contributor-governance-path' && pathDef.steps.includes('maintenance-evolution')),
  'contributor-governance-path must include maintenance-evolution'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'contributor-governance-path' && pathDef.steps.includes('review-scorecard')),
  'contributor-governance-path must include review-scorecard'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'contributor-governance-path' && pathDef.steps.includes('verification-coverage')),
  'contributor-governance-path must include verification-coverage'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'contributor-governance-path' && pathDef.steps.includes('audience-entry-paths')),
  'contributor-governance-path must include audience-entry-paths'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'contributor-governance-path' && pathDef.steps.includes('evidence-strength')),
  'contributor-governance-path must include evidence-strength'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'contributor-governance-path' && pathDef.steps.includes('adoption-readiness')),
  'contributor-governance-path must include adoption-readiness'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'contributor-governance-path' && pathDef.steps.includes('freshness-and-staleness')),
  'contributor-governance-path must include freshness-and-staleness'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'contributor-governance-path' && pathDef.steps.includes('ecosystem-value-and-program-fit')),
  'contributor-governance-path must include ecosystem-value-and-program-fit'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'contributor-governance-path' && pathDef.steps.includes('public-evidence-gaps')),
  'contributor-governance-path must include public-evidence-gaps'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'contributor-governance-path' && pathDef.steps.includes('public-program-fit')),
  'contributor-governance-path must include public-program-fit'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'integrator-contract-path' && pathDef.steps.includes('audience-entry-paths')),
  'integrator-contract-path must include audience-entry-paths'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'integrator-contract-path' && pathDef.steps.includes('evidence-strength')),
  'integrator-contract-path must include evidence-strength'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'integrator-contract-path' && pathDef.steps.includes('adoption-readiness')),
  'integrator-contract-path must include adoption-readiness'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'integrator-contract-path' && pathDef.steps.includes('freshness-and-staleness')),
  'integrator-contract-path must include freshness-and-staleness'
);
assert(
  graph.reading_paths.some((pathDef) => pathDef.id === 'integrator-contract-path' && pathDef.steps.includes('ecosystem-value-and-program-fit')),
  'integrator-contract-path must include ecosystem-value-and-program-fit'
);

for (const command of graph.review_commands) {
  assert(packageScripts.has(command), `dependency graph references unknown review command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const releaseEvidence = fs.readFileSync(path.join(repoRoot, 'docs', 'release-evidence.md'), 'utf8');
const verification = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const capabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'capability-matrix.md'), 'utf8');
const evaluationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'evaluation-packet.md'), 'utf8');
const traceabilityDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'traceability.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const faq = fs.readFileSync(path.join(repoRoot, 'docs', 'faq.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'README.md must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(readme.includes('docs/dependency-graph.md'), 'README.md must mention docs/dependency-graph.md');
assert(quickstart.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'QUICKSTART.md must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(reviewerGuide.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'reviewer guide must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(releaseEvidence.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'release-evidence doc must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(releaseEvidence.includes('PUBLIC_AUDIENCE_PATHS.json'), 'release-evidence doc must mention PUBLIC_AUDIENCE_PATHS.json');
assert(releaseEvidence.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'release-evidence doc must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(releaseEvidence.includes('PUBLIC_FRESHNESS_MODEL.json'), 'release-evidence doc must mention PUBLIC_FRESHNESS_MODEL.json');
assert(releaseEvidence.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'release-evidence doc must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(releaseEvidence.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'release-evidence doc must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(verification.includes('check:dependency-graph'), 'verification doc must mention check:dependency-graph');
assert(capabilityDoc.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'capability-matrix doc must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(evaluationDoc.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'evaluation-packet doc must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(traceabilityDoc.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'traceability doc must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(publicIndex.includes('dependency-graph.md'), 'public contract index must mention docs/dependency-graph.md');
assert(publicIndex.includes('../PUBLIC_DEPENDENCY_GRAPH.json'), 'public contract index must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(publicIndex.includes('../schemas/public-dependency-graph.schema.json'), 'public contract index must mention public-dependency-graph schema');
assert(publicIndex.includes('freshness.md'), 'public contract index must mention docs/freshness.md');
assert(publicIndex.includes('../PUBLIC_FRESHNESS_MODEL.json'), 'public contract index must mention PUBLIC_FRESHNESS_MODEL.json');
assert(publicIndex.includes('../schemas/public-freshness-model.schema.json'), 'public contract index must mention public-freshness-model schema');
assert(publicIndex.includes('ecosystem-value.md'), 'public contract index must mention docs/ecosystem-value.md');
assert(publicIndex.includes('../PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'public contract index must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(publicIndex.includes('../schemas/public-ecosystem-value-map.schema.json'), 'public contract index must mention public-ecosystem-value schema');
assert(publicIndex.includes('evidence-gaps.md'), 'public contract index must mention docs/evidence-gaps.md');
assert(publicIndex.includes('../PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'public contract index must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(publicIndex.includes('../schemas/public-evidence-gaps-register.schema.json'), 'public contract index must mention public-evidence-gaps schema');
assert(publicIndex.includes('program-fit.md'), 'public contract index must mention docs/program-fit.md');
assert(publicIndex.includes('../PUBLIC_PROGRAM_FIT_MAP.json'), 'public contract index must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(publicIndex.includes('../schemas/public-program-fit-map.schema.json'), 'public contract index must mention public-program-fit schema');
assert(faq.includes('PUBLIC_DEPENDENCY_GRAPH.json'), 'FAQ must mention PUBLIC_DEPENDENCY_GRAPH.json');
assert(faq.includes('PUBLIC_AUDIENCE_PATHS.json'), 'FAQ must mention PUBLIC_AUDIENCE_PATHS.json');
assert(faq.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'FAQ must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(faq.includes('PUBLIC_FRESHNESS_MODEL.json'), 'FAQ must mention PUBLIC_FRESHNESS_MODEL.json');
assert(faq.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'FAQ must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(faq.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'FAQ must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(faq.includes('PUBLIC_PROGRAM_FIT_MAP.json'), 'FAQ must mention PUBLIC_PROGRAM_FIT_MAP.json');
assert(schemasReadme.includes('public-dependency-graph.schema.json'), 'schemas README must mention public-dependency-graph schema');
assert(schemasReadme.includes('public-freshness-model.schema.json'), 'schemas README must mention public-freshness-model schema');
assert(schemasReadme.includes('public-ecosystem-value-map.schema.json'), 'schemas README must mention public-ecosystem-value schema');
assert(schemasReadme.includes('public-evidence-gaps-register.schema.json'), 'schemas README must mention public-evidence-gaps schema');
assert(schemasReadme.includes('public-program-fit-map.schema.json'), 'schemas README must mention public-program-fit schema');

assert(catalogPaths.has('docs/dependency-graph.md'), 'contract catalog must include docs/dependency-graph.md');
assert(catalogPaths.has('PUBLIC_DEPENDENCY_GRAPH.json'), 'contract catalog must include PUBLIC_DEPENDENCY_GRAPH.json');
assert(catalogPaths.has('PUBLIC_AUDIENCE_PATHS.json'), 'contract catalog must include PUBLIC_AUDIENCE_PATHS.json');
assert(catalogPaths.has('PUBLIC_EVIDENCE_STRENGTH_MAP.json'), 'contract catalog must include PUBLIC_EVIDENCE_STRENGTH_MAP.json');
assert(catalogPaths.has('docs/freshness.md'), 'contract catalog must include docs/freshness.md');
assert(catalogPaths.has('PUBLIC_FRESHNESS_MODEL.json'), 'contract catalog must include PUBLIC_FRESHNESS_MODEL.json');
assert(catalogPaths.has('schemas/public-dependency-graph.schema.json'), 'contract catalog must include public-dependency-graph schema');
assert(catalogPaths.has('schemas/public-freshness-model.schema.json'), 'contract catalog must include public-freshness-model schema');
assert(catalogPaths.has('scripts/check-dependency-graph.js'), 'contract catalog must include dependency-graph verifier');
assert(catalogPaths.has('scripts/check-freshness.js'), 'contract catalog must include freshness verifier');
assert(catalogPaths.has('docs/ecosystem-value.md'), 'contract catalog must include docs/ecosystem-value.md');
assert(catalogPaths.has('PUBLIC_ECOSYSTEM_VALUE_MAP.json'), 'contract catalog must include PUBLIC_ECOSYSTEM_VALUE_MAP.json');
assert(catalogPaths.has('schemas/public-ecosystem-value-map.schema.json'), 'contract catalog must include public-ecosystem-value schema');
assert(catalogPaths.has('scripts/check-ecosystem-value.js'), 'contract catalog must include ecosystem-value verifier');
assert(catalogPaths.has('docs/evidence-gaps.md'), 'contract catalog must include docs/evidence-gaps.md');
assert(catalogPaths.has('PUBLIC_EVIDENCE_GAPS_REGISTER.json'), 'contract catalog must include PUBLIC_EVIDENCE_GAPS_REGISTER.json');
assert(catalogPaths.has('schemas/public-evidence-gaps-register.schema.json'), 'contract catalog must include public-evidence-gaps schema');
assert(catalogPaths.has('scripts/check-evidence-gaps.js'), 'contract catalog must include evidence-gaps verifier');
assert(catalogPaths.has('docs/program-fit.md'), 'contract catalog must include docs/program-fit.md');
assert(catalogPaths.has('PUBLIC_PROGRAM_FIT_MAP.json'), 'contract catalog must include PUBLIC_PROGRAM_FIT_MAP.json');
assert(catalogPaths.has('schemas/public-program-fit-map.schema.json'), 'contract catalog must include public-program-fit schema');
assert(catalogPaths.has('scripts/check-program-fit.js'), 'contract catalog must include program-fit verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked dependency graph, ${graph.nodes.length} nodes, ${graph.reading_paths.length} reading paths, and ${catalog.entries.length} catalog entries`);
