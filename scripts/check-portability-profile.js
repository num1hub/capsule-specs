#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PORTABILITY_PROFILE.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-portability-profile.schema.json'), 'utf8'));
const archiveSchema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'archive-bundle.schema.json'), 'utf8'));
const archiveExample = JSON.parse(fs.readFileSync(path.join(repoRoot, 'examples', 'archive', 'archive-bundle.sample.json'), 'utf8'));

const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));

const allowedCompression = new Set(['none', 'gzip', 'zstd']);
const allowedEncryption = new Set(['none', 'age', 'kms-envelope']);
const allowedTenantScope = new Set(['single-tenant', 'multi-tenant', 'regional']);
const allowedContentClass = new Set(['capsules', 'activity', 'artifacts', 'audit']);
const allowedReplayMode = new Set(['dry-run', 'validate-only', 'merge', 'replace']);
const allowedDuplicateStrategy = new Set(['skip', 'reject', 'version']);

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

assert(profile.version === pkg.version, 'portability profile version must match package.json version');
assert(schema.$id === 'https://github.com/num1hub/capsule-specs/schemas/public-portability-profile.schema.json', 'portability profile schema must declare expected public $id');
assert(archiveSchema.$id === 'https://github.com/num1hub/capsule-specs/schemas/archive-bundle.schema.json', 'archive-bundle schema must declare expected public $id');

assert(Array.isArray(profile.principles) && profile.principles.length >= 3, 'portability profile must define principles');
assert(Array.isArray(profile.trust_requirements) && profile.trust_requirements.length >= 3, 'portability profile must define trust requirements');
assert(Array.isArray(profile.lifecycle_posture) && profile.lifecycle_posture.length >= 2, 'portability profile must define lifecycle posture');
assert(Array.isArray(profile.non_promises) && profile.non_promises.length >= 2, 'portability profile must define non_promises');
assert(Array.isArray(profile.verify_commands) && profile.verify_commands.length >= 1, 'portability profile must define verify commands');

for (const relativePath of Object.values(profile.public_surfaces || {})) {
  assert(typeof relativePath === 'string' && relativePath.length > 0, 'public portability surfaces must be non-empty strings');
  assert(exists(relativePath), `portability profile references missing file ${relativePath}`);
}

for (const command of profile.verify_commands) {
  assert(packageScripts.has(command), `portability profile references unknown verify command ${command}`);
}

assert(typeof archiveExample.bundleId === 'string' && archiveExample.bundleId.length > 0, 'archive example must define bundleId');
assert(typeof archiveExample.sourcePolicyId === 'string' && archiveExample.sourcePolicyId.length > 0, 'archive example must define sourcePolicyId');
assert(typeof archiveExample.createdAt === 'string' && archiveExample.createdAt.length > 0, 'archive example must define createdAt');
assert(allowedTenantScope.has(archiveExample.tenantScope), 'archive example must use an allowed tenantScope');
assert(allowedCompression.has(archiveExample.compression), 'archive example must use an allowed compression');
assert(allowedEncryption.has(archiveExample.encryption), 'archive example must use an allowed encryption');
assert(Array.isArray(archiveExample.manifest) && archiveExample.manifest.length >= 1, 'archive example must define manifest entries');
assert(allowedReplayMode.has(archiveExample.replay?.replayMode), 'archive example must define an allowed replayMode');
assert(allowedDuplicateStrategy.has(archiveExample.replay?.duplicateStrategy), 'archive example must define an allowed duplicateStrategy');
assert(archiveExample.replay?.validatorRequired === true, 'archive example must require validator replay');
assert(archiveExample.replay?.tenantBoundaryRequired === true, 'archive example must require tenant-boundary checks');
assert(archiveExample.replay?.policyPackRequired === true, 'archive example must require policy-pack checks');

