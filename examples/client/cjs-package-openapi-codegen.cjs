const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const packagedOpenapiPath = require.resolve("@num1hub/capsule-specs/openapi/validate.openapi.json");
const openapiDocument = JSON.parse(fs.readFileSync(packagedOpenapiPath, "utf8"));
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "capsule-specs-cjs-openapi-codegen-"));
const outputPath = path.join(tempRoot, "validator-api.generated.d.ts");
const generatorBinary = path.join(process.cwd(), "node_modules", ".bin", "openapi-typescript");

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
  const summary = {
    openapiVersion: openapiDocument.openapi,
    routeCount: routeMatches.length,
    hasStatsLimit: generated.includes("limit?: number;"),
    hasValidateResponse: generated.includes('components["schemas"]["ValidateResponse"]'),
    hasRateLimitError: generated.includes('components["schemas"]["RateLimitErrorResponse"]')
  };

  if (summary.routeCount !== 5) {
    throw new Error("CommonJS package OpenAPI codegen drifted away from the published route family");
  }

  if (!summary.hasStatsLimit) {
    throw new Error("CommonJS package OpenAPI codegen drifted away from the bounded stats query parameter");
  }

  if (!summary.hasValidateResponse || !summary.hasRateLimitError) {
    throw new Error("CommonJS package OpenAPI codegen drifted away from the published response schemas");
  }

  console.log(summary);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
