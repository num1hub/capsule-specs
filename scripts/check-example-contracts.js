#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const examplesDir = path.join(repoRoot, 'examples');
const knownIdsPath = path.join(examplesDir, 'example-known-ids.json');

const exampleFiles = [
  'example-note.capsule.json',
  'example-task.capsule.json',
  'example-validator-valid.capsule.json',
  'example-validator-invalid-g16.capsule.json',
  'example-project-hub.capsule.json'
];

const semanticHashPattern = /^(?:[a-z0-9]+-){7}[a-z0-9]+$/;

function wordCount(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

assert(fs.existsSync(knownIdsPath), 'missing known ID catalog example-known-ids.json');
const knownIds = fs.existsSync(knownIdsPath)
  ? JSON.parse(fs.readFileSync(knownIdsPath, 'utf8'))
  : [];
assert(Array.isArray(knownIds), 'known ID catalog must be a JSON array');

const seenIds = new Set();
const exampleCapsules = [];

for (const fileName of exampleFiles) {
  const filePath = path.join(examplesDir, fileName);
  assert(fs.existsSync(filePath), `missing example file ${fileName}`);
  if (!fs.existsSync(filePath)) continue;

  const capsule = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  exampleCapsules.push(capsule);
  assert(semanticHashPattern.test(capsule.metadata.semantic_hash), `${fileName} metadata.semantic_hash must match canonical format`);
  assert(semanticHashPattern.test(capsule.neuro_concentrate.semantic_hash), `${fileName} neuro_concentrate.semantic_hash must match canonical format`);
  assert(
    capsule.metadata.semantic_hash === capsule.neuro_concentrate.semantic_hash,
    `${fileName} semantic hash parity must hold`
  );
  assert(typeof capsule.metadata.capsule_id === 'string' && capsule.metadata.capsule_id.length > 0, `${fileName} must define metadata.capsule_id`);
  assert(!seenIds.has(capsule.metadata.capsule_id), `${fileName} duplicates capsule_id ${capsule.metadata.capsule_id}`);
  seenIds.add(capsule.metadata.capsule_id);
  const keywords = capsule.neuro_concentrate.keywords || [];
  assert(Array.isArray(keywords) && keywords.length >= 5 && keywords.length <= 15, `${fileName} must keep 5-15 keywords`);
  const words = wordCount(capsule.neuro_concentrate.summary || '');
  assert(words >= 70 && words <= 160, `${fileName} summary must stay within 70-160 words`);
}

assert(knownIds.length === exampleCapsules.length, 'known ID catalog must contain one entry per example capsule');

for (const capsule of exampleCapsules) {
  assert(
    knownIds.includes(capsule.metadata.capsule_id),
    `known ID catalog must include ${capsule.metadata.capsule_id}`
  );
}

const invalidExample = JSON.parse(
  fs.readFileSync(path.join(examplesDir, 'example-validator-invalid-g16.capsule.json'), 'utf8')
);
assert(
  /^0{128}$/.test(invalidExample.integrity_sha3_512),
  'negative validator example must keep the intentionally incorrect all-zero G16 hash'
);

const projectHub = JSON.parse(
  fs.readFileSync(path.join(examplesDir, 'example-project-hub.capsule.json'), 'utf8')
);
const projectHubTargets = projectHub.recursive_layer?.links?.map((link) => link.target_id) || [];
assert(projectHubTargets.length >= 3, 'project hub example must keep at least three outbound graph links');
for (const targetId of projectHubTargets) {
  assert(knownIds.includes(targetId), `project hub target ${targetId} must exist in the known ID catalog`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${exampleFiles.length} example files and ${knownIds.length} known IDs`);
