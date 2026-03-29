const openapiDocument = require("@num1hub/capsule-specs/openapi/validate.openapi.json");

const pathEntries = Object.entries(openapiDocument.paths);
const routeKeys = pathEntries.flatMap(([routePath, operations]) =>
  Object.keys(operations).map((method) => `${method.toUpperCase()} ${routePath}`)
);
const validateSingle = openapiDocument.paths["/api/validate"].post;
const statsRoute = openapiDocument.paths["/api/validate/stats"].get;

if (!statsRoute.parameters.some((parameter) => parameter.name === "limit" && parameter.in === "query")) {
  throw new Error("OpenAPI stats query parameter drifted");
}

if (!validateSingle.security.some((entry) => Object.prototype.hasOwnProperty.call(entry, "bearerAuth"))) {
  throw new Error("OpenAPI auth posture drifted");
}

console.log({
  openapiVersion: openapiDocument.openapi,
  routeCount: routeKeys.length,
  routeKeys,
  securitySchemes: Object.keys(openapiDocument.components?.securitySchemes ?? {}),
  validateSingleStatusCodes: Object.keys(validateSingle.responses ?? {}),
  statsQueryParameters: statsRoute.parameters
    .filter((parameter) => parameter.in === "query")
    .map((parameter) => parameter.name)
});
