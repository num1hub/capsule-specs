import openapiDocument from "@num1hub/capsule-specs/openapi/validate.openapi.json" with { type: "json" };

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
const validateSingleOperation = openapiPaths["/api/validate"]?.post;
const statsOperation = openapiPaths["/api/validate/stats"]?.get;

if (!validateSingleOperation || !statsOperation) {
  throw new Error("installed package OpenAPI route surface drifted");
}

export const openapiPackageSummary = {
  openapiVersion: openapiDocument.openapi,
  routeCount: Object.keys(openapiPaths).length,
  securitySchemes: Object.keys(openapiDocument.components?.securitySchemes ?? {}),
  validateSingleStatusCodes: Object.keys(validateSingleOperation.responses ?? {}),
  statsQueryParameters: (statsOperation.parameters ?? [])
    .filter((parameter) => parameter.in === "query")
    .map((parameter) => parameter.name ?? "")
};

if (!openapiPackageSummary.securitySchemes.includes("bearerAuth")) {
  throw new Error("missing installed-package OpenAPI bearerAuth scheme");
}

if (!openapiPackageSummary.statsQueryParameters.includes("limit")) {
  throw new Error("installed-package OpenAPI stats query coverage drifted");
}

if (
  !openapiPackageSummary.validateSingleStatusCodes.includes("200") ||
  !openapiPackageSummary.validateSingleStatusCodes.includes("401")
) {
  throw new Error("installed-package OpenAPI validateSingle status coverage drifted");
}
