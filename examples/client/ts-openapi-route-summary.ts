import openapiDocument from "../../openapi/validate.openapi.json" with { type: "json" };

type OpenApiParameter = {
  name?: string;
  in?: string;
};

type OpenApiResponse = {
  description?: string;
};

type OpenApiOperation = {
  security?: Array<Record<string, unknown>>;
  parameters?: OpenApiParameter[];
  responses?: Record<string, OpenApiResponse>;
};

type OpenApiPathMap = Record<string, Record<string, OpenApiOperation>>;

const openapiPaths = openapiDocument.paths as OpenApiPathMap;
const publishedRoutes = [
  { method: "post", path: "/api/validate" },
  { method: "post", path: "/api/validate/batch" },
  { method: "post", path: "/api/validate/fix" },
  { method: "get", path: "/api/validate/gates" },
  { method: "get", path: "/api/validate/stats" }
] as const;

const getStatsOperation = openapiPaths["/api/validate/stats"]?.get;
const validateSingleOperation = openapiPaths["/api/validate"]?.post;

if (!getStatsOperation || !validateSingleOperation) {
  throw new Error("OpenAPI route surface drifted");
}

export const openapiRouteSummary = {
  openapiVersion: openapiDocument.openapi,
  routeCount: publishedRoutes.length,
  documentedRouteCount: Object.keys(openapiPaths).length,
  securitySchemes: Object.keys(openapiDocument.components?.securitySchemes ?? {}),
  authProtectedRouteCount: publishedRoutes.filter(({ method, path }) =>
    openapiPaths[path]?.[method]?.security?.some((entry) => "bearerAuth" in entry)
  ).length,
  validateSingleStatusCodes: Object.keys(validateSingleOperation.responses ?? {}),
  statsQueryParameters: (getStatsOperation.parameters ?? [])
    .filter((parameter) => parameter.in === "query")
    .map((parameter) => parameter.name ?? ""),
  statsStatusCodes: Object.keys(getStatsOperation.responses ?? {})
};

if (openapiRouteSummary.documentedRouteCount !== openapiRouteSummary.routeCount) {
  throw new Error("unexpected OpenAPI route count");
}

if (!openapiRouteSummary.securitySchemes.includes("bearerAuth")) {
  throw new Error("missing OpenAPI bearerAuth security scheme");
}

if (openapiRouteSummary.authProtectedRouteCount !== openapiRouteSummary.routeCount) {
  throw new Error("OpenAPI auth posture drifted");
}

if (!openapiRouteSummary.statsQueryParameters.includes("limit")) {
  throw new Error("OpenAPI stats query coverage drifted");
}

if (
  !openapiRouteSummary.validateSingleStatusCodes.includes("200") ||
  !openapiRouteSummary.validateSingleStatusCodes.includes("401") ||
  !openapiRouteSummary.validateSingleStatusCodes.includes("429")
) {
  throw new Error("OpenAPI validateSingle status coverage drifted");
}

if (
  !openapiRouteSummary.statsStatusCodes.includes("200") ||
  !openapiRouteSummary.statsStatusCodes.includes("500")
) {
  throw new Error("OpenAPI stats status coverage drifted");
}
