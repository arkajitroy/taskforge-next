import { Hono } from "hono";
import { Query } from "node-appwrite";

import {
  getMemberAPIValidator,
  modifyMemberAPIValidator,
} from "@/validations/routes/member";

import sessionMiddleware from "@/lib/session-middleware";
import { createAdminClient } from "@/lib/appwrite";
import { getMemberService } from "@/features/workspaces/services";
import { DATABASE_ID, MEMBERS_ID } from "@/config/db";
import { MembersRole } from "../others/types";

const app = new Hono()
  // - =================== FETCH-CURRENT-USER-HANDLER =====================
  .get("/", sessionMiddleware, getMemberAPIValidator, async (c) => {
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
        const user = await users.get(memberItem.userID);

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
  // - ================== REMOVE-USER-FROM-WORKPACE =====================
  .delete("/:memberId", sessionMiddleware, async (c) => {
    const { memberId } = c.req.param();

    const user = c.get("user");
    const database = c.get("databases");

    const memberList = await database.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userID", memberId),
    ]);

    if (memberList.total === 0) {
      throw new Error("Document with the requested userID could not be found.");
    }

    const memberToDelete = memberList.documents[0];

    console.log("MEMBER TO DELETE =>", memberToDelete);
    console.log("USER =>", user);

    // listing all the members in the databases
    const allMembersList = await database.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("workspaceID", memberToDelete.workspaceID),
    ]);

    // Checking the member
    const member = await getMemberService({
      database,
      workspaceId: memberToDelete.workspaceID,
      userId: user.$id,
    });

    if (!member) return c.json({ error: "Unauthorized user!" }, 401);

    if (member.$id !== memberToDelete.$id && member.role !== MembersRole.ADMIN) {
      return c.json({ error: "Unauthorized user!" }, 401);
    }

    if (allMembersList.total === 1) {
      return c.json({ error: "Cannot delete the only member!" }, 400);
    }

    await database.deleteDocument(DATABASE_ID, MEMBERS_ID, memberId);

    return c.json({ data: { $id: memberToDelete.$id } });
  })
  // - =================== FETCH-CURRENT-USER-HANDLER =====================
  .patch("/:memberId", sessionMiddleware, modifyMemberAPIValidator, async (c) => {
    const { memberId } = c.req.param();
    const { role } = c.req.valid("json");

    const user = c.get("user");
    const database = c.get("databases");

    const memberToModify = await database.getDocument(DATABASE_ID, MEMBERS_ID, memberId);

    // listing all the members in the databases
    const allMembersList = await database.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("workspaceID", memberToModify.workspaceId),
    ]);

    // Checking the member
    const member = await getMemberService({
      database,
      workspaceId: memberToModify.workspaceId,
      userId: user.$id,
    });

    if (!member) return c.json({ error: "Unauthorized user!" }, 401);

    if (member.$id !== memberToModify.$id && member.role !== MembersRole.ADMIN) {
      return c.json({ error: "Unauthorized user!" }, 401);
    }

    if (allMembersList.total === 1) {
      return c.json({ error: "Cannot modify the only member!" }, 400);
    }

    await database.updateDocument(DATABASE_ID, MEMBERS_ID, memberId, {
      role,
    });

    return c.json({ data: { $id: memberToModify.$id } });
  });

export default app;
