import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof RPCClient.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof RPCClient.api.auth.login)["$post"]>;

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await RPCClient.api.auth.login["$post"](json);

      if (!response.ok) throw new Error("Something went wrong!");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Successfully Logged in!", {
        description: "Welcome again, good to see you.",
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      toast.success(error.message, {
        description: "Failed to login! Please try again later",
      });
    },
  });

  return mutation;
};
