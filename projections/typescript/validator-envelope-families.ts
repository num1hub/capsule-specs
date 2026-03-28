export const publishedValidatorRequestFamilyDefinitions = [
  {
    id: "validateSingleRequest",
    routeIds: ["validateSingle"],
    schemaRef: "#/$defs/validateSingleRequest",
    exampleFiles: ["examples/api/validate-request.single.json"]
  },
  {
    id: "validateBatchRequest",
    routeIds: ["validateBatch"],
    schemaRef: "#/$defs/validateBatchRequest",
    exampleFiles: ["examples/api/validate-request.batch.json"]
  },
  {
    id: "validateFixRequest",
    routeIds: ["validateFix"],
    schemaRef: "#/$defs/validateFixRequest",
    exampleFiles: ["examples/api/validate-request.fix.json"]
  }
] as const;

export const publishedValidatorResponseFamilyDefinitions = [
  {
    id: "validatePassResponse",
    routeIds: ["validateSingle"],
    schemaRef: "#/$defs/validatePassResponse",
    exampleFiles: ["examples/api/validate-response.pass.json"]
  },
  {
    id: "validateFailResponse",
    routeIds: ["validateSingle"],
    schemaRef: "#/$defs/validateFailResponse",
    exampleFiles: ["examples/api/validate-response.fail.json"]
  },
  {
    id: "validateBatchResponse",
    routeIds: ["validateBatch"],
    schemaRef: "#/$defs/validateBatchResponse",
    exampleFiles: ["examples/api/validate-response.batch.json"]
  },
  {
    id: "validateFixResponse",
    routeIds: ["validateFix"],
    schemaRef: "#/$defs/validateFixResponse",
    exampleFiles: ["examples/api/validate-response.fix.sample.json"]
  },
  {
    id: "gatesResponse",
    routeIds: ["getGates"],
    schemaRef: "#/$defs/gatesResponse",
    exampleFiles: ["examples/api/gates-response.sample.json"]
  },
  {
    id: "statsResponse",
    routeIds: ["getStats"],
    schemaRef: "#/$defs/statsResponse",
    exampleFiles: ["examples/api/stats-response.sample.json"]
  },
  {
    id: "simpleErrorResponse",
    routeIds: ["validateSingle", "validateBatch", "validateFix", "getStats", "getGates"],
    schemaRef: "#/$defs/simpleErrorResponse",
    exampleFiles: [
      "examples/api/error-response.sample.json",
      "examples/api/unauthorized-response.sample.json",
      "examples/api/conflict-response.sample.json",
      "examples/api/rate-limit-response.sample.json"
    ]
  }
] as const;

export const publishedValidatorSharedDefinitionDefinitions = [
  {
    id: "validationOptions",
    schemaRef: "#/$defs/validationOptions",
    usedBy: ["validateSingleRequest", "validateBatchRequest", "validateFixRequest"]
  },
  {
    id: "validatorIssue",
    schemaRef: "#/$defs/validatorIssue",
    usedBy: ["validatePassResponse", "validateFailResponse", "validateBatchResponse", "validateFixResponse"]
  },
  {
    id: "warningItem",
    schemaRef: "#/$defs/warningItem",
    usedBy: ["validatePassResponse", "validateFailResponse", "validateBatchResponse", "validateFixResponse"]
  },
  {
    id: "gateDescriptor",
    schemaRef: "#/$defs/gateDescriptor",
    usedBy: ["gatesResponse"]
  }
] as const;

export type PublishedValidatorRequestFamilyId = (typeof publishedValidatorRequestFamilyDefinitions)[number]["id"];
export type PublishedValidatorResponseFamilyId = (typeof publishedValidatorResponseFamilyDefinitions)[number]["id"];
export type PublishedValidatorSharedDefinitionId = (typeof publishedValidatorSharedDefinitionDefinitions)[number]["id"];

export const publishedValidatorEnvelopeFamilies = {
  requests: publishedValidatorRequestFamilyDefinitions,
  responses: publishedValidatorResponseFamilyDefinitions,
  sharedDefinitions: publishedValidatorSharedDefinitionDefinitions
} as const;

export const publishedValidatorEnvelopeFamilyCounts = {
  requests: publishedValidatorRequestFamilyDefinitions.length,
  responses: publishedValidatorResponseFamilyDefinitions.length,
  sharedDefinitions: publishedValidatorSharedDefinitionDefinitions.length
} as const;
