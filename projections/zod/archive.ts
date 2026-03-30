import { z } from "zod";
import {
  archiveCompressionModes,
  archiveDuplicateStrategies,
  archiveEncryptionModes,
  archiveManifestContentClasses,
  archiveReplayModes,
  archiveTenantScopes
} from "../typescript/archive.js";

export const archiveManifestEntrySchema = z.object({
  entryId: z.string().min(1),
  capsuleId: z.string().optional(),
  contentClass: z.enum(archiveManifestContentClasses),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
  bytes: z.number().int().min(0),
  tenantScoped: z.boolean(),
  redacted: z.boolean()
}).strict();

export const archiveReplayGuardSchema = z.object({
  replayMode: z.enum(archiveReplayModes),
  validatorRequired: z.boolean(),
  tenantBoundaryRequired: z.boolean(),
  policyPackRequired: z.boolean(),
  duplicateStrategy: z.enum(archiveDuplicateStrategies)
}).strict();

export const archiveBundleSchema = z.object({
  bundleId: z.string().min(1),
  sourcePolicyId: z.string().min(1),
  createdAt: z.string().datetime({ offset: true }),
  sourceRegion: z.string().min(1),
  tenantScope: z.enum(archiveTenantScopes),
  compression: z.enum(archiveCompressionModes),
  encryption: z.enum(archiveEncryptionModes),
  exportEvidenceId: z.string().min(1),
  manifest: z.array(archiveManifestEntrySchema).min(1),
  replay: archiveReplayGuardSchema
}).strict();

export type ArchiveManifestEntry = z.infer<typeof archiveManifestEntrySchema>;
export type ArchiveReplayGuard = z.infer<typeof archiveReplayGuardSchema>;
export type ArchiveBundle = z.infer<typeof archiveBundleSchema>;
