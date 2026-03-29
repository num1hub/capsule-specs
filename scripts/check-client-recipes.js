#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const {
  shellFiles,
  nodeFiles,
  typeRecipeFiles,
  schemaRecipeFiles,
  integrityRecipeFiles,
  pythonRecipeFiles,
  packageRecipeFiles,
  packageTypeRecipeFiles,
  supportedTaskRuntimes,
  allIndexedRecipeFiles,
  recipeIndex
} = require('./lib/client-recipes');

const repoRoot = path.resolve(__dirname, '..');
const clientDir = path.join(repoRoot, 'examples', 'client');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const committedRecipeIndex = JSON.parse(fs.readFileSync(path.join(clientDir, 'recipe-index.json'), 'utf8'));
const actualClientArtifacts = fs
  .readdirSync(clientDir)
  .filter((name) => !name.endsWith('.md') && name !== 'recipe-index.json')
  .sort();
const clientReadme = fs.readFileSync(path.join(clientDir, 'README.md'), 'utf8');
const clientRecipesDoc = fs.readFileSync(path.join(repoRoot, 'docs', 'client-recipes.md'), 'utf8');
const integrationGuide = fs.readFileSync(path.join(repoRoot, 'docs', 'integration-guide.md'), 'utf8');
const supportedRuntimeNames = new Set(supportedTaskRuntimes);

assert(
  JSON.stringify(committedRecipeIndex) === JSON.stringify(recipeIndex),
  'examples/client/recipe-index.json must stay aligned with scripts/lib/client-recipes.js'
);
assert(
  JSON.stringify(actualClientArtifacts) === JSON.stringify(allIndexedRecipeFiles),
  'scripts/lib/client-recipes.js must cover every non-Markdown client artifact'
);
assert(
  committedRecipeIndex.version === recipeIndex.version,
  'examples/client/recipe-index.json version must match the shared client recipe registry'
);
assert(
  committedRecipeIndex.directory === 'examples/client',
  'examples/client/recipe-index.json must declare the examples/client directory'
);
assert(clientReadme.includes('recipe-index.json'), 'examples/client/README.md must mention recipe-index.json');
assert(clientRecipesDoc.includes('recipe-index.json'), 'docs/client-recipes.md must mention recipe-index.json');
assert(integrationGuide.includes('recipe-index.json'), 'docs/integration-guide.md must mention recipe-index.json');

const indexedRecipeNames = new Set(allIndexedRecipeFiles);
const groupIds = new Set();
const groupedRecipeOwnership = new Map();
for (const group of committedRecipeIndex.groups || []) {
  assert(typeof group.id === 'string' && group.id.length > 0, 'every recipe-index group must have an id');
  assert(!groupIds.has(group.id), `duplicate recipe-index group id ${group.id}`);
  groupIds.add(group.id);
  assert(typeof group.title === 'string' && group.title.length > 0, `recipe-index group ${group.id} must have a title`);
  assert(typeof group.description === 'string' && group.description.length > 0, `recipe-index group ${group.id} must have a description`);
  assert(Array.isArray(group.audiences) && group.audiences.length > 0, `recipe-index group ${group.id} must list audiences`);
  assert(Array.isArray(group.files) && group.files.length > 0, `recipe-index group ${group.id} must list files`);
  assert(Array.isArray(group.primary_docs) && group.primary_docs.length > 0, `recipe-index group ${group.id} must list primary docs`);
  assert(typeof group.recommended_start === 'string' && group.recommended_start.length > 0, `recipe-index group ${group.id} must define recommended_start`);
  for (const docPath of group.primary_docs) {
    assert(fs.existsSync(path.join(repoRoot, docPath)), `recipe-index group ${group.id} references missing doc ${docPath}`);
  }
  for (const fileName of group.files) {
    assert(indexedRecipeNames.has(fileName), `recipe-index group ${group.id} references non-indexed file ${fileName}`);
    assert(!groupedRecipeOwnership.has(fileName), `recipe-index file ${fileName} must belong to exactly one group`);
    groupedRecipeOwnership.set(fileName, group.id);
  }
  assert(group.files.includes(group.recommended_start), `recipe-index group ${group.id} recommended_start must be owned by that group`);
}

