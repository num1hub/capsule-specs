import batchRequest from "@num1hub/capsule-specs/examples/api/validate-request.batch.json" with { type: "json" };
import fixRequest from "@num1hub/capsule-specs/examples/api/validate-request.fix.json" with { type: "json" };
import singleRequest from "@num1hub/capsule-specs/examples/api/validate-request.single.json" with { type: "json" };
import {
  publishedValidatorRouteDefinitions,
  publishedValidatorRoutes
} from "@num1hub/capsule-specs/typescript/validator-routes";

const statsRoute = publishedValidatorRouteDefinitions.find((route) => route.id === "getStats");
const statsLimitParameter = statsRoute?.queryParameters.find((parameter) => parameter.name === "limit");

export const exampleSingleRequest = singleRequest;
export const exampleBatchRequest = batchRequest;
export const exampleFixRequest = fixRequest;

function normalizeBaseUrl(baseUrl) {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

function buildStatsUrl(baseUrl, limit) {
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

async function readJson(response) {
  return response.json();
}

export function createValidatorClient(baseUrl, token) {
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  };

  return {
    validateSingle: async (request) => {
      const response = await fetch(`${normalizeBaseUrl(baseUrl)}${publishedValidatorRoutes.validateSingle}`, {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      });
      return readJson(response);
    },
    validateBatch: async (request) => {
      const response = await fetch(`${normalizeBaseUrl(baseUrl)}${publishedValidatorRoutes.validateBatch}`, {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      });
      return readJson(response);
    },
    validateFix: async (request) => {
      const response = await fetch(`${normalizeBaseUrl(baseUrl)}${publishedValidatorRoutes.validateFix}`, {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      });
      return readJson(response);
    },
    getGates: async () => {
      const response = await fetch(`${normalizeBaseUrl(baseUrl)}${publishedValidatorRoutes.getGates}`, {
        headers: authHeaders
      });
      return readJson(response);
    },
    getStats: async (limit) => {
      const response = await fetch(buildStatsUrl(baseUrl, limit), {
        headers: authHeaders
      });
      return readJson(response);
    }
  };
}

export const exampleRouteSummary = {
  singleCapsuleId: exampleSingleRequest.capsule.metadata.capsule_id,
  batchCapsuleCount: exampleBatchRequest.capsules.length,
  fixCapsuleId: exampleFixRequest.capsule.metadata.capsule_id,
  routes: publishedValidatorRoutes,
  statsQueryParameters: statsRoute?.queryParameters.map((parameter) => parameter.name) ?? []
};

if (exampleRouteSummary.batchCapsuleCount !== 2) {
  throw new Error("ESM package live-validator batch request drifted from the published sample count");
}

if (!exampleRouteSummary.statsQueryParameters.includes("limit")) {
  throw new Error("ESM package live-validator route metadata drifted from the published stats query coverage");
}

console.log(exampleRouteSummary);
