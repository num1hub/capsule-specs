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

export const publishedValidatorRouteResponseStatusDefinitions = {
  validateSingle: [
    {
      status: 200,
      description: "Validation result",
      familyIds: ["validatePassResponse", "validateFailResponse"],
      exampleFiles: ["examples/api/validate-response.pass.json", "examples/api/validate-response.fail.json"]
    },
    {
      status: 400,
      description: "Invalid validation payload",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/error-response.sample.json"]
    },
    {
      status: 401,
      description: "Authorization required",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/unauthorized-response.sample.json"]
    },
    {
      status: 429,
      description: "Rate limit exceeded",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/rate-limit-response.sample.json"]
    }
  ],
  validateBatch: [
    {
      status: 200,
      description: "Batch validation result",
      familyIds: ["validateBatchResponse"],
      exampleFiles: ["examples/api/validate-response.batch.json"]
    },
    {
      status: 400,
      description: "Invalid batch payload",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/error-response.sample.json"]
    },
    {
      status: 401,
      description: "Authorization required",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/unauthorized-response.sample.json"]
    },
    {
      status: 403,
      description: "Owner role required",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: []
    },
    {
      status: 429,
      description: "Rate limit exceeded",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/rate-limit-response.sample.json"]
    }
  ],
  validateFix: [
    {
      status: 200,
      description: "Fixed payload with validation result",
      familyIds: ["validateFixResponse"],
      exampleFiles: ["examples/api/validate-response.fix.sample.json"]
    },
    {
      status: 400,
      description: "Invalid fix payload",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/error-response.sample.json"]
    },
    {
      status: 401,
      description: "Authorization required",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/unauthorized-response.sample.json"]
    },
    {
      status: 403,
      description: "Owner role required",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: []
    },
    {
      status: 429,
      description: "Rate limit exceeded",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/rate-limit-response.sample.json"]
    }
  ],
  getStats: [
    {
      status: 200,
      description: "Validation stats payload",
      familyIds: ["statsResponse"],
      exampleFiles: ["examples/api/stats-response.sample.json"]
    },
    {
      status: 401,
      description: "Authorization required",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/unauthorized-response.sample.json"]
    },
    {
      status: 429,
      description: "Rate limit exceeded",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/rate-limit-response.sample.json"]
    },
    {
      status: 500,
      description: "Stats computation failed",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: []
    }
  ],
  getGates: [
    {
      status: 200,
      description: "Gate metadata payload",
      familyIds: ["gatesResponse"],
      exampleFiles: ["examples/api/gates-response.sample.json"]
    },
    {
      status: 401,
      description: "Authorization required",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/unauthorized-response.sample.json"]
    },
    {
      status: 429,
      description: "Rate limit exceeded",
      familyIds: ["simpleErrorResponse"],
      exampleFiles: ["examples/api/rate-limit-response.sample.json"]
    }
  ]
} as const;

export const publishedValidatorRouteQueryParameters = {
  validateSingle: [],
  validateBatch: [],
  validateFix: [],
  getStats: [
    {
      name: "limit",
      in: "query",
      required: false,
      type: "integer",
      minimum: 1,
      description: "Maximum number of validation log entries to aggregate. Defaults to 500."
    }
  ],
  getGates: []
} as const;

export type PublishedValidatorRouteId = keyof typeof publishedValidatorRoutes;
export type PublishedValidatorRoutePath = (typeof publishedValidatorRoutes)[PublishedValidatorRouteId];
export type PublishedValidatorRouteMethod = (typeof publishedValidatorRouteMethods)[PublishedValidatorRouteId];
export type PublishedValidatorRouteResponseStatus =
  (typeof publishedValidatorRouteResponseStatusDefinitions)[PublishedValidatorRouteId][number];
export type PublishedValidatorRouteQueryParameter =
  (typeof publishedValidatorRouteQueryParameters)[PublishedValidatorRouteId][number];

export const publishedValidatorRouteDefinitions = [
  {
    id: "validateSingle",
    method: publishedValidatorRouteMethods.validateSingle,
    path: publishedValidatorRoutes.validateSingle,
    requiresBearerAuth: true,
    requestBodyRequired: true,
    requestFamilyId: "validateSingleRequest",
    queryParameters: publishedValidatorRouteQueryParameters.validateSingle,
    responseStatuses: publishedValidatorRouteResponseStatusDefinitions.validateSingle
  },
  {
    id: "validateBatch",
    method: publishedValidatorRouteMethods.validateBatch,
    path: publishedValidatorRoutes.validateBatch,
    requiresBearerAuth: true,
    requestBodyRequired: true,
    requestFamilyId: "validateBatchRequest",
    queryParameters: publishedValidatorRouteQueryParameters.validateBatch,
    responseStatuses: publishedValidatorRouteResponseStatusDefinitions.validateBatch
  },
  {
    id: "validateFix",
    method: publishedValidatorRouteMethods.validateFix,
    path: publishedValidatorRoutes.validateFix,
    requiresBearerAuth: true,
    requestBodyRequired: true,
    requestFamilyId: "validateFixRequest",
    queryParameters: publishedValidatorRouteQueryParameters.validateFix,
    responseStatuses: publishedValidatorRouteResponseStatusDefinitions.validateFix
  },
  {
    id: "getStats",
    method: publishedValidatorRouteMethods.getStats,
    path: publishedValidatorRoutes.getStats,
    requiresBearerAuth: true,
    requestBodyRequired: false,
    requestFamilyId: null,
    queryParameters: publishedValidatorRouteQueryParameters.getStats,
    responseStatuses: publishedValidatorRouteResponseStatusDefinitions.getStats
  },
  {
    id: "getGates",
    method: publishedValidatorRouteMethods.getGates,
    path: publishedValidatorRoutes.getGates,
    requiresBearerAuth: true,
    requestBodyRequired: false,
    requestFamilyId: null,
    queryParameters: publishedValidatorRouteQueryParameters.getGates,
    responseStatuses: publishedValidatorRouteResponseStatusDefinitions.getGates
  }
] as const;
