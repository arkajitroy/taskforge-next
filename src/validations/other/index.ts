import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(2, { message: "Name must be at least 2 characters long" })
  .max(50, { message: "Name cannot exceed 50 characters" });

export const emailSchema = z.string().email({ message: "Please enter a valid email address" });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20, { message: "Password cannot exceed 20 characters" });
