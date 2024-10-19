/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Account as AccountType,
  type Databases as DatabaseType,
  type Storage as StorageType,
  type Users as UsersType,
} from "node-appwrite";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { AUTH_COOKIE } from "@/features/auth/others/constants";

type TAdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabaseType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

const sessionMiddleware = createMiddleware<TAdditionalContext>(async (c, next) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  const session = getCookie(c, AUTH_COOKIE);
  // if session cookie is missing
  if (!session) return c.json({ error: "Unauthorized" }, 401);

  client.setSession(session);

  const account = new Account(client);
  const db = new Databases(client);
  const storage = new Storage(client);

  const user = await account.get();

  c.set("account", account);
  c.set("databases", db);
  c.set("storage", storage);
  c.set("user", user);

  await next();
});

export default sessionMiddleware;
