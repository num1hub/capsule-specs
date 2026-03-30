from __future__ import annotations

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


archive_bundle = json.loads(
    (REPO_ROOT / "examples" / "archive" / "archive-bundle.sample.json").read_text(encoding="utf-8")
)

if archive_bundle["replay"]["replayMode"] != "validate-only":
    raise ValueError("archive replay mode drifted")

if not any(entry["contentClass"] == "capsules" for entry in archive_bundle["manifest"]):
    raise ValueError("archive bundle sample lost the capsules manifest entry")

summary = {
    "bundleId": archive_bundle["bundleId"],
    "manifestEntries": len(archive_bundle["manifest"]),
    "tenantScope": archive_bundle["tenantScope"],
    "duplicateStrategy": archive_bundle["replay"]["duplicateStrategy"],
}

print(json.dumps(summary, indent=2))
