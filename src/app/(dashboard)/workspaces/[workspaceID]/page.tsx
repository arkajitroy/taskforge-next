import React from "react";
import { getCurrentUser } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export default async function WorkspaceIdPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <div>page</div>;
}
