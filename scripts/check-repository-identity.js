#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const identity = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_REPOSITORY_IDENTITY.json'), 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'schemas', 'public-repository-identity.schema.json'), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const profile = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PROJECT_PROFILE.json'), 'utf8'));
const evaluationPacket = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_EVALUATION_PACKET.json'), 'utf8'));
const releaseMetadata = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json'), 'utf8'));
const publicationReadiness = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_PUBLICATION_READINESS.json'), 'utf8'));
const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json'), 'utf8'));

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function normalizeRemoteUrl(remoteUrl) {
  const trimmed = remoteUrl.trim();
  if (trimmed.length === 0) return trimmed;

  let normalized = trimmed;

  if (normalized.startsWith('git@github.com:')) {
    normalized = `https://github.com/${normalized.slice('git@github.com:'.length)}`;
  } else if (normalized.startsWith('ssh://git@github.com/')) {
    normalized = `https://github.com/${normalized.slice('ssh://git@github.com/'.length)}`;
  }

  try {
    const parsed = new URL(normalized);
    if (parsed.hostname === 'github.com') {
      normalized = `https://github.com${parsed.pathname}`;
    }
  } catch {
    return normalized.replace(/\/+$/, '').replace(/\.git$/, '');
  }

  return normalized.replace(/\/+$/, '').replace(/\.git$/, '');
}

function walkJson(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) return walkJson(absolute);
      return entry.name.endsWith('.json') ? [absolute] : [];
    });
}

function collectUriStrings(value, found = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectUriStrings(item, found);
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (key === 'uri' && typeof child === 'string') found.push(child);
      collectUriStrings(child, found);
    }
  }
  return found;
}

const canonicalRepoUrl = 'https://github.com/num1hub/capsule-specs';
const canonicalGitUrl = `${canonicalRepoUrl}.git`;
const normalizedCanonicalRemote = normalizeRemoteUrl(canonicalGitUrl);
const canonicalSchemaBase = `${canonicalRepoUrl}/schemas/`;
const catalogPaths = new Set(catalog.entries.map((entry) => entry.path));

assert(identity.version === pkg.version, 'repository identity version must match package.json version');
assert(
  schema.$id === `${canonicalSchemaBase}public-repository-identity.schema.json`,
  'repository identity schema must declare expected public $id'
);

assert(identity.repository?.owner === 'num1hub', 'repository identity owner must be num1hub');
assert(identity.repository?.name === 'capsule-specs', 'repository identity name must be capsule-specs');
assert(identity.repository?.slug === 'num1hub/capsule-specs', 'repository identity slug must be num1hub/capsule-specs');
assert(identity.repository?.canonical_repo_url === canonicalRepoUrl, 'repository identity canonical_repo_url must match the public GitHub repo');
assert(identity.repository?.canonical_git_https === canonicalGitUrl, 'repository identity canonical_git_https must match the public GitHub remote');
assert(identity.repository?.project_homepage === 'https://n1hub.com', 'repository identity project_homepage must point to n1hub.com');
assert(identity.repository?.default_branch === 'main', 'repository identity default_branch must be main');
assert(identity.repository?.visibility === 'public', 'repository identity visibility must be public');

assert(identity.package?.name === pkg.name, 'repository identity package name must match package.json');
assert(identity.package?.version === pkg.version, 'repository identity package version must match package.json');
assert(identity.package?.license === pkg.license, 'repository identity package license must match package.json');

assert(identity.release?.latest_tag === 'v0.1.0', 'repository identity latest_tag must be v0.1.0');
assert(
  identity.release?.latest_release_url === `${canonicalRepoUrl}/releases/tag/v0.1.0`,
  'repository identity latest_release_url must match the published release URL'
);

assert(pkg.repository?.url === canonicalGitUrl, 'package.json repository.url must match canonical git URL');
assert(pkg.homepage === canonicalRepoUrl, 'package.json homepage must match canonical repo URL');
assert(pkg.bugs?.url === `${canonicalRepoUrl}/issues`, 'package.json bugs.url must match canonical issues URL');

const remoteOrigin = cp.execSync('git remote get-url origin', { cwd: repoRoot, encoding: 'utf8' }).trim();
assert(
  normalizeRemoteUrl(remoteOrigin) === normalizedCanonicalRemote,
  'git origin URL must match the canonical repository identity after normalizing equivalent GitHub remote forms'
);

