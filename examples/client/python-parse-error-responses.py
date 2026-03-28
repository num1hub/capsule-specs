from __future__ import annotations

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def load_json(relative_path: str) -> dict:
    return json.loads((REPO_ROOT / relative_path).read_text(encoding="utf-8"))


unauthorized_response = load_json("examples/api/unauthorized-response.sample.json")
forbidden_response = load_json("examples/api/forbidden-response.sample.json")
conflict_response = load_json("examples/api/conflict-response.sample.json")
error_response = load_json("examples/api/error-response.sample.json")
rate_limit_response = load_json("examples/api/rate-limit-response.sample.json")
stats_error_response = load_json("examples/api/stats-error-response.sample.json")

assert unauthorized_response["error"] == "Unauthorized"
assert forbidden_response["error"] == "Owner role required"
assert conflict_response["error"] == "Validation request conflicts with current state"
assert error_response["error"] == "Invalid validation payload"
assert rate_limit_response["error"] == "Rate limit exceeded"
assert stats_error_response["error"] == "Stats computation failed"

summary = {
    "errorFamilies": [
        unauthorized_response["error"],
        forbidden_response["error"],
        conflict_response["error"],
        error_response["error"],
        rate_limit_response["error"],
        stats_error_response["error"],
    ],
    "forbiddenMessage": forbidden_response["error"],
    "rateLimitMessage": rate_limit_response["error"],
    "statsFailureMessage": stats_error_response["error"],
}

print(json.dumps(summary, indent=2))
