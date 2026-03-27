import type { Capsule } from "./capsule.js";

export interface ValidationOptions {
  skipG16?: boolean;
  allowRefutes?: boolean;
  existingIds?: string[];
}

export interface ValidatorIssue {
  gate: `G${number}${number}`;
  path: string;
  message: string;
}

export interface WarningItem {
  [key: string]: unknown;
}

export interface ValidateSingleRequest {
  capsule: Capsule;
  options: ValidationOptions;
  autoFix: boolean;
}

export interface ValidateBatchRequest {
  capsules: Capsule[];
  options: ValidationOptions;
}

export interface ValidateFixRequest {
  capsule: Capsule;
  options: ValidationOptions;
}

export interface ValidatePassResponse {
  valid: true;
  errors: ValidatorIssue[];
  warnings: WarningItem[];
  computedHash: string;
  appliedFixes: Record<string, unknown>[];
}

export interface ValidateFailResponse {
  valid: false;
  errors: ValidatorIssue[];
  warnings: WarningItem[];
  computedHash: string;
}

export interface ValidateBatchResult {
  capsuleId: string;
  valid: boolean;
  errors: ValidatorIssue[];
  warnings: WarningItem[];
  computedHash: string;
}

export interface ValidateBatchSummary {
  total: number;
  valid: number;
  invalid: number;
  withWarnings: number;
  totalErrors: number;
  totalWarnings: number;
}

export interface ValidateBatchResponse {
  summary: ValidateBatchSummary;
  results: ValidateBatchResult[];
}

export interface ValidateFixResponse {
  valid: true;
  errors: ValidatorIssue[];
  warnings: WarningItem[];
  computedHash: string;
  fixedCapsule: Capsule;
}

export interface GateDescriptor {
  id: `G${number}${number}`;
  name: string;
  description: string;
  severity: "error" | "warning";
  autoFixable: boolean;
}

export interface GatesResponse {
  gates: GateDescriptor[];
}

export interface StatsRecentItem {
  capsuleId: string;
  valid: boolean;
  timestamp: string;
}

export interface StatsTrendItem {
  bucket: string;
  passed: number;
  failed: number;
}

export interface StatsGateItem {
  gate: `G${number}${number}`;
  count: number;
}

export interface StatsResponse {
  total: number;
  passed: number;
  failed: number;
  warned: number;
  passRate: number;
  recent: StatsRecentItem[];
  trend: StatsTrendItem[];
  gates: StatsGateItem[];
}

export interface SimpleErrorResponse {
  error: string;
}
