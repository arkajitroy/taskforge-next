import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config/db";
import { Base64ImageURLIntials } from "@/constants/misc";
import { MembersRole } from "@/features/members/others/types";
import sessionMiddleware from "@/lib/session-middleware";
import { generateInvitationCode } from "@/lib/utils";
import { createWorkspaceAPIValidator } from "@/validations/routes/workspace";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userID", user.$id),
    ]);

    if (!members.documents.length || members.total === 0) {
      return c.json({ data: { documents: [], total: 0 } });
    }

    const workspaceIDs = members.documents.map((member) => member.workspaceID);

    const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID, [
      Query.contains("$id", workspaceIDs),
      Query.orderDesc("$createdAt"),
    ]);

    return c.json({ data: workspaces });
  })
  .post("/", createWorkspaceAPIValidator, sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const storage = c.get("storage");

    const user = c.get("user");

    const { name, imageURL } = c.req.valid("form");

    let uploadedImageURL: string | undefined;

    if (imageURL instanceof File) {
      const file = await storage.createFile(IMAGES_BUCKET_ID, ID.unique(), imageURL);
      // converted into base-64
      const arrayBuffer = await storage.getFilePreview(IMAGES_BUCKET_ID, file.$id);

      uploadedImageURL = `${Base64ImageURLIntials},${Buffer.from(arrayBuffer).toString(
        "base64"
      )}`;
    }

    const workspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACE_ID,
      ID.unique(),
      {
        userId: user.$id,
        name,
        imageURL: uploadedImageURL,
        inviteCode: generateInvitationCode(6),
      }
    );

    // adding the actual member to the workspace
    await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
      userID: user.$id,
      workspaceID: workspace.$id,
      role: MembersRole.ADMIN,
    });

    return c.json({ data: workspace });
  });

export default app;
