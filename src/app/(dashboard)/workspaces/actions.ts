"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/others/constants";
import { Account, Client, Databases, Query } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config/db";

export const getCurrentWorkspaces = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = await cookies().get(AUTH_COOKIE);

    if (!session) return { documents: [], total: 0 };

    client.setSession(session.value);

    const databases = new Databases(client);
    const account = new Account(client);

    const user = await account.get();

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userID", user.$id),
    ]);

    if (!members.documents.length || members.total === 0) {
      return { documents: [], total: 0 };
    }

    const workspaceIDs = members.documents.map((member) => member.workspaceID);

    const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID, [
      Query.contains("$id", workspaceIDs),
      Query.orderDesc("$createdAt"),
    ]);

    return workspaces;
  } catch (error) {
    return { documents: [], total: 0 };
  }
};
