import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { RPCClient } from "@/lib/rpc";

export const useGetWorkspace = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await RPCClient.api.workspaces.$get();

      if (!response.ok) throw new Error("Something went wrong!");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
