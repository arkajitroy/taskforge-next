import React from "react";

import { getCurrentUser } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import MembersList from "@/features/members/components/members-list";

type TWorkspaceIdMembersPageProps = {
  params: {
    workspaceId: string;
  };
};

export default async function WorkspaceIdMembersPage({
  params,
}: TWorkspaceIdMembersPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="w-full lg:max-w-xl">
      <MembersList />
    </main>
  );
}
