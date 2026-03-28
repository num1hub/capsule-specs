from __future__ import annotations

import json
import os
from pathlib import Path
from urllib import request


REPO_ROOT = Path(__file__).resolve().parents[2]


def load_json(relative_path: str) -> dict:
    return json.loads((REPO_ROOT / relative_path).read_text(encoding="utf-8"))


route = "/api/validate"
payload = load_json("examples/api/validate-request.single.json")
base_url = os.environ.get("N1HUB_BASE_URL")
token = os.environ.get("N1HUB_TOKEN")

summary = {
    "route": route,
    "capsuleId": payload["capsule"]["metadata"]["capsule_id"],
    "autoFix": payload["autoFix"],
    "skipG16": payload["options"]["skipG16"],
    "existingIdsCount": len(payload["options"]["existingIds"]),
}

if base_url and token:
    http_request = request.Request(
        f"{base_url.rstrip('/')}{route}",
        data=json.dumps(payload).encode("utf-8"),
        method="POST",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
    )

    with request.urlopen(http_request) as response:
        parsed = json.loads(response.read().decode("utf-8"))
        summary.update(
            {
                "mode": "live",
                "httpStatus": response.status,
                "valid": parsed.get("valid"),
                "computedHash": parsed.get("computedHash"),
                "errorCount": len(parsed.get("errors", [])),
            }
        )
else:
    summary.update(
        {
            "mode": "dry-run",
            "nextStep": "Set N1HUB_BASE_URL and N1HUB_TOKEN to send the published example envelope to a live validator.",
        }
    )

print(json.dumps(summary, indent=2))
