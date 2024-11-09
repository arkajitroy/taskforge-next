import { DATABASE_ID, WORKSPACE_ID } from "@/config/db";
import sessionMiddleware from "@/lib/session-middleware";
import { createWorkspaceAPIValidator } from "@/validations/routes/workspace";
import { Hono } from "hono";
import { ID } from "node-appwrite";

const app = new Hono().post(
  "/",
  createWorkspaceAPIValidator,
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { name } = c.req.valid("json");

    const workspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACE_ID,
      ID.unique(),
      {
        userId: user.$id,
        name,
      }
    );

    return c.json({ data: workspace });
  }
);

export default app;
