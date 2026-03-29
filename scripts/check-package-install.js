#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8'
  });

  if (result.status !== 0) {
    const detail = result.stderr || result.stdout || 'unknown error';
    throw new Error(`${command} ${args.join(' ')} failed in ${cwd}: ${detail}`);
  }

  return result.stdout;
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function safeRemove(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

const workspaceRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'capsule-specs-install-'));
const packedFilePath = path.join(workspaceRoot, 'tarball.json');
let tarballPath = null;
const cjsErrorRecipePath = path.join(repoRoot, 'examples', 'client', 'cjs-package-error-responses.cjs');
const cjsLiveClientRecipePath = path.join(repoRoot, 'examples', 'client', 'cjs-package-live-validator-client.cjs');
const cjsOpenapiRecipePath = path.join(repoRoot, 'examples', 'client', 'cjs-package-openapi-reference.cjs');
const cjsValidateRequestRecipePath = path.join(repoRoot, 'examples', 'client', 'cjs-package-validate-request.cjs');
const cjsSupportRecipePath = path.join(repoRoot, 'examples', 'client', 'cjs-package-support-responses.cjs');
const cjsValidateResponseRecipePath = path.join(repoRoot, 'examples', 'client', 'cjs-package-validate-response.cjs');
const esmErrorRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-error-responses.mjs');
const esmReferenceRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-contract-reference.mjs');
const esmLiveClientRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-live-validator-client.mjs');
const esmOpenapiCodegenRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-openapi-codegen.mjs');
const esmOpenapiRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-openapi-reference.mjs');
const esmValidateRequestRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-validate-request.mjs');
const esmSupportRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-support-responses.mjs');
const esmValidateResponseRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-validate-response.mjs');
const typescriptErrorRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-error-responses.ts');
const typescriptBatchRequestRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-validate-batch-request.ts');
const typescriptConsumerRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-validate-request.ts');
const typescriptFixRequestRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-validate-fix-request.ts');
const typescriptLiveClientRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-live-validator-client.ts');
const typescriptOpenapiRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-openapi-reference.ts');
const typescriptParseRequestsRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-parse-validate-requests.ts');
const typescriptValidateResponsesRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-validate-responses.ts');
const typescriptReferenceRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-contract-reference.ts');
const typescriptSupportRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-support-responses.ts');
const packageSchemaRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-ajv-validate-contracts.mjs');
const packageArchiveRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-ajv-validate-archive-bundle.mjs');
const packageBundleRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-ajv-validate-schema-bundles.mjs');
const packageInvalidArchiveRecipePath = path.join(
  repoRoot,
  'examples',
  'client',
  'esm-package-ajv-reject-invalid-archive-bundles.mjs'
);
const packageInvalidSchemaRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-ajv-reject-invalid-capsules.mjs');
const packageInvalidApiRecipePath = path.join(
  repoRoot,
  'examples',
  'client',
  'esm-package-ajv-reject-invalid-validator-envelopes.mjs'
);
const packageIntegrityRecipePath = path.join(repoRoot, 'examples', 'client', 'esm-package-recompute-integrity-seal.mjs');

