#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { computeIntegrityHash, INTEGRITY_ROOT_KEYS, INTEGRITY_CANONICALIZATION } = require('./lib/integrity');

const repoRoot = path.resolve(__dirname, '..');
const docsPath = path.join(repoRoot, 'docs', 'integrity-recipes.md');
const clientReadmePath = path.join(repoRoot, 'examples', 'client', 'README.md');
const repoRecipePath = path.join(repoRoot, 'examples', 'client', 'recompute-integrity-seal.mjs');
const packageRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-recompute-integrity-seal.mjs');

const validExamples = [
  'examples/example-note.capsule.json',
  'examples/example-task.capsule.json',
  'examples/example-project-hub.capsule.json',
  'examples/example-validator-valid.capsule.json'
];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const docs = readText('docs/integrity-recipes.md');
const clientReadme = readText('examples/client/README.md');
const invalidG16Example = readJson('examples/example-validator-invalid-g16.capsule.json');
const passResponse = readJson('examples/api/validate-response.pass.json');
const failResponse = readJson('examples/api/validate-response.fail.json');
const batchResponse = readJson('examples/api/validate-response.batch.json');
const fixResponse = readJson('examples/api/validate-response.fix.sample.json');

assert(fs.existsSync(docsPath), 'missing docs/integrity-recipes.md');
assert(fs.existsSync(clientReadmePath), 'missing examples/client/README.md');
assert(fs.existsSync(repoRecipePath), 'missing repo-local integrity recipe');
assert(fs.existsSync(packageRecipePath), 'missing package integrity recipe');

for (const relativePath of [
  'examples/client/recompute-integrity-seal.mjs',
  'examples/client/esm-package-recompute-integrity-seal.mjs',
  'examples/example-note.capsule.json',
  'examples/example-validator-invalid-g16.capsule.json',
  'examples/api/validate-response.fail.json',
  'examples/api/validate-response.fix.sample.json'
]) {
  assert(docs.includes(relativePath.split('/').slice(1).join('/')) || docs.includes(relativePath), `docs/integrity-recipes.md must mention ${relativePath}`);
}

assert(docs.includes('sorted-key canonical JSON'), 'docs/integrity-recipes.md must describe sorted-key canonical JSON');
assert(docs.includes('SHA3-512'), 'docs/integrity-recipes.md must describe SHA3-512 sealing');
assert(docs.includes('G16'), 'docs/integrity-recipes.md must mention G16');
assert(clientReadme.includes('recompute-integrity-seal.mjs'), 'examples/client/README.md must mention recompute-integrity-seal.mjs');
assert(clientReadme.includes('esm-package-recompute-integrity-seal.mjs'), 'examples/client/README.md must mention esm-package-recompute-integrity-seal.mjs');

for (const relativePath of [repoRecipePath, packageRecipePath]) {
  const result = spawnSync(process.execPath, ['--check', relativePath], { encoding: 'utf8' });
  assert(result.status === 0, `${path.basename(relativePath)} must be syntactically valid: ${result.stderr || result.stdout}`);
}

for (const relativePath of validExamples) {
  const capsule = readJson(relativePath);
  const computedHash = computeIntegrityHash(capsule);
  assert(capsule.integrity_sha3_512 === computedHash, `${relativePath} must keep a correct integrity seal`);
}

const expectedInvalidHash = computeIntegrityHash(invalidG16Example);
assert(invalidG16Example.integrity_sha3_512 !== expectedInvalidHash, 'G16-negative example must remain intentionally invalid');

const noteExample = readJson('examples/example-note.capsule.json');
const expectedNoteHash = computeIntegrityHash(noteExample);

assert(passResponse.computedHash === expectedNoteHash, 'pass response computedHash must match the recomputed note seal');
assert(failResponse.computedHash === expectedInvalidHash, 'fail response computedHash must match the recomputed invalid G16 seal');
assert(fixResponse.computedHash === expectedInvalidHash, 'fix response computedHash must match the recomputed invalid G16 seal');
assert(fixResponse.fixedCapsule?.integrity_sha3_512 === expectedInvalidHash, 'fix response fixedCapsule must use the repaired integrity seal');

const batchNote = batchResponse.results?.find((result) => result.capsuleId === noteExample.metadata.capsule_id);
const batchInvalid = batchResponse.results?.find((result) => result.capsuleId === invalidG16Example.metadata.capsule_id);
assert(batchNote?.computedHash === expectedNoteHash, 'batch response note result must match the recomputed note seal');
assert(batchInvalid?.computedHash === expectedInvalidHash, 'batch response invalid result must match the recomputed invalid G16 seal');
assert(Array.isArray(INTEGRITY_ROOT_KEYS) && INTEGRITY_ROOT_KEYS.length === 4, 'integrity helper must keep four integrity payload roots');
assert(INTEGRITY_CANONICALIZATION === 'sorted-key-json', 'integrity helper must keep sorted-key-json canonicalization');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked integrity recipes, ${validExamples.length} sealed examples, and 1 intentional G16 mismatch`);
