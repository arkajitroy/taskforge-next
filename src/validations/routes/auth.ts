import { zValidator } from "@hono/zod-validator";
import { loginFormSchema, registerFormSchema } from "../schemas/auth";

export const loginAPIValidator = zValidator("json", loginFormSchema);
export const registerAPIValidator = zValidator("json", registerFormSchema);
