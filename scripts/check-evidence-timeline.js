#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const timeline = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_EVIDENCE_TIMELINE.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-evidence-timeline.schema.json'), 'utf8'));

const requiredIds = [
  'initial-open-core-projection',
  'verification-and-linked-examples',
  'api-and-release-reference',
  'community-health-and-intake',
  'reviewer-profile-and-capabilities',
  'projection-boundaries-and-readiness',
  'portability-and-archive-contracts',
  'failure-model-and-negative-evidence',
  'traceability-and-example-coverage',
  'maintenance-change-and-ownership',
  'dependency-graph-and-assurance',
  'update-coherence-and-limitations'
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

function commitExists(ref) {
  try {
    execSync(`git cat-file -e ${ref}^{commit}`, { cwd: repoRoot, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

assert(timeline.version === pkg.version, 'evidence timeline version must match package.json version');
assert(schema.$id === 'https://github.com/num1hub/capsule-specs/schemas/public-evidence-timeline.schema.json', 'evidence-timeline schema must declare expected public $id');
assert(typeof timeline.purpose === 'string' && timeline.purpose.length > 0, 'evidence timeline must define purpose');
assert(Array.isArray(timeline.milestones) && timeline.milestones.length >= requiredIds.length, 'evidence timeline must define expected milestone set');
assert(Array.isArray(timeline.review_commands) && timeline.review_commands.length >= 1, 'evidence timeline must define review commands');

const ids = new Set();
let expectedOrder = 1;
for (const milestone of timeline.milestones) {
  assert(typeof milestone.id === 'string' && milestone.id.length > 0, 'timeline milestone must define id');
  assert(!ids.has(milestone.id), `duplicate timeline milestone ${milestone.id}`);
  ids.add(milestone.id);
  assert(milestone.order === expectedOrder, `timeline milestone ${milestone.id} must use contiguous order ${expectedOrder}`);
  expectedOrder += 1;
  assert(typeof milestone.date === 'string' && milestone.date.length > 0, `timeline milestone ${milestone.id} must define date`);
  assert(typeof milestone.commit === 'string' && milestone.commit.length >= 7, `timeline milestone ${milestone.id} must define commit`);
  assert(commitExists(milestone.commit), `timeline milestone ${milestone.id} references missing git commit ${milestone.commit}`);
  assert(typeof milestone.title === 'string' && milestone.title.length > 0, `timeline milestone ${milestone.id} must define title`);
  assert(typeof milestone.focus === 'string' && milestone.focus.length > 0, `timeline milestone ${milestone.id} must define focus`);
  assert(typeof milestone.maintenance_signal === 'string' && milestone.maintenance_signal.length > 0, `timeline milestone ${milestone.id} must define maintenance_signal`);
  assert(Array.isArray(milestone.strongest_surfaces) && milestone.strongest_surfaces.length >= 1, `timeline milestone ${milestone.id} must define strongest_surfaces`);
  assert(Array.isArray(milestone.review_commands) && milestone.review_commands.length >= 1, `timeline milestone ${milestone.id} must define review_commands`);

  for (const relativePath of milestone.strongest_surfaces) {
    assert(exists(relativePath), `timeline milestone ${milestone.id} references missing file ${relativePath}`);
  }

  for (const command of milestone.review_commands) {
    assert(packageScripts.has(command), `timeline milestone ${milestone.id} references unknown command ${command}`);
  }
}

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required timeline milestone missing: ${requiredId}`);
}

for (const command of timeline.review_commands) {
  assert(packageScripts.has(command), `evidence timeline references unknown review command ${command}`);
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
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'README.md must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(readme.includes('docs/evidence-timeline.md'), 'README.md must mention docs/evidence-timeline.md');
assert(quickstart.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'QUICKSTART.md must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(reviewerGuide.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'reviewer guide must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(publicIndex.includes('evidence-timeline.md'), 'public contract index must mention docs/evidence-timeline.md');
assert(publicIndex.includes('../PUBLIC_EVIDENCE_TIMELINE.json'), 'public contract index must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(publicIndex.includes('../schemas/public-evidence-timeline.schema.json'), 'public contract index must mention public-evidence-timeline schema');
assert(evaluationDoc.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'evaluation packet doc must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(releaseEvidence.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'release-evidence doc must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(verification.includes('check:evidence-timeline'), 'verification doc must mention check:evidence-timeline');
assert(capabilityDoc.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'capability-matrix doc must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(faq.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'FAQ must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(traceabilityDoc.includes('PUBLIC_EVIDENCE_TIMELINE.json'), 'traceability doc must mention PUBLIC_EVIDENCE_TIMELINE.json');
assert(schemasReadme.includes('public-evidence-timeline.schema.json'), 'schemas README must mention public-evidence-timeline schema');

assert(catalogPaths.has('docs/evidence-timeline.md'), 'contract catalog must include docs/evidence-timeline.md');
assert(catalogPaths.has('PUBLIC_EVIDENCE_TIMELINE.json'), 'contract catalog must include PUBLIC_EVIDENCE_TIMELINE.json');
assert(catalogPaths.has('schemas/public-evidence-timeline.schema.json'), 'contract catalog must include public-evidence-timeline schema');
assert(catalogPaths.has('scripts/check-evidence-timeline.js'), 'contract catalog must include evidence-timeline verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked evidence timeline, ${timeline.milestones.length} milestones, and ${catalog.entries.length} catalog entries`);