const taskIds = new Set();
const tasksById = new Map();
for (const entry of committedRecipeIndex.task_entrypoints || []) {
  assert(typeof entry.id === 'string' && entry.id.length > 0, 'every recipe-index task entrypoint must have an id');
  assert(!taskIds.has(entry.id), `duplicate recipe-index task id ${entry.id}`);
  taskIds.add(entry.id);
  tasksById.set(entry.id, entry);
  assert(typeof entry.intent === 'string' && entry.intent.length > 0, `recipe-index task ${entry.id} must describe its intent`);
  assert(typeof entry.primary_group === 'string' && groupIds.has(entry.primary_group), `recipe-index task ${entry.id} must reference a known primary_group`);
  assert(indexedRecipeNames.has(entry.recommended), `recipe-index task ${entry.id} recommends unknown file ${entry.recommended}`);
  assert(groupedRecipeOwnership.get(entry.recommended) === entry.primary_group, `recipe-index task ${entry.id} recommended file must be owned by its primary_group`);
  assert(Array.isArray(entry.alternatives), `recipe-index task ${entry.id} must list alternatives`);
  for (const fileName of entry.alternatives) {
    assert(indexedRecipeNames.has(fileName), `recipe-index task ${entry.id} alternative is not indexed: ${fileName}`);
  }
  assert(Array.isArray(entry.docs) && entry.docs.length > 0, `recipe-index task ${entry.id} must list supporting docs`);
  for (const docPath of entry.docs) {
    assert(fs.existsSync(path.join(repoRoot, docPath)), `recipe-index task ${entry.id} references missing doc ${docPath}`);
  }
  assert(Array.isArray(entry.runtimes) && entry.runtimes.length > 0, `recipe-index task ${entry.id} must list runtimes`);
  for (const runtimeName of entry.runtimes) {
    assert(supportedRuntimeNames.has(runtimeName), `recipe-index task ${entry.id} references unsupported runtime ${runtimeName}`);
  }
}

for (const group of committedRecipeIndex.groups || []) {
  const groupTaskCount = [...taskIds].filter((taskId) => tasksById.get(taskId)?.primary_group === group.id).length;
  assert(groupTaskCount >= 1, `recipe-index group ${group.id} must own at least one task entrypoint`);
}

assert(
  JSON.stringify([...groupedRecipeOwnership.keys()].sort()) === JSON.stringify(allIndexedRecipeFiles),
  'recipe-index groups must cover every indexed client recipe file exactly once'
);

for (const fileName of [...shellFiles, ...nodeFiles, ...typeRecipeFiles, ...schemaRecipeFiles, ...integrityRecipeFiles, ...pythonRecipeFiles, ...packageRecipeFiles, ...packageTypeRecipeFiles]) {
  const filePath = path.join(clientDir, fileName);
  assert(fs.existsSync(filePath), `missing client recipe ${fileName}`);
}

const expectedShellRoutes = {
  'curl-validate-single.sh': {
    route: '/api/validate',
    requiresPayload: true
  },
  'curl-validate-batch.sh': {
    route: '/api/validate/batch',
    requiresPayload: true
  },
  'curl-validate-fix.sh': {
    route: '/api/validate/fix',
    requiresPayload: true
  },
  'curl-get-gates.sh': {
    route: '/api/validate/gates',
    requiresPayload: false
  },
  'curl-get-stats.sh': {
    route: '/api/validate/stats',
    requiresPayload: false
  }
};

for (const fileName of shellFiles) {
  const filePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  const expectations = expectedShellRoutes[fileName];
  assert(content.includes('N1HUB_BASE_URL'), `${fileName} must require N1HUB_BASE_URL`);
  assert(content.includes('N1HUB_TOKEN'), `${fileName} must require N1HUB_TOKEN`);
  assert(content.includes(expectations.route), `${fileName} must target ${expectations.route}`);
  assert(content.includes('Authorization: Bearer ${N1HUB_TOKEN}'), `${fileName} must send a bearer token`);
  if (expectations.requiresPayload) {
    assert(content.includes('--data "@/home/n1/codex-workspace/examples/api/'), `${fileName} must point at a repository API example payload`);
  } else {
    assert(!content.includes('--data "@/home/n1/codex-workspace/examples/api/'), `${fileName} must not send a request body`);
  }
  if (fileName === 'curl-get-stats.sh') {
    assert(content.includes('N1HUB_STATS_LIMIT'), `${fileName} must expose the published stats limit query path`);
    assert(content.includes('limit='), `${fileName} must render the published stats limit query parameter`);
  }
}

const expectedNodeRoutes = {
  'node-validate-single.mjs': '/api/validate',
  'node-validate-batch.mjs': '/api/validate/batch',
  'node-validate-fix.mjs': '/api/validate/fix',
  'node-get-gates.mjs': '/api/validate/gates',
  'node-get-stats.mjs': '/api/validate/stats'
};

