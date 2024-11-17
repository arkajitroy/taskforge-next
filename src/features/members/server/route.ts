import { Hono } from "hono";

import { getWorkspaceAPIValidator } from "@/validations/routes/member";

import sessionMiddleware from "@/lib/session-middleware";
import { createAdminClient } from "@/lib/appwrite";
import { getMemberService } from "@/features/workspaces/services";
import { DATABASE_ID, MEMBERS_ID } from "@/config/db";
import { Query } from "node-appwrite";
import { MembersRole } from "../others/types";

const app = new Hono()
  .get("/", sessionMiddleware, getWorkspaceAPIValidator, async (c) => {
    const { users } = await createAdminClient();
    const database = c.get("databases");
    const user = c.get("user");

    const { workspaceId } = c.req.valid("query");

    const member = await getMemberService({
      database,
      workspaceId,
      userId: user.$id,
    });

    if (!member) return c.json({ error: "Unauthorized user!" }, 401);

    const members = await database.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("workspaceID", workspaceId),
    ]);

    const populatedMembers = await Promise.all(
      members.documents.map(async (memberItem) => {
        const user = await users.get(memberItem.userId);

        return {
          ...user,
          name: user.name,
          email: user.email,
        };
      })
    );

    return c.json({
      data: { ...members, documents: populatedMembers },
    });
  })
  .delete("/:memberId", sessionMiddleware, async (c) => {
    const { memberId } = c.req.param();

    const user = c.get("user");
    const database = c.get("databases");

    const memberToDelete = await database.getDocument(DATABASE_ID, MEMBERS_ID, memberId);

    // listing all the members in the databases
    const allMembersList = await database.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("workspaceID", memberToDelete.workspaceId),
    ]);

    // Checking the member
    const member = await getMemberService({
      database,
      workspaceId: memberToDelete.workspaceId,
      userId: user.$id,
    });

    if (!member) return c.json({ error: "Unauthorized user!" }, 401);

    if (member.$id !== memberToDelete.$id && member.role !== MembersRole.ADMIN) {
      return c.json({ error: "Unauthorized user!" }, 401);
    }

    await database.deleteDocument(DATABASE_ID, MEMBERS_ID, memberId);

    return c.json({ data: { $id: memberToDelete.$id } });
  });

export default app;
