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
  'release-evidence.md',
  '../PUBLIC_RELEASE_METADATA.json',
  'route-reference.md',
  'integration-guide.md'
];

for (const needle of expectedPublicIndexLinks) {
  assert(publicIndex.includes(needle), `docs/public-contract-index.md must reference ${needle}`);
}

assert(readme.includes('PUBLIC_CONTRACT_CATALOG.json'), 'README.md must mention PUBLIC_CONTRACT_CATALOG.json');
assert(readme.includes('PUBLIC_RELEASE_METADATA.json'), 'README.md must mention PUBLIC_RELEASE_METADATA.json');
assert(readme.includes('NOTICE'), 'README.md must mention NOTICE');
assert(readme.includes('npm run verify:repo'), 'README.md must mention npm run verify:repo');
assert(releaseReview.includes('check-contract-catalog.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-contract-catalog.js');
assert(releaseReview.includes('check-release-metadata.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-release-metadata.js');
assert(verificationDoc.includes('check:surface'), 'docs/verification.md must explain check:surface');
assert(verificationDoc.includes('check:release'), 'docs/verification.md must explain check:release');
assert(releaseEvidenceDoc.includes('PUBLIC_RELEASE_METADATA.json'), 'docs/release-evidence.md must mention PUBLIC_RELEASE_METADATA.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked surface coherence for ${catalog.entries.length} catalog entries and ${packageScripts.size} package scripts`);
