import React from "react";
import { getCurrentUser } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { ModifyWorkspaceForm } from "@/features/workspaces/components/modify-workspace-form";
import { getCurrentWorkspace } from "@/features/workspaces/queries";

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

  const initialValues = await getCurrentWorkspace({ workspaceId: params.workspaceID });

  if (!initialValues) redirect(`/workspaces/${params.workspaceID}`);

  return (
    <div className="w-full lg:max-w-xl">
      <ModifyWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
