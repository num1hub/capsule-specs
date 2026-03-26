#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(repoRoot, 'SOURCE_MANIFEST.json');
const metadataPath = path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json');
const packagePath = path.join(repoRoot, 'package.json');
const catalogPath = path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json');

const ignoredPrefixes = ['.git/'];
const ignoredFiles = new Set(['.codexignore']);

function shouldIgnore(relativePath) {
  if (ignoredFiles.has(relativePath)) return true;
  return ignoredPrefixes.some((prefix) => relativePath.startsWith(prefix));
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(repoRoot, absolutePath).replaceAll(path.sep, '/');
    if (shouldIgnore(relativePath)) continue;
    if (entry.isDirectory()) {
      files.push(...walk(absolutePath));
    } else {
      files.push(relativePath);
    }
  }
  return files;
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const files = walk(repoRoot).sort();
const packageScripts = new Set(Object.keys(pkg.scripts || {}).map((name) => `npm run ${name}`));
const topLevelExampleCapsules = fs
  .readdirSync(path.join(repoRoot, 'examples'))
  .filter((name) => name.endsWith('.capsule.json')).length;
const apiJsonFiles = fs
  .readdirSync(path.join(repoRoot, 'examples', 'api'))
  .filter((name) => name.endsWith('.json')).length;
const markdownFiles = files.filter((file) => file.endsWith('.md')).length;

assert(metadata.version === pkg.version, 'release metadata version must match package.json version');
assert(metadata.catalog_version === catalog.catalog_version, 'release metadata catalog_version must match catalog_version');
assert(metadata.license === pkg.license, 'release metadata license must match package.json license');
assert(typeof metadata.notice_file === 'string' && fs.existsSync(path.join(repoRoot, metadata.notice_file)), 'release metadata notice_file must exist');
assert(metadata.notice_file === 'NOTICE', 'release metadata notice_file should point to NOTICE');

assert(metadata.manifest_coverage?.files === files.length, 'release metadata manifest file count must match actual file count');
assert(
  metadata.manifest_coverage?.manifest_entries === Object.keys(manifest).length,
  'release metadata manifest entry count must match SOURCE_MANIFEST size'
);

assert(
  metadata.surface_summary?.catalog_entries === catalog.entries.length,
  'release metadata catalog entry count must match PUBLIC_CONTRACT_CATALOG size'
);
assert(
  metadata.surface_summary?.example_capsules === topLevelExampleCapsules,
  'release metadata example capsule count must match top-level example capsule files'
);
assert(
  metadata.surface_summary?.api_example_files === apiJsonFiles,
  'release metadata API example count must match examples/api JSON files'
);
assert(
  metadata.surface_summary?.markdown_files === markdownFiles,
  'release metadata markdown file count must match repository Markdown files'
);

assert(Array.isArray(metadata.repo_local_checks) && metadata.repo_local_checks.length >= 1, 'release metadata must define repo_local_checks');
for (const check of metadata.repo_local_checks || []) {
  assert(check.status === 'pass', `release metadata check ${check.command} must be pass`);
  assert(packageScripts.has(check.command), `release metadata references unknown package script ${check.command}`);
}

assert(Array.isArray(metadata.upstream_validator_checks) && metadata.upstream_validator_checks.length >= 1, 'release metadata must define upstream_validator_checks');
assert(
  metadata.upstream_validator_checks.some((check) => check.path === 'examples/example-project-hub.capsule.json'),
  'release metadata must include the graph-linked hub validator check'
);
assert(
  metadata.upstream_validator_checks.some((check) => check.status === 'expected_fail' && check.gate === 'G16'),
  'release metadata must include the expected G16 negative-path validator check'
);

assert(Array.isArray(metadata.residual_risks) && metadata.residual_risks.length >= 1, 'release metadata must include residual risks');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked release metadata for ${files.length} files, ${catalog.entries.length} catalog entries, and ${markdownFiles} Markdown files`);
