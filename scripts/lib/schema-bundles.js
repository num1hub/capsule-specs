const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function stripEmbeddedSchemaMetadata(schema) {
  const embedded = clone(schema);
  delete embedded.$schema;
  delete embedded.$id;
  return embedded;
}

function rewriteStringRefs(value, from, to) {
  if (Array.isArray(value)) {
    return value.map((item) => rewriteStringRefs(item, from, to));
  }

  if (value && typeof value === 'object') {
    const next = {};
    for (const [key, item] of Object.entries(value)) {
      next[key] = rewriteStringRefs(item, from, to);
    }
    return next;
  }

  if (value === from) {
    return to;
  }

  return value;
}

function buildCapsuleSchemaBundle() {
  const capsuleSchema = clone(readJson('schemas/capsule-schema.json'));
  const neuroSchema = stripEmbeddedSchemaMetadata(readJson('schemas/neuro-concentrate.schema.json'));

  capsuleSchema.$id = 'https://github.com/num1hub/capsule-specs/schemas/capsule-schema.bundle.json';
  capsuleSchema.description =
    'Single-file public JSON Schema bundle for the five-element capsule shape used by N1Hub and CapsuleOS.';
  capsuleSchema.$defs = {
    ...(capsuleSchema.$defs || {}),
    neuroConcentrate: neuroSchema
  };
  capsuleSchema.properties.neuro_concentrate = {
    $ref: '#/$defs/neuroConcentrate'
  };

  return capsuleSchema;
}

function buildValidatorApiSchemaBundle() {
  const validatorSchema = rewriteStringRefs(
    clone(readJson('schemas/validator-api-envelopes.schema.json')),
    './capsule-schema.json',
    '#/$defs/capsule'
  );
  const bundledCapsuleSchema = stripEmbeddedSchemaMetadata(readJson('schemas/capsule-schema.json'));
  const neuroSchema = stripEmbeddedSchemaMetadata(readJson('schemas/neuro-concentrate.schema.json'));

  bundledCapsuleSchema.properties.neuro_concentrate = {
    $ref: '#/$defs/neuroConcentrate'
  };

  validatorSchema.$id = 'https://github.com/num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json';
  validatorSchema.description =
    'Single-file public JSON Schema bundle for validator-facing request and response envelopes published in the N1Hub specs repository.';
  validatorSchema.$defs = {
    ...(validatorSchema.$defs || {}),
    capsule: bundledCapsuleSchema,
    neuroConcentrate: neuroSchema
  };

  return validatorSchema;
}

module.exports = {
  buildCapsuleSchemaBundle,
  buildValidatorApiSchemaBundle
};
