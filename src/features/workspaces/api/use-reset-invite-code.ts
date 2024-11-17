import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof RPCClient.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof RPCClient.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"]
>;

export const useResetInviteCode = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await RPCClient.api.workspaces[":workspaceId"][
        "reset-invite-code"
      ]["$post"]({
        param,
      });

      if (!response.ok) throw new Error("Failed to Reset!");

      return await response.json();
    },

    onSuccess: ({ data }) => {
      toast.success("Successfully Invite Code updated!", {
        description: "The Ivite code has been reset and updated.",
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] });
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.success(error.message, {
          description: "Something went wrong while reseting invite code",
        });
      }
    },
  });

  return mutation;
};