for (const [fileName, route] of Object.entries(expectedNodeRoutes)) {
  const filePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.includes('N1HUB_BASE_URL'), `${fileName} must require N1HUB_BASE_URL`);
  assert(content.includes('N1HUB_TOKEN'), `${fileName} must require N1HUB_TOKEN`);
  assert(content.includes(route), `${fileName} must target ${route}`);
  if (fileName === 'node-get-stats.mjs') {
    assert(content.includes('N1HUB_STATS_LIMIT'), `${fileName} must expose the published stats limit query path`);
    assert(content.includes("searchParams.set('limit'"), `${fileName} must set the published stats limit query parameter`);
  }
  const result = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  assert(result.status === 0, `${fileName} must be syntactically valid: ${result.stderr || result.stdout}`);
}

const expectedTypeProjectionImports = {
  'ts-client-recipe-index.ts': '../../projections/typescript/client-recipe-index.js',
  'ts-capsule-summary.ts': '../../projections/typescript/capsule.js',
  'zod-parse-capsule.ts': '../../projections/zod/capsule.js',
  'ts-openapi-route-summary.ts': '../../openapi/validate.openapi.json',
  'ts-envelope-family-reference.ts': '../../projections/typescript/validator-envelope-families.js',
  'ts-route-behavior-reference.ts': '../../projections/typescript/validator-routes.js',
  'ts-build-validate-request.ts': '../../projections/typescript/validator-api.js',
  'ts-build-validate-batch-request.ts': '../../projections/typescript/validator-api.js',
  'ts-build-validate-fix-request.ts': '../../projections/typescript/validator-api.js',
  'ts-live-validator-client.ts': '../../projections/typescript/validator-api.js',
  'ts-live-validator-client.ts#routes': '../../projections/typescript/validator-routes.js',
  'ts-parse-validate-requests.ts': '../../projections/typescript/validator-api.js',
  'zod-parse-validate-request.ts': '../../projections/zod/validator-api.js',
  'zod-parse-validate-batch-request.ts': '../../projections/zod/validator-api.js',
  'zod-parse-validate-fix-request.ts': '../../projections/zod/validator-api.js',
  'ts-parse-validate-responses.ts': '../../projections/typescript/validator-api.js',
  'ts-parse-error-responses.ts': '../../projections/typescript/validator-api.js',
  'ts-parse-support-responses.ts': '../../projections/typescript/validator-api.js',
  'zod-parse-error-responses.ts': '../../projections/zod/validator-api.js',
  'zod-parse-validate-response.ts': '../../projections/zod/validator-api.js',
  'zod-parse-validate-fail-response.ts': '../../projections/zod/validator-api.js',
  'zod-parse-validate-batch-response.ts': '../../projections/zod/validator-api.js',
  'zod-parse-validate-fix-response.ts': '../../projections/zod/validator-api.js',
  'zod-parse-support-responses.ts': '../../projections/zod/validator-api.js'
};

const expectedTypeRecipeReferences = {
  'ts-client-recipe-index.ts': [
    './recipe-index.json',
    'publishedClientRecipeGroupIds',
    'publishedClientRecipeTaskIds',
    'publishedClientRecipeIndexCounts',
    'source-recipe-navigation',
    'live-validate-single',
    'ts-live-validator-client.ts'
  ]
};

for (const [entryName, projectionImport] of Object.entries(expectedTypeProjectionImports)) {
  const fileName = entryName.split('#')[0];
  const content = fs.readFileSync(path.join(clientDir, fileName), 'utf8');
  assert(content.includes(projectionImport), `${fileName} must import ${projectionImport}`);
}

for (const [fileName, references] of Object.entries(expectedTypeRecipeReferences)) {
  const content = fs.readFileSync(path.join(clientDir, fileName), 'utf8');
  for (const reference of references) {
    assert(content.includes(reference), `${fileName} must reference ${reference}`);
  }
}

const expectedTypeLiveRouteReferences = {
  'ts-live-validator-client.ts': [
    '../api/validate-request.single.json',
    '../api/validate-request.batch.json',
    '../api/validate-request.fix.json',
    'publishedValidatorRoutes',
    'publishedValidatorRouteDefinitions',
    'buildStatsUrl',
    'limit',
    'fetch('
  ]
};

