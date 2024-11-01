import { SidebarNavigationItems } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";

import React from "react";

const SidebarNavigations = () => {
  return (
    <ul className="flex flex-col">
      {SidebarNavigationItems.map((navItem, index) => {
        const isActive = false;
        const Icon = isActive ? navItem.activeIcon : navItem.icon;

        return (
          <Link key={index} href={navItem.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {navItem.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};

export default SidebarNavigations;
