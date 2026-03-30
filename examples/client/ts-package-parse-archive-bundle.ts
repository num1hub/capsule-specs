import archiveBundleSample from "@num1hub/capsule-specs/examples/archive/archive-bundle.sample.json" with { type: "json" };
import type { ArchiveBundle } from "@num1hub/capsule-specs/typescript/archive";
import { archiveBundleSchema } from "@num1hub/capsule-specs/zod/archive";

const typedArchiveBundle = archiveBundleSample as ArchiveBundle;
const parsedArchiveBundle = archiveBundleSchema.parse(typedArchiveBundle);

if (parsedArchiveBundle.replay.replayMode !== "validate-only") {
  throw new Error("unexpected package archive replay mode");
}

if (parsedArchiveBundle.manifest.length !== typedArchiveBundle.manifest.length) {
  throw new Error("typed package archive bundle lost manifest entries during parse");
}

export const packageArchiveProjectionSummary = {
  bundleId: parsedArchiveBundle.bundleId,
  tenantScope: parsedArchiveBundle.tenantScope,
  manifestEntries: parsedArchiveBundle.manifest.length,
  duplicateStrategy: parsedArchiveBundle.replay.duplicateStrategy
};

console.log(packageArchiveProjectionSummary);