const expectedTypeRouteBehaviorReferences = {
  'ts-route-behavior-reference.ts': [
    '../references/validator-routes.json',
    'publishedValidatorRouteDefinitions'
  ]
};

const expectedTypeOpenApiReferences = {
  'ts-openapi-route-summary.ts': [
    '../../openapi/validate.openapi.json',
    '/api/validate/stats',
    'bearerAuth',
    'limit'
  ],
  'openapi-generate-validator-types.mjs': [
    'path.join(repoRoot, "openapi", "validate.openapi.json")',
    'openapi-typescript',
    'ValidateResponse',
    'RateLimitErrorResponse',
    'limit?: number;'
  ]
};

for (const [fileName, references] of Object.entries(expectedTypeLiveRouteReferences)) {
  const content = fs.readFileSync(path.join(clientDir, fileName), 'utf8');
  for (const reference of references) {
    assert(content.includes(reference), `${fileName} must reference ${reference}`);
  }
  assert(!content.includes('${baseUrl}/api/validate'), `${fileName} must rely on shared route constants instead of copied route strings`);
}

for (const [fileName, references] of Object.entries(expectedTypeRouteBehaviorReferences)) {
  const content = fs.readFileSync(path.join(clientDir, fileName), 'utf8');
  for (const reference of references) {
    assert(content.includes(reference), `${fileName} must reference ${reference}`);
  }
}

for (const [fileName, references] of Object.entries(expectedTypeOpenApiReferences)) {
  const content = fs.readFileSync(path.join(clientDir, fileName), 'utf8');
  for (const reference of references) {
    assert(content.includes(reference), `${fileName} must reference ${reference}`);
  }
}

const expectedSchemaRecipeImports = {
  'ajv-validate-capsule.mjs': [
    'ajv/dist/2020.js',
    '../../schemas/capsule-schema.json',
    '../../schemas/neuro-concentrate.schema.json',
    '../example-note.capsule.json'
  ],
  'ajv-validate-client-recipe-index.mjs': [
    'ajv/dist/2020.js',
    '../../schemas/client-recipe-index.schema.json',
    './recipe-index.json'
  ],
  'ajv-validate-validator-envelope.mjs': [
    'ajv/dist/2020.js',
    '../../schemas/capsule-schema.json',
    '../../schemas/neuro-concentrate.schema.json',
    '../../schemas/validator-api-envelopes.schema.json',
    '../api/validate-request.single.json',
    '../api/validate-response.pass.json'
  ],
  'ajv-validate-archive-bundle.mjs': [
    'ajv/dist/2020.js',
    'ajv-formats',
    '../../schemas/archive-bundle.schema.json',
    '../archive/archive-bundle.sample.json'
  ],
  'ajv-validate-schema-bundles.mjs': [
    'ajv/dist/2020.js',
    '../../schemas/capsule-schema.bundle.json',
    '../../schemas/validator-api-envelopes.bundle.json',
    '../example-note.capsule.json',
    '../api/validate-request.single.json',
    '../api/validate-response.pass.json'
  ],
  'ajv-reject-invalid-archive-bundles.mjs': [
    'ajv/dist/2020.js',
    'ajv-formats',
    '../../schemas/archive-bundle.schema.json',
    '../archive-invalid/archive-bundle.invalid-created-at.json',
    '../archive-invalid/archive-bundle.invalid-content-class.json'
  ],
  'ajv-reject-invalid-capsules.mjs': [
    'ajv/dist/2020.js',
    '../../schemas/capsule-schema.json',
    '../../schemas/neuro-concentrate.schema.json',
    '../invalid/example-invalid-missing-neuro-concentrate.capsule.json',
    '../invalid/example-invalid-relation-type.capsule.json'
  ],
  'ajv-reject-invalid-validator-envelopes.mjs': [
    'ajv/dist/2020.js',
    '../../schemas/capsule-schema.json',
    '../../schemas/neuro-concentrate.schema.json',
    '../../schemas/validator-api-envelopes.schema.json',
    '../api-invalid/validate-request.single.missing-capsule.json',
    '../api-invalid/validate-response.fail.invalid-gate.json'
  ],
  'esm-package-ajv-validate-contracts.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json',
    '@num1hub/capsule-specs/examples/example-note.capsule.json',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json'
  ],
  'esm-package-ajv-validate-archive-bundle.mjs': [
    'ajv/dist/2020.js',
    'ajv-formats',
    '@num1hub/capsule-specs/schemas/archive-bundle.schema.json',
    '@num1hub/capsule-specs/examples/archive/archive-bundle.sample.json'
  ],
  'esm-package-ajv-validate-client-recipe-index.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/client-recipe-index.schema.json',
    '@num1hub/capsule-specs/examples/client/recipe-index.json'
  ],
  'esm-package-ajv-validate-schema-bundles.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.bundle.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json',
    '@num1hub/capsule-specs/examples/example-note.capsule.json',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json'
  ],
  'esm-package-ajv-reject-invalid-archive-bundles.mjs': [
    'ajv/dist/2020.js',
    'ajv-formats',
    '@num1hub/capsule-specs/schemas/archive-bundle.schema.json',
    '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-created-at.json',
    '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-content-class.json'
  ],
  'esm-package-ajv-reject-invalid-capsules.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/examples/invalid/example-invalid-missing-neuro-concentrate.capsule.json',
    '@num1hub/capsule-specs/examples/invalid/example-invalid-relation-type.capsule.json'
  ],
  'esm-package-ajv-reject-invalid-validator-envelopes.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json',
    '@num1hub/capsule-specs/examples/api-invalid/validate-request.single.missing-capsule.json',
    '@num1hub/capsule-specs/examples/api-invalid/validate-response.fail.invalid-gate.json'
  ]
};

