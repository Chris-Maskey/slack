import { Sidebar } from "@/features/workspace/components/sidebar";
import { Toolbar } from "@/features/workspace/components/toolbar";
import { PropsWithChildren } from "react";

const WorkspaceIdLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};
export default WorkspaceIdLayout;
