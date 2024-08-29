import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useUpdateWorkspace = () => {
  const { mutateAsync, data, error, isPending, isSuccess, isError, isIdle } =
    useMutation({
      mutationFn: useConvexMutation(api.workspaces.update),
      onSuccess: () => {
        toast.success("Workspace updated");
      },
      onError: () => {
        toast.error("Failed to update workspace");
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
