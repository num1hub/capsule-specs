export const publishedValidatorRoutes = {
  validateSingle: "/api/validate",
  validateBatch: "/api/validate/batch",
  validateFix: "/api/validate/fix",
  getStats: "/api/validate/stats",
  getGates: "/api/validate/gates"
} as const;

export const publishedValidatorRouteMethods = {
  validateSingle: "POST",
  validateBatch: "POST",
  validateFix: "POST",
  getStats: "GET",
  getGates: "GET"
} as const;

export type PublishedValidatorRouteId = keyof typeof publishedValidatorRoutes;
export type PublishedValidatorRoutePath = (typeof publishedValidatorRoutes)[PublishedValidatorRouteId];
export type PublishedValidatorRouteMethod = (typeof publishedValidatorRouteMethods)[PublishedValidatorRouteId];

export const publishedValidatorRouteDefinitions = [
  {
    id: "validateSingle",
    method: publishedValidatorRouteMethods.validateSingle,
    path: publishedValidatorRoutes.validateSingle
  },
  {
    id: "validateBatch",
    method: publishedValidatorRouteMethods.validateBatch,
    path: publishedValidatorRoutes.validateBatch
  },
  {
    id: "validateFix",
    method: publishedValidatorRouteMethods.validateFix,
    path: publishedValidatorRoutes.validateFix
  },
  {
    id: "getStats",
    method: publishedValidatorRouteMethods.getStats,
    path: publishedValidatorRoutes.getStats
  },
  {
    id: "getGates",
    method: publishedValidatorRouteMethods.getGates,
    path: publishedValidatorRoutes.getGates
  }
] as const;
