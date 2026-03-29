const Ajv2020 = require("ajv/dist/2020").default;
const addFormats = require("ajv-formats");

const archiveBundleSchema = require("@num1hub/capsule-specs/schemas/archive-bundle.schema.json");
const archiveBundleSample = require("@num1hub/capsule-specs/examples/archive/archive-bundle.sample.json");

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validateArchiveBundle = ajv.compile(archiveBundleSchema);

if (!validateArchiveBundle(archiveBundleSample)) {
  throw new Error(JSON.stringify(validateArchiveBundle.errors, null, 2));
}

if (archiveBundleSample.replay.replayMode !== "validate-only") {
  throw new Error("expected installed archive bundle sample to use validate-only replay mode");
}

if (!archiveBundleSample.manifest.some((entry) => entry.contentClass === "capsules")) {
  throw new Error("expected installed archive bundle sample to include a capsules manifest entry");
}

console.log({
  bundleId: archiveBundleSample.bundleId,
  replayMode: archiveBundleSample.replay.replayMode,
  manifestEntries: archiveBundleSample.manifest.length
});