try {
  const packOutput = run('npm', ['pack', '--json', '--pack-destination', workspaceRoot], repoRoot);
  fs.writeFileSync(packedFilePath, packOutput, 'utf8');
  const parsedPack = JSON.parse(packOutput);
  const tarballFileName = parsedPack[0]?.filename;

  if (!tarballFileName) {
    throw new Error('npm pack did not report a filename');
  }

  tarballPath = path.join(workspaceRoot, tarballFileName);

  const cjsProject = path.join(workspaceRoot, 'consumer-cjs');
  fs.mkdirSync(cjsProject, { recursive: true });
  writeJson(path.join(cjsProject, 'package.json'), {
    name: 'capsule-specs-consumer-cjs',
    private: true
  });
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', tarballPath], cjsProject);
  fs.writeFileSync(
    path.join(cjsProject, 'consumer.cjs'),
    [
      "const rootProjection = require('@num1hub/capsule-specs');",
      "const { capsuleSchema } = require('@num1hub/capsule-specs/zod');",
      "const { validatePassResponseSchema } = require('@num1hub/capsule-specs/zod/validator-api');",
      "const capsuleSchemaJson = require('@num1hub/capsule-specs/schemas/capsule-schema.json');",
      "const contractConstants = require('@num1hub/capsule-specs/references/contract-constants.json');",
      "const validationGates = require('@num1hub/capsule-specs/references/validation-gates.json');",
      "const rawConfidenceCapsule = require('@num1hub/capsule-specs/capsules/capsule.foundation.capsuleos.confidence-vector.v1.json');",
      "const note = require('@num1hub/capsule-specs/examples/example-note.capsule.json');",
      "const passResponse = require('@num1hub/capsule-specs/examples/api/validate-response.pass.json');",
      "if (!rootProjection.typescript || !rootProjection.zod) throw new Error('missing root namespaces');",
      "if (capsuleSchemaJson.$id !== 'https://github.com/num1hub/capsule-specs/schemas/capsule-schema.json') throw new Error('unexpected schema id');",
      "if (contractConstants.relation_types.length !== 9) throw new Error('missing reference constants export');",
      "if (validationGates.gates.length !== 16) throw new Error('missing validation gate export');",
      "if (rawConfidenceCapsule.metadata.capsule_id !== 'capsule.foundation.capsuleos.confidence-vector.v1') throw new Error('missing raw capsule export');",
      "const parsedNote = capsuleSchema.parse(note);",
      "const parsedResponse = validatePassResponseSchema.parse(passResponse);",
      "if (parsedNote.metadata.capsule_id !== note.metadata.capsule_id) throw new Error('failed capsule parse');",
      "if (parsedResponse.valid !== true) throw new Error('failed pass-response parse');"
    ].join('\n'),
    'utf8'
  );
  run(process.execPath, ['consumer.cjs'], cjsProject);
  fs.writeFileSync(path.join(cjsProject, 'error-consumer.cjs'), fs.readFileSync(cjsErrorRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['error-consumer.cjs'], cjsProject);
  fs.writeFileSync(
    path.join(cjsProject, 'live-client-consumer.cjs'),
    fs.readFileSync(cjsLiveClientRecipePath, 'utf8'),
    'utf8'
  );
  run(process.execPath, ['live-client-consumer.cjs'], cjsProject);
  fs.writeFileSync(path.join(cjsProject, 'openapi-consumer.cjs'), fs.readFileSync(cjsOpenapiRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['openapi-consumer.cjs'], cjsProject);
  fs.writeFileSync(
    path.join(cjsProject, 'validate-request-consumer.cjs'),
    fs.readFileSync(cjsValidateRequestRecipePath, 'utf8'),
    'utf8'
  );
  run(process.execPath, ['validate-request-consumer.cjs'], cjsProject);
  fs.writeFileSync(
    path.join(cjsProject, 'validate-response-consumer.cjs'),
    fs.readFileSync(cjsValidateResponseRecipePath, 'utf8'),
    'utf8'
  );
  run(process.execPath, ['validate-response-consumer.cjs'], cjsProject);
  fs.writeFileSync(path.join(cjsProject, 'support-consumer.cjs'), fs.readFileSync(cjsSupportRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['support-consumer.cjs'], cjsProject);

  const esmProject = path.join(workspaceRoot, 'consumer-esm');
  fs.mkdirSync(esmProject, { recursive: true });
  writeJson(path.join(esmProject, 'package.json'), {
    name: 'capsule-specs-consumer-esm',
    private: true,
    type: 'module'
  });
  run(
    'npm',
    ['install', '--ignore-scripts', '--no-audit', '--no-fund', tarballPath, 'ajv', 'ajv-formats', 'openapi-typescript'],
    esmProject
  );
  fs.writeFileSync(
    path.join(esmProject, 'consumer.mjs'),
    [
      "import * as rootProjection from '@num1hub/capsule-specs';",
      "import * as zodProjection from '@num1hub/capsule-specs/zod';",
      "import * as validatorProjection from '@num1hub/capsule-specs/zod/validator-api';",
      "import capsuleSchemaJson from '@num1hub/capsule-specs/schemas/capsule-schema.json' with { type: 'json' };",
      "import archiveBundleSchemaJson from '@num1hub/capsule-specs/schemas/archive-bundle.schema.json' with { type: 'json' };",
      "import capsuleBundleJson from '@num1hub/capsule-specs/schemas/capsule-schema.bundle.json' with { type: 'json' };",
      "import validatorBundleJson from '@num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json' with { type: 'json' };",
      "import contractConstants from '@num1hub/capsule-specs/references/contract-constants.json' with { type: 'json' };",
      "import validationGates from '@num1hub/capsule-specs/references/validation-gates.json' with { type: 'json' };",
      "import rawConfidenceCapsule from '@num1hub/capsule-specs/capsules/capsule.foundation.capsuleos.confidence-vector.v1.json' with { type: 'json' };",
      "import note from '@num1hub/capsule-specs/examples/example-note.capsule.json' with { type: 'json' };",
      "import passResponse from '@num1hub/capsule-specs/examples/api/validate-response.pass.json' with { type: 'json' };",
      "const rootNamespace = rootProjection.default ?? rootProjection;",
      "const capsuleSchema = zodProjection.capsuleSchema ?? zodProjection.default?.capsuleSchema;",
      "const validatePassResponseSchema = validatorProjection.validatePassResponseSchema ?? validatorProjection.default?.validatePassResponseSchema;",
      "if (!rootNamespace.typescript || !rootNamespace.zod) throw new Error('missing root namespaces');",
      "if (!capsuleSchema || !validatePassResponseSchema) throw new Error('missing zod exports');",
      "if (capsuleSchemaJson.$id !== 'https://github.com/num1hub/capsule-specs/schemas/capsule-schema.json') throw new Error('unexpected schema id');",
      "if (archiveBundleSchemaJson.$id !== 'https://github.com/num1hub/capsule-specs/schemas/archive-bundle.schema.json') throw new Error('unexpected archive schema id');",
      "if (capsuleBundleJson.$id !== 'https://github.com/num1hub/capsule-specs/schemas/capsule-schema.bundle.json') throw new Error('unexpected capsule bundle id');",
      "if (validatorBundleJson.$id !== 'https://github.com/num1hub/capsule-specs/schemas/validator-api-envelopes.bundle.json') throw new Error('unexpected validator bundle id');",
      "if (contractConstants.relation_types.length !== 9) throw new Error('missing reference constants export');",
      "if (validationGates.gates.length !== 16) throw new Error('missing validation gate export');",
      "if (rawConfidenceCapsule.metadata.capsule_id !== 'capsule.foundation.capsuleos.confidence-vector.v1') throw new Error('missing raw capsule export');",
      "const parsedNote = capsuleSchema.parse(note);",
      "const parsedResponse = validatePassResponseSchema.parse(passResponse);",
      "if (parsedNote.metadata.capsule_id !== note.metadata.capsule_id) throw new Error('failed capsule parse');",
      "if (parsedResponse.valid !== true) throw new Error('failed pass-response parse');"
    ].join('\n'),
    'utf8'
  );
  run(process.execPath, ['consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'reference-consumer.mjs'), fs.readFileSync(esmReferenceRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['reference-consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'error-consumer.mjs'), fs.readFileSync(esmErrorRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['error-consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'live-client-consumer.mjs'), fs.readFileSync(esmLiveClientRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['live-client-consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'openapi-consumer.mjs'), fs.readFileSync(esmOpenapiRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['openapi-consumer.mjs'], esmProject);
  fs.writeFileSync(
    path.join(esmProject, 'openapi-codegen-consumer.mjs'),
    fs.readFileSync(esmOpenapiCodegenRecipePath, 'utf8'),
    'utf8'
  );
  run(process.execPath, ['openapi-codegen-consumer.mjs'], esmProject);
  fs.writeFileSync(
    path.join(esmProject, 'validate-request-consumer.mjs'),
    fs.readFileSync(esmValidateRequestRecipePath, 'utf8'),
    'utf8'
  );
  run(process.execPath, ['validate-request-consumer.mjs'], esmProject);
  fs.writeFileSync(
    path.join(esmProject, 'validate-response-consumer.mjs'),
    fs.readFileSync(esmValidateResponseRecipePath, 'utf8'),
    'utf8'
  );
  run(process.execPath, ['validate-response-consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'support-consumer.mjs'), fs.readFileSync(esmSupportRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['support-consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'schema-consumer.mjs'), fs.readFileSync(packageSchemaRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['schema-consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'archive-schema-consumer.mjs'), fs.readFileSync(packageArchiveRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['archive-schema-consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'invalid-archive-consumer.mjs'), fs.readFileSync(packageInvalidArchiveRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['invalid-archive-consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'bundle-schema-consumer.mjs'), fs.readFileSync(packageBundleRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['bundle-schema-consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'invalid-schema-consumer.mjs'), fs.readFileSync(packageInvalidSchemaRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['invalid-schema-consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'invalid-api-consumer.mjs'), fs.readFileSync(packageInvalidApiRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['invalid-api-consumer.mjs'], esmProject);
  fs.writeFileSync(path.join(esmProject, 'integrity-consumer.mjs'), fs.readFileSync(packageIntegrityRecipePath, 'utf8'), 'utf8');
  run(process.execPath, ['integrity-consumer.mjs'], esmProject);

  const typescriptProject = path.join(workspaceRoot, 'consumer-typescript');
  fs.mkdirSync(typescriptProject, { recursive: true });
  writeJson(path.join(typescriptProject, 'package.json'), {
    name: 'capsule-specs-consumer-typescript',
    private: true,
    type: 'module'
  });
  writeJson(path.join(typescriptProject, 'tsconfig.json'), {
    compilerOptions: {
      target: 'ES2022',
      module: 'NodeNext',
      moduleResolution: 'NodeNext',
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      resolveJsonModule: true
    },
    include: [
      'consumer.ts',
      'batch-request-consumer.ts',
      'fix-request-consumer.ts',
      'live-client-consumer.ts',
      'openapi-consumer.ts',
      'parse-request-consumer.ts',
      'error-consumer.ts',
      'reference-consumer.ts',
      'support-consumer.ts',
      'validate-response-consumer.ts'
    ]
  });
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', tarballPath], typescriptProject);
  fs.writeFileSync(path.join(typescriptProject, 'consumer.ts'), fs.readFileSync(typescriptConsumerRecipePath, 'utf8'), 'utf8');
  fs.writeFileSync(
    path.join(typescriptProject, 'batch-request-consumer.ts'),
    fs.readFileSync(typescriptBatchRequestRecipePath, 'utf8'),
    'utf8'
  );
  fs.writeFileSync(
    path.join(typescriptProject, 'fix-request-consumer.ts'),
    fs.readFileSync(typescriptFixRequestRecipePath, 'utf8'),
    'utf8'
  );
  fs.writeFileSync(
    path.join(typescriptProject, 'live-client-consumer.ts'),
    fs.readFileSync(typescriptLiveClientRecipePath, 'utf8'),
    'utf8'
  );
  fs.writeFileSync(
    path.join(typescriptProject, 'openapi-consumer.ts'),
    fs.readFileSync(typescriptOpenapiRecipePath, 'utf8'),
    'utf8'
  );
  fs.writeFileSync(
    path.join(typescriptProject, 'parse-request-consumer.ts'),
    fs.readFileSync(typescriptParseRequestsRecipePath, 'utf8'),
    'utf8'
  );
  fs.writeFileSync(path.join(typescriptProject, 'error-consumer.ts'), fs.readFileSync(typescriptErrorRecipePath, 'utf8'), 'utf8');
  fs.writeFileSync(path.join(typescriptProject, 'reference-consumer.ts'), fs.readFileSync(typescriptReferenceRecipePath, 'utf8'), 'utf8');
  fs.writeFileSync(path.join(typescriptProject, 'support-consumer.ts'), fs.readFileSync(typescriptSupportRecipePath, 'utf8'), 'utf8');
  fs.writeFileSync(
    path.join(typescriptProject, 'validate-response-consumer.ts'),
    fs.readFileSync(typescriptValidateResponsesRecipePath, 'utf8'),
    'utf8'
  );
  const repoTsc = path.join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc');
  run(process.execPath, [repoTsc, '--project', 'tsconfig.json'], typescriptProject);

  console.log(
    'OK: installed packed artifact into fresh CommonJS, ESM, and TypeScript consumer projects with raw capsule, OpenAPI reading and OpenAPI type-generation, compact reference-pack, live-client, validator request, validate-response, support-response, and error-response families, raw, archive, and bundled schema exports, invalid archive, capsule, and API schema fixtures, and integrity-seal recipes'
  );
} catch (error) {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (tarballPath) {
    safeRemove(tarballPath);
  }
  safeRemove(workspaceRoot);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}
