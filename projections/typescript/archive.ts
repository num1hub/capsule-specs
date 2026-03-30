export const archiveTenantScopes = ["single-tenant", "multi-tenant", "regional"] as const;
export const archiveCompressionModes = ["none", "gzip", "zstd"] as const;
export const archiveEncryptionModes = ["none", "age", "kms-envelope"] as const;
export const archiveManifestContentClasses = ["capsules", "activity", "artifacts", "audit"] as const;
export const archiveReplayModes = ["dry-run", "validate-only", "merge", "replace"] as const;
export const archiveDuplicateStrategies = ["skip", "reject", "version"] as const;

export type ArchiveTenantScope = (typeof archiveTenantScopes)[number];
export type ArchiveCompressionMode = (typeof archiveCompressionModes)[number];
export type ArchiveEncryptionMode = (typeof archiveEncryptionModes)[number];
export type ArchiveManifestContentClass = (typeof archiveManifestContentClasses)[number];
export type ArchiveReplayMode = (typeof archiveReplayModes)[number];
export type ArchiveDuplicateStrategy = (typeof archiveDuplicateStrategies)[number];

export interface ArchiveManifestEntry {
  entryId: string;
  capsuleId?: string;
  contentClass: ArchiveManifestContentClass;
  sha256: string;
  bytes: number;
  tenantScoped: boolean;
  redacted: boolean;
}

export interface ArchiveReplayGuard {
  replayMode: ArchiveReplayMode;
  validatorRequired: boolean;
  tenantBoundaryRequired: boolean;
  policyPackRequired: boolean;
  duplicateStrategy: ArchiveDuplicateStrategy;
}

export interface ArchiveBundle {
  bundleId: string;
  sourcePolicyId: string;
  createdAt: string;
  sourceRegion: string;
  tenantScope: ArchiveTenantScope;
  compression: ArchiveCompressionMode;
  encryption: ArchiveEncryptionMode;
  exportEvidenceId: string;
  manifest: ArchiveManifestEntry[];
  replay: ArchiveReplayGuard;
}
