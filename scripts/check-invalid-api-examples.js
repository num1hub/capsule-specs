#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const Ajv2020 = require('ajv/dist/2020');

const repoRoot = path.resolve(__dirname, '..');
const invalidDir = path.join(repoRoot, 'examples', 'api-invalid');
const schemaPath = path.join(repoRoot, 'schemas', 'validator-api-envelopes.schema.json');
const capsuleSchemaPath = path.join(repoRoot, 'schemas', 'capsule-schema.json');
const neuroSchemaPath = path.join(repoRoot, 'schemas', 'neuro-concentrate.schema.json');
const docsPath = path.join(repoRoot, 'docs', 'invalid-api-envelope-examples.md');
const readmePath = path.join(invalidDir, 'README.md');
const repoRecipePath = path.join(repoRoot, 'examples', 'client', 'ajv-reject-invalid-validator-envelopes.mjs');
const packageRecipePaths = [
  path.join(repoRoot, 'examples', 'client', 'cjs-package-ajv-reject-invalid-validator-envelopes.cjs'),
  path.join(repoRoot, 'examples', 'client', 'esm-package-ajv-reject-invalid-validator-envelopes.mjs'),
  path.join(repoRoot, 'examples', 'client', 'ts-package-ajv-reject-invalid-validator-envelopes.ts')
];

const fixtures = [
  {
    path: 'examples/api-invalid/validate-request.single.missing-capsule.json',
    schemaRef: '#/$defs/validateSingleRequest',
    predicate: (error) => error.keyword === 'required' && error.params?.missingProperty === 'capsule'
  },
  {
    path: 'examples/api-invalid/validate-response.fail.invalid-gate.json',
    schemaRef: '#/$defs/validateFailResponse',
    predicate: (error) => error.keyword === 'pattern' && error.instancePath === '/errors/0/gate'
  }
];

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const capsuleSchema = JSON.parse(fs.readFileSync(capsuleSchemaPath, 'utf8'));
const neuroSchema = JSON.parse(fs.readFileSync(neuroSchemaPath, 'utf8'));
const validatorSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const docs = fs.readFileSync(docsPath, 'utf8');
const readme = fs.readFileSync(readmePath, 'utf8');

const ajv = new Ajv2020({ allErrors: true, strict: true });
ajv.addSchema(neuroSchema);
ajv.addSchema(capsuleSchema);
ajv.addSchema(validatorSchema);

assert(fs.existsSync(docsPath), 'missing docs/invalid-api-envelope-examples.md');
assert(fs.existsSync(readmePath), 'missing examples/api-invalid/README.md');
assert(fs.existsSync(repoRecipePath), 'missing repo-local invalid API recipe');
for (const recipePath of packageRecipePaths) {
  assert(fs.existsSync(recipePath), `missing ${path.relative(repoRoot, recipePath)}`);
}

for (const fixture of fixtures) {
  const absolutePath = path.join(repoRoot, fixture.path);
  assert(fs.existsSync(absolutePath), `missing invalid API fixture ${fixture.path}`);

  const validate = ajv.getSchema(`${validatorSchema.$id}${fixture.schemaRef}`);
  assert(validate, `missing validator-envelope subschema ${fixture.schemaRef}`);

  const payload = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  const valid = validate(payload);
  const errors = validate.errors ?? [];

  assert(valid === false, `${fixture.path} must fail validator-envelope schema validation`);
  assert(errors.some(fixture.predicate), `${fixture.path} must fail with the documented schema error`);
  assert(docs.includes(path.basename(fixture.path)), `docs/invalid-api-envelope-examples.md must mention ${path.basename(fixture.path)}`);
  assert(readme.includes(path.basename(fixture.path)), `examples/api-invalid/README.md must mention ${path.basename(fixture.path)}`);
}

assert(
  docs.includes('validate-response.fail.json'),
  'docs/invalid-api-envelope-examples.md must distinguish invalid API fixtures from the valid negative G16 response example'
);
assert(
  readme.includes('../api/'),
  'examples/api-invalid/README.md must distinguish invalid fixtures from structurally valid API examples'
);

assert(docs.includes('cjs-package-ajv-reject-invalid-validator-envelopes.cjs'), 'docs/invalid-api-envelope-examples.md must mention cjs-package-ajv-reject-invalid-validator-envelopes.cjs');
assert(docs.includes('esm-package-ajv-reject-invalid-validator-envelopes.mjs'), 'docs/invalid-api-envelope-examples.md must mention esm-package-ajv-reject-invalid-validator-envelopes.mjs');
assert(docs.includes('ts-package-ajv-reject-invalid-validator-envelopes.ts'), 'docs/invalid-api-envelope-examples.md must mention ts-package-ajv-reject-invalid-validator-envelopes.ts');

for (const recipePath of [repoRecipePath, ...packageRecipePaths]) {
  const syntaxResult = spawnSync(process.execPath, ['--check', recipePath], { encoding: 'utf8' });
  assert(
    syntaxResult.status === 0,
    `${path.basename(recipePath)} must be syntactically valid: ${syntaxResult.stderr || syntaxResult.stdout}`
  );
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${fixtures.length} invalid API envelope fixtures and their documented schema-failure expectations`);
