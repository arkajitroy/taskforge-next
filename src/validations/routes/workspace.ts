import { zValidator } from "@hono/zod-validator";
import { workspaceSchema } from "../schemas/workspace";

export const createWorkspaceAPIValidator = zValidator("form", workspaceSchema);
