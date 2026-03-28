from __future__ import annotations

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def load_json(relative_path: str) -> dict:
    return json.loads((REPO_ROOT / relative_path).read_text(encoding="utf-8"))


gates_response = load_json("examples/api/gates-response.sample.json")
stats_response = load_json("examples/api/stats-response.sample.json")

gate_ids = [gate["id"] for gate in gates_response["gates"]]
assert "G16" in gate_ids
assert stats_response["total"] >= stats_response["passed"]
assert stats_response["gates"][0]["gate"] == "G16"

summary = {
    "gateCount": len(gates_response["gates"]),
    "g16Present": "G16" in gate_ids,
    "statsTotal": stats_response["total"],
    "statsPassRate": stats_response["passRate"],
    "recentCount": len(stats_response["recent"]),
    "supportRoutes": [
        "GET /api/validate/gates",
        "GET /api/validate/stats",
    ],
}

print(json.dumps(summary, indent=2))
