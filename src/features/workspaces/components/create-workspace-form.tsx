"use client";

import { TWorkspaceSchema, workspaceSchema } from "@/validations/schemas/workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { X } from "lucide-react";
import { useCreateWorkspace } from "../api/use-create-workspace";

type TCreateWorkspaceFormProps = {
  onCancel?: () => void;
};

export const CreateWorkspaceForm: React.FC<TCreateWorkspaceFormProps> = ({
  onCancel,
}) => {
  const { mutate, isPending } = useCreateWorkspace();

  const form = useForm<TWorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: TWorkspaceSchema) => {
    console.log("DEBUG: ONSUBMIT CREATE WORKSPACE", { values });
    mutate({ json: values });
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

            <CardContent>
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
