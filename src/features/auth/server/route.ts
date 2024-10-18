import { Hono } from "hono";
import { loginAPIValidator, registerAPIValidator } from "@/validations/routes/auth";

const app = new Hono()
  .post("/login", loginAPIValidator, (c) => {
    const { email, password } = c.req.valid("json");

    return c.json({ data: { email, password }, success: "ok" });
  })
  .post("/register", registerAPIValidator, (c) => {
    const { email, name, password } = c.req.valid("json");

    return c.json({ data: { name, email, password }, success: "ok" });
  });

export default app;
