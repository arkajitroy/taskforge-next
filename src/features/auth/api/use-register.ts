import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof RPCClient.api.auth.register)["$post"]>;
type RequestType = InferRequestType<(typeof RPCClient.api.auth.register)["$post"]>;

export const useRegistration = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await RPCClient.api.auth.register["$post"](json);

      if (!response.ok) throw new Error("Failed to register");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Successfully registered!", {
        description: "Your data has been to our database",
      });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      toast.success(error.message, {
        description: "Failed to register! Please try again later",
      });
    },
  });

  return mutation;
};
