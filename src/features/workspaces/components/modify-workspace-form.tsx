"use client";

import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, CopyIcon, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { cn, copyToClipboard, generateInviteCodeLink } from "@/lib/utils";
import {
  modifyWorkspaceSchema,
  TModifyWorkspaceSchema,
} from "@/validations/schemas/workspace";
import { TWorkspace } from "../others/types";
import { useModifyWorkspace } from "../api/use-modify-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import CustomToolTip from "@/components/custom/custom-tooltip";
import { useResetInviteCode } from "../api/use-reset-invite-code";

type TModifyWorkspaceFormProps = {
  onCancel?: () => void;
  initialValues: TWorkspace;
};

export const ModifyWorkspaceForm: React.FC<TModifyWorkspaceFormProps> = ({
  onCancel,
  initialValues,
}) => {
  // - ===================== (QUERY/MUTATION API FUNC.)===================
  const { mutate, isPending } = useModifyWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();
  const { mutate: resetInviteCode, isPending: isResetingInviteCode } =
    useResetInviteCode();

  // - ===================== (DIALOG FUNCTIONALITY) ======================

  const [DeleteDialog, confirmDialog] = useConfirm(
    "Delete Workspace",
    "This Action can not be undone!",
    "destructive"
  );

  const [ResetInviteDialog, resetInviteDialog] = useConfirm(
    "Reset Invitation Link",
    "This Action will invalidate the current invite link",
    "destructive"
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const fullInviteLink = generateInviteCodeLink(initialValues);

  const form = useForm<TModifyWorkspaceSchema>({
    resolver: zodResolver(modifyWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      imageURL: initialValues.imageURL ?? "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) form.setValue("imageURL", file);
  };

  const handleOnCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    return onCancel ? onCancel : router.push(`/workspaces/${initialValues.$id}`);
  };

  const handleDelete = async () => {
    const ok = await confirmDialog();
    if (!ok) return;

    deleteWorkspace(
      {
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: () => {
          window.location.href = "/";
        },
      }
    );
  };

  const handleResetInviteLink = async () => {
    const ok = await resetInviteDialog();
    if (!ok) return;

    resetInviteCode(
      {
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: () => {
          router.refresh();
        },
      }
    );
  };

  const onSubmit = (values: TModifyWorkspaceSchema) => {
    console.log("DEBUG: ONSUBMIT CREATE WORKSPACE", { values });
    const formDataPayload = {
      ...values,
      imageURL: values.imageURL instanceof File ? values.imageURL : "",
    };

    mutate(
      { form: formDataPayload, param: { workspaceId: initialValues.$id } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <ResetInviteDialog />
      <Card className="w-full relative border-none">
        <Form {...form}>
          <CardHeader>
            <div className="flex flex-row items-center gap-x-4 py-2 space-y-0">
              <Button
                className="gap-2"
                size={"sm"}
                variant={"secondary"}
                onClick={handleOnCancel}
              >
                <ArrowLeftIcon size={14} />
                Back
              </Button>
              <CardTitle className="text-2xl font-bold">Modify Workspace</CardTitle>
            </div>

            <CardDescription>
              Modify your {initialValues.name} workspace to organize your projects and
              collaborate with your team.
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="workspace-name">Workspace Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="workspace-name"
                        placeholder="Enter workspace name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageURL"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel htmlFor="workspace-name">Logo</FormLabel> */}
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              alt="workspace-logo"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, JPEG or SVG, max 1mb
                          </p>
                          <Input
                            className="hidden"
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            ref={inputRef}
                            disabled={isPending}
                            onChange={handleImageChange}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              variant={"destructive"}
                              size={"xs"}
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) inputRef.current.value = "";
                              }}
                              disabled={isPending || isDeletingWorkspace}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              variant={"teritory"}
                              size={"xs"}
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={onCancel}
                disabled={isPending || isDeletingWorkspace}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card className="w-full h-full border-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold my-2">Invite Members</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace.
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={fullInviteLink} />
                <CustomToolTip tooltipText="copy invite code">
                  <Button
                    onClick={() => copyToClipboard(fullInviteLink)}
                    variant={"secondary"}
                    className="size-12"
                  >
                    <CopyIcon size={14} />
                  </Button>
                </CustomToolTip>
              </div>
            </div>
            <Button
              className="mt-6 w-fit ml-auto"
              size={"sm"}
              variant={"primary"}
              type="button"
              disabled={isPending || isResetingInviteCode}
              onClick={handleResetInviteLink}
            >
              Reset Invite Link
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold my-2">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Actions in this section are irreversible. Proceed with caution while
              modifying or deleting your workspace.
            </p>
            <Button
              className="mt-6 w-fit ml-auto"
              size={"sm"}
              variant={"destructive"}
              type="button"
              disabled={isPending || isDeletingWorkspace}
              onClick={handleDelete}
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
