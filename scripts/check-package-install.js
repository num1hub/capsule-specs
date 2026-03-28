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
const typescriptConsumerRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-validate-request.ts');
const typescriptReferenceRecipePath = path.join(repoRoot, 'examples', 'client', 'ts-package-contract-reference.ts');

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

  const esmProject = path.join(workspaceRoot, 'consumer-esm');
  fs.mkdirSync(esmProject, { recursive: true });
  writeJson(path.join(esmProject, 'package.json'), {
    name: 'capsule-specs-consumer-esm',
    private: true,
    type: 'module'
  });
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', tarballPath], esmProject);
  fs.writeFileSync(
    path.join(esmProject, 'consumer.mjs'),
    [
      "import * as rootProjection from '@num1hub/capsule-specs';",
      "import * as zodProjection from '@num1hub/capsule-specs/zod';",
      "import * as validatorProjection from '@num1hub/capsule-specs/zod/validator-api';",
      "import capsuleSchemaJson from '@num1hub/capsule-specs/schemas/capsule-schema.json' with { type: 'json' };",
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
      skipLibCheck: true
    },
    include: ['consumer.ts', 'reference-consumer.ts']
  });
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', tarballPath], typescriptProject);
  fs.writeFileSync(path.join(typescriptProject, 'consumer.ts'), fs.readFileSync(typescriptConsumerRecipePath, 'utf8'), 'utf8');
  fs.writeFileSync(path.join(typescriptProject, 'reference-consumer.ts'), fs.readFileSync(typescriptReferenceRecipePath, 'utf8'), 'utf8');
  const repoTsc = path.join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc');
  run(process.execPath, [repoTsc, '--project', 'tsconfig.json'], typescriptProject);

  console.log('OK: installed packed artifact into fresh CommonJS, ESM, and TypeScript consumer projects with raw capsule and reference-pack exports');
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