const expectedIntegrityRecipeImports = {
  'recompute-integrity-seal.mjs': [
    '../example-note.capsule.json',
    '../example-validator-invalid-g16.capsule.json',
    '../../references/contract-constants.json',
    'node:crypto'
  ],
  'esm-package-recompute-integrity-seal.mjs': [
    '@num1hub/capsule-specs/examples/example-note.capsule.json',
    '@num1hub/capsule-specs/examples/example-validator-invalid-g16.capsule.json',
    '@num1hub/capsule-specs/references/contract-constants.json',
    'node:crypto'
  ]
};

const expectedPythonRecipeReferences = {
  'python-client-recipe-index.py': [
    'examples/client/recipe-index.json',
    'python-recipe-navigation',
    'package-recipe-navigation',
    'source-recipe-navigation',
    'source-level-types',
    'python-consumers',
    'package-runtime'
  ],
  'python-contract-reference.py': [
    'references/contract-constants.json',
    'references/validation-gates.json',
    'references/validator-envelope-families.json',
    'references/validator-routes.json',
    'capsules/capsule.foundation.capsuleos.confidence-vector.v1.json'
  ],
  'python-openapi-reference.py': [
    'openapi/validate.openapi.json',
    '/api/validate/stats',
    'bearerAuth',
    'limit'
  ],
  'python-live-validator-client.py': [
    'references/validator-routes.json',
    'examples/api/validate-request.single.json',
    'examples/api/validate-request.batch.json',
    'examples/api/validate-request.fix.json',
    'N1HUB_BASE_URL',
    'N1HUB_TOKEN',
    'N1HUB_STATS_LIMIT',
    'validateSingle',
    'validateBatch',
    'validateFix',
    'getGates',
    'getStats',
    'build_stats_url',
    'urllib'
  ],
  'python-recompute-integrity-seal.py': [
    'examples/example-note.capsule.json',
    'examples/example-validator-invalid-g16.capsule.json',
    'references/contract-constants.json',
    'hashlib.sha3_512'
  ],
  'python-validate-single.py': [
    'examples/api/validate-request.single.json',
    'N1HUB_BASE_URL',
    'N1HUB_TOKEN',
    '/api/validate',
    'urllib'
  ],
  'python-validate-batch.py': [
    'examples/api/validate-request.batch.json',
    'N1HUB_BASE_URL',
    'N1HUB_TOKEN',
    '/api/validate/batch',
    'urllib'
  ],
  'python-validate-fix.py': [
    'examples/api/validate-request.fix.json',
    'N1HUB_BASE_URL',
    'N1HUB_TOKEN',
    '/api/validate/fix',
    'urllib'
  ],
  'python-get-gates.py': [
    'examples/api/gates-response.sample.json',
    'N1HUB_BASE_URL',
    'N1HUB_TOKEN',
    '/api/validate/gates',
    'urllib'
  ],
  'python-get-stats.py': [
    'examples/api/stats-response.sample.json',
    'N1HUB_BASE_URL',
    'N1HUB_TOKEN',
    'N1HUB_STATS_LIMIT',
    '/api/validate/stats',
    'urllib'
  ],
  'python-parse-validate-responses.py': [
    'examples/api/validate-response.pass.json',
    'examples/api/validate-response.fail.json',
    'examples/api/validate-response.batch.json',
    'examples/api/validate-response.fix.sample.json'
  ],
  'python-parse-error-responses.py': [
    'examples/api/unauthorized-response.sample.json',
    'examples/api/forbidden-response.sample.json',
    'examples/api/conflict-response.sample.json',
    'examples/api/error-response.sample.json',
    'examples/api/rate-limit-response.sample.json',
    'examples/api/stats-error-response.sample.json'
  ],
  'python-parse-support-responses.py': [
    'examples/api/gates-response.sample.json',
    'examples/api/stats-response.sample.json'
  ]
};

