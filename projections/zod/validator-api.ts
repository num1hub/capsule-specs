import { z } from "zod";
import { capsuleSchema } from "./capsule.js";

export const validationOptionsSchema = z.object({
  skipG16: z.boolean().optional(),
  allowRefutes: z.boolean().optional(),
  existingIds: z.array(z.string().min(1)).optional()
}).strict();

export const validatorIssueSchema = z.object({
  gate: z.string().regex(/^G\d{2}$/),
  path: z.string().min(1),
  message: z.string().min(1)
}).strict();

export const warningItemSchema = z.record(z.unknown());

export const validateSingleRequestSchema = z.object({
  capsule: capsuleSchema,
  options: validationOptionsSchema,
  autoFix: z.boolean()
}).strict();

export const validateBatchRequestSchema = z.object({
  capsules: z.array(capsuleSchema).min(1),
  options: validationOptionsSchema
}).strict();

export const validateFixRequestSchema = z.object({
  capsule: capsuleSchema,
  options: validationOptionsSchema
}).strict();

export const validatePassResponseSchema = z.object({
  valid: z.literal(true),
  errors: z.array(validatorIssueSchema),
  warnings: z.array(warningItemSchema),
  computedHash: z.string().regex(/^[a-f0-9]{128}$/),
  appliedFixes: z.array(z.record(z.unknown()))
}).strict();

export const validateFailResponseSchema = z.object({
  valid: z.literal(false),
  errors: z.array(validatorIssueSchema).min(1),
  warnings: z.array(warningItemSchema),
  computedHash: z.string().regex(/^[a-f0-9]{128}$/)
}).strict();

export const validateBatchResultSchema = z.object({
  capsuleId: z.string().min(1),
  valid: z.boolean(),
  errors: z.array(validatorIssueSchema),
  warnings: z.array(warningItemSchema),
  computedHash: z.string().regex(/^[a-f0-9]{128}$/)
}).strict();

export const validateBatchSummarySchema = z.object({
  total: z.number().int().min(0),
  valid: z.number().int().min(0),
  invalid: z.number().int().min(0),
  withWarnings: z.number().int().min(0),
  totalErrors: z.number().int().min(0),
  totalWarnings: z.number().int().min(0)
}).strict();

export const validateBatchResponseSchema = z.object({
  summary: validateBatchSummarySchema,
  results: z.array(validateBatchResultSchema).min(1)
}).strict();

export const validateFixResponseSchema = z.object({
  valid: z.literal(true),
  errors: z.array(validatorIssueSchema),
  warnings: z.array(warningItemSchema),
  computedHash: z.string().regex(/^[a-f0-9]{128}$/),
  fixedCapsule: capsuleSchema
}).strict();

export const gateDescriptorSchema = z.object({
  id: z.string().regex(/^G\d{2}$/),
  name: z.string().min(1),
  description: z.string().min(1),
  severity: z.enum(["error", "warning"]),
  autoFixable: z.boolean()
}).strict();

export const gatesResponseSchema = z.object({
  gates: z.array(gateDescriptorSchema).min(1)
}).strict();

export const statsRecentItemSchema = z.object({
  capsuleId: z.string().min(1),
  valid: z.boolean(),
  timestamp: z.string().min(1)
}).strict();

export const statsTrendItemSchema = z.object({
  bucket: z.string().min(1),
  passed: z.number().int().min(0),
  failed: z.number().int().min(0)
}).strict();

export const statsGateItemSchema = z.object({
  gate: z.string().regex(/^G\d{2}$/),
  count: z.number().int().min(0)
}).strict();

export const statsResponseSchema = z.object({
  total: z.number().int().min(0),
  passed: z.number().int().min(0),
  failed: z.number().int().min(0),
  warned: z.number().int().min(0),
  passRate: z.number().min(0).max(1),
  recent: z.array(statsRecentItemSchema),
  trend: z.array(statsTrendItemSchema),
  gates: z.array(statsGateItemSchema)
}).strict();

export const simpleErrorResponseSchema = z.object({
  error: z.string().min(1)
}).strict();

export type ValidateSingleRequest = z.infer<typeof validateSingleRequestSchema>;
export type ValidateBatchRequest = z.infer<typeof validateBatchRequestSchema>;
export type ValidateFixRequest = z.infer<typeof validateFixRequestSchema>;
export type ValidatePassResponse = z.infer<typeof validatePassResponseSchema>;
export type ValidateFailResponse = z.infer<typeof validateFailResponseSchema>;
export type ValidateBatchResponse = z.infer<typeof validateBatchResponseSchema>;
export type ValidateFixResponse = z.infer<typeof validateFixResponseSchema>;
export type GatesResponse = z.infer<typeof gatesResponseSchema>;
export type StatsResponse = z.infer<typeof statsResponseSchema>;
export type SimpleErrorResponse = z.infer<typeof simpleErrorResponseSchema>;
