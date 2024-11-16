import UserAuthButton from "@/features/auth/components/user-button";
import { getImagePath } from "@/lib/imageUtills";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

export default function Standalonelayout({ children }: PropsWithChildren) {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href={"/"}>
            <Image
              src={getImagePath("brand-logo.svg", "logo")}
              alt="brand-logo"
              height={56}
              width={152}
            />
          </Link>
          <UserAuthButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">{children}</div>
      </div>
    </main>
  );
}
