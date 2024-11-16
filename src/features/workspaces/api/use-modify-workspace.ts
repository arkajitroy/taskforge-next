import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Here the response type is little different, because generally the response
// is giving both error and data, but here i want only the 200 success one
type ResponseType = InferResponseType<
  (typeof RPCClient.api.workspaces)[":workspaceId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof RPCClient.api.workspaces)[":workspaceId"]["$patch"]
>;

export const useModifyWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await RPCClient.api.workspaces[":workspaceId"]["$patch"]({
        form,
        param,
      });

      const result = await response.json();

      return result;
    },
    onSuccess: () => {
      toast.success("Successfully created!", {
        description: "A new workspace has been added to your system.",
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      // queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => {
      toast.error("Oops! Something went wrong", {
        description: "Failed to create a new workspace. Please try again later",
      });
    },
  });

  return mutation;
};
