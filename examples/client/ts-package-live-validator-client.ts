import batchRequest from "@num1hub/capsule-specs/examples/api/validate-request.batch.json" with { type: "json" };
import fixRequest from "@num1hub/capsule-specs/examples/api/validate-request.fix.json" with { type: "json" };
import singleRequest from "@num1hub/capsule-specs/examples/api/validate-request.single.json" with { type: "json" };
import { publishedValidatorRoutes } from "@num1hub/capsule-specs/typescript/validator-routes";
import type {
  GatesResponse,
  SimpleErrorResponse,
  StatsResponse,
  ValidateBatchRequest,
  ValidateBatchResponse,
  ValidateFailResponse,
  ValidateFixRequest,
  ValidateFixResponse,
  ValidatePassResponse,
  ValidateSingleRequest
} from "@num1hub/capsule-specs/typescript/validator-api";

export type ValidatorRouteResult<T> = T | SimpleErrorResponse;

export const exampleSingleRequest = singleRequest as ValidateSingleRequest;
export const exampleBatchRequest = batchRequest as ValidateBatchRequest;
export const exampleFixRequest = fixRequest as ValidateFixRequest;

async function readJson<T>(response: Response): Promise<ValidatorRouteResult<T>> {
  return (await response.json()) as ValidatorRouteResult<T>;
}

export function createValidatorClient(baseUrl: string, token: string) {
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  } as const;

  return {
    validateSingle: async (
      request: ValidateSingleRequest
    ): Promise<ValidatorRouteResult<ValidatePassResponse | ValidateFailResponse>> => {
      const response = await fetch(`${baseUrl}${publishedValidatorRoutes.validateSingle}`, {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      });
      return readJson<ValidatePassResponse | ValidateFailResponse>(response);
    },
    validateBatch: async (request: ValidateBatchRequest): Promise<ValidatorRouteResult<ValidateBatchResponse>> => {
      const response = await fetch(`${baseUrl}${publishedValidatorRoutes.validateBatch}`, {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      });
      return readJson<ValidateBatchResponse>(response);
    },
    validateFix: async (request: ValidateFixRequest): Promise<ValidatorRouteResult<ValidateFixResponse>> => {
      const response = await fetch(`${baseUrl}${publishedValidatorRoutes.validateFix}`, {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      });
      return readJson<ValidateFixResponse>(response);
    },
    getGates: async (): Promise<ValidatorRouteResult<GatesResponse>> => {
      const response = await fetch(`${baseUrl}${publishedValidatorRoutes.getGates}`, {
        headers: authHeaders
      });
      return readJson<GatesResponse>(response);
    },
    getStats: async (): Promise<ValidatorRouteResult<StatsResponse>> => {
      const response = await fetch(`${baseUrl}${publishedValidatorRoutes.getStats}`, {
        headers: authHeaders
      });
      return readJson<StatsResponse>(response);
    }
  };
}

export const exampleRouteSummary = {
  singleCapsuleId: exampleSingleRequest.capsule.metadata.capsule_id,
  batchCapsuleCount: exampleBatchRequest.capsules.length,
  fixCapsuleId: exampleFixRequest.capsule.metadata.capsule_id,
  routes: publishedValidatorRoutes
};

if (exampleRouteSummary.batchCapsuleCount !== 2) {
  throw new Error("typed package live-validator batch request drifted from the published sample count");
}
