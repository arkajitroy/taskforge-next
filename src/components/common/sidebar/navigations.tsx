"use client";

import React from "react";
import { SidebarNavigationItems } from "@/routes/index.routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const SidebarNavigations = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  return (
    <ul className="flex flex-col">
      {SidebarNavigationItems.map((navItem, index) => {
        const fullHref = `/workspaces/${workspaceId}${navItem.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? navItem.activeIcon : navItem.icon;

        return (
          <Link key={index} href={fullHref}>
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
