"use client";

import React from "react";
import { useGetWorkspace } from "../api/use-get-workspaces";
import { RiAddCircleFill } from "react-icons/ri";
import CustomToolTip from "@/components/custom/custom-tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WorkspaceAvatar from "./workspace-avatar";

const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspace();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspace Switcher</p>
        <CustomToolTip tooltipText="Create new workspace">
          <RiAddCircleFill className="size-5 text-neutral-600 cursor-pointer hover:opacity-75 transition" />
        </CustomToolTip>
      </div>
      {/* //! ==================== (WORKSPACE SELECT COMP.) ===================== */}
      <Select>
        <SelectTrigger className="w-full h-fit bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.name}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <WorkspaceAvatar name={workspace.name} imageURL={workspace.imageURL} />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
