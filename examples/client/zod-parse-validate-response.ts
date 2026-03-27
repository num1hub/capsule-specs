import { validatePassResponseSchema } from "../../projections/zod/validator-api.js";

const candidate = {
  valid: true,
  errors: [],
  warnings: [],
  computedHash: "fa282f90d323024889dec453ea5b470abfeec6f6a4a2b37dbdffd3761b6f335a87b0132f3dd3c9ef2773f273e40a429bbe05eb0decc0143c0e655bfc31d60ce7",
  appliedFixes: []
};

export const parsedValidateResponse = validatePassResponseSchema.parse(candidate);
