import { z } from "zod";

const capsuleTypes = [
  "foundation",
  "concept",
  "operations",
  "physical_object",
  "project"
] as const;

const capsuleSubtypes = ["atomic", "hub"] as const;

const capsuleStatuses = [
  "draft",
  "active",
  "frozen",
  "archived",
  "legacy",
  "sovereign",
  "quarantined"
] as const;

const relationTypes = [
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

export const capsuleMetadataSourceSchema = z.object({
  uri: z.string().optional(),
  sha256: z.string().optional(),
  type: z.string().optional()
}).strict();

export const capsuleMetadataSchema = z.object({
  capsule_id: z.string().min(1),
  type: z.enum(capsuleTypes),
  subtype: z.enum(capsuleSubtypes),
  status: z.enum(capsuleStatuses),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  semantic_hash: z.string().regex(/^(?:[a-z0-9]+-){7}[a-z0-9]+$/),
  author: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  name: z.string().optional(),
  source: capsuleMetadataSourceSchema.optional()
}).passthrough();

export const corePayloadSchema = z.object({
  content_type: z.string(),
  content: z.string(),
  truncation_note: z.string().optional()
}).passthrough();

export const confidenceVectorSchema = z.object({
  extraction: z.number().min(0).max(1),
  synthesis: z.number().min(0).max(1),
  linking: z.number().min(0).max(1),
  provenance_coverage: z.number().min(0).max(1),
  validation_score: z.number().min(0).max(1),
  contradiction_pressure: z.number().min(0).max(1)
}).strict();

export const neuroConcentrateSchema = z.object({
  summary: z.string(),
  keywords: z.array(z.string().min(1)).min(5).max(15),
  confidence_vector: confidenceVectorSchema,
  semantic_hash: z.string().regex(/^(?:[a-z0-9]+-){7}[a-z0-9]+$/)
}).passthrough();

export const recursiveLinkSchema = z.object({
  target_id: z.string().min(1),
  relation_type: z.enum(relationTypes)
}).passthrough();

export const recursiveLayerSchema = z.object({
  links: z.array(recursiveLinkSchema),
  epistemic_ledger: z.array(z.unknown()).optional()
}).passthrough();

export const capsuleSchema = z.object({
  metadata: capsuleMetadataSchema,
  core_payload: corePayloadSchema,
  neuro_concentrate: neuroConcentrateSchema,
  recursive_layer: recursiveLayerSchema,
  integrity_sha3_512: z.string().regex(/^[a-f0-9]{128}$/)
}).strict();

export type Capsule = z.infer<typeof capsuleSchema>;
export type CapsuleMetadata = z.infer<typeof capsuleMetadataSchema>;
export type RecursiveLink = z.infer<typeof recursiveLinkSchema>;
