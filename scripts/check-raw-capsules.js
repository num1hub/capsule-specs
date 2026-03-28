#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const capsulesDir = path.join(repoRoot, 'capsules');

const curatedFiles = [
  'capsule.foundation.capsuleos-schema.v1.json',
  'capsule.foundation.capsuleos.16-gates.v1.json',
  'capsule.foundation.capsuleos.5-element-law.v1.json',
  'capsule.foundation.capsuleos.confidence-vector.v1.json',
  'capsule.foundation.capsuleos.relation-types.v1.json',
  'capsule.foundation.capsuleos.subtype-atomic.v1.json',
  'capsule.foundation.capsuleos.subtype-hub.v1.json',
  'capsule.foundation.capsuleos.versioning-protocol.v1.json'
];

const expectedRootKeys = [
  'metadata',
  'core_payload',
  'neuro_concentrate',
  'recursive_layer',
  'integrity_sha3_512'
];

const expectedConfidenceKeys = [
  'extraction',
  'synthesis',
  'linking',
  'provenance_coverage',
  'validation_score',
  'contradiction_pressure'
];

const relationTypes = new Set([
  'supports',
  'contradicts',
  'extends',
  'derived_from',
  'depends_on',
  'references',
  'duplicates',
  'implements',
  'part_of'
]);

const semanticHashPattern = /^(?:[a-z0-9]+-){7}[a-z0-9]+$/;
const integrityPattern = /^[a-f0-9]{128}$/;
const versionPattern = /^\d+\.\d+\.\d+$/;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function wordCount(value) {
  return String(value || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

const actualFiles = fs
  .readdirSync(capsulesDir)
  .filter((name) => name.endsWith('.json'))
  .sort();

assert(
  JSON.stringify(actualFiles) === JSON.stringify([...curatedFiles].sort()),
  'capsules/ JSON set must stay explicitly curated and match the verifier list'
);

for (const fileName of curatedFiles) {
  const filePath = path.join(capsulesDir, fileName);
  assert(fs.existsSync(filePath), `missing curated raw capsule ${fileName}`);
  if (!fs.existsSync(filePath)) continue;

  const capsule = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const rootKeys = Object.keys(capsule);
  assert(
    JSON.stringify(rootKeys) === JSON.stringify(expectedRootKeys),
    `${fileName} must keep the canonical five-root order`
  );

  assert(
    capsule.metadata?.capsule_id === fileName.replace(/\.json$/, ''),
    `${fileName} must match metadata.capsule_id`
  );
  assert(capsule.metadata?.type === 'foundation', `${fileName} must remain a foundation capsule`);
  assert(versionPattern.test(capsule.metadata?.version || ''), `${fileName} must use X.Y.Z version format`);
  assert(
    semanticHashPattern.test(capsule.metadata?.semantic_hash || ''),
    `${fileName} metadata.semantic_hash must match canonical format`
  );
  assert(
    semanticHashPattern.test(capsule.neuro_concentrate?.semantic_hash || ''),
    `${fileName} neuro_concentrate.semantic_hash must match canonical format`
  );
  assert(
    capsule.metadata?.semantic_hash === capsule.neuro_concentrate?.semantic_hash,
    `${fileName} semantic hash parity must hold`
  );
  assert(
    typeof capsule.core_payload?.content_type === 'string' && capsule.core_payload.content_type.length > 0,
    `${fileName} must define core_payload.content_type`
  );
  assert(
    typeof capsule.core_payload?.content === 'string' && capsule.core_payload.content.length > 0,
    `${fileName} must define core_payload.content`
  );

  const summaryWords = wordCount(capsule.neuro_concentrate?.summary);
  assert(summaryWords >= 70 && summaryWords <= 160, `${fileName} summary must stay within 70-160 words`);

  const keywords = capsule.neuro_concentrate?.keywords || [];
  assert(Array.isArray(keywords) && keywords.length >= 5 && keywords.length <= 15, `${fileName} must keep 5-15 keywords`);

  const confidenceVector = capsule.neuro_concentrate?.confidence_vector || {};
  const confidenceKeys = Object.keys(confidenceVector).sort();
  assert(
    JSON.stringify(confidenceKeys) === JSON.stringify([...expectedConfidenceKeys].sort()),
    `${fileName} confidence_vector must keep the canonical six dimensions`
  );
  for (const key of expectedConfidenceKeys) {
    const value = confidenceVector[key];
    assert(typeof value === 'number' && value >= 0 && value <= 1, `${fileName} confidence_vector.${key} must stay within 0..1`);
  }

  const links = capsule.recursive_layer?.links || [];
  assert(Array.isArray(links) && links.length >= 1, `${fileName} must keep at least one outbound link`);
  for (const [index, link] of links.entries()) {
    assert(typeof link.target_id === 'string' && link.target_id.length > 0, `${fileName} link ${index} must define target_id`);
    assert(relationTypes.has(link.relation_type), `${fileName} link ${index} must use a canonical relation_type`);
  }

  assert(integrityPattern.test(capsule.integrity_sha3_512 || ''), `${fileName} integrity_sha3_512 must stay a lowercase SHA3-512 hex digest`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked ${curatedFiles.length} curated raw capsule files`);
