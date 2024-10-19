"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { useLogout } from "@/features/auth/api/use-logout";
import { LogOut } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrentUser();
  const { mutate } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) router.push("/login");
  }, [data, isLoading, router]);

  return (
    <main className="flex justify-between py-2 px-4 items-center">
      <span className="text-red-700 font-semibold">Authorized User</span>
      <Button variant="destructive" className="gap-2" onClick={() => mutate()}>
        Logout <LogOut size={16} />
      </Button>
    </main>
  );
}
