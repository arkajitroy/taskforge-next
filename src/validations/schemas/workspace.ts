import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  imageURL: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const modifyWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Must be 1 or more characters").optional(),
  imageURL: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const joinWorkspaceSchema = z.object({
  code: z.string(),
});

export type TCreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;
export type TModifyWorkspaceSchema = z.infer<typeof modifyWorkspaceSchema>;
export type TJoinWorkspaceSchema = z.infer<typeof joinWorkspaceSchema>;
