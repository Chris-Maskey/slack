import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";

export const useNewJoinCode = () => {
  const { mutateAsync, data, error, isPending, isSuccess, isError, isIdle } =
    useMutation({
      mutationFn: useConvexMutation(api.workspaces.newJoinCode),
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
