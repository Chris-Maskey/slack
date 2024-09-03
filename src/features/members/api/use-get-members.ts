import { useQuery } from "@tanstack/react-query";
import { Id } from "../../../../convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";

type UseGetMembersProps = {
  workspaceId: Id<"workspaces">;
};

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const { data, isLoading } = useQuery(
    convexQuery(api.members.get, { workspaceId }),
  );

  return { data, isLoading };
};
