import batchRequest from "@num1hub/capsule-specs/examples/api/validate-request.batch.json" with { type: "json" };
import fixRequest from "@num1hub/capsule-specs/examples/api/validate-request.fix.json" with { type: "json" };
import singleRequest from "@num1hub/capsule-specs/examples/api/validate-request.single.json" with { type: "json" };
import type {
  ValidateBatchRequest,
  ValidateFixRequest,
  ValidateSingleRequest
} from "@num1hub/capsule-specs/typescript/validator-api";

export const typedValidateRequest = singleRequest as ValidateSingleRequest;
export const typedValidateBatchRequest = batchRequest as ValidateBatchRequest;
export const typedValidateFixRequest = fixRequest as ValidateFixRequest;

export const validateRequestSummary = {
  singleCapsuleId: typedValidateRequest.capsule.metadata.capsule_id,
  batchCapsuleCount: typedValidateBatchRequest.capsules.length,
  fixCapsuleId: typedValidateFixRequest.capsule.metadata.capsule_id
};

if (validateRequestSummary.singleCapsuleId !== "capsule.example.note.v1") {
  throw new Error("installed-package typed parser drifted from the published single-request sample");
}

if (validateRequestSummary.batchCapsuleCount !== 2) {
  throw new Error("installed-package typed parser drifted from the published two-capsule batch sample");
}

if (validateRequestSummary.fixCapsuleId !== "capsule.example.validator-invalid-g16.v1") {
  throw new Error("installed-package typed parser drifted from the published fix-request sample");
}
