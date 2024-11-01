import { getCurrentUser } from "@/features/auth/actions/action";
import UserAuthButton from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div>
      <span className="text-red-700 font-semibold">Dashboard Page</span>
    </div>
  );
}
