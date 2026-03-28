#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const catalogPath = path.join(repoRoot, 'PUBLIC_CONTRACT_CATALOG.json');
const packageJsonPath = path.join(repoRoot, 'package.json');

const allowedKinds = new Set([
  'orientation',
  'governance',
  'law-doc',
  'raw-capsule',
  'validator-doc',
  'openapi',
  'api-doc',
  'integration-doc',
  'verification-doc',
  'reference-data',
  'schema',
  'projection',
  'example',
  'support-artifact',
  'client-recipe',
  'api-example',
  'provenance',
  'release-review',
  'release-metadata',
  'index'
]);

const allowedStability = new Set(['contract', 'maintained', 'illustrative']);

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

assert(typeof catalog.catalog_version === 'string', 'catalog_version must be a string');
assert(catalog.catalog_version === pkg.version, 'catalog_version must match package.json version');
assert(Array.isArray(catalog.entries) && catalog.entries.length >= 10, 'catalog must contain at least 10 entries');

const ids = new Set();
const paths = new Set();

for (const entry of catalog.entries) {
  assert(typeof entry.id === 'string' && entry.id.length > 0, 'every catalog entry must have an id');
  assert(!ids.has(entry.id), `duplicate catalog id ${entry.id}`);
  ids.add(entry.id);

  assert(typeof entry.path === 'string' && entry.path.length > 0, `catalog entry ${entry.id} must have a path`);
  assert(!paths.has(entry.path), `duplicate catalog path ${entry.path}`);
  paths.add(entry.path);
  assert(fs.existsSync(path.join(repoRoot, entry.path)), `catalog path does not exist: ${entry.path}`);

  assert(allowedKinds.has(entry.kind), `catalog entry ${entry.id} has unsupported kind ${entry.kind}`);
  assert(allowedStability.has(entry.stability), `catalog entry ${entry.id} has unsupported stability ${entry.stability}`);
  assert(Array.isArray(entry.audiences) && entry.audiences.length > 0, `catalog entry ${entry.id} must declare audiences`);
  assert(Array.isArray(entry.verify_commands) && entry.verify_commands.length > 0, `catalog entry ${entry.id} must declare verify_commands`);

  for (const command of entry.verify_commands) {
    assert(typeof command === 'string' && command.startsWith('npm run '), `catalog entry ${entry.id} has invalid verify command ${command}`);
  }
}