for (const [fileName, imports] of Object.entries(expectedSchemaRecipeImports)) {
  const filePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  for (const importPath of imports) {
    assert(content.includes(importPath), `${fileName} must import ${importPath}`);
  }
  const result = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  assert(result.status === 0, `${fileName} must be syntactically valid: ${result.stderr || result.stdout}`);
}

for (const [fileName, imports] of Object.entries(expectedIntegrityRecipeImports)) {
  const filePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  for (const importPath of imports) {
    assert(content.includes(importPath), `${fileName} must import ${importPath}`);
  }
  const result = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  assert(result.status === 0, `${fileName} must be syntactically valid: ${result.stderr || result.stdout}`);
}

for (const [fileName, references] of Object.entries(expectedPythonRecipeReferences)) {
  const content = fs.readFileSync(path.join(clientDir, fileName), 'utf8');
  for (const reference of references) {
    assert(content.includes(reference), `${fileName} must reference ${reference}`);
  }
}

const expectedPackageImports = {
  'cjs-package-capsule-summary.cjs': [
    '@num1hub/capsule-specs/typescript',
    '@num1hub/capsule-specs/zod'
  ],
  'cjs-package-client-recipe-index.cjs': [
    '@num1hub/capsule-specs/examples/client/recipe-index.json',
    'package-recipe-navigation',
    'cjs-package-live-validator-client.cjs',
    'ts-client-recipe-index.ts'
  ],
  'cjs-package-contract-reference.cjs': [
    '@num1hub/capsule-specs/references/contract-constants.json',
    '@num1hub/capsule-specs/references/validation-gates.json',
    '@num1hub/capsule-specs/references/validator-envelope-families.json',
    '@num1hub/capsule-specs/references/validator-routes.json'
  ],
  'cjs-package-openapi-reference.cjs': [
    '@num1hub/capsule-specs/openapi/validate.openapi.json',
    '/api/validate/stats',
    'bearerAuth',
    'limit'
  ],
  'cjs-package-openapi-codegen.cjs': [
    '@num1hub/capsule-specs/openapi/validate.openapi.json',
    'require.resolve',
    'openapi-typescript',
    'ValidateResponse',
    'RateLimitErrorResponse',
    'limit?: number;'
  ],
  'cjs-package-error-responses.cjs': [
    '@num1hub/capsule-specs/zod/validator-api',
    '@num1hub/capsule-specs/examples/api/error-response.sample.json',
    '@num1hub/capsule-specs/examples/api/unauthorized-response.sample.json',
    '@num1hub/capsule-specs/examples/api/forbidden-response.sample.json',
    '@num1hub/capsule-specs/examples/api/conflict-response.sample.json',
    '@num1hub/capsule-specs/examples/api/rate-limit-response.sample.json',
    '@num1hub/capsule-specs/examples/api/stats-error-response.sample.json'
  ],
  'cjs-package-live-validator-client.cjs': [
    '@num1hub/capsule-specs/typescript/validator-routes',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-request.batch.json',
    '@num1hub/capsule-specs/examples/api/validate-request.fix.json',
    'publishedValidatorRoutes',
    'publishedValidatorRouteDefinitions',
    'buildStatsUrl',
    'limit',
    'fetch('
  ],
  'cjs-package-validate-request.cjs': [
    '@num1hub/capsule-specs/zod/validator-api',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-request.batch.json',
    '@num1hub/capsule-specs/examples/api/validate-request.fix.json'
  ],
  'cjs-package-support-responses.cjs': [
    '@num1hub/capsule-specs/zod/validator-api',
    '@num1hub/capsule-specs/examples/api/gates-response.sample.json',
    '@num1hub/capsule-specs/examples/api/stats-response.sample.json'
  ],
  'cjs-package-validate-response.cjs': [
    '@num1hub/capsule-specs/zod/validator-api',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json',
    '@num1hub/capsule-specs/examples/api/validate-response.fail.json',
    '@num1hub/capsule-specs/examples/api/validate-response.batch.json',
    '@num1hub/capsule-specs/examples/api/validate-response.fix.sample.json'
  ],
  'esm-package-capsule-summary.mjs': [
    '@num1hub/capsule-specs',
    '@num1hub/capsule-specs/zod',
    '@num1hub/capsule-specs/examples/example-note.capsule.json'
  ],
  'esm-package-client-recipe-index.mjs': [
    '@num1hub/capsule-specs/examples/client/recipe-index.json',
    'package-recipe-navigation',
    'source-recipe-navigation',
    'openapi-direct-consumption',
    'docs/openapi.md',
    'ts-package-live-validator-client.ts',
    'ts-client-recipe-index.ts'
  ],
  'esm-package-contract-reference.mjs': [
    '@num1hub/capsule-specs/references/contract-constants.json',
    '@num1hub/capsule-specs/references/validation-gates.json',
    '@num1hub/capsule-specs/references/validator-envelope-families.json',
    '@num1hub/capsule-specs/references/validator-routes.json',
    '@num1hub/capsule-specs/typescript/validator-envelope-families',
    '@num1hub/capsule-specs/typescript/validator-routes'
  ],
  'esm-package-openapi-reference.mjs': [
    '@num1hub/capsule-specs/openapi/validate.openapi.json',
    '/api/validate/stats',
    'bearerAuth',
    'limit'
  ],
  'esm-package-openapi-codegen.mjs': [
    '@num1hub/capsule-specs/openapi/validate.openapi.json',
    'openapi-typescript',
    'ValidateResponse',
    'RateLimitErrorResponse',
    'limit?: number;'
  ],
  'esm-package-error-responses.mjs': [
    '@num1hub/capsule-specs/zod/validator-api',
    '@num1hub/capsule-specs/examples/api/error-response.sample.json',
    '@num1hub/capsule-specs/examples/api/unauthorized-response.sample.json',
    '@num1hub/capsule-specs/examples/api/forbidden-response.sample.json',
    '@num1hub/capsule-specs/examples/api/conflict-response.sample.json',
    '@num1hub/capsule-specs/examples/api/rate-limit-response.sample.json',
    '@num1hub/capsule-specs/examples/api/stats-error-response.sample.json'
  ],
  'esm-package-live-validator-client.mjs': [
    '@num1hub/capsule-specs/typescript/validator-routes',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-request.batch.json',
    '@num1hub/capsule-specs/examples/api/validate-request.fix.json',
    'publishedValidatorRoutes',
    'publishedValidatorRouteDefinitions',
    'fetch('
  ],
  'esm-package-validate-request.mjs': [
    '@num1hub/capsule-specs/zod/validator-api',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-request.batch.json',
    '@num1hub/capsule-specs/examples/api/validate-request.fix.json'
  ],
  'esm-package-validate-response.mjs': [
    '@num1hub/capsule-specs/zod/validator-api',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json',
    '@num1hub/capsule-specs/examples/api/validate-response.fail.json',
    '@num1hub/capsule-specs/examples/api/validate-response.batch.json',
    '@num1hub/capsule-specs/examples/api/validate-response.fix.sample.json'
  ],
  'esm-package-support-responses.mjs': [
    '@num1hub/capsule-specs/zod/validator-api',
    '@num1hub/capsule-specs/examples/api/gates-response.sample.json',
    '@num1hub/capsule-specs/examples/api/stats-response.sample.json'
  ]
};

