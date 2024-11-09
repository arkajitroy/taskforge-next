import { z } from "zod";

export const workspaceSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  imageURL: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export type TWorkspaceSchema = z.infer<typeof workspaceSchema>;
