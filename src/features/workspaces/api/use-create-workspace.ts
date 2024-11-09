import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof RPCClient.api.workspace)["$post"]>;
type RequestType = InferRequestType<(typeof RPCClient.api.workspace)["$post"]>;

export const useCreateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await RPCClient.api.workspace["$post"]({ form });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Successfully created!", {
        description: "A new workspace has been added to your system.",
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: () => {
      toast.error("Oops! Something went wrong", {
        description: "Failed to create a new workspace. Please try again later",
      });
    },
  });

  return mutation;
};
