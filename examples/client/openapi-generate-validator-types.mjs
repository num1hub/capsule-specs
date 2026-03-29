import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const openapiPath = path.join(repoRoot, "openapi", "validate.openapi.json");
const generatorBinary = path.join(repoRoot, "node_modules", ".bin", "openapi-typescript");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "capsule-specs-openapi-codegen-"));
const outputPath = path.join(tempRoot, "validator-api.generated.d.ts");

try {
  const result = spawnSync(generatorBinary, [openapiPath, "-o", outputPath], {
    cwd: repoRoot,
    encoding: "utf8"
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "openapi-typescript failed");
  }

  const generated = fs.readFileSync(outputPath, "utf8");
  const routeMatches =
    generated.match(/^\s+"\/api\/validate(?:\/batch|\/fix|\/stats|\/gates)?": \{$/gm) ?? [];

  const summary = {
    generatedFile: path.basename(outputPath),
    routeCount: routeMatches.length,
    hasStatsLimit: generated.includes("limit?: number;"),
    hasValidateResponse: generated.includes('components["schemas"]["ValidateResponse"]'),
    hasRateLimitError: generated.includes('components["schemas"]["RateLimitErrorResponse"]')
  };

  if (summary.routeCount !== 5) {
    throw new Error("generated OpenAPI types drifted away from the published route family");
  }

  if (!summary.hasStatsLimit) {
    throw new Error("generated OpenAPI types drifted away from the bounded stats query parameter");
  }

  if (!summary.hasValidateResponse || !summary.hasRateLimitError) {
    throw new Error("generated OpenAPI types drifted away from the published response schemas");
  }

  console.log(summary);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
