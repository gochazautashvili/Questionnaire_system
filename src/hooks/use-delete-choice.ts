import { delete_choice } from "@/server/actions/list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { getErrorMessage } from "@/lib/utils";
import { Choice } from "@prisma/client";

const useDeleteChoice = (columnId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["column_choices", columnId];

  return useMutation({
    mutationFn: delete_choice,
    onMutate: async (choiceId) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<Choice[]>(queryKey);

      queryClient.setQueryData<Choice[]>(queryKey, (oldData) => {
        if (!oldData) return;

        return oldData.filter((old) => old.id !== choiceId);
      });

      return { prevData };
    },
    onError(error, _, context) {
      queryClient.setQueryData<Choice[]>(queryKey, context?.prevData);
      toast({
        title: "Error",
        variant: "destructive",
        description: getErrorMessage(error),
      });
    },
  });
};

export default useDeleteChoice;