const requiredIds = [
  'repo.readme',
  'repo.versioning',
  'repo.notice',
  'validator.openapi',
  'validator.client-recipes',
  'schema.capsule',
  'schema.capsule-bundle',
  'capsules.directory-guide',
  'capsules.raw-5-element-law',
  'capsules.raw-16-gates',
  'capsules.raw-relation-types',
  'capsules.raw-confidence-vector',
  'capsules.raw-versioning-protocol',
  'capsules.raw-subtype-atomic',
  'capsules.raw-subtype-hub',
  'docs.reference-pack',
  'docs.schema-bundles',
  'references.directory-guide',
  'reference.contract-constants',
  'reference.validation-gates',
  'reference.validator-routes',
  'reference.check',
  'docs.integrity-recipes',
  'docs.schema-validation-recipes',
  'docs.invalid-capsule-examples',
  'docs.invalid-api-envelope-examples',
  'schema.reference-doc',
  'schema.family-reference-doc',
  'schema.directory-guide',
  'schema.validator-api-envelopes',
  'schema.validator-api-envelopes-bundle',
  'governance.community-health',
  'governance.project-profile',
  'governance.capability-matrix',
  'governance.boundary-map',
  'governance.portability-profile',
  'governance.evaluation-packet',
  'governance.failure-model',
  'governance.example-coverage',
  'governance.maintenance-model',
  'governance.change-control-model',
  'governance.ownership-map',
  'governance.traceability-matrix',
  'governance.dependency-graph',
  'governance.assurance-case',
  'governance.update-coherence',
  'governance.limitations-register',
  'governance.projection-doctrine',
  'governance.domain-boundaries',
  'governance.generator-readiness',
  'governance.portability-doc',
  'governance.archive-bundles-doc',
  'docs.archive-validation-recipes',
  'governance.evaluation-packet-doc',
  'governance.failure-model-doc',
  'governance.example-coverage-doc',
  'governance.maintainer-operations-doc',
  'governance.change-control-doc',
  'governance.repo-validation-workflow-doc',
  'governance.artifact-ownership-doc',
  'governance.traceability-doc',
  'governance.dependency-graph-doc',
  'governance.assurance-case-doc',
  'governance.update-coherence-doc',
  'governance.limitations-register-doc',
  'schema.archive-bundle',
  'schema.portability-profile',
  'schema.evaluation-packet',
  'schema.failure-model',
  'schema.example-coverage',
  'schema.maintenance-model',
  'schema.change-control-model',
  'schema.ownership-map',
  'schema.traceability-matrix',
  'schema.dependency-graph',
  'schema.assurance-case',
  'schema.update-coherence',
  'schema.limitations-register',
  'examples.note',
  'examples.archive-bundle',
  'examples.api-unauthorized',
  'examples.api-forbidden',
  'examples.api-conflict',
  'governance.manifest',
  'governance.contract-index',
  'governance.release-metadata',
  'governance.boundary-map-check',
  'governance.portability-check',
  'governance.evaluation-packet-check',
  'governance.failure-model-check',
  'governance.example-coverage-check',
  'governance.maintenance-model-check',
  'governance.change-control-check',
  'governance.ownership-map-check',
  'governance.traceability-check',
  'governance.dependency-graph-check',
  'governance.assurance-case-check',
  'governance.update-coherence-check',
  'governance.limitations-register-check',
  'governance.ecosystem-value-doc',
  'governance.ecosystem-value-map',
  'governance.ecosystem-value-map-schema',
  'governance.ecosystem-value-check',
  'governance.evidence-gaps-doc',
  'governance.evidence-gaps-register',
  'governance.evidence-gaps-schema',
  'governance.evidence-gaps-check',
  'governance.program-fit-doc',
  'governance.program-fit-map',
  'governance.program-fit-schema',
  'governance.program-fit-check',
  'governance.repository-identity-doc',
  'governance.repository-identity-map',
  'governance.repository-identity-schema',
  'governance.repository-identity-check',
  'governance.publication-readiness-doc',
  'governance.publication-readiness-map',
  'governance.publication-readiness-schema',
  'governance.publication-readiness-check',
  'community.github-labels',
  'community.github-milestones',
  'community.github-operations-doc',
  'community.github-operations-check',
  'docs.type-projections',
  'docs.npm-consumption',
  'projection.readme',
  'projection.root-index',
  'projection.typescript-index',
  'projection.typescript-capsule',
  'projection.typescript-validator-api',
  'projection.typescript-validator-routes',
  'projection.zod-index',
  'projection.zod-capsule',
  'projection.zod-validator-api',
  'projection.build-config',
  'projection.package-surface-check',
  'projection.package-install-check',
  'capsules.raw-check',
  'examples.client.ts-capsule-summary',
  'examples.client.zod-parse-capsule',
  'examples.client.ts-build-validate-request',
  'examples.client.ts-build-validate-batch-request',
  'examples.client.ts-build-validate-fix-request',
  'examples.client.ts-live-validator-client',
  'examples.client.ts-parse-validate-requests',
  'examples.client.zod-parse-validate-request',
  'examples.client.zod-parse-validate-batch-request',
  'examples.client.zod-parse-validate-fix-request',
  'examples.client.ts-parse-validate-responses',
  'examples.client.ts-parse-error-responses',
  'examples.client.ts-parse-support-responses',
  'examples.client.zod-parse-validate-response',
  'examples.client.zod-parse-validate-fail-response',
  'examples.client.zod-parse-validate-batch-response',
  'examples.client.zod-parse-validate-fix-response',
  'examples.client.zod-parse-error-responses',
  'examples.client.zod-parse-support-responses',
  'examples.client.cjs-package-capsule-summary',
  'examples.client.ajv-validate-capsule',
  'examples.client.ajv-validate-validator-envelope',
  'examples.client.ajv-validate-archive-bundle',
  'examples.client.ajv-validate-schema-bundles',
  'examples.client.ajv-reject-invalid-archive-bundles',
  'examples.client.ajv-reject-invalid-capsules',
  'examples.client.ajv-reject-invalid-validator-envelopes',
  'examples.client.recompute-integrity-seal',
  'examples.client.cjs-package-contract-reference',
  'examples.client.cjs-package-error-responses',
  'examples.client.cjs-package-live-validator-client',
  'examples.client.cjs-package-validate-request',
  'examples.client.cjs-package-support-responses',
  'examples.client.cjs-package-validate-response',
  'examples.client.esm-package-ajv-validate-contracts',
  'examples.client.esm-package-ajv-validate-archive-bundle',
  'examples.client.esm-package-ajv-validate-schema-bundles',
  'examples.client.esm-package-ajv-reject-invalid-archive-bundles',
  'examples.client.esm-package-ajv-reject-invalid-capsules',
  'examples.client.esm-package-ajv-reject-invalid-validator-envelopes',
  'examples.client.esm-package-recompute-integrity-seal',
  'examples.client.esm-package-capsule-summary',
  'examples.client.esm-package-error-responses',
  'examples.client.esm-package-validate-request',
  'examples.client.esm-package-support-responses',
  'examples.client.esm-package-validate-response',
  'examples.client.ts-package-contract-reference',
  'examples.client.ts-package-error-responses',
  'examples.client.ts-package-live-validator-client',
  'examples.client.ts-package-support-responses',
  'examples.client.ts-package-validate-responses',
  'examples.client.ts-package-parse-validate-requests',
  'examples.client.ts-package-validate-request',
  'examples.client.ts-package-validate-batch-request',
  'examples.client.ts-package-validate-fix-request',
  'examples.client.curl-get-gates',
  'examples.client.curl-get-stats',
  'examples.client.node-get-gates',
  'examples.client.node-fix',
  'examples.client.node-get-stats',
  'examples.client.python-get-gates',
  'examples.client.python-get-stats',
  'examples.client.python-live-validator-client',
  'examples.client.python-parse-validate-responses',
  'examples.client.python-parse-support-responses',
  'schema.bundle-check',
  'schema.recipe-check',
  'schema.archive-recipe-check',
  'docs.invalid-archive-bundle-examples',
  'examples.archive-invalid.readme',
  'examples.archive-invalid.invalid-created-at',
  'examples.archive-invalid.invalid-content-class',
  'examples.invalid-archive.check',
  'examples.integrity.check',
  'examples.invalid.readme',
  'examples.invalid.missing-neuro-concentrate',
  'examples.invalid.relation-type',
  'examples.invalid.check',
  'examples.api-invalid.readme',
  'examples.api-invalid.validate-request.single.missing-capsule',
  'examples.api-invalid.validate-response.fail.invalid-gate',
  'examples.invalid-api.check'
];

for (const requiredId of requiredIds) {
  assert(ids.has(requiredId), `required catalog entry missing: ${requiredId}`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${catalog.entries.length} contract catalog entries`);
