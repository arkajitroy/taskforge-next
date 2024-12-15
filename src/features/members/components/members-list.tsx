"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DottedSeperator from "@/components/custom/dotted-seperator";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeftIcon,
  Loader,
  MoreHorizontal,
  User,
  UserCog,
  UserMinus,
} from "lucide-react";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetMembers } from "../api/use-get-members";
import { useDeleteMember } from "../api/use-delete-member";
import { useUpdateMember } from "../api/use-update-member";
import { getInitials } from "@/lib/utils";
import { MembersRole } from "../others/types";
import { useConfirm } from "@/hooks/use-confirm";

type TMembersListProps = {};

const MembersList: React.FC<TMembersListProps> = ({}) => {
  const [ModifyDialog, modifyDialog] = useConfirm(
    "Modify Member",
    "This Action can not be undone!",
    "primary"
  );

  const [RemoveDialog, removeDialog] = useConfirm(
    "Remove Member",
    "This Action will remove the member from the workspace",
    "primary"
  );

  const workspaceId = useWorkspaceId();
  const router = useRouter();

  // API CALLS
  const { data, isLoading } = useGetMembers({ workspaceId });
  const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatingMeber } = useUpdateMember();

  const handleUpdateMember = async (memberId: string, role: MembersRole) => {
    const ok = await modifyDialog();
    if (!ok) return;
    updateMember({
      json: { role },
      param: { memberId },
    });
  };

  const handleDeleteMember = async (memberId: string, role: MembersRole) => {
    const ok = await removeDialog();
    if (!ok) return;
    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => window.location.reload(),
      }
    );
  };

  return (
    <Card className="w-full h-full shadow-sm">
      <ModifyDialog />
      <RemoveDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button
          onClick={() => router.push(`/workspaces/${workspaceId}`)}
          variant={"secondary"}
          size={"sm"}
        >
          <ArrowLeftIcon className="size-4 mr-2" />
          Back
        </Button>

        <CardTitle className="text-xl font-bold">Members List</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7 space-y-2">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader className="size-8 animate-spin text-muted-foreground" />
          </div>
        )}
        {data?.documents.map((member, index) => (
          <>
            <Card
              key={member.$id}
              className="flex justify-between items-center p-4 shadow-none border-none"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{member.name}</h2>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  {/* <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full mt-1 inline-block">
                  {member.role === "admin" ? "Administrator" : "Member"}
                </span> */}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    // onClick={() => handleSetRole(member.id, "admin")}
                  >
                    <UserCog className="mr-2 h-4 w-4" />
                    <span>Set as Administrator</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleUpdateMember(member.$id, MembersRole.ADMIN)}
                    disabled={isUpdatingMeber}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Set as Member</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDeleteMember(member.$id, MembersRole.ADMIN)}
                    disabled={isDeletingMember}
                  >
                    <UserMinus className="mr-2 h-4 w-4" />
                    <span>Remove Member</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Card>
            {index < data.documents.length - 1 && <Separator className="my-2.5" />}
          </>
        ))}
      </CardContent>
    </Card>
  );
};

export default MembersList;
