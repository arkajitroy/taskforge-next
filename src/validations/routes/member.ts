import { zValidator } from "@hono/zod-validator";
import { getMemberSchema, modifyMemberSchema } from "../schemas/member";

export const getMemberAPIValidator = zValidator("query", getMemberSchema);
export const modifyMemberAPIValidator = zValidator("json", modifyMemberSchema);
