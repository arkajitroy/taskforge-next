"use client";

import React, { useRef } from "react";
import { TWorkspaceSchema, workspaceSchema } from "@/validations/schemas/workspace";
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
import { ImageIcon, X } from "lucide-react";
import { useCreateWorkspace } from "../api/use-create-workspace";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type TCreateWorkspaceFormProps = {
  onCancel?: () => void;
};

export const CreateWorkspaceForm: React.FC<TCreateWorkspaceFormProps> = ({
  onCancel,
}) => {
  const { mutate, isPending } = useCreateWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TWorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      imageURL: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) form.setValue("imageURL", file);
  };

  const onSubmit = (values: TWorkspaceSchema) => {
    console.log("DEBUG: ONSUBMIT CREATE WORKSPACE", { values });
    const formDataPayload = {
      ...values,
      imageURL: values.imageURL instanceof File ? values.imageURL : "",
    };

    mutate(
      { form: formDataPayload },
      {
        onSuccess: () => {
          form.reset();
          // TODO: redirect to new workspace
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Create Workspace</CardTitle>
              <CardDescription>
                Create a new workspace to organize your projects and collaborate with your
                team.
              </CardDescription>
            </CardHeader>

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
                          <Button
                            type="button"
                            variant={"teritory"}
                            size={"xs"}
                            className="w-fit mt-2"
                            onClick={() => inputRef.current?.click()}
                          >
                            {field.value ? "Update Image" : "Upload Image"}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onCancel} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                Create Workspace
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};