import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Sidebar } from "@/features/workspace/components/sidebar";
import { Toolbar } from "@/features/workspace/components/toolbar";
import { WorkspaceSidebar } from "@/features/workspace/components/workspace-sidebar";
import { PropsWithChildren } from "react";

const WorkspaceIdLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId={"cm-workspace-layout"}
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5E2C5F]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
export default WorkspaceIdLayout;
