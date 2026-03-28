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
limit_raw = os.environ.get("N1HUB_STATS_LIMIT")

limit = None
if limit_raw is not None:
    try:
        limit = int(limit_raw)
    except ValueError as exc:
        raise ValueError("N1HUB_STATS_LIMIT must be a positive integer") from exc
    if limit < 1:
        raise ValueError("N1HUB_STATS_LIMIT must be a positive integer")

summary = {
    "route": route,
    "sampleTotal": sample["total"],
    "samplePassRate": sample["passRate"],
    "sampleRecentCount": len(sample["recent"]),
    "statsLimit": limit,
}

if base_url and token:
    route_suffix = route
    if limit is not None:
        route_suffix = f"{route}?limit={limit}"

    http_request = request.Request(
        f"{base_url.rstrip('/')}{route_suffix}",
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
                "requestUrl": f"{base_url.rstrip('/')}{route_suffix}",
                "total": parsed.get("total"),
                "passRate": parsed.get("passRate"),
                "recentCount": len(parsed.get("recent", [])),
            }
        )
else:
    summary.update(
        {
            "mode": "dry-run",
            "nextStep": "Set N1HUB_BASE_URL and N1HUB_TOKEN to request the published stats route from a live validator. Optionally set N1HUB_STATS_LIMIT for the bounded stats query path.",
        }
    )

print(json.dumps(summary, indent=2))
