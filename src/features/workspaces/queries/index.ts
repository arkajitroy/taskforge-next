"use server";

import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config/db";
import { AUTH_COOKIE } from "@/features/auth/others/constants";
import { cookies } from "next/headers";
import { Account, Client, Databases, Query } from "node-appwrite";
import { getMemberService } from "../services";
import { TWorkspace } from "../others/types";
import { createSessionClient } from "@/lib/appwrite";

// prop types
type TGetWorkspaceActionProps = {
  workspaceId: string;
};
type TGetCurrentWorkspaceInfoProps = {
  workspaceId: string;
};

export const getCurrentWorkspaces = async () => {
  try {
    const { account, databases } = await createSessionClient();
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

export const getCurrentWorkspace = async ({ workspaceId }: TGetWorkspaceActionProps) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = await cookies().get(AUTH_COOKIE);

    if (!session) return null;

    client.setSession(session.value);

    const account = new Account(client);
    const database = new Databases(client);
    const user = await account.get();

    const member = await getMemberService({ database, userId: user.$id, workspaceId });

    if (!member) return null;

    const workspace = await database.getDocument<TWorkspace>(
      DATABASE_ID,
      WORKSPACE_ID,
      workspaceId
    );

    return workspace;
  } catch (error) {
    return null;
  }
};

export const getCurrentWorkspaceInfo = async ({
  workspaceId,
}: TGetCurrentWorkspaceInfoProps) => {
  try {
    const { databases, account } = await createSessionClient();

    const workspace = await databases.getDocument<TWorkspace>(
      DATABASE_ID,
      WORKSPACE_ID,
      workspaceId
    );

    return {
      name: workspace.name,
    };
  } catch (error) {
    return null;
  }
};
