import { useQuery } from "@tanstack/react-query";
import { RPCClient } from "@/lib/rpc";

type TUseGetMembersProps = {
  workspaceId: string;
};

export const useGetMembers = ({ workspaceId }: TUseGetMembersProps) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await RPCClient.api.members.$get({ query: { workspaceId } });

      if (!response.ok) throw new Error("Failed to fetch members!");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
