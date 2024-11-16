import { Models } from "node-appwrite";

export type TWorkspace = Models.Document & {
  name: string;
  imageURL: string;
  inviteCode: string;
  userId: string;
};
