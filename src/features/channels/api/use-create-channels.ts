import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const useCreateChannel = () => {
  const { mutateAsync, data, error, isPending, isSuccess, isError, isIdle } =
    useMutation({
      mutationFn: useConvexMutation(api.channels.create),
      onSuccess: () => {
        toast.success("Channel created");
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
