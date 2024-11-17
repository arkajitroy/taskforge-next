import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof RPCClient.api.workspaces)[":workspaceId"]["join"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof RPCClient.api.workspaces)[":workspaceId"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await RPCClient.api.workspaces[":workspaceId"]["join"]["$post"]({
        param,
        json,
      });

      if (response.status === 400) {
        const responseData = await response.json();
        if ("error" in responseData) throw new Error(responseData.error);
        else throw new Error("Unexpected error format.");
      }

      if (response.status === 500) throw new Error("Failed to join workspace!");

      return await response.json();
    },

    onSuccess: ({ data }) => {
      toast.success("Successfully joined to workspace!", {
        description: "Now you have access to another workspace",
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] });
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.success(error.message, {
          description: "Something went wrong while joining workspace",
        });
      }
    },
  });

  return mutation;
};
