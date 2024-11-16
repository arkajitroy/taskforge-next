import React from "react";
import { getCurrentUser } from "@/features/auth/actions/action";
import { redirect } from "next/navigation";
import { ModifyWorkspaceForm } from "@/features/workspaces/components/modify-workspace-form";
import { getCurrentWorkspace } from "@/features/workspaces/actions";

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
  console.log("DEBUG :", initialValues);
  if (!initialValues) redirect(`/workspaces/${params.workspaceID}`);

  return (
    <div className="w-full lg:max-w-xl">
      <ModifyWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
