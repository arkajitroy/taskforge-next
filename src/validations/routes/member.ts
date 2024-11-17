import { zValidator } from "@hono/zod-validator";
import { getMemberSchema } from "../schemas/member";

export const getWorkspaceAPIValidator = zValidator("query", getMemberSchema);
