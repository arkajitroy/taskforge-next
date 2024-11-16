import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/queries";
import { getCurrentWorkspaces } from "@/features/workspaces/queries";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const workspaces = await getCurrentWorkspaces();
  if (workspaces.total === 0 || workspaces.documents.length === 0) {
    redirect(`/workspaces/create`);
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }

  return (
    <div>
      <span className="text-red-700 font-semibold">Dashboard Page</span>
      {/* <CreateWorkspaceForm /> */}
    </div>
  );
}
