import { Hono } from "hono";
import { loginAPIValidator } from "@/validations/routes/auth";

const app = new Hono().post("/login", loginAPIValidator, (c) => {
  const { email, password } = c.req.valid("json");

  return c.json({ data: { email, password }, success: "ok" });
});

export default app;
