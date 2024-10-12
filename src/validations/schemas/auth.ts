import { z } from "zod";
import { emailSchema, passwordSchema, usernameSchema } from "../other";

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerFormSchema = z.object({
  name: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;
export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;
