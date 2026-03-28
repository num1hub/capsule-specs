from __future__ import annotations

import json
import os
from pathlib import Path
from urllib import parse, request


REPO_ROOT = Path(__file__).resolve().parents[2]


def load_json(relative_path: str) -> dict:
    return json.loads((REPO_ROOT / relative_path).read_text(encoding="utf-8"))


route_pack = load_json("references/validator-routes.json")
published_validator_route_definitions = route_pack["routes"]
published_validator_routes = {route["id"]: route["path"] for route in published_validator_route_definitions}

expected_route_ids = {"validateSingle", "validateBatch", "validateFix", "getGates", "getStats"}
actual_route_ids = set(published_validator_routes)
if actual_route_ids != expected_route_ids:
    raise ValueError(f"published validator routes drifted: expected {sorted(expected_route_ids)}, got {sorted(actual_route_ids)}")

stats_route = next(route for route in published_validator_route_definitions if route["id"] == "getStats")
stats_limit_parameter = next(
    (parameter for parameter in stats_route["query_parameters"] if parameter["name"] == "limit"),
    None,
)
if stats_limit_parameter is None:
    raise ValueError("published stats route drifted away from the bounded limit query parameter")

example_single_request = load_json("examples/api/validate-request.single.json")
example_batch_request = load_json("examples/api/validate-request.batch.json")
example_fix_request = load_json("examples/api/validate-request.fix.json")


def normalize_base_url(base_url: str) -> str:
    return base_url[:-1] if base_url.endswith("/") else base_url


def build_stats_url(base_url: str, limit: int | None = None) -> str:
    if limit is not None and limit < 1:
        raise ValueError("stats limit must be a positive integer")

    query = ""
    if limit is not None:
        query = f"?{parse.urlencode({stats_limit_parameter['name']: limit})}"

    return f"{normalize_base_url(base_url)}{published_validator_routes['getStats']}{query}"


def parse_stats_limit() -> int | None:
    limit_raw = os.environ.get("N1HUB_STATS_LIMIT")
    if limit_raw is None:
        return None

    try:
        limit = int(limit_raw)
    except ValueError as exc:
        raise ValueError("N1HUB_STATS_LIMIT must be a positive integer") from exc

    if limit < 1:
        raise ValueError("N1HUB_STATS_LIMIT must be a positive integer")

    return limit


class ValidatorClient:
    def __init__(self, base_url: str, token: str) -> None:
        self.base_url = normalize_base_url(base_url)
        self.token = token

    def _perform_request(self, route_id: str, payload: dict | None = None, limit: int | None = None) -> dict:
        route = next(route for route in published_validator_route_definitions if route["id"] == route_id)
        url = build_stats_url(self.base_url, limit) if route_id == "getStats" else f"{self.base_url}{route['path']}"

        headers = {
            "Authorization": f"Bearer {self.token}",
            "Accept": "application/json",
        }

        request_body = None
        if route["request_body_required"]:
            if payload is None:
                raise ValueError(f"{route_id} requires a request body")
            request_body = json.dumps(payload).encode("utf-8")
            headers["Content-Type"] = "application/json"
        elif payload is not None:
            raise ValueError(f"{route_id} does not accept a request body")

        http_request = request.Request(url, data=request_body, method=route["method"], headers=headers)
        with request.urlopen(http_request) as response:
            return {
                "routeId": route_id,
                "requestUrl": url,
                "httpStatus": response.status,
                "body": json.loads(response.read().decode("utf-8")),
            }

    def validate_single(self, payload: dict) -> dict:
        return self._perform_request("validateSingle", payload=payload)

    def validate_batch(self, payload: dict) -> dict:
        return self._perform_request("validateBatch", payload=payload)

    def validate_fix(self, payload: dict) -> dict:
        return self._perform_request("validateFix", payload=payload)

    def get_gates(self) -> dict:
        return self._perform_request("getGates")

    def get_stats(self, limit: int | None = None) -> dict:
        return self._perform_request("getStats", limit=limit)


def summarize_live_result(result: dict) -> dict:
    route_id = result["routeId"]
    parsed = result["body"]

    if route_id == "validateSingle":
        return {
            "httpStatus": result["httpStatus"],
            "valid": parsed.get("valid"),
            "computedHash": parsed.get("computedHash"),
            "errorCount": len(parsed.get("errors", [])),
        }

    if route_id == "validateBatch":
        return {
            "httpStatus": result["httpStatus"],
            "resultCount": len(parsed.get("results", [])),
            "warningCount": len(parsed.get("warnings", [])),
        }

    if route_id == "validateFix":
        return {
            "httpStatus": result["httpStatus"],
            "valid": parsed.get("valid"),
            "appliedFixCount": len(parsed.get("appliedFixes", [])),
        }

    if route_id == "getGates":
        gates = parsed.get("gates", [])
        return {
            "httpStatus": result["httpStatus"],
            "gateCount": len(gates),
            "firstGate": gates[0].get("id") if gates else None,
        }

    support_recent = parsed.get("recent", [])
    return {
        "httpStatus": result["httpStatus"],
        "requestUrl": result["requestUrl"],
        "total": parsed.get("total"),
        "passRate": parsed.get("passRate"),
        "recentCount": len(support_recent),
    }


base_url = os.environ.get("N1HUB_BASE_URL")
token = os.environ.get("N1HUB_TOKEN")
stats_limit = parse_stats_limit()

summary = {
    "mode": "dry-run",
    "routeIds": sorted(actual_route_ids),
    "supportsBearerAuth": all(route["requires_bearer_auth"] for route in published_validator_route_definitions),
    "requestFamilies": {
        "validateSingle": example_single_request["capsule"]["metadata"]["capsule_id"],
        "validateBatchCount": len(example_batch_request["capsules"]),
        "validateFix": example_fix_request["capsule"]["metadata"]["capsule_id"],
    },
    "statsQueryParameters": [parameter["name"] for parameter in stats_route["query_parameters"]],
    "exampleStatsUrl": build_stats_url("https://validator.example", 25),
}

if base_url and token:
    client = ValidatorClient(base_url, token)
    summary.update(
        {
            "mode": "live",
            "validateSingle": summarize_live_result(client.validate_single(example_single_request)),
            "validateBatch": summarize_live_result(client.validate_batch(example_batch_request)),
            "validateFix": summarize_live_result(client.validate_fix(example_fix_request)),
            "getGates": summarize_live_result(client.get_gates()),
            "getStats": summarize_live_result(client.get_stats(stats_limit)),
        }
    )
else:
    summary["nextStep"] = (
        "Set N1HUB_BASE_URL and N1HUB_TOKEN to use the published route map as a reusable Python live-validator client. "
        "Optionally set N1HUB_STATS_LIMIT for the bounded stats query path."
    )

print(json.dumps(summary, indent=2))
