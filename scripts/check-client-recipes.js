#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const clientDir = path.join(repoRoot, 'examples', 'client');

const shellFiles = [
  'curl-validate-single.sh',
  'curl-validate-batch.sh',
  'curl-validate-fix.sh',
  'curl-get-gates.sh',
  'curl-get-stats.sh'
];

const nodeFiles = [
  'node-validate-single.mjs',
  'node-validate-batch.mjs',
  'node-validate-fix.mjs',
  'node-get-gates.mjs',
  'node-get-stats.mjs'
];

const typeRecipeFiles = [
  'ts-capsule-summary.ts',
  'zod-parse-capsule.ts',
  'ts-envelope-family-reference.ts',
  'ts-route-behavior-reference.ts',
  'ts-build-validate-request.ts',
  'ts-build-validate-batch-request.ts',
  'ts-build-validate-fix-request.ts',
  'ts-live-validator-client.ts',
  'ts-parse-validate-requests.ts',
  'zod-parse-validate-request.ts',
  'zod-parse-validate-batch-request.ts',
  'zod-parse-validate-fix-request.ts',
  'ts-parse-validate-responses.ts',
  'ts-parse-error-responses.ts',
  'ts-parse-support-responses.ts',
  'zod-parse-error-responses.ts',
  'zod-parse-validate-response.ts',
  'zod-parse-validate-fail-response.ts',
  'zod-parse-validate-batch-response.ts',
  'zod-parse-validate-fix-response.ts',
  'zod-parse-support-responses.ts'
];

const schemaRecipeFiles = [
  'ajv-validate-capsule.mjs',
  'ajv-validate-validator-envelope.mjs',
  'ajv-validate-archive-bundle.mjs',
  'ajv-validate-schema-bundles.mjs',
  'ajv-reject-invalid-archive-bundles.mjs',
  'ajv-reject-invalid-capsules.mjs',
  'ajv-reject-invalid-validator-envelopes.mjs',
  'esm-package-ajv-validate-contracts.mjs',
  'esm-package-ajv-validate-archive-bundle.mjs',
  'esm-package-ajv-validate-schema-bundles.mjs',
  'esm-package-ajv-reject-invalid-archive-bundles.mjs',
  'esm-package-ajv-reject-invalid-capsules.mjs',
  'esm-package-ajv-reject-invalid-validator-envelopes.mjs'
];

const integrityRecipeFiles = ['recompute-integrity-seal.mjs', 'esm-package-recompute-integrity-seal.mjs'];

const pythonRecipeFiles = [
  'python-contract-reference.py',
  'python-live-validator-client.py',
  'python-recompute-integrity-seal.py',
  'python-validate-single.py',
  'python-validate-batch.py',
  'python-validate-fix.py',
  'python-get-gates.py',
  'python-get-stats.py',
  'python-parse-validate-responses.py',
  'python-parse-support-responses.py'
];

const packageRecipeFiles = [
  'cjs-package-capsule-summary.cjs',
  'cjs-package-contract-reference.cjs',
  'cjs-package-error-responses.cjs',
  'cjs-package-live-validator-client.cjs',
  'cjs-package-validate-request.cjs',
  'cjs-package-support-responses.cjs',
  'cjs-package-validate-response.cjs',
  'esm-package-capsule-summary.mjs',
  'esm-package-contract-reference.mjs',
  'esm-package-error-responses.mjs',
  'esm-package-live-validator-client.mjs',
  'esm-package-validate-request.mjs',
  'esm-package-support-responses.mjs',
  'esm-package-validate-response.mjs'
];

const packageTypeRecipeFiles = [
  'ts-package-error-responses.ts',
  'ts-package-contract-reference.ts',
  'ts-package-live-validator-client.ts',
  'ts-package-support-responses.ts',
  'ts-package-validate-responses.ts',
  'ts-package-parse-validate-requests.ts',
  'ts-package-validate-request.ts',
  'ts-package-validate-batch-request.ts',
  'ts-package-validate-fix-request.ts'
];

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

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
  'ts-capsule-summary.ts': '../../projections/typescript/capsule.js',
  'zod-parse-capsule.ts': '../../projections/zod/capsule.js',
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

