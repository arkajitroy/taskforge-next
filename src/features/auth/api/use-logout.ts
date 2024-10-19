import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof RPCClient.api.auth.logout)["$post"]>;
type RequestType = InferRequestType<(typeof RPCClient.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, RequestType>({
    mutationFn: async () => {
      console.log("LOGOUT HANDLER");
      const response = await RPCClient.api.auth.logout["$post"]();
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });

  return mutation;
};