const expectedPackageTypeImports = {
  'ts-package-client-recipe-index.ts': [
    '@num1hub/capsule-specs/examples/client/recipe-index.json',
    '@num1hub/capsule-specs/typescript/client-recipe-index',
    'publishedClientRecipeGroupIds',
    'publishedClientRecipeIndexCounts',
    'package-recipe-navigation',
    'source-recipe-navigation',
    'source-response-reading',
    'cjs-package-live-validator-client.cjs',
    'ts-client-recipe-index.ts',
    'recompute-integrity-seal.mjs'
  ],
  'ts-package-validate-request.ts': [
    '@num1hub/capsule-specs/typescript/capsule',
    '@num1hub/capsule-specs/typescript/validator-api'
  ],
  'ts-package-error-responses.ts': [
    '@num1hub/capsule-specs/typescript/validator-api',
    '@num1hub/capsule-specs/examples/api/error-response.sample.json',
    '@num1hub/capsule-specs/examples/api/unauthorized-response.sample.json',
    '@num1hub/capsule-specs/examples/api/forbidden-response.sample.json',
    '@num1hub/capsule-specs/examples/api/conflict-response.sample.json',
    '@num1hub/capsule-specs/examples/api/rate-limit-response.sample.json',
    '@num1hub/capsule-specs/examples/api/stats-error-response.sample.json'
  ],
  'ts-package-contract-reference.ts': [
    '@num1hub/capsule-specs/references/contract-constants.json',
    '@num1hub/capsule-specs/references/validation-gates.json',
    '@num1hub/capsule-specs/references/validator-envelope-families.json',
    '@num1hub/capsule-specs/references/validator-routes.json',
    '@num1hub/capsule-specs/typescript/validator-envelope-families',
    '@num1hub/capsule-specs/typescript/validator-routes'
  ],
  'ts-package-openapi-codegen.ts': [
    '@num1hub/capsule-specs/openapi/validate.openapi.json',
    'createRequire',
    'require.resolve',
    'openapi-typescript',
    'ValidateResponse',
    'RateLimitErrorResponse',
    'limit?: number;'
  ],
  'ts-package-openapi-reference.ts': [
    '@num1hub/capsule-specs/openapi/validate.openapi.json',
    '/api/validate/stats',
    'bearerAuth',
    'limit'
  ],
  'ts-package-live-validator-client.ts': [
    '@num1hub/capsule-specs/typescript/validator-api',
    '@num1hub/capsule-specs/typescript/validator-routes',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-request.batch.json',
    '@num1hub/capsule-specs/examples/api/validate-request.fix.json',
    'publishedValidatorRoutes',
    'publishedValidatorRouteDefinitions',
    'buildStatsUrl',
    'limit',
    'fetch('
  ],
  'ts-package-support-responses.ts': [
    '@num1hub/capsule-specs/typescript/validator-api'
  ],
  'ts-package-validate-responses.ts': [
    '@num1hub/capsule-specs/typescript/validator-api'
  ],
  'ts-package-parse-validate-requests.ts': [
    '@num1hub/capsule-specs/typescript/validator-api',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-request.batch.json',
    '@num1hub/capsule-specs/examples/api/validate-request.fix.json'
  ],
  'ts-package-validate-batch-request.ts': [
    '@num1hub/capsule-specs/typescript/validator-api'
  ],
  'ts-package-validate-fix-request.ts': [
    '@num1hub/capsule-specs/typescript/validator-api'
  ]
};

