"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useJoinWorkspace } from "../api/use-join-workspace";

type TJoinWorkspaceFormProps = {
  workspaceName: string;
  workspaceId: string;
  inviteCode: string;
};

const JoinWorkspaceForm: React.FC<TJoinWorkspaceFormProps> = ({
  workspaceName,
  workspaceId,
  inviteCode,
}) => {
  const router = useRouter();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold text-blue-800">Join Workspace</CardTitle>
        <p className="text-sm font-semibold text-gray-500">
          Workspace: <span className="font-normal">{workspaceName}</span>
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">
          Your've been invitd to join a new workspace. Colaborate with your team and boost
          yur productivity!
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className="w-[48%] bg-white text-gray-800 hover:bg-gray-100"
          onClick={() => router.push("/")}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isPending}
          className="w-[48%] bg-gray-800 text-white hover:bg-gray-700"
        >
          Jion Workspace
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JoinWorkspaceForm;
