#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const clientDir = path.join(repoRoot, 'examples', 'client');

const shellFiles = [
  'curl-validate-single.sh',
  'curl-validate-batch.sh',
  'curl-validate-fix.sh'
];

const nodeFiles = [
  'node-validate-single.mjs',
  'node-validate-batch.mjs'
];

const typeRecipeFiles = [
  'ts-capsule-summary.ts',
  'zod-parse-capsule.ts',
  'ts-build-validate-request.ts',
  'zod-parse-validate-response.ts'
];

const packageRecipeFiles = [
  'cjs-package-capsule-summary.cjs',
  'cjs-package-validate-response.cjs',
  'esm-package-capsule-summary.mjs',
  'esm-package-validate-response.mjs'
];

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

for (const fileName of [...shellFiles, ...nodeFiles, ...typeRecipeFiles, ...packageRecipeFiles]) {
  const filePath = path.join(clientDir, fileName);
  assert(fs.existsSync(filePath), `missing client recipe ${fileName}`);
}

for (const fileName of shellFiles) {
  const filePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.includes('N1HUB_BASE_URL'), `${fileName} must require N1HUB_BASE_URL`);
  assert(content.includes('N1HUB_TOKEN'), `${fileName} must require N1HUB_TOKEN`);
  assert(content.includes('Authorization: Bearer ${N1HUB_TOKEN}'), `${fileName} must send a bearer token`);
  assert(content.includes('--data "@/home/n1/codex-workspace/examples/api/'), `${fileName} must point at a repository API example payload`);
}

const expectedShellRoutes = {
  'curl-validate-single.sh': '/api/validate',
  'curl-validate-batch.sh': '/api/validate/batch',
  'curl-validate-fix.sh': '/api/validate/fix'
};

for (const [fileName, route] of Object.entries(expectedShellRoutes)) {
  const content = fs.readFileSync(path.join(clientDir, fileName), 'utf8');
  assert(content.includes(`${route}`), `${fileName} must target ${route}`);
}

const expectedNodeRoutes = {
  'node-validate-single.mjs': '/api/validate',
  'node-validate-batch.mjs': '/api/validate/batch'
};

for (const [fileName, route] of Object.entries(expectedNodeRoutes)) {
  const filePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.includes('N1HUB_BASE_URL'), `${fileName} must require N1HUB_BASE_URL`);
  assert(content.includes('N1HUB_TOKEN'), `${fileName} must require N1HUB_TOKEN`);
  assert(content.includes(route), `${fileName} must target ${route}`);
  const result = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  assert(result.status === 0, `${fileName} must be syntactically valid: ${result.stderr || result.stdout}`);
}

const expectedTypeProjectionImports = {
  'ts-capsule-summary.ts': '../../projections/typescript/capsule.js',
  'zod-parse-capsule.ts': '../../projections/zod/capsule.js',
  'ts-build-validate-request.ts': '../../projections/typescript/validator-api.js',
  'zod-parse-validate-response.ts': '../../projections/zod/validator-api.js'
};

for (const [fileName, projectionImport] of Object.entries(expectedTypeProjectionImports)) {
  const content = fs.readFileSync(path.join(clientDir, fileName), 'utf8');
  assert(content.includes(projectionImport), `${fileName} must import ${projectionImport}`);
}

const expectedPackageImports = {
  'cjs-package-capsule-summary.cjs': [
    '@num1hub/capsule-specs/typescript',
    '@num1hub/capsule-specs/zod'
  ],
  'cjs-package-validate-response.cjs': [
    '@num1hub/capsule-specs/zod/validator-api'
  ],
  'esm-package-capsule-summary.mjs': [
    '@num1hub/capsule-specs',
    '@num1hub/capsule-specs/zod',
    '@num1hub/capsule-specs/examples/example-note.capsule.json'
  ],
  'esm-package-validate-response.mjs': [
    '@num1hub/capsule-specs/zod/validator-api',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json'
  ]
};

for (const [fileName, imports] of Object.entries(expectedPackageImports)) {
  const filePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  for (const importPath of imports) {
    assert(content.includes(importPath), `${fileName} must import ${importPath}`);
  }
  const result = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  assert(result.status === 0, `${fileName} must be syntactically valid: ${result.stderr || result.stdout}`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${shellFiles.length + nodeFiles.length + typeRecipeFiles.length + packageRecipeFiles.length} client recipe files`);
