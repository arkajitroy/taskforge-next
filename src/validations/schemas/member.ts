import { z } from "zod";

export const getMemberSchema = z.object({
  workspaceId: z.string(),
});
