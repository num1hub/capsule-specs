const { CAPSULE_TYPES } = require("@num1hub/capsule-specs/typescript");
const { capsuleSchema } = require("@num1hub/capsule-specs/zod");
const note = require("../example-note.capsule.json");

const parsed = capsuleSchema.parse(note);

console.log({
  capsuleId: parsed.metadata.capsule_id,
  capsuleType: parsed.metadata.type,
  knownTypes: CAPSULE_TYPES.length
});
