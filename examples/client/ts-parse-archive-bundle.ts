import archiveBundleSample from "../archive/archive-bundle.sample.json" with { type: "json" };
import {
  archiveCompressionModes,
  archiveEncryptionModes,
  archiveManifestContentClasses,
  archiveReplayModes,
  archiveTenantScopes,
  type ArchiveBundle
} from "../../projections/typescript/archive.js";

const typedArchiveBundle = archiveBundleSample as ArchiveBundle;

if (!archiveTenantScopes.includes(typedArchiveBundle.tenantScope)) {
  throw new Error("typed archive bundle tenant scope drifted");
}

if (!archiveCompressionModes.includes(typedArchiveBundle.compression)) {
  throw new Error("typed archive bundle compression drifted");
}

if (!archiveEncryptionModes.includes(typedArchiveBundle.encryption)) {
  throw new Error("typed archive bundle encryption drifted");
}

if (!archiveReplayModes.includes(typedArchiveBundle.replay.replayMode)) {
  throw new Error("typed archive bundle replay mode drifted");
}

if (!typedArchiveBundle.manifest.every((entry) => archiveManifestContentClasses.includes(entry.contentClass))) {
  throw new Error("typed archive bundle manifest content class drifted");
}

export const typedArchiveBundleSummary = {
  bundleId: typedArchiveBundle.bundleId,
  createdAt: typedArchiveBundle.createdAt,
  replayMode: typedArchiveBundle.replay.replayMode,
  manifestEntries: typedArchiveBundle.manifest.length
};
