import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof RPCClient.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof RPCClient.api.auth.login)["$post"]>;

export const useLogin = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await RPCClient.api.auth.login["$post"](json);
      return await response.json();
    },
  });

  return mutation;
};
