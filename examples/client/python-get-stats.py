from __future__ import annotations

import json
import os
from pathlib import Path
from urllib import request


REPO_ROOT = Path(__file__).resolve().parents[2]


def load_json(relative_path: str) -> dict:
    return json.loads((REPO_ROOT / relative_path).read_text(encoding="utf-8"))


route = "/api/validate/stats"
sample = load_json("examples/api/stats-response.sample.json")
base_url = os.environ.get("N1HUB_BASE_URL")
token = os.environ.get("N1HUB_TOKEN")

summary = {
    "route": route,
    "sampleTotal": sample["total"],
    "samplePassRate": sample["passRate"],
    "sampleRecentCount": len(sample["recent"]),
}

if base_url and token:
    http_request = request.Request(
        f"{base_url.rstrip('/')}{route}",
        method="GET",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
        },
    )

    with request.urlopen(http_request) as response:
        parsed = json.loads(response.read().decode("utf-8"))
        summary.update(
            {
                "mode": "live",
                "httpStatus": response.status,
                "total": parsed.get("total"),
                "passRate": parsed.get("passRate"),
                "recentCount": len(parsed.get("recent", [])),
            }
        )
else:
    summary.update(
        {
            "mode": "dry-run",
            "nextStep": "Set N1HUB_BASE_URL and N1HUB_TOKEN to request the published stats route from a live validator.",
        }
    )

print(json.dumps(summary, indent=2))
