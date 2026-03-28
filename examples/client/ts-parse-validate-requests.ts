import batchRequest from "../api/validate-request.batch.json";
import fixRequest from "../api/validate-request.fix.json";
import singleRequest from "../api/validate-request.single.json";
import type {
  ValidateBatchRequest,
  ValidateFixRequest,
  ValidateSingleRequest
} from "../../projections/typescript/validator-api.js";

export const typedValidateRequest = singleRequest as ValidateSingleRequest;
export const typedValidateBatchRequest = batchRequest as ValidateBatchRequest;
export const typedValidateFixRequest = fixRequest as ValidateFixRequest;

export const validateRequestSummary = {
  singleCapsuleId: typedValidateRequest.capsule.metadata.capsule_id,
  batchCapsuleCount: typedValidateBatchRequest.capsules.length,
  fixCapsuleId: typedValidateFixRequest.capsule.metadata.capsule_id
};

if (validateRequestSummary.singleCapsuleId !== "capsule.example.note.v1") {
  throw new Error("typed request parser drifted from the published single-request sample");
}

if (validateRequestSummary.batchCapsuleCount !== 2) {
  throw new Error("typed request parser drifted from the published two-capsule batch sample");
}

if (validateRequestSummary.fixCapsuleId !== "capsule.example.validator-invalid-g16.v1") {
  throw new Error("typed request parser drifted from the published fix-request sample");
}
