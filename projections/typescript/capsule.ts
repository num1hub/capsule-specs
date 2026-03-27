export const CAPSULE_TYPES = [
  "foundation",
  "concept",
  "operations",
  "physical_object",
  "project"
] as const;

export const CAPSULE_SUBTYPES = ["atomic", "hub"] as const;

export const CAPSULE_STATUSES = [
  "draft",
  "active",
  "frozen",
  "archived",
  "legacy",
  "sovereign",
  "quarantined"
] as const;

export const RELATION_TYPES = [
  "supports",
  "contradicts",
  "extends",
  "derived_from",
  "depends_on",
  "references",
  "duplicates",
  "implements",
  "part_of"
] as const;

export type CapsuleType = (typeof CAPSULE_TYPES)[number];
export type CapsuleSubtype = (typeof CAPSULE_SUBTYPES)[number];
export type CapsuleStatus = (typeof CAPSULE_STATUSES)[number];
export type RelationType = (typeof RELATION_TYPES)[number];

export interface CapsuleMetadataSource {
  uri?: string;
  sha256?: string;
  type?: string;
}

export interface CapsuleMetadata {
  capsule_id: string;
  type: CapsuleType;
  subtype: CapsuleSubtype;
  status: CapsuleStatus;
  version: string;
  semantic_hash: string;
  author?: string;
  created_at?: string;
  updated_at?: string;
  name?: string;
  source?: CapsuleMetadataSource;
  [key: string]: unknown;
}

export interface CorePayload {
  content_type: string;
  content: string;
  truncation_note?: string;
  [key: string]: unknown;
}

export interface ConfidenceVector {
  extraction: number;
  synthesis: number;
  linking: number;
  provenance_coverage: number;
  validation_score: number;
  contradiction_pressure: number;
}

export interface NeuroConcentrate {
  summary: string;
  keywords: string[];
  confidence_vector: ConfidenceVector;
  semantic_hash: string;
  [key: string]: unknown;
}

export interface RecursiveLink {
  target_id: string;
  relation_type: RelationType;
  [key: string]: unknown;
}

export interface RecursiveLayer {
  links: RecursiveLink[];
  epistemic_ledger?: unknown[];
  [key: string]: unknown;
}

export interface Capsule {
  metadata: CapsuleMetadata;
  core_payload: CorePayload;
  neuro_concentrate: NeuroConcentrate;
  recursive_layer: RecursiveLayer;
  integrity_sha3_512: string;
}
