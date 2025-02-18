import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/sidebar";
import CreateWorkspaceModal from "@/features/workspaces/components/create-workspace-modal";
import React, { PropsWithChildren } from "react";

export default function Dashboardlayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <div className="flex w-full h-full ">
        <CreateWorkspaceModal />
        <div className="h-full overflow-y-auto fixed left-0 top-0 hidden lg:block lg:w-[264px]">
          <Sidebar />
        </div>

        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
