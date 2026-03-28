#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

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

function sameArray(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

const pkg = readJson('package.json');
const capsuleSchema = readJson('schemas/capsule-schema.json');
const neuroSchema = readJson('schemas/neuro-concentrate.schema.json');
const validatorSchema = readJson('schemas/validator-api-envelopes.schema.json');
const constants = readJson('references/contract-constants.json');
const gates = readJson('references/validation-gates.json');
const gatesDoc = readText('docs/16-gates.md');

const expectedRootKeys = capsuleSchema.required;
const expectedTypes = capsuleSchema.properties.metadata.properties.type.enum;
const expectedSubtypes = capsuleSchema.properties.metadata.properties.subtype.enum;
const expectedStatuses = capsuleSchema.properties.metadata.properties.status.enum;
const expectedSemanticHashPattern = capsuleSchema.properties.metadata.properties.semantic_hash.pattern;
const expectedRelationTypes = capsuleSchema.properties.recursive_layer.properties.links.items.properties.relation_type.enum;
const expectedConfidenceDimensions = neuroSchema.properties.confidence_vector.required;
const expectedValidationOptionFlags = Object.keys(validatorSchema['$defs'].validationOptions.properties);
const expectedGateSeverityEnum = validatorSchema['$defs'].gateDescriptor.properties.severity.enum;
const expectedIntegrityPattern = capsuleSchema.properties.integrity_sha3_512.pattern;

const expectedFamilies = [
  {
    id: 'structural',
    label: 'Structural gates',
    gate_ids: ['G01', 'G02', 'G03', 'G04', 'G05', 'G06']
  },
  {
    id: 'neuro-semantic',
    label: 'Neuro and semantic gates',
    gate_ids: ['G07', 'G08', 'G09', 'G10', 'G11']
  },
  {
    id: 'topology-confidence',
    label: 'Topology and confidence gates',
    gate_ids: ['G12', 'G13', 'G14', 'G15']
  },
  {
    id: 'cryptographic',
    label: 'Cryptographic gate',
    gate_ids: ['G16']
  }
];

const expectedGates = [
  ['G01', 'structural', 'exactly five root keys'],
  ['G02', 'structural', 'required subfields present'],
  ['G03', 'structural', 'types, enums, and versions match the canonical contract'],
  ['G04', 'structural', 'provenance coverage is high enough and source metadata is present when required'],
  ['G05', 'structural', 'content type is recognized or at least structurally acceptable'],
  ['G06', 'structural', 'payload integrity rules are satisfied'],
  ['G07', 'neuro-semantic', 'summary length is within the allowed range'],
  ['G08', 'neuro-semantic', 'keywords count is within the allowed range'],
  ['G09', 'neuro-semantic', 'semantic hash format is valid'],
  ['G10', 'neuro-semantic', 'semantic hash parity holds between metadata and neuro layer'],
  ['G11', 'neuro-semantic', 'relation types are canonical'],
  ['G12', 'topology-confidence', 'linked target IDs resolve when known-ID validation is active'],
  ['G13', 'topology-confidence', 'non-draft capsules include at least one outbound link'],
  ['G14', 'topology-confidence', 'long capsules cannot claim unrealistically perfect coherence'],
  ['G15', 'topology-confidence', 'the confidence vector has the right shape and value bounds'],
  ['G16', 'cryptographic', '`integrity_sha3_512` matches the recomputed SHA3-512 hash over the canonicalized first four roots']
];

assert(constants.version === pkg.version, 'contract-constants version must match package.json version');
assert(gates.version === pkg.version, 'validation-gates version must match package.json version');

assert(sameArray(constants.capsule_root_keys, expectedRootKeys), 'contract-constants capsule_root_keys must match schema required roots');
assert(sameArray(constants.metadata.type_enum, expectedTypes), 'contract-constants metadata.type_enum must match schema enum');
assert(sameArray(constants.metadata.subtype_enum, expectedSubtypes), 'contract-constants metadata.subtype_enum must match schema enum');
assert(sameArray(constants.metadata.status_enum, expectedStatuses), 'contract-constants metadata.status_enum must match schema enum');
assert(constants.metadata.semantic_hash_pattern === expectedSemanticHashPattern, 'contract-constants semantic_hash_pattern must match schema pattern');
assert(sameArray(constants.relation_types, expectedRelationTypes), 'contract-constants relation_types must match schema enum');
assert(sameArray(constants.confidence_vector.dimensions, expectedConfidenceDimensions), 'contract-constants confidence_vector dimensions must match neuro schema');
assert(constants.confidence_vector.minimum === 0, 'contract-constants confidence_vector minimum must be 0');
assert(constants.confidence_vector.maximum === 1, 'contract-constants confidence_vector maximum must be 1');
assert(sameArray(constants.validator.validation_option_flags, expectedValidationOptionFlags), 'contract-constants validation_option_flags must match validator schema');
assert(sameArray(constants.validator.gate_severity_enum, expectedGateSeverityEnum), 'contract-constants gate_severity_enum must match validator schema');
assert(constants.validator.integrity_sha3_512_pattern === expectedIntegrityPattern, 'contract-constants integrity pattern must match capsule schema');

assert(Array.isArray(gates.families) && sameArray(gates.families, expectedFamilies), 'validation-gates families must match the expected gate-family map');
assert(Array.isArray(gates.gates) && gates.gates.length === expectedGates.length, 'validation-gates must publish all 16 gates');

for (const [index, [id, family, summary]] of expectedGates.entries()) {
  const gate = gates.gates[index];
  assert(gate.id === id, `validation-gates gate ${index} must have id ${id}`);
  assert(gate.family === family, `validation-gates ${id} must belong to ${family}`);
  assert(gate.summary === summary, `validation-gates ${id} summary must match expected public summary`);
  assert(gatesDoc.includes(`- \`${id}\`: ${summary}`), `docs/16-gates.md must contain ${id} summary`);
}

const coveredGateIds = new Set(gates.gates.map((gate) => gate.id));
for (const family of gates.families) {
  for (const gateId of family.gate_ids) {
    assert(coveredGateIds.has(gateId), `validation-gates family ${family.id} references unknown gate ${gateId}`);
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`OK: checked reference pack constants and ${gates.gates.length} validation gates`);
