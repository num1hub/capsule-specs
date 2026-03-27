import * as rootProjection from "@num1hub/capsule-specs";
import * as zodProjection from "@num1hub/capsule-specs/zod";
import note from "@num1hub/capsule-specs/examples/example-note.capsule.json" with { type: "json" };

const rootNamespace = rootProjection.default ?? rootProjection;
const capsuleSchema = zodProjection.capsuleSchema ?? zodProjection.default?.capsuleSchema;

if (!rootNamespace.typescript || !rootNamespace.zod || !capsuleSchema) {
  throw new Error("expected ESM package exports to expose root namespaces and capsuleSchema");
}

const parsed = capsuleSchema.parse(note);
console.log(parsed.metadata.capsule_id);
