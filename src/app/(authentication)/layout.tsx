import React, { PropsWithChildren } from "react";
import Navbar from "@/components/common/Navbar";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-xl p-4">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">{children}</div>
      </div>
    </main>
  );
};

export default AuthLayout;
