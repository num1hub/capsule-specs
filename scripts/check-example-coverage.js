#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const coverage = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_EXAMPLE_COVERAGE.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-example-coverage.schema.json'), 'utf8'));

const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));
const exampleDir = path.join(repoRoot, 'examples');
const apiDir = path.join(exampleDir, 'api');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

const actualCapsuleFiles = fs.readdirSync(exampleDir).filter((name) => name.endsWith('.capsule.json'));
const actualApiFiles = fs.readdirSync(apiDir).filter((name) => name.endsWith('.json'));

assert(coverage.version === pkg.version, 'example coverage version must match package.json version');
assert(schema.$id === 'https://github.com/n1hub/specs/schemas/public-example-coverage.schema.json', 'example coverage schema must declare expected public $id');
assert(coverage.summary?.capsule_examples === actualCapsuleFiles.length, 'example coverage capsule count must match actual top-level capsule examples');
assert(coverage.summary?.api_examples === actualApiFiles.length, 'example coverage API count must match actual API example files');
assert(coverage.summary?.positive_capsules === 4, 'example coverage positive_capsules must stay at 4');
assert(coverage.summary?.negative_capsules === 1, 'example coverage negative_capsules must stay at 1');
assert(coverage.summary?.graph_examples === 1, 'example coverage graph_examples must stay at 1');
assert(Array.isArray(coverage.capsule_examples) && coverage.capsule_examples.length === actualCapsuleFiles.length, 'example coverage must describe every top-level capsule example');
assert(Array.isArray(coverage.api_examples) && coverage.api_examples.length === actualApiFiles.length, 'example coverage must describe every API example file');
assert(Array.isArray(coverage.non_claims) && coverage.non_claims.length >= 2, 'example coverage must define non-claims');
assert(Array.isArray(coverage.review_commands) && coverage.review_commands.length >= 1, 'example coverage must define review commands');

const capsulePaths = new Set();
const capsuleIds = new Set();
for (const entry of coverage.capsule_examples) {
  assert(typeof entry.capsule_id === 'string' && entry.capsule_id.length > 0, 'capsule coverage entry must define capsule_id');
  assert(!capsuleIds.has(entry.capsule_id), `duplicate capsule coverage id ${entry.capsule_id}`);
  capsuleIds.add(entry.capsule_id);
  assert(typeof entry.path === 'string' && entry.path.length > 0, `capsule coverage ${entry.capsule_id} must define path`);
  assert(!capsulePaths.has(entry.path), `duplicate capsule coverage path ${entry.path}`);
  capsulePaths.add(entry.path);
  assert(exists(entry.path), `capsule coverage references missing file ${entry.path}`);
  assert(Array.isArray(entry.coverage_tags) && entry.coverage_tags.length >= 1, `capsule coverage ${entry.capsule_id} must define coverage_tags`);
  assert(Array.isArray(entry.related_api_examples), `capsule coverage ${entry.capsule_id} must define related_api_examples`);
  assert(Array.isArray(entry.verify_commands) && entry.verify_commands.length >= 1, `capsule coverage ${entry.capsule_id} must define verify_commands`);
  for (const relatedPath of entry.related_api_examples) {
    assert(exists(relatedPath), `capsule coverage ${entry.capsule_id} references missing API example ${relatedPath}`);
  }
  for (const command of entry.verify_commands) {
    assert(packageScripts.has(command), `capsule coverage ${entry.capsule_id} references unknown command ${command}`);
  }
}

const apiPaths = new Set();
for (const entry of coverage.api_examples) {
  assert(typeof entry.path === 'string' && entry.path.length > 0, 'API coverage entry must define path');
  assert(!apiPaths.has(entry.path), `duplicate API coverage path ${entry.path}`);
  apiPaths.add(entry.path);
  assert(exists(entry.path), `API coverage references missing file ${entry.path}`);
  assert(typeof entry.route === 'string' && entry.route.length > 0, `API coverage ${entry.path} must define route`);
  assert(typeof entry.example_kind === 'string' && entry.example_kind.length > 0, `API coverage ${entry.path} must define example_kind`);
  assert(Array.isArray(entry.coverage_tags) && entry.coverage_tags.length >= 1, `API coverage ${entry.path} must define coverage_tags`);
  assert(Array.isArray(entry.related_capsule_ids), `API coverage ${entry.path} must define related_capsule_ids`);
  assert(Array.isArray(entry.verify_commands) && entry.verify_commands.length >= 1, `API coverage ${entry.path} must define verify_commands`);
  for (const capsuleId of entry.related_capsule_ids) {
    assert(capsuleIds.has(capsuleId), `API coverage ${entry.path} references unknown capsule_id ${capsuleId}`);
  }
  for (const command of entry.verify_commands) {
    assert(packageScripts.has(command), `API coverage ${entry.path} references unknown command ${command}`);
  }
}

for (const fileName of actualCapsuleFiles) {
  assert(capsulePaths.has(`examples/${fileName}`), `example coverage must include examples/${fileName}`);
}
for (const fileName of actualApiFiles) {
  assert(apiPaths.has(`examples/api/${fileName}`), `example coverage must include examples/api/${fileName}`);
}

for (const command of coverage.review_commands) {
  assert(packageScripts.has(command), `example coverage references unknown review command ${command}`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const examplesDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'examples.md'), 'utf8');
const routeReference = fs.readFileSync(path.join(repoRoot, 'docs', 'route-reference.md'), 'utf8');
const verificationDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'verification.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const examplesReadme = fs.readFileSync(path.join(repoRoot, 'examples', 'README.md'), 'utf8');
const apiExamplesReadme = fs.readFileSync(path.join(repoRoot, 'examples', 'api', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'README.md must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(readme.includes('docs/example-coverage.md'), 'README.md must mention docs/example-coverage.md');
assert(examplesDoc.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'docs/examples.md must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(routeReference.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'docs/route-reference.md must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(verificationDoc.includes('check:example-coverage'), 'docs/verification.md must mention check:example-coverage');
assert(publicIndex.includes('example-coverage.md'), 'public contract index must mention docs/example-coverage.md');
assert(publicIndex.includes('../PUBLIC_EXAMPLE_COVERAGE.json'), 'public contract index must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(publicIndex.includes('../schemas/public-example-coverage.schema.json'), 'public contract index must mention public-example-coverage schema');
assert(examplesReadme.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'examples README must mention PUBLIC_EXAMPLE_COVERAGE.json');
assert(apiExamplesReadme.includes('PUBLIC_EXAMPLE_COVERAGE.json'), 'API examples README must mention PUBLIC_EXAMPLE_COVERAGE.json');

assert(catalogPaths.has('docs/example-coverage.md'), 'contract catalog must include docs/example-coverage.md');
assert(catalogPaths.has('PUBLIC_EXAMPLE_COVERAGE.json'), 'contract catalog must include PUBLIC_EXAMPLE_COVERAGE.json');
assert(catalogPaths.has('schemas/public-example-coverage.schema.json'), 'contract catalog must include public-example-coverage schema');
assert(catalogPaths.has('scripts/check-example-coverage.js'), 'contract catalog must include example-coverage verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked example coverage for ${coverage.capsule_examples.length} capsule examples and ${coverage.api_examples.length} API examples`);
