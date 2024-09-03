import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type UseGetChannelProps = {
  workspaceId: Id<"workspaces">;
};

export const useGetChannels = ({ workspaceId }: UseGetChannelProps) => {
  const { data, isLoading } = useQuery(
    convexQuery(api.channels.get, { workspaceId }),
  );

  return { data, isLoading };
};
