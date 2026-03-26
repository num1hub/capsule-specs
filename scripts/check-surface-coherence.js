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
  'reviewer-guide.md',
  '../PUBLIC_PROJECT_PROFILE.json',
  'release-evidence.md',
  '../PUBLIC_RELEASE_METADATA.json',
  'route-reference.md',
  'integration-guide.md',
  '../schemas/validator-api-envelopes.schema.json',
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
assert(readme.includes('schemas/validator-api-envelopes.schema.json'), 'README.md must mention schemas/validator-api-envelopes.schema.json');
assert(readme.includes('docs/community-health.md'), 'README.md must mention docs/community-health.md');
assert(readme.includes('docs/reviewer-guide.md'), 'README.md must mention docs/reviewer-guide.md');
assert(readme.includes('NOTICE'), 'README.md must mention NOTICE');
assert(readme.includes('examples/client/'), 'README.md must mention examples/client/');
assert(readme.includes('npm run verify:repo'), 'README.md must mention npm run verify:repo');
assert(releaseReview.includes('check-contract-catalog.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-contract-catalog.js');
assert(releaseReview.includes('check-release-metadata.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-release-metadata.js');
assert(releaseReview.includes('check-api-schemas.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-api-schemas.js');
assert(releaseReview.includes('check-client-recipes.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-client-recipes.js');
assert(releaseReview.includes('check-community-health.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-community-health.js');
assert(releaseReview.includes('check-project-profile.js'), 'PUBLIC_RELEASE_REVIEW.md must mention check-project-profile.js');
assert(verificationDoc.includes('check:surface'), 'docs/verification.md must explain check:surface');
assert(verificationDoc.includes('check:release'), 'docs/verification.md must explain check:release');
assert(verificationDoc.includes('check:api-schemas'), 'docs/verification.md must explain check:api-schemas');
assert(verificationDoc.includes('check:client-recipes'), 'docs/verification.md must explain check:client-recipes');
assert(verificationDoc.includes('check:community-health'), 'docs/verification.md must explain check:community-health');
assert(verificationDoc.includes('check:project-profile'), 'docs/verification.md must explain check:project-profile');
assert(releaseEvidenceDoc.includes('PUBLIC_RELEASE_METADATA.json'), 'docs/release-evidence.md must mention PUBLIC_RELEASE_METADATA.json');
assert(releaseEvidenceDoc.includes('validator-api-envelopes.schema.json'), 'docs/release-evidence.md must mention validator-api-envelopes.schema.json');
assert(releaseEvidenceDoc.includes('community-health'), 'docs/release-evidence.md must mention community-health');
assert(releaseEvidenceDoc.includes('PUBLIC_PROJECT_PROFILE.json'), 'docs/release-evidence.md must mention PUBLIC_PROJECT_PROFILE.json');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked surface coherence for ${catalog.entries.length} catalog entries and ${packageScripts.size} package scripts`);
