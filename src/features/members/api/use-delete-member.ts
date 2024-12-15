import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof RPCClient.api.members)[":memberId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof RPCClient.api.members)[":memberId"]["$delete"]
>;

export const useDeleteMember = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await RPCClient.api.members[":memberId"]["$delete"]({
        param,
      });

      if (response.status === 401 || response.status === 400) {
        const responseData = await response.json();
        if ("error" in responseData) throw new Error(responseData.error);
        else throw new Error("Failed to Delete!");
      }

      return await response.json();
    },

    onSuccess: ({ data }) => {
      toast.success("Successfully Deleted!", {
        description: "The member has been deleted from your system.",
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] });
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.success(error.message, {
          description: "Something went wrong while deleting members",
        });
      }
    },
  });

  return mutation;
};
