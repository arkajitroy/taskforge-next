import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof RPCClient.api.members)[":memberId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof RPCClient.api.members)[":memberId"]["$patch"]
>;

export const useUpdateMember = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await RPCClient.api.members[":memberId"]["$patch"]({
        param,
        json,
      });

      if (response.status === 401 || response.status === 400) {
        const responseData = await response.json();
        if ("error" in responseData) throw new Error(responseData.error);
        else throw new Error("Failed to modify!");
      }

      return await response.json();
    },

    onSuccess: ({ data }) => {
      toast.success("Successfully Modified!", {
        description: "The member has been modify in your system.",
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] });
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.success(error.message, {
          description: "Something went wrong while modifying member",
        });
      }
    },
  });

  return mutation;
};
