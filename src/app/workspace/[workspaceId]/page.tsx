"use client";

import { useGetWorkspace } from "@/features/workspace/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetWorkspace({ id: workspaceId });

  return <div>Data: {JSON.stringify(data)}</div>;
};

export default WorkspaceIdPage;
