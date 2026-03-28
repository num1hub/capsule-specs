const { createHash } = require('crypto');

const INTEGRITY_ROOT_KEYS = [
  'metadata',
  'core_payload',
  'neuro_concentrate',
  'recursive_layer'
];

const INTEGRITY_CANONICALIZATION = 'sorted-key-json';

function compareStrings(left, right) {
  return left.localeCompare(right);
}

function isRecordObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function canonicalizeJson(value) {
  if (value === null) {
    return 'null';
  }

  switch (typeof value) {
    case 'string':
      return JSON.stringify(value);
    case 'number':
      return Number.isFinite(value) ? String(value) : 'null';
    case 'boolean':
      return value ? 'true' : 'false';
    case 'object':
      if (Array.isArray(value)) {
        return `[${value.map((entry) => canonicalizeJson(entry)).join(',')}]`;
      }

      return `{${Object.keys(value)
        .sort(compareStrings)
        .map((key) => `${JSON.stringify(key)}:${canonicalizeJson(value[key])}`)
        .join(',')}}`;
    default:
      throw new Error(`Cannot canonicalize unsupported value type: ${typeof value}`);
  }
}

function extractIntegrityPayload(capsule) {
  if (!isRecordObject(capsule)) {
    throw new Error('Cannot extract integrity payload from a non-object capsule');
  }

  return Object.fromEntries(INTEGRITY_ROOT_KEYS.map((key) => [key, capsule[key]]));
}

function computeIntegrityHash(capsule) {
  return createHash('sha3-512').update(canonicalizeJson(extractIntegrityPayload(capsule))).digest('hex');
}

module.exports = {
  INTEGRITY_ROOT_KEYS,
  INTEGRITY_CANONICALIZATION,
  extractIntegrityPayload,
  canonicalizeJson,
  computeIntegrityHash
};
