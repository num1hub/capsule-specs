import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

import archiveBundleSchema from "../../schemas/archive-bundle.schema.json" with { type: "json" };
import archiveBundleSample from "../archive/archive-bundle.sample.json" with { type: "json" };

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validateArchiveBundle = ajv.compile(archiveBundleSchema);

if (!validateArchiveBundle(archiveBundleSample)) {
  throw new Error(JSON.stringify(validateArchiveBundle.errors, null, 2));
}

if (archiveBundleSample.replay.replayMode !== "validate-only") {
  throw new Error("expected archive bundle sample to use validate-only replay mode");
}

if (!archiveBundleSample.manifest.some((entry) => entry.contentClass === "capsules")) {
  throw new Error("expected archive bundle sample to include a capsules manifest entry");
}

console.log("AJV OK: archive bundle sample matches the published archive-bundle schema");
