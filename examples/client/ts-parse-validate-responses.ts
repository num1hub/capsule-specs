import batchResponse from "../api/validate-response.batch.json";
import failResponse from "../api/validate-response.fail.json";
import fixResponse from "../api/validate-response.fix.sample.json";
import passResponse from "../api/validate-response.pass.json";
import type {
  ValidateBatchResponse,
  ValidateFailResponse,
  ValidateFixResponse,
  ValidatePassResponse
} from "../../projections/typescript/validator-api.js";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asValidatePassResponse(value: unknown): ValidatePassResponse {
  if (
    !isRecord(value) ||
    value.valid !== true ||
    !Array.isArray(value.errors) ||
    !Array.isArray(value.warnings) ||
    !Array.isArray(value.appliedFixes) ||
    typeof value.computedHash !== "string"
  ) {
    throw new Error("published pass response no longer matches the typed pass-response boundary");
  }

  return value as unknown as ValidatePassResponse;
}

function asValidateFailResponse(value: unknown): ValidateFailResponse {
  if (
    !isRecord(value) ||
    value.valid !== false ||
    !Array.isArray(value.errors) ||
    !Array.isArray(value.warnings) ||
    typeof value.computedHash !== "string"
  ) {
    throw new Error("published fail response no longer matches the typed fail-response boundary");
  }

  return value as unknown as ValidateFailResponse;
}

function asValidateBatchResponse(value: unknown): ValidateBatchResponse {
  if (
    !isRecord(value) ||
    !isRecord(value.summary) ||
    typeof value.summary.invalid !== "number" ||
    !Array.isArray(value.results)
  ) {
    throw new Error("published batch response no longer matches the typed batch-response boundary");
  }

  return value as unknown as ValidateBatchResponse;
}

function asValidateFixResponse(value: unknown): ValidateFixResponse {
  if (
    !isRecord(value) ||
    value.valid !== true ||
    !Array.isArray(value.errors) ||
    !Array.isArray(value.warnings) ||
    typeof value.computedHash !== "string" ||
    !isRecord(value.fixedCapsule) ||
    !isRecord(value.fixedCapsule.metadata) ||
    typeof value.fixedCapsule.metadata.capsule_id !== "string"
  ) {
    throw new Error("published fix response no longer matches the typed fix-response boundary");
  }

  return value as unknown as ValidateFixResponse;
}

export const typedValidatePassResponse = asValidatePassResponse(passResponse);
export const typedValidateFailResponse = asValidateFailResponse(failResponse);
export const typedValidateBatchResponse = asValidateBatchResponse(batchResponse);
export const typedValidateFixResponse = asValidateFixResponse(fixResponse);

export const validateResponseSummary = {
  passValid: typedValidatePassResponse.valid,
  failGate: typedValidateFailResponse.errors[0]?.gate,
  batchInvalid: typedValidateBatchResponse.summary.invalid,
  fixedCapsuleId: typedValidateFixResponse.fixedCapsule.metadata.capsule_id
};

if (validateResponseSummary.failGate !== "G16") {
  throw new Error("typed fail response drifted from the documented G16 example");
}

if (validateResponseSummary.fixedCapsuleId !== "capsule.example.validator-invalid-g16.v1") {
  throw new Error("typed fix response drifted from the published repaired capsule id");
}