for (const entry of archiveExample.manifest) {
  assert(typeof entry.entryId === 'string' && entry.entryId.length > 0, 'archive manifest entry must define entryId');
  assert(allowedContentClass.has(entry.contentClass), `archive manifest entry ${entry.entryId} must use allowed contentClass`);
  assert(typeof entry.sha256 === 'string' && /^[a-f0-9]{64}$/.test(entry.sha256), `archive manifest entry ${entry.entryId} must use 64-char lowercase hex sha256`);
  assert(Number.isInteger(entry.bytes) && entry.bytes >= 0, `archive manifest entry ${entry.entryId} must use non-negative integer bytes`);
  assert(typeof entry.tenantScoped === 'boolean', `archive manifest entry ${entry.entryId} must define tenantScoped`);
  assert(typeof entry.redacted === 'boolean', `archive manifest entry ${entry.entryId} must define redacted`);
}

const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
const quickstart = fs.readFileSync(path.join(repoRoot, 'QUICKSTART.md'), 'utf8');
const publicIndex = fs.readFileSync(path.join(repoRoot, 'docs', 'public-contract-index.md'), 'utf8');
const reviewerGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'reviewer-guide.md'), 'utf8');
const trustModel = fs.readFileSync(path.join(repoRoot, 'docs', 'trust-model.md'), 'utf8');
const examplesDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'examples.md'), 'utf8');
const schemasReadme = fs.readFileSync(path.join(repoRoot, 'schemas', 'README.md'), 'utf8');

assert(readme.includes('PUBLIC_PORTABILITY_PROFILE.json'), 'README.md must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(readme.includes('docs/portability.md'), 'README.md must mention docs/portability.md');
assert(readme.includes('docs/archive-bundles.md'), 'README.md must mention docs/archive-bundles.md');
assert(quickstart.includes('PUBLIC_PORTABILITY_PROFILE.json'), 'QUICKSTART.md must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(publicIndex.includes('portability.md'), 'public contract index must mention portability.md');
assert(publicIndex.includes('archive-bundles.md'), 'public contract index must mention archive-bundles.md');
assert(publicIndex.includes('../PUBLIC_PORTABILITY_PROFILE.json'), 'public contract index must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(publicIndex.includes('../schemas/archive-bundle.schema.json'), 'public contract index must mention schemas/archive-bundle.schema.json');
assert(publicIndex.includes('../schemas/public-portability-profile.schema.json'), 'public contract index must mention schemas/public-portability-profile.schema.json');
assert(reviewerGuide.includes('PUBLIC_PORTABILITY_PROFILE.json'), 'reviewer guide must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(trustModel.includes('PUBLIC_PORTABILITY_PROFILE.json'), 'trust-model doc must mention PUBLIC_PORTABILITY_PROFILE.json');
assert(examplesDoc.includes('examples/archive/'), 'examples doc must mention examples/archive/');
assert(schemasReadme.includes('archive-bundle.schema.json'), 'schemas README must mention archive-bundle.schema.json');
assert(schemasReadme.includes('public-portability-profile.schema.json'), 'schemas README must mention public-portability-profile.schema.json');

assert(catalogPaths.has('docs/portability.md'), 'contract catalog must include docs/portability.md');
assert(catalogPaths.has('docs/archive-bundles.md'), 'contract catalog must include docs/archive-bundles.md');
assert(catalogPaths.has('schemas/archive-bundle.schema.json'), 'contract catalog must include schemas/archive-bundle.schema.json');
assert(catalogPaths.has('examples/archive/archive-bundle.sample.json'), 'contract catalog must include archive bundle sample');
assert(catalogPaths.has('PUBLIC_PORTABILITY_PROFILE.json'), 'contract catalog must include PUBLIC_PORTABILITY_PROFILE.json');
assert(catalogPaths.has('schemas/public-portability-profile.schema.json'), 'contract catalog must include portability profile schema');
assert(catalogPaths.has('scripts/check-portability-profile.js'), 'contract catalog must include portability verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked portability profile, archive schema, and ${archiveExample.manifest.length} archive manifest entries`);
