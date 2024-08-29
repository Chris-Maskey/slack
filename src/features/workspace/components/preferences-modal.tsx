"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useRemoveWorkspace } from "../api/use-remove-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const editWorkspaceSchema = z.object({
  workspaceName: z
    .string()
    .min(1, {
      message: "Workspace name is required",
    })
    .min(3, {
      message: "Workspace name must of atleast 3 characters",
    })
    .max(80, {
      message: "Workspace name must not exceed 80 characters",
    }),
});

type EditWorkspaceSchemaType = z.infer<typeof editWorkspaceSchema>;

type PreferenceModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
};

export const PreferenceModal = ({
  open,
  setOpen,
  initialValue,
}: PreferenceModalProps) => {
  const [value, setValue] = useState<string>(initialValue);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditWorkspaceSchemaType>({
    resolver: zodResolver(editWorkspaceSchema),
    defaultValues: {
      workspaceName: initialValue,
    },
  });

  const workspaceId = useWorkspaceId();

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();

  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();

  const handleUpdateWorkspace = ({
    workspaceName,
  }: EditWorkspaceSchemaType) => {
    console.log("WOWW");
    updateWorkspace({
      id: workspaceId,
      name: workspaceName,
    }).then(() => {
      setValue(workspaceName);
      setOpenEdit(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-2">
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogTrigger asChild>
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Workspace name</p>
                  <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                    Edit
                  </p>
                </div>
                <p className="text-sm">{value}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename this workspace</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(handleUpdateWorkspace)}
                className="space-y-4"
              >
                <Input
                  {...register("workspaceName")}
                  disabled={isSubmitting}
                  placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                  autoFocus
                />
                {errors.workspaceName && (
                  <p className="text-xs text-red-500">
                    {errors.workspaceName.message}
                  </p>
                )}
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant={"outline"}
                      disabled={isUpdatingWorkspace || isSubmitting}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={isUpdatingWorkspace || isSubmitting}
                  >
                    Save
                    {(isSubmitting || isUpdatingWorkspace) && (
                      <Loader2 className="size-4 animate-spin ml-2" />
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <button
            disabled={isRemovingWorkspace}
            onClick={(e) => {
              e.preventDefault();
              removeWorkspace({ id: workspaceId });
            }}
            className="flex items-center gap-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600 disabled:bg-gray-100"
          >
            <Trash className="size-4" />
            <p className="text-sm font-semibold">Delete Workspace</p>
            {isRemovingWorkspace && <Loader2 className="size-4 animate-spin" />}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
