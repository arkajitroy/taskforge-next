import React from "react";
import { getCurrentUser } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { getCurrentWorkspaceInfo } from "@/features/workspaces/queries";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";

type TWorkspaceIdJoinPageProps = {
  params: {
    workspaceID: string;
    inviteCode: string;
  };
};

export default async function WorkspaceIdJoinPage({ params }: TWorkspaceIdJoinPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const workspaceInfo = await getCurrentWorkspaceInfo({
    workspaceId: params.workspaceID,
  });

  if (!workspaceInfo) redirect("/");

  return (
    <main>
      <JoinWorkspaceForm
        workspaceName={workspaceInfo.name}
        workspaceId={params.workspaceID}
        inviteCode={params.inviteCode}
      />
    </main>
  );
}
