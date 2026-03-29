import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import openapiDocument from "@num1hub/capsule-specs/openapi/validate.openapi.json" with { type: "json" };

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "capsule-specs-package-openapi-codegen-"));
const openapiPath = path.join(tempRoot, "validate.openapi.json");
const outputPath = path.join(tempRoot, "validator-api.generated.d.ts");
const generatorBinary = path.join(process.cwd(), "node_modules", ".bin", "openapi-typescript");

try {
  fs.writeFileSync(openapiPath, `${JSON.stringify(openapiDocument, null, 2)}\n`, "utf8");

  const result = spawnSync(generatorBinary, [openapiPath, "-o", outputPath], {
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
    throw new Error("installed-package OpenAPI codegen drifted away from the published route family");
  }

  if (!summary.hasStatsLimit) {
    throw new Error("installed-package OpenAPI codegen drifted away from the bounded stats query parameter");
  }

  if (!summary.hasValidateResponse || !summary.hasRateLimitError) {
    throw new Error("installed-package OpenAPI codegen drifted away from the published response schemas");
  }

  console.log(summary);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
