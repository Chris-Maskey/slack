import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useRemoveWorkspace = () => {
  const { mutateAsync, data, error, isPending, isSuccess, isError, isIdle } =
    useMutation({
      mutationFn: useConvexMutation(api.workspaces.remove),
      onSuccess: () => {
        toast.success("Workspace removed");
      },
      onError: () => {
        toast.error("Failed to remove workspace");
      },
    });

  return {
    mutate: mutateAsync,
    data,
    error,
    isPending,
    isSuccess,
    isError,
    isIdle,
  };
};
