#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildCapsuleSchemaBundle, buildValidatorApiSchemaBundle } = require('./lib/schema-bundles');

const repoRoot = path.resolve(__dirname, '..');

function writeJson(relativePath, value) {
  fs.writeFileSync(path.join(repoRoot, relativePath), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

writeJson('schemas/capsule-schema.bundle.json', buildCapsuleSchemaBundle());
writeJson('schemas/validator-api-envelopes.bundle.json', buildValidatorApiSchemaBundle());

console.log('OK: wrote schema bundle artifacts');
