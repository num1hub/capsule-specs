import { z } from "zod";
import {
  publishedClientRecipeGroupIds,
  publishedClientRecipeIndexDirectory,
  publishedClientRecipeIndexPurpose,
  publishedClientRecipeRuntimes,
  publishedClientRecipeTaskIds
} from "../typescript/client-recipe-index.js";

const publishedClientRecipeAudiences = [
  "integrators",
  "contributors",
  "tool-builders",
  "reviewers",
  "maintainers"
] as const;

const clientRecipeDocPathSchema = z.string().regex(/^docs\/.+\.md$/);
const clientRecipeFileNameSchema = z.string().regex(/^[A-Za-z0-9._-]+\.(?:sh|mjs|cjs|ts|py)$/);

export const publishedClientRecipeGroupDefinitionSchema = z.object({
  id: z.enum(publishedClientRecipeGroupIds),
  title: z.string().min(1),
  description: z.string().min(1),
  audiences: z.array(z.enum(publishedClientRecipeAudiences)).min(1),
  primary_docs: z.array(clientRecipeDocPathSchema).min(1),
  recommended_start: clientRecipeFileNameSchema,
  files: z.array(clientRecipeFileNameSchema).min(1)
}).strict();

export const publishedClientRecipeTaskEntrypointSchema = z.object({
  id: z.enum(publishedClientRecipeTaskIds),
  intent: z.string().min(1),
  primary_group: z.enum(publishedClientRecipeGroupIds),
  recommended: clientRecipeFileNameSchema,
  alternatives: z.array(clientRecipeFileNameSchema),
  docs: z.array(clientRecipeDocPathSchema).min(1),
  runtimes: z.array(z.enum(publishedClientRecipeRuntimes)).min(1)
}).strict();

export const publishedClientRecipeIndexSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  directory: z.literal(publishedClientRecipeIndexDirectory),
  purpose: z.literal(publishedClientRecipeIndexPurpose),
  groups: z.array(publishedClientRecipeGroupDefinitionSchema).min(1),
  task_entrypoints: z.array(publishedClientRecipeTaskEntrypointSchema).min(1)
}).strict();

export type PublishedClientRecipeGroupDefinition = z.infer<typeof publishedClientRecipeGroupDefinitionSchema>;
export type PublishedClientRecipeTaskEntrypoint = z.infer<typeof publishedClientRecipeTaskEntrypointSchema>;
export type PublishedClientRecipeIndex = z.infer<typeof publishedClientRecipeIndexSchema>;
