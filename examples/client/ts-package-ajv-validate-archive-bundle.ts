import archiveBundleSchema from "@num1hub/capsule-specs/schemas/archive-bundle.schema.json" with { type: "json" };
import archiveBundleSample from "@num1hub/capsule-specs/examples/archive/archive-bundle.sample.json" with { type: "json" };

type AjvValidator = {
  (payload: unknown): boolean;
  errors?: unknown[];
};

type Ajv2020Instance = {
  compile(schema: unknown): AjvValidator;
};

type Ajv2020Constructor = new (options: { allErrors: boolean; strict: boolean }) => Ajv2020Instance;

const Ajv2020 = (await import("ajv/dist/2020.js")).default as unknown as Ajv2020Constructor;
const addFormats = (await import("ajv-formats")).default as unknown as (ajv: Ajv2020Instance) => void;

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

export const packageArchiveBundleSummary = {
  bundleId: archiveBundleSample.bundleId,
  replayMode: archiveBundleSample.replay.replayMode,
  manifestEntries: archiveBundleSample.manifest.length
};

console.log(packageArchiveBundleSummary);
