"use client";

import React, { PropsWithChildren } from "react";
import Navbar from "@/components/common/Navbar";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const authButtonRedirection = pathname === "/login" ? "register" : "login";
  const navbarButtonTitle = pathname === "/login" ? "Sign Up" : "Login";

  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-xl p-4">
        <Navbar authButtonRedirection={authButtonRedirection} authButtonTitle={navbarButtonTitle} />
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">{children}</div>
      </div>
    </main>
  );
};

export default AuthLayout;
