import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useJoin = () => {
  const { mutateAsync, data, error, isPending, isSuccess, isError, isIdle } =
    useMutation({
      mutationFn: useConvexMutation(api.workspaces.join),
    });

  return {
    mutate: mutateAsync,
    error,
    data,
    isPending,
    isSuccess,
    isError,
    isIdle,
  };
};
