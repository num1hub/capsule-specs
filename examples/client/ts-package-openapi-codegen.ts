import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

type OpenApiDocument = {
  openapi: string;
};

const require = createRequire(import.meta.url);
const packagedOpenapiPath = require.resolve("@num1hub/capsule-specs/openapi/validate.openapi.json");
const openapiDocument = JSON.parse(fs.readFileSync(packagedOpenapiPath, "utf8")) as OpenApiDocument;
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "capsule-specs-ts-openapi-codegen-"));
const outputPath = path.join(tempRoot, "validator-api.generated.d.ts");
const generatorBinary = path.join(process.cwd(), "node_modules", ".bin", "openapi-typescript");
type OpenApiCodegenSummary = {
  openapiVersion: string;
  routeCount: number;
  hasStatsLimit: boolean;
  hasValidateResponse: boolean;
  hasRateLimitError: boolean;
};

export let packageOpenApiCodegenSummary: OpenApiCodegenSummary;

try {
  const result = spawnSync(generatorBinary, [packagedOpenapiPath, "-o", outputPath], {
    cwd: process.cwd(),
    encoding: "utf8"
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "openapi-typescript failed");
  }

  const generated = fs.readFileSync(outputPath, "utf8");
  const routeMatches =
    generated.match(/^\s+"\/api\/validate(?:\/batch|\/fix|\/stats|\/gates)?": \{$/gm) ?? [];

  packageOpenApiCodegenSummary = {
    openapiVersion: openapiDocument.openapi,
    routeCount: routeMatches.length,
    hasStatsLimit: generated.includes("limit?: number;"),
    hasValidateResponse: generated.includes('components["schemas"]["ValidateResponse"]'),
    hasRateLimitError: generated.includes('components["schemas"]["RateLimitErrorResponse"]')
  };

  if (packageOpenApiCodegenSummary.routeCount !== 5) {
    throw new Error("TypeScript package OpenAPI codegen drifted away from the published route family");
  }

  if (!packageOpenApiCodegenSummary.hasStatsLimit) {
    throw new Error("TypeScript package OpenAPI codegen drifted away from the bounded stats query parameter");
  }

  if (!packageOpenApiCodegenSummary.hasValidateResponse || !packageOpenApiCodegenSummary.hasRateLimitError) {
    throw new Error("TypeScript package OpenAPI codegen drifted away from the published response schemas");
  }

  console.log(packageOpenApiCodegenSummary);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
