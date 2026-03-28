import validatorRoutes from "../../references/validator-routes.json" with { type: "json" };
import { publishedValidatorRouteDefinitions } from "../../projections/typescript/validator-routes.js";

const validateSingleRoute = publishedValidatorRouteDefinitions.find((route) => route.id === "validateSingle");
const getStatsRoute = publishedValidatorRouteDefinitions.find((route) => route.id === "getStats");
const compactRoutes = validatorRoutes.routes as Array<{
  id: string;
  response_statuses: Array<{ status: number }>;
}>;
const getGatesRoute = compactRoutes.find((route) => route.id === "getGates");

if (!validateSingleRoute || !getStatsRoute || !getGatesRoute) {
  throw new Error("published validator route definitions drifted");
}

export const routeBehaviorSummary = {
  routeCount: publishedValidatorRouteDefinitions.length,
  authProtectedRouteCount: publishedValidatorRouteDefinitions.filter((route) => route.requiresBearerAuth).length,
  validateSingleStatusCodes: validateSingleRoute.responseStatuses.map((status) => status.status),
  validateSingleSuccessFamilies: validateSingleRoute.responseStatuses[0]?.familyIds ?? [],
  statsQueryParameters: getStatsRoute.queryParameters.map((parameter) => parameter.name),
  getGatesStatusCodes: getGatesRoute.response_statuses.map((status) => status.status)
};

if (routeBehaviorSummary.authProtectedRouteCount !== routeBehaviorSummary.routeCount) {
  throw new Error("published validator route auth posture drifted");
}

if (!routeBehaviorSummary.statsQueryParameters.includes("limit")) {
  throw new Error("published stats query parameters drifted");
}

if (
  !routeBehaviorSummary.validateSingleStatusCodes.includes(200) ||
  !routeBehaviorSummary.validateSingleStatusCodes.includes(401) ||
  !routeBehaviorSummary.validateSingleStatusCodes.includes(429)
) {
  throw new Error("published validateSingle route status map drifted");
}

if (
  !routeBehaviorSummary.validateSingleSuccessFamilies.includes("validatePassResponse") ||
  !routeBehaviorSummary.validateSingleSuccessFamilies.includes("validateFailResponse")
) {
  throw new Error("published validateSingle success families drifted");
}

if (
  !routeBehaviorSummary.getGatesStatusCodes.includes(200) ||
  !routeBehaviorSummary.getGatesStatusCodes.includes(401) ||
  !routeBehaviorSummary.getGatesStatusCodes.includes(429)
) {
  throw new Error("published getGates route status map drifted");
}
