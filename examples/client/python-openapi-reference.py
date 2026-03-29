from __future__ import annotations

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def load_json(relative_path: str) -> dict:
    return json.loads((REPO_ROOT / relative_path).read_text(encoding="utf-8"))


openapi_document = load_json("openapi/validate.openapi.json")
paths = openapi_document["paths"]
validate_single_operation = paths["/api/validate"]["post"]
stats_operation = paths["/api/validate/stats"]["get"]

stats_query_parameters = [
    parameter["name"]
    for parameter in stats_operation.get("parameters", [])
    if parameter.get("in") == "query"
]

summary = {
    "openapiVersion": openapi_document["openapi"],
    "routeCount": len(paths),
    "routeKeys": sorted(
        f"{method.upper()} {route_path}"
        for route_path, operations in paths.items()
        for method in operations.keys()
    ),
    "securitySchemes": sorted(openapi_document.get("components", {}).get("securitySchemes", {}).keys()),
    "validateSingleStatusCodes": sorted(validate_single_operation.get("responses", {}).keys()),
    "statsQueryParameters": stats_query_parameters,
}

if "bearerAuth" not in summary["securitySchemes"]:
    raise ValueError("OpenAPI bearerAuth scheme drifted")

if "limit" not in summary["statsQueryParameters"]:
    raise ValueError("OpenAPI stats query parameter drifted")

if "200" not in summary["validateSingleStatusCodes"] or "401" not in summary["validateSingleStatusCodes"]:
    raise ValueError("OpenAPI validateSingle status coverage drifted")

print(json.dumps(summary, indent=2))
