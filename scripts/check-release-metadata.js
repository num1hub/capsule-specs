#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(repoRoot, 'SOURCE_MANIFEST.json');
const metadataPath = path.join(repoRoot, 'PUBLIC_RELEASE_METADATA.json');
const packagePath = path.join(repoRoot, 'package.json');
const catalogPath = path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json');

const ignoredPrefixes = ['.git/', 'node_modules/', 'dist/'];
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
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:api-schemas'),
  'release metadata must include the API schema verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:type-projections'),
  'release metadata must include the type-projection verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:package-surface'),
  'release metadata must include the package-surface verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:package-install'),
  'release metadata must include the package-install verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:raw-capsules'),
  'release metadata must include the raw-capsules verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:reference-pack'),
  'release metadata must include the reference-pack verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:schema-bundles'),
  'release metadata must include the schema-bundles verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:schema-recipes'),
  'release metadata must include the schema-recipes verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:invalid-examples'),
  'release metadata must include the invalid-examples verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:invalid-api-examples'),
  'release metadata must include the invalid-api-examples verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:example-coverage'),
  'release metadata must include the example-coverage verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:boundary-map'),
  'release metadata must include the boundary-map verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:evaluation-packet'),
  'release metadata must include the evaluation-packet verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:failure-model'),
  'release metadata must include the failure-model verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:traceability'),
  'release metadata must include the traceability verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:portability'),
  'release metadata must include the portability verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:community-health'),
  'release metadata must include the community-health verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:maintenance-model'),
  'release metadata must include the maintenance-model verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:change-control'),
  'release metadata must include the change-control verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:ownership-map'),
  'release metadata must include the ownership-map verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:dependency-graph'),
  'release metadata must include the dependency-graph verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:assurance-case'),
  'release metadata must include the assurance-case verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:update-coherence'),
  'release metadata must include the update-coherence verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:limitations-register'),
  'release metadata must include the limitations-register verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:evidence-timeline'),
  'release metadata must include the evidence-timeline verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:review-scorecard'),
  'release metadata must include the review-scorecard verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:verification-matrix'),
  'release metadata must include the verification-matrix verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:audience-paths'),
  'release metadata must include the audience-paths verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:evidence-strength'),
  'release metadata must include the evidence-strength verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:adoption-readiness'),
  'release metadata must include the adoption-readiness verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:freshness'),
  'release metadata must include the freshness verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:ecosystem-value'),
  'release metadata must include the ecosystem-value verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:evidence-gaps'),
  'release metadata must include the evidence-gaps verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:program-fit'),
  'release metadata must include the program-fit verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:publication-readiness'),
  'release metadata must include the publication-readiness verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:repository-identity'),
  'release metadata must include the repository-identity verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:project-profile'),
  'release metadata must include the project-profile verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:capability-matrix'),
  'release metadata must include the capability-matrix verification check'
);
assert(
  metadata.repo_local_checks.some((check) => check.command === 'npm run check:integrity-recipes'),
  'release metadata must include the integrity-recipes verification check'
);
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
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_BOUNDARY_MAP.json')),
  'release metadata residual risks must mention PUBLIC_BOUNDARY_MAP.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_EVALUATION_PACKET.json')),
  'release metadata residual risks must mention PUBLIC_EVALUATION_PACKET.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_FAILURE_MODEL.json')),
  'release metadata residual risks must mention PUBLIC_FAILURE_MODEL.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.toLowerCase().includes('schema')),
  'release metadata residual risks must mention the schema-validation convenience layer'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_EXAMPLE_COVERAGE.json')),
  'release metadata residual risks must mention PUBLIC_EXAMPLE_COVERAGE.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_MAINTENANCE_MODEL.json')),
  'release metadata residual risks must mention PUBLIC_MAINTENANCE_MODEL.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_CHANGE_CONTROL_MODEL.json')),
  'release metadata residual risks must mention PUBLIC_CHANGE_CONTROL_MODEL.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_OWNERSHIP_MAP.json')),
  'release metadata residual risks must mention PUBLIC_OWNERSHIP_MAP.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('curated raw capsule')),
  'release metadata residual risks must mention the curated raw capsule set'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('reference pack')),
  'release metadata residual risks must mention the compact reference pack'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_TRACEABILITY_MATRIX.json')),
  'release metadata residual risks must mention PUBLIC_TRACEABILITY_MATRIX.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_PORTABILITY_PROFILE.json')),
  'release metadata residual risks must mention PUBLIC_PORTABILITY_PROFILE.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('projections/typescript/capsule.ts')),
  'release metadata residual risks must mention the TypeScript projection layer'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('projections/typescript/validator-api.ts')),
  'release metadata residual risks must mention the validator API projection layer'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_DEPENDENCY_GRAPH.json')),
  'release metadata residual risks must mention PUBLIC_DEPENDENCY_GRAPH.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_ASSURANCE_CASE.json')),
  'release metadata residual risks must mention PUBLIC_ASSURANCE_CASE.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_REPOSITORY_IDENTITY.json')),
  'release metadata residual risks must mention PUBLIC_REPOSITORY_IDENTITY.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_UPDATE_COHERENCE_MAP.json')),
  'release metadata residual risks must mention PUBLIC_UPDATE_COHERENCE_MAP.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_LIMITATIONS_REGISTER.json')),
  'release metadata residual risks must mention PUBLIC_LIMITATIONS_REGISTER.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_EVIDENCE_TIMELINE.json')),
  'release metadata residual risks must mention PUBLIC_EVIDENCE_TIMELINE.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_REVIEW_SCORECARD.json')),
  'release metadata residual risks must mention PUBLIC_REVIEW_SCORECARD.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_VERIFICATION_MATRIX.json')),
  'release metadata residual risks must mention PUBLIC_VERIFICATION_MATRIX.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_AUDIENCE_PATHS.json')),
  'release metadata residual risks must mention PUBLIC_AUDIENCE_PATHS.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_EVIDENCE_STRENGTH_MAP.json')),
  'release metadata residual risks must mention PUBLIC_EVIDENCE_STRENGTH_MAP.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_ADOPTION_READINESS.json')),
  'release metadata residual risks must mention PUBLIC_ADOPTION_READINESS.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_FRESHNESS_MODEL.json')),
  'release metadata residual risks must mention PUBLIC_FRESHNESS_MODEL.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_ECOSYSTEM_VALUE_MAP.json')),
  'release metadata residual risks must mention PUBLIC_ECOSYSTEM_VALUE_MAP.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_EVIDENCE_GAPS_REGISTER.json')),
  'release metadata residual risks must mention PUBLIC_EVIDENCE_GAPS_REGISTER.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_PROGRAM_FIT_MAP.json')),
  'release metadata residual risks must mention PUBLIC_PROGRAM_FIT_MAP.json'
);
assert(
  metadata.residual_risks.some((risk) => typeof risk === 'string' && risk.includes('PUBLIC_PUBLICATION_READINESS.json')),
  'release metadata residual risks must mention PUBLIC_PUBLICATION_READINESS.json'
);

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked release metadata for ${files.length} files, ${catalog.entries.length} catalog entries, and ${markdownFiles} Markdown files`);
