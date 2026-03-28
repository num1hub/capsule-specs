import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

import archiveBundleSchema from '@num1hub/capsule-specs/schemas/archive-bundle.schema.json' with { type: 'json' };
import invalidCreatedAtBundle from '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-created-at.json' with { type: 'json' };
import invalidContentClassBundle from '@num1hub/capsule-specs/examples/archive-invalid/archive-bundle.invalid-content-class.json' with { type: 'json' };

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

const validateArchiveBundle = ajv.compile(archiveBundleSchema);

const createdAtValid = validateArchiveBundle(invalidCreatedAtBundle);
if (createdAtValid !== false) {
  throw new Error('installed invalid-created-at archive bundle should fail schema validation');
}

if (!(validateArchiveBundle.errors ?? []).some((error) => error.keyword === 'format' && error.instancePath === '/createdAt')) {
  throw new Error('installed invalid-created-at archive bundle should fail because createdAt is not a valid date-time');
}

const contentClassValid = validateArchiveBundle(invalidContentClassBundle);
if (contentClassValid !== false) {
  throw new Error('installed invalid-content-class archive bundle should fail schema validation');
}

if (
  !(validateArchiveBundle.errors ?? []).some(
    (error) => error.keyword === 'enum' && error.instancePath === '/manifest/0/contentClass'
  )
) {
  throw new Error('installed invalid-content-class archive bundle should fail because manifest[0].contentClass is not canonical');
}

console.log('OK: rejected invalid archive bundle fixtures from installed package schema exports');
