import React from "react";
import { getCurrentUser } from "@/features/auth/actions/action";
import { redirect } from "next/navigation";

type TWorkspaceIdSettingsPageProps = {
  params: {
    workspaceID: string;
  };
};

export default async function WorkspaceIdSettingsPage({
  params,
}: TWorkspaceIdSettingsPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <div>
      WorkspaceIdSettingsPage
      <span>{params.workspaceID}</span>
    </div>
  );
}
