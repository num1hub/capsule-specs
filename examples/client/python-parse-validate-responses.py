from __future__ import annotations

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def load_json(relative_path: str) -> dict:
    return json.loads((REPO_ROOT / relative_path).read_text(encoding="utf-8"))


pass_response = load_json("examples/api/validate-response.pass.json")
fail_response = load_json("examples/api/validate-response.fail.json")
batch_response = load_json("examples/api/validate-response.batch.json")
fix_response = load_json("examples/api/validate-response.fix.sample.json")

assert pass_response["valid"] is True
assert pass_response["errors"] == []
assert fail_response["valid"] is False
assert fail_response["errors"][0]["gate"] == "G16"
assert batch_response["summary"]["total"] == len(batch_response["results"])
assert batch_response["summary"]["invalid"] == 1
assert fix_response["valid"] is True
assert fix_response["fixedCapsule"]["integrity_sha3_512"] == fix_response["computedHash"]

summary = {
    "passValid": pass_response["valid"],
    "failGate": fail_response["errors"][0]["gate"],
    "batchTotal": batch_response["summary"]["total"],
    "batchInvalid": batch_response["summary"]["invalid"],
    "fixValid": fix_response["valid"],
    "fixAppliedSeal": fix_response["fixedCapsule"]["integrity_sha3_512"],
}

print(json.dumps(summary, indent=2))
