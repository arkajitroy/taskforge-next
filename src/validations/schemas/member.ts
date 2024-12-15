import { MembersRole } from "@/features/members/others/types";
import { z } from "zod";

export const getMemberSchema = z.object({
  workspaceId: z.string(),
});

export const modifyMemberSchema = z.object({
  role: z.nativeEnum(MembersRole),
});
