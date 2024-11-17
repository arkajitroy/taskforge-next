import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof RPCClient.api.auth.logout)["$post"]>;
type RequestType = InferRequestType<(typeof RPCClient.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, RequestType>({
    mutationFn: async () => {
      const response = await RPCClient.api.auth.logout["$post"]();

      if (!response.ok) throw new Error("Failed to Logout");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Successfully Logged out!", {
        description: "Well see you again!",
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.success(error.message, {
          description: "Failed to logout! Please try again later",
        });
      }
    },
  });

  return mutation;
};
