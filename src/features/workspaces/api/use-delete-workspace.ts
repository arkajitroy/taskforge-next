import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof RPCClient.api.workspaces)[":workspaceId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof RPCClient.api.workspaces)[":workspaceId"]["$delete"]
>;

export const useDeleteWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await RPCClient.api.workspaces[":workspaceId"]["$delete"]({
        param,
      });

      if (!response.ok) throw new Error("Failed to Delete!");

      return await response.json();
    },

    onSuccess: ({ data }) => {
      toast.success("Successfully Deleted!", {
        description: "The workspace has been deleted from your system.",
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] });
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.success(error.message, {
          description: "Something went wrong while deleting workspace",
        });
      }
    },
  });

  return mutation;
};
