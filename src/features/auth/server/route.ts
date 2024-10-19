import { Hono } from "hono";
import { ID } from "node-appwrite";
import { setCookie, deleteCookie } from "hono/cookie";
import { loginAPIValidator, registerAPIValidator } from "@/validations/routes/auth";
import { createAdminClient } from "@/lib/appwrite";
import { AUTH_COOKIE } from "../others/constants";
import sessionMiddleware from "@/lib/session-middleware";

const app = new Hono()
  // - =============== FETCH-CURRENT-USER-HANDLER ========
  .get("/current-user", sessionMiddleware, (c) => {
    const user = c.get("user");

    return c.json({ data: user });
  })
  // - =============== LOGIN-API-HANDLER ==================
  .post("/login", loginAPIValidator, async (c) => {
    const { email, password } = c.req.valid("json");
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  // - =============== REGISTER-API-HANDLER ==================
  .post("/register", registerAPIValidator, async (c) => {
    const { email, name, password } = c.req.valid("json");
    const { account } = await createAdminClient();

    const user = await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ data: user, success: true });
  })
  // - =============== REGISTER-API-HANDLER ==================
  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");

    return c.json({ success: true });
  });

export default app;
