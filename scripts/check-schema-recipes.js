#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const clientDir = path.join(repoRoot, 'examples', 'client');

const repoLocalRecipes = [
  'ajv-validate-capsule.mjs',
  'ajv-validate-validator-envelope.mjs',
  'ajv-validate-archive-bundle.mjs',
  'ajv-validate-client-recipe-index.mjs',
  'ajv-validate-schema-bundles.mjs',
  'ajv-reject-invalid-archive-bundles.mjs',
  'ajv-reject-invalid-client-recipe-index.mjs',
  'ajv-reject-invalid-capsules.mjs',
  'ajv-reject-invalid-validator-envelopes.mjs'
];

const packageRuntimeRecipes = [
  'cjs-package-ajv-validate-archive-bundle.cjs',
  'cjs-package-ajv-validate-schema-bundles.cjs',
  'cjs-package-ajv-validate-contracts.cjs',
  'cjs-package-ajv-reject-invalid-archive-bundles.cjs',
  'cjs-package-ajv-reject-invalid-capsules.cjs',
  'cjs-package-ajv-reject-invalid-validator-envelopes.cjs',
  'cjs-package-ajv-validate-client-recipe-index.cjs',
  'cjs-package-ajv-reject-invalid-client-recipe-index.cjs',
  'esm-package-ajv-validate-contracts.mjs',
  'esm-package-ajv-validate-archive-bundle.mjs',
  'esm-package-ajv-validate-client-recipe-index.mjs',
  'esm-package-ajv-validate-schema-bundles.mjs',
  'esm-package-ajv-reject-invalid-archive-bundles.mjs',
  'esm-package-ajv-reject-invalid-client-recipe-index.mjs',
  'esm-package-ajv-reject-invalid-capsules.mjs',
  'esm-package-ajv-reject-invalid-validator-envelopes.mjs'
];

const packageTypeRecipes = [
  'ts-package-ajv-validate-archive-bundle.ts',
  'ts-package-ajv-validate-schema-bundles.ts',
  'ts-package-ajv-validate-contracts.ts',
  'ts-package-ajv-reject-invalid-archive-bundles.ts',
  'ts-package-ajv-reject-invalid-capsules.ts',
  'ts-package-ajv-reject-invalid-validator-envelopes.ts',
  'ts-package-ajv-validate-client-recipe-index.ts',
  'ts-package-ajv-reject-invalid-client-recipe-index.ts'
];

const repoTsc = path.join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function checkTypeScriptRecipe(filePath, label) {
  const result = spawnSync(
    process.execPath,
    [
      repoTsc,
      '--noEmit',
      '--pretty',
      'false',
      '--target',
      'ES2022',
      '--module',
      'ESNext',
      '--moduleResolution',
      'Bundler',
      '--resolveJsonModule',
      '--skipLibCheck',
      '--types',
      'node',
      filePath
    ],
    { cwd: repoRoot, encoding: 'utf8' }
  );
  assert(result.status === 0, `${label} must typecheck: ${result.stderr || result.stdout}`);
}

for (const fileName of [...repoLocalRecipes, ...packageRuntimeRecipes, ...packageTypeRecipes]) {
  assert(fs.existsSync(path.join(clientDir, fileName)), `missing schema recipe ${fileName}`);
}

for (const fileName of repoLocalRecipes) {
  const filePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.includes('ajv/dist/2020.js'), `${fileName} must use Ajv draft-2020 support`);
  if (fileName === 'ajv-validate-archive-bundle.mjs' || fileName === 'ajv-reject-invalid-archive-bundles.mjs') {
    assert(content.includes('ajv-formats'), `${fileName} must import ajv-formats for schema format support`);
  }
  const syntaxResult = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
  assert(syntaxResult.status === 0, `${fileName} must be syntactically valid: ${syntaxResult.stderr || syntaxResult.stdout}`);
  const execResult = spawnSync(process.execPath, [filePath], { encoding: 'utf8' });
  assert(execResult.status === 0, `${fileName} must execute successfully: ${execResult.stderr || execResult.stdout}`);
}

