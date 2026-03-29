from __future__ import annotations

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def load_json(relative_path: str) -> dict:
    return json.loads((REPO_ROOT / relative_path).read_text(encoding="utf-8"))


recipe_index = load_json("examples/client/recipe-index.json")

if recipe_index["directory"] != "examples/client":
    raise ValueError("recipe-index directory drifted")

if len(recipe_index["groups"]) != 8:
    raise ValueError("recipe-index group count drifted")

if len(recipe_index["task_entrypoints"]) != 17:
    raise ValueError("recipe-index task count drifted")

python_group = next(group for group in recipe_index["groups"] if group["id"] == "python-consumers")
package_group = next(group for group in recipe_index["groups"] if group["id"] == "package-runtime")
python_navigation_task = next(
    entry for entry in recipe_index["task_entrypoints"] if entry["id"] == "python-recipe-navigation"
)
package_navigation_task = next(
    entry for entry in recipe_index["task_entrypoints"] if entry["id"] == "package-recipe-navigation"
)

if python_navigation_task["recommended"] != "python-client-recipe-index.py":
    raise ValueError("python navigator task drifted")

if "docs/python-consumption.md" not in python_navigation_task["docs"]:
    raise ValueError("python navigator docs drifted")

if "python" not in python_navigation_task["runtimes"]:
    raise ValueError("python navigator runtimes drifted")

summary = {
    "version": recipe_index["version"],
    "groupCount": len(recipe_index["groups"]),
    "taskCount": len(recipe_index["task_entrypoints"]),
    "pythonRecommendedStart": python_group["recommended_start"],
    "packageRecommendedStart": package_group["recommended_start"],
    "pythonNavigatorRecommended": python_navigation_task["recommended"],
    "pythonNavigatorAlternativeCount": len(python_navigation_task["alternatives"]),
    "packageNavigatorRecommended": package_navigation_task["recommended"],
}

print(json.dumps(summary, indent=2))
