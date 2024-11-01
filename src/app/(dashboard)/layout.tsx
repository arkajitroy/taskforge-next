import Sidebar from "@/components/common/sidebar";
import React, { PropsWithChildren } from "react";

export default function Dashboardlayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <div className="flex w-full h-full ">
        <div className="h-full overflow-y-auto fixed left-0 top-0 hidden lg:block lg:w-[264px]">
          <Sidebar />
        </div>

        <div className="lg:pl-[264px]">
          <div className="mx-auto max-w-screen-2xl h-full">
            {/* // todo : Add Navbar  */}
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
