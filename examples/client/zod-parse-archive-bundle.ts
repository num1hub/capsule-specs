import archiveBundleSample from "../archive/archive-bundle.sample.json" with { type: "json" };
import { archiveBundleSchema } from "../../projections/zod/archive.js";

export const parsedArchiveBundle = archiveBundleSchema.parse(archiveBundleSample);

if (!parsedArchiveBundle.manifest.some((entry) => entry.contentClass === "capsules")) {
  throw new Error("archive bundle sample lost its capsules manifest entry");
}