for (const [entryName, projectionImport] of Object.entries(expectedTypeProjectionImports)) {
  const fileName = entryName.split('#')[0];
  const content = fs.readFileSync(path.join(clientDir, fileName), 'utf8');
  assert(content.includes(projectionImport), `${fileName} must import ${projectionImport}`);
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

const expectedSchemaRecipeImports = {
  'ajv-validate-capsule.mjs': [
    'ajv/dist/2020.js',
    '../../schemas/capsule-schema.json',
    '../../schemas/neuro-concentrate.schema.json',
    '../example-note.capsule.json'
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
  'python-contract-reference.py': [
    'references/contract-constants.json',
    'references/validation-gates.json',
    'references/validator-envelope-families.json',
    'references/validator-routes.json',
    'capsules/capsule.foundation.capsuleos.confidence-vector.v1.json'
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
  'python-parse-support-responses.py': [
    'examples/api/gates-response.sample.json',
    'examples/api/stats-response.sample.json',
    'examples/api/unauthorized-response.sample.json',
    'examples/api/forbidden-response.sample.json',
    'examples/api/conflict-response.sample.json',
    'examples/api/error-response.sample.json',
    'examples/api/rate-limit-response.sample.json'
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
  'cjs-package-contract-reference.cjs': [
    '@num1hub/capsule-specs/references/contract-constants.json',
    '@num1hub/capsule-specs/references/validation-gates.json',
    '@num1hub/capsule-specs/references/validator-envelope-families.json',
    '@num1hub/capsule-specs/references/validator-routes.json'
  ],
  'cjs-package-error-responses.cjs': [
    '@num1hub/capsule-specs/zod/validator-api',
    '@num1hub/capsule-specs/examples/api/error-response.sample.json',
    '@num1hub/capsule-specs/examples/api/unauthorized-response.sample.json',
    '@num1hub/capsule-specs/examples/api/forbidden-response.sample.json',
    '@num1hub/capsule-specs/examples/api/conflict-response.sample.json',
    '@num1hub/capsule-specs/examples/api/rate-limit-response.sample.json'
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
  'esm-package-contract-reference.mjs': [
    '@num1hub/capsule-specs/references/contract-constants.json',
    '@num1hub/capsule-specs/references/validation-gates.json',
    '@num1hub/capsule-specs/references/validator-envelope-families.json',
    '@num1hub/capsule-specs/references/validator-routes.json',
    '@num1hub/capsule-specs/typescript/validator-envelope-families',
    '@num1hub/capsule-specs/typescript/validator-routes'
  ],
  'esm-package-error-responses.mjs': [
    '@num1hub/capsule-specs/zod/validator-api',
    '@num1hub/capsule-specs/examples/api/error-response.sample.json',
    '@num1hub/capsule-specs/examples/api/unauthorized-response.sample.json',
    '@num1hub/capsule-specs/examples/api/forbidden-response.sample.json',
    '@num1hub/capsule-specs/examples/api/conflict-response.sample.json',
    '@num1hub/capsule-specs/examples/api/rate-limit-response.sample.json'
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
    '@num1hub/capsule-specs/examples/api/rate-limit-response.sample.json'
  ],
  'ts-package-contract-reference.ts': [
    '@num1hub/capsule-specs/references/contract-constants.json',
    '@num1hub/capsule-specs/references/validation-gates.json',
    '@num1hub/capsule-specs/references/validator-envelope-families.json',
    '@num1hub/capsule-specs/references/validator-routes.json',
    '@num1hub/capsule-specs/typescript/validator-envelope-families',
    '@num1hub/capsule-specs/typescript/validator-routes'
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
  } client recipe files`
);