assert(profile.repository_identity?.owner === 'num1hub', 'project profile owner must be num1hub');
assert(profile.repository_identity?.name === 'capsule-specs', 'project profile repo name must be capsule-specs');
assert(profile.repository_identity?.package_name === pkg.name, 'project profile package name must match package.json');
assert(profile.repository_identity?.homepage === canonicalRepoUrl, 'project profile homepage must match canonical repo URL');

assert(evaluationPacket.repository_identity?.owner === 'num1hub', 'evaluation packet owner must be num1hub');
assert(evaluationPacket.repository_identity?.name === 'capsule-specs', 'evaluation packet name must be capsule-specs');
assert(evaluationPacket.repository_identity?.homepage === canonicalRepoUrl, 'evaluation packet homepage must match canonical repo URL');

assert(
  releaseMetadata.repo_local_checks.some((check) => check.command === 'npm run check:repository-identity'),
  'release metadata must include repository-identity verification'
);
assert(
  releaseMetadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_REPOSITORY_IDENTITY.json')),
  'release metadata residual risks must mention PUBLIC_REPOSITORY_IDENTITY.json'
);
assert(
  publicationReadiness.readiness_families.some((family) => Array.isArray(family.strongest_current_surfaces) && family.strongest_current_surfaces.includes('PUBLIC_REPOSITORY_IDENTITY.json')),
  'publication readiness must include PUBLIC_REPOSITORY_IDENTITY.json in at least one strongest_current_surfaces list'
);
assert(
  Array.isArray(publicationReadiness.non_claims) &&
    publicationReadiness.non_claims.every((claim) => !claim.includes('does not claim that the repo has already been published')),
  'publication readiness non-claims must no longer describe the repo as unpublished'
);

for (const schemaPath of fs.readdirSync(path.join(repoRoot, 'schemas')).filter((name) => name.endsWith('.json'))) {
  const fullPath = path.join(repoRoot, 'schemas', schemaPath);
  const parsed = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  assert(parsed.$id === `${canonicalSchemaBase}${schemaPath}`, `schema ${schemaPath} must declare the canonical public $id`);
}

const exampleUris = walkJson(path.join(repoRoot, 'examples'))
  .flatMap((jsonPath) => collectUriStrings(JSON.parse(fs.readFileSync(jsonPath, 'utf8'))))
  .filter((uri) => uri.startsWith('https://github.com/'));

assert(exampleUris.length >= 5, 'repository identity must find GitHub-backed example URIs');
for (const uri of exampleUris) {
  assert(uri.startsWith(`${canonicalRepoUrl}/`), `example URI must start with canonical repo URL: ${uri}`);
}

const readme = readText('README.md');
const reviewerGuide = readText('docs/reviewer-guide.md');
const contractIndex = readText('docs/public-contract-index.md');
const verificationDoc = readText('docs/verification.md');
const publicationDoc = readText('docs/publication-readiness.md');

assert(readme.includes('PUBLIC_REPOSITORY_IDENTITY.json'), 'README.md must mention PUBLIC_REPOSITORY_IDENTITY.json');
assert(readme.includes('docs/repository-identity.md'), 'README.md must mention docs/repository-identity.md');
assert(reviewerGuide.includes('PUBLIC_REPOSITORY_IDENTITY.json'), 'reviewer guide must mention PUBLIC_REPOSITORY_IDENTITY.json');
assert(contractIndex.includes('repository-identity.md'), 'public contract index must mention docs/repository-identity.md');
assert(contractIndex.includes('../PUBLIC_REPOSITORY_IDENTITY.json'), 'public contract index must mention PUBLIC_REPOSITORY_IDENTITY.json');
assert(contractIndex.includes('../schemas/public-repository-identity.schema.json'), 'public contract index must mention the repository-identity schema');
assert(verificationDoc.includes('check:repository-identity'), 'verification doc must mention check:repository-identity');
assert(publicationDoc.includes('PUBLIC_REPOSITORY_IDENTITY.json'), 'publication-readiness doc must mention PUBLIC_REPOSITORY_IDENTITY.json');

assert(catalogPaths.has('docs/repository-identity.md'), 'contract catalog must include docs/repository-identity.md');
assert(catalogPaths.has('PUBLIC_REPOSITORY_IDENTITY.json'), 'contract catalog must include PUBLIC_REPOSITORY_IDENTITY.json');
assert(catalogPaths.has('schemas/public-repository-identity.schema.json'), 'contract catalog must include public-repository-identity schema');
assert(catalogPaths.has('scripts/check-repository-identity.js'), 'contract catalog must include repository-identity verifier');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked repository identity, ${exampleUris.length} example URIs, and ${catalog.entries.length} catalog entries`);
