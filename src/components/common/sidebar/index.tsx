import { getImagePath } from "@/lib/imageUtills";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DottedSeperator from "../../custom/dotted-seperator";
import SidebarNavigations from "./navigations";
import WorkspaceSwitcher from "@/features/workspaces/components/workspace-switcher";

const Sidebar: React.FC = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href={"/"}>
        <Image
          width={164}
          height={48}
          src={getImagePath("brand-logo.svg", "logo")}
          alt="brand-logo"
        />
      </Link>
      <DottedSeperator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeperator className="my-4" />
      <SidebarNavigations />
    </aside>
  );
};

export default Sidebar;
