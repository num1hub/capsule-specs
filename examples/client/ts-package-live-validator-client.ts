import batchRequest from "@num1hub/capsule-specs/examples/api/validate-request.batch.json" with { type: "json" };
import fixRequest from "@num1hub/capsule-specs/examples/api/validate-request.fix.json" with { type: "json" };
import singleRequest from "@num1hub/capsule-specs/examples/api/validate-request.single.json" with { type: "json" };
import {
  publishedValidatorRouteDefinitions,
  publishedValidatorRoutes
} from "@num1hub/capsule-specs/typescript/validator-routes";
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

const statsRoute = publishedValidatorRouteDefinitions.find((route) => route.id === "getStats");
const statsLimitParameter = statsRoute?.queryParameters.find((parameter) => parameter.name === "limit");

async function readJson<T>(response: Response): Promise<ValidatorRouteResult<T>> {
  return (await response.json()) as ValidatorRouteResult<T>;
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

function buildStatsUrl(baseUrl: string, limit?: number): string {
  if (limit != null && (!Number.isInteger(limit) || limit < 1)) {
    throw new Error("stats limit must be a positive integer");
  }

  const query = new URLSearchParams();
  if (limit != null) {
    query.set(statsLimitParameter?.name ?? "limit", String(limit));
  }

  const querySuffix = query.size ? `?${query.toString()}` : "";
  return `${normalizeBaseUrl(baseUrl)}${publishedValidatorRoutes.getStats}${querySuffix}`;
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
      const response = await fetch(`${normalizeBaseUrl(baseUrl)}${publishedValidatorRoutes.validateSingle}`, {
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
      const response = await fetch(`${normalizeBaseUrl(baseUrl)}${publishedValidatorRoutes.validateBatch}`, {
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
      const response = await fetch(`${normalizeBaseUrl(baseUrl)}${publishedValidatorRoutes.validateFix}`, {
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
      const response = await fetch(`${normalizeBaseUrl(baseUrl)}${publishedValidatorRoutes.getGates}`, {
        headers: authHeaders
      });
      return readJson<GatesResponse>(response);
    },
    getStats: async (limit?: number): Promise<ValidatorRouteResult<StatsResponse>> => {
      const response = await fetch(buildStatsUrl(baseUrl, limit), {
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
  routes: publishedValidatorRoutes,
  statsQueryParameters: statsRoute?.queryParameters.map((parameter) => parameter.name) ?? [],
  exampleStatsUrl: buildStatsUrl("https://validator.example", 25)
};

if (exampleRouteSummary.batchCapsuleCount !== 2) {
  throw new Error("typed package live-validator batch request drifted from the published sample count");
}

if (!exampleRouteSummary.statsQueryParameters.includes("limit")) {
  throw new Error("typed package live-validator route metadata drifted from the published stats query coverage");
}
