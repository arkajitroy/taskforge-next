import React from "react";
import SignInCard from "@/features/auth/components/sign-in-card";
import { getCurrentUser } from "@/features/auth/actions/action";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) redirect("/");

  return (
    <div>
      <SignInCard />
    </div>
  );
}
