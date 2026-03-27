#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const schemaPath = path.join(repoRoot, 'schemas', 'validator-api-envelopes.schema.json');
const apiExamplesDir = path.join(repoRoot, 'examples', 'api');

const exampleSchemaMap = {
  'validate-request.single.json': '#/$defs/validateSingleRequest',
  'validate-request.batch.json': '#/$defs/validateBatchRequest',
  'validate-request.fix.json': '#/$defs/validateFixRequest',
  'validate-response.pass.json': '#/$defs/validatePassResponse',
  'validate-response.fail.json': '#/$defs/validateFailResponse',
  'validate-response.batch.json': '#/$defs/validateBatchResponse',
  'validate-response.fix.sample.json': '#/$defs/validateFixResponse',
  'gates-response.sample.json': '#/$defs/gatesResponse',
  'stats-response.sample.json': '#/$defs/statsResponse',
  'error-response.sample.json': '#/$defs/simpleErrorResponse',
  'unauthorized-response.sample.json': '#/$defs/simpleErrorResponse',
  'conflict-response.sample.json': '#/$defs/simpleErrorResponse',
  'rate-limit-response.sample.json': '#/$defs/simpleErrorResponse'
};

const requiredDefs = [
  'validationOptions',
  'validatorIssue',
  'validateSingleRequest',
  'validateBatchRequest',
  'validateFixRequest',
  'validatePassResponse',
  'validateFailResponse',
  'validateBatchResponse',
  'validateFixResponse',
  'gatesResponse',
  'statsResponse',
  'simpleErrorResponse'
];

const schemaCache = new Map();
let failures = 0;

function fail(message) {
  console.error(`FAIL: ${message}`);
  failures += 1;
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function loadSchema(schemaFilePath) {
  if (!schemaCache.has(schemaFilePath)) {
    schemaCache.set(schemaFilePath, JSON.parse(fs.readFileSync(schemaFilePath, 'utf8')));
  }
  return schemaCache.get(schemaFilePath);
}

function resolvePointer(document, pointer) {
  if (!pointer || pointer === '#') return document;
  const parts = pointer.replace(/^#\//, '').split('/').filter(Boolean);
  let current = document;
  for (const part of parts) {
    const key = part.replace(/~1/g, '/').replace(/~0/g, '~');
    current = current?.[key];
  }
  return current;
}

function resolveRef(ref, baseFilePath) {
  const [filePart, fragment = ''] = ref.split('#');
  const targetFilePath = filePart
    ? path.resolve(path.dirname(baseFilePath), filePart)
    : baseFilePath;
  const document = loadSchema(targetFilePath);
  const resolved = fragment ? resolvePointer(document, `#${fragment}`) : document;
  return { schema: resolved, filePath: targetFilePath };
}

function typeMatches(value, expectedType) {
  if (expectedType === 'array') return Array.isArray(value);
  if (expectedType === 'object') return value !== null && typeof value === 'object' && !Array.isArray(value);
  if (expectedType === 'integer') return Number.isInteger(value);
  return typeof value === expectedType;
}

function validateSchema(value, schema, baseFilePath, trail) {
  if (!schema || Object.keys(schema).length === 0) {
    return [];
  }

  if (schema.$ref) {
    const { schema: resolved, filePath } = resolveRef(schema.$ref, baseFilePath);
    return validateSchema(value, resolved, filePath, trail);
  }

  const errors = [];

  if (schema.const !== undefined && JSON.stringify(value) !== JSON.stringify(schema.const)) {
    errors.push(`${trail} must equal ${JSON.stringify(schema.const)}`);
    return errors;
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${trail} must be one of ${schema.enum.join(', ')}`);
    return errors;
  }

  if (schema.type) {
    const expectedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
    const matches = expectedTypes.some((expectedType) => typeMatches(value, expectedType));
    if (!matches) {
      errors.push(`${trail} must be of type ${expectedTypes.join(' or ')}`);
      return errors;
    }
  }

  if (typeof value === 'string') {
    if (typeof schema.minLength === 'number' && value.length < schema.minLength) {
      errors.push(`${trail} must have length >= ${schema.minLength}`);
    }
    if (schema.pattern) {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value)) {
        errors.push(`${trail} must match ${schema.pattern}`);
      }
    }
  }

  if (typeof value === 'number') {
    if (typeof schema.minimum === 'number' && value < schema.minimum) {
      errors.push(`${trail} must be >= ${schema.minimum}`);
    }
    if (typeof schema.maximum === 'number' && value > schema.maximum) {
      errors.push(`${trail} must be <= ${schema.maximum}`);
    }
  }

  if (Array.isArray(value)) {
    if (typeof schema.minItems === 'number' && value.length < schema.minItems) {
      errors.push(`${trail} must contain at least ${schema.minItems} item(s)`);
    }
    if (typeof schema.maxItems === 'number' && value.length > schema.maxItems) {
      errors.push(`${trail} must contain at most ${schema.maxItems} item(s)`);
    }
    if (schema.items) {
      value.forEach((item, index) => {
        errors.push(...validateSchema(item, schema.items, baseFilePath, `${trail}[${index}]`));
      });
    }
  }

  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    const properties = schema.properties || {};
    const required = schema.required || [];

    for (const key of required) {
      if (!(key in value)) {
        errors.push(`${trail}.${key} is required`);
      }
    }

    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!(key in properties)) {
          errors.push(`${trail}.${key} is not allowed`);
        }
      }
    }

    for (const [key, propertySchema] of Object.entries(properties)) {
      if (key in value) {
        errors.push(...validateSchema(value[key], propertySchema, baseFilePath, `${trail}.${key}`));
      }
    }
  }

  return errors;
}

assert(fs.existsSync(schemaPath), 'missing schemas/validator-api-envelopes.schema.json');
const rootSchema = loadSchema(schemaPath);

assert(rootSchema.$schema === 'https://json-schema.org/draft/2020-12/schema', 'validator API schema must declare draft 2020-12');
assert(
  rootSchema.$id === 'https://github.com/num1hub/capsule-specs/schemas/validator-api-envelopes.schema.json',
  'validator API schema must declare the expected public $id'
);
assert(rootSchema.$defs && typeof rootSchema.$defs === 'object', 'validator API schema must declare $defs');

for (const defName of requiredDefs) {
  assert(rootSchema.$defs?.[defName], `validator API schema missing $defs.${defName}`);
}

for (const [fileName, ref] of Object.entries(exampleSchemaMap)) {
  const filePath = path.join(apiExamplesDir, fileName);
  assert(fs.existsSync(filePath), `missing API example ${fileName}`);
  if (!fs.existsSync(filePath)) continue;
  const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const { schema } = resolveRef(ref, schemaPath);
  const errors = validateSchema(payload, schema, schemaPath, fileName);
  for (const error of errors) {
    fail(error);
  }
}

if (failures > 0) {
  process.exit(1);
}

console.log(`OK: validated ${Object.keys(exampleSchemaMap).length} API examples against validator-api-envelopes.schema.json`);
