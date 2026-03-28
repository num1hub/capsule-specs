#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const Ajv2020 = require('ajv/dist/2020');
const { computeIntegrityHash } = require('./lib/integrity');

const repoRoot = path.resolve(__dirname, '..');
const invalidDir = path.join(repoRoot, 'examples', 'invalid');
const schemaPath = path.join(repoRoot, 'schemas', 'capsule-schema.json');
const neuroSchemaPath = path.join(repoRoot, 'schemas', 'neuro-concentrate.schema.json');
const invalidDocsPath = path.join(repoRoot, 'docs', 'invalid-capsule-examples.md');
const invalidReadmePath = path.join(invalidDir, 'README.md');
const repoRecipePath = path.join(repoRoot, 'examples', 'client', 'ajv-reject-invalid-capsules.mjs');
const packageRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-ajv-reject-invalid-capsules.mjs');

const invalidFixtures = [
  {
    path: 'examples/invalid/example-invalid-missing-neuro-concentrate.capsule.json',
    predicate: (error) => error.keyword === 'required' && error.params?.missingProperty === 'neuro_concentrate'
  },
  {
    path: 'examples/invalid/example-invalid-relation-type.capsule.json',
    predicate: (error) =>
      error.keyword === 'enum' && error.instancePath === '/recursive_layer/links/0/relation_type'
  }
];

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const capsuleSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const neuroSchema = JSON.parse(fs.readFileSync(neuroSchemaPath, 'utf8'));
const invalidDoc = fs.readFileSync(invalidDocsPath, 'utf8');
const invalidReadme = fs.readFileSync(invalidReadmePath, 'utf8');

const ajv = new Ajv2020({ allErrors: true, strict: true });
ajv.addSchema(neuroSchema);
ajv.addSchema(capsuleSchema);
const validateCapsule = ajv.getSchema(capsuleSchema.$id) ?? ajv.compile(capsuleSchema);

assert(fs.existsSync(invalidDocsPath), 'missing docs/invalid-capsule-examples.md');
assert(fs.existsSync(invalidReadmePath), 'missing examples/invalid/README.md');
assert(fs.existsSync(repoRecipePath), 'missing repo-local invalid-example recipe');
assert(fs.existsSync(packageRecipePath), 'missing package invalid-example recipe');

for (const fixture of invalidFixtures) {
  const absolutePath = path.join(repoRoot, fixture.path);
  assert(fs.existsSync(absolutePath), `missing invalid fixture ${fixture.path}`);
  const payload = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  const valid = validateCapsule(payload);
  const errors = validateCapsule.errors ?? [];

  assert(valid === false, `${fixture.path} must fail capsule-schema validation`);
  assert(errors.some(fixture.predicate), `${fixture.path} must fail with the documented schema error`);
  assert(invalidDoc.includes(fixture.path.replace('../', '')) || invalidDoc.includes(path.basename(fixture.path)), `docs/invalid-capsule-examples.md must mention ${fixture.path}`);
  assert(invalidReadme.includes(path.basename(fixture.path)), `examples/invalid/README.md must mention ${path.basename(fixture.path)}`);

  if (fixture.path.endsWith('example-invalid-relation-type.capsule.json')) {
    assert(
      payload.integrity_sha3_512 === computeIntegrityHash(payload),
      `${fixture.path} should keep a correct integrity seal so the documented failure stays isolated to relation_type`
    );
  }
}

assert(invalidDoc.includes('example-validator-invalid-g16.capsule.json'), 'invalid capsule examples doc must distinguish schema-invalid fixtures from the validator-only G16 example');
assert(invalidReadme.includes('G16'), 'examples/invalid/README.md must distinguish schema-invalid fixtures from the validator-only G16 example');

for (const recipePath of [repoRecipePath, packageRecipePath]) {
  const syntaxResult = spawnSync(process.execPath, ['--check', recipePath], { encoding: 'utf8' });
  assert(syntaxResult.status === 0, `${path.basename(recipePath)} must be syntactically valid: ${syntaxResult.stderr || syntaxResult.stdout}`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${invalidFixtures.length} invalid capsule fixtures and their documented schema-failure expectations`);
