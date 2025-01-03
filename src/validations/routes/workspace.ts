import { zValidator } from "@hono/zod-validator";
import {
  createWorkspaceSchema,
  joinWorkspaceSchema,
  modifyWorkspaceSchema,
} from "../schemas/workspace";

export const createWorkspaceAPIValidator = zValidator("form", createWorkspaceSchema);
export const modifyWorkspaceAPIValidator = zValidator("form", modifyWorkspaceSchema);
export const joinWorkspaceAPIValidator = zValidator("json", joinWorkspaceSchema);
