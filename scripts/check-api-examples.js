#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { computeIntegrityHash } = require('./lib/integrity');

const repoRoot = path.resolve(__dirname, '..');
const apiExamplesDir = path.join(repoRoot, 'examples', 'api');
const examplesDir = path.join(repoRoot, 'examples');

const files = {
  singleRequest: 'validate-request.single.json',
  batchRequest: 'validate-request.batch.json',
  fixRequest: 'validate-request.fix.json',
  passResponse: 'validate-response.pass.json',
  failResponse: 'validate-response.fail.json',
  batchResponse: 'validate-response.batch.json',
  fixResponse: 'validate-response.fix.sample.json',
  gatesResponse: 'gates-response.sample.json',
  statsResponse: 'stats-response.sample.json',
  errorResponse: 'error-response.sample.json',
  unauthorizedResponse: 'unauthorized-response.sample.json',
  conflictResponse: 'conflict-response.sample.json',
  rateLimitResponse: 'rate-limit-response.sample.json'
};

function readJson(fileName) {
  return JSON.parse(fs.readFileSync(path.join(apiExamplesDir, fileName), 'utf8'));
}

function readExample(fileName) {
  return JSON.parse(fs.readFileSync(path.join(examplesDir, fileName), 'utf8'));
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

for (const fileName of Object.values(files)) {
  assert(fs.existsSync(path.join(apiExamplesDir, fileName)), `missing API example ${fileName}`);
}

const singleRequest = readJson(files.singleRequest);
const batchRequest = readJson(files.batchRequest);
const fixRequest = readJson(files.fixRequest);
const passResponse = readJson(files.passResponse);
const failResponse = readJson(files.failResponse);
const batchResponse = readJson(files.batchResponse);
const fixResponse = readJson(files.fixResponse);
const gatesResponse = readJson(files.gatesResponse);
const statsResponse = readJson(files.statsResponse);
const errorResponse = readJson(files.errorResponse);
const unauthorizedResponse = readJson(files.unauthorizedResponse);
const conflictResponse = readJson(files.conflictResponse);
const rateLimitResponse = readJson(files.rateLimitResponse);
const noteExample = readExample('example-note.capsule.json');
const invalidG16Example = readExample('example-validator-invalid-g16.capsule.json');
const computedNoteHash = computeIntegrityHash(noteExample);
const computedInvalidHash = computeIntegrityHash(invalidG16Example);

assert(singleRequest.capsule?.metadata?.capsule_id === 'capsule.example.note.v1', 'single request must target the public note example');
assert(typeof singleRequest.autoFix === 'boolean', 'single request must define autoFix');
assert(Array.isArray(singleRequest.options?.existingIds), 'single request options.existingIds must be an array');
assert(
  JSON.stringify(singleRequest.capsule) === JSON.stringify(noteExample),
  'single request capsule must stay in sync with examples/example-note.capsule.json'
);

assert(Array.isArray(batchRequest.capsules) && batchRequest.capsules.length >= 2, 'batch request must contain at least two capsules');
assert(
  batchRequest.capsules.some((capsule) => capsule.metadata?.capsule_id === 'capsule.example.validator-invalid-g16.v1'),
  'batch request must include the intentional G16-negative example'
);
assert(
  JSON.stringify(batchRequest.capsules[0]) === JSON.stringify(noteExample),
  'batch request first capsule must stay in sync with the public note example'
);
assert(
  batchRequest.capsules.some((capsule) => JSON.stringify(capsule) === JSON.stringify(invalidG16Example)),
  'batch request must embed the exact public G16-negative example'
);

assert(fixRequest.capsule?.metadata?.capsule_id === 'capsule.example.validator-invalid-g16.v1', 'fix request must target the public G16-negative example');
assert(
  JSON.stringify(fixRequest.capsule) === JSON.stringify(invalidG16Example),
  'fix request capsule must stay in sync with examples/example-validator-invalid-g16.capsule.json'
);

assert(passResponse.valid === true, 'pass response must be valid');
assert(Array.isArray(passResponse.errors) && passResponse.errors.length === 0, 'pass response errors must be empty');
assert(Array.isArray(passResponse.appliedFixes), 'pass response must define appliedFixes');
assert(
  passResponse.computedHash === computedNoteHash,
  'pass response computedHash must match the recomputed integrity seal of the public note example'
);

assert(failResponse.valid === false, 'fail response must be invalid');
assert(Array.isArray(failResponse.errors) && failResponse.errors.some((issue) => issue.gate === 'G16'), 'fail response must include a G16 issue');
assert(
  failResponse.computedHash === computedInvalidHash,
  'fail response computedHash must match the recomputed integrity seal for the intentionally broken input example'
);

assert(batchResponse.summary?.total === batchResponse.results?.length, 'batch response summary total must match results length');
assert(batchResponse.summary?.invalid >= 1, 'batch response must include at least one invalid result');
assert(batchResponse.results.some((result) => result.capsuleId === 'capsule.example.note.v1'), 'batch response must mention the note example');
assert(
  batchResponse.results.some((result) => result.capsuleId === 'capsule.example.validator-invalid-g16.v1'),
  'batch response must mention the G16-negative example'
);
assert(
  batchResponse.results.find((result) => result.capsuleId === 'capsule.example.note.v1')?.computedHash === computedNoteHash,
  'batch response must keep the recomputed note integrity hash'
);
assert(
  batchResponse.results.find((result) => result.capsuleId === 'capsule.example.validator-invalid-g16.v1')?.computedHash === computedInvalidHash,
  'batch response must keep the recomputed G16-negative integrity hash'
);

assert(fixResponse.valid === true, 'fix response sample must be valid');
assert(Array.isArray(fixResponse.errors) && fixResponse.errors.length === 0, 'fix response sample must have no errors');
assert(
  JSON.stringify(fixResponse.fixedCapsule) !== JSON.stringify(invalidG16Example),
  'fix response fixedCapsule must differ from the intentionally broken input example'
);
assert(
  fixResponse.fixedCapsule?.integrity_sha3_512 === fixResponse.computedHash,
  'fix response computedHash must match the corrected fixedCapsule seal'
);
assert(
  fixResponse.computedHash === computedInvalidHash,
  'fix response computedHash must match the recomputed integrity seal for the invalid G16 example'
);

assert(Array.isArray(gatesResponse.gates) && gatesResponse.gates.length >= 4, 'gates response sample must contain at least four gates');
assert(gatesResponse.gates.some((gate) => gate.id === 'G16'), 'gates response sample must mention G16');
assert(
  new Set(gatesResponse.gates.map((gate) => gate.id)).size === gatesResponse.gates.length,
  'gates response sample must not duplicate gate IDs'
);

assert(typeof statsResponse.total === 'number' && statsResponse.total >= 1, 'stats response sample must include a numeric total');
assert(Array.isArray(statsResponse.recent), 'stats response sample must include recent entries');
assert(Array.isArray(statsResponse.trend), 'stats response sample must include trend entries');
assert(Array.isArray(statsResponse.gates) && statsResponse.gates.some((gate) => gate.gate === 'G16'), 'stats response sample must include gate aggregates');

assert(typeof errorResponse.error === 'string' && errorResponse.error.length > 0, 'error response sample must include an error string');
assert(unauthorizedResponse.error === 'Unauthorized', 'unauthorized response sample must use a bounded unauthorized message');
assert(typeof conflictResponse.error === 'string' && /conflict/i.test(conflictResponse.error), 'conflict response sample must include a conflict-oriented error string');
assert(typeof rateLimitResponse.error === 'string' && rateLimitResponse.error.length > 0, 'rate-limit response sample must include an error string');

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${Object.keys(files).length} API example files`);
