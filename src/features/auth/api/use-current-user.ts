import { useQuery } from "@tanstack/react-query";
import { RPCClient } from "@/lib/rpc";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await RPCClient.api.auth["current-user"].$get();

      if (!response.ok) return null;

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
