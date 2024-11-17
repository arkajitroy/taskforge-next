import React from "react";
import { getCurrentUser } from "@/features/auth/queries";
import { redirect } from "next/navigation";

type TWorkspaceIdPageProps = {
  params: {
    workspaceID: string;
  };
};

export default async function WorkspaceIdPage({ params }: TWorkspaceIdPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div>
      <h3>Workspace Page</h3>
      <span>{params.workspaceID}</span>
    </div>
  );
}
