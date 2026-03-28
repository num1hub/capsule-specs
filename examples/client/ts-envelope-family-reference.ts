import validatorEnvelopeFamilies from "../../references/validator-envelope-families.json";
import {
  publishedValidatorEnvelopeFamilies,
  publishedValidatorEnvelopeFamilyCounts
} from "../../projections/typescript/validator-envelope-families.js";

const simpleErrorFamily = validatorEnvelopeFamilies.response_families.find(
  (family) => family.id === "simpleErrorResponse"
);

export const envelopeReferenceSummary = {
  requestFamilyIds: publishedValidatorEnvelopeFamilies.requests.map((family) => family.id),
  responseFamilyIds: publishedValidatorEnvelopeFamilies.responses.map((family) => family.id),
  sharedDefinitionIds: publishedValidatorEnvelopeFamilies.sharedDefinitions.map((definition) => definition.id),
  requestFamilyCount: publishedValidatorEnvelopeFamilyCounts.requests,
  responseFamilyCount: publishedValidatorEnvelopeFamilyCounts.responses,
  simpleErrorExampleCount: simpleErrorFamily?.example_files.length ?? 0
};

if (envelopeReferenceSummary.requestFamilyCount !== 3) {
  throw new Error("unexpected published validator request family count");
}

if (!envelopeReferenceSummary.responseFamilyIds.includes("simpleErrorResponse")) {
  throw new Error("missing shared simpleErrorResponse family");
}

if (envelopeReferenceSummary.simpleErrorExampleCount !== 5) {
  throw new Error("unexpected simpleErrorResponse example count");
}

if (!envelopeReferenceSummary.sharedDefinitionIds.includes("gateDescriptor")) {
  throw new Error("missing gateDescriptor shared definition");
}
