import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACE_ID } from "@/config/db";
import { Base64ImageURLIntials } from "@/constants/misc";
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
    const storage = c.get("storage");

    const user = c.get("user");

    const { name, imageURL } = c.req.valid("form");

    console.log("DEBUG : (1) => ", { name, imageURL });

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
      }
    );

    return c.json({ data: workspace });
  }
);

export default app;