for (const [fileName, imports] of Object.entries(expectedPackageImports)) {
  const filePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  for (const importPath of imports) {
    assert(content.includes(importPath), `${fileName} must import ${importPath}`);
  }
  if (fileName === 'cjs-package-live-validator-client.cjs') {
    assert(!content.includes('${baseUrl}/api/validate'), `${fileName} must rely on shared route constants instead of copied route strings`);
    assert(content.includes('limit'), `${fileName} must expose the published stats limit query path`);
  }
  if (fileName === 'esm-package-live-validator-client.mjs') {
    assert(!content.includes('${baseUrl}/api/validate'), `${fileName} must rely on shared route constants instead of copied route strings`);
    assert(content.includes('limit'), `${fileName} must expose the published stats limit query path`);
  }
  const result = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  assert(result.status === 0, `${fileName} must be syntactically valid: ${result.stderr || result.stdout}`);
}

for (const [fileName, imports] of Object.entries(expectedPackageTypeImports)) {
  const content = fs.readFileSync(path.join(clientDir, fileName), 'utf8');
  for (const importPath of imports) {
    assert(content.includes(importPath), `${fileName} must import ${importPath}`);
  }
  if (fileName === 'ts-package-live-validator-client.ts') {
    assert(!content.includes('${baseUrl}/api/validate'), `${fileName} must rely on shared route constants instead of copied route strings`);
    assert(content.includes('limit'), `${fileName} must expose the published stats limit query path`);
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(
  `OK: checked ${
    shellFiles.length +
    nodeFiles.length +
    typeRecipeFiles.length +
    schemaRecipeFiles.length +
    integrityRecipeFiles.length +
    pythonRecipeFiles.length +
    packageRecipeFiles.length +
    packageTypeRecipeFiles.length
  } client recipe files, ${committedRecipeIndex.groups.length} recipe groups, and ${committedRecipeIndex.task_entrypoints.length} task entrypoints`
);
