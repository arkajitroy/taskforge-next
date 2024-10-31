"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, LogOut } from "lucide-react";
import { useLogout } from "../api/use-logout";
import { useCurrentUser } from "../api/use-current-user";
import DottedSeperator from "@/components/custom/dotted-seperator";

const UserAuthButton = () => {
  const { data: userData, isLoading } = useCurrentUser();
  const { mutate: logoutHandler } = useLogout();

  // Failed to fetch user
  // todo : add a sonner or alert
  if (!userData) return null;
  // destructured user details
  const { name, email } = userData!;

  const avatarFallback = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? "U";

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="size-10 hover:opacity-75 hover:cursor-pointer transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center ">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      {/* // - DROP CONTENT SECTION */}
      <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] hover:cursor-pointer transition border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 text-xl text-neutral-500 flex items-center justify-center ">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">{name || "User"}</p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeperator className="mb-1" />
        <DropdownMenuItem
          className="h-10 flex items-center justify-center text-rose-600 font-medium cursor-pointer hover:bg-rose-100 hover:opacity-80 transition-all duration-300"
          onClick={() => logoutHandler()}
        >
          <LogOut className="size-4 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAuthButton;
