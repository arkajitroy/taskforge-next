import { DATABASE_ID, MEMBERS_ID } from "@/config/db";
import { Databases, Query } from "node-appwrite";

type GetMemberProps = {
  database: Databases;
  workspaceId: string;
  userId: string;
};

export const getMemberService = async ({
  database,
  workspaceId,
  userId,
}: GetMemberProps) => {
  const member = await database.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("workspaceID", workspaceId),
    Query.equal("userID", userId),
  ]);

  return member.documents[0];
};