const expectedPackageRuntimeImports = {
  'cjs-package-ajv-validate-archive-bundle.cjs': [
    'ajv/dist/2020',
    'ajv-formats',
    '@num1hub/capsule-specs/schemas/archive-bundle.schema.json',
    '@num1hub/capsule-specs/examples/archive/archive-bundle.sample.json'
  ],
  'cjs-package-ajv-validate-schema-bundles.cjs': [
    'ajv/dist/2020',
    '@num1hub/capsule-specs/schemas/capsule-schema.bundle.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json',
    '@num1hub/capsule-specs/examples/example-note.capsule.json',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json'
  ],
  'cjs-package-ajv-validate-contracts.cjs': [
    'ajv/dist/2020',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json',
    '@num1hub/capsule-specs/examples/example-note.capsule.json',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json'
  ],
  'cjs-package-ajv-reject-invalid-capsules.cjs': [
    'ajv/dist/2020',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/examples/invalid/example-invalid-missing-neuro-concentrate.capsule.json',
    '@num1hub/capsule-specs/examples/invalid/example-invalid-relation-type.capsule.json'
  ],
  'cjs-package-ajv-reject-invalid-archive-bundles.cjs': [
    'ajv/dist/2020',
    'ajv-formats',
    '@num1hub/capsule-specs/schemas/archive-bundle.schema.json',
    '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-created-at.json',
    '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-content-class.json'
  ],
  'cjs-package-ajv-reject-invalid-validator-envelopes.cjs': [
    'ajv/dist/2020',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json',
    '@num1hub/capsule-specs/examples/api-invalid/validate-request.single.missing-capsule.json',
    '@num1hub/capsule-specs/examples/api-invalid/validate-response.fail.invalid-gate.json'
  ],
  'cjs-package-ajv-validate-client-recipe-index.cjs': [
    'ajv/dist/2020',
    '@num1hub/capsule-specs/schemas/client-recipe-index.schema.json',
    '@num1hub/capsule-specs/examples/client/recipe-index.json'
  ],
  'cjs-package-ajv-reject-invalid-client-recipe-index.cjs': [
    'ajv/dist/2020',
    '@num1hub/capsule-specs/schemas/client-recipe-index.schema.json',
    '@num1hub/capsule-specs/examples/client-invalid/client-recipe-index.missing-files.json',
    '@num1hub/capsule-specs/examples/client-invalid/client-recipe-index.invalid-runtime.json'
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
  'esm-package-ajv-reject-invalid-archive-bundles.mjs': [
    'ajv/dist/2020.js',
    'ajv-formats',
    '@num1hub/capsule-specs/schemas/archive-bundle.schema.json',
    '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-created-at.json',
    '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-content-class.json'
  ],
  'esm-package-ajv-reject-invalid-client-recipe-index.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/client-recipe-index.schema.json',
    '@num1hub/capsule-specs/examples/client-invalid/client-recipe-index.missing-files.json',
    '@num1hub/capsule-specs/examples/client-invalid/client-recipe-index.invalid-runtime.json'
  ],
  'esm-package-ajv-validate-schema-bundles.mjs': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.bundle.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json',
    '@num1hub/capsule-specs/examples/example-note.capsule.json',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json'
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

const expectedPackageTypeImports = {
  'ts-package-ajv-validate-archive-bundle.ts': [
    'ajv/dist/2020.js',
    'ajv-formats',
    '@num1hub/capsule-specs/schemas/archive-bundle.schema.json',
    '@num1hub/capsule-specs/examples/archive/archive-bundle.sample.json'
  ],
  'ts-package-ajv-validate-schema-bundles.ts': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.bundle.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json',
    '@num1hub/capsule-specs/examples/example-note.capsule.json',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json'
  ],
  'ts-package-ajv-validate-contracts.ts': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json',
    '@num1hub/capsule-specs/examples/example-note.capsule.json',
    '@num1hub/capsule-specs/examples/api/validate-request.single.json',
    '@num1hub/capsule-specs/examples/api/validate-response.pass.json'
  ],
  'ts-package-ajv-reject-invalid-capsules.ts': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/examples/invalid/example-invalid-missing-neuro-concentrate.capsule.json',
    '@num1hub/capsule-specs/examples/invalid/example-invalid-relation-type.capsule.json'
  ],
  'ts-package-ajv-reject-invalid-archive-bundles.ts': [
    'ajv/dist/2020.js',
    'ajv-formats',
    '@num1hub/capsule-specs/schemas/archive-bundle.schema.json',
    '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-created-at.json',
    '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-content-class.json'
  ],
  'ts-package-ajv-reject-invalid-validator-envelopes.ts': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/capsule-schema.json',
    '@num1hub/capsule-specs/schemas/neuro-concentrate.schema.json',
    '@num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json',
    '@num1hub/capsule-specs/examples/api-invalid/validate-request.single.missing-capsule.json',
    '@num1hub/capsule-specs/examples/api-invalid/validate-response.fail.invalid-gate.json'
  ],
  'ts-package-ajv-validate-client-recipe-index.ts': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/client-recipe-index.schema.json',
    '@num1hub/capsule-specs/examples/client/recipe-index.json'
  ],
  'ts-package-ajv-reject-invalid-client-recipe-index.ts': [
    'ajv/dist/2020.js',
    '@num1hub/capsule-specs/schemas/client-recipe-index.schema.json',
    '@num1hub/capsule-specs/examples/client-invalid/client-recipe-index.missing-files.json',
    '@num1hub/capsule-specs/examples/client-invalid/client-recipe-index.invalid-runtime.json'
  ]
};

for (const fileName of packageRuntimeRecipes) {
  const recipePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(recipePath, 'utf8');
  for (const importPath of expectedPackageRuntimeImports[fileName]) {
    assert(content.includes(importPath), `${fileName} must import ${importPath}`);
  }
  const syntaxResult = spawnSync(process.execPath, ['--check', recipePath], { encoding: 'utf8' });
  assert(
    syntaxResult.status === 0,
    `${fileName} must be syntactically valid: ${syntaxResult.stderr || syntaxResult.stdout}`
  );
}

for (const fileName of packageTypeRecipes) {
  const recipePath = path.join(clientDir, fileName);
  const content = fs.readFileSync(recipePath, 'utf8');
  for (const importPath of expectedPackageTypeImports[fileName]) {
    assert(content.includes(importPath), `${fileName} must import ${importPath}`);
  }
  checkTypeScriptRecipe(recipePath, fileName);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(
  `OK: checked ${repoLocalRecipes.length} repo-local Ajv schema recipes, ${packageRuntimeRecipes.length} installed-package runtime Ajv recipes, and ${packageTypeRecipes.length} installed-package TypeScript Ajv recipes`
);
